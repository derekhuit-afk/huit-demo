"use client"
import { useState, useRef, useCallback, useEffect } from "react"

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const VOICE_ID = "EXAVITQu4vr4xnSDxMaL" // Casey Kim

// ─── SCENE DATA ───────────────────────────────────────────────────────────────
const SCENES = [
  {
    id: 1, num: "01",
    title: "Predictive Transition Scoring",
    subtitle: "APEX Recruiting Intelligence",
    url: "mapex.huit.ai/dashboard",
    platform: "APEX",
    color: "#00D4FF",
    script: `Before I show you the technology, let me give you the problem it solves. Every mortgage recruiter in the country is guessing. They're cold calling anyone with an NMLS number, hoping something lands. APEX doesn't guess. It reads fourteen public data sources, scores sixteen weighted factors, and tells you exactly who is about to move — and why — with a sixty-day precision window. Let me show you a live example. This is Sarah Martinez. She's producing eighty-four million a year at Caliber in Phoenix. Her Transition Likelihood Score is eighty-four out of one hundred — flagged IMMINENT. That score didn't come from a hunch. It came from a restructuring announcement at her parent company, a forty-two percent production drop in Q4, and a compensation alignment gap of thirty-eight thousand dollars versus market. Click into her card and you get a sixteen-factor breakdown — and a six-week outreach execution plan, auto-generated, with pitch scripts, objection handlers, and a ranked list of ten company fits. All from a single NMLS number.`,
    callouts: [
      { at: 6,  label: "Data Sources",    value: "14 Public Feeds",     x: 68, y: 22 },
      { at: 16, label: "Factors Scored",  value: "16 Weighted",         x: 68, y: 36 },
      { at: 28, label: "Sarah Martinez",  value: "TLS 84 — IMMINENT",   x: 56, y: 52 },
      { at: 44, label: "Comp Gap",        value: "−$38K vs Market",     x: 56, y: 66 },
      { at: 60, label: "Auto-Generated",  value: "6-Week Playbook",     x: 56, y: 80 },
    ],
    screenData: {
      header: { tabs: ["Dashboard", "Candidates", "Market Intel", "Pulse", "Reports"], active: "Candidates" },
      stats: [
        { label: "Candidates Tracked", value: "247", delta: "+12 today", color: "#00D4FF" },
        { label: "IMMINENT Tier", value: "14", delta: "Act now", color: "#FF3B5C" },
        { label: "Avg TLS Score", value: "61", delta: "↑ 4 pts", color: "#F59E0B" },
        { label: "Market Coverage", value: "42 MSAs", delta: "Live", color: "#10B981" },
      ],
      rows: [
        { name: "Sarah Martinez",  co: "Caliber Home Loans",   mkt: "Phoenix, AZ",   vol: "$84M", score: 84, tier: "IMMINENT",  tls_c: "#FF3B5C", active: true },
        { name: "David Chen",      co: "Guaranteed Rate",      mkt: "Scottsdale, AZ",vol: "$61M", score: 76, tier: "MOBILE",    tls_c: "#F59E0B", active: false },
        { name: "Amanda Torres",   co: "UWM",                  mkt: "Tempe, AZ",     vol: "$49M", score: 71, tier: "MOBILE",    tls_c: "#F59E0B", active: false },
        { name: "Brian Walsh",     co: "Movement Mortgage",    mkt: "Mesa, AZ",      vol: "$38M", score: 58, tier: "RECEPTIVE", tls_c: "#00D4FF", active: false },
        { name: "Linda Park",      co: "Rocket Mortgage",      mkt: "Chandler, AZ",  vol: "$29M", score: 44, tier: "RECEPTIVE", tls_c: "#00D4FF", active: false },
      ],
      aiPanel: {
        title: "AI MATCH — SARAH MARTINEZ",
        bars: [
          { label: "Production Fit",    pct: 92, color: "#00D4FF" },
          { label: "Culture Alignment", pct: 87, color: "#00D4FF" },
          { label: "Comp Delta",        pct: 84, color: "#F59E0B" },
          { label: "Non-Compete Risk",  pct: 91, color: "#10B981" },
        ],
        note: "6-Week Outreach Plan Generated · 10 Company Fits Ranked · Pitch Scripts Ready",
      },
    },
  },
  {
    id: 2, num: "02",
    title: "HMDA Market Intelligence",
    subtitle: "7-Year Data — 42 MSAs",
    url: "mapex.huit.ai/market-intel",
    platform: "APEX",
    color: "#7C3AED",
    script: `The HMDA database is the single most underutilized competitive intelligence asset in the mortgage industry. It contains every originated loan in America, by lender, by geography, by product type — seven years of it. We've loaded all seven years — 2017 through 2024 — into a live query engine. I can tell you, right now, who the top eighteen producers in the Nashville market are, which company they're at, and what their production trend looks like. This is the Market Intel tab. Nashville, Tennessee. Two hundred fourteen active loan officers ranked by origination volume. The top tier — the eighteen we call Market Movers — are the producers most likely to be recruitable based on their TLS profile crossing into receptive territory. You can filter by state, by metro, by production tier, by loan type. You can pull any market in the country in under sixty seconds. Seven years of HMDA data, fully indexed. Something no competing platform offers at this price point.`,
    callouts: [
      { at: 10, label: "HMDA Data",      value: "7 Years Loaded",     x: 64, y: 20 },
      { at: 22, label: "Nashville, TN",  value: "214 Active LOs",     x: 64, y: 36 },
      { at: 34, label: "Market Movers",  value: "18 Recruitable",     x: 64, y: 52 },
      { at: 48, label: "Query Speed",    value: "< 60 Seconds",       x: 64, y: 68 },
    ],
    screenData: {
      header: { tabs: ["Dashboard", "Candidates", "Market Intel", "Pulse", "Reports"], active: "Market Intel" },
      market: "Nashville, TN",
      stats: [
        { label: "Active LOs",    value: "214",  delta: "Ranked", color: "#7C3AED" },
        { label: "Market Movers", value: "18",   delta: "Recruitable", color: "#FF3B5C" },
        { label: "Total Volume",  value: "$2.1B", delta: "2024",  color: "#10B981" },
        { label: "HMDA Coverage", value: "7 Yrs", delta: "2017–2024", color: "#F59E0B" },
      ],
      rows: [
        { name: "Jordan Ellis",  co: "Benchmark Mortgage",   vol: "$142M", units: 312, tier: "MOVER",  tls: 82, active: true },
        { name: "Priya Nair",    co: "CrossCountry Mortgage",vol: "$118M", units: 267, tier: "MOVER",  tls: 78, active: false },
        { name: "Carlos Vega",   co: "Movement Mortgage",    vol: "$97M",  units: 228, tier: "MOVER",  tls: 74, active: false },
        { name: "Ashley Monroe", co: "Fairway Independent",  vol: "$83M",  units: 194, tier: "MOVER",  tls: 71, active: false },
        { name: "Kevin Park",    co: "Caliber Home Loans",   vol: "$71M",  units: 162, tier: "MOVER",  tls: 68, active: false },
        { name: "Denise Carter", co: "Guaranteed Rate",      vol: "$64M",  units: 149, tier: "TARGET", tls: 55, active: false },
        { name: "Marcus Webb",   co: "United Wholesale",     vol: "$58M",  units: 134, tier: "TARGET", tls: 48, active: false },
      ],
    },
  },
  {
    id: 3, num: "03",
    title: "Retention Risk Monitor",
    subtitle: "TLS Flight Risk Alerts",
    url: "mapex.huit.ai/pulse",
    platform: "APEX PULSE",
    color: "#F59E0B",
    script: `Recruiting is half the equation. The other half is retention. The average mortgage company loses thirty to forty percent of its loan officer base annually. Most of those departures are completely predictable — if you're watching the right signals. APEX monitors fourteen data signals in real time. When someone's flight risk score crosses a threshold, you get an alert — before they've taken a call from a competitor. This is James Rodriguez. He's been with your company for three years in Houston. His Transition Likelihood Score is sixty-seven out of one hundred — and it climbed thirty-six points in sixty days. That thirty-six point swing is the exact pattern our backtesting showed predicted departure with eighty-six percent accuracy across a one hundred thirty loan officer cohort. His intent signal shows frustrated. He hasn't posted publicly. He hasn't moved yet. But the data says: this manager needs to have a conversation with James this week — not next quarter.`,
    callouts: [
      { at: 12, label: "LO Attrition",   value: "30–40% Annual",   x: 62, y: 22 },
      { at: 24, label: "James Rodriguez",value: "Risk Score 67/100",x: 62, y: 38 },
      { at: 38, label: "TLS Delta",      value: "+36 pts / 60 Days",x: 62, y: 54 },
      { at: 50, label: "Predictive Acc.",value: "86%",              x: 62, y: 70 },
    ],
    screenData: {
      header: { tabs: ["Dashboard", "Candidates", "Market Intel", "Pulse", "Reports"], active: "Pulse" },
      alertCounts: [
        { tier: "IMMINENT", count: 3, color: "#FF3B5C" },
        { tier: "MOBILE",   count: 8, color: "#F59E0B" },
        { tier: "RECEPTIVE",count: 21,color: "#00D4FF" },
      ],
      featured: {
        name: "James Rodriguez",
        role: "Senior Loan Officer · Houston, TX",
        tenure: "3 years tenure",
        score: 67,
        delta: "+36 pts in 60 days",
        intent: "FRUSTRATED",
        accuracy: "86%",
        cohort: "130 LOs backtested",
        signals: ["Production drop Q4 −18%", "Comp gap $24K vs market", "Platform login −62%", "Team engagement low"],
        action: "Schedule 1:1 with branch manager this week — do not wait.",
      },
    },
  },
  {
    id: 4, num: "04",
    title: "Property Pulse Equity Engine",
    subtitle: "Past Borrower Re-Engagement",
    url: "crmex.huit.ai/property-pulse",
    platform: "CRMEX",
    color: "#10B981",
    script: `The highest-value leads in any loan officer's database are the people they've already closed. Property Pulse monitors your past borrower portfolio for three triggers: equity accumulation, rate drop opportunity, and life event signals. When a trigger fires, it auto-initiates a three-touch outreach sequence — text, email, then a call prompt. This is a real borrower scenario. Home value: four hundred forty-seven thousand dollars. Current rate: seven point two-five percent. Today's market rate: six point five-eight percent. That's a sixty-seven basis point delta. Estimated equity: two hundred twenty-five thousand dollars. Two alert triggers just fired: refinance savings opportunity and cash-out eligibility. The system automatically drafts the first SMS — sent within minutes of the trigger. The loan officer gets a notification: call this borrower today. No manual tracking. No leads falling through. The AI is monitoring every property in the portfolio, every morning, while the loan officer is already on calls.`,
    callouts: [
      { at: 10, label: "Trigger Types",  value: "Equity · Rate · Life", x: 60, y: 20 },
      { at: 22, label: "Property AVM",   value: "$447,000",             x: 60, y: 34 },
      { at: 32, label: "Rate Delta",     value: "7.25% → 6.58%",       x: 60, y: 50 },
      { at: 42, label: "Equity",         value: "$225,000 Available",   x: 60, y: 64 },
      { at: 54, label: "Auto-Sequence",  value: "SMS → Email → Call",  x: 60, y: 78 },
    ],
    screenData: {
      header: { tabs: ["Pipeline", "Property Pulse", "Campaigns", "Leads", "Reports"], active: "Property Pulse" },
      alertBadges: ["🔥 REFI SAVINGS", "💰 CASH-OUT"],
      property: {
        addr: "3721 Hillside Dr, Wasilla, AK 99654",
        avm: "$447,000",
        purchase: "$310,000 · Mar 2021",
        appreciation: "+44%",
        equity: "$225,000",
        curRate: "7.25%",
        mktRate: "6.58%",
        delta: "−67 bps",
      },
      sequence: [
        { step: "Day 1 — SMS",   status: "Sent · 3 min ago",      done: true  },
        { step: "Day 2 — Email", status: "Queued · Tomorrow",     done: false },
        { step: "Day 3 — Call",  status: "LO prompt scheduled",   done: false },
      ],
    },
  },
  {
    id: 5, num: "05",
    title: "AI Lead Scoring Engine",
    subtitle: "Score 94 — 48 Hours",
    url: "crmex.huit.ai/leads",
    platform: "CRMEX",
    color: "#EF4444",
    script: `Speed to lead is the single biggest variable in mortgage conversion. The data is clear: first contact wins. But when you're running twenty-plus leads simultaneously, you can't call everyone immediately. You need to know who to call first. Our AI scoring engine reads behavioral signals — form fills, SMS response speed, open rates, keyword patterns — and assigns a zero to one hundred score in real time. Marcus Tran hit ninety-four out of one hundred within forty-eight hours of his first touch. He's in Wasilla, Alaska, looking at a cash-out refinance on a four hundred eighty-five thousand dollar property with one hundred eighty-two thousand dollars in equity. Score ninety-four. HOT. Call him now. Jennifer Kowalski: ninety-one, Eagle River, VA loan, HOT. Below the hot leads panel: twenty-two additional leads auto-enrolled in nurture sequences. The AI is working the pipeline twenty-four hours a day while the loan officer is focused on the top three.`,
    callouts: [
      { at: 14, label: "Marcus Tran",    value: "Score 94 / HOT",    x: 60, y: 24 },
      { at: 24, label: "Cash-Out Refi",  value: "$485K | $182K Eq.", x: 60, y: 38 },
      { at: 36, label: "Jennifer K.",    value: "Score 91 / HOT",    x: 60, y: 54 },
      { at: 48, label: "Auto-Nurture",   value: "22 Leads Enrolled", x: 60, y: 68 },
    ],
    screenData: {
      header: { tabs: ["Pipeline", "Property Pulse", "Campaigns", "Leads", "Reports"], active: "Leads" },
      hotLeads: [
        { name: "Marcus Tran",      city: "Wasilla, AK",    type: "Cash-Out Refi", score: 94, loan: "$485K", equity: "$182K" },
        { name: "Jennifer Kowalski",city: "Eagle River, AK",type: "VA IRRRL",      score: 91, loan: "$520K", equity: "—" },
      ],
      warmLeads: [
        { name: "Robert Alvarez",   score: 86, type: "Refinance", city: "Palmer, AK" },
        { name: "Sandra Meyers",    score: 79, type: "Purchase",  city: "Wasilla, AK" },
        { name: "David Liu",        score: 74, type: "VA IRRRL",  city: "Palmer, AK" },
      ],
      nurtureCount: 22,
    },
  },
  {
    id: 6, num: "06",
    title: "Huit Agent AI",
    subtitle: "90-Second Qualification",
    url: "crmex-huit-agent-ai.vercel.app",
    platform: "HUIT AGENT",
    color: "#8B5CF6",
    script: `The mortgage industry loses deals at eleven PM every single night. A qualified buyer submits a form. Nobody responds. They move on to the next lender. Huit Agent AI responds in ninety seconds, any time of day or night. It has access to nine live CRM tools: lead lookup, rate data, property values, pipeline status, email drafting — all live. It doesn't just respond — it qualifies. Diana Lane submitted a purchase inquiry at eleven-oh-four PM. By eleven-sixteen PM, Huit Agent AI had gathered her loan type, estimated property value, timeline, and credit range — and scheduled a callback with a licensed loan officer for the following morning. Watch what happens when I type into the chat: "Who should I call today?" — it immediately surfaces Marcus Tran from the hot leads queue. "Draft a rate alert email for Marcus" — it composes a personalized outreach in seconds using his live loan data. Nine live CRM tools. Natural language. Ninety seconds. This is what an AI co-pilot actually looks like when it has real data access.`,
    callouts: [
      { at: 10, label: "Response Time",  value: "< 90 Seconds",     x: 56, y: 20 },
      { at: 22, label: "CRM Tools",      value: "9 Live Integrations",x:56, y: 34 },
      { at: 32, label: "Diana Lane",     value: "11:04 PM → Pre-Qual",x:56, y: 50 },
      { at: 46, label: "Marcus Tran",    value: "Surfaced from Queue",x: 56, y: 64 },
      { at: 58, label: "Email Drafted",  value: "Live Loan Data Used",x: 56, y: 78 },
    ],
    screenData: {
      header: { tabs: ["Chat", "Tools", "History", "Settings"], active: "Chat" },
      tools: ["CRM Lead Lookup", "AI Lead Scoring", "Rate Feed", "Property Pulse", "Email Drafter", "Pipeline View", "HMDA Lookup", "Calendar Book", "SMS Trigger"],
      messages: [
        { role: "user", text: "Hi — I saw an ad for homes in Wasilla and think I might be ready to buy. My name is Diana Lane.", time: "11:04 PM" },
        { role: "ai",   text: "Hi Diana! Huit Agent AI here — I can help get you started and connect you with a licensed loan officer right away. Are you looking to purchase a primary residence in Wasilla?", time: "11:04 PM" },
        { role: "user", text: "Yes, primary residence. Looking at homes around $450,000.", time: "11:06 PM" },
        { role: "ai",   text: "Perfect. Roughly what's your credit score range? (Excellent 740+, Good 680–739, Fair 620–679)", time: "11:07 PM" },
        { role: "user", text: "Around 720, maybe a little higher.", time: "11:09 PM" },
        { role: "ai",   text: "Strong profile for conventional financing. What's your timeline — purchasing in the next 30–90 days?", time: "11:10 PM" },
        { role: "user", text: "Yes, about 60 days. Found a neighborhood we love.", time: "11:12 PM" },
        { role: "ai",   text: "I have everything I need. Flagging your file HOT and scheduling a callback for tomorrow morning. You'll get a confirmation text shortly. Welcome to Alaska homeownership, Diana. NMLS #203980", time: "11:14 PM" },
      ],
    },
  },
]

