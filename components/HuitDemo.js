'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area
} from 'recharts'

const SUPABASE_URL = 'https://zilgzkgycyjrmziummgl.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppbGd6a2d5Y3lqcm16aXVtbWdsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDY5Njg2NiwiZXhwIjoyMDg2MjcyODY2fQ.SoKOfY786wOpXYzsIxIiqWX8QOcu-Dbcpb8NfIZK5hE'
const CREDS = { username: 'dr.huit', password: 'huitdr907$$' }

const sb = async (path, params = '') => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}${params}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'count=exact',
    },
  })
  return res.json()
}

const fmt = (n) =>
  n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B` :
  n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` :
  n >= 1e3 ? `${(n / 1e3).toFixed(0)}K` : `${n}`

const fmtNum = (n) =>
  n >= 1e6 ? `${(n / 1e6).toFixed(2)}M` :
  n >= 1e3 ? `${(n / 1e3).toFixed(0)}K` : `${n}`

const STYLE = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #060a10; font-family: 'Syne', sans-serif; color: #e2e8f0; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: #0d1520; }
  ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 2px; }
  .mono { font-family: 'Space Mono', monospace; }
  .card { background: rgba(13,21,32,0.95); border: 1px solid rgba(0,212,255,0.12); border-radius: 8px; padding: 20px; transition: border-color 0.2s; }
  .card:hover { border-color: rgba(0,212,255,0.28); }
  .btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 6px; border: none; cursor: pointer; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13px; transition: all 0.2s; letter-spacing: 0.3px; }
  .btn-primary { background: linear-gradient(135deg,#00d4ff,#0066ff); color: #fff; }
  .btn-primary:hover { opacity: 0.85; transform: translateY(-1px); }
  .btn-ghost { background: rgba(0,212,255,0.08); color: #00d4ff; border: 1px solid rgba(0,212,255,0.2); }
  .btn-ghost:hover { background: rgba(0,212,255,0.15); }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 6px; cursor: pointer; transition: all 0.15s; border: 1px solid transparent; font-size: 13px; font-weight: 600; color: #94a3b8; }
  .nav-item:hover { background: rgba(0,212,255,0.08); color: #00d4ff; border-color: rgba(0,212,255,0.15); }
  .nav-item.active { background: rgba(0,212,255,0.12); color: #00d4ff; border-color: rgba(0,212,255,0.25); }
  .tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; letter-spacing: 0.5px; border: 1px solid; }
  .spinner { width: 28px; height: 28px; border: 2px solid rgba(0,212,255,0.2); border-top-color: #00d4ff; border-radius: 50%; animation: spin 0.7s linear infinite; margin: 0 auto; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .pulse { animation: pulse 2s ease-in-out infinite; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
  .slide-in { animation: slideIn 0.3s ease-out; }
  @keyframes slideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .grid-bg { background-image: linear-gradient(rgba(0,212,255,0.025) 1px,transparent 1px), linear-gradient(90deg,rgba(0,212,255,0.025) 1px,transparent 1px); background-size: 40px 40px; }
  input, select, textarea { background: rgba(13,21,32,0.8); border: 1px solid rgba(0,212,255,0.15); border-radius: 6px; color: #e2e8f0; padding: 8px 12px; font-family: 'Syne', sans-serif; font-size: 13px; outline: none; transition: border-color 0.2s; }
  input:focus, select:focus, textarea:focus { border-color: rgba(0,212,255,0.5); }
  input::placeholder { color: #2a4060; }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: left; padding: 10px 14px; font-size: 10px; font-weight: 700; letter-spacing: 1px; color: #2a4060; border-bottom: 1px solid rgba(0,212,255,0.08); text-transform: uppercase; }
  td { padding: 10px 14px; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.04); color: #94a3b8; }
  tr:hover td { background: rgba(0,212,255,0.03); color: #e2e8f0; }
  .chat-msg { padding: 14px 18px; border-radius: 8px; max-width: 85%; font-size: 13px; line-height: 1.6; }
  .chat-user { background: rgba(0,102,255,0.15); border: 1px solid rgba(0,102,255,0.25); align-self: flex-end; color: #e2e8f0; }
  .chat-ai { background: rgba(0,212,255,0.06); border: 1px solid rgba(0,212,255,0.14); align-self: flex-start; color: #b0c8e8; }
`

// ── KPI Card
const KPI = ({ label, value, sub, color = '#00d4ff', icon }) => (
  <div className="card slide-in" style={{ position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${color},transparent)` }} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#2a4060', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
        <div className="mono" style={{ fontSize: 26, fontWeight: 700, color, letterSpacing: '-0.5px' }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: '#2a4060', marginTop: 6 }}>{sub}</div>}
      </div>
      <div style={{ fontSize: 22, opacity: 0.35 }}>{icon}</div>
    </div>
  </div>
)

// ── Signal Badge
const SignalBadge = ({ type }) => {
  const map = {
    recruiting_window: ['#00ff87', '#001a0d'],
    retention_risk: ['#ff6b35', '#1a0800'],
    market_opportunity: ['#00d4ff', '#001520'],
  }
  const [text, bg] = map[type] || ['#94a3b8', '#1a1a2e']
  return (
    <span className="tag" style={{ background: bg, color: text, borderColor: `${text}33` }}>
      {type?.replace(/_/g, ' ').toUpperCase()}
    </span>
  )
}

// ── LOGIN
const LoginScreen = ({ onLogin }) => {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = async () => {
    setLoading(true); setErr('')
    await new Promise(r => setTimeout(r, 900))
    if (user === CREDS.username && pass === CREDS.password) onLogin()
    else { setErr('Invalid credentials.'); setLoading(false) }
  }

  return (
    <div className="grid-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#060a10', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '18%', left: '28%', width: 500, height: 500, background: 'radial-gradient(circle,rgba(0,212,255,0.05) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '18%', right: '22%', width: 350, height: 350, background: 'radial-gradient(circle,rgba(0,102,255,0.05) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ width: 420, padding: 48, background: 'rgba(13,21,32,0.96)', border: '1px solid rgba(0,212,255,0.14)', borderRadius: 14, backdropFilter: 'blur(20px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 10, letterSpacing: '3px', color: '#00d4ff', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase' }}>HUIT.AI INTELLIGENCE PLATFORM</div>
          <div style={{ fontSize: 38, fontWeight: 800, background: 'linear-gradient(135deg,#00d4ff,#0066ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1px' }}>HyperLoan AI</div>
          <div style={{ fontSize: 12, color: '#2a4060', marginTop: 8 }}>Mortgage Intelligence · APEX Recruiting · CRMEX</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#2a4060', marginBottom: 6, textTransform: 'uppercase' }}>Username</div>
            <input value={user} onChange={e => setUser(e.target.value)} placeholder="dr.huit" style={{ width: '100%' }} onKeyDown={e => e.key === 'Enter' && handle()} />
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#2a4060', marginBottom: 6, textTransform: 'uppercase' }}>Password</div>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••••" style={{ width: '100%' }} onKeyDown={e => e.key === 'Enter' && handle()} />
          </div>
          {err && <div style={{ fontSize: 12, color: '#ff6b6b', textAlign: 'center' }}>{err}</div>}
          <button className="btn btn-primary" onClick={handle} disabled={loading} style={{ width: '100%', marginTop: 6, padding: '13px 0', justifyContent: 'center', fontSize: 14, letterSpacing: '0.5px' }}>
            {loading
              ? <><span className="spinner" style={{ width: 16, height: 16, marginRight: 8 }} />AUTHENTICATING...</>
              : 'LAUNCH PLATFORM →'}
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 28 }}>
          {['LIVE DATA', '7YR HMDA', 'AI POWERED'].map(t => (
            <div key={t} style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1px', color: '#1e3a5f', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#00ff87', display: 'inline-block' }} />{t}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── COMMAND CENTER
const CommandCenter = ({ data }) => {
  const { states = [], production = [], pulse = [] } = data
  const totalVolume = production.reduce((s, r) => s + (r.total_volume || 0), 0)
  const totalOrigs = production.reduce((s, r) => s + (r.total_originations || 0), 0)
  const chartData = [...states].sort((a, b) => b.total_originations - a.total_originations).slice(0, 10)
    .map(s => ({ state: s.state_code, origs: s.total_originations }))

  return (
    <div className="slide-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        <KPI label="Platform MRR" value="$50,000" sub="25 Founding Members · 3 tiers" color="#00ff87" icon="💰" />
        <KPI label="HMDA Coverage" value="7 Years" sub="2017–2024 · 51 states · Live" color="#00d4ff" icon="🏛️" />
        <KPI label="Market Originations" value={fmtNum(totalOrigs)} sub="2023 top lenders combined" color="#a78bfa" icon="📊" />
        <KPI label="Total Volume Tracked" value={fmt(totalVolume)} sub="Production data · 2023" color="#f59e0b" icon="🏦" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div className="card">
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#00d4ff', marginBottom: 16, textTransform: 'uppercase' }}>Top 10 States — 2023 Originations (HMDA Live)</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="barG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4ff" /><stop offset="100%" stopColor="#0066ff" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="state" tick={{ fill: '#2a4060', fontSize: 11 }} />
              <YAxis tick={{ fill: '#2a4060', fontSize: 10 }} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: '#0d1520', border: '1px solid #00d4ff33', borderRadius: 6, fontSize: 12 }} formatter={v => [fmtNum(v), 'Originations']} />
              <Bar dataKey="origs" fill="url(#barG)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#00d4ff', marginBottom: 14, textTransform: 'uppercase' }}>Market Pulse Signals</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pulse.map(p => (
              <div key={p.id} style={{ padding: '10px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: 6, border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#e2e8f0' }}>{p.market_name}</span>
                  <span className="mono" style={{ fontSize: 15, fontWeight: 700, color: p.composite_score >= 70 ? '#00ff87' : p.composite_score >= 55 ? '#f59e0b' : '#ff6b6b' }}>{p.composite_score}</span>
                </div>
                <SignalBadge type={p.signal_type} />
                <div style={{ fontSize: 10, color: '#2a4060', marginTop: 5, lineHeight: 1.4 }}>{p.ai_insight?.substring(0, 85)}...</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card">
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#00d4ff', marginBottom: 14, textTransform: 'uppercase' }}>Platform Modules — Live Status</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 10 }}>
          {['CRMEX','APEX','HuitSign','Agent AI','Prop Pulse','HyperLoan','Campaigns'].map(m => (
            <div key={m} style={{ textAlign: 'center', padding: '12px 8px', background: 'rgba(0,0,0,0.3)', borderRadius: 6, border: '1px solid rgba(0,255,135,0.12)' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00ff87', margin: '0 auto 6px', boxShadow: '0 0 8px #00ff87' }} className="pulse" />
              <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8' }}>{m}</div>
              <div style={{ fontSize: 9, color: '#00ff87', marginTop: 2 }}>LIVE</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── CRMEX
const CRMEX = ({ data }) => {
  const { stages = [], clients = [], reports = [] } = data
  const uniqueReports = [...new Map(reports.map(r => [r.subject_nmls, r])).values()]
  return (
    <div className="slide-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        <KPI label="Pipeline Stages" value={stages.length} sub="Active CRM stages" color="#00d4ff" icon="📋" />
        <KPI label="Active Clients" value={clients.length} sub="Huit.AI subscribers" color="#00ff87" icon="🏢" />
        <KPI label="APEX Reports" value={uniqueReports.length} sub="LO intelligence reports" color="#a78bfa" icon="📄" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card">
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#00d4ff', marginBottom: 14, textTransform: 'uppercase' }}>CRM Pipeline Stages</div>
          <div style={{ display: 'flex', gap: 0, marginBottom: 16 }}>
            {stages.map((s, i) => (
              <div key={s.id} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: 6, background: s.color || '#1e3a5f', borderRadius: i === 0 ? '3px 0 0 3px' : i === stages.length - 1 ? '0 3px 3px 0' : 0 }} />
                <div style={{ fontSize: 9, color: '#2a4060', marginTop: 6, fontWeight: 600 }}>{s.name}</div>
                <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: s.color || '#00d4ff', marginTop: 2 }}>0</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: '#2a4060', textAlign: 'center', padding: '12px 0' }}>Pipeline active — ready for leads import</div>
        </div>
        <div className="card">
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#00d4ff', marginBottom: 14, textTransform: 'uppercase' }}>Client Accounts</div>
          <table>
            <thead><tr><th>Company</th><th>Plan</th><th>Credits</th><th>Status</th></tr></thead>
            <tbody>
              {clients.map(c => (
                <tr key={c.id}>
                  <td><div style={{ fontWeight: 600, color: '#e2e8f0' }}>{c.company_name}</div><div style={{ fontSize: 10, color: '#2a4060' }}>{c.email}</div></td>
                  <td><span className="tag" style={{ color: '#00d4ff', borderColor: '#00d4ff33', background: '#00d4ff0d' }}>{c.plan?.toUpperCase()}</span></td>
                  <td className="mono" style={{ color: '#a78bfa' }}>{c.report_credits}</td>
                  <td><span className="tag" style={{ color: '#00ff87', borderColor: '#00ff8733', background: '#00ff870d' }}>{c.status?.toUpperCase()}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card">
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#00d4ff', marginBottom: 14, textTransform: 'uppercase' }}>APEX Intelligence Reports</div>
        <table>
          <thead><tr><th>LO Name</th><th>NMLS</th><th>Company</th><th>TLS Score</th><th>Composite</th><th>Co. Fit</th><th>Status</th></tr></thead>
          <tbody>
            {uniqueReports.map(r => (
              <tr key={r.id}>
                <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{r.subject_name}</td>
                <td className="mono" style={{ color: '#2a4060' }}>#{r.subject_nmls}</td>
                <td>{r.subject_company}</td>
                <td><span className="mono" style={{ color: r.tls_score >= 7 ? '#00ff87' : '#f59e0b', fontWeight: 700, fontSize: 15 }}>{r.tls_score}</span><span style={{ color: '#2a4060', fontSize: 10 }}>/10</span></td>
                <td><span className="mono" style={{ color: '#00d4ff', fontWeight: 700 }}>{r.composite_score}</span></td>
                <td><span className="mono" style={{ color: '#a78bfa' }}>{r.company_fit_score}%</span></td>
                <td><span className="tag" style={{ color: '#00ff87', borderColor: '#00ff8733', background: '#00ff870d' }}>{r.status?.toUpperCase()}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        {reports[0] && (
          <div style={{ marginTop: 14, padding: '12px 14px', background: 'rgba(0,212,255,0.04)', borderRadius: 6, border: '1px solid rgba(0,212,255,0.1)' }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#00d4ff', marginBottom: 4, letterSpacing: '1px' }}>AI EXECUTIVE SUMMARY</div>
            <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6 }}>{reports[0].executive_summary}</div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── APEX
const APEX = ({ data }) => {
  const { pulse = [], production = [] } = data
  return (
    <div className="slide-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        <KPI label="Market Signals" value={pulse.length} sub="Live APEX pulse markets" color="#00ff87" icon="📡" />
        <KPI label="TLS Accuracy" value="86%" sub="Backtested · APM cohort" color="#00d4ff" icon="🎯" />
        <KPI label="Lenders Tracked" value={production.length} sub="HMDA production 2023" color="#a78bfa" icon="🏦" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card">
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#00d4ff', marginBottom: 14, textTransform: 'uppercase' }}>Live Market Pulse — APEX Signals</div>
          {pulse.map(p => (
            <div key={p.id} style={{ marginBottom: 14, padding: 14, background: 'rgba(0,0,0,0.3)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#e2e8f0', marginBottom: 4 }}>{p.market_name}</div>
                  <SignalBadge type={p.signal_type} />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="mono" style={{ fontSize: 28, fontWeight: 700, color: p.composite_score >= 70 ? '#00ff87' : '#f59e0b', lineHeight: 1 }}>{p.composite_score}</div>
                  <div style={{ fontSize: 9, color: '#2a4060' }}>COMPOSITE</div>
                </div>
              </div>
              {[['Borrower Intent', p.borrower_intent_index, '#00d4ff'], ['Talent Movement', p.talent_movement_index, '#a78bfa'], ['Comp Pressure', p.competitive_pressure_index, '#ff6b6b']].map(([l, v, c]) => (
                <div key={l} style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 9, color: '#2a4060', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{l}</span>
                    <span className="mono" style={{ fontSize: 11, color: c }}>{v}</span>
                  </div>
                  <div style={{ height: 4, background: '#0d1520', borderRadius: 2 }}>
                    <div style={{ width: `${v}%`, height: '100%', background: c, borderRadius: 2, transition: 'width 1s' }} />
                  </div>
                </div>
              ))}
              <div style={{ fontSize: 11, color: '#2a4060', marginTop: 8, lineHeight: 1.5 }}>{p.ai_insight}</div>
            </div>
          ))}
        </div>
        <div className="card">
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#00d4ff', marginBottom: 14, textTransform: 'uppercase' }}>Top Lenders — 2023 (HMDA Live)</div>
          <table>
            <thead><tr><th>Rank</th><th>Originations</th><th>Volume</th><th>Avg Loan</th><th>Purchase%</th></tr></thead>
            <tbody>
              {production.slice(0, 8).map((r, i) => (
                <tr key={r.id}>
                  <td><div className="mono" style={{ fontSize: 10, color: '#2a4060' }}>#{i + 1}</div></td>
                  <td className="mono" style={{ color: '#00d4ff', fontWeight: 700 }}>{fmtNum(r.total_originations)}</td>
                  <td className="mono" style={{ color: '#00ff87' }}>{fmt(r.total_volume)}</td>
                  <td className="mono" style={{ color: '#94a3b8' }}>${(r.avg_loan_size / 1000).toFixed(0)}K</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 36, height: 4, background: '#0d1520', borderRadius: 2 }}>
                        <div style={{ width: `${r.purchase_pct}%`, height: '100%', background: '#a78bfa', borderRadius: 2 }} />
                      </div>
                      <span className="mono" style={{ fontSize: 11 }}>{r.purchase_pct}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── PROPERTY PULSE
const PropertyPulse = ({ data }) => {
  const { states = [] } = data
  const top = [...states].sort((a, b) => b.total_originations - a.total_originations).slice(0, 12)
  const chartData = top.map(s => ({ state: s.state_code, vol: Math.round(s.total_volume_000s / 1000000) }))
  const maxLoan = states.length ? Math.max(...states.map(s => s.avg_loan_size)) : 0
  const topState = states.find(s => s.avg_loan_size === maxLoan)

  return (
    <div className="slide-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        <KPI label="States Tracked" value={states.length} sub="Full US market coverage" color="#00d4ff" icon="🗺️" />
        <KPI label="Highest Avg Loan" value={`$${Math.round(maxLoan / 1000)}K`} sub={topState?.state_code + ' · 2023'} color="#00ff87" icon="🏆" />
        <KPI label="National Avg Loan" value={`$${Math.round(states.reduce((s, r) => s + r.avg_loan_size, 0) / (states.length || 1) / 1000)}K`} sub="All states · 2023" color="#a78bfa" icon="💵" />
        <KPI label="Active Lenders" value={fmtNum(states.reduce((s, r) => s + (r.active_lenders || 0), 0))} sub="Unique market participants" color="#f59e0b" icon="🏗️" />
      </div>
      <div className="card">
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#00d4ff', marginBottom: 16, textTransform: 'uppercase' }}>State Market Volume — 2023 HMDA ($B)</div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="aG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="state" tick={{ fill: '#2a4060', fontSize: 11 }} />
            <YAxis tick={{ fill: '#2a4060', fontSize: 10 }} tickFormatter={v => `$${v}B`} />
            <Tooltip contentStyle={{ background: '#0d1520', border: '1px solid #00d4ff33', borderRadius: 6, fontSize: 12 }} formatter={v => [`$${v}B`, 'Volume']} />
            <Area type="monotone" dataKey="vol" stroke="#00d4ff" fill="url(#aG)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="card">
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#00d4ff', marginBottom: 14, textTransform: 'uppercase' }}>State Market Intelligence — HMDA 2023 Live</div>
        <table>
          <thead><tr><th>State</th><th>Originations</th><th>Volume</th><th>Avg Loan</th><th>FHA</th><th>VA</th><th>Conv</th><th>Lenders</th></tr></thead>
          <tbody>
            {top.map(s => (
              <tr key={s.id}>
                <td><span className="mono" style={{ fontWeight: 700, color: '#00d4ff', fontSize: 14 }}>{s.state_code}</span></td>
                <td className="mono" style={{ fontWeight: 700, color: '#e2e8f0' }}>{fmtNum(s.total_originations)}</td>
                <td className="mono" style={{ color: '#00ff87' }}>{fmt(s.total_volume_000s * 1000)}</td>
                <td className="mono" style={{ color: '#94a3b8' }}>${(s.avg_loan_size / 1000).toFixed(0)}K</td>
                <td className="mono" style={{ color: '#2a4060' }}>{fmtNum(s.fha_originations)}</td>
                <td className="mono" style={{ color: '#2a4060' }}>{fmtNum(s.va_originations)}</td>
                <td className="mono" style={{ color: '#2a4060' }}>{fmtNum(s.conv_originations)}</td>
                <td className="mono" style={{ color: '#a78bfa' }}>{s.active_lenders?.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── HUIT SIGN
const HuitSign = () => (
  <div className="slide-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
      <KPI label="Platform Status" value="LIVE" sub="E-SIGN compliant · SHA-256" color="#00ff87" icon="✅" />
      <KPI label="Multi-Signer" value="ENABLED" sub="Sequential & parallel" color="#00d4ff" icon="✍️" />
      <KPI label="Tamper Detection" value="ACTIVE" sub="SHA-256 hash verify" color="#a78bfa" icon="🔒" />
      <KPI label="Documents Signed" value="0" sub="Awaiting first signature" color="#f59e0b" icon="📝" />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div className="card">
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#00d4ff', marginBottom: 14, textTransform: 'uppercase' }}>HuitSign Capabilities</div>
        {[
          { icon: '🔏', title: 'E-SIGN Act Compliant', desc: 'Full federal E-SIGN Act and UETA compliance built-in' },
          { icon: '🔗', title: 'Multi-Signer Workflows', desc: 'Sequential or parallel signing with custom order routing' },
          { icon: '🛡️', title: 'SHA-256 Tamper Detection', desc: 'Cryptographic hash verification on every document event' },
          { icon: '📧', title: 'Automated Notifications', desc: 'Signing request, reminder, and completion email workflows' },
          { icon: '📋', title: 'Audit Trail', desc: 'Complete timestamp + IP address log per document' },
          { icon: '📱', title: 'Mobile Optimized', desc: 'Touch-enabled signature capture on any device' },
        ].map(f => (
          <div key={f.title} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ fontSize: 20 }}>{f.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#e2e8f0', marginBottom: 2 }}>{f.title}</div>
              <div style={{ fontSize: 11, color: '#2a4060' }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="card">
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#00d4ff', marginBottom: 14, textTransform: 'uppercase' }}>Document Queue</div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px 0', gap: 12 }}>
          <div style={{ fontSize: 48, opacity: 0.2 }}>📄</div>
          <div style={{ fontSize: 13, color: '#2a4060', textAlign: 'center' }}>No documents in queue<br />Platform live and ready</div>
          <button className="btn btn-primary" style={{ marginTop: 8 }}>+ NEW DOCUMENT</button>
        </div>
      </div>
    </div>
  </div>
)

// ── CAMPAIGNS
const CampaignManager = () => (
  <div className="slide-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
      <KPI label="Active Campaigns" value="0" sub="Ready to launch" color="#00d4ff" icon="📣" />
      <KPI label="Leads in System" value="0" sub="Pipeline ready" color="#00ff87" icon="👥" />
      <KPI label="AI Lead Scoring" value="LIVE" sub="Behavioral prediction engine" color="#a78bfa" icon="🤖" />
      <KPI label="Email Templates" value="READY" sub="Multi-touch sequences" color="#f59e0b" icon="✉️" />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div className="card">
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#00d4ff', marginBottom: 14, textTransform: 'uppercase' }}>Lead Scoring Engine — Behavioral Signals</div>
        {[
          { signal: 'Rate Lock Inquiry', weight: 92, color: '#00ff87' },
          { signal: 'Pre-Approval Request', weight: 88, color: '#00ff87' },
          { signal: 'Home Search Activity', weight: 74, color: '#00d4ff' },
          { signal: 'Refi Calculator Use', weight: 68, color: '#00d4ff' },
          { signal: 'Content Engagement', weight: 45, color: '#f59e0b' },
          { signal: 'Social Profile View', weight: 22, color: '#2a4060' },
        ].map(s => (
          <div key={s.signal} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>{s.signal}</span>
              <span className="mono" style={{ fontSize: 12, color: s.color, fontWeight: 700 }}>{s.weight}</span>
            </div>
            <div style={{ height: 4, background: '#0d1520', borderRadius: 2 }}>
              <div style={{ width: `${s.weight}%`, height: '100%', background: s.color, borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>
      <div className="card">
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#00d4ff', marginBottom: 14, textTransform: 'uppercase' }}>Available Channels</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {['Email', 'SMS', 'iMessage (Blooio)', 'LinkedIn', 'ElevenLabs Voice', 'Ringless VM'].map(c => (
            <span key={c} className="tag" style={{ color: '#00d4ff', borderColor: '#00d4ff33', background: '#00d4ff0d', padding: '5px 12px', fontSize: 11 }}>{c}</span>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0', gap: 10 }}>
          <div style={{ fontSize: 36, opacity: 0.2 }}>📣</div>
          <div style={{ fontSize: 13, color: '#2a4060', textAlign: 'center' }}>No campaigns created<br />Launch your first below</div>
          <button className="btn btn-primary" style={{ marginTop: 8 }}>+ NEW CAMPAIGN</button>
        </div>
      </div>
    </div>
  </div>
)

// ── HYPERLOAN
const HyperLoan = ({ data }) => {
  const { states = [], production = [] } = data
  const topByLoan = [...states].sort((a, b) => b.avg_loan_size - a.avg_loan_size).slice(0, 8)
  const r = production[0]

  return (
    <div className="slide-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        <KPI label="HMDA Years" value="7" sub="2017–2024 loaded" color="#00d4ff" icon="📅" />
        <KPI label="Highest Avg Loan" value={`$${Math.round(Math.max(...states.map(s => s.avg_loan_size)) / 1000)}K`} sub={states.find(s => s.avg_loan_size === Math.max(...states.map(x => x.avg_loan_size)))?.state_code + ' · 2023'} color="#00ff87" icon="💰" />
        <KPI label="Product Coverage" value="FHA/VA/Conv" sub="USDA + Jumbo tracked" color="#a78bfa" icon="🏘️" />
        <KPI label="Compliance" value="TRID LIVE" sub="HMDA reporting enabled" color="#f59e0b" icon="⚖️" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card">
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#00d4ff', marginBottom: 16, textTransform: 'uppercase' }}>Avg Loan Size by State — Top 8 (2023)</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={topByLoan.map(s => ({ state: s.state_code, size: Math.round(s.avg_loan_size / 1000) }))} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="bG2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#00d4ff" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#2a4060', fontSize: 10 }} tickFormatter={v => `$${v}K`} />
              <YAxis type="category" dataKey="state" tick={{ fill: '#94a3b8', fontSize: 11 }} width={30} />
              <Tooltip contentStyle={{ background: '#0d1520', border: '1px solid #00d4ff33', borderRadius: 6, fontSize: 12 }} formatter={v => [`$${v}K`, 'Avg Loan']} />
              <Bar dataKey="size" fill="url(#bG2)" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#00d4ff', marginBottom: 14, textTransform: 'uppercase' }}>Product Mix — #1 Lender 2023</div>
          {r && [
            { name: 'Conventional', count: r.conventional_count, color: '#00d4ff' },
            { name: 'FHA', count: r.fha_count, color: '#a78bfa' },
            { name: 'VA', count: r.va_count, color: '#00ff87' },
            { name: 'Jumbo', count: r.jumbo_count, color: '#f59e0b' },
            { name: 'USDA', count: r.usda_count, color: '#ff6b6b' },
          ].map(p => (
            <div key={p.name} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>{p.name}</span>
                <span className="mono" style={{ fontSize: 12, color: p.color }}>{fmtNum(p.count)} ({((p.count / r.total_originations) * 100).toFixed(1)}%)</span>
              </div>
              <div style={{ height: 5, background: '#0d1520', borderRadius: 2 }}>
                <div style={{ width: `${(p.count / r.total_originations) * 100}%`, height: '100%', background: p.color, borderRadius: 2 }} />
              </div>
            </div>
          ))}
          {r && (
            <div style={{ marginTop: 12, padding: '10px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: 6 }}>
              <div className="mono" style={{ fontSize: 9, color: '#2a4060' }}>LEI: {r.lei}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{fmtNum(r.total_originations)} originations · {fmt(r.total_volume)} volume · {r.num_states} states</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── HUIT AGENT AI
const HuitAgent = () => {
  const [msgs, setMsgs] = useState([{
    role: 'assistant',
    content: 'HUIT AGENT ONLINE. I have direct access to your live Supabase database — 7 years of HMDA data, market pulse signals, APEX reports, and CRM intelligence. Ask me anything about your pipeline, markets, loan officer targets, or platform metrics.'
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

  const SYSTEM = `You are Huit Agent AI — the intelligence core of the Huit.AI mortgage and real estate platform built by Derek Huit (Founder & CEO).

LIVE DATABASE CONTEXT:
- HMDA Production: Largest lender 294,387 originations, $108.4B volume in 2023
- State Markets: TX 464,576 origs, FL 463,925 origs, CA 429,251 origs ($538K avg loan)
- Market Pulse: Seattle composite 72 (recruiting_window, strong), Phoenix 75 (recruiting_window, strong), Dallas 58 (retention_risk, moderate)
- APEX Report: Sarah Thompson — Wells Fargo Branch Manager, NMLS #284719, TLS 7.2/10, Composite 82.5, Co. Fit 78% — HIGH priority target
- Pipeline Stages: New Lead → Contacted → Qualified → Demo Scheduled → Proposal Sent
- Platform: $50K MRR · 25 Founding Members · 3 subscription tiers
- TLS Accuracy: 86% backtested against APM cohort

You are speaking to enterprise prospects (LOs and mortgage executives). Be sharp, data-driven, and specific. Use real numbers. Keep responses concise — you are in a live sales demo.`

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    const newMsgs = [...msgs, { role: 'user', content: userMsg }]
    setMsgs(newMsgs)
    setLoading(true)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM,
          messages: newMsgs.map(m => ({ role: m.role, content: m.content }))
        })
      })
      const d = await res.json()
      setMsgs(prev => [...prev, { role: 'assistant', content: d.content?.[0]?.text || 'Error from AI engine.' }])
    } catch {
      setMsgs(prev => [...prev, { role: 'assistant', content: 'Connection error. Please retry.' }])
    }
    setLoading(false)
  }

  const suggestions = [
    'What markets should I target for recruiting?',
    'Analyze the Phoenix market signal',
    'Who is the top recruiting target right now?',
    'What is our platform MRR breakdown?',
  ]

  return (
    <div className="slide-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        <KPI label="Agent Status" value="ONLINE" sub="Live data access" color="#00ff87" icon="🤖" />
        <KPI label="Knowledge Base" value="7 YR HMDA" sub="51 states · 2017–2024" color="#00d4ff" icon="🧠" />
        <KPI label="Intent Model" value="LIVE" sub="ElevenLabs + AssemblyAI" color="#a78bfa" icon="🎙️" />
        <KPI label="Response Mode" value="REAL-TIME" sub="Claude Sonnet 4" color="#f59e0b" icon="⚡" />
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(0,212,255,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00ff87', boxShadow: '0 0 8px #00ff87' }} className="pulse" />
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#00d4ff', textTransform: 'uppercase' }}>Huit Agent AI — Live Intelligence</span>
        </div>
        <div style={{ height: 380, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div className={`chat-msg ${m.role === 'user' ? 'chat-user' : 'chat-ai'}`}>
                {m.role === 'assistant' && <div style={{ fontSize: 9, fontWeight: 700, color: '#00d4ff', letterSpacing: '1px', marginBottom: 6 }}>HUIT AGENT</div>}
                <div style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex' }}>
              <div className="chat-msg chat-ai">
                <div style={{ display: 'flex', gap: 5 }}>
                  {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', animation: `pulse 1.2s ${i * 0.2}s ease-in-out infinite` }} />)}
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
        <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(0,212,255,0.06)' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
            {suggestions.map(s => <button key={s} className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => setInput(s)}>{s}</button>)}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask about markets, LO targets, pipeline, HMDA data..." style={{ flex: 1 }} />
            <button className="btn btn-primary" onClick={send} disabled={loading || !input.trim()}>SEND →</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── MAIN APP
const TABS = [
  { id: 'command', label: 'Command Center', icon: '⚡' },
  { id: 'crmex', label: 'CRMEX', icon: '📋' },
  { id: 'apex', label: 'APEX / REAPEX', icon: '🎯' },
  { id: 'huitsign', label: 'HuitSign', icon: '✍️' },
  { id: 'agent', label: 'Huit Agent AI', icon: '🤖' },
  { id: 'pulse', label: 'Property Pulse', icon: '🏘️' },
  { id: 'campaigns', label: 'Campaigns', icon: '📣' },
  { id: 'hyperloan', label: 'HyperLoan AI', icon: '🏦' },
]

export default function HuitDemo() {
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState('command')
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const [states, production, pulse, stages, clients, reports] = await Promise.all([
        sb('hmda_market_state', '?order=total_originations.desc'),
        sb('hmda_production', '?order=total_originations.desc&limit=10'),
        sb('market_pulse_composite', '?order=composite_score.desc'),
        sb('pipeline_stages', '?order=stage_order.asc'),
        sb('clients', ''),
        sb('reports', '?order=created_at.desc'),
      ])
      setData({ states, production, pulse, stages, clients, reports })
    } catch (e) { console.error(e) }
    setLoading(false)
  }, [])

  useEffect(() => { if (authed) loadData() }, [authed, loadData])

  if (!authed) return <><style>{STYLE}</style><LoginScreen onLogin={() => setAuthed(true)} /></>

  return (
    <>
      <style>{STYLE}</style>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#060a10' }}>
        {/* Sidebar */}
        <div style={{ width: 224, background: 'rgba(10,18,28,0.99)', borderRight: '1px solid rgba(0,212,255,0.07)', display: 'flex', flexDirection: 'column', padding: '20px 12px', gap: 4, position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 100, overflowY: 'auto' }}>
          <div style={{ padding: '0 8px 20px', borderBottom: '1px solid rgba(0,212,255,0.07)', marginBottom: 8 }}>
            <div style={{ fontSize: 17, fontWeight: 800, background: 'linear-gradient(135deg,#00d4ff,#0066ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>HUIT.AI</div>
            <div style={{ fontSize: 8, color: '#1e3a5f', letterSpacing: '2px', marginTop: 2, fontWeight: 700, textTransform: 'uppercase' }}>Intelligence Platform</div>
          </div>
          {TABS.map(t => (
            <div key={t.id} className={`nav-item ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              <span style={{ fontSize: 14 }}>{t.icon}</span>
              <span>{t.label}</span>
            </div>
          ))}
          <div style={{ marginTop: 'auto', padding: '14px 8px', borderTop: '1px solid rgba(0,212,255,0.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#00d4ff,#0066ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#fff', flexShrink: 0 }}>DH</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#e2e8f0' }}>Dr. Huit</div>
                <div style={{ fontSize: 9, color: '#1e3a5f', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Founder & CEO</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ marginLeft: 224, flex: 1, padding: 24, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(0,212,255,0.07)' }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#e2e8f0' }}>{TABS.find(t => t.id === tab)?.icon} {TABS.find(t => t.id === tab)?.label}</div>
              <div style={{ fontSize: 11, color: '#2a4060', marginTop: 2 }}>
                LIVE DATA · Supabase · {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: 'rgba(0,255,135,0.07)', border: '1px solid rgba(0,255,135,0.18)', borderRadius: 20 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff87', boxShadow: '0 0 6px #00ff87' }} className="pulse" />
                <span style={{ fontSize: 11, color: '#00ff87', fontWeight: 700 }}>LIVE</span>
              </div>
              <button className="btn btn-ghost" onClick={loadData} style={{ fontSize: 11 }}>↻ REFRESH</button>
            </div>
          </div>

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 400, gap: 16 }}>
              <div className="spinner" />
              <div style={{ fontSize: 11, color: '#2a4060', letterSpacing: '2px', textTransform: 'uppercase' }}>Loading Live Data...</div>
            </div>
          ) : (
            <>
              {tab === 'command' && <CommandCenter data={data} />}
              {tab === 'crmex' && <CRMEX data={data} />}
              {tab === 'apex' && <APEX data={data} />}
              {tab === 'huitsign' && <HuitSign />}
              {tab === 'agent' && <HuitAgent />}
              {tab === 'pulse' && <PropertyPulse data={data} />}
              {tab === 'campaigns' && <CampaignManager />}
              {tab === 'hyperloan' && <HyperLoan data={data} />}
            </>
          )}
        </div>
      </div>
    </>
  )
}
