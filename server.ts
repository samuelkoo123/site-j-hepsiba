import express from "express";
import { createServer as createViteServer } from "vite";
import mysql from "mysql2/promise";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initialize Database Tables
async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        contact VARCHAR(255),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS resources (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        description TEXT,
        file_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS schedules (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        date DATE NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("MySQL Database initialized");
  } catch (error) {
    console.error("Failed to initialize MySQL database:", error);
  }
}

async function startServer() {
  await initDb();
  
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10);

  app.use(express.json());

  // API Routes
  
  // Inquiries
  app.post("/api/inquiries", async (req, res) => {
    try {
      const { name, contact, message } = req.body;
      const [result] = await pool.query("INSERT INTO inquiries (name, contact, message) VALUES (?, ?, ?)", [name, contact, message]);
      res.json({ id: (result as any).insertId });
    } catch (error) {
      res.status(500).json({ error: "Failed to save inquiry" });
    }
  });

  app.get("/api/inquiries", async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM inquiries ORDER BY created_at DESC");
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch inquiries" });
    }
  });

  app.delete("/api/inquiries/:id", async (req, res) => {
    try {
      await pool.query("DELETE FROM inquiries WHERE id = ?", [req.params.id]);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete inquiry" });
    }
  });

  // Resources
  app.get("/api/resources", async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM resources ORDER BY created_at DESC");
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch resources" });
    }
  });

  app.post("/api/resources", async (req, res) => {
    try {
      const { title, category, description, file_url } = req.body;
      const [result] = await pool.query("INSERT INTO resources (title, category, description, file_url) VALUES (?, ?, ?, ?)", [title, category, description, file_url]);
      res.json({ id: (result as any).insertId });
    } catch (error) {
      res.status(500).json({ error: "Failed to save resource" });
    }
  });

  app.put("/api/resources/:id", async (req, res) => {
    try {
      const { title, category, description, file_url } = req.body;
      await pool.query("UPDATE resources SET title = ?, category = ?, description = ?, file_url = ? WHERE id = ?", 
        [title, category, description, file_url, req.params.id]);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update resource" });
    }
  });

  app.delete("/api/resources/:id", async (req, res) => {
    try {
      await pool.query("DELETE FROM resources WHERE id = ?", [req.params.id]);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete resource" });
    }
  });

  // Schedules
  app.get("/api/schedules", async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM schedules ORDER BY date ASC");
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch schedules" });
    }
  });

  app.post("/api/schedules", async (req, res) => {
    try {
      const { title, type, date, description } = req.body;
      const [result] = await pool.query("INSERT INTO schedules (title, type, date, description) VALUES (?, ?, ?, ?)", [title, type, date, description]);
      res.json({ id: (result as any).insertId });
    } catch (error) {
      res.status(500).json({ error: "Failed to save schedule" });
    }
  });

  app.delete("/api/schedules/:id", async (req, res) => {
    try {
      await pool.query("DELETE FROM schedules WHERE id = ?", [req.params.id]);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete schedule" });
    }
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
