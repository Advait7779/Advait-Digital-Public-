import React, { useState, useEffect, useCallback } from 'react';

// ─── Config ───────────────────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const STATUS_COLORS = {
  New:        { bg: 'bg-blue-100',   text: 'text-blue-700',   dot: 'bg-blue-500'   },
  Contacted:  { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  Converted:  { bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-500'  },
  Closed:     { bg: 'bg-gray-100',   text: 'text-gray-500',   dot: 'bg-gray-400'   },
};
const ALL_STATUSES = ['New', 'Contacted', 'Converted', 'Closed'];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

function authHeaders(token) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, color, icon }) {
  return (
    <div className={`rounded-2xl p-5 border ${color} flex items-center gap-4`}>
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest opacity-70">{label}</p>
        <p className="text-3xl font-black mt-0.5">{value ?? '—'}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || STATUS_COLORS.New;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {status}
    </span>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.token) {
        setError(data.error || 'Invalid password');
      } else {
        sessionStorage.setItem('admin_token', data.token);
        onLogin(data.token);
      }
    } catch {
      setError('Could not connect to backend server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2c2927] via-[#3d3936] to-[#1a1715] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/favicon.png" alt="Advait Digital" className="w-16 h-16 rounded-2xl mx-auto mb-4 shadow-xl border-2 border-white/10" />
          <h1 className="text-2xl font-black text-white tracking-tight">Advait <span className="text-[#f36308]">Digital</span></h1>
          <p className="text-white/50 text-sm mt-1 font-medium">CMS Admin Panel</p>
        </div>

        {/* Card */}
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-white text-lg font-bold mb-6">Admin Login</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#f36308]/50 focus:border-[#f36308] transition"
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f36308] hover:bg-[#d95507] text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-[#f36308]/30 disabled:opacity-60 cursor-pointer"
            >
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Email Template Editor ────────────────────────────────────────────────────
function TemplateEditor({ token }) {
  const [subject,  setSubject]  = useState('');
  const [bodyHtml, setBodyHtml] = useState('');
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [msg,      setMsg]      = useState('');
  const [tab,      setTab]      = useState('edit'); // 'edit' | 'preview'

  useEffect(() => {
    fetch(`${API_BASE}/api/admin/template`, { headers: authHeaders(token) })
      .then(r => r.json())
      .then(data => { setSubject(data.subject || ''); setBodyHtml(data.body_html || ''); })
      .catch(() => setMsg('❌ Failed to load template'))
      .finally(() => setLoading(false));
  }, [token]);

  const save = async () => {
    setSaving(true);
    setMsg('');
    try {
      const res = await fetch(`${API_BASE}/api/admin/template`, {
        method: 'PUT',
        headers: authHeaders(token),
        body: JSON.stringify({ subject, body_html: bodyHtml }),
      });
      const data = await res.json();
      if (data.success) setMsg('✅ Template saved successfully!');
      else setMsg('❌ ' + (data.error || 'Save failed'));
    } catch {
      setMsg('❌ Network error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-400">Loading template…</div>;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-black text-[#2c2927]">Thank You Email Template</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Uses <code className="bg-gray-100 px-1 rounded text-[#f36308] font-mono text-xs">{'{{'+'name'+'}}'}</code>, <code className="bg-gray-100 px-1 rounded text-[#f36308] font-mono text-xs">{'{{'+'service'+'}}'}</code>, <code className="bg-gray-100 px-1 rounded text-[#f36308] font-mono text-xs">{'{{'+'phone'+'}}'}</code> as placeholders
          </p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="bg-[#f36308] hover:bg-[#d95507] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-[#f36308]/20 disabled:opacity-60 cursor-pointer"
        >
          {saving ? 'Saving…' : '💾 Save Template'}
        </button>
      </div>

      {msg && (
        <div className={`p-3 rounded-xl text-sm font-semibold border ${msg.startsWith('✅') ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-600'}`}>
          {msg}
        </div>
      )}

      {/* Subject line */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Email Subject Line</label>
        <input
          type="text"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#f36308]/20 focus:border-[#f36308] transition"
        />
      </div>

      {/* Tab toggle */}
      <div className="flex gap-2">
        {['edit', 'preview'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition cursor-pointer ${tab === t ? 'bg-[#2c2927] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {t === 'edit' ? '✏️ Edit HTML' : '👁️ Preview'}
          </button>
        ))}
      </div>

      {tab === 'edit' ? (
        <textarea
          value={bodyHtml}
          onChange={e => setBodyHtml(e.target.value)}
          rows={24}
          spellCheck={false}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#f36308]/20 focus:border-[#f36308] transition resize-y leading-relaxed"
        />
      ) : (
        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50 h-[520px]">
          <iframe
            srcDoc={bodyHtml
              .replace(/\{\{name\}\}/g, 'Rahul Sharma')
              .replace(/\{\{service\}\}/g, 'Bulk SMS Marketing')
              .replace(/\{\{phone\}\}/g, '+91 98765 43210')}
            title="Email Preview"
            className="w-full h-full border-0"
            sandbox="allow-same-origin"
          />
        </div>
      )}
    </div>
  );
}

// ─── Leads Table ─────────────────────────────────────────────────────────────
function LeadsTable({ token }) {
  const [leads,   setLeads]   = useState([]);
  const [total,   setTotal]   = useState(0);
  const [pages,   setPages]   = useState(1);
  const [page,    setPage]    = useState(1);
  const [status,  setStatus]  = useState('');
  const [search,  setSearch]  = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 20 });
      if (status) params.set('status', status);
      if (search) params.set('search', search);
      const res  = await fetch(`${API_BASE}/api/admin/leads?${params}`, { headers: authHeaders(token) });
      const data = await res.json();
      setLeads(data.leads || []);
      setTotal(data.total || 0);
      setPages(data.pages || 1);
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  }, [token, page, status, search]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const updateStatus = async (id, newStatus) => {
    await fetch(`${API_BASE}/api/admin/leads/${id}/status`, {
      method: 'PATCH',
      headers: authHeaders(token),
      body: JSON.stringify({ status: newStatus }),
    });
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const deleteLead = async (id) => {
    if (!confirm('Are you sure you want to delete this lead? This cannot be undone.')) return;
    await fetch(`${API_BASE}/api/admin/leads/${id}`, { method: 'DELETE', headers: authHeaders(token) });
    setLeads(prev => prev.filter(l => l.id !== id));
    setTotal(t => t - 1);
  };

  const exportCSV = () => {
    window.open(`${API_BASE}/api/admin/leads/export?token=${token}`, '_blank');
    // fallback using auth header fetch
    fetch(`${API_BASE}/api/admin/leads/export`, { headers: authHeaders(token) })
      .then(r => r.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'advait_leads.csv';
        a.click();
        URL.revokeObjectURL(url);
      });
  };

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search name, phone, email…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#f36308]/20 focus:border-[#f36308] transition w-60"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          </div>

          <select
            value={status}
            onChange={e => { setStatus(e.target.value); setPage(1); }}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#f36308]/20 focus:border-[#f36308] transition bg-white cursor-pointer"
          >
            <option value="">All Statuses</option>
            {ALL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={fetchLeads}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition cursor-pointer"
          >
            🔄 Refresh
          </button>
          <button
            onClick={exportCSV}
            className="px-4 py-2 bg-[#2c2927] hover:bg-[#f36308] text-white rounded-xl text-sm font-bold transition shadow-sm cursor-pointer"
          >
            📥 Export CSV
          </button>
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-gray-500 font-medium">
        {loading ? 'Loading…' : `Showing ${leads.length} of ${total} leads`}
      </p>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {['#', 'Name', 'Phone', 'Email', 'Service', 'Source', 'Date', 'Status', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && !loading && (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center text-gray-400 font-medium">
                  No leads found
                </td>
              </tr>
            )}
            {leads.map((lead, idx) => (
              <React.Fragment key={lead.id}>
                <tr
                  className={`border-b border-gray-100 hover:bg-orange-50/40 transition cursor-pointer ${expandedId === lead.id ? 'bg-orange-50/60' : idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                  onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                >
                  <td className="px-4 py-3 text-gray-400 font-mono text-xs">#{lead.id}</td>
                  <td className="px-4 py-3 font-bold text-[#2c2927] whitespace-nowrap">{lead.name}</td>
                  <td className="px-4 py-3">
                    <a href={`tel:${lead.phone}`} onClick={e => e.stopPropagation()} className="text-[#f36308] font-bold hover:underline">
                      {lead.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-gray-600 max-w-[160px] truncate">
                    {lead.email
                      ? <a href={`mailto:${lead.email}`} onClick={e => e.stopPropagation()} className="hover:text-[#f36308] hover:underline">{lead.email}</a>
                      : <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-700 max-w-[140px] truncate" title={lead.service}>{lead.service}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{lead.source_form}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{fmtDate(lead.created_at)}</td>
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    <select
                      value={lead.status}
                      onChange={e => updateStatus(lead.id, e.target.value)}
                      className={`text-xs font-bold rounded-full px-2.5 py-1 border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#f36308]/30 ${STATUS_COLORS[lead.status]?.bg} ${STATUS_COLORS[lead.status]?.text}`}
                    >
                      {ALL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => deleteLead(lead.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition cursor-pointer"
                      title="Delete lead"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>

                {/* Expanded row */}
                {expandedId === lead.id && (
                  <tr className="bg-orange-50/30 border-b border-gray-100">
                    <td colSpan={9} className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-xs font-bold uppercase text-gray-500 mb-1">Message / Requirements</p>
                          <p className="text-gray-700 leading-relaxed">{lead.message || <span className="text-gray-300">No message provided</span>}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase text-gray-500 mb-1">Full Details</p>
                          <div className="space-y-1 text-gray-600">
                            <p>📅 {fmtDate(lead.created_at)}</p>
                            <p>📋 Source: {lead.source_form}</p>
                            <p>🏷️ Service: {lead.service}</p>
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

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center gap-2 justify-center">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition disabled:opacity-40 cursor-pointer"
          >
            ← Prev
          </button>
          <span className="text-sm text-gray-500 font-medium">Page {page} of {pages}</span>
          <button
            onClick={() => setPage(p => Math.min(pages, p + 1))}
            disabled={page === pages}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition disabled:opacity-40 cursor-pointer"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────
function DashboardStats({ token }) {
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/admin/stats`, { headers: authHeaders(token) })
      .then(r => r.json())
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{Array(4).fill(0).map((_, i) => <div key={i} className="rounded-2xl h-24 bg-gray-100 animate-pulse" />)}</div>;
  if (!stats)  return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard label="Total Leads"  value={stats.total}       color="bg-indigo-50 border-indigo-100 text-indigo-800"  icon="📊" />
      <StatCard label="New"          value={stats.new_leads}   color="bg-blue-50 border-blue-100 text-blue-800"        icon="🆕" />
      <StatCard label="Contacted"    value={stats.contacted}   color="bg-yellow-50 border-yellow-100 text-yellow-800"  icon="📞" />
      <StatCard label="Converted"    value={stats.converted}   color="bg-green-50 border-green-100 text-green-800"     icon="✅" />
    </div>
  );
}

// ─── Main Admin App ───────────────────────────────────────────────────────────
export default function Admin() {
  const [token,   setToken]   = useState(() => sessionStorage.getItem('admin_token') || '');
  const [activeTab, setTab]   = useState('leads');

  const logout = () => {
    sessionStorage.removeItem('admin_token');
    setToken('');
  };

  if (!token) {
    return <LoginScreen onLogin={setToken} />;
  }

  const TABS = [
    { id: 'leads',    label: '📋 Leads',         },
    { id: 'template', label: '✉️ Email Template', },
  ];

  return (
    <div className="min-h-screen bg-[#f8f7f2]">
      {/* Top Bar */}
      <header className="bg-[#2c2927] shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="Advait Digital" className="w-8 h-8 rounded-lg border border-white/10" />
            <div>
              <span className="text-white font-black text-base">Advait <span className="text-[#f36308]">Digital</span></span>
              <span className="ml-2 text-xs text-white/40 font-semibold hidden sm:inline">CMS Admin</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="px-4 py-1.5 text-xs font-bold text-white/60 hover:text-white border border-white/15 hover:border-white/30 rounded-lg transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats */}
        <DashboardStats token={token} />

        {/* Tab nav */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-200">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-6 py-4 text-sm font-bold transition cursor-pointer flex-1 sm:flex-none ${
                  activeTab === t.id
                    ? 'text-[#f36308] border-b-2 border-[#f36308] bg-orange-50/40'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'leads'    && <LeadsTable      token={token} />}
            {activeTab === 'template' && <TemplateEditor  token={token} />}
          </div>
        </div>
      </main>
    </div>
  );
}
