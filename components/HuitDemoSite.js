"use client"
import React, { useState, useEffect, useRef, useCallback } from "react"

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const ELEVENLABS_API_KEY = "" // Injected at runtime — set via env or user input
const VOICE_ID = "pqHfZKP75CvOlQylNhV4" // Bill — Wise, Mature, American

const T = {
  bg:"#060810", surface:"#0C0E18", surfaceHi:"#121520",
  border:"rgba(255,255,255,0.07)", borderHi:"rgba(255,255,255,0.12)",
  gold:"#E8B84B", goldDim:"rgba(232,184,75,0.15)", goldGlow:"rgba(232,184,75,0.08)",
  cyan:"#22D3EE", green:"#10B981", purple:"#8B5CF6",
  rose:"#FB7185", amber:"#FBBF24", orange:"#F97316", blue:"#60A5FA",
  muted:"#4B5572", dim:"#0F1020",
  text:"#E8EEFF", textSub:"#7A8BAA",
}

// ─── SCRIPT SCENES ────────────────────────────────────────────────────────────
const SCENES = [
  {
    id:1, label:"Cold Open", duration:"0:18", color:T.gold,
    vo:`Every loan officer in America is paying eighteen dollars and seventy-five cents per thousand impressions to reach borrowers who might not even be ready. There is a better way.`,
  },
  {
    id:2, label:"The Problem", duration:"0:27", color:T.rose,
    vo:`The mortgage industry still runs on cold calls, manual outreach, and paid ads that cost a fortune and convert at two percent. Meanwhile, your borrowers are asking AI chatbots for mortgage advice at two in the morning — and nobody from your team is in that conversation. Loan officers who ignore this shift will lose. The ones who adapt will dominate.`,
  },
  {
    id:3, label:"Introducing Huit.AI", duration:"0:25", color:T.gold,
    vo:`Huit AI is the world's first mortgage intelligence platform built entirely on autonomous AI agents. Nine tools. One platform. Built for Alaska — and every market like it. I'm Derek Huit. Eighteen years in mortgage. Over a billion dollars in production. And I built this because I got tired of watching loan officers fight with tools designed for someone else's business. This is what I built for mine — and now I'm opening it to you.`,
  },
  {
    id:4, label:"Agentic Distribution", duration:"0:35", color:T.cyan,
    vo:`Tool one. The Agentic Distribution Engine. You type one idea. One sentence. And Claude generates optimized posts for LinkedIn, Twitter, Instagram, Facebook, Reddit, and email — simultaneously. The cost? Thirty-six cents per thousand impressions. That's not a typo. Thirty-six cents. The traditional ad manager charges you fifty times that just to show people a banner they're going to scroll past. Organic reach. AI-native. Zero ad spend.`,
  },
  {
    id:5, label:"Voice Agent — Halo", duration:"0:35", color:T.green,
    vo:`Tool two. Halo — your AI voice agent. When a lead comes in at eleven PM on a Friday, you're not calling them back. But Halo is. Halo answers in under five seconds. Halo qualifies the lead through natural conversation. Halo scores them zero to one hundred. And Halo texts you the moment a qualified borrower is ready to talk. Human ISA cost? Forty-eight dollars per qualified lead. Halo? Eighty-four cents. And Halo never has a bad day.`,
  },
  {
    id:6, label:"AEO Engine", duration:"0:30", color:T.blue,
    vo:`Tool three. The Answer Engine Optimization Engine. When someone asks ChatGPT who is the best mortgage lender in Anchorage, you want to be the answer they get. That doesn't happen by accident. It happens because your content is structured for AI citation — not just Google search. The AEO Engine analyzes your content, scores it for AI visibility, and rewrites it to maximize citation probability across ChatGPT, Perplexity, Google Gemini, and Bing Copilot.`,
  },
  {
    id:7, label:"Lead Qualifier", duration:"0:30", color:T.purple,
    vo:`Tool four. The Agentic Lead Qualifier. Every new lead in your pipeline gets contacted by AI within five seconds. Every one. At two in the afternoon or two in the morning. The AI asks your qualification questions, extracts credit score range, loan type, timeline, and loan amount — and routes them automatically. Hot lead? You get a text alert. Warm lead? Nurture sequence. Cold lead? Market watch list. Your pipeline, completely managed. Without you lifting a finger.`,
  },
  {
    id:8, label:"Content Loop", duration:"0:25", color:T.orange,
    vo:`Tool five. The Content Loop. Record once. Publish everywhere. One idea becomes eight platform-native pieces of content — LinkedIn post, Twitter thread, Instagram caption, email newsletter, podcast script, AI-search article, SMS blast, and YouTube description. All generated simultaneously. All optimized for each platform's algorithm. All in your voice. Content marketing used to take a team. Now it takes sixty seconds.`,
  },
  {
    id:9, label:"Predictive Refi Engine", duration:"0:30", color:T.green,
    vo:`Tool six. The Predictive Refi Engine. You have past clients sitting in your database right now. Some of them are paying rates from 2022 and 2023 — the most expensive vintages in twenty years. The Predictive Refi Engine loads your entire portfolio against seven years of HMDA federal data, runs our APEX TLS scoring algorithm across every loan, and surfaces the top twenty percent most likely to refinance. Your database is a goldmine. This is the map.`,
  },
  {
    id:10, label:"Doc Intelligence", duration:"0:30", color:"#6366F1",
    vo:`Tool seven. Doc Intelligence. Drop any loan document into the platform — pay stub, bank statement, W-2, purchase contract, title report — and Claude reads it instantly. It extracts every relevant field. It flags compliance issues. It calculates the DTI contribution. And it tells you exactly what's missing before you ever submit the file. Your AI underwriter. Available around the clock.`,
  },
  {
    id:11, label:"ARIA Agentic OS", duration:"0:35", color:"#C8B8FF",
    vo:`Tool eight. ARIA — the Agentic Operating System. Every tool you've seen runs independently. ARIA connects them all. You tell ARIA your goal. In plain English. Get me five qualified leads by Friday. Launch a content campaign about Alaska rates. Analyze my entire portfolio and generate outreach for every hot lead. ARIA plans the mission, sequences the tools, executes autonomously, and reports back with outcomes. This is not a chatbot. This is not a dashboard. This is an AI partner that owns goals — not tasks.`,
  },
  {
    id:12, label:"Multilingual", duration:"0:25", color:T.rose,
    vo:`Tool nine. Multilingual Distribution. Alaska has over eighty thousand non-English speaking residents — Filipino, Russian, Spanish, Korean, Chinese, Yup'ik. They have the same homeownership goals. They just need someone who speaks their language. One message. Seven languages. Five platforms. Culturally adapted — not just translated.`,
  },
  {
    id:13, label:"Pricing & Founding Members", duration:"0:35", color:T.gold,
    vo:`Huit AI is available now on a subscription model. Starter at six hundred twenty-five a month. Scout at twelve-fifty. Command at twenty-three-fifty. And Dominate at four thousand one hundred twenty-five. Every tier includes all nine tools — the full stack. No feature gating. No add-ons. No per-seat surprises. And for founding members — those who join in the next thirty days — you lock in your rate permanently. The price never goes up. We have twenty-five founding members already. The limit is one hundred.`,
  },
  {
    id:14, label:"Close", duration:"0:25", color:T.gold,
    vo:`The mortgage industry is changing faster than at any point in my eighteen-year career. The loan officers who will win the next decade are the ones building AI infrastructure now — before it becomes table stakes. Huit AI gives you that infrastructure. Today. Go to huit dot ai. Book your demo. Join the founding members. I built this for you.`,
  },
]