// ─── BROWSER CHROME WRAPPER ───────────────────────────────────────────────────
function BrowserChrome({ url, color, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#1A1F2E", borderRadius: 8, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
      {/* Title bar */}
      <div style={{ background: "#242938", padding: "8px 14px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F56","#FFBD2E","#27C93F"].map((c,i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.85 }} />)}
        </div>
        <div style={{ flex: 1, background: "#1A1F2E", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, padding: "4px 12px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: "#9CA3AF", fontFamily: "'JetBrains Mono', monospace" }}>{url}</span>
        </div>
      </div>
      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden", background: "#060C14" }}>
        {children}
      </div>
    </div>
  )
}

// ─── SCREEN RENDERERS ─────────────────────────────────────────────────────────
function Screen_APEX_Candidates({ data, color }) {
  const { stats, rows, aiPanel, header } = data
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: "'JetBrains Mono', monospace", background: "#060C14" }}>
      {/* Nav */}
      <div style={{ background: "#0A1628", borderBottom: "1px solid rgba(0,212,255,0.12)", padding: "0 16px", height: 38, display: "flex", alignItems: "center", gap: 20 }}>
        <span style={{ color, fontWeight: 700, fontSize: 12, letterSpacing: 3 }}>APEX</span>
        <div style={{ width: 1, height: 16, background: "#1F2937" }} />
        {header.tabs.map(t => (
          <span key={t} style={{ fontSize: 10, color: t === header.active ? color : "#6B7280", borderBottom: t === header.active ? `1px solid ${color}` : "none", paddingBottom: 10, cursor: "pointer", paddingTop: 10 }}>{t}</span>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <div style={{ background: `${color}18`, border: `1px solid ${color}44`, borderRadius: 3, padding: "2px 10px", fontSize: 9, color }}>Phoenix Metro ▾</div>
          <div style={{ background: "rgba(255,59,92,0.15)", border: "1px solid rgba(255,59,92,0.4)", borderRadius: 3, padding: "2px 10px", fontSize: 9, color: "#FF3B5C" }}>IMMINENT ▾</div>
        </div>
      </div>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: `${s.color}0D`, border: `1px solid ${s.color}28`, borderRadius: 6, padding: "8px 10px" }}>
            <div style={{ fontSize: 8, color: "#6B7280", letterSpacing: 1.5, marginBottom: 4 }}>{s.label.toUpperCase()}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 9, color: "#6B7280", marginTop: 3 }}>{s.delta}</div>
          </div>
        ))}
      </div>
      {/* Table header */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 70px 90px 100px 70px", gap: 0, padding: "6px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: 8, color: "#374151", letterSpacing: 2 }}>
        {["CANDIDATE", "COMPANY / MARKET", "VOLUME", "TLS", "TIER", ""].map(h => <span key={h}>{h}</span>)}
      </div>
      {/* Rows */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 2fr 70px 90px 100px 70px", padding: "9px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)", background: r.active ? `${color}08` : "transparent", alignItems: "center" }}>
            <div style={{ fontSize: 11, fontWeight: r.active ? 700 : 500, color: r.active ? "#E2E8F0" : "#9CA3AF" }}>{r.name}</div>
            <div>
              <div style={{ fontSize: 10, color: "#6B7280" }}>{r.co}</div>
              <div style={{ fontSize: 9, color: "#374151" }}>{r.mkt}</div>
            </div>
            <div style={{ fontSize: 11, color: "#10B981", fontWeight: 600 }}>{r.vol}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", border: `2px solid ${r.tls_c}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: r.tls_c, background: `${r.tls_c}18`, animation: r.active ? "ring 2s infinite" : "none" }}>
                {r.score}
              </div>
            </div>
            <div style={{ background: `${r.tls_c}18`, border: `1px solid ${r.tls_c}44`, borderRadius: 3, padding: "2px 7px", fontSize: 8, color: r.tls_c, letterSpacing: 1, textAlign: "center" }}>{r.tier}</div>
            {r.active && <div style={{ background: `${color}18`, border: `1px solid ${color}44`, borderRadius: 3, padding: "3px 8px", fontSize: 8, color, cursor: "pointer", textAlign: "center" }}>ANALYZE →</div>}
          </div>
        ))}
      </div>
      {/* AI Panel */}
      <div style={{ borderTop: `1px solid ${color}22`, background: "#0A1628", padding: "10px 14px" }}>
        <div style={{ fontSize: 8, color, letterSpacing: 2, marginBottom: 8 }}>{aiPanel.title}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 6 }}>
          {aiPanel.bars.map(b => (
            <div key={b.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, padding: "6px 8px" }}>
              <div style={{ fontSize: 8, color: "#6B7280", marginBottom: 4 }}>{b.label}</div>
              <div style={{ height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 1 }}><div style={{ width: `${b.pct}%`, height: "100%", background: b.color, borderRadius: 1 }} /></div>
              <div style={{ fontSize: 11, color: b.color, marginTop: 3, fontWeight: 700 }}>{b.pct}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 9, color: "#374151" }}>{aiPanel.note}</div>
      </div>
    </div>
  )
}

