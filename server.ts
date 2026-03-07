import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("hephzibah.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    contact TEXT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS resources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    file_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS schedules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    type TEXT NOT NULL, -- 'personal' or 'official'
    date TEXT NOT NULL, -- YYYY-MM-DD
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  
  // Inquiries
  app.post("/api/inquiries", (req, res) => {
    const { name, contact, message } = req.body;
    const stmt = db.prepare("INSERT INTO inquiries (name, contact, message) VALUES (?, ?, ?)");
    const info = stmt.run(name, contact, message);
    res.json({ id: info.lastInsertRowid });
  });

  app.get("/api/inquiries", (req, res) => {
    const rows = db.prepare("SELECT * FROM inquiries ORDER BY created_at DESC").all();
    res.json(rows);
  });

  app.delete("/api/inquiries/:id", (req, res) => {
    db.prepare("DELETE FROM inquiries WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Resources
  app.get("/api/resources", (req, res) => {
    const rows = db.prepare("SELECT * FROM resources ORDER BY created_at DESC").all();
    res.json(rows);
  });

  app.post("/api/resources", (req, res) => {
    const { title, category, description, file_url } = req.body;
    const stmt = db.prepare("INSERT INTO resources (title, category, description, file_url) VALUES (?, ?, ?, ?)");
    const info = stmt.run(title, category, description, file_url);
    res.json({ id: info.lastInsertRowid });
  });

  app.put("/api/resources/:id", (req, res) => {
    const { title, category, description, file_url } = req.body;
    db.prepare("UPDATE resources SET title = ?, category = ?, description = ?, file_url = ? WHERE id = ?")
      .run(title, category, description, file_url, req.params.id);
    res.json({ success: true });
  });

  app.delete("/api/resources/:id", (req, res) => {
    db.prepare("DELETE FROM resources WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Schedules
  app.get("/api/schedules", (req, res) => {
    const rows = db.prepare("SELECT * FROM schedules ORDER BY date ASC").all();
    res.json(rows);
  });

  app.post("/api/schedules", (req, res) => {
    const { title, type, date, description } = req.body;
    const stmt = db.prepare("INSERT INTO schedules (title, type, date, description) VALUES (?, ?, ?, ?)");
    const info = stmt.run(title, type, date, description);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/schedules/:id", (req, res) => {
    db.prepare("DELETE FROM schedules WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
