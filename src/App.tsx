import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Users, 
  BookOpen, 
  MessageCircle, 
  Bot, 
  Settings, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin,
  Music,
  Flame,
  Cross,
  Utensils,
  Download,
  Plus,
  Trash2,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Edit
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Components ---

const Navbar = ({ activeTab, setActiveTab, onAdminClick }: { activeTab: string, setActiveTab: (tab: string) => void, onAdminClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    { id: 'home', label: '홈' },
    { id: 'intro', label: '소개' },
    { id: 'ministry', label: '사역' },
    { id: 'resources', label: '자료실' },
    { id: 'inquiry', label: '문의' },
    { id: 'mentor', label: 'AI 멘토' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('home')}>
            <Heart className="text-warm-500 mr-2" fill="currentColor" />
            <span className="text-xl font-serif font-bold text-warm-800">헵시바 선교회</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`text-sm font-medium transition-colors hover:text-warm-500 ${
                  activeTab === item.id ? 'text-warm-600 border-b-2 border-warm-500' : 'text-warm-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button onClick={onAdminClick} className="text-warm-400 hover:text-warm-600">
              <Settings size={18} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-warm-700">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-warm-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-warm-700 hover:bg-warm-50"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onAdminClick();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-warm-400 hover:bg-warm-50"
              >
                관리자
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const PasswordModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean, onClose: () => void, onConfirm: (pass: string) => void }) => {
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full mx-4"
      >
        <h3 className="text-xl font-bold mb-4 text-warm-800">관리자 인증</h3>
        <p className="text-sm text-warm-600 mb-6">비밀번호를 입력해 주세요.</p>
        <input 
          type="password" 
          autoFocus
          className="w-full px-4 py-2 border border-warm-200 rounded-lg mb-6 outline-none focus:ring-2 focus:ring-warm-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onConfirm(password)}
        />
        <div className="flex space-x-3">
          <button 
            onClick={onClose}
            className="flex-1 py-2 bg-warm-100 text-warm-700 rounded-lg hover:bg-warm-200"
          >
            취소
          </button>
          <button 
            onClick={() => onConfirm(password)}
            className="flex-1 py-2 bg-warm-500 text-white rounded-lg hover:bg-warm-600"
          >
            확인
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-warm-900 text-warm-100 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-serif font-bold mb-4">헵시바 선교회 (Hephzibah Mission)</h3>
          <p className="text-warm-300 mb-6">하나님의 기쁨이 되는 선교회</p>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex items-center">
            <Phone size={16} className="mr-2 text-warm-400" />
            <span>010-3264-8413</span>
          </div>
          <div className="flex items-center">
            <Mail size={16} className="mr-2 text-warm-400" />
            <span>samuel_koo@hanmail.net</span>
          </div>
          <div className="flex items-start">
            <MapPin size={16} className="mr-2 mt-1 text-warm-400" />
            <span>인천광역시 계양구 봉오대로 744번길 7 1동 805호</span>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-warm-800 text-center text-xs text-warm-500">
        &copy; {new Date().getFullYear()} Hephzibah Mission. All rights reserved.
      </div>
    </div>
  </footer>
);

// --- Pages ---

const Home = () => (
  <div className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://picsum.photos/seed/holy-spirit-revival/1920/1080" 
        alt="Passionate worship scene filled with the Holy Spirit" 
        className="w-full h-full object-cover brightness-50 scale-105"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-warm-900/60 via-transparent to-warm-900/80" />
      <div className="absolute inset-0 bg-orange-500/10 mix-blend-overlay animate-pulse" />
    </div>
    
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative z-10 text-center px-4"
    >
      <h2 className="text-warm-100 text-lg md:text-2xl font-serif italic mb-6 tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
        "할 수 있거든이 무슨 말이냐 믿는 자에게는 능히 하지 못할 일이 없느니라"
      </h2>
      <p className="text-warm-300 text-sm md:text-lg mb-8 font-medium">- 마가복음 9:23 -</p>
      <h1 className="text-4xl md:text-8xl font-serif font-bold text-white mb-6 drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
        하나님의 기쁨, 헵시바 선교회
      </h1>
      <p className="text-warm-100 text-lg md:text-2xl max-w-3xl mx-auto font-light tracking-widest uppercase">
        성령의 불이 임하는 뜨거운 예배와 찬양의 현장
      </p>
    </motion.div>
  </div>
);

const Intro = () => (
  <section className="py-24 bg-white">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Heart className="mx-auto text-warm-500 mb-6" size={48} fill="currentColor" />
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12">선교회 소개</h2>
        <div className="space-y-8 text-lg text-warm-700 leading-relaxed">
          <p>
            헵시바 선교회는 <span className="text-warm-600 font-bold">하나님의 기쁨</span>이 되는 선교회입니다.
          </p>
          <p>
            교회를 세워가며 복음을 전하고 사랑을 실천하며 영혼들을 그리스도께 인도하는 선교회입니다.
          </p>
          <p>
            뜨거운 찬양과 예배와 기도가 있는 선교회입니다.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

const Ministry = () => {
  const ministries = [
    {
      title: "전도와 선교 사역",
      description: "찬양 버스킹과 작은 음악회를 통해 복음을 전합니다. 작은 음악회는 보은늘사랑교회에서 년 1회 진행합니다.",
      icon: <Music className="text-warm-500" />,
      bg: "bg-warm-50"
    },
    {
      title: "기도 사역",
      description: "성령의 불과 기름부음이 임하는 뜨거운 현장입니다. 모든 모임 중에 기도가 있습니다.",
      icon: <Flame className="text-warm-500" />,
      bg: "bg-white"
    },
    {
      title: "치유와 회복 사역",
      description: "금요성령치유집회는 예수사랑교회에서 매주 금요일에 열립니다.",
      icon: <Cross className="text-warm-500" />,
      bg: "bg-warm-50"
    },
    {
      title: "구제 사역",
      description: "사랑의 식사를 통해 이웃에게 주님의 사랑을 실천합니다.",
      icon: <Utensils className="text-warm-500" />,
      bg: "bg-white"
    }
  ];

  return (
    <section className="py-24 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-16">사역 안내</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ministries.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl shadow-sm border border-warm-100 ${m.bg} flex items-start space-x-6`}
            >
              <div className="p-4 bg-white rounded-full shadow-inner">
                {m.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">{m.title}</h3>
                <p className="text-warm-600 leading-relaxed">{m.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Resources = () => {
  const [resources, setResources] = useState<any[]>([]);
  const categories = ['설교 자료', '찬양 자료', '선교 자료', '교육 자료', '교회 행정 자료'];

  useEffect(() => {
    fetch('/api/resources')
      .then(res => res.ok ? res.json() : [])
      .then(data => setResources(Array.isArray(data) ? data : []))
      .catch(() => setResources([]));
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-16">자료실</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-2">
            <h3 className="font-bold mb-4 text-warm-800">카테고리</h3>
            {categories.map(cat => (
              <button key={cat} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-warm-50 text-warm-700 transition-colors">
                {cat}
              </button>
            ))}
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {!Array.isArray(resources) || resources.length === 0 ? (
                <div className="col-span-full text-center py-20 text-warm-400">
                  등록된 자료가 없습니다.
                </div>
              ) : (
                resources.map(res => (
                  <div key={res.id} className="p-6 border border-warm-100 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-bold px-2 py-1 bg-warm-100 text-warm-600 rounded">
                        {res.category}
                      </span>
                      <a href={res.file_url} target="_blank" rel="noreferrer" className="text-warm-500 hover:text-warm-700">
                        <Download size={20} />
                      </a>
                    </div>
                    <h4 className="font-bold text-lg mb-2">{res.title}</h4>
                    <p className="text-sm text-warm-600 line-clamp-2">{res.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Inquiry = () => {
  const [form, setForm] = useState({ name: '', contact: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setSubmitted(true);
    setForm({ name: '', contact: '', message: '' });
  };

  return (
    <section className="py-24 bg-warm-50">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-16">문의하기</h2>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-warm-100">
          {submitted ? (
            <div className="text-center py-12">
              <Heart className="mx-auto text-warm-500 mb-4" fill="currentColor" />
              <h3 className="text-xl font-bold mb-2">문의가 접수되었습니다.</h3>
              <p className="text-warm-600">빠른 시일 내에 답변 드리겠습니다.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2 bg-warm-500 text-white rounded-lg hover:bg-warm-600"
              >
                추가 문의하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-1">성함</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-2 border border-warm-200 rounded-lg focus:ring-2 focus:ring-warm-400 outline-none"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-1">연락처 (이메일 또는 전화번호)</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-2 border border-warm-200 rounded-lg focus:ring-2 focus:ring-warm-400 outline-none"
                  value={form.contact}
                  onChange={e => setForm({...form, contact: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-1">문의 내용</label>
                <textarea 
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-warm-200 rounded-lg focus:ring-2 focus:ring-warm-400 outline-none"
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-warm-500 text-white font-bold rounded-lg hover:bg-warm-600 transition-colors"
              >
                문의 보내기
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const AIMentor = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const topics = ['신앙과 삶', '성경과 신학', '말씀과 기도', '예배와 찬양', '전도와 선교'];

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const model = genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          systemInstruction: "당신은 헵시바 선교회의 AI 멘토입니다. 따뜻하고 영적인 조언을 제공하며, 성경적인 관점에서 답변해 주세요. 주요 주제는 신앙과 삶, 성경과 신학, 말씀과 기도, 예배와 찬양, 전도와 선교입니다."
        }
      });
      const response = await model;
      setMessages(prev => [...prev, { role: 'ai', text: response.text || '죄송합니다. 답변을 생성하지 못했습니다.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-white min-h-[80vh]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <Bot className="mx-auto text-warm-500 mb-4" size={48} />
          <h2 className="text-3xl font-serif font-bold">AI 멘토</h2>
          <p className="text-warm-600 mt-2">신앙의 고민을 함께 나누어 보세요.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {topics.map(t => (
            <button 
              key={t}
              onClick={() => setInput(t + "에 대해 궁금합니다.")}
              className="px-3 py-1 bg-warm-50 text-warm-600 text-sm rounded-full border border-warm-100 hover:bg-warm-100"
            >
              {t}
            </button>
          ))}
        </div>

        <div className="bg-warm-50 rounded-2xl p-6 h-[500px] flex flex-col shadow-inner border border-warm-100">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
            {messages.length === 0 && (
              <div className="text-center text-warm-400 mt-20">
                질문을 입력해 주세요.
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  m.role === 'user' 
                    ? 'bg-warm-500 text-white rounded-tr-none' 
                    : 'bg-white text-warm-800 rounded-tl-none border border-warm-100 shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-warm-100 shadow-sm animate-pulse">
                  답변을 생각 중입니다...
                </div>
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <input 
              type="text" 
              className="flex-1 px-4 py-2 border border-warm-200 rounded-lg outline-none focus:ring-2 focus:ring-warm-400"
              placeholder="질문을 입력하세요..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="px-6 py-2 bg-warm-500 text-white rounded-lg hover:bg-warm-600 disabled:opacity-50"
            >
              전송
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Admin = () => {
  const [tab, setTab] = useState<'inquiries' | 'resources' | 'schedule'>('inquiries');
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);
  
  const [resForm, setResForm] = useState({ title: '', category: '설교 자료', description: '', file_url: '' });
  const [editingRes, setEditingRes] = useState<number | null>(null);

  const [schForm, setSchForm] = useState({ title: '', type: 'official', date: '', description: '' });

  const fetchData = async () => {
    try {
      const [i, r, s] = await Promise.all([
        fetch('/api/inquiries').then(res => res.ok ? res.json() : []),
        fetch('/api/resources').then(res => res.ok ? res.json() : []),
        fetch('/api/schedules').then(res => res.ok ? res.json() : [])
      ]);
      setInquiries(Array.isArray(i) ? i : []);
      setResources(Array.isArray(r) ? r : []);
      setSchedules(Array.isArray(s) ? s : []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const deleteInquiry = async (id: number) => {
    await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const saveResource = async () => {
    const method = editingRes ? 'PUT' : 'POST';
    const url = editingRes ? `/api/resources/${editingRes}` : '/api/resources';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resForm)
    });
    setResForm({ title: '', category: '설교 자료', description: '', file_url: '' });
    setEditingRes(null);
    fetchData();
  };

  const deleteResource = async (id: number) => {
    await fetch(`/api/resources/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const saveSchedule = async () => {
    await fetch('/api/schedules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schForm)
    });
    setSchForm({ title: '', type: 'official', date: '', description: '' });
    fetchData();
  };

  const deleteSchedule = async (id: number) => {
    await fetch(`/api/schedules/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <section className="py-24 bg-warm-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold mb-8">관리자 페이지</h2>
        
        <div className="flex space-x-4 mb-8 border-b border-warm-200">
          <button 
            onClick={() => setTab('inquiries')}
            className={`pb-2 px-4 ${tab === 'inquiries' ? 'border-b-2 border-warm-500 font-bold' : ''}`}
          >
            문의 관리
          </button>
          <button 
            onClick={() => setTab('resources')}
            className={`pb-2 px-4 ${tab === 'resources' ? 'border-b-2 border-warm-500 font-bold' : ''}`}
          >
            자료실 관리
          </button>
          <button 
            onClick={() => setTab('schedule')}
            className={`pb-2 px-4 ${tab === 'schedule' ? 'border-b-2 border-warm-500 font-bold' : ''}`}
          >
            스케줄 관리
          </button>
        </div>

        {tab === 'inquiries' && (
          <div className="space-y-4">
            {Array.isArray(inquiries) && inquiries.map(i => (
              <div key={i.id} className="bg-white p-6 rounded-xl shadow-sm border border-warm-100 flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="font-bold">{i.name}</span>
                    <span className="text-sm text-warm-500">{i.contact}</span>
                    <span className="text-xs text-warm-400">{new Date(i.created_at).toLocaleString()}</span>
                  </div>
                  <p className="text-warm-700 whitespace-pre-wrap">{i.message}</p>
                </div>
                <button onClick={() => deleteInquiry(i.id)} className="text-red-400 hover:text-red-600">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'resources' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-warm-100 h-fit">
              <h3 className="font-bold mb-4">{editingRes ? '자료 수정' : '새 자료 등록'}</h3>
              <div className="space-y-4">
                <input 
                  placeholder="제목" 
                  className="w-full px-3 py-2 border rounded" 
                  value={resForm.title} 
                  onChange={e => setResForm({...resForm, title: e.target.value})}
                />
                <select 
                  className="w-full px-3 py-2 border rounded"
                  value={resForm.category}
                  onChange={e => setResForm({...resForm, category: e.target.value})}
                >
                  {['설교 자료', '찬양 자료', '선교 자료', '교육 자료', '교회 행정 자료'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input 
                  placeholder="파일 URL" 
                  className="w-full px-3 py-2 border rounded" 
                  value={resForm.file_url} 
                  onChange={e => setResForm({...resForm, file_url: e.target.value})}
                />
                <textarea 
                  placeholder="설명" 
                  className="w-full px-3 py-2 border rounded" 
                  rows={3}
                  value={resForm.description}
                  onChange={e => setResForm({...resForm, description: e.target.value})}
                />
                <div className="flex space-x-2">
                  <button onClick={saveResource} className="flex-1 bg-warm-500 text-white py-2 rounded hover:bg-warm-600">
                    저장
                  </button>
                  {editingRes && (
                    <button onClick={() => { setEditingRes(null); setResForm({title:'', category:'설교 자료', description:'', file_url:''}); }} className="px-4 bg-warm-100 rounded">취소</button>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-4">
              {Array.isArray(resources) && resources.map(r => (
                <div key={r.id} className="bg-white p-4 rounded-xl shadow-sm border border-warm-100 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-warm-500">{r.category}</span>
                    <h4 className="font-bold">{r.title}</h4>
                  </div>
                  <div className="flex space-x-4">
                    <button onClick={() => { setEditingRes(r.id); setResForm({title: r.title, category: r.category, description: r.description, file_url: r.file_url}); }} className="text-warm-400 hover:text-warm-600">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => deleteResource(r.id)} className="text-red-400 hover:text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'schedule' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-warm-100 h-fit">
              <h3 className="font-bold mb-4">일정 등록</h3>
              <div className="space-y-4">
                <input 
                  placeholder="일정명" 
                  className="w-full px-3 py-2 border rounded" 
                  value={schForm.title} 
                  onChange={e => setSchForm({...schForm, title: e.target.value})}
                />
                <select 
                  className="w-full px-3 py-2 border rounded"
                  value={schForm.type}
                  onChange={e => setSchForm({...schForm, type: e.target.value as any})}
                >
                  <option value="official">공식 일정</option>
                  <option value="personal">개인 일정</option>
                </select>
                <input 
                  type="date"
                  className="w-full px-3 py-2 border rounded" 
                  value={schForm.date} 
                  onChange={e => setSchForm({...schForm, date: e.target.value})}
                />
                <textarea 
                  placeholder="설명" 
                  className="w-full px-3 py-2 border rounded" 
                  rows={2}
                  value={schForm.description}
                  onChange={e => setSchForm({...schForm, description: e.target.value})}
                />
                <button onClick={saveSchedule} className="w-full bg-warm-500 text-white py-2 rounded hover:bg-warm-600">
                  등록
                </button>
              </div>
            </div>
            <div className="lg:col-span-2">
              <Calendar schedules={schedules} onDelete={deleteSchedule} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const Calendar = ({ schedules, onDelete }: { schedules: any[], onDelete: (id: number) => void }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = daysInMonth(year, month);
  const offset = firstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - offset + 1;
    if (day > 0 && day <= days) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      return { day, dateStr };
    }
    return null;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-warm-100 overflow-hidden">
      <div className="p-4 bg-warm-500 text-white flex justify-between items-center">
        <button onClick={prevMonth}><ChevronLeft /></button>
        <h3 className="font-bold text-lg">{year}년 {month + 1}월</h3>
        <button onClick={nextMonth}><ChevronRight /></button>
      </div>
      <div className="grid grid-cols-7 text-center bg-warm-50 border-b border-warm-100">
        {['일', '월', '화', '수', '목', '금', '토'].map(d => (
          <div key={d} className="py-2 text-xs font-bold text-warm-600">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {calendarDays.map((d, i) => (
          <div key={i} className="min-h-[100px] border-r border-b border-warm-100 p-1">
            {d && (
              <>
                <div className="text-xs font-bold text-warm-400 mb-1">{d.day}</div>
                <div className="space-y-1">
                  {Array.isArray(schedules) && schedules.filter(s => s.date === d.dateStr).map(s => (
                    <div 
                      key={s.id} 
                      className={`text-[10px] p-1 rounded truncate flex justify-between items-center ${
                        s.type === 'official' ? 'bg-warm-100 text-warm-700' : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      <span>{s.title}</span>
                      <button onClick={() => onDelete(s.id)} className="opacity-0 hover:opacity-100 text-red-500">
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const ADMIN_PASSWORD = '1234'; // Default password

  useEffect(() => {
    window.scrollTo(0, 0);
    // Automatically log out when leaving the admin tab
    if (activeTab !== 'admin') {
      setIsAdminAuthenticated(false);
    }
  }, [activeTab]);

  const handleAdminClick = () => {
    if (isAdminAuthenticated) {
      setActiveTab('admin');
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  const handlePasswordConfirm = (pass: string) => {
    if (pass === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      setIsPasswordModalOpen(false);
      setActiveTab('admin');
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onAdminClick={handleAdminClick} 
      />
      
      <PasswordModal 
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onConfirm={handlePasswordConfirm}
      />
      
      <main className="flex-1 pt-16">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Home />
              <Intro />
              <Ministry />
              <Inquiry />
            </motion.div>
          )}
          {activeTab === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Intro />
            </motion.div>
          )}
          {activeTab === 'ministry' && (
            <motion.div key="ministry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Ministry />
            </motion.div>
          )}
          {activeTab === 'resources' && (
            <motion.div key="resources" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Resources />
            </motion.div>
          )}
          {activeTab === 'inquiry' && (
            <motion.div key="inquiry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Inquiry />
            </motion.div>
          )}
          {activeTab === 'mentor' && (
            <motion.div key="mentor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AIMentor />
            </motion.div>
          )}
          {activeTab === 'admin' && (
            <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Admin />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