function Screen_APEX_Market({ data, color }) {
  const { stats, rows, header } = data
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: "'JetBrains Mono', monospace", background: "#060C14" }}>
      <div style={{ background: "#0A1628", borderBottom: `1px solid ${color}22`, padding: "0 16px", height: 38, display: "flex", alignItems: "center", gap: 20 }}>
        <span style={{ color, fontWeight: 700, fontSize: 12, letterSpacing: 3 }}>APEX</span>
        <div style={{ width: 1, height: 16, background: "#1F2937" }} />
        {header.tabs.map(t => (
          <span key={t} style={{ fontSize: 10, color: t === header.active ? color : "#6B7280", borderBottom: t === header.active ? `1px solid ${color}` : "none", paddingBottom: 10, paddingTop: 10, cursor: "pointer" }}>{t}</span>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <div style={{ background: `${color}18`, border: `1px solid ${color}44`, borderRadius: 3, padding: "2px 10px", fontSize: 9, color }}>Nashville, TN ▾</div>
          <div style={{ background: `${color}18`, border: `1px solid ${color}44`, borderRadius: 3, padding: "2px 10px", fontSize: 9, color }}>2017–2024</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: `${s.color}0D`, border: `1px solid ${s.color}28`, borderRadius: 6, padding: "8px 10px" }}>
            <div style={{ fontSize: 8, color: "#6B7280", letterSpacing: 1.5, marginBottom: 4 }}>{s.label.toUpperCase()}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 9, color: "#6B7280", marginTop: 3 }}>{s.delta}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 8, color, letterSpacing: 2, padding: "10px 14px 6px", fontFamily: "'JetBrains Mono', monospace" }}>MARKET MOVERS — NASHVILLE METRO</div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 14px 10px" }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "24px 2fr 2fr 80px 70px 80px 70px", alignItems: "center", padding: "8px 10px", marginBottom: 4, background: r.tier === "MOVER" ? `${color}0A` : "rgba(255,255,255,0.02)", border: `1px solid ${r.tier === "MOVER" ? `${color}33` : "rgba(255,255,255,0.05)"}`, borderRadius: 4 }}>
            <span style={{ fontSize: 10, color: "#374151", fontWeight: 700 }}>#{i + 1}</span>
            <span style={{ fontSize: 11, color: r.active ? "#E2E8F0" : "#9CA3AF", fontWeight: 600 }}>{r.name}</span>
            <span style={{ fontSize: 10, color: "#6B7280" }}>{r.co}</span>
            <span style={{ fontSize: 11, color: "#10B981", fontWeight: 700 }}>{r.vol}</span>
            <span style={{ fontSize: 9, color: "#6B7280" }}>{r.units} units</span>
            <span style={{ fontSize: 9, color: r.tier === "MOVER" ? color : "#374151", background: r.tier === "MOVER" ? `${color}18` : "transparent", padding: "1px 6px", borderRadius: 3 }}>{r.tier}</span>
            <span style={{ fontSize: 11, color: r.tls > 70 ? "#F59E0B" : "#6B7280", fontWeight: 700 }}>TLS {r.tls}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Screen_Retention({ data, color }) {
  const { header, alertCounts, featured } = data
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: "'JetBrains Mono', monospace", background: "#060C14" }}>
      <div style={{ background: "#0A1628", borderBottom: `1px solid ${color}22`, padding: "0 16px", height: 38, display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ color, fontWeight: 700, fontSize: 12, letterSpacing: 3 }}>APEX PULSE</span>
        <div style={{ width: 1, height: 16, background: "#1F2937" }} />
        <span style={{ color, fontSize: 10 }}>Retention Risk Monitor</span>
        <div style={{ marginLeft: "auto", background: `${color}18`, border: `1px solid ${color}44`, borderRadius: 3, padding: "2px 10px", fontSize: 9, color }}>LIVE · 12 New Signals</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        {alertCounts.map(a => (
          <div key={a.tier} style={{ background: `${a.color}0D`, border: `1px solid ${a.color}33`, borderRadius: 6, padding: "10px 12px" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: a.color }}>{a.count}</div>
            <div style={{ fontSize: 8, color: "#6B7280", letterSpacing: 2, marginTop: 2 }}>{a.tier}</div>
          </div>
        ))}
      </div>
      <div style={{ margin: "12px 14px", background: "rgba(255,59,92,0.06)", border: "2px solid rgba(255,59,92,0.35)", borderRadius: 8, padding: "14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#E2E8F0" }}>{featured.name}</div>
            <div style={{ fontSize: 10, color: "#6B7280", marginTop: 2 }}>{featured.role} · {featured.tenure}</div>
          </div>
          <div style={{ background: "rgba(255,59,92,0.15)", border: "1px solid #FF3B5C", borderRadius: 4, padding: "3px 10px", fontSize: 9, color: "#FF3B5C", fontWeight: 700 }}>IMMINENT</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 10 }}>
          {[
            { l: "TLS SCORE", v: featured.score, sub: featured.delta, c: "#FF3B5C", big: true },
            { l: "INTENT SIGNAL", v: featured.intent, sub: "14 signals", c: "#FF3B5C", big: false },
            { l: "ACCURACY", v: featured.accuracy, sub: featured.cohort, c: "#F59E0B", big: true },
          ].map(f => (
            <div key={f.l} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 4, padding: "8px 10px" }}>
              <div style={{ fontSize: 8, color: "#6B7280", letterSpacing: 1, marginBottom: 3 }}>{f.l}</div>
              <div style={{ fontSize: f.big ? 24 : 13, fontWeight: 800, color: f.c }}>{f.v}</div>
              <div style={{ fontSize: 9, color: "#10B981", marginTop: 2 }}>{f.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
          {featured.signals.map(s => (
            <div key={s} style={{ background: "rgba(255,59,92,0.1)", border: "1px solid rgba(255,59,92,0.25)", borderRadius: 3, padding: "2px 8px", fontSize: 9, color: "#FF3B5C" }}>{s}</div>
          ))}
        </div>
        <div style={{ padding: "7px 10px", background: `${color}10`, border: `1px solid ${color}30`, borderRadius: 4, fontSize: 10, color }}>
          ⚡ {featured.action}
        </div>
      </div>
    </div>
  )
}