const TOOLS = [
  { id:"dist",      n:"01", label:"Agentic Distribution",   icon:"📡", color:T.cyan,    scene:4,  cpm:"$0.36",  vs:"$18.75",  metric:"CPM",          url:"/campaigns",       desc:"One idea → 6 platforms simultaneously. $0.36 CPM vs $18.75 paid ads." },
  { id:"voice",     n:"02", label:"Halo Voice Agent",       icon:"🎙", color:T.green,   scene:5,  cpm:"$0.84",  vs:"$48.00",  metric:"per qual. lead",url:"/voice-agent",     desc:"AI calls every lead in under 5 seconds. 24/7/365. Scores 0–100." },
  { id:"aeo",       n:"03", label:"AEO Engine",             icon:"🔍", color:T.blue,    scene:6,  cpm:"84/100", vs:"~30 avg", metric:"AI visibility", url:"/aeo-engine",      desc:"Get cited by ChatGPT, Perplexity, and Google Gemini for mortgage queries." },
  { id:"qual",      n:"04", label:"Lead Qualifier",         icon:"⚡", color:T.purple,  scene:7,  cpm:"< 5s",   vs:"8–12 min",metric:"response time",  url:"/lead-qualifier",  desc:"Every inbound lead qualified, scored, and routed before you blink." },
  { id:"content",   n:"05", label:"Content Loop",           icon:"🔄", color:T.orange,  scene:8,  cpm:"60s",    vs:"2–3 days",metric:"to 8 formats",   url:"/content-loop",    desc:"Record once → LinkedIn, Twitter, email, podcast, AEO, SMS, YouTube." },
  { id:"refi",      n:"06", label:"Predictive Refi",        icon:"📈", color:T.green,   scene:9,  cpm:"Top 20%",vs:"Manual",  metric:"identified",    url:"/refi-engine",     desc:"HMDA data + APEX TLS algorithm surfaces your best refi candidates daily." },
  { id:"doc",       n:"07", label:"Doc Intelligence",       icon:"🧾", color:"#6366F1", scene:10, cpm:"< 3s",   vs:"Hours",   metric:"per document",  url:"/doc-intelligence",desc:"Drop any loan doc. AI extracts, flags, and answers questions instantly." },
  { id:"aria",      n:"08", label:"ARIA Agentic OS",        icon:"⚡", color:"#C8B8FF", scene:11, cpm:"Goals",  vs:"Tasks",   metric:"owned by AI",   url:"/agentic-os",      desc:"Tell ARIA your goal. It plans, executes, and reports back autonomously." },
  { id:"multi",     n:"09", label:"Multilingual Dist.",     icon:"🌍", color:T.rose,    scene:12, cpm:"7",      vs:"1",       metric:"languages",     url:"/multilingual",    desc:"Spanish, Tagalog, Russian, Korean, Chinese, Yup'ik. One click." },
]

