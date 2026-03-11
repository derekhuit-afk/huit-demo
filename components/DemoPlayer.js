"use client"
import React, { useState, useRef, useCallback, useEffect } from "react"

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const VOICE_ID      = "EXAVITQu4vr4xnSDxMaL" // Casey Kim — Track 1 Recruiting
const VOICE_ID_MALE = "pqHfZKP75CvOlQylNhV4" // Bill — Wise, Mature, American — Track 2 LO

// ─── SCENE DATA ───────────────────────────────────────────────────────────────
const SCENES = [
  {
    id: 1, num: "01",
    title: "APEX Recruiting Command Center",
    subtitle: "Total Market Intelligence — Live",
    url: "mapex.huit.ai/command-center",
    platform: "APEX",
    color: "#00D4FF",
    script: `This is what recruiting looks like when you have full market intelligence. The APEX Recruiting Command Center. Two hundred forty-seven loan officers tracked across forty-two markets. Right now, this morning, fourteen of them have a Transition Likelihood Score above seventy — meaning our algorithm gives each of them a greater than seventy percent probability of changing companies within sixty days. Forty-one more are in the MOBILE tier — open, watching, ready to hear the right pitch. That's fifty-five warm-to-hot recruiting conversations you could be having this week. The priority board in the center shows today's top five targets ranked by score, production volume, and engagement signal. Sarah Martinez: TLS eighty-four, eighty-four million in production, flagged IMMINENT this morning after a comp plan change at her current company. Your job is to call her before your competitor does. The market signals panel on the right tells you why scores are moving — a restructuring announcement, a branch closure, a territory change. APEX catches it. The activity feed below shows what your team did yesterday, what it's doing right now, and what needs to happen next. Every morning you open this dashboard, you are further ahead than every recruiter in your market who doesn't have it. This is the Command Center.`,
    callouts: [
      { at: 8,  label: "Tracked Nationwide", value: "247 Loan Officers",     x: 64, y: 18 },
      { at: 20, label: "IMMINENT Today",     value: "14 — Act This Week",    x: 64, y: 30 },
      { at: 34, label: "Top Target",         value: "Sarah Martinez — 84",   x: 64, y: 44 },
      { at: 50, label: "Market Signal",      value: "Comp Change at Caliber", x: 64, y: 58 },
      { at: 64, label: "Team Activity",      value: "Live Recruiter Feed",    x: 64, y: 72 },
    ],
    screenData: {
      kpis: [
        { label: "Tracked LOs",    value: "247",  sub: "42 markets",           color: "#00D4FF" },
        { label: "IMMINENT",       value: "14",   sub: ">70% move prob.",       color: "#FF3B5C" },
        { label: "MOBILE",         value: "41",   sub: "Warm — engage now",     color: "#F59E0B" },
        { label: "Hired MTD",      value: "3",    sub: "$112M added",           color: "#10B981" },
        { label: "In Pipeline",    value: "22",   sub: "Active conversations",  color: "#8B5CF6" },
      ],
      priorities: [
        { rank: 1, name: "Sarah Martinez",   co: "Caliber Home Loans",    vol: "$84M", tls: 84, tier: "IMMINENT", signal: "Comp plan cut",       color: "#FF3B5C", hot: true },
        { rank: 2, name: "James Okafor",     co: "loanDepot",             vol: "$55M", tls: 79, tier: "IMMINENT", signal: "Manager departed",    color: "#FF3B5C", hot: true },
        { rank: 3, name: "David Chen",       co: "Guaranteed Rate",       vol: "$61M", tls: 76, tier: "MOBILE",   signal: "Comp inquiry sent",   color: "#F59E0B", hot: false },
        { rank: 4, name: "Rachel Kim",       co: "CrossCountry Mortgage", vol: "$42M", tls: 67, tier: "MOBILE",   signal: "LinkedIn activity ↑", color: "#F59E0B", hot: false },
        { rank: 5, name: "Amanda Torres",    co: "UWM",                   vol: "$49M", tls: 71, tier: "MOBILE",   signal: "Territory change",    color: "#F59E0B", hot: false },
      ],
      signals: [
        { co: "Caliber Home Loans",       event: "Q1 comp plan reduction announced",   impact: "HIGH",   los: 18, delta: "+12 TLS avg" },
        { co: "Rocket Mortgage",          event: "Branch closure — Chandler, AZ",      impact: "HIGH",   los: 4,  delta: "+18 TLS avg" },
        { co: "Guaranteed Rate",          event: "Territory realignment memo leaked",  impact: "MEDIUM", los: 11, delta: "+8 TLS avg" },
        { co: "UWM",                      event: "Regional VP departure",              impact: "MEDIUM", los: 7,  delta: "+6 TLS avg" },
      ],
      activity: [
        { time: "9:04 AM",  who: "Derek H.",  action: "Called Sarah Martinez — left voicemail",     type: "call" },
        { time: "8:58 AM",  who: "APEX AI",   action: "TLS rescore complete — 3 new IMMINENT",      type: "system" },
        { time: "8:44 AM",  who: "Derek H.",  action: "RCS sent to James Okafor — read 8:47 AM",    type: "rcs" },
        { time: "Yesterday",who: "APEX AI",   action: "Caliber signal detected — 18 LOs flagged",   type: "system" },
        { time: "Yesterday",who: "Derek H.",  action: "David Chen — 30-min call · moved to pipeline",type:"call" },
      ],
      quota: { hired: 3, goal: 5, vol_added: 112, vol_goal: 200, label: "March Goal" },
    },
  },
  {
    id: 2, num: "02",
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
    id: 3, num: "03",
    title: "APEX Recruiting Dashboard",
    subtitle: "National TLS Leaderboard",
    url: "mapex.huit.ai/dashboard",
    platform: "APEX",
    color: "#7C3AED",
    script: `This is the full APEX recruiting intelligence dashboard — the national view. Two hundred forty-seven loan officers tracked across forty-two markets. Fourteen in the IMMINENT tier right now, meaning our algorithm gives them a greater than seventy percent probability of changing companies within sixty days. Forty-one in the MOBILE tier — watching and open. Let me show you the leaderboard. Sarah Martinez in Phoenix: eighty-four million in production, TLS eighty-four, IMMINENT. David Chen in Scottsdale: sixty-one million, TLS seventy-six, MOBILE. Amanda Torres in Tempe: forty-nine million, TLS seventy-one, MOBILE. These aren't cold leads. These are warm-to-hot recruiting targets backed by sixteen factors of behavioral and market data. The market intelligence panel on the right shows what's driving movement right now: a corporate restructuring announcement at Caliber is elevating scores across their entire Arizona book. That's an opportunity a traditional recruiter would never see. But APEX sees it in real time. The Source Confidence Factor Registry on the bottom validates every data point — so when you bring a TLS score to a manager, you can defend every number in it. This is recruiting intelligence that changes outcomes.`,
    callouts: [
      { at: 8,  label: "Tracked Nationwide", value: "247 Loan Officers",    x: 65, y: 20 },
      { at: 20, label: "IMMINENT Tier",      value: "14 — Act This Week",   x: 65, y: 34 },
      { at: 34, label: "Top Target",         value: "Sarah Martinez $84M",  x: 65, y: 48 },
      { at: 48, label: "Market Signal",      value: "Caliber Restructuring", x: 65, y: 62 },
      { at: 60, label: "Data Confidence",    value: "SCF Registry Validated",x: 65, y: 76 },
    ],
    screenData: {
      stats: [
        { label: "Tracked LOs",    value: "247",   sub: "42 markets",        color: "#7C3AED" },
        { label: "IMMINENT",       value: "14",    sub: ">70% move prob.",    color: "#FF3B5C" },
        { label: "MOBILE",         value: "41",    sub: "Warm targets",       color: "#F59E0B" },
        { label: "Avg TLS",        value: "61",    sub: "↑ 4 pts this week",  color: "#7C3AED" },
      ],
      rows: [
        { name: "Sarah Martinez",   co: "Caliber Home Loans",    mkt: "Phoenix, AZ",    vol: "$84M", score: 84, tier: "IMMINENT",  tls_c: "#FF3B5C", active: true },
        { name: "David Chen",       co: "Guaranteed Rate",       mkt: "Scottsdale, AZ", vol: "$61M", score: 76, tier: "MOBILE",    tls_c: "#F59E0B", active: false },
        { name: "Amanda Torres",    co: "UWM",                   mkt: "Tempe, AZ",      vol: "$49M", score: 71, tier: "MOBILE",    tls_c: "#F59E0B", active: false },
        { name: "Brian Walsh",      co: "Movement Mortgage",     mkt: "Mesa, AZ",       vol: "$38M", score: 58, tier: "RECEPTIVE", tls_c: "#00D4FF", active: false },
        { name: "Linda Park",       co: "Rocket Mortgage",       mkt: "Chandler, AZ",   vol: "$29M", score: 44, tier: "RECEPTIVE", tls_c: "#00D4FF", active: false },
        { name: "James Okafor",     co: "loanDepot",             mkt: "Glendale, AZ",   vol: "$55M", score: 79, tier: "MOBILE",    tls_c: "#F59E0B", active: false },
        { name: "Rachel Kim",       co: "CrossCountry Mortgage", mkt: "Tucson, AZ",     vol: "$42M", score: 67, tier: "MOBILE",    tls_c: "#F59E0B", active: false },
      ],
      marketSignals: [
        { signal: "Caliber Home Loans — Restructuring Announcement",    impact: "HIGH",   affected: 18 },
        { signal: "Guaranteed Rate — Q1 Comp Plan Reduction",           impact: "MEDIUM", affected: 11 },
        { signal: "UWM — Territory Realignment Notice",                  impact: "MEDIUM", affected: 7  },
        { signal: "Rocket Mortgage — Branch Closure — Chandler",        impact: "HIGH",   affected: 4  },
      ],
    },
  },
  {
    id: 4, num: "04",
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
    id: 5, num: "05",
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
    id: 6, num: "06",
    title: "Command Center",
    subtitle: "CRMEX Pipeline Intelligence",
    url: "crmex.huit.ai/command-center",
    platform: "CRMEX",
    color: "#F59E0B",
    voiceId: "pqHfZKP75CvOlQylNhV4",
    script: `Every loan officer needs one view that tells them exactly what their business looks like right now. Not yesterday. Not last week. Right now. The CRMEX Command Center is that view. Forty-eight point seven million dollars in active pipeline. Thirty-four hot leads. Twelve appointments on the calendar. Eight projected closings this month. That's a three-point-two million dollar closing volume number — visible the moment you open your dashboard. Scroll down and you see your loan mix: thirty-eight percent purchase, twenty-nine percent refi, eighteen percent cash-out, fifteen percent VA and FHA. That mix matters because it tells you where your marketing dollars should be going next month. The rate watch panel below shows the week's movement — from six-point-seven-four on Monday down to six-point-five-eight today — and flags which contacts in your pipeline crossed the sensitivity threshold overnight. The activity feed on the right is live: Marcus Tran replied to a rate alert two minutes ago. Jennifer Kowalski booked an appointment for Friday at two PM. An AI scoring run just added three HOT leads and eight WARM leads to the pipeline. One screen. Every number that matters. This is the Command Center.`,
    callouts: [
      { at: 8,  label: "Pipeline Value",   value: "$48.7M Active",      x: 66, y: 22 },
      { at: 18, label: "Hot Leads",        value: "34 — Act Now",       x: 66, y: 36 },
      { at: 30, label: "Loan Mix",         value: "38% Purchase",       x: 66, y: 50 },
      { at: 44, label: "Rate Movement",    value: "6.74 → 6.58%",       x: 66, y: 64 },
      { at: 56, label: "Live Activity",    value: "Marcus Tran — HOT",  x: 66, y: 78 },
    ],
    screenData: {
      stats: [
        { label: "Pipeline Value",     value: "$48.7M", sub: "+$2.1M this week",  color: "#F59E0B" },
        { label: "Hot Leads",          value: "34",     sub: "Act now",            color: "#FF3B5C" },
        { label: "Appointments",       value: "12",     sub: "Next 7 days",        color: "#00D4FF" },
        { label: "Proj. Closings",     value: "8",      sub: "$3.2M volume",       color: "#10B981" },
      ],
      loanMix: [
        { name: "Purchase",  value: 38, color: "#00D4FF" },
        { name: "Refi",      value: 29, color: "#7C3AED" },
        { name: "Cash-Out",  value: 18, color: "#F59E0B" },
        { name: "VA/FHA",    value: 15, color: "#10B981" },
      ],
      rateWatch: [
        { day: "Mon", rate: 6.74 }, { day: "Tue", rate: 6.71 },
        { day: "Wed", rate: 6.68 }, { day: "Thu", rate: 6.65 },
        { day: "Fri", rate: 6.61 }, { day: "Today", rate: 6.58 },
      ],
      leads: [
        { name: "Marcus T.",    score: 97, type: "Refi",         status: "HOT",    lastContact: "2m ago",  channel: "SMS" },
        { name: "Jennifer K.",  score: 94, type: "Purchase",     status: "HOT",    lastContact: "8m ago",  channel: "Email" },
        { name: "Robert A.",    score: 89, type: "Cash-Out",     status: "WARM",   lastContact: "1h ago",  channel: "SMS" },
        { name: "Sandra M.",    score: 86, type: "VA IRRRL",     status: "WARM",   lastContact: "3h ago",  channel: "Email" },
        { name: "David L.",     score: 82, type: "FHA Streamline",status: "WARM",  lastContact: "5h ago",  channel: "SMS" },
        { name: "Christine B.", score: 78, type: "Refi",         status: "NURTURE",lastContact: "1d ago",  channel: "Email" },
      ],
      activity: [
        { time: "2m",  icon: "🔥", msg: "Marcus T. replied to Rate Alert SMS — SCORE 97",     type: "hot" },
        { time: "6m",  icon: "📅", msg: "Appointment booked: Jennifer K. — Fri 2:00 PM",       type: "success" },
        { time: "14m", icon: "⚡", msg: "Rate drop detected: 30yr Conv → 6.58% (−0.16%)",       type: "alert" },
        { time: "22m", icon: "🏠", msg: "Property Pulse: 3 equity alerts — Wasilla cluster",    type: "info" },
        { time: "41m", icon: "📧", msg: "Campaign 'AK Rate Drop' sent to 312 — 71.2% open",    type: "success" },
        { time: "1h",  icon: "🤖", msg: "AI scored 18 leads — 3 HOT, 8 WARM added to pipeline",type: "info" },
      ],
    },
  },
  {
    id: 7, num: "07",
    title: "AI Lead Scoring Engine",
    subtitle: "Score 94 — 48 Hours",
    url: "crmex.huit.ai/leads",
    platform: "CRMEX",
    color: "#EF4444",
    voiceId: "pqHfZKP75CvOlQylNhV4",
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
    id: 8, num: "08",
    title: "Property Pulse Equity Engine",
    subtitle: "Past Borrower Re-Engagement",
    url: "crmex.huit.ai/property-pulse",
    platform: "CRMEX",
    color: "#10B981",
    voiceId: "pqHfZKP75CvOlQylNhV4",
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
    id: 9, num: "09",
    title: "Huit Agent AI",
    subtitle: "9 Live CRM Tools · Natural Language",
    url: "crmex-huit-agent-ai.vercel.app",
    platform: "HUIT AGENT",
    color: "#8B5CF6",
    voiceId: "pqHfZKP75CvOlQylNhV4",
    script: `Every tool you're about to see is live. Not mocked. Not a chatbot with scripted replies. Huit Agent AI has nine connected CRM tools firing in real time. Watch how they work. Diana Lane submits a purchase inquiry at eleven PM. The agent immediately calls CRM Lead Lookup — no existing record, so it creates one and flags her as a new inbound. It calls AI Lead Scoring — Diana hits a seventy-two, WARM, based on loan type, timeline, and credit range. It calls Calendar Book and schedules a morning callback automatically. That entire intake: twelve minutes. Now watch the loan officer session. The LO types: "Who should I call today?" — the agent calls AI Lead Scoring across the full pipeline, then cross-references Rate Feed to see who crossed the rate sensitivity threshold overnight. It surfaces Marcus Tran — score ninety-four, HOT. "Draft a rate alert email for Marcus" — the agent calls Property Pulse to pull his current equity, hits Rate Feed for today's number, then Email Drafter generates a fully personalized message with his loan balance, equity position, monthly savings, and a Calendly link — all in two seconds. Pipeline View, HMDA Lookup, SMS Trigger — every tool available on demand, in plain English. This isn't AI that helps you remember things. This is AI that works while you sleep.`,
    callouts: [
      { at: 8,  label: "CRM Lead Lookup",  value: "New Lead Created",       x: 56, y: 18 },
      { at: 18, label: "AI Lead Scoring",  value: "Diana → Score 72 WARM",  x: 56, y: 30 },
      { at: 28, label: "Calendar Book",    value: "Callback Scheduled",      x: 56, y: 44 },
      { at: 42, label: "Rate Feed + Scoring", value: "Marcus Tran — 94 HOT",x: 56, y: 58 },
      { at: 56, label: "Property Pulse + Email", value: "Draft in 2s",      x: 56, y: 72 },
    ],
    screenData: {
      tools: [
        { name: "CRM Lead Lookup",  icon: "🔍", color: "#00D4FF", status: "ACTIVE", lastCall: "11:04 PM", desc: "Search & create contacts by name, phone, or email", lastResult: "New record: Diana Lane · HOT flagged" },
        { name: "AI Lead Scoring",  icon: "⚡", color: "#8B5CF6", status: "ACTIVE", lastCall: "9:02 AM",  desc: "Behavioral + equity model · Score 0–100", lastResult: "Marcus Tran → 94 / HOT" },
        { name: "Rate Feed",        icon: "📈", color: "#10B981", status: "ACTIVE", lastCall: "9:02 AM",  desc: "Live 30yr Conv, FHA, VA rate pull", lastResult: "30yr Conv: 6.58% (↓0.16%)" },
        { name: "Property Pulse",   icon: "🏠", color: "#F59E0B", status: "ACTIVE", lastCall: "9:03 AM",  desc: "AVM + equity calc on subject property", lastResult: "Marcus: $182K equity · $485K bal" },
        { name: "Email Drafter",    icon: "✉",  color: "#EC4899", status: "ACTIVE", lastCall: "9:03 AM",  desc: "Generates personalized outreach from loan data", lastResult: "Rate alert email · 4 fields merged" },
        { name: "Pipeline View",    icon: "📊", color: "#F59E0B", status: "IDLE",   lastCall: "8:44 AM",  desc: "Current pipeline stats and open loan count", lastResult: "$48.7M active · 34 HOT leads" },
        { name: "HMDA Lookup",      icon: "🗂",  color: "#7C3AED", status: "IDLE",   lastCall: "8:31 AM",  desc: "Query 7yr HMDA dataset for market intel", lastResult: "AK refi volume ↑14% YoY" },
        { name: "Calendar Book",    icon: "📅", color: "#00D4FF", status: "ACTIVE", lastCall: "11:14 PM", desc: "Schedule callbacks and appointments", lastResult: "Diana Lane · 9:00 AM callback" },
        { name: "SMS Trigger",      icon: "💬", color: "#10B981", status: "IDLE",   lastCall: "11:15 PM", desc: "Send confirmation or alert texts via RCS/SMS", lastResult: "Confirmation sent to Diana +1 (907)…" },
      ],
      messages: [
        { role: "user",     text: "Hi — I saw an ad for homes in Wasilla and think I might be ready to buy. My name is Diana Lane.", time: "11:04 PM" },
        { role: "toolcall", tool: "CRM Lead Lookup", input: "name: Diana Lane", result: "No existing record — creating new contact", time: "11:04 PM", color: "#00D4FF" },
        { role: "ai",       text: "Hi Diana! Huit Agent AI here — I can help get you started and connect you with a licensed loan officer. Are you looking to purchase a primary residence in Wasilla?", time: "11:04 PM" },
        { role: "user",     text: "Yes, primary residence. Looking at homes around $450,000.", time: "11:06 PM" },
        { role: "ai",       text: "Got it. Roughly what's your credit score range? (Excellent 740+, Good 680–739, Fair 620–679)", time: "11:07 PM" },
        { role: "user",     text: "Around 720, maybe a little higher.", time: "11:09 PM" },
        { role: "ai",       text: "Strong profile for conventional financing. What's your timeline — purchasing in the next 30–90 days?", time: "11:10 PM" },
        { role: "user",     text: "Yes, about 60 days. Found a neighborhood we love.", time: "11:12 PM" },
        { role: "toolcall", tool: "AI Lead Scoring",  input: "Diana Lane · $450K purchase · 720 credit · 60-day timeline", result: "Score: 72 / WARM — flagging for morning callback", time: "11:13 PM", color: "#8B5CF6" },
        { role: "toolcall", tool: "Calendar Book",    input: "New lead: Diana Lane · callback request", result: "Scheduled: Tomorrow 9:00 AM with Derek Huit", time: "11:13 PM", color: "#00D4FF" },
        { role: "toolcall", tool: "SMS Trigger",      input: "Diana Lane · confirmation message", result: "SMS sent: 'Hi Diana, callback confirmed for 9 AM tomorrow — Derek Huit, NMLS #203980'", time: "11:14 PM", color: "#10B981" },
        { role: "ai",       text: "I have everything I need, Diana. I've flagged your file and scheduled a callback with Derek Huit for tomorrow at 9:00 AM. You'll receive a confirmation text in the next minute. Welcome to Alaska homeownership. NMLS #203980", time: "11:14 PM" },
        { role: "divider",  text: "— LO Command Session · 9:02 AM —", time: "" },
        { role: "lo",       text: "Who should I call today?", time: "9:02 AM" },
        { role: "toolcall", tool: "AI Lead Scoring",  input: "Full pipeline rescore · rate sensitivity filter", result: "Top result: Marcus Tran — Score 94 / HOT · crossed threshold overnight", time: "9:02 AM", color: "#8B5CF6" },
        { role: "toolcall", tool: "Rate Feed",        input: "30yr Conventional · today", result: "6.58% — down 0.16% from Monday · 12 contacts crossed sensitivity threshold", time: "9:02 AM", color: "#10B981" },
        { role: "ai",       text: "🔥 Top Priority: Marcus Tran — Score 94 / HOT. Cash-out refi, $485K loan, $182K equity in Wasilla. Engaged 48 hrs ago via Facebook ad. No outreach yet. Call him first.", time: "9:02 AM", highlight: true },
        { role: "lo",       text: "Draft a rate alert email for Marcus.", time: "9:03 AM" },
        { role: "toolcall", tool: "Property Pulse",   input: "Marcus Tran · subject property Wasilla AK", result: "$485K loan balance · $182K equity · AVM $667K", time: "9:03 AM", color: "#F59E0B" },
        { role: "toolcall", tool: "Email Drafter",    input: "Marcus Tran · rate drop alert · equity refi opportunity", result: "4-field personalized email generated — loan bal, equity, savings, Calendly", time: "9:03 AM", color: "#EC4899" },
        { role: "ai",       text: "Subject: Marcus — rates just moved, your equity window is open\n\nHi Marcus — Derek Huit here. Rates dropped to 6.58% this week. On your $485K loan at 7.25%, that's roughly a $247/month opportunity — and with $182K in equity built up, you may also qualify for a cash-out. I'd love to walk you through the numbers. 15 minutes: calendly.com/derekhuit\n\nDerek Huit | Huit.AI | NMLS #203980", time: "9:03 AM", isEmail: true },
      ],
    },
  },
  {
    id: 10, num: "10",
    title: "Campaign Manager",
    subtitle: "CRMEX Multi-Channel Outreach",
    url: "crmex.huit.ai/campaigns",
    platform: "CRMEX",
    color: "#EC4899",
    voiceId: "pqHfZKP75CvOlQylNhV4",
    script: `Most loan officers run one campaign at a time, cross their fingers, and hope the leads come in. CRMEX Campaign Manager runs seven simultaneously — across Facebook, Google, LinkedIn, and RCS — with live performance data on every single one. Let me walk you through what's live right now. The AK Rate Drop campaign on Facebook: two thousand eight hundred forty dollars spent, forty-seven leads captured, sixty dollars and forty-three cents per lead. That's a strong number for Alaska mortgage. The Cash-Out Equity campaign: fifty-five dollars and thirty-four cents per lead, fifty-eight leads, six conversions — best performer in the portfolio this month. Now watch what happens when you add RCS to the mix. The LO Recruiting APEX blast: two hundred forty messages sent, two hundred thirty-one delivered, one hundred seventy-eight read, forty-seven replied. A nineteen-point-six percent reply rate on a cold recruiting blast. That number doesn't exist in traditional outreach. Below the campaigns panel is the CRM lead feed — every lead that came in today, their source, their AI score, their loan type, and their current nurture day. The entire operation in one screen.`,
    callouts: [
      { at: 10, label: "Active Campaigns",  value: "7 Running Now",       x: 65, y: 22 },
      { at: 22, label: "Best CPL",          value: "$55.34 Cash-Out",     x: 65, y: 36 },
      { at: 34, label: "RCS Reply Rate",    value: "19.6% — Industry 1%", x: 65, y: 52 },
      { at: 48, label: "Total Leads",       value: "156 This Cycle",      x: 65, y: 66 },
      { at: 58, label: "Top Lead",          value: "Marcus Tran — 94",    x: 65, y: 80 },
    ],
    screenData: {
      campaigns: [
        { name: "AK Rate Drop — Refi Buyers",     ch: "facebook", status: "LIVE",      spend: 2840, leads: 47, cpl: 60.43, conv: 6,  budget: 5000 },
        { name: "Cash-Out Equity — Homeowners",   ch: "facebook", status: "LIVE",      spend: 3210, leads: 58, cpl: 55.34, conv: 7,  budget: 6000 },
        { name: "VA IRRRL — Alaska Veterans",     ch: "google",   status: "LIVE",      spend: 1920, leads: 31, cpl: 61.94, conv: 4,  budget: 3000 },
        { name: "First-Time Buyer Spring",        ch: "linkedin", status: "PAUSED",    spend: 1100, leads: 14, cpl: 78.57, conv: 2,  budget: 2000 },
        { name: "Move-Up Buyer — Spring Pulse",   ch: "google",   status: "SCHEDULED", spend: 0,    leads: 0,  cpl: 0,     conv: 0,  budget: 4000 },
        { name: "LO Recruiting — APEX Q1 Blast",  ch: "rcs",      status: "LIVE",      spend: 0,    leads: 12, cpl: 0,     conv: 3,  rcsSent: 240, rcsRead: 178, rcsReplied: 47 },
        { name: "Equity Pulse — March Homeowners",ch: "rcs",      status: "LIVE",      spend: 0,    leads: 8,  cpl: 0,     conv: 1,  rcsSent: 186, rcsRead: 124, rcsReplied: 31 },
      ],
      leads: [
        { name: "Marcus Tran",       source: "facebook", score: 94, status: "HOT",    loan: "Cash-Out Refi", day: "Day 1" },
        { name: "Jennifer Kowalski", source: "google",   score: 91, status: "HOT",    loan: "VA IRRRL",      day: "Day 3" },
        { name: "Robert Alvarez",    source: "facebook", score: 86, status: "WARM",   loan: "Refinance",     day: "Day 7" },
        { name: "Brandon Whitefish", source: "rcs",      score: 88, status: "HOT",    loan: "N/A — Recruit", day: "Replied" },
        { name: "Tanya Ostrowski",   source: "rcs",      score: 81, status: "WARM",   loan: "Cash-Out Refi", day: "Read" },
      ],
    },
  },
  {
    id: 11, num: "11",
    title: "The Huit.AI Difference",
    subtitle: "Your Day. Transformed.",
    url: "huit.ai",
    platform: "HUIT.AI",
    color: "#00D4FF",
    voiceId: "pqHfZKP75CvOlQylNhV4",
    script: `Here's what you just saw. Nine capabilities. One platform. And what it means for your day. Before Huit dot AI, your morning looked like this: open three different tools, manually pull your pipeline, sort leads in a spreadsheet, guess who to call, hope your rate watch email went out, check in with recruiters who have no data to work with. With Huit dot AI, your morning looks like this: you open Command Center and your entire business is in front of you — forty-eight million in pipeline, thirty-four hot leads, rate movement already flagged, and a live activity feed showing exactly what happened overnight. Your lead scoring engine already ranked and prioritized every contact. Your campaign manager already sent the rate alert to the right three hundred contacts. Your APEX dashboard already surfaced the fourteen loan officers most likely to move this month — before your competitors even know they're looking. That's not just efficiency. That's compounding advantage. Every day you use Huit dot AI, you get further ahead. The recruiter closes more hires. The manager grows a stronger book. The producing loan officer converts more of the right leads at the right time with the right message. This is the platform. This is what it does. We're still in Founding Member pricing — and when those spots are gone, they're gone. Go to huit dot AI slash join right now, pick your tier, and let's get you started.`,
    callouts: [
      { at: 14, label: "Before",         value: "3 Tools, No Data",        x: 65, y: 20 },
      { at: 30, label: "Command Center", value: "$48.7M · Live",           x: 65, y: 32 },
      { at: 42, label: "Lead Scoring",   value: "Auto-Ranked Every AM",    x: 65, y: 44 },
      { at: 54, label: "APEX Signal",    value: "14 IMMINENT — Today",     x: 65, y: 56 },
      { at: 68, label: "The Result",     value: "Compounding Advantage",   x: 65, y: 70 },
    ],
    screenData: {
      modules: [
        { uc: "01", name: "Predictive Transition Scoring", platform: "APEX",       color: "#00D4FF", value: "247 LOs Tracked",      impact: "Know who's moving before they do" },
        { uc: "02", name: "HMDA Market Intelligence",      platform: "APEX",       color: "#7C3AED", value: "7 Years of Data",       impact: "Own your market narrative" },
        { uc: "03", name: "Retention Risk Monitor",        platform: "APEX PULSE", color: "#F59E0B", value: "130+ LOs · $4B+ Book",  impact: "Stop attrition before it happens" },
        { uc: "04", name: "Property Pulse Equity Engine",  platform: "CRMEX",      color: "#10B981", value: "$182K Avg Equity",      impact: "Turn dormant contacts into pipeline" },
        { uc: "05", name: "AI Lead Scoring Engine",        platform: "CRMEX",      color: "#EF4444", value: "Score 94 — HOT",        impact: "Call the right person first. Every time." },
        { uc: "06", name: "Huit Agent AI",                 platform: "HUIT AGENT", color: "#8B5CF6", value: "Draft in 2 seconds",    impact: "AI as your co-pilot on every call" },
        { uc: "07", name: "Command Center",                platform: "CRMEX",      color: "#F59E0B", value: "$48.7M Pipeline",       impact: "One view. Every number that matters." },
        { uc: "08", name: "Campaign Manager",              platform: "CRMEX",      color: "#EC4899", value: "19.6% RCS Reply Rate",  impact: "Outreach that actually gets read" },
        { uc: "09", name: "APEX Recruiting Dashboard",     platform: "APEX",       color: "#7C3AED", value: "14 IMMINENT Today",     impact: "Data-backed recruiting. No cold calls." },
      ],
      before: [
        { time: "7:00 AM", task: "Open 3 separate tools",          pain: true },
        { time: "7:20 AM", task: "Manually sort leads in a spreadsheet",  pain: true },
        { time: "7:45 AM", task: "Guess who to call today",        pain: true },
        { time: "8:30 AM", task: "Manually send rate alert emails", pain: true },
        { time: "9:00 AM", task: "Call 5 leads. 1 answer.",        pain: true },
        { time: "4:30 PM", task: "No pipeline update until EOD",   pain: true },
      ],
      after: [
        { time: "7:00 AM", task: "Open Command Center — full picture in 10 seconds",   win: true },
        { time: "7:05 AM", task: "AI already ranked 34 HOT leads overnight",           win: true },
        { time: "7:08 AM", task: "APEX flagged 14 IMMINENT targets — call list ready", win: true },
        { time: "7:10 AM", task: "Rate alert sent to 312 contacts — automatically",    win: true },
        { time: "8:00 AM", task: "Call Marcus Tran — Score 97. He picks up.",          win: true },
        { time: "EOD",     task: "Pipeline updated live. Nothing missed.",              win: true },
      ],
      cta: { headline: "Ready to run your business like this?", sub: "No free trial. No gimmicks. Founding Member spots still open.", action: "huit.ai/join", tier: "COMMAND $2,350/mo · DOMINATE $4,125/mo" },
    },
  }
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
function Screen_APEX_RecruitingCmd({ data, color }) {
  const { kpis, priorities, signals, activity, quota } = data
  const tierC = { IMMINENT:"#FF3B5C", MOBILE:"#F59E0B", RECEPTIVE:"#00D4FF" }
  const actIcon = { call:"📞", system:"⚡", rcs:"💬" }
  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", fontFamily:"'JetBrains Mono',monospace", background:"#060C14", overflow:"hidden" }}>
      {/* Header */}
      <div style={{ background:"#080E1A", borderBottom:`1px solid ${color}22`, padding:"0 14px", height:36, display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:color, boxShadow:`0 0 8px ${color}` }} />
          <span style={{ fontSize:9, color, letterSpacing:3, fontWeight:700 }}>APEX — RECRUITING COMMAND CENTER</span>
        </div>
        <span style={{ fontSize:8, padding:"1px 8px", background:`${color}12`, border:`1px solid ${color}33`, borderRadius:10, color }}>PATENT PENDING · TLS ENGINE</span>
        <div style={{ marginLeft:"auto", fontSize:8, color:"#10B981" }}>● LIVE RESCORE · {new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})}</div>
      </div>

      {/* KPIs */}
      <div style={{ display:"flex", gap:8, padding:"8px 12px 6px", flexShrink:0 }}>
        {kpis.map((k,i) => (
          <div key={i} style={{ flex:1, background:"rgba(255,255,255,0.025)", border:`1px solid ${k.color}20`, borderRadius:8, padding:"9px 12px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${k.color},transparent)` }} />
            <div style={{ fontSize:7, color:"#6B7280", letterSpacing:2, marginBottom:3 }}>{k.label.toUpperCase()}</div>
            <div style={{ fontSize:22, fontWeight:800, color:"#E2E8F0", fontFamily:"Georgia,serif", lineHeight:1 }}>{k.value}</div>
            <div style={{ fontSize:7, color:k.color, marginTop:3 }}>{k.sub}</div>
          </div>
        ))}
        {/* Quota ring */}
        <div style={{ width:90, background:"rgba(255,255,255,0.025)", border:`1px solid ${color}20`, borderRadius:8, padding:"9px 10px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <div style={{ fontSize:7, color:"#6B7280", letterSpacing:1, marginBottom:6 }}>{quota.label.toUpperCase()}</div>
          <div style={{ position:"relative", width:44, height:44 }}>
            <svg width="44" height="44" style={{ transform:"rotate(-90deg)" }}>
              <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
              <circle cx="22" cy="22" r="18" fill="none" stroke={color} strokeWidth="4"
                strokeDasharray={`${(quota.hired/quota.goal)*113} 113`} strokeLinecap="round" />
            </svg>
            <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:12, fontWeight:800, color:"#E2E8F0" }}>{quota.hired}</span>
              <span style={{ fontSize:7, color:"#4B5563" }}>/{quota.goal}</span>
            </div>
          </div>
          <div style={{ fontSize:7, color:color, marginTop:4 }}>HIRED</div>
        </div>
      </div>

      {/* Main grid */}
      <div style={{ flex:1, display:"grid", gridTemplateColumns:"1fr 200px 200px", gap:8, padding:"0 12px 10px", overflow:"hidden", minHeight:0 }}>

        {/* Priority board */}
        <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:8, display:"flex", flexDirection:"column", overflow:"hidden" }}>
          <div style={{ padding:"7px 12px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
            <span style={{ fontSize:8, color:"#6B7280", letterSpacing:2 }}>TODAY'S PRIORITY RECRUITS</span>
            <span style={{ fontSize:7, color:color }}>Ranked by TLS + Signal</span>
          </div>
          <div style={{ flex:1, overflow:"auto" }}>
            {priorities.map((p,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderBottom:"1px solid rgba(255,255,255,0.04)", background: p.hot?`${p.color}06`:"transparent" }}>
                <div style={{ fontSize:11, fontWeight:800, color:"#374151", width:16, flexShrink:0 }}>{p.rank}</div>
                {/* TLS ring */}
                <div style={{ width:36, height:36, borderRadius:"50%", background:`${p.color}15`, border:`2px solid ${p.color}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontSize:11, fontWeight:800, color:p.color, lineHeight:1 }}>{p.tls}</span>
                  <span style={{ fontSize:6, color:p.color, lineHeight:1 }}>TLS</span>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
                    <span style={{ fontSize:10, color:"#E2E8F0", fontWeight:700 }}>{p.name}</span>
                    {p.hot && <span style={{ fontSize:7, color:"#FF3B5C" }}>🔥</span>}
                  </div>
                  <div style={{ fontSize:8, color:"#6B7280", marginBottom:2 }}>{p.co}</div>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <span style={{ fontSize:7, padding:"1px 6px", background:`${p.color}15`, border:`1px solid ${p.color}33`, borderRadius:8, color:p.color, fontWeight:700 }}>{p.tier}</span>
                    <span style={{ fontSize:7, color:"#4B5563" }}>⚡ {p.signal}</span>
                  </div>
                </div>
                <div style={{ textAlign:"right", flexShrink:0 }}>
                  <div style={{ fontSize:10, fontWeight:700, color:"#E2E8F0" }}>{p.vol}</div>
                  <div style={{ fontSize:7, color:"#4B5563" }}>production</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market signals */}
        <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:8, display:"flex", flexDirection:"column", overflow:"hidden" }}>
          <div style={{ padding:"7px 10px", borderBottom:"1px solid rgba(255,255,255,0.06)", fontSize:8, color:"#6B7280", letterSpacing:2, flexShrink:0 }}>MARKET SIGNALS</div>
          <div style={{ flex:1, overflow:"auto", padding:"6px 0" }}>
            {signals.map((s,i) => (
              <div key={i} style={{ padding:"8px 10px", borderBottom:"1px solid rgba(255,255,255,0.03)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                  <span style={{ fontSize:7, padding:"1px 6px", background: s.impact==="HIGH"?"rgba(255,59,92,0.15)":"rgba(245,158,11,0.15)", color: s.impact==="HIGH"?"#FF3B5C":"#F59E0B", borderRadius:3, fontWeight:700 }}>{s.impact}</span>
                  <span style={{ fontSize:7, color:color, fontWeight:700 }}>{s.delta}</span>
                </div>
                <div style={{ fontSize:8, color:"#E2E8F0", fontWeight:600, marginBottom:2 }}>{s.co}</div>
                <div style={{ fontSize:7, color:"#6B7280", lineHeight:1.4, marginBottom:4 }}>{s.event}</div>
                <div style={{ fontSize:7, color:"#4B5563" }}>{s.los} LOs affected</div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity + quota */}
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:8, flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
            <div style={{ padding:"7px 10px", borderBottom:"1px solid rgba(255,255,255,0.06)", fontSize:8, color:"#6B7280", letterSpacing:2, flexShrink:0 }}>RECRUITER ACTIVITY</div>
            <div style={{ flex:1, overflow:"auto", padding:"4px 0" }}>
              {activity.map((a,i) => (
                <div key={i} style={{ padding:"6px 10px", borderBottom:"1px solid rgba(255,255,255,0.03)" }}>
                  <div style={{ display:"flex", gap:6, alignItems:"flex-start" }}>
                    <span style={{ fontSize:9, flexShrink:0 }}>{actIcon[a.type]||"•"}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:7, color:"#6B7280", marginBottom:1 }}>{a.time} · <span style={{ color:color }}>{a.who}</span></div>
                      <div style={{ fontSize:8, color:"#9CA3AF", lineHeight:1.4 }}>{a.action}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Volume goal */}
          <div style={{ background:`${color}08`, border:`1px solid ${color}22`, borderRadius:8, padding:"10px 12px", flexShrink:0 }}>
            <div style={{ fontSize:7, color:"#4B5563", letterSpacing:2, marginBottom:6 }}>PRODUCTION ADDED MTD</div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <span style={{ fontSize:14, fontWeight:800, color:"#E2E8F0", fontFamily:"Georgia,serif" }}>${quota.vol_added}M</span>
              <span style={{ fontSize:9, color:"#4B5563" }}>/ ${quota.vol_goal}M goal</span>
            </div>
            <div style={{ height:5, background:"rgba(255,255,255,0.05)", borderRadius:3, overflow:"hidden" }}>
              <div style={{ width:`${(quota.vol_added/quota.vol_goal)*100}%`, height:"100%", background:`linear-gradient(90deg,${color},#7C3AED)`, borderRadius:3 }} />
            </div>
            <div style={{ fontSize:7, color:color, marginTop:4, textAlign:"right" }}>{Math.round((quota.vol_added/quota.vol_goal)*100)}% of goal</div>
          </div>
        </div>

      </div>
    </div>
  )
}

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
  const { tools, messages } = data
  const activeTools = tools.filter(t => t.status === "ACTIVE")
  const idleTools   = tools.filter(t => t.status === "IDLE")
  return (
    <div style={{ height:"100%", display:"flex", fontFamily:"'JetBrains Mono',monospace", background:"#060C14", overflow:"hidden" }}>

      {/* ── Tools sidebar ─────────────────────────────────── */}
      <div style={{ width:220, borderRight:`1px solid ${color}18`, display:"flex", flexDirection:"column", flexShrink:0, overflow:"hidden" }}>
        {/* Header */}
        <div style={{ background:"#080E1A", borderBottom:`1px solid ${color}22`, height:38, display:"flex", alignItems:"center", padding:"0 12px", gap:8, flexShrink:0 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:"#10B981", boxShadow:"0 0 6px #10B981" }} />
          <span style={{ color, fontWeight:700, fontSize:10, letterSpacing:2 }}>AGENT AI</span>
          <span style={{ marginLeft:"auto", fontSize:8, color:"#10B981" }}>9 TOOLS</span>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:"8px 0" }}>
          {/* Active tools */}
          <div style={{ padding:"0 10px 4px", fontSize:7, color:color, letterSpacing:2, fontWeight:700 }}>ACTIVE · {activeTools.length}</div>
          {activeTools.map((t,i) => (
            <div key={i} style={{ margin:"0 8px 4px", padding:"7px 9px", background:`${t.color}08`, border:`1px solid ${t.color}25`, borderRadius:6, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", left:0, top:0, bottom:0, width:2, background:t.color, borderRadius:"2px 0 0 2px" }} />
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                <span style={{ fontSize:10 }}>{t.icon}</span>
                <span style={{ fontSize:8, color:t.color, fontWeight:700, flex:1 }}>{t.name}</span>
                <span style={{ fontSize:7, color:"#10B981", padding:"1px 5px", background:"rgba(16,185,129,0.12)", borderRadius:8 }}>LIVE</span>
              </div>
              <div style={{ fontSize:7, color:"#6B7280", lineHeight:1.4, marginBottom:4 }}>{t.desc}</div>
              <div style={{ padding:"4px 6px", background:"rgba(255,255,255,0.03)", borderRadius:4 }}>
                <div style={{ fontSize:6, color:"#374151", letterSpacing:1, marginBottom:1 }}>LAST RESULT</div>
                <div style={{ fontSize:7, color:"#9CA3AF", lineHeight:1.4 }}>{t.lastResult}</div>
              </div>
              <div style={{ fontSize:6, color:"#374151", marginTop:3 }}>Called {t.lastCall}</div>
            </div>
          ))}

          {/* Idle tools */}
          <div style={{ padding:"6px 10px 4px", fontSize:7, color:"#4B5563", letterSpacing:2, fontWeight:700, marginTop:2 }}>STANDBY · {idleTools.length}</div>
          {idleTools.map((t,i) => (
            <div key={i} style={{ margin:"0 8px 3px", padding:"6px 9px", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)", borderRadius:6 }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}>
                <span style={{ fontSize:10, opacity:0.5 }}>{t.icon}</span>
                <span style={{ fontSize:8, color:"#4B5563", fontWeight:600, flex:1 }}>{t.name}</span>
                <span style={{ fontSize:7, color:"#374151", padding:"1px 5px", background:"rgba(255,255,255,0.04)", borderRadius:8 }}>IDLE</span>
              </div>
              <div style={{ fontSize:7, color:"#374151", lineHeight:1.4 }}>{t.desc}</div>
            </div>
          ))}
        </div>

        {/* Status footer */}
        <div style={{ padding:"8px 10px", borderTop:`1px solid ${color}15`, background:"#080E1A", flexShrink:0 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
            <span style={{ fontSize:7, color:"#6B7280" }}>Model</span>
            <span style={{ fontSize:7, color:color }}>Huit Agent v2</span>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
            <span style={{ fontSize:7, color:"#6B7280" }}>Compliance</span>
            <span style={{ fontSize:7, color:"#10B981" }}>SAFE Act · Reg Z</span>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between" }}>
            <span style={{ fontSize:7, color:"#6B7280" }}>Identity</span>
            <span style={{ fontSize:7, color:"#4B5563" }}>NMLS #203980</span>
          </div>
        </div>
      </div>

      {/* ── Chat ──────────────────────────────────────────── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        {/* Chat header */}
        <div style={{ background:"#080E1A", borderBottom:`1px solid ${color}22`, padding:"0 14px", height:38, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#10B981", boxShadow:"0 0 5px #10B981" }} />
            <span style={{ fontSize:11, color, fontWeight:700 }}>Huit Agent AI</span>
            <span style={{ fontSize:8, color:"#374151" }}>· 9 tools connected</span>
          </div>
          <div style={{ display:"flex", gap:12 }}>
            {["Chat","Tools","History","Settings"].map((t,i) => (
              <span key={t} style={{ fontSize:8, color: i===0?color:"#4B5563", borderBottom: i===0?`1px solid ${color}`:"none", paddingBottom:2 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex:1, overflowY:"auto", padding:"10px 14px", display:"flex", flexDirection:"column", gap:6 }}>
          {messages.map((m,i) => {
            // Divider
            if (m.role === "divider") return (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, margin:"8px 0" }}>
                <div style={{ flex:1, height:1, background:`${color}25` }} />
                <span style={{ fontSize:8, color, letterSpacing:1.5, fontWeight:700 }}>{m.text}</span>
                <div style={{ flex:1, height:1, background:`${color}25` }} />
              </div>
            )
            // Tool call bubble
            if (m.role === "toolcall") return (
              <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"6px 10px", background:`${m.color}08`, border:`1px dashed ${m.color}30`, borderRadius:6, margin:"0 0 0 0" }}>
                <div style={{ width:16, height:16, borderRadius:3, background:`${m.color}18`, border:`1px solid ${m.color}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, flexShrink:0, marginTop:1 }}>⚙</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:3 }}>
                    <span style={{ fontSize:8, color:m.color, fontWeight:700 }}>{m.tool}</span>
                    <span style={{ fontSize:7, color:"#374151" }}>function call</span>
                    <span style={{ fontSize:7, color:"#374151", marginLeft:"auto" }}>{m.time}</span>
                  </div>
                  <div style={{ fontSize:7, color:"#4B5563", marginBottom:3 }}>
                    <span style={{ color:"#374151" }}>input: </span>{m.input}
                  </div>
                  <div style={{ fontSize:7, color:"#6B7280", padding:"3px 6px", background:"rgba(255,255,255,0.03)", borderRadius:3, borderLeft:`2px solid ${m.color}` }}>
                    <span style={{ color:`${m.color}CC` }}>→ </span>{m.result}
                  </div>
                </div>
              </div>
            )
            // Regular user / lo / ai messages
            const isRight  = m.role === "user" || m.role === "lo"
            const bgColor  = isRight ? "rgba(255,255,255,0.05)" : m.highlight ? `${color}22` : m.isEmail ? "rgba(16,185,129,0.08)" : `${color}10`
            const bdrColor = isRight ? "rgba(255,255,255,0.08)" : m.highlight ? color : m.isEmail ? "rgba(16,185,129,0.35)" : `${color}28`
            const label    = m.role === "lo" ? "Loan Officer" : m.role === "user" ? "Diana Lane" : "Huit Agent AI"
            return (
              <div key={i} style={{ display:"flex", flexDirection:"column", alignItems: isRight ? "flex-end" : "flex-start" }}>
                {m.isEmail && <div style={{ fontSize:7, color:"#10B981", letterSpacing:1.5, marginBottom:2, fontWeight:700 }}>✉ EMAIL DRAFT — READY TO SEND</div>}
                {m.highlight && <div style={{ fontSize:7, color, letterSpacing:1.5, marginBottom:2, fontWeight:700 }}>🔥 TOP PRIORITY CALL</div>}
                <div style={{ fontSize:7, color:"#374151", marginBottom:2 }}>{label}</div>
                <div style={{ maxWidth:"82%", background:bgColor, border:`1px solid ${bdrColor}`, borderRadius:6, padding:"7px 10px", fontSize:9, color:"#E2E8F0", lineHeight:1.6, whiteSpace:"pre-wrap", boxShadow: m.highlight?`0 0 12px ${color}33`:m.isEmail?"0 0 10px rgba(16,185,129,0.15)":"none" }}>{m.text}</div>
                <div style={{ fontSize:7, color:"#374151", marginTop:2 }}>{m.time}</div>
              </div>
            )
          })}
        </div>

        {/* Input bar */}
        <div style={{ borderTop:`1px solid ${color}18`, padding:"8px 14px", flexShrink:0 }}>
          <div style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${color}20`, borderRadius:6, padding:"7px 12px", fontSize:9, color:"#374151", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span>Ask Huit Agent AI — "pull my pipeline", "who's hot today", "draft an email for..."</span>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <span style={{ fontSize:7, color:"#374151" }}>9 tools ready</span>
              <div style={{ width:20, height:20, borderRadius:4, background:`${color}18`, border:`1px solid ${color}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, color }}>↑</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Screen_CommandCenter({ data, color }) {
  const { stats, loanMix, rateWatch, leads, activity } = data
  const statusC = { HOT:"#FF3B5C", WARM:"#F59E0B", NURTURE:"#00D4FF" }
  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", fontFamily:"'JetBrains Mono',monospace", background:"#060C14", overflow:"hidden" }}>
      {/* Header */}
      <div style={{ background:"#080E1A", borderBottom:`1px solid ${color}22`, padding:"0 14px", height:36, display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
        <span style={{ fontSize:9, color, letterSpacing:3, fontWeight:700 }}>COMMAND CENTER</span>
        <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
          {["Pipeline","Leads","Outreach","Rate Watch"].map(t => <span key={t} style={{ fontSize:8, color:"#4B5563", padding:"2px 8px", border:"1px solid rgba(255,255,255,0.06)", borderRadius:3 }}>{t}</span>)}
        </div>
      </div>
      {/* KPIs */}
      <div style={{ display:"flex", gap:8, padding:"10px 12px 8px", flexShrink:0 }}>
        {stats.map((s,i) => (
          <div key={i} style={{ flex:1, background:"rgba(255,255,255,0.03)", border:`1px solid ${s.color}22`, borderRadius:8, padding:"10px 12px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${s.color},transparent)` }} />
            <div style={{ fontSize:8, color:"#6B7280", letterSpacing:2, marginBottom:4 }}>{s.label.toUpperCase()}</div>
            <div style={{ fontSize:20, fontWeight:800, color:"#E2E8F0", fontFamily:"Georgia,serif" }}>{s.value}</div>
            <div style={{ fontSize:8, color:s.color, marginTop:2 }}>{s.sub}</div>
          </div>
        ))}
      </div>
      {/* Main grid */}
      <div style={{ flex:1, display:"grid", gridTemplateColumns:"1fr 1fr 180px", gap:8, padding:"0 12px 12px", overflow:"hidden", minHeight:0 }}>
        {/* Leads */}
        <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:8, overflow:"hidden", display:"flex", flexDirection:"column" }}>
          <div style={{ padding:"8px 12px", borderBottom:"1px solid rgba(255,255,255,0.06)", fontSize:8, color:"#6B7280", letterSpacing:2 }}>HOT LEADS</div>
          <div style={{ overflow:"auto", flex:1 }}>
            {leads.map((l,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 12px", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ width:26, height:26, borderRadius:"50%", background:`${statusC[l.status] || "#6B7280"}22`, border:`1px solid ${statusC[l.status] || "#6B7280"}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, color:statusC[l.status], fontWeight:800, flexShrink:0 }}>{l.score}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:10, color:"#E2E8F0", fontWeight:600 }}>{l.name}</div>
                  <div style={{ fontSize:8, color:"#6B7280" }}>{l.type} · {l.lastContact}</div>
                </div>
                <span style={{ fontSize:7, padding:"2px 6px", borderRadius:10, background:`${statusC[l.status] || "#6B7280"}18`, color:statusC[l.status] || "#6B7280", fontWeight:700 }}>{l.status}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Rate watch + loan mix */}
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:8, padding:"10px 12px", flex:1 }}>
            <div style={{ fontSize:8, color:"#6B7280", letterSpacing:2, marginBottom:8 }}>RATE WATCH — 30YR CONV</div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:4, height:60 }}>
              {rateWatch.map((r,i) => {
                const h = ((r.rate - 6.55) / 0.25) * 60
                return (
                  <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                    <div style={{ width:"100%", height:Math.max(h,4), background: i===rateWatch.length-1 ? color : `${color}44`, borderRadius:"2px 2px 0 0" }} />
                    <div style={{ fontSize:7, color: i===rateWatch.length-1 ? color : "#4B5563" }}>{r.day==="Today"?"Now":r.day}</div>
                  </div>
                )
              })}
            </div>
            <div style={{ marginTop:6, fontSize:10, color, fontWeight:800, textAlign:"right" }}>6.58% <span style={{ fontSize:8, color:"#10B981" }}>↓ −0.16%</span></div>
          </div>
          <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:8, padding:"10px 12px", flex:1 }}>
            <div style={{ fontSize:8, color:"#6B7280", letterSpacing:2, marginBottom:8 }}>LOAN MIX</div>
            {loanMix.map((l,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
                <div style={{ fontSize:8, color:"#6B7280", width:55 }}>{l.name}</div>
                <div style={{ flex:1, height:6, background:"rgba(255,255,255,0.05)", borderRadius:3, overflow:"hidden" }}>
                  <div style={{ width:`${l.value}%`, height:"100%", background:l.color, borderRadius:3 }} />
                </div>
                <div style={{ fontSize:8, color:l.color, width:24, textAlign:"right" }}>{l.value}%</div>
              </div>
            ))}
          </div>
        </div>
        {/* Activity feed */}
        <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:8, overflow:"hidden", display:"flex", flexDirection:"column" }}>
          <div style={{ padding:"8px 10px", borderBottom:"1px solid rgba(255,255,255,0.06)", fontSize:8, color:"#6B7280", letterSpacing:2 }}>LIVE FEED</div>
          <div style={{ overflow:"auto", flex:1, padding:"6px 0" }}>
            {activity.map((a,i) => (
              <div key={i} style={{ padding:"5px 10px", borderBottom:"1px solid rgba(255,255,255,0.03)" }}>
                <div style={{ display:"flex", gap:5, alignItems:"flex-start" }}>
                  <span style={{ fontSize:9 }}>{a.icon}</span>
                  <span style={{ fontSize:8, color: a.type==="hot"?"#FF3B5C":a.type==="success"?"#10B981":a.type==="alert"?color:"#6B7280", lineHeight:1.5 }}>{a.msg}</span>
                </div>
                <div style={{ fontSize:7, color:"#374151", marginTop:2, paddingLeft:14 }}>{a.time} ago</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Screen_CampaignManager({ data, color }) {
  const { campaigns, leads } = data
  const chColor = { facebook:"#1877F2", google:"#EA4335", linkedin:"#0A66C2", rcs:"#14B8A6" }
  const stColor = { LIVE:"#10B981", PAUSED:"#F59E0B", SCHEDULED:"#3B82F6" }
  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", fontFamily:"'JetBrains Mono',monospace", background:"#060C14", overflow:"hidden" }}>
      <div style={{ background:"#080E1A", borderBottom:`1px solid ${color}22`, padding:"0 14px", height:36, display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
        <span style={{ fontSize:9, color, letterSpacing:3, fontWeight:700 }}>CAMPAIGN MANAGER</span>
        <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
          {["All Channels","Facebook","Google","LinkedIn","RCS"].map(t => <span key={t} style={{ fontSize:8, color: t==="All Channels"?color:"#4B5563", padding:"2px 8px", border:`1px solid ${t==="All Channels"?color:"rgba(255,255,255,0.06)"}`, borderRadius:3 }}>{t}</span>)}
        </div>
      </div>
      {/* Campaign table */}
      <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column", padding:"10px 12px 0" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 70px 70px 60px 60px 60px 55px", gap:4, padding:"0 8px 6px", fontSize:7, color:"#4B5563", letterSpacing:1 }}>
          <span>CAMPAIGN</span><span>CHANNEL</span><span>STATUS</span><span>SPEND</span><span>LEADS</span><span>CPL</span><span>CONV</span>
        </div>
        <div style={{ flex:1, overflow:"auto" }}>
          {campaigns.map((c,i) => (
            <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 70px 70px 60px 60px 60px 55px", gap:4, padding:"7px 8px", borderBottom:"1px solid rgba(255,255,255,0.04)", alignItems:"center" }}>
              <span style={{ fontSize:9, color:"#E2E8F0", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.name}</span>
              <span style={{ fontSize:8, color:chColor[c.ch]||"#6B7280", padding:"1px 5px", background:`${chColor[c.ch]||"#6B7280"}15`, borderRadius:3, textAlign:"center" }}>{c.ch.toUpperCase()}</span>
              <span style={{ fontSize:8, color:stColor[c.status]||"#6B7280", padding:"1px 5px", background:`${stColor[c.status]||"#6B7280"}15`, borderRadius:3, textAlign:"center" }}>{c.status}</span>
              <span style={{ fontSize:9, color:"#9CA3AF" }}>{c.spend?"$"+c.spend.toLocaleString():"—"}</span>
              <span style={{ fontSize:9, color:c.leads>20?"#10B981":c.leads>0?"#E2E8F0":"#4B5563", fontWeight:c.leads>20?700:400 }}>{c.leads||"—"}</span>
              <span style={{ fontSize:9, color: c.cpl>0&&c.cpl<60?"#10B981":c.cpl>0?"#F59E0B":"#4B5563" }}>{c.cpl?"$"+c.cpl.toFixed(2):"—"}</span>
              <span style={{ fontSize:9, color:"#7C3AED", fontWeight:700 }}>{c.conv||"—"}</span>
            </div>
          ))}
        </div>
        {/* RCS callout */}
        <div style={{ margin:"8px 0", padding:"8px 12px", background:`${color}0A`, border:`1px solid ${color}33`, borderRadius:6, flexShrink:0 }}>
          <div style={{ fontSize:8, color, letterSpacing:2, marginBottom:4 }}>RCS PERFORMANCE — LO RECRUITING BLAST</div>
          <div style={{ display:"flex", gap:16 }}>
            {[{l:"Sent",v:"240"},{l:"Delivered",v:"231"},{l:"Read",v:"178"},{l:"Replied",v:"47"},{l:"Reply Rate",v:"19.6%"}].map((s,i) => (
              <div key={i}>
                <div style={{ fontSize:14, fontWeight:800, color: i===4?color:"#E2E8F0", fontFamily:"Georgia,serif" }}>{s.v}</div>
                <div style={{ fontSize:7, color:"#6B7280" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Lead feed */}
        <div style={{ flexShrink:0, paddingBottom:10 }}>
          <div style={{ fontSize:8, color:"#4B5563", letterSpacing:2, marginBottom:6 }}>TODAY'S LEADS</div>
          <div style={{ display:"flex", gap:6, overflow:"auto" }}>
            {leads.map((l,i) => (
              <div key={i} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:6, padding:"7px 10px", minWidth:130, flexShrink:0 }}>
                <div style={{ fontSize:9, color:"#E2E8F0", fontWeight:600, marginBottom:2 }}>{l.name}</div>
                <div style={{ fontSize:8, color:"#6B7280", marginBottom:4 }}>{l.loan}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:11, fontWeight:800, color:l.score>=90?"#FF3B5C":l.score>=80?"#F59E0B":"#00D4FF" }}>{l.score}</span>
                  <span style={{ fontSize:7, color:chColor[l.source]||"#6B7280", padding:"1px 5px", background:`${chColor[l.source]||"#6B7280"}15`, borderRadius:3 }}>{l.source.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Screen_APEX_Dashboard({ data, color }) {
  const { stats, rows, marketSignals } = data
  const tierC = { IMMINENT:"#FF3B5C", MOBILE:"#F59E0B", RECEPTIVE:"#00D4FF" }
  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", fontFamily:"'JetBrains Mono',monospace", background:"#060C14", overflow:"hidden" }}>
      <div style={{ background:"#080E1A", borderBottom:`1px solid ${color}22`, padding:"0 14px", height:36, display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
        <span style={{ fontSize:9, color, letterSpacing:3, fontWeight:700 }}>APEX — NATIONAL DASHBOARD</span>
        <span style={{ fontSize:8, padding:"2px 8px", background:`${color}15`, border:`1px solid ${color}44`, borderRadius:10, color }}>PATENT PENDING · TLS ENGINE</span>
        <div style={{ marginLeft:"auto", fontSize:8, color:"#10B981" }}>● LIVE · 247 TRACKED</div>
      </div>
      {/* Stats */}
      <div style={{ display:"flex", gap:8, padding:"10px 12px 8px", flexShrink:0 }}>
        {stats.map((s,i) => (
          <div key={i} style={{ flex:1, background:"rgba(255,255,255,0.03)", border:`1px solid ${s.color}22`, borderRadius:8, padding:"10px 12px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${s.color},transparent)` }} />
            <div style={{ fontSize:8, color:"#6B7280", letterSpacing:2, marginBottom:4 }}>{s.label.toUpperCase()}</div>
            <div style={{ fontSize:20, fontWeight:800, color:"#E2E8F0", fontFamily:"Georgia,serif" }}>{s.value}</div>
            <div style={{ fontSize:8, color:s.color, marginTop:2 }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ flex:1, display:"grid", gridTemplateColumns:"1fr 220px", gap:8, padding:"0 12px 12px", overflow:"hidden", minHeight:0 }}>
        {/* Leaderboard */}
        <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:8, overflow:"hidden", display:"flex", flexDirection:"column" }}>
          <div style={{ padding:"8px 12px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"grid", gridTemplateColumns:"24px 1fr 110px 80px 55px 80px", gap:8, fontSize:7, color:"#4B5563", letterSpacing:1 }}>
            <span>#</span><span>LOAN OFFICER</span><span>COMPANY</span><span>MARKET</span><span>VOL</span><span>TLS · TIER</span>
          </div>
          <div style={{ flex:1, overflow:"auto" }}>
            {rows.map((r,i) => (
              <div key={i} style={{ display:"grid", gridTemplateColumns:"24px 1fr 110px 80px 55px 80px", gap:8, padding:"8px 12px", borderBottom:"1px solid rgba(255,255,255,0.04)", alignItems:"center", background: r.active?`${color}08`:"transparent" }}>
                <span style={{ fontSize:9, color:"#4B5563" }}>{i+1}</span>
                <span style={{ fontSize:10, color: r.active?color:"#E2E8F0", fontWeight: r.active?700:400 }}>{r.name}</span>
                <span style={{ fontSize:8, color:"#6B7280", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.co}</span>
                <span style={{ fontSize:8, color:"#6B7280" }}>{r.mkt.split(",")[0]}</span>
                <span style={{ fontSize:9, color:"#E2E8F0" }}>{r.vol}</span>
                <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", background:`${r.tls_c}18`, border:`2px solid ${r.tls_c}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800, color:r.tls_c }}>{r.score}</div>
                  <span style={{ fontSize:7, color:tierC[r.tier]||"#6B7280", padding:"1px 4px", background:`${tierC[r.tier]||"#6B7280"}15`, borderRadius:3 }}>{r.tier}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Market signals */}
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          <div style={{ background:"rgba(255,255,255,0.02)", border:`1px solid ${color}22`, borderRadius:8, padding:"10px 12px", flex:1, overflow:"auto" }}>
            <div style={{ fontSize:8, color, letterSpacing:2, marginBottom:10 }}>MARKET SIGNALS</div>
            {marketSignals.map((s,i) => (
              <div key={i} style={{ padding:"8px 10px", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)", borderRadius:6, marginBottom:7 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
                  <span style={{ fontSize:7, padding:"1px 6px", background: s.impact==="HIGH"?"rgba(255,59,92,0.15)":"rgba(245,158,11,0.15)", color: s.impact==="HIGH"?"#FF3B5C":"#F59E0B", borderRadius:3, fontWeight:700 }}>{s.impact}</span>
                  <span style={{ fontSize:7, color:"#6B7280" }}>{s.affected} LOs affected</span>
                </div>
                <div style={{ fontSize:8, color:"#9CA3AF", lineHeight:1.5 }}>{s.signal}</div>
              </div>
            ))}
          </div>
          <div style={{ background:`${color}0A`, border:`1px solid ${color}33`, borderRadius:8, padding:"10px 12px", flexShrink:0 }}>
            <div style={{ fontSize:8, color, letterSpacing:2, marginBottom:6 }}>SCF REGISTRY</div>
            {[{src:"NMLS Public Data",conf:98},{src:"LinkedIn Signal",conf:84},{src:"State Licensing",conf:100},{src:"Production API",conf:91}].map((s,i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ fontSize:8, color:"#6B7280" }}>{s.src}</span>
                <span style={{ fontSize:8, color: s.conf>=95?"#10B981":"#F59E0B", fontWeight:700 }}>{s.conf}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Screen_WrapUp({ data, color, elapsed = 0 }) {
  const { modules, before, after, cta } = data

  // Spotlight schedule keyed to Bill's script timing (~130 wpm, 239 words total):
  // ~80s  "The recruiter closes more hires"
  // ~83s  "The manager grows a stronger book"
  // ~91s  "The producing loan officer..."
  // ~110s "Go to huit dot AI slash join right now"
  const spotlight = elapsed >= 110 ? "cta"
    : elapsed >= 91 ? "lo"
    : elapsed >= 83 ? "manager"
    : elapsed >= 80 ? "recruiter"
    : null

  const roles = [
    { id: "recruiter",  role: "Recruiter",      icon: "🎯", accentColor: "#00D4FF", wins: ["APEX identifies targets before they post", "TLS score backs every conversation", "Market signals show who's unhappy now", "19.6% RCS reply on cold outreach"] },
    { id: "manager",    role: "Branch Manager",  icon: "📊", accentColor: "#F59E0B", wins: ["Retention risk alerts prevent attrition", "Pipeline visible in real time", "Rate drops trigger automatic outreach", "Team performance in one view"] },
    { id: "lo",         role: "Producing LO",    icon: "⚡", accentColor: "#10B981", wins: ["AI ranks who to call each morning", "Equity engine surfaces dormant leads", "Agent AI drafts emails in 2 seconds", "Campaign manager runs 24/7"] },
  ]

  const spotlightRole = roles.find(r => r.id === spotlight)
  const showSpotlight = spotlight !== null

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", fontFamily:"'JetBrains Mono',monospace", background:"#060C14", overflow:"hidden", position:"relative" }}>

      {/* Header */}
      <div style={{ background:"#080E1A", borderBottom:`1px solid ${color}22`, padding:"0 14px", height:36, display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:color, boxShadow:`0 0 8px ${color}` }} />
          <span style={{ fontSize:9, color, letterSpacing:3, fontWeight:700 }}>HUIT.AI — PLATFORM OVERVIEW</span>
        </div>
        <div style={{ marginLeft:"auto", fontSize:8, color:"#10B981" }}>9 MODULES · FULLY INTEGRATED</div>
      </div>

      {/* Main 3-col layout */}
      <div style={{ flex:1, display:"grid", gridTemplateColumns:"1fr 1fr 200px", gap:8, padding:"10px 12px 10px", overflow:"hidden", minHeight:0 }}>

        {/* Left — Module recap */}
        <div style={{ display:"flex", flexDirection:"column", gap:0, overflow:"auto", transition:"opacity 0.4s", opacity: showSpotlight ? 0.35 : 1 }}>
          <div style={{ fontSize:8, color:"#4B5563", letterSpacing:2, marginBottom:8, flexShrink:0 }}>WHAT YOU JUST SAW</div>
          {modules.map((m, i) => (
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"6px 10px", borderBottom:"1px solid rgba(255,255,255,0.04)", borderLeft:`2px solid ${m.color}`, marginBottom:2, background:`${m.color}05`, borderRadius:"0 4px 4px 0" }}>
              <div style={{ fontSize:8, color:m.color, fontWeight:800, width:18, flexShrink:0 }}>{m.uc}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:9, color:"#E2E8F0", fontWeight:600, marginBottom:1 }}>{m.name}</div>
                <div style={{ fontSize:7, color:"#6B7280" }}>{m.impact}</div>
              </div>
              <div style={{ fontSize:8, color:m.color, fontWeight:700, textAlign:"right", flexShrink:0, whiteSpace:"nowrap" }}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* Middle — Day in the life */}
        <div style={{ display:"flex", flexDirection:"column", gap:6, overflow:"hidden", transition:"opacity 0.4s", opacity: showSpotlight ? 0.35 : 1 }}>
          <div style={{ fontSize:8, color:"#4B5563", letterSpacing:2, marginBottom:2, flexShrink:0 }}>YOUR DAY — BEFORE vs AFTER</div>
          <div style={{ flex:1, display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, overflow:"hidden" }}>
            <div style={{ background:"rgba(255,59,92,0.04)", border:"1px solid rgba(255,59,92,0.15)", borderRadius:8, overflow:"hidden", display:"flex", flexDirection:"column" }}>
              <div style={{ padding:"6px 10px", borderBottom:"1px solid rgba(255,59,92,0.12)", fontSize:8, color:"#FF3B5C", letterSpacing:2, fontWeight:700 }}>BEFORE</div>
              <div style={{ flex:1, overflow:"auto", padding:"4px 0" }}>
                {before.map((b, i) => (
                  <div key={i} style={{ padding:"5px 10px", borderBottom:"1px solid rgba(255,255,255,0.03)" }}>
                    <div style={{ fontSize:7, color:"#6B7280", marginBottom:1 }}>{b.time}</div>
                    <div style={{ display:"flex", gap:5, alignItems:"flex-start" }}>
                      <span style={{ color:"#FF3B5C", fontSize:8, flexShrink:0 }}>✗</span>
                      <span style={{ fontSize:8, color:"#9CA3AF", lineHeight:1.4 }}>{b.task}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:"rgba(0,212,255,0.04)", border:`1px solid ${color}22`, borderRadius:8, overflow:"hidden", display:"flex", flexDirection:"column" }}>
              <div style={{ padding:"6px 10px", borderBottom:`1px solid ${color}18`, fontSize:8, color, letterSpacing:2, fontWeight:700 }}>WITH HUIT.AI</div>
              <div style={{ flex:1, overflow:"auto", padding:"4px 0" }}>
                {after.map((a, i) => (
                  <div key={i} style={{ padding:"5px 10px", borderBottom:"1px solid rgba(255,255,255,0.03)" }}>
                    <div style={{ fontSize:7, color:"#6B7280", marginBottom:1 }}>{a.time}</div>
                    <div style={{ display:"flex", gap:5, alignItems:"flex-start" }}>
                      <span style={{ color:"#10B981", fontSize:8, flexShrink:0 }}>✓</span>
                      <span style={{ fontSize:8, color:"#E2E8F0", lineHeight:1.4 }}>{a.task}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — Role cards (always rendered, dimmed during spotlight) */}
        <div style={{ display:"flex", flexDirection:"column", gap:8, transition:"opacity 0.4s", opacity: showSpotlight ? 0.2 : 1 }}>
          {roles.map((r, i) => (
            <div key={i} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:8, padding:"8px 10px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
                <span style={{ fontSize:12 }}>{r.icon}</span>
                <span style={{ fontSize:9, color:"#E2E8F0", fontWeight:700, letterSpacing:1 }}>{r.role.toUpperCase()}</span>
              </div>
              {r.wins.map((w, j) => (
                <div key={j} style={{ display:"flex", gap:5, marginBottom:3 }}>
                  <span style={{ color, fontSize:7, flexShrink:0, marginTop:1 }}>▸</span>
                  <span style={{ fontSize:7, color:"#9CA3AF", lineHeight:1.4 }}>{w}</span>
                </div>
              ))}
            </div>
          ))}
          <div style={{ background:`linear-gradient(135deg, ${color}15, #7C3AED15)`, border:`1px solid ${color}44`, borderRadius:8, padding:"10px 12px", flexShrink:0, textAlign:"center" }}>
            <div style={{ fontSize:10, color:"#E2E8F0", fontWeight:700, marginBottom:4, lineHeight:1.4 }}>{cta.headline}</div>
            <div style={{ fontSize:7, color:"#6B7280", marginBottom:8 }}>{cta.sub}</div>
            <div style={{ fontSize:8, color, fontWeight:800, padding:"5px 0", borderTop:`1px solid ${color}22` }}>{cta.action}</div>
            <div style={{ fontSize:7, color:"#4B5563", marginTop:4 }}>{cta.tier}</div>
          </div>
        </div>
      </div>

      {/* ── SPOTLIGHT OVERLAY ── flies in from right, centers on screen */}
      {showSpotlight && (
        <div key={spotlight} style={{
          position:"absolute", inset:0,
          display:"flex", alignItems:"center", justifyContent:"center",
          pointerEvents:"none",
          animation:"spotlightFadeIn 0.35s ease-out forwards",
        }}>
          {/* Dim backdrop */}
          <div style={{ position:"absolute", inset:0, background:"rgba(6,12,20,0.72)", backdropFilter:"blur(2px)" }} />

          {/* Spotlight card */}
          <div key={`card-${spotlight}`} style={{
            position:"relative", zIndex:2,
            width: spotlight === "cta" ? 340 : 320,
            animation:"spotlightSlideIn 0.38s cubic-bezier(0.22,1,0.36,1) forwards",
          }}>
            {spotlight === "cta" ? (
              /* CTA spotlight */
              <div style={{ background:`linear-gradient(135deg, #060C14, #0A1220)`, border:`2px solid ${color}`, borderRadius:14, padding:"28px 32px", textAlign:"center", boxShadow:`0 0 60px ${color}30, 0 24px 60px rgba(0,0,0,0.7)` }}>
                <div style={{ fontSize:8, color, letterSpacing:3, marginBottom:14 }}>FOUNDING MEMBER PRICING</div>
                <div style={{ fontSize:18, color:"#E2E8F0", fontWeight:800, lineHeight:1.35, marginBottom:12 }}>{cta.headline}</div>
                <div style={{ fontSize:10, color:"#6B7280", marginBottom:20 }}>{cta.sub}</div>
                <div style={{ background:`linear-gradient(135deg, ${color}20, #7C3AED20)`, border:`1px solid ${color}55`, borderRadius:10, padding:"14px 20px", marginBottom:16 }}>
                  <div style={{ fontSize:20, color, fontWeight:900, letterSpacing:2 }}>{cta.action}</div>
                </div>
                <div style={{ display:"flex", justifyContent:"center", gap:12 }}>
                  {["STARTER $625", "SCOUT $1,250", "COMMAND $2,350", "DOMINATE $4,125"].map((t, i) => (
                    <div key={i} style={{ fontSize:7, color: i === 2 || i === 3 ? color : "#6B7280", fontWeight: i === 2 || i === 3 ? 700 : 400 }}>{t}</div>
                  ))}
                </div>
              </div>
            ) : (
              /* Role card spotlight */
              <div style={{
                background:`linear-gradient(135deg, #060C14, #0A1220)`,
                border:`2px solid ${spotlightRole.accentColor}`,
                borderRadius:14, padding:"28px 32px",
                boxShadow:`0 0 60px ${spotlightRole.accentColor}30, 0 24px 60px rgba(0,0,0,0.7)`,
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
                  <span style={{ fontSize:36 }}>{spotlightRole.icon}</span>
                  <div>
                    <div style={{ fontSize:8, color:spotlightRole.accentColor, letterSpacing:3, marginBottom:4 }}>THIS IS FOR YOU</div>
                    <div style={{ fontSize:18, color:"#E2E8F0", fontWeight:800, letterSpacing:1 }}>{spotlightRole.role.toUpperCase()}</div>
                  </div>
                </div>
                {spotlightRole.wins.map((w, j) => (
                  <div key={j} style={{ display:"flex", gap:10, marginBottom:12, alignItems:"flex-start" }}>
                    <div style={{ width:20, height:20, borderRadius:"50%", background:`${spotlightRole.accentColor}18`, border:`1px solid ${spotlightRole.accentColor}44`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                      <span style={{ color:spotlightRole.accentColor, fontSize:9, fontWeight:800 }}>✓</span>
                    </div>
                    <span style={{ fontSize:10, color:"#E2E8F0", lineHeight:1.5 }}>{w}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spotlightFadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes spotlightSlideIn { from { opacity:0; transform:translateX(80px) scale(0.94) } to { opacity:1; transform:translateX(0) scale(1) } }
      `}</style>
    </div>
  )
}

function JoinScreen({ onBack }) {
  const [tier, setTier] = useState(null)
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "" })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const tiers = [
    { id: "STARTER",  price: "$625",   period: "/mo", annual: "$531/mo billed annually", color: "#00D4FF", features: ["CRMEX Pipeline CRM", "AI Lead Scoring", "Property Pulse", "Up to 500 contacts", "Email campaigns"], tag: null },
    { id: "SCOUT",    price: "$1,250", period: "/mo", annual: "$1,063/mo billed annually", color: "#7C3AED", features: ["Everything in STARTER", "APEX Recruiting Intel", "HMDA Market Data", "Up to 2,500 contacts", "RCS + SMS outreach"], tag: null },
    { id: "COMMAND",  price: "$2,350", period: "/mo", annual: "$1,998/mo billed annually", color: "#F59E0B", features: ["Everything in SCOUT", "Retention Risk Monitor", "Huit Agent AI", "Unlimited contacts", "Multi-user (up to 5)", "Dedicated onboarding"], tag: "MOST POPULAR" },
    { id: "DOMINATE", price: "$4,125", period: "/mo", annual: "$3,506/mo billed annually", color: "#EF4444", features: ["Everything in COMMAND", "National APEX Dashboard", "Campaign Manager", "Unlimited users", "API access", "Priority support + SLA"], tag: "FULL PLATFORM" },
  ]

  const handleSubmit = async () => {
    if (!tier || !form.name || !form.email) return
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1800))
    setSubmitting(false)
    setSubmitted(true)
  }

  const selectedTier = tiers.find(t => t.id === tier)
  const isValid = tier && form.name.trim() && form.email.trim()

  if (submitted) {
    return (
      <div style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'JetBrains Mono',monospace", background:"#060C14", padding:40 }}>
        <div style={{ width:64, height:64, borderRadius:"50%", background:"rgba(16,185,129,0.12)", border:"2px solid #10B981", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, marginBottom:24 }}>✓</div>
        <div style={{ fontSize:22, color:"#E2E8F0", fontWeight:800, textAlign:"center", marginBottom:8 }}>You're in, {form.name.split(" ")[0]}.</div>
        <div style={{ fontSize:12, color:"#6B7280", textAlign:"center", marginBottom:4 }}>Founding Member · {selectedTier?.id} tier</div>
        <div style={{ fontSize:11, color:"#10B981", marginBottom:32 }}>Confirmation sent to {form.email}</div>
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"20px 28px", maxWidth:380, textAlign:"center" }}>
          <div style={{ fontSize:10, color:"#4B5563", letterSpacing:2, marginBottom:12 }}>YOUR NEXT STEPS</div>
          {["Check your email for onboarding link","Complete your profile in CRMEX","Book your 1-on-1 setup call with the Huit.AI team","Your first AI scoring run happens within 24 hours"].map((s,i) => (
            <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:10, textAlign:"left" }}>
              <div style={{ width:18, height:18, borderRadius:"50%", background:"rgba(0,212,255,0.12)", border:"1px solid rgba(0,212,255,0.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, color:"#00D4FF", flexShrink:0, marginTop:1 }}>{i+1}</div>
              <span style={{ fontSize:9, color:"#9CA3AF", lineHeight:1.6 }}>{s}</span>
            </div>
          ))}
        </div>
        <button onClick={onBack} style={{ marginTop:28, background:"transparent", border:"1px solid rgba(255,255,255,0.1)", borderRadius:6, padding:"8px 20px", color:"#4B5563", fontSize:9, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace", letterSpacing:1 }}>← BACK TO DEMO</button>
      </div>
    )
  }

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", fontFamily:"'JetBrains Mono',monospace", background:"#060C14", overflow:"hidden" }}>
      {/* Header */}
      <div style={{ background:"#080E1A", borderBottom:"1px solid rgba(0,212,255,0.2)", padding:"0 20px", height:44, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:"#00D4FF", boxShadow:"0 0 8px #00D4FF" }} />
          <span style={{ fontSize:9, color:"#00D4FF", letterSpacing:3, fontWeight:700 }}>HUIT.AI / JOIN — FOUNDING MEMBER</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <span style={{ fontSize:8, color:"#10B981" }}>● SPOTS REMAINING: <span style={{ fontWeight:800 }}>17</span></span>
          <button onClick={onBack} style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.1)", borderRadius:4, padding:"4px 12px", color:"#4B5563", fontSize:8, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace", letterSpacing:1 }}>← BACK</button>
        </div>
      </div>

      <div style={{ flex:1, overflow:"auto", padding:"20px 20px 0" }}>
        {/* Hero */}
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:9, color:"#4B5563", letterSpacing:3, marginBottom:8 }}>FOUNDING MEMBER PRICING — LIMITED AVAILABILITY</div>
          <div style={{ fontSize:22, color:"#E2E8F0", fontWeight:800, marginBottom:6 }}>Pick Your Platform. Start Today.</div>
          <div style={{ fontSize:11, color:"#6B7280" }}>No free trial. No setup fee. Cancel anytime. 15% off all tiers with annual billing.</div>
        </div>

        {/* Tier cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:24 }}>
          {tiers.map(t => (
            <div key={t.id} onClick={() => setTier(t.id)} style={{ position:"relative", background: tier===t.id ? `${t.color}0D` : "rgba(255,255,255,0.02)", border:`2px solid ${tier===t.id ? t.color : "rgba(255,255,255,0.07)"}`, borderRadius:10, padding:"14px 14px 16px", cursor:"pointer", transition:"all 0.2s", boxShadow: tier===t.id ? `0 0 20px ${t.color}20` : "none" }}>
              {t.tag && <div style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background:t.color, color:"#000", fontSize:7, fontWeight:800, padding:"2px 10px", borderRadius:10, letterSpacing:1, whiteSpace:"nowrap" }}>{t.tag}</div>}
              {tier===t.id && <div style={{ position:"absolute", top:10, right:10, width:16, height:16, borderRadius:"50%", background:t.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9 }}>✓</div>}
              <div style={{ fontSize:9, color:t.color, letterSpacing:2, fontWeight:800, marginBottom:8 }}>{t.id}</div>
              <div style={{ fontSize:24, color:"#E2E8F0", fontWeight:800, fontFamily:"Georgia,serif" }}>{t.price}<span style={{ fontSize:10, color:"#6B7280" }}>{t.period}</span></div>
              <div style={{ fontSize:8, color:"#4B5563", marginBottom:12 }}>{t.annual}</div>
              <div style={{ borderTop:`1px solid ${t.color}20`, paddingTop:10 }}>
                {t.features.map((f,i) => (
                  <div key={i} style={{ display:"flex", gap:6, marginBottom:5 }}>
                    <span style={{ color:t.color, fontSize:8, flexShrink:0 }}>▸</span>
                    <span style={{ fontSize:8, color: i===0 ? "#E2E8F0" : "#9CA3AF", lineHeight:1.4 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{ maxWidth:680, margin:"0 auto 24px", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, padding:"20px 24px" }}>
          <div style={{ fontSize:9, color:"#4B5563", letterSpacing:2, marginBottom:16 }}>YOUR INFORMATION</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
            {[
              { key:"name",    label:"Full Name *",      placeholder:"Derek Huit" },
              { key:"email",   label:"Work Email *",     placeholder:"derek@brokerage.com" },
              { key:"phone",   label:"Phone",            placeholder:"(907) 555-0100" },
              { key:"company", label:"Company / Branch", placeholder:"Anchorage Lending Group" },
            ].map(f => (
              <div key={f.key}>
                <div style={{ fontSize:8, color:"#6B7280", letterSpacing:1, marginBottom:5 }}>{f.label}</div>
                <input
                  value={form[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:`1px solid ${form[f.key] ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.08)"}`, borderRadius:6, padding:"9px 12px", color:"#E2E8F0", fontSize:10, fontFamily:"'JetBrains Mono',monospace", outline:"none", boxSizing:"border-box" }}
                />
              </div>
            ))}
          </div>
          {tier && (
            <div style={{ padding:"10px 14px", background:`${selectedTier.color}08`, border:`1px solid ${selectedTier.color}25`, borderRadius:8, marginBottom:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ fontSize:9, color:selectedTier.color, fontWeight:700 }}>{selectedTier.id} — Founding Member</div>
                <div style={{ fontSize:8, color:"#6B7280", marginTop:2 }}>{selectedTier.annual}</div>
              </div>
              <div style={{ fontSize:20, fontWeight:800, color:"#E2E8F0", fontFamily:"Georgia,serif" }}>{selectedTier.price}<span style={{ fontSize:9, color:"#6B7280" }}>/mo</span></div>
            </div>
          )}
          <button
            onClick={handleSubmit}
            disabled={!isValid || submitting}
            style={{ width:"100%", background: isValid ? `linear-gradient(135deg, #00D4FF18, #7C3AED18)` : "rgba(255,255,255,0.03)", border:`1px solid ${isValid ? "#00D4FF" : "rgba(255,255,255,0.08)"}`, borderRadius:8, padding:"13px 0", color: isValid ? "#00D4FF" : "#374151", fontSize:11, fontWeight:800, cursor: isValid ? "pointer" : "default", fontFamily:"'JetBrains Mono',monospace", letterSpacing:2, transition:"all 0.2s", boxShadow: isValid ? "0 0 20px rgba(0,212,255,0.15)" : "none" }}
          >
            {submitting ? "⟳  PROCESSING..." : !tier ? "SELECT A TIER ABOVE" : !form.name || !form.email ? "FILL IN YOUR INFO" : `▶  CLAIM ${tier} FOUNDING MEMBER SPOT`}
          </button>
          <div style={{ fontSize:8, color:"#374151", textAlign:"center", marginTop:10 }}>No credit card required to reserve · You'll receive a payment link via email</div>
        </div>
      </div>
    </div>
  )
}

const SCREEN_COMPONENTS = [
  Screen_APEX_RecruitingCmd,
  Screen_APEX_Candidates,
  Screen_APEX_Dashboard,
  Screen_Retention,
  Screen_APEX_Market,
  Screen_CommandCenter,
  Screen_LeadScoring,
  Screen_PropertyPulse,
  Screen_AgentAI,
  Screen_CampaignManager,
  Screen_WrapUp,
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
  const [showJoin, setShowJoin] = useState(false)

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
    const endpoint = sc.voiceId ? "/api/tts-male" : "/api/tts"
    const body = { text: sc.script }
    if (apiKey) body.api_key = apiKey
    const res = await fetch(endpoint, {
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
        } else {
          setTimeout(() => setShowJoin(true), 1200)
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

  // ── JOIN SCREEN ───────────────────────────────────────────
  if (showJoin) {
    return (
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#060C14", overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
        <JoinScreen onBack={() => setShowJoin(false)} />
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
        <span style={{ fontSize: 11, color: "#6B7280" }}>Live Platform Demo · 11 Scenes · 2 Tracks</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          {playing && (
            <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 2, height: 14, background: scene.color, borderRadius: 1, animation: `waveBar 0.7s ease-in-out infinite`, animationDelay: `${i * 0.12}s` }} />)}
            </div>
          )}
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: playing ? scene.color : "#374151", letterSpacing: 2 }}>
            {loading ? "GENERATING AUDIO" : playing ? (scene.voiceId ? "BILL · NARRATING" : "CASEY KIM · NARRATING") : (scene.voiceId ? "BILL · READY" : "CASEY KIM · READY")}
          </span>
        </div>
      </div>

      {/* Scene tabs */}
      <div style={{ background: "#070D18", borderBottom: "1px solid rgba(255,255,255,0.04)", height: 42, display: "flex", alignItems: "center", padding: "0 20px", gap: 4, overflowX: "auto", flexShrink: 0 }}>
        {/* Track 1 label */}
        <span style={{ fontSize: 7, color: "#00D4FF", letterSpacing: 2, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, flexShrink: 0, opacity: 0.7 }}>RECRUITING</span>
        <div style={{ width: 1, height: 16, background: "rgba(0,212,255,0.2)", margin: "0 2px", flexShrink: 0 }} />
        {SCENES.map((s, i) => {
          const isTrackBreak = i === 5 // before scene 06 — LO track starts
          return (
            <React.Fragment key={s.id}>
              {isTrackBreak && (
                <>
                  <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)", margin: "0 6px", flexShrink: 0 }} />
                  <span style={{ fontSize: 7, color: "#F59E0B", letterSpacing: 2, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, flexShrink: 0, opacity: 0.7 }}>LOAN OFFICER</span>
                  <div style={{ width: 1, height: 16, background: "rgba(245,158,11,0.2)", margin: "0 2px", flexShrink: 0 }} />
                </>
              )}
              <button onClick={() => goScene(i)} style={{ background: i === sceneIdx ? `${s.color}14` : "transparent", border: `1px solid ${i === sceneIdx ? s.color : "rgba(255,255,255,0.06)"}`, borderRadius: 4, padding: "4px 12px", cursor: "pointer", whiteSpace: "nowrap", color: i === sceneIdx ? s.color : "#4B5563", fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5, display: "flex", alignItems: "center", gap: 7, transition: "all 0.2s", flexShrink: 0 }}>
                <span style={{ fontSize: 8, opacity: 0.5 }}>{s.num}</span>
                <span>{s.title}</span>
                {audioCache.current[s.id] && <span style={{ color: "#10B981", fontSize: 7 }}>✓</span>}
              </button>
            </React.Fragment>
          )
        })}
        <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.08)", margin: "0 6px", flexShrink: 0 }} />
        <button onClick={() => setShowJoin(true)} style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.12), rgba(124,58,237,0.12))", border: "1px solid rgba(0,212,255,0.4)", borderRadius: 4, padding: "4px 14px", cursor: "pointer", whiteSpace: "nowrap", color: "#00D4FF", fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, display: "flex", alignItems: "center", gap: 6, fontWeight: 700, flexShrink: 0 }}>
          <span style={{ fontSize: 8 }}>★</span>
          <span>JOIN</span>
          <span style={{ fontSize: 8 }}>→</span>
        </button>
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
            <ScreenComp data={scene.screenData} color={scene.color} elapsed={elapsed} />
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
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: scene.color, letterSpacing: 2 }}>{scene.voiceId ? "BILL · NARRATING" : "CASEY KIM · NARRATING"}</span>
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