function Screen_PropertyPulse({ data, color }) {
  const { header, alertBadges, property, sequence } = data
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: "'JetBrains Mono', monospace", background: "#060C14" }}>
      <div style={{ background: "#0A1628", borderBottom: `1px solid ${color}22`, padding: "0 16px", height: 38, display: "flex", alignItems: "center", gap: 20 }}>
        <span style={{ color, fontWeight: 700, fontSize: 12, letterSpacing: 3 }}>CRMEX</span>
        <div style={{ width: 1, height: 16, background: "#1F2937" }} />
        {header.tabs.map(t => (
          <span key={t} style={{ fontSize: 10, color: t === header.active ? color : "#6B7280", borderBottom: t === header.active ? `1px solid ${color}` : "none", paddingBottom: 10, paddingTop: 10, cursor: "pointer" }}>{t}</span>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          {alertBadges.map(b => (
            <div key={b} style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 3, padding: "2px 8px", fontSize: 8, color: "#10B981" }}>{b}</div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "12px" }}>
            <div style={{ fontSize: 8, color: "#6B7280", letterSpacing: 2, marginBottom: 6 }}>BORROWER PROPERTY</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#E2E8F0" }}>Past Borrower</div>
            <div style={{ fontSize: 10, color: "#6B7280", marginTop: 2 }}>{property.addr}</div>
            <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
              <div style={{ background: `${color}18`, border: `1px solid ${color}33`, borderRadius: 3, padding: "2px 7px", fontSize: 8, color }}>HOT</div>
              <div style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 3, padding: "2px 7px", fontSize: 8, color: "#00D4FF" }}>CONVENTIONAL</div>
            </div>
          </div>
          <div style={{ background: `${color}08`, border: `1px solid ${color}28`, borderRadius: 6, padding: "12px" }}>
            <div style={{ fontSize: 8, color: "#6B7280", letterSpacing: 2, marginBottom: 6 }}>PROPERTY VALUE (AVM)</div>
            <div style={{ fontSize: 22, fontWeight: 800, color }}>{property.avm}</div>
            <div style={{ fontSize: 9, color: "#6B7280", marginTop: 2 }}>Purchase: {property.purchase}</div>
            <div style={{ fontSize: 10, color, marginTop: 3 }}>▲ {property.appreciation} appreciation</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 10 }}>
          {[
            { l: "EQUITY AVAILABLE", v: property.equity, c: color },
            { l: "CURRENT RATE", v: property.curRate, c: "#FF3B5C" },
            { l: "MARKET RATE", v: property.mktRate, c: "#00D4FF" },
          ].map(f => (
            <div key={f.l} style={{ background: `${f.c}0A`, border: `1px solid ${f.c}33`, borderRadius: 6, padding: "10px 12px" }}>
              <div style={{ fontSize: 8, color: "#6B7280", letterSpacing: 1.5, marginBottom: 4 }}>{f.l}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: f.c }}>{f.v}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(255,59,92,0.06)", border: "1px solid rgba(255,59,92,0.2)", borderRadius: 6, padding: "10px 12px", marginBottom: 10 }}>
          <div style={{ fontSize: 8, color: "#FF3B5C", letterSpacing: 2, marginBottom: 4 }}>RATE DELTA</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#E2E8F0" }}>{property.curRate} → {property.mktRate} = <span style={{ color: "#10B981" }}>{property.delta}</span></div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 6, padding: "10px 12px" }}>
          <div style={{ fontSize: 8, color: "#6B7280", letterSpacing: 2, marginBottom: 8 }}>AUTO-OUTREACH SEQUENCE FIRED</div>
          {sequence.map(s => (
            <div key={s.step} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.done ? color : "#374151", flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: s.done ? "#E2E8F0" : "#6B7280", fontWeight: s.done ? 600 : 400 }}>{s.step}</span>
              <span style={{ fontSize: 9, color: "#6B7280" }}>{s.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Screen_LeadScoring({ data, color }) {
  const { header, hotLeads, warmLeads, nurtureCount } = data
  return (
    <div style={{ height: "100%", display: "flex", fontFamily: "'JetBrains Mono', monospace", background: "#060C14" }}>
      {/* Sidebar */}
      <div style={{ width: 200, borderRight: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ background: "#0A1628", borderBottom: `1px solid ${color}22`, height: 38, display: "flex", alignItems: "center", padding: "0 14px" }}>
          <span style={{ color: "#EF4444", fontWeight: 700, fontSize: 11, letterSpacing: 2 }}>CRMEX</span>
        </div>
        <div style={{ padding: "12px" }}>
          <div style={{ fontSize: 8, color: "#6B7280", letterSpacing: 2, marginBottom: 8 }}>HOT LEADS</div>
          {hotLeads.map(l => (
            <div key={l.name} style={{ background: "rgba(255,59,92,0.07)", border: "1px solid rgba(255,59,92,0.25)", borderRadius: 6, padding: "8px 10px", marginBottom: 7 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#E2E8F0" }}>{l.name}</div>
              <div style={{ fontSize: 8, color: "#6B7280", marginTop: 2 }}>{l.city} · {l.type}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#FF3B5C" }}>{l.score}</div>
                <div style={{ fontSize: 8, color: "#FF3B5C", background: "rgba(255,59,92,0.15)", border: "1px solid rgba(255,59,92,0.3)", borderRadius: 2, padding: "1px 5px" }}>HOT</div>
              </div>
            </div>
          ))}
          <div style={{ fontSize: 8, color: "#6B7280", letterSpacing: 2, margin: "10px 0 6px" }}>NURTURE QUEUE</div>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, padding: "8px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#00D4FF" }}>{nurtureCount}</div>
            <div style={{ fontSize: 8, color: "#6B7280", marginTop: 2 }}>leads enrolled</div>
          </div>
        </div>
      </div>
      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ background: "#0A1628", borderBottom: `1px solid ${color}22`, padding: "0 14px", height: 38, display: "flex", alignItems: "center", gap: 16 }}>
          {header.tabs.map(t => (
            <span key={t} style={{ fontSize: 10, color: t === header.active ? color : "#6B7280", borderBottom: t === header.active ? `1px solid ${color}` : "none", paddingBottom: 10, paddingTop: 10, cursor: "pointer" }}>{t}</span>
          ))}
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ padding: "6px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: 8, color: "#374151", letterSpacing: 2, display: "grid", gridTemplateColumns: "2fr 1.5fr 60px 80px 70px 70px" }}>
            {["NAME / LOCATION", "LOAN TYPE", "SCORE", "STATUS", "LOAN", "EQUITY"].map(h => <span key={h}>{h}</span>)}
          </div>
          {[...hotLeads.map(l => ({ ...l, status: "HOT", c: "#FF3B5C" })), ...warmLeads.map(l => ({ ...l, loan: "—", equity: "—", status: "WARM", c: "#F59E0B" }))].map((l, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 60px 80px 70px 70px", padding: "9px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)", background: l.status === "HOT" ? "rgba(255,59,92,0.03)" : "transparent", alignItems: "center" }}>
              <div><div style={{ fontSize: 11, fontWeight: 600, color: l.status === "HOT" ? "#E2E8F0" : "#9CA3AF" }}>{l.name}</div><div style={{ fontSize: 9, color: "#374151", marginTop: 1 }}>{l.city}</div></div>
              <div style={{ fontSize: 9, color: "#6B7280" }}>{l.type}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: l.c }}>{l.score}</div>
              <div style={{ fontSize: 8, color: l.c, background: `${l.c}15`, border: `1px solid ${l.c}33`, borderRadius: 3, padding: "2px 6px", textAlign: "center" }}>{l.status}</div>
              <div style={{ fontSize: 10, color: "#10B981" }}>{l.loan}</div>
              <div style={{ fontSize: 10, color: "#6B7280" }}>{l.equity}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Screen_AgentAI({ data, color }) {
  const { header, tools, messages } = data
  return (
    <div style={{ height: "100%", display: "flex", fontFamily: "'JetBrains Mono', monospace", background: "#060C14" }}>
      {/* Tools sidebar */}
      <div style={{ width: 160, borderRight: "1px solid rgba(139,92,246,0.15)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ background: "#0A1628", borderBottom: `1px solid ${color}22`, height: 38, display: "flex", alignItems: "center", padding: "0 12px" }}>
          <span style={{ color, fontWeight: 700, fontSize: 10, letterSpacing: 2 }}>AGENT AI</span>
        </div>
        <div style={{ padding: "10px 12px" }}>
          <div style={{ fontSize: 8, color: "#6B7280", letterSpacing: 2, marginBottom: 8 }}>ACTIVE TOOLS</div>
          {tools.map(t => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#10B981" }} />
              <span style={{ fontSize: 8, color: "#6B7280" }}>{t}</span>
            </div>
          ))}
          <div style={{ marginTop: 10, padding: "6px 8px", background: `${color}10`, border: `1px solid ${color}25`, borderRadius: 4 }}>
            <div style={{ fontSize: 8, color, letterSpacing: 1 }}>STATUS</div>
            <div style={{ fontSize: 12, fontWeight: 800, color, marginTop: 2 }}>ACTIVE</div>
          </div>
        </div>
      </div>
      {/* Chat */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ background: "#0A1628", borderBottom: `1px solid ${color}22`, padding: "0 14px", height: 38, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981" }} />
            <span style={{ fontSize: 11, color, fontWeight: 700 }}>Huit Agent AI</span>
          </div>
          <span style={{ fontSize: 8, color: "#6B7280" }}>Diana Lane · Wasilla, AK · 11:04 PM</span>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "80%", background: m.role === "user" ? "rgba(255,255,255,0.05)" : `${color}14`, border: `1px solid ${m.role === "user" ? "rgba(255,255,255,0.08)" : `${color}33`}`, borderRadius: 6, padding: "7px 10px", fontSize: 10, color: "#E2E8F0", lineHeight: 1.55 }}>{m.text}</div>
              <div style={{ fontSize: 8, color: "#374151", marginTop: 2 }}>{m.time}</div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${color}22`, padding: "8px 14px" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${color}25`, borderRadius: 5, padding: "7px 10px", fontSize: 9, color: "#374151", display: "flex", justifyContent: "space-between" }}>
            <span>Ask Huit Agent AI anything...</span>
            <span style={{ color, fontSize: 8 }}>NMLS #203980</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const SCREEN_COMPONENTS = [
  Screen_APEX_Candidates,
  Screen_APEX_Market,
  Screen_Retention,
  Screen_PropertyPulse,
  Screen_LeadScoring,
  Screen_AgentAI,
]

// ─── MAIN PLAYER ──────────────────────────────────────────────────────────────
export default function DemoPlayer() {
  const [sceneIdx, setSceneIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [visibleCallouts, setVisibleCallouts] = useState([])
  const [error, setError] = useState(null)
  const [apiKey, setApiKey] = useState("")
  const [keySubmitted, setKeySubmitted] = useState(false)
  const [showKey, setShowKey] = useState(false)

  const audioRef = useRef(null)
  const audioCache = useRef({})
  const calloutTimers = useRef([])

  const scene = SCENES[sceneIdx]
  const ScreenComp = SCREEN_COMPONENTS[sceneIdx]

  // Check server-side key
  useEffect(() => {
    fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "ping", voice_id: VOICE_ID }),
    }).then(r => { if (r.ok) setKeySubmitted(true) }).catch(() => {})
  }, [])

  const clearCallouts = useCallback(() => {
    calloutTimers.current.forEach(clearTimeout)
    calloutTimers.current = []
  }, [])

  const scheduleCallouts = useCallback((sc) => {
    clearCallouts()
    setVisibleCallouts([])
    sc.callouts.forEach(c => {
      const t = setTimeout(() => {
        setVisibleCallouts(prev => [...prev, c])
      }, c.at * 1000)
      calloutTimers.current.push(t)
    })
  }, [clearCallouts])

  const fetchAudio = useCallback(async (sc) => {
    if (audioCache.current[sc.id]) return audioCache.current[sc.id]
    const body = { text: sc.script, voice_id: VOICE_ID }
    if (apiKey) body.api_key = apiKey
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`TTS error ${res.status}`)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    audioCache.current[sc.id] = url
    return url
  }, [apiKey])

  const playScene = useCallback(async (idx) => {
    const sc = SCENES[idx]
    setLoading(true)
    setError(null)
    setElapsed(0)
    clearCallouts()
    setVisibleCallouts([])
    try {
      const url = await fetchAudio(sc)
      const audio = new Audio(url)
      audioRef.current = audio
      audio.ontimeupdate = () => setElapsed(Math.floor(audio.currentTime))
      audio.onended = () => {
        setPlaying(false)
        if (idx < SCENES.length - 1) {
          setTimeout(() => { setSceneIdx(idx + 1); playScene(idx + 1) }, 1500)
        }
      }
      await audio.play()
      setPlaying(true)
      scheduleCallouts(sc)
      if (idx + 1 < SCENES.length) setTimeout(() => fetchAudio(SCENES[idx + 1]).catch(() => {}), 4000)
    } catch (e) {
      setError(e.message)
      setPlaying(false)
    } finally {
      setLoading(false)
    }
  }, [fetchAudio, scheduleCallouts, clearCallouts])

  const handlePlay = useCallback(() => {
    if (playing) {
      audioRef.current?.pause()
      setPlaying(false)
      clearCallouts()
    } else {
      if (audioRef.current?.src && audioRef.current.paused) {
        audioRef.current.play()
        setPlaying(true)
        scheduleCallouts(scene)
      } else {
        playScene(sceneIdx)
      }
    }
  }, [playing, scene, sceneIdx, playScene, clearCallouts, scheduleCallouts])

  const goScene = useCallback((idx) => {
    audioRef.current?.pause()
    audioRef.current = null
    clearCallouts()
    setVisibleCallouts([])
    setPlaying(false)
    setElapsed(0)
    setSceneIdx(idx)
  }, [clearCallouts])

  const estDuration = Math.round(scene.script.split(" ").length / 2.6)
  const pct = Math.min((elapsed / estDuration) * 100, 100)

  // ── KEY SCREEN ────────────────────────────────────────────
  if (!keySubmitted) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#060C14", fontFamily: "'JetBrains Mono', monospace" }}>
        <div style={{ background: "#0A1628", border: "1px solid rgba(0,212,255,0.25)", borderRadius: 12, padding: 40, width: 440, textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#00D4FF", letterSpacing: 4, marginBottom: 8 }}>HUIT.AI</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#E2E8F0", fontFamily: "'Inter', sans-serif", marginBottom: 4 }}>Live Demo Player</div>
          <div style={{ fontSize: 12, color: "#6B7280", fontFamily: "'Inter', sans-serif", marginBottom: 28 }}>Enter your ElevenLabs API key to activate Casey Kim audio narration</div>
          <div style={{ position: "relative", marginBottom: 14 }}>
            <input type={showKey ? "text" : "password"} value={apiKey} onChange={e => setApiKey(e.target.value)} onKeyDown={e => e.key === "Enter" && apiKey && setKeySubmitted(true)} placeholder="sk-..." style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.3)", borderRadius: 6, padding: "10px 40px 10px 14px", fontSize: 13, color: "#E2E8F0", outline: "none", fontFamily: "inherit" }} />
            <button onClick={() => setShowKey(!showKey)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 13 }}>{showKey ? "🙈" : "👁"}</button>
          </div>
          <button onClick={() => apiKey && setKeySubmitted(true)} style={{ width: "100%", background: apiKey ? "#00D4FF" : "rgba(255,255,255,0.05)", border: "none", borderRadius: 6, padding: "11px 0", fontSize: 12, fontWeight: 700, color: apiKey ? "#060C14" : "#374151", cursor: apiKey ? "pointer" : "default", fontFamily: "inherit", letterSpacing: 2 }}>
            LAUNCH DEMO PLAYER
          </button>
          <div style={{ marginTop: 16, fontSize: 9, color: "#374151" }}>Key is transmitted server-side only · never stored · never logged</div>
        </div>
      </div>
    )
  }

  // ── PLAYER ────────────────────────────────────────────────
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#060C14", overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>

      {/* Top bar */}
      <div style={{ background: "#080E1A", borderBottom: "1px solid rgba(255,255,255,0.06)", height: 46, display: "flex", alignItems: "center", padding: "0 20px", gap: 16, flexShrink: 0 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: "#00D4FF", letterSpacing: 4 }}>HUIT.AI</span>
        <span style={{ color: "#1F2937" }}>|</span>
        <span style={{ fontSize: 11, color: "#6B7280" }}>Live Platform Demo · 6 Use Cases</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          {playing && (
            <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 2, height: 14, background: scene.color, borderRadius: 1, animation: `waveBar 0.7s ease-in-out infinite`, animationDelay: `${i * 0.12}s` }} />)}
            </div>
          )}
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: playing ? scene.color : "#374151", letterSpacing: 2 }}>
            {loading ? "GENERATING AUDIO" : playing ? "NARRATING" : "READY"}
          </span>
        </div>
      </div>

      {/* Scene tabs */}
      <div style={{ background: "#070D18", borderBottom: "1px solid rgba(255,255,255,0.04)", height: 42, display: "flex", alignItems: "center", padding: "0 20px", gap: 4, overflowX: "auto", flexShrink: 0 }}>
        {SCENES.map((s, i) => (
          <button key={s.id} onClick={() => goScene(i)} style={{ background: i === sceneIdx ? `${s.color}14` : "transparent", border: `1px solid ${i === sceneIdx ? s.color : "rgba(255,255,255,0.06)"}`, borderRadius: 4, padding: "4px 12px", cursor: "pointer", whiteSpace: "nowrap", color: i === sceneIdx ? s.color : "#4B5563", fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5, display: "flex", alignItems: "center", gap: 7, transition: "all 0.2s" }}>
            <span style={{ fontSize: 8, opacity: 0.5 }}>{s.num}</span>
            <span>{s.title}</span>
            {audioCache.current[s.id] && <span style={{ color: "#10B981", fontSize: 7 }}>✓</span>}
          </button>
        ))}
      </div>

      {/* Main layout */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "300px 1fr", overflow: "hidden" }}>

        {/* Left panel */}
        <div style={{ borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Scene info */}
          <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.05)", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: scene.color, letterSpacing: 3 }}>UC {scene.num}</span>
              <div style={{ flex: 1, height: 1, background: `${scene.color}30` }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: scene.color, opacity: 0.5 }}>{scene.platform}</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#E2E8F0", marginBottom: 2 }}>{scene.title}</div>
            <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 6 }}>{scene.subtitle}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: scene.color, opacity: 0.7 }}>↗ {scene.url}</div>
          </div>

          {/* Script */}
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 18px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "#374151", letterSpacing: 2, marginBottom: 8 }}>NARRATION SCRIPT</div>
            <p style={{ fontSize: 11, color: "#9CA3AF", lineHeight: 1.85 }}>{scene.script}</p>

            <div style={{ marginTop: 18 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "#374151", letterSpacing: 2, marginBottom: 8 }}>DATA CALLOUTS</div>
              {scene.callouts.map((c, i) => {
                const active = visibleCallouts.includes(c)
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, opacity: active ? 1 : 0.3, transition: "opacity 0.5s" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: scene.color, minWidth: 28 }}>{c.at}s</span>
                    <div style={{ flex: 1, background: active ? `${scene.color}14` : "rgba(255,255,255,0.03)", border: `1px solid ${active ? scene.color + "44" : "rgba(255,255,255,0.06)"}`, borderRadius: 3, padding: "3px 8px", transition: "all 0.4s" }}>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: scene.color }}>{c.label}</div>
                      <div style={{ fontSize: 10, color: "#E2E8F0", fontWeight: 700 }}>{c.value}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Controls */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "12px 18px", flexShrink: 0 }}>
            {/* Progress */}
            <div style={{ height: 2, background: "rgba(255,255,255,0.07)", borderRadius: 1, marginBottom: 10, overflow: "hidden" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: scene.color, borderRadius: 1, transition: "width 0.5s linear" }} />
            </div>
            {error && <div style={{ fontSize: 9, color: "#FF3B5C", marginBottom: 8 }}>⚠ {error}</div>}
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => sceneIdx > 0 && goScene(sceneIdx - 1)} disabled={sceneIdx === 0} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "8px 12px", color: sceneIdx === 0 ? "#1F2937" : "#9CA3AF", cursor: sceneIdx === 0 ? "default" : "pointer", fontSize: 13 }}>‹</button>
              <button onClick={handlePlay} disabled={loading} style={{ flex: 1, background: loading ? "rgba(255,255,255,0.04)" : playing ? "rgba(239,68,68,0.12)" : `${scene.color}18`, border: `1px solid ${loading ? "rgba(255,255,255,0.08)" : playing ? "#EF4444" : scene.color}`, borderRadius: 4, padding: "9px 0", color: loading ? "#374151" : playing ? "#EF4444" : scene.color, cursor: loading ? "default" : "pointer", fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.5, transition: "all 0.2s" }}>
                {loading ? "⟳ LOADING..." : playing ? "⏸  PAUSE" : audioCache.current[scene.id] ? "▶  RESUME" : "▶  PLAY NARRATION"}
              </button>
              <button onClick={() => sceneIdx < SCENES.length - 1 && goScene(sceneIdx + 1)} disabled={sceneIdx === SCENES.length - 1} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "8px 12px", color: sceneIdx === SCENES.length - 1 ? "#1F2937" : "#9CA3AF", cursor: sceneIdx === SCENES.length - 1 ? "default" : "pointer", fontSize: 13 }}>›</button>
            </div>
            <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "#374151" }}>
              <span>Scene {sceneIdx + 1} of {SCENES.length}</span>
              <span>{Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")} / ~{Math.floor(estDuration / 60)}:{String(estDuration % 60).padStart(2, "0")}</span>
            </div>
          </div>
        </div>

        {/* Right: Browser-framed screen + callout overlays */}
        <div style={{ position: "relative", padding: "14px", overflow: "hidden", background: "#04080F" }}>
          <BrowserChrome url={scene.url} color={scene.color}>
            <ScreenComp data={scene.screenData} color={scene.color} />
          </BrowserChrome>

          {/* Callout overlays */}
          {visibleCallouts.map((c, i) => (
            <div key={i} style={{ position: "absolute", left: `calc(14px + (100% - 28px) * ${c.x / 100})`, top: `calc(14px + (100% - 28px) * ${c.y / 100})`, transform: "translate(-50%, -50%)", zIndex: 20, pointerEvents: "none", animation: "calloutPop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards" }}>
              {/* Pulse ring */}
              <div style={{ position: "absolute", inset: -8, borderRadius: 12, border: `2px solid ${scene.color}`, animation: "calloutRing 1.5s ease-out infinite", opacity: 0.5 }} />
              {/* Card */}
              <div style={{ background: "rgba(6,12,20,0.97)", border: `2px solid ${scene.color}`, borderRadius: 8, padding: "8px 14px", boxShadow: `0 0 30px ${scene.color}55, 0 8px 24px rgba(0,0,0,0.7)` }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: scene.color, letterSpacing: 2, marginBottom: 3 }}>{c.label}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#E2E8F0", fontFamily: "'Inter', sans-serif" }}>{c.value}</div>
              </div>
            </div>
          ))}

          {/* URL badge */}
          <div style={{ position: "absolute", bottom: 22, right: 22, background: "rgba(4,8,15,0.92)", border: `1px solid ${scene.color}44`, borderRadius: 5, padding: "4px 10px", backdropFilter: "blur(8px)" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: scene.color, opacity: 0.8 }}>↗ {scene.url}</div>
          </div>

          {/* Playing indicator */}
          {playing && (
            <div style={{ position: "absolute", top: 22, right: 22, display: "flex", alignItems: "center", gap: 8, background: "rgba(4,8,15,0.92)", border: `1px solid ${scene.color}44`, borderRadius: 5, padding: "5px 10px", backdropFilter: "blur(8px)" }}>
              <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
                {[0, 1, 2, 3].map(i => <div key={i} style={{ width: 2, height: 10, background: scene.color, borderRadius: 1, animation: `waveBar 0.6s ease-in-out infinite`, animationDelay: `${i * 0.1}s` }} />)}
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: scene.color, letterSpacing: 2 }}>CASEY KIM · NARRATING</span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes calloutPop { from { opacity:0; transform:translate(-50%,-50%) scale(0.7); } to { opacity:1; transform:translate(-50%,-50%) scale(1); } }
        @keyframes calloutRing { 0% { transform:scale(1); opacity:0.5; } 100% { transform:scale(1.6); opacity:0; } }
        @keyframes waveBar { 0%,100% { transform:scaleY(0.35); opacity:0.5; } 50% { transform:scaleY(1); opacity:1; } }
        @keyframes ring { 0%,100% { box-shadow:0 0 0 0 rgba(0,212,255,0.5); } 50% { box-shadow:0 0 0 6px rgba(0,212,255,0); } }
      `}</style>
    </div>
  )
}