const PRICING = [
  { tier:"STARTER",  price:625,   annual:531,  color:T.muted,  features:["All 9 AI tools","Up to 500 leads/mo","HMDA data access","Halo voice (500 calls/mo)","Email support"] },
  { tier:"SCOUT",    price:1250,  annual:1062, color:T.blue,   features:["All 9 AI tools","Up to 2,000 leads/mo","Priority HMDA queries","Halo voice (2,000 calls/mo)","RCS/SMS campaigns","Chat support"] },
  { tier:"COMMAND",  price:2350,  annual:1997, color:T.gold,   features:["All 9 AI tools","Unlimited leads","Full HMDA dataset","Halo voice (unlimited)","APEX TLS recruiting","API access","Priority support"], popular:true },
  { tier:"DOMINATE", price:4125,  annual:3506, color:"#C8B8FF",features:["Everything in Command","White-label option","Custom AI training","Dedicated success manager","SLA guarantee","VC data room access"] },
]

// ─── AUDIO PLAYER HOOK ────────────────────────────────────────────────────────
function useAudio(apiKey) {
  const [playing, setPlaying]   = useState(false)
  const [loading, setLoading]   = useState(false)
  const [current, setCurrent]   = useState(null)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(null)
  const intervalRef = useRef(null)

  const stop = useCallback(() => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
    clearInterval(intervalRef.current)
    setPlaying(false); setProgress(0)
  }, [])

  const play = useCallback(async (sceneId, text) => {
    stop()
    if (current === sceneId) { setCurrent(null); return }
    setCurrent(sceneId); setLoading(true)

    if (!apiKey || apiKey.trim() === "") {
      // Simulate with browser TTS fallback
      const utter = new SpeechSynthesisUtterance(text)
      utter.rate = 0.92; utter.pitch = 0.95
      utter.onstart = () => { setLoading(false); setPlaying(true) }
      utter.onend = () => { setPlaying(false); setProgress(0); setCurrent(null) }
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utter)
      setLoading(false); setPlaying(true)
      return
    }

    try {
      const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`, {
        method:"POST",
        headers:{ "Content-Type":"application/json", "xi-api-key":apiKey },
        body: JSON.stringify({ text, model_id:"eleven_multilingual_v2", voice_settings:{ stability:0.45, similarity_boost:0.82, style:0.12, use_speaker_boost:true } })
      })
      if (!res.ok) throw new Error("ElevenLabs error")
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audioRef.current = audio
      audio.onplay = () => { setLoading(false); setPlaying(true) }
      audio.ontimeupdate = () => setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
      audio.onended = () => { setPlaying(false); setProgress(0); setCurrent(null) }
      audio.play()
    } catch {
      // Fallback to browser TTS
      const utter = new SpeechSynthesisUtterance(text)
      utter.rate = 0.92
      utter.onend = () => { setPlaying(false); setCurrent(null) }
      window.speechSynthesis.speak(utter)
      setLoading(false); setPlaying(true)
    }
  }, [apiKey, current, stop])

  return { play, stop, playing, loading, current, progress }
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
function SceneCard({ scene, audio }) {
  const isActive = audio.current === scene.id
  const isLoading = audio.loading && audio.current === scene.id
  return (
    <div style={{ background:isActive?`${scene.color}10`:T.surface, border:`1px solid ${isActive?scene.color+"44":T.border}`, borderRadius:12, padding:"14px 18px", transition:"all 0.2s", cursor:"pointer" }}
      onClick={() => audio.play(scene.id, scene.vo)}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:28, height:28, borderRadius:"50%", background:isActive?scene.color+"22":T.dim, border:`2px solid ${isActive?scene.color:T.muted+"44"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:isActive?scene.color:T.muted, fontWeight:700, flexShrink:0 }}>
            {isLoading ? "⟳" : isActive ? "◼" : "▶"}
          </div>
          <span style={{ fontSize:12, fontWeight:700, color:isActive?scene.color:T.text }}>{scene.label}</span>
        </div>
        <span style={{ fontSize:10, color:T.muted, fontFamily:"monospace" }}>{scene.duration}</span>
      </div>
      {isActive && (
        <div style={{ height:3, background:T.dim, borderRadius:2, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${audio.progress}%`, background:scene.color, transition:"width 0.3s", borderRadius:2 }}/>
        </div>
      )}
      <p style={{ fontSize:11, color:T.textSub, lineHeight:1.5, marginTop:6, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
        {scene.vo.slice(0,100)}...
      </p>
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function HuitDemoSite() {
  const [apiKey, setApiKey]         = useState("")
  const [showApiInput, setShowApi]  = useState(false)
  const [activeTool, setActiveTool] = useState(null)
  const [billing, setBilling]       = useState("monthly")
  const [navActive, setNav]         = useState("platform")
  const [copied, setCopied]         = useState(null)
  const [scrollY, setScrollY]       = useState(0)
  const audio = useAudio(apiKey)

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const copy = (text, id) => { navigator.clipboard.writeText(text); setCopied(id); setTimeout(()=>setCopied(null),2000) }
  const activeTool_ = TOOLS.find(t=>t.id===activeTool)

  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"system-ui,sans-serif", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-thumb{background:#1A1A2E;border-radius:3px;}
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes glow{0%,100%{opacity:0.6}50%{opacity:1}}
        @keyframes grain{0%{transform:translate(0,0)}10%{transform:translate(-2%,-3%)}30%{transform:translate(1%,2%)}50%{transform:translate(-1%,1%)}70%{transform:translate(3%,-2%)}90%{transform:translate(-2%,3%)}100%{transform:translate(0,0)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        .tool-card{transition:all 0.25s;} .tool-card:hover{transform:translateY(-3px);}
        .nav-link{transition:color 0.15s;cursor:pointer;} .nav-link:hover{color:#E8B84B !important;}
        .cta-btn{transition:all 0.2s;} .cta-btn:hover{transform:translateY(-1px);box-shadow:0 8px 30px rgba(232,184,75,0.25);}
      `}</style>

      {/* Ambient background */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
        <div style={{position:"absolute",top:"10%",left:"20%",width:600,height:600,background:"radial-gradient(circle,rgba(232,184,75,0.04) 0%,transparent 70%)"}}/>
        <div style={{position:"absolute",top:"60%",right:"10%",width:400,height:400,background:"radial-gradient(circle,rgba(34,211,238,0.04) 0%,transparent 70%)"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)`,backgroundSize:"60px 60px"}}/>
      </div>

      {/* ── NAVIGATION ── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, height:64, padding:"0 32px", display:"flex", alignItems:"center", justifyContent:"space-between", background:scrollY>50?"rgba(6,8,16,0.97)":"transparent", backdropFilter:scrollY>50?"blur(20px)":"none", borderBottom:scrollY>50?`1px solid ${T.border}`:"none", transition:"all 0.3s" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#E8B84B,#F59E0B)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:18, color:"#060810", fontFamily:"'Sora',sans-serif" }}>H</div>
          <div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:18, letterSpacing:"-0.5px" }}>Huit<span style={{color:T.gold}}>.AI</span></div>
          </div>
        </div>
        <div style={{ display:"flex", gap:28, alignItems:"center" }}>
          {[["platform","#platform"],["tools","#tools"],["pricing","#pricing"],["demo","#demo"]].map(([l,h])=>(
            <a key={l} href={h} className="nav-link" style={{ fontSize:13, color:T.muted, textDecoration:"none", fontWeight:500, textTransform:"capitalize" }}>{l}</a>
          ))}
        </div>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <button onClick={()=>setShowApi(!showApiInput)} style={{ background:"transparent", border:`1px solid ${T.border}`, borderRadius:8, color:T.muted, fontSize:11, padding:"7px 14px", cursor:"pointer", fontFamily:"monospace" }}>
            {apiKey ? "🔊 Audio ON" : "🔇 Add ElevenLabs Key"}
          </button>
          <a href="https://crmex.huit.ai" target="_blank" rel="noreferrer">
            <button className="cta-btn" style={{ background:"linear-gradient(135deg,#E8B84B,#F59E0B)", border:"none", borderRadius:10, color:"#060810", fontSize:13, fontWeight:800, padding:"9px 22px", cursor:"pointer", fontFamily:"'Sora',sans-serif" }}>
              Start Free Demo →
            </button>
          </a>
        </div>
      </nav>

      {/* API Key Input */}
      {showApiInput && (
        <div style={{ position:"fixed", top:72, right:32, zIndex:300, background:T.surface, border:`1px solid ${T.gold}44`, borderRadius:12, padding:16, width:360, animation:"fadeIn 0.2s ease" }}>
          <div style={{ fontSize:10, color:T.gold, letterSpacing:3, fontFamily:"monospace", marginBottom:8 }}>ELEVENLABS API KEY</div>
          <input value={apiKey} onChange={e=>setApiKey(e.target.value)} placeholder="sk-..." type="password"
            style={{ width:"100%", background:T.surfaceHi, border:`1px solid ${T.border}`, borderRadius:6, color:T.text, fontFamily:"monospace", fontSize:12, padding:"8px 12px", outline:"none", boxSizing:"border-box", marginBottom:8 }}/>
          <div style={{ fontSize:10, color:T.textSub, lineHeight:1.5 }}>Without a key, browser text-to-speech is used as fallback. For full voice quality, add your ElevenLabs key above.</div>
        </div>
      )}

      <div style={{ position:"relative", zIndex:1 }}>

        {/* ── HERO ── */}
        <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"120px 32px 80px", textAlign:"center" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:T.goldDim, border:`1px solid ${T.gold}33`, borderRadius:20, padding:"6px 16px", marginBottom:28, animation:"fadeIn 0.6s ease" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:T.green, animation:"pulse 2s infinite" }}/>
            <span style={{ fontSize:11, color:T.gold, fontFamily:"monospace", letterSpacing:2, fontWeight:600 }}>9 TOOLS LIVE IN PRODUCTION — MARCH 2026</span>
          </div>
          <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(42px,6vw,80px)", fontWeight:900, letterSpacing:"-3px", lineHeight:1.05, marginBottom:24, animation:"fadeIn 0.7s ease 0.1s both" }}>
            The Mortgage Industry's<br/>
            <span style={{ background:"linear-gradient(135deg,#E8B84B,#F59E0B,#E8B84B)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundSize:"200%", animation:"shimmer 3s linear infinite" }}>
              First Agentic Platform
            </span>
          </h1>
          <p style={{ fontSize:"clamp(16px,2vw,20px)", color:T.textSub, maxWidth:620, lineHeight:1.7, marginBottom:40, animation:"fadeIn 0.7s ease 0.2s both" }}>
            Nine AI tools. One platform. Built for the loan officer who refuses to lose the next decade to someone with better technology.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", marginBottom:60, animation:"fadeIn 0.7s ease 0.3s both" }}>
            <a href="https://crmex.huit.ai" target="_blank" rel="noreferrer">
              <button className="cta-btn" style={{ background:"linear-gradient(135deg,#E8B84B,#F59E0B)", border:"none", borderRadius:12, color:"#060810", fontSize:15, fontWeight:800, padding:"14px 32px", cursor:"pointer", fontFamily:"'Sora',sans-serif" }}>
                Start Free Demo →
              </button>
            </a>
            <button onClick={()=>audio.play(3, SCENES[2].vo)}
              style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, color:T.text, fontSize:15, fontWeight:600, padding:"14px 32px", cursor:"pointer", fontFamily:"'Sora',sans-serif", display:"flex", alignItems:"center", gap:8 }}>
              {audio.current===3&&audio.playing ? "⏸ Pause" : "▶ Watch Demo"}
            </button>
          </div>

          {/* Hero Stats */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, maxWidth:800, width:"100%", animation:"fadeIn 0.7s ease 0.4s both" }}>
            {[
              {val:"$0.36",    label:"CPM vs $18.75 paid ads",    color:T.gold},
              {val:"< 5s",     label:"Lead response time",         color:T.green},
              {val:"7 Years",  label:"HMDA data loaded",           color:T.cyan},
              {val:"9 Tools",  label:"All included, no add-ons",   color:"#C8B8FF"},
            ].map(s=>(
              <div key={s.label} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:14, padding:"20px 16px" }}>
                <div style={{ fontFamily:"'Sora',sans-serif", fontSize:28, fontWeight:900, color:s.color, letterSpacing:"-1px" }}>{s.val}</div>
                <div style={{ fontSize:11, color:T.muted, marginTop:6, lineHeight:1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── AUDIO DEMO PLAYER ── */}
        <section id="demo" style={{ padding:"80px 32px", maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ fontSize:10, color:T.gold, letterSpacing:4, fontFamily:"monospace", marginBottom:12 }}>AUDIO WALKTHROUGH</div>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(28px,4vw,44px)", fontWeight:900, letterSpacing:"-1.5px" }}>
              Hear the Full <span style={{color:T.gold}}>6:45 Demo</span>
            </h2>
            <p style={{ fontSize:14, color:T.textSub, marginTop:12, maxWidth:500, margin:"12px auto 0" }}>
              Click any scene to play the voiceover. Uses ElevenLabs AI voice or browser TTS as fallback.
            </p>
          </div>

          {/* Global Audio Controls */}
          <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, padding:"16px 24px", marginBottom:28, display:"flex", alignItems:"center", justifyContent:"space-between", gap:16 }}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <button onClick={()=>audio.current?audio.stop():audio.play(SCENES[0].id,SCENES[0].vo)}
                style={{ width:44, height:44, borderRadius:"50%", background:`linear-gradient(135deg,${T.gold},#F59E0B)`, border:"none", color:"#060810", fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, flexShrink:0 }}>
                {audio.loading?"⟳":audio.playing?"⏸":"▶"}
              </button>
              <div>
                <div style={{ fontSize:13, fontWeight:700 }}>
                  {audio.current ? SCENES.find(s=>s.id===audio.current)?.label || "Playing..." : "Full Demo Walkthrough"}
                </div>
                <div style={{ fontSize:10, color:T.muted, fontFamily:"monospace", marginTop:2 }}>
                  {audio.current ? `Scene ${audio.current} of ${SCENES.length}` : `${SCENES.length} scenes · 6:45 total`}
                </div>
              </div>
            </div>
            <div style={{ flex:1, maxWidth:400 }}>
              <div style={{ height:4, background:T.dim, borderRadius:2, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${audio.progress}%`, background:`linear-gradient(90deg,${T.gold},#F59E0B)`, transition:"width 0.3s", borderRadius:2 }}/>
              </div>
            </div>
            <div style={{ fontSize:10, color:T.muted, fontFamily:"monospace", flexShrink:0 }}>
              {apiKey ? "🔊 ElevenLabs" : "🗣 Browser TTS"}
            </div>
          </div>

          {/* Scene Grid */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:12 }}>
            {SCENES.map(scene=>(
              <SceneCard key={scene.id} scene={scene} audio={audio}/>
            ))}
          </div>
        </section>

        {/* ── TOOLS SHOWCASE ── */}
        <section id="tools" style={{ padding:"80px 32px", maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <div style={{ fontSize:10, color:T.gold, letterSpacing:4, fontFamily:"monospace", marginBottom:12 }}>THE PLATFORM</div>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(28px,4vw,44px)", fontWeight:900, letterSpacing:"-1.5px" }}>
              Nine Tools. <span style={{color:T.gold}}>One Stack.</span>
            </h2>
            <p style={{ fontSize:14, color:T.textSub, marginTop:12, maxWidth:480, margin:"12px auto 0" }}>
              Every tool runs on Claude — built specifically for mortgage professionals. All included in every plan.
            </p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
            {TOOLS.map(tool=>(
              <div key={tool.id} className="tool-card"
                style={{ background:activeTool===tool.id?`${tool.color}10`:T.surface, border:`1px solid ${activeTool===tool.id?tool.color+"55":T.border}`, borderRadius:16, padding:22, cursor:"pointer" }}
                onClick={()=>setActiveTool(activeTool===tool.id?null:tool.id)}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                  <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:`${tool.color}20`, border:`1px solid ${tool.color}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{tool.icon}</div>
                    <div>
                      <div style={{ fontSize:8, color:tool.color, letterSpacing:3, fontFamily:"monospace", fontWeight:700 }}>TOOL {tool.n}</div>
                      <div style={{ fontSize:14, fontWeight:700, color:activeTool===tool.id?tool.color:T.text, marginTop:1 }}>{tool.label}</div>
                    </div>
                  </div>
                  <button onClick={e=>{e.stopPropagation();audio.play(SCENES[tool.scene-1].id,SCENES[tool.scene-1].vo)}}
                    style={{ width:30, height:30, borderRadius:"50%", background:audio.current===SCENES[tool.scene-1].id?tool.color+"33":T.dim, border:`1px solid ${audio.current===SCENES[tool.scene-1].id?tool.color:T.border}`, color:tool.color, fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    {audio.current===SCENES[tool.scene-1].id&&audio.playing?"◼":"▶"}
                  </button>
                </div>
                <p style={{ fontSize:12, color:T.textSub, lineHeight:1.6, marginBottom:14 }}>{tool.desc}</p>
                <div style={{ display:"flex", gap:8, justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ background:`${tool.color}15`, border:`1px solid ${tool.color}33`, borderRadius:8, padding:"6px 10px" }}>
                    <div style={{ fontSize:16, fontWeight:800, color:tool.color, fontFamily:"'Sora',sans-serif" }}>{tool.cpm}</div>
                    <div style={{ fontSize:8, color:T.muted, fontFamily:"monospace", letterSpacing:1 }}>{tool.metric}</div>
                  </div>
                  {tool.vs && (
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:10, color:T.muted, textDecoration:"line-through", fontFamily:"monospace" }}>{tool.vs}</div>
                      <div style={{ fontSize:9, color:T.muted }}>traditional</div>
                    </div>
                  )}
                </div>
                {activeTool===tool.id && (
                  <div style={{ marginTop:14, paddingTop:14, borderTop:`1px solid ${tool.color}22`, animation:"fadeIn 0.3s ease" }}>
                    <a href={`https://crmex.huit.ai${tool.url}`} target="_blank" rel="noreferrer"
                      style={{ display:"block", textAlign:"center", background:tool.color, borderRadius:8, color:"#060810", fontSize:11, fontWeight:800, padding:"9px 0", textDecoration:"none", fontFamily:"monospace", letterSpacing:1 }}>
                      OPEN TOOL →
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── ARIA FEATURE SPOTLIGHT ── */}
        <section style={{ padding:"80px 32px", maxWidth:1200, margin:"0 auto" }}>
          <div style={{ background:"linear-gradient(135deg,rgba(200,184,255,0.06),rgba(139,92,246,0.04))", border:"1px solid rgba(200,184,255,0.15)", borderRadius:24, padding:"48px 52px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"center" }}>
            <div>
              <div style={{ fontSize:10, color:"#C8B8FF", letterSpacing:4, fontFamily:"monospace", marginBottom:16 }}>TOOL 08 — FLAGSHIP</div>
              <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(28px,3.5vw,42px)", fontWeight:900, letterSpacing:"-1.5px", marginBottom:16 }}>
                ARIA<br/><span style={{color:"#C8B8FF"}}>Agentic OS</span>
              </h2>
              <p style={{ fontSize:15, color:T.textSub, lineHeight:1.7, marginBottom:28 }}>
                The only mortgage AI that doesn't just complete tasks — it <em style={{color:T.text}}>owns goals</em>. Tell ARIA what you want to achieve and it orchestrates all 9 tools autonomously to make it happen.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
                {["\"Get me 5 qualified leads by Friday\"","\"Launch a content campaign about Alaska rates\"","\"Score my entire portfolio and reach out to all HOT leads\""].map(q=>(
                  <div key={q} style={{ background:"rgba(200,184,255,0.08)", border:"1px solid rgba(200,184,255,0.15)", borderRadius:8, padding:"10px 14px", fontSize:13, color:"#C8B8FF", fontFamily:"monospace" }}>{q}</div>
                ))}
              </div>
              <div style={{ display:"flex", gap:12 }}>
                <button onClick={()=>audio.play(11,SCENES[10].vo)}
                  style={{ background:"rgba(200,184,255,0.15)", border:"1px solid rgba(200,184,255,0.3)", borderRadius:10, color:"#C8B8FF", fontSize:13, fontWeight:700, padding:"10px 20px", cursor:"pointer", fontFamily:"'Sora',sans-serif" }}>
                  {audio.current===11&&audio.playing?"⏸ Pause":"▶ Hear It"}
                </button>
                <a href="https://crmex.huit.ai/agentic-os" target="_blank" rel="noreferrer">
                  <button style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:T.textSub, fontSize:13, padding:"10px 20px", cursor:"pointer" }}>Open ARIA →</button>
                </a>
              </div>
            </div>
            <div style={{ background:T.surface, borderRadius:16, padding:24, border:"1px solid rgba(200,184,255,0.15)" }}>
              <div style={{ fontSize:9, color:"#C8B8FF", letterSpacing:3, fontFamily:"monospace", marginBottom:16 }}>LIVE MISSION LOG</div>
              {[
                {step:"Lead Qualifier",  result:"Scored 12 new leads → 3 HOT, 6 WARM, 3 COLD",   done:true,  color:T.purple},
                {step:"Halo Voice",      result:"Called 3 HOT leads — 2 connected, 2 qualified", done:true,  color:T.green},
                {step:"Content Loop",    result:"Generated 8 platform posts from market brief",   done:true,  color:T.orange},
                {step:"Agentic Dist.",   result:"Distributing organic content at $0.36 CPM",      done:false, color:T.cyan},
              ].map((s,i)=>(
                <div key={s.step} style={{ display:"flex", gap:12, alignItems:"flex-start", paddingBottom:14 }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
                    <div style={{ width:24, height:24, borderRadius:"50%", background:`${s.color}22`, border:`2px solid ${s.done?s.color:s.color+"44"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:s.done?s.color:T.muted }}>
                      {s.done?"✓":i===3?"⟳":i+1}
                    </div>
                    {i<3&&<div style={{ width:1, height:16, background:`${s.color}22`, marginTop:3 }}/>}
                  </div>
                  <div>
                    <div style={{ fontSize:11, fontWeight:700, color:s.color, fontFamily:"monospace" }}>{s.step}</div>
                    <div style={{ fontSize:11, color:T.textSub, marginTop:2, lineHeight:1.4 }}>{s.result}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" style={{ padding:"80px 32px", maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ fontSize:10, color:T.gold, letterSpacing:4, fontFamily:"monospace", marginBottom:12 }}>PRICING</div>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(28px,4vw,44px)", fontWeight:900, letterSpacing:"-1.5px", marginBottom:12 }}>
              All 9 Tools. <span style={{color:T.gold}}>Every Tier.</span>
            </h2>
            <p style={{ fontSize:14, color:T.textSub, maxWidth:420, margin:"0 auto 24px" }}>
              No feature gating. No add-ons. No per-seat surprises. Founding members lock in their rate permanently.
            </p>
            <div style={{ display:"inline-flex", background:T.surface, border:`1px solid ${T.border}`, borderRadius:8, padding:3 }}>
              {[["monthly","Monthly"],["annual","Annual (15% off)"]].map(([v,l])=>(
                <button key={v} onClick={()=>setBilling(v)}
                  style={{ background:billing===v?T.gold:"transparent", border:"none", borderRadius:6, color:billing===v?"#060810":T.muted, fontSize:11, fontWeight:700, padding:"7px 18px", cursor:"pointer", fontFamily:"monospace", letterSpacing:1 }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
            {PRICING.map(plan=>(
              <div key={plan.tier} style={{ background:plan.popular?T.goldDim:T.surface, border:`1px solid ${plan.popular?T.gold+"55":T.border}`, borderRadius:18, padding:24, position:"relative" }}>
                {plan.popular && (
                  <div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)", background:T.gold, color:"#060810", fontSize:9, fontWeight:800, padding:"4px 14px", borderRadius:10, fontFamily:"monospace", letterSpacing:2, whiteSpace:"nowrap" }}>
                    MOST POPULAR
                  </div>
                )}
                <div style={{ fontSize:9, color:plan.color, letterSpacing:3, fontFamily:"monospace", marginBottom:8 }}>{plan.tier}</div>
                <div style={{ fontFamily:"'Sora',sans-serif", fontSize:34, fontWeight:900, letterSpacing:"-1px", color:plan.popular?T.gold:T.text }}>
                  ${billing==="annual"?plan.annual.toLocaleString():plan.price.toLocaleString()}
                </div>
                <div style={{ fontSize:11, color:T.muted, fontFamily:"monospace", marginBottom:20 }}>/ month</div>
                <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
                  {plan.features.map(f=>(
                    <div key={f} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                      <span style={{ color:plan.color, fontSize:12, marginTop:1, flexShrink:0 }}>✓</span>
                      <span style={{ fontSize:12, color:T.textSub, lineHeight:1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href="https://crmex.huit.ai" target="_blank" rel="noreferrer" style={{ display:"block", textDecoration:"none" }}>
                  <button style={{ width:"100%", background:plan.popular?"linear-gradient(135deg,#E8B84B,#F59E0B)":T.surfaceHi, border:`1px solid ${plan.popular?"transparent":T.border}`, borderRadius:10, color:plan.popular?"#060810":T.text, fontSize:12, fontWeight:800, padding:12, cursor:"pointer", fontFamily:"'Sora',sans-serif" }}>
                    {plan.popular?"Start Now →":"Get Started"}
                  </button>
                </a>
              </div>
            ))}
          </div>

          {/* Founding Member Banner */}
          <div style={{ marginTop:28, background:"linear-gradient(135deg,rgba(232,184,75,0.08),rgba(232,184,75,0.03))", border:`1px solid ${T.gold}33`, borderRadius:16, padding:"24px 32px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:20, flexWrap:"wrap" }}>
            <div>
              <div style={{ fontSize:10, color:T.gold, letterSpacing:3, fontFamily:"monospace", marginBottom:6 }}>FOUNDING MEMBER OFFER</div>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:20, fontWeight:800 }}>Lock in your rate permanently. <span style={{color:T.gold}}>25 of 100 spots taken.</span></div>
              <div style={{ fontSize:13, color:T.textSub, marginTop:4 }}>Join in the next 30 days and your price never increases — regardless of future pricing changes.</div>
            </div>
            <a href="https://crmex.huit.ai" target="_blank" rel="noreferrer">
              <button className="cta-btn" style={{ background:"linear-gradient(135deg,#E8B84B,#F59E0B)", border:"none", borderRadius:12, color:"#060810", fontSize:14, fontWeight:800, padding:"14px 28px", cursor:"pointer", fontFamily:"'Sora',sans-serif", whiteSpace:"nowrap" }}>
                Claim Your Spot →
              </button>
            </a>
          </div>
        </section>

        {/* ── SOCIAL PROOF ── */}
        <section style={{ padding:"60px 32px", maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
            {[
              {quote:"The Predictive Refi Engine found three borrowers in my database I would have completely missed. Closed two of them within 45 days.", name:"Sarah K.", role:"LO, 12 years, Anchorage AK"},
              {quote:"Halo handled 23 inbound leads while I was at a closing. When I checked my phone, 4 were already qualified and waiting for my call.", name:"Marcus T.", role:"Senior LO, Eagle River AK"},
              {quote:"I was skeptical about AI in mortgage. But when I saw the AEO score go from 38 to 84 after one optimization pass, I was sold.", name:"Jennifer W.", role:"Branch Manager, Fairbanks AK"},
            ].map(t=>(
              <div key={t.name} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, padding:24 }}>
                <div style={{ fontSize:28, color:T.gold, marginBottom:12, fontFamily:"Georgia,serif" }}>"</div>
                <p style={{ fontSize:13, color:T.textSub, lineHeight:1.7, marginBottom:16, fontStyle:"italic" }}>{t.quote}</p>
                <div>
                  <div style={{ fontSize:13, fontWeight:700 }}>{t.name}</div>
                  <div style={{ fontSize:11, color:T.muted, fontFamily:"monospace", marginTop:2 }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section style={{ padding:"100px 32px", textAlign:"center" }}>
          <div style={{ maxWidth:600, margin:"0 auto" }}>
            <button onClick={()=>audio.play(14,SCENES[13].vo)}
              style={{ background:T.goldDim, border:`1px solid ${T.gold}33`, borderRadius:10, color:T.gold, fontSize:12, fontWeight:700, padding:"8px 20px", cursor:"pointer", fontFamily:"monospace", marginBottom:28 }}>
              {audio.current===14&&audio.playing?"⏸ Pause":"▶ Hear the Close"}
            </button>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(32px,4.5vw,52px)", fontWeight:900, letterSpacing:"-2px", lineHeight:1.1, marginBottom:20 }}>
              The loan officers who will win the next decade are building AI infrastructure <span style={{color:T.gold}}>right now.</span>
            </h2>
            <p style={{ fontSize:16, color:T.textSub, lineHeight:1.7, marginBottom:36 }}>
              Huit.AI gives you that infrastructure. Today. I built this for you.
              <br/><span style={{ fontSize:13, color:T.muted, fontFamily:"monospace" }}>— Derek Huit, NMLS #203980</span>
            </p>
            <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
              <a href="https://crmex.huit.ai" target="_blank" rel="noreferrer">
                <button className="cta-btn" style={{ background:"linear-gradient(135deg,#E8B84B,#F59E0B)", border:"none", borderRadius:14, color:"#060810", fontSize:16, fontWeight:800, padding:"16px 40px", cursor:"pointer", fontFamily:"'Sora',sans-serif" }}>
                  Start Your Free Demo →
                </button>
              </a>
            </div>
            <div style={{ marginTop:32, fontSize:12, color:T.muted, fontFamily:"monospace" }}>
              huit.ai · NMLS #203980 · Anchorage, Alaska · Equal Housing Lender
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
