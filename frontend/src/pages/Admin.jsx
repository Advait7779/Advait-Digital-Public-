import React, { useState, useEffect, useCallback } from 'react';
import { getApiBaseUrl } from '../services/api.js';

// ─── Config ───────────────────────────────────────────────────────────────────
const API_BASE = getApiBaseUrl();

const STATUS_COLORS = {
  New:       { bg: 'bg-blue-50',   text: 'text-blue-700',   dot: 'bg-blue-500',   border: 'border-blue-200'    },
  Contacted: { bg: 'bg-amber-50',  text: 'text-amber-700',  dot: 'bg-amber-500',  border: 'border-amber-200'   },
  Converted: { bg: 'bg-emerald-50',text: 'text-emerald-700',dot: 'bg-emerald-500',border: 'border-emerald-200' },
  Closed:    { bg: 'bg-gray-50',   text: 'text-gray-500',   dot: 'bg-gray-400',   border: 'border-gray-200'    },
};
const ALL_STATUSES = ['New', 'Contacted', 'Converted', 'Closed'];

function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}
function fmtDateShort(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
function authHeaders(token) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

// ─── Colorful SVG Icons ────────────────────────────────────────────────────────
const SvgTotalLeads = () => (
  <svg className="w-10 h-10 drop-shadow-xs select-none" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="10" width="4" height="10" rx="1.5" fill="url(#gradTotal1)" />
    <rect x="10" y="4" width="4" height="16" rx="1.5" fill="url(#gradTotal2)" />
    <rect x="17" y="7" width="4" height="13" rx="1.5" fill="url(#gradTotal3)" />
    <defs>
      <linearGradient id="gradTotal1" x1="5" y1="10" x2="5" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#db2777" />
      </linearGradient>
      <linearGradient id="gradTotal2" x1="12" y1="4" x2="12" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f36308" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="gradTotal3" x1="19" y1="7" x2="19" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#4f46e5" />
      </linearGradient>
    </defs>
  </svg>
);

const SvgNewLeads = () => (
  <svg className="w-10 h-10 drop-shadow-xs select-none" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="16" rx="4" fill="url(#gradNewMail)" />
    <path d="M4 7L11.2 11.8C11.7 12.1 12.3 12.1 12.8 11.8L20 7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    <circle cx="18" cy="6" r="3.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
    <defs>
      <linearGradient id="gradNewMail" x1="12" y1="4" x2="12" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
  </svg>
);

const SvgContacted = () => (
  <svg className="w-10 h-10 drop-shadow-xs select-none" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="url(#gradContactBg)" />
    <path d="M8 8.5C8 8.2 8.1 8 8.3 7.8L9.5 6.6C9.9 6.2 10.5 6.2 10.9 6.6L12.1 7.8C12.4 8.1 12.4 8.7 12.1 9L11.5 9.6C11.3 9.8 11.3 10.1 11.4 10.3C11.8 11.1 12.6 11.9 13.4 12.3C13.6 12.4 13.9 12.4 14.1 12.2L14.7 11.6C15 11.3 15.6 11.3 15.9 11.6L17.1 12.8C17.5 13.2 17.5 13.8 17.1 14.2L15.9 15.4C15.7 15.6 15.5 15.7 15.2 15.7C11.2 15.7 8 12.5 8 8.5Z" fill="#ffffff" />
    <defs>
      <linearGradient id="gradContactBg" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
  </svg>
);

const SvgConverted = () => (
  <svg className="w-10 h-10 drop-shadow-xs select-none" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="url(#gradConvertBg)" />
    <path d="M8.5 12.5L11 15L15.5 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="gradConvertBg" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
  </svg>
);

const SvgNewSmall = () => (
  <svg className="w-4.5 h-4.5 select-none shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="16" rx="4" fill="url(#gradNewMailSm)" />
    <path d="M4 7L11.2 11.8C11.7 12.1 12.3 12.1 12.8 11.8L20 7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    <circle cx="18" cy="6" r="3.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
    <defs>
      <linearGradient id="gradNewMailSm" x1="12" y1="4" x2="12" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
  </svg>
);

const SvgConvertedSmall = () => (
  <svg className="w-4.5 h-4.5 select-none shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="url(#gradConvertBgSm)" />
    <path d="M8.5 12.5L11 15L15.5 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="gradConvertBgSm" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
  </svg>
);

const SvgTotalSmall = () => (
  <svg className="w-4.5 h-4.5 select-none shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="10" width="4" height="10" rx="1.5" fill="url(#gradTotal1Sm)" />
    <rect x="10" y="4" width="4" height="16" rx="1.5" fill="url(#gradTotal2Sm)" />
    <rect x="17" y="7" width="4" height="13" rx="1.5" fill="url(#gradTotal3Sm)" />
    <defs>
      <linearGradient id="gradTotal1Sm" x1="5" y1="10" x2="5" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#db2777" />
      </linearGradient>
      <linearGradient id="gradTotal2Sm" x1="12" y1="4" x2="12" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f36308" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="gradTotal3Sm" x1="19" y1="7" x2="19" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#4f46e5" />
      </linearGradient>
    </defs>
  </svg>
);

// ─── Icons (inline SVG to avoid extra deps) ───────────────────────────────────
const Icon = {
  Dashboard: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  Leads: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Template: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Logout: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  Search: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Download: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Refresh: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
  ),
  Trash: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  Menu: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  Close: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
};

// ─── Custom Dropdowns ────────────────────────────────────────────────────────
function CustomDropdown({ value, options, onChange, colors }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = React.useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentTheme = colors[value] || { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 transition active:scale-95 cursor-pointer select-none border ${currentTheme.border || 'border-gray-200'} hover:shadow-xs ${currentTheme.bg} ${currentTheme.text}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${currentTheme.dot}`} />
        {value}
        <svg className={`w-3 h-3 ml-0.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-32 bg-white border border-gray-150 rounded-xl shadow-lg z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-1 duration-150">
          {options.map(opt => {
            const optTheme = colors[opt] || { text: 'text-gray-700', dot: 'bg-gray-400' };
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-xs font-bold transition hover:bg-gray-50 flex items-center gap-2 ${opt === value ? 'text-[#f36308] bg-orange-50/20' : 'text-gray-600'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${optTheme.dot}`} />
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterDropdown({ value, options, onChange, colors }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = React.useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left w-full sm:w-auto" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-white hover:border-gray-300 transition flex items-center justify-between cursor-pointer w-full sm:w-44 select-none relative"
      >
        <span className="truncate flex items-center gap-2">
          {value && <span className={`w-1.5 h-1.5 rounded-full ${colors[value]?.dot}`} />}
          {value || 'All Statuses'}
        </span>
        <span className={`absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1.5 w-full sm:w-44 bg-white border border-gray-150 rounded-xl shadow-lg z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-1 duration-150">
          <button
            type="button"
            onClick={() => { onChange(''); setIsOpen(false); }}
            className={`w-full px-4 py-2.5 text-left text-xs font-bold transition hover:bg-gray-50 ${value === '' ? 'text-[#f36308] bg-orange-50/20' : 'text-gray-600'}`}
          >
            All Statuses
          </button>
          {options.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className={`w-full px-4 py-2.5 text-left text-xs font-bold transition hover:bg-gray-50 flex items-center gap-2 ${opt === value ? 'text-[#f36308] bg-orange-50/20' : 'text-gray-600'}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${colors[opt]?.dot}`} />
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function LimitDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = React.useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="pl-3.5 pr-8 py-1.5 rounded-xl border border-gray-200 bg-white font-bold text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#f36308]/20 focus:border-[#f36308] cursor-pointer transition select-none relative flex items-center gap-1.5"
      >
        <span>{value} rows</span>
        <span className="text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 transition-transform duration-200">
          <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-24 bg-white border border-gray-150 rounded-xl shadow-lg z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-1 duration-150">
          {[5, 10, 15, 20].map(v => (
            <button
              key={v}
              type="button"
              onClick={() => {
                onChange(v);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 text-left text-xs font-bold transition hover:bg-gray-50 ${v === value ? 'text-[#f36308] bg-orange-50/20' : 'text-gray-600'}`}
            >
              {v} rows
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, color, icon, sub }) {
  return (
    <div className={`rounded-2xl p-6 border ${color} flex items-start gap-4 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300`}>
      <div className="text-3xl mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">{label}</p>
        <p className="text-4xl font-black tracking-tight">{value ?? '—'}</p>
        {sub && <p className="text-xs font-semibold opacity-50 mt-1">{sub}</p>}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || STATUS_COLORS.New;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${c.border || 'border-gray-200'} ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {status}
    </span>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res  = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.token) setError(data.error || 'Invalid email or password');
      else { sessionStorage.setItem('admin_token', data.token); onLogin(data.token); }
    } catch { setError('Could not connect to backend server'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2c2927] via-[#1e1c1a] to-[#111] flex items-center justify-center p-4">
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#f36308]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#f36308]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-[92vw] sm:max-w-[340px]">
        <div className="text-center mb-8">
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl mx-auto mb-4 shadow-2xl border-2 border-[#f36308]/30 overflow-hidden">
            <img src="/favicon.png" alt="Advait Digital" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Advait <span className="text-[#f36308]">Digital</span>
          </h1>
          <p className="text-white/40 text-xs sm:text-sm mt-1 font-semibold tracking-wider uppercase">CMS Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:px-8 sm:py-10 shadow-2xl">
          <h2 className="text-white text-lg sm:text-xl font-black mb-6">Sign In</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Admin Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3.5 rounded-xl bg-white/8 border border-white/15 text-white placeholder-white/25 text-sm focus:outline-none focus:ring-2 focus:ring-[#f36308]/50 focus:border-[#f36308] transition"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Admin Password</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3.5 rounded-xl bg-white/8 border border-white/15 text-white placeholder-white/25 text-sm focus:outline-none focus:ring-2 focus:ring-[#f36308]/50 focus:border-[#f36308] transition"
                required
              />
            </div>
            {error && (
              <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/25 text-red-300 text-xs font-bold flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}
            <button
              type="submit" disabled={loading}
              className="w-full bg-[#f36308] hover:bg-[#d95507] active:scale-[0.98] text-white font-black py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-[#f36308]/30 disabled:opacity-60 cursor-pointer text-sm tracking-wide mt-2"
            >
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Dashboard View ───────────────────────────────────────────────────────────
function DashboardView({ token }) {
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [recent,  setRecent]  = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/admin/stats`,          { headers: authHeaders(token) }).then(r => r.json()),
      fetch(`${API_BASE}/api/admin/leads?limit=5`,  { headers: authHeaders(token) }).then(r => r.json()),
    ]).then(([s, l]) => {
      setStats(s);
      setRecent(l.leads || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [token]);

  if (loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {[...Array(4)].map((_, i) => <div key={i} className="rounded-2xl h-32 bg-gray-100 animate-pulse" />)}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard label="Total Leads"  value={stats?.total}      color="bg-pink-50 border-pink-200 text-pink-900"      icon={<SvgTotalLeads />} sub={`${stats?.this_week ?? 0} this week`} />
        <StatCard label="New Leads"    value={stats?.new_leads}  color="bg-blue-50 border-blue-200 text-blue-900"     icon={<SvgNewLeads />} sub={`${stats?.today ?? 0} today`} />
        <StatCard label="Contacted"    value={stats?.contacted}  color="bg-amber-50 border-amber-200 text-amber-900"  icon={<SvgContacted />} sub="Following up" />
        <StatCard label="Converted"    value={stats?.converted}  color="bg-emerald-50 border-emerald-200 text-emerald-900" icon={<SvgConverted />} sub="Successful" />
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-black text-[#2c2927] text-base">Recent Enquiries</h2>
          <span className="text-xs text-gray-400 font-semibold">Latest 5</span>
        </div>
        <div className="divide-y divide-gray-50">
          {recent.length === 0 && (
            <div className="px-6 py-10 text-center text-gray-400 font-medium text-sm">No leads yet</div>
          )}
          {recent.map(lead => (
            <div key={lead.id} className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-4 hover:bg-gray-50/70 transition">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f36308]/20 to-[#f36308]/5 flex items-center justify-center text-[#f36308] font-black text-sm shrink-0">
                  {lead.name?.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[#2c2927] text-sm truncate">{lead.name}</p>
                  <p className="text-xs text-gray-400 font-medium truncate">{lead.service}</p>
                </div>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:gap-1 shrink-0 pl-13 sm:pl-0">
                <StatusBadge status={lead.status} />
                <p className="text-[11px] text-gray-400">{fmtDateShort(lead.created_at)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service breakdown */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'This Week',  value: stats.this_week, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
            { label: 'Today',      value: stats.today,     color: 'bg-pink-50 text-pink-700 border-pink-200' },
            { label: 'Closed',     value: stats.closed,    color: 'bg-gray-50 text-gray-600 border-gray-200' },
            { label: 'Total',      value: stats.total,     color: 'bg-[#f36308]/5 text-[#f36308] border-[#f36308]/30' },
          ].map(item => (
            <div key={item.label} className={`rounded-2xl p-5 border text-center ${item.color} hover:-translate-y-1 hover:shadow-sm transition-all duration-300`}>
              <p className="text-2xl sm:text-3xl font-black">{item.value ?? 0}</p>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1 opacity-70">{item.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Leads View ───────────────────────────────────────────────────────────────
function LeadsView({ token }) {
  const [leads,      setLeads]      = useState([]);
  const [total,      setTotal]      = useState(0);
  const [pages,      setPages]      = useState(1);
  const [page,       setPage]       = useState(1);
  const [status,     setStatus]     = useState('');
  const [search,     setSearch]     = useState('');
  const [loading,    setLoading]    = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [limit,      setLimit]      = useState(10);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit });
      if (status) params.set('status', status);
      if (search) params.set('search', search);
      const res  = await fetch(`${API_BASE}/api/admin/leads?${params}`, { headers: authHeaders(token) });
      const data = await res.json();
      setLeads(data.leads || []);
      setTotal(data.total || 0);
      setPages(data.pages || 1);
    } catch { /* silent */ }
    finally { setLoading(false); }
  }, [token, page, status, search, limit]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const updateStatus = async (id, newStatus) => {
    await fetch(`${API_BASE}/api/admin/leads/${id}/status`, {
      method: 'PATCH', headers: authHeaders(token),
      body: JSON.stringify({ status: newStatus }),
    });
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const confirmDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/api/admin/leads/${id}`, { method: 'DELETE', headers: authHeaders(token) });
      setLeads(prev => prev.filter(l => l.id !== id));
      setTotal(t => t - 1);
    } catch {}
  };

  const exportCSV = (selectedStatus) => {
    const params = new URLSearchParams();
    if (selectedStatus && selectedStatus !== 'All') {
      params.set('status', selectedStatus);
    }
    fetch(`${API_BASE}/api/admin/leads/export?${params}`, { headers: authHeaders(token) })
      .then(r => r.blob()).then(blob => {
        const url = URL.createObjectURL(blob);
        const a   = document.createElement('a');
        a.href = url;
        a.download = selectedStatus && selectedStatus !== 'All' 
          ? `advait_leads_${selectedStatus.toLowerCase()}.csv` 
          : 'advait_leads_all.csv';
        a.click();
        URL.revokeObjectURL(url);
      });
  };

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-4 py-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Icon.Search /></span>
            <input
              type="text" placeholder="Search name, phone..."
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#f36308]/20 focus:border-[#f36308] transition w-full bg-gray-50 font-semibold"
            />
          </div>
          {/* Status filter */}
          <FilterDropdown
            value={status}
            options={ALL_STATUSES}
            onChange={(val) => { setStatus(val); setPage(1); }}
            colors={STATUS_COLORS}
          />
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={fetchLeads} className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition cursor-pointer select-none">
            <Icon.Refresh /> Refresh
          </button>
          <button onClick={() => setShowExportModal(true)} className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#2c2927] hover:bg-[#f36308] text-white rounded-xl text-sm font-bold transition shadow-sm cursor-pointer select-none">
            <Icon.Download /> Export CSV
          </button>
        </div>
      </div>

      {/* Count pill + Limit selector */}
      <div className="flex items-center justify-between px-1 gap-2">
        <p className="text-xs sm:text-sm text-gray-500 font-semibold truncate">
          {loading ? 'Loading…' : `${total} leads`}
          {status && <span className="ml-2 px-2.5 py-0.5 rounded-full bg-[#f36308]/10 text-[#f36308] text-[10px] font-bold">{status}</span>}
        </p>
        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-gray-400 shrink-0 select-none">
          <span>Show:</span>
          <LimitDropdown
            value={limit}
            onChange={(val) => { setLimit(val); setPage(1); }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto min-h-[280px]">
          <table className="w-full text-sm min-w-[850px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Sr.No.', 'Name', 'Phone', 'Email', 'Service', 'Source', 'Date', 'Status', ''].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-[11px] font-black uppercase tracking-widest text-gray-400 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 && !loading && (
                <tr><td colSpan={9} className="px-5 py-16 text-center text-gray-400 font-semibold text-sm">No leads found</td></tr>
              )}
              {leads.map((lead, idx) => (
                <React.Fragment key={lead.id}>
                  <tr
                    className={`border-b border-gray-50 hover:bg-orange-50/30 transition cursor-pointer ${expandedId === lead.id ? 'bg-orange-50/40' : idx % 2 !== 0 ? 'bg-gray-50/40' : 'bg-white'}`}
                    onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                  >
                    <td className="px-5 py-4 text-gray-400 font-mono text-xs">{(page - 1) * limit + idx + 1}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f36308]/20 to-[#f36308]/5 text-[#f36308] font-black text-xs flex items-center justify-center shrink-0">
                          {lead.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold text-[#2c2927] whitespace-nowrap">{lead.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <a href={`tel:${lead.phone}`} onClick={e => e.stopPropagation()} className="text-[#f36308] font-bold hover:underline whitespace-nowrap">{lead.phone}</a>
                    </td>
                    <td className="px-5 py-4 text-gray-500 max-w-[160px]">
                      {lead.email
                        ? <a href={`mailto:${lead.email}`} onClick={e => e.stopPropagation()} className="hover:text-[#f36308] hover:underline truncate block">{lead.email}</a>
                        : <span className="text-gray-200">—</span>}
                    </td>
                    <td className="px-5 py-4 text-gray-600 max-w-[140px] truncate font-medium" title={lead.service}>{lead.service}</td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-lg font-semibold whitespace-nowrap">{lead.source_form}</span>
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">{fmtDate(lead.created_at)}</td>
                    <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                      <CustomDropdown
                        value={lead.status}
                        options={ALL_STATUSES}
                        onChange={(newStatus) => updateStatus(lead.id, newStatus)}
                        colors={STATUS_COLORS}
                      />
                    </td>
                    <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                      <button onClick={() => setDeleteTargetId(lead.id)} className="p-2 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition cursor-pointer" title="Delete">
                        <Icon.Trash />
                      </button>
                    </td>
                  </tr>
                  {expandedId === lead.id && (
                    <tr className="bg-orange-50/20 border-b border-gray-100">
                      <td colSpan={9} className="px-6 py-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Message / Requirements</p>
                            <p className="text-gray-600 leading-relaxed bg-white rounded-xl p-4 border border-gray-100">
                              {lead.message || <span className="text-gray-300 italic">No message provided</span>}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Contact Details</p>
                            <div className="bg-white rounded-xl p-4 border border-gray-100 space-y-2 text-gray-600">
                              <p>📅 <span className="font-semibold">{fmtDate(lead.created_at)}</span></p>
                              <p>📋 Source: <span className="font-semibold">{lead.source_form}</span></p>
                              <p>🏷️ Service: <span className="font-semibold">{lead.service}</span></p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination at the bottom right */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/30">
          <div className="text-xs text-gray-400 font-semibold">
            Showing {total === 0 ? 0 : (page - 1) * limit + 1}-{Math.min(total, page * limit)} of {total} records
          </div>
          {pages > 1 && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-xl border border-gray-200 hover:bg-white text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
                title="Previous Page"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <span className="text-xs text-gray-500 font-black px-2">
                Page {page} of {pages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(pages, p + 1))}
                disabled={page === pages}
                className="p-2 rounded-xl border border-gray-200 hover:bg-white text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
                title="Next Page"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Custom Delete Confirmation Modal */}
      {deleteTargetId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#2c2927]/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setDeleteTargetId(null)}
          />
          {/* Modal Container */}
          <div className="relative bg-white rounded-3xl border border-gray-150 p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4 text-xl">
                🗑️
              </div>
              <h3 className="text-lg font-black text-[#2c2927] mb-2">Delete Lead</h3>
              <p className="text-sm text-gray-500 font-semibold mb-6">Are you sure you want to permanently delete this lead? This action cannot be undone.</p>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteTargetId(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition cursor-pointer select-none"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const idToDelete = deleteTargetId;
                    setDeleteTargetId(null);
                    confirmDelete(idToDelete);
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition shadow-sm cursor-pointer select-none"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#2c2927]/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setShowExportModal(false)}
          />
          {/* Modal Container */}
          <div className="relative bg-white rounded-3xl border border-gray-150 p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#f36308]/10 text-[#f36308] flex items-center justify-center mx-auto mb-4 text-xl">
                📥
              </div>
              <h3 className="text-lg font-black text-[#2c2927] mb-1">Export Leads</h3>
              <p className="text-xs text-gray-500 font-semibold mb-5">Select which lead category you want to download as Excel/CSV:</p>
              
              <div className="space-y-2 mb-6">
                <button
                  type="button"
                  onClick={() => { setShowExportModal(false); exportCSV('All'); }}
                  className="w-full py-2.5 px-4 text-left rounded-xl border border-gray-100 hover:border-gray-200 bg-gray-50 hover:bg-gray-100/50 text-xs font-bold text-gray-700 transition flex items-center justify-between cursor-pointer select-none"
                >
                  <span>📊 All Leads</span>
                  <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded-full font-bold text-gray-600">All records</span>
                </button>
                {ALL_STATUSES.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { setShowExportModal(false); exportCSV(opt); }}
                    className="w-full py-2.5 px-4 text-left rounded-xl border border-gray-100 hover:border-gray-200 bg-gray-50 hover:bg-gray-100/50 text-xs font-bold text-gray-700 transition flex items-center justify-between cursor-pointer select-none"
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_COLORS[opt]?.dot}`} />
                      {opt} Leads
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold">Category</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="w-full py-2 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:bg-gray-50 transition cursor-pointer select-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Email Template View (Visual Editor) ──────────────────────────────────────
const DEFAULT_FIELDS = {
  headerTitle: "Advait Digital",
  headerSubtitle: "Digital Services",
  greeting: "Thank You, {{name}}! 🎉",
  mainText: "We've received your enquiry for {{service}}. Our expert team is already reviewing your request and will reach out to you on {{phone}} within 24 hours.",
  step1: "Our team reviews your requirements",
  step2: "A dedicated expert calls you for a free consultation",
  step3: "We set up a live demo tailored to your business",
  buttonText: "Visit Our Website",
  buttonUrl: "https://advaitdigital.co.in",
  footerLine1: "Advait Digital",
  footerLine2: "Office No. 522, 5th Floor, Amanora Chambers, Amanora Town Centre, Pune — 411028",
  footerPhone: "+91 82829 82829",
  footerEmail: "sales@advaitteleservices.com"
};

function generatePreviewHtml(fields) {
  const c = { ...DEFAULT_FIELDS, ...fields };
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background-color:#f2f1e5;font-family:'Inter',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f1e5;padding:24px 8px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);">
          <!-- Header -->
          <tr>
            <td style="background:#2c2927;padding:28px 24px;text-align:center;border-bottom:4px solid #f36308;">
              <img src="${c.logoBase64 || 'https://advaitdigital.co.in/favicon.png'}" alt="Logo" width="48" height="48" style="border-radius:10px;margin-bottom:12px;display:block;margin-left:auto;margin-right:auto;" />
              <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:0.3px;">${c.headerTitle}</h1>
              <p style="margin:4px 0 0;font-size:11px;color:#f36308;font-weight:600;text-transform:uppercase;letter-spacing:2px;">${c.headerSubtitle}</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px 24px 24px;">
              <h2 style="margin:0 0 8px;font-size:18px;font-weight:800;color:#2c2927;">${c.greeting}</h2>
              <p style="margin:0 0 20px;font-size:14px;color:#3d3936;line-height:1.6;">${c.mainText}</p>
              <hr style="border:none;border-top:1px solid #f2f1e5;margin:0 0 20px;" />
              <h3 style="margin:0 0 12px;font-size:14px;font-weight:700;color:#2c2927;">What Happens Next?</h3>
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding:6px 0;vertical-align:middle;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:28px;vertical-align:top;">
                          <div style="width:22px;height:22px;border-radius:50%;background:#f36308;color:#fff;text-align:center;line-height:22px;font-size:11px;font-weight:700;">1</div>
                        </td>
                        <td style="padding-left:8px;vertical-align:middle;">
                          <p style="margin:0;font-size:13px;color:#3d3936;font-weight:600;">${c.step1}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;vertical-align:middle;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:28px;vertical-align:top;">
                          <div style="width:22px;height:22px;border-radius:50%;background:#f36308;color:#fff;text-align:center;line-height:22px;font-size:11px;font-weight:700;">2</div>
                        </td>
                        <td style="padding-left:8px;vertical-align:middle;">
                          <p style="margin:0;font-size:13px;color:#3d3936;font-weight:600;">${c.step2}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;vertical-align:middle;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:28px;vertical-align:top;">
                          <div style="width:22px;height:22px;border-radius:50%;background:#f36308;color:#fff;text-align:center;line-height:22px;font-size:11px;font-weight:700;">3</div>
                        </td>
                        <td style="padding-left:8px;vertical-align:middle;">
                          <p style="margin:0;font-size:13px;color:#3d3936;font-weight:600;">${c.step3}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <div style="margin:24px 0 0;text-align:center;">
                <a href="${c.buttonUrl}" style="display:inline-block;background:#f36308;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:50px;">${c.buttonText}</a>
              </div>
            </td>
          </tr>
          <!-- Contact -->
          <tr>
            <td style="background:#fbfbf7;padding:20px 24px;border-top:1px solid #f2f1e5;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:11px;color:#3d3936;line-height:1.6;">
                    <strong style="color:#2c2927;">${c.footerLine1}</strong><br />
                    ${c.footerLine2}<br />
                    📞 <a href="tel:${c.footerPhone.replace(/\s+/g, '')}" style="color:#f36308;text-decoration:none;">${c.footerPhone}</a> &nbsp;|&nbsp;
                    ✉️ <a href="mailto:${c.footerEmail}" style="color:#f36308;text-decoration:none;">${c.footerEmail}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#2c2927;padding:12px 24px;text-align:center;">
              <p style="margin:0;font-size:10px;color:#94a3b8;">
                © 2025 ${c.headerTitle}. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function TemplateView({ token }) {
  const [subject, setSubject] = useState('');
  const [fields, setFields]   = useState(DEFAULT_FIELDS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [msg, setMsg]         = useState('');
  const [activeSection, setActiveSection] = useState('header');

  useEffect(() => {
    fetch(`${API_BASE}/api/admin/template`, { headers: authHeaders(token) })
      .then(r => r.json())
      .then(d => {
        setSubject(d.subject || 'Thank You for Your Enquiry');
        const rawBody = d.body_html || '';
        if (rawBody.trim().startsWith('{')) {
          try {
            const parsed = JSON.parse(rawBody);
            setFields({ ...DEFAULT_FIELDS, ...parsed });
          } catch (e) {
            // Keep default fields
          }
        }
      })
      .catch(() => setMsg('❌ Failed to load template'))
      .finally(() => setLoading(false));
  }, [token]);

  const handleFieldChange = (key, value) => {
    setFields(prev => ({ ...prev, [key]: value }));
  };

  const save = async () => {
    setSaving(true);
    setMsg('');
    try {
      const res = await fetch(`${API_BASE}/api/admin/template`, {
        method: 'PUT',
        headers: authHeaders(token),
        body: JSON.stringify({
          subject,
          body_html: JSON.stringify(fields)
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg('✅ Template configuration saved successfully!');
        setTimeout(() => setMsg(''), 4000);
      } else {
        setMsg('❌ ' + (data.error || 'Save failed'));
      }
    } catch {
      setMsg('❌ Network connection error');
    } finally {
      setSaving(false);
    }
  };

  const sections = [
    { id: 'header', label: '🏷️ Header Details', keys: ['headerTitle', 'headerSubtitle'] },
    { id: 'body', label: '✉️ Email Content & Greeting', keys: ['greeting', 'mainText'] },
    { id: 'steps', label: '📋 Consultation Steps', keys: ['step1', 'step2', 'step3'] },
    { id: 'button', label: '🔗 Call to Action Button', keys: ['buttonText', 'buttonUrl'] },
    { id: 'footer', label: '🏢 Footer & Contact Info', keys: ['footerLine1', 'footerLine2', 'footerPhone', 'footerEmail'] }
  ];

  const fieldLabels = {
    headerTitle: "Header Brand Name",
    headerSubtitle: "Header Subtitle Category",
    greeting: "Greeting Title Line",
    mainText: "Welcome & Info Text Block",
    step1: "First Follow-up Step Description",
    step2: "Second Follow-up Step Description",
    step3: "Third Follow-up Step Description",
    buttonText: "Action Button Label text",
    buttonUrl: "Target Redirect Link URL",
    footerLine1: "Footer Company legal name",
    footerLine2: "Footer Office Address details",
    footerPhone: "Support Mobile Number",
    footerEmail: "Support Email Address"
  };

  const compiledDoc = generatePreviewHtml(fields)
    .replace(/\{\{name\}\}/g, 'Rahul Sharma')
    .replace(/\{\{service\}\}/g, 'Bulk SMS Marketing')
    .replace(/\{\{phone\}\}/g, '+91 98765 43210');

  if (loading) return <div className="p-8 text-center text-gray-400 text-sm font-semibold">Loading template configurations…</div>;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
      {/* Visual Form Panels */}
      <div className="space-y-6">
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="font-black text-[#2c2927] text-lg">Edit Template</h2>
              <p className="text-xs text-gray-400 font-semibold mt-1">Configure email content fields dynamically</p>
            </div>
            <button
              onClick={save}
              disabled={saving}
              className="bg-[#f36308] hover:bg-[#d95507] active:scale-[0.98] text-white font-black px-6 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-[#f36308]/20 disabled:opacity-60 cursor-pointer"
            >
              {saving ? 'Saving…' : '💾 Save Settings'}
            </button>
          </div>

          {msg && (
            <div className={`p-4 rounded-2xl text-xs font-bold border ${msg.startsWith('✅') ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-200 text-red-600'}`}>
              {msg}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Email Subject Line</label>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#f36308]/20 focus:border-[#f36308] transition font-bold text-[#2c2927]"
            />
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {sections.map(s => {
            const isOpen = activeSection === s.id;
            return (
              <div key={s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-200">
                <button
                  onClick={() => setActiveSection(isOpen ? '' : s.id)}
                  className={`w-full px-6 py-4 flex items-center justify-between text-sm font-bold transition-all text-left ${isOpen ? 'bg-orange-50/30 text-[#f36308]' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <span>{s.label}</span>
                  <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#f36308]' : 'text-gray-400'}`}>
                    <Icon.ChevronDown />
                  </span>
                </button>

                {isOpen && (
                  <div className="p-6 border-t border-gray-50 space-y-4 bg-white">
                    {s.id === 'header' && (
                      <div className="space-y-2 border-b border-gray-50 pb-4">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400">Header Branding Logo</label>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl border border-gray-150 bg-gray-50 flex items-center justify-center overflow-hidden">
                            {fields.logoBase64 ? (
                              <img src={fields.logoBase64} alt="Custom Logo" className="w-full h-full object-contain p-1" />
                            ) : (
                              <img src="/favicon.png" alt="Default Logo" className="w-10 h-10 object-contain" />
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <input
                              type="file"
                              accept="image/*"
                              id="logo-upload-input"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const r = new FileReader();
                                  r.onloadend = () => handleFieldChange('logoBase64', r.result);
                                  r.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                            />
                            <label htmlFor="logo-upload-input" className="px-4 py-2 border border-gray-200 text-xs font-bold text-gray-600 rounded-xl hover:bg-gray-50 cursor-pointer text-center select-none transition animate-none">
                              Upload Logo from PC
                            </label>
                            {fields.logoBase64 && (
                              <button type="button" onClick={() => handleFieldChange('logoBase64', '')} className="text-red-500 text-[10px] font-bold hover:underline text-left cursor-pointer transition">
                                Reset to Default Logo
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {s.keys.map(k => (
                      <div key={k} className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400">{fieldLabels[k]}</label>
                        {k === 'mainText' ? (
                          <textarea
                            value={fields[k] || ''}
                            onChange={e => handleFieldChange(k, e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#f36308]/20 focus:border-[#f36308] transition text-[#2c2927] leading-relaxed"
                          />
                        ) : (
                          <input
                            type="text"
                            value={fields[k] || ''}
                            onChange={e => handleFieldChange(k, e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#f36308]/20 focus:border-[#f36308] transition text-[#2c2927] font-semibold"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Devices Iframe Preview */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4 xl:sticky xl:top-24">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-[#2c2927] text-base">Live Preview</h3>
          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" /> Dynamic rendering
          </span>
        </div>
        <div className="border border-gray-100 rounded-2xl overflow-hidden bg-[#f2f1e5] h-[550px] shadow-inner relative">
          <iframe
            srcDoc={compiledDoc}
            title="Realtime Email Preview"
            className="w-full h-full border-0"
            sandbox="allow-same-origin"
          />
        </div>
        <div className="text-[10px] text-gray-400 font-semibold text-center italic leading-relaxed">
          * Placeholders like <code className="bg-gray-100 px-1 py-0.5 rounded">{"{{name}}"}</code>, <code className="bg-gray-100 px-1 py-0.5 rounded">{"{{service}}"}</code> will be dynamically replaced when sending to the user.
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar Nav Item ─────────────────────────────────────────────────────────
function NavItem({ id, label, IconComp, active, onClick, count, collapsed }) {
  return (
    <button
      onClick={() => onClick(id)}
      title={collapsed ? label : undefined}
      className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-bold transition-all duration-150 cursor-pointer group relative ${
        active
          ? 'bg-[#f36308] text-white shadow-lg shadow-[#f36308]/30'
          : 'text-white/60 hover:text-white hover:bg-white/8'
      }`}
    >
      <span className="shrink-0"><IconComp /></span>
      {!collapsed && <span className="truncate">{label}</span>}
      {!collapsed && count !== undefined && (
        <span className={`ml-auto text-[10px] font-black px-2 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-[#f36308]/20 text-[#f36308]'}`}>
          {count}
        </span>
      )}
      {/* Tooltip when collapsed */}
      {collapsed && (
        <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-[#2c2927] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-white/10">
          {label}
        </span>
      )}
    </button>
  );
}

// ─── Main Admin App ───────────────────────────────────────────────────────────
export default function Admin() {
  const [token,     setToken]     = useState(() => sessionStorage.getItem('admin_token') || '');
  const [activeTab, setActiveTab] = useState('dashboard');
  const collapsed = false;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (token) {
      fetch(`${API_BASE}/api/admin/stats`, { headers: authHeaders(token) })
        .then(r => r.json()).then(setStats).catch(() => {});
    }
  }, [token]);

  useEffect(() => {
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = token ? '#f5f4f0' : '#1e1c1a';
    return () => {
      document.body.style.backgroundColor = originalBg;
    };
  }, [token]);

  const logout = () => {
    setShowLogoutModal(true);
  };

  if (!token) return <LoginScreen onLogin={setToken} />;

  const NAV = [
    { id: 'dashboard', label: 'Dashboard',      IconComp: Icon.Dashboard },
    { id: 'leads',     label: 'Leads',           IconComp: Icon.Leads,    count: stats ? +stats.new_leads : undefined },
    { id: 'template',  label: 'Email Template',  IconComp: Icon.Template  },
  ];

  const PAGE_TITLES = {
    dashboard: 'Dashboard',
    leads:     'Lead Management',
    template:  'Email Template',
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/8">
        <img src="/favicon.png" alt="Logo" className="w-9 h-9 rounded-xl border border-white/15 shrink-0" />
        <div>
          <p className="font-black text-white text-base leading-none">Advait <span className="text-[#f36308]">Digital</span></p>
          <p className="text-white/30 text-[10px] font-semibold tracking-wider mt-0.5">CMS ADMIN</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {NAV.map(item => (
          <NavItem key={item.id} {...item} active={activeTab === item.id}
            onClick={(id) => { setActiveTab(id); setMobileOpen(false); }}
            collapsed={collapsed} />
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/8 space-y-1">
        <button onClick={logout}
          className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-bold text-white/40 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
          title="Logout">
          <Icon.Logout />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f4f0] flex font-sans antialiased subpixel-antialiased animate-in fade-in duration-500">

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col flex-shrink-0 bg-[#2c2927] w-60"
        style={{ minHeight: '100vh', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        {sidebarContent}
      </aside>

      {/* ── Mobile Sidebar Overlay ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 bg-[#2c2927] h-full shadow-2xl animate-in slide-in-from-left duration-300 ease-out">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-5 sm:px-8 h-16 flex items-center justify-between shadow-sm sticky top-0 z-40">
          <div className="flex items-center gap-4">
            {/* Mobile menu */}
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition cursor-pointer">
              <Icon.Menu />
            </button>
            <div>
              <h1 className="font-black text-[#2c2927] text-base">{PAGE_TITLES[activeTab]}</h1>
              <p className="text-xs text-gray-400 font-semibold hidden sm:block">Advait Digital — Admin CMS</p>
            </div>
          </div>

          {/* Quick stats pills */}
          {stats && (
            <div className="hidden md:flex items-center gap-6">
              <span className="text-xs font-bold text-blue-600 flex items-center gap-1.5 select-none">
                <SvgNewSmall /> {stats.new_leads} New
              </span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 select-none">
                <SvgConvertedSmall /> {stats.converted} Converted
              </span>
              <span className="text-xs font-bold text-gray-600 flex items-center gap-1.5 select-none">
                <SvgTotalSmall /> {stats.total} Total
              </span>
            </div>
          )}
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <div key={activeTab} className="animate-in fade-in duration-300 ease-out">
            {activeTab === 'dashboard' && <DashboardView token={token} />}
            {activeTab === 'leads'     && <LeadsView     token={token} />}
            {activeTab === 'template'  && <TemplateView  token={token} />}
          </div>
        </main>
      </div>

      {/* Custom Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#2c2927]/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setShowLogoutModal(false)}
          />
          {/* Modal Container */}
          <div className="relative bg-white rounded-3xl border border-gray-150 p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4 text-xl">
                ⚠️
              </div>
              <h3 className="text-lg font-black text-[#2c2927] mb-2">Confirm Logout</h3>
              <p className="text-sm text-gray-500 font-semibold mb-6">Are you sure you want to log out of the CMS admin panel?</p>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition cursor-pointer select-none"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLogoutModal(false);
                    sessionStorage.removeItem('admin_token');
                    setToken('');
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition shadow-sm cursor-pointer select-none"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
