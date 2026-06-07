import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft, ArrowRight, BarChart2, Bus, CheckCircle, ChevronDown, ChevronRight,
  ExternalLink, Eye, Figma, MapPin, MessageSquare, Navigation, Play, Star, Target,
  Train, TrendingUp, Users, XCircle, Zap, AlertCircle, Clock, Ship, MonitorSmartphone,
  Image, Video, FileText, Link2
} from "lucide-react";

// ── Fonts injected globally ──────────────────────────────────────────────────
const FontInjector = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
    document.body.style.fontFamily = "'DM Sans', sans-serif";
    document.body.style.background = "#080808";
    document.body.style.overflowX = "hidden";
    return () => document.head.removeChild(link);
  }, []);
  return null;
};

// ── Color tokens ─────────────────────────────────────────────────────────────
const R = "#E8332A";      // M-Indicator red
const RD = "#c0271f";
const O = "#f97316";
const BG = "#080808";
const BG1 = "#111";
const BG2 = "#161616";
const BG3 = "#1c1c1c";
const BORDER = "rgba(232,51,42,0.15)";

// ── Data ──────────────────────────────────────────────────────────────────────
const team = ["Tanish Rane","Preksha Salvi","Sania Rakhangi","Krish Sodhi","Yateen Vaviya","Shaunak Kokate","Aniruddh Saraf"];

const surveyImages = [
  { src: "https://i.imgur.com/placeholder1.png", label: "Visual Appeal — 91 Responses", pct: 50.5, insight: "Users find the design old and clunky", icon: Eye, color: R },
  { src: "https://i.imgur.com/placeholder2.png", label: "Navigation Ease — 91 Responses", pct: 49.4, insight: "Users find the UI unintuitive", icon: Navigation, color: O },
  { src: "https://i.imgur.com/placeholder3.png", label: "Cluttered Layout — 91 Responses", pct: 68.2, insight: "68% say the UI is cluttered with useless features", icon: AlertCircle, color: "#eab308" },
  { src: "https://i.imgur.com/placeholder4.png", label: "Primary Usage — 91 Responses", pct: 65.9, insight: "65.9% use it for local trains, yet the app deprioritises it", icon: Train, color: "#22c55e" },
];

const reviewQuotes = [
  { name: "Vihang Shah", date: "Nov 2024", stars: 1, text: "User Interface is too old. Needs revamp. Train timetables and bus timetables are not updated. Live tracking system is not working.", tag: "UI outdated, live tracking broken" },
  { name: "Deepak Panchal", date: "Dec 2024", stars: 1, text: "Favorite station feature is not working. PF number is not visible — need bigger font. Suggest to use bigger font for showing platform number.", tag: "Non-functional favorites, poor visibility" },
  { name: "Mithun Naskar", date: "Jun 2022", stars: 1, text: "Too many ad placements. You can't go back without viewing the ad and then closing it. It's an annoying part.", tag: "Excessive ads disrupt navigation" },
  { name: "Yogesh Khandalkar", date: "Aug 2022", stars: 2, text: "Everytime have to select source and destination even if route is added in favourites. Disappointed from a very useful app.", tag: "Favorites feature doesn't reduce steps" },
  { name: "Kaushik Raichura", date: "Oct 2021", stars: 1, text: "The earlier version had categorized trains like Central, Western. New one removed that — way more difficult to use.", tag: "Removal of categorized train listings" },
  { name: "Nimesh Chauhan", date: "May 2025", stars: 1, text: "Contact details in the emergency section need to be updated. Tried calling G T Hospital, but the call isn't going through.", tag: "Outdated emergency contact info" },
];

const painPoints = [
  { label: "Ad Intrusiveness", desc: "Poorly placed and overly disruptive advertisements interrupt core navigation flows.", color: R, no: "01" },
  { label: "UX Writing", desc: "Interface text lacks clarity and helpful cues in critical places where decisions are made.", color: O, no: "02" },
  { label: "Accessibility", desc: "No dedicated accessibility tools, small fonts for platform numbers, poor visual contrast.", color: "#eab308", no: "03" },
  { label: "System Feedback", desc: "No alerts for updated or changed train timetables. Lack of system status visibility.", color: "#22c55e", no: "04" },
  { label: "Navigation", desc: "Too many steps to access primary features like train schedules. Rigid menu layers.", color: "#3b82f6", no: "05" },
  { label: "Customization", desc: "No ability to tailor the app experience to user needs or transport preferences.", color: "#a855f7", no: "06" },
  { label: "Aesthetics", desc: "Outdated visuals and layout reduce user appeal and trust in the product.", color: "#ec4899", no: "07" },
  { label: "Efficiency", desc: "Fixed UI flow wastes time on frequent tasks. No shortcuts for repeat journeys.", color: "#14b8a6", no: "08" },
];

const heuristics = [
  { label: "Visibility of System Status", score: 8, good: true },
  { label: "Match Between System & Real World", score: 10, good: true },
  { label: "User Control & Freedom", score: 3, good: false },
  { label: "Consistency & Standards", score: 10, good: true },
  { label: "Error Prevention", score: 4, good: false },
  { label: "Recognition Rather Than Recall", score: 4, good: false },
  { label: "Flexibility & Efficiency of Use", score: 4, good: false },
  { label: "Aesthetic & Minimalist Design", score: 2, good: false },
  { label: "Help Users Recover from Errors", score: 2, good: false },
  { label: "Help & Documentation", score: 2, good: false },
];

const modules = [
  { id: "home", icon: MonitorSmartphone, color: R, label: "Home Page",
    flow: ["Open App","Search-focused Home","Enter Location & Destination","View Favourites","Browse Transit Icons","Bottom Nav"],
    before: "Dark theme tiles with icons. Large intrusive ads at bottom. Cluttered layout hiding core features.",
    after: "Brighter interface with prominent search bar. Minimalistic transit icons. Favorites highlighted. Ads removed from primary view.",
    improvements: ["Prominent search bar","Transit icons reorganized","Favorites quick access","Reduced ad clutter"],
    figma: "https://www.figma.com/design/vBuXLqrRjmbtMcK0A8Xlpr/M-INDICATOR-Enhanced-SEM5"
  },
  { id: "train", icon: Train, color: "#f97316", label: "Local Train",
    flow: ["Homepage","Select Local","Station Path OR A-to-B","Station: Source → Train → Delays","A-to-B: Source, Dest, Time → Search"],
    before: "Congested station list, no priority for recent stations. Dark cluttered train list with useless train numbers shown prominently.",
    after: "Improved spacing, lighter theme, recent stations highlighted, nearby stations shown, train timings on same page.",
    improvements: ["Recent stations section","Near Me section","Lighter pastel theme","Train timings on same page"],
    figma: "https://www.figma.com/design/vBuXLqrRjmbtMcK0A8Xlpr/M-INDICATOR-Enhanced-SEM5?node-id=train"
  },
  { id: "metro", icon: Navigation, color: "#a855f7", label: "Metro",
    flow: ["Select Metro Line","Choose Station (large buttons)","View Timings Both Directions","Tap Direction → Timeline","Expand for Live Tracking"],
    before: "Dark list with small fonts. Unclear direction info. Compact layout with cluttered information.",
    after: "Light theme card-style line selection. Spacious tappable station buttons. Clear direction indicators. Timeline route view.",
    improvements: ["Card-style line selection","Tappable station buttons","Clear direction cards","Timeline route view"],
    figma: "https://www.figma.com/design/vBuXLqrRjmbtMcK0A8Xlpr/M-INDICATOR-Enhanced-SEM5?node-id=metro"
  },
  { id: "bus", icon: Bus, color: "#22c55e", label: "Bus",
    flow: ["Select Bus","3 Search Methods","Source-Dest / Bus No. / Bus Stop","View Card Results","Tap for Route & Timings"],
    before: "Flat red/black theme. Boxy buttons. Cramped bus listings with tiny fonts and minimal color cues.",
    after: "Clean layout. Card-style results. Color-coded bus types. Clearly marked routes, timings, and stops.",
    improvements: ["3 search methods unified","Card-style results","Color-coded bus types","Readable stop names"],
    figma: "https://www.figma.com/design/vBuXLqrRjmbtMcK0A8Xlpr/M-INDICATOR-Enhanced-SEM5?node-id=bus"
  },
  { id: "msrtc", icon: Bus, color: "#eab308", label: "MSRTC",
    flow: ["Select MSRTC","Source & Dest / Bus Stop / Depot","City from scrollable list","Route cards with bus type & timings","Live delay indicators"],
    before: "Flat red theme, small cluttered buttons. Dark dropdown for city selection. No color coding for bus types.",
    after: "Clean layout. Scrollable card-style city list. Color-coded status (On Time / Delayed / Cancelled). Clear route cards.",
    improvements: ["3 clear entry paths","Color-coded bus status","Card-style city selection","AC Services direct access"],
    figma: "https://www.figma.com/design/vBuXLqrRjmbtMcK0A8Xlpr/M-INDICATOR-Enhanced-SEM5?node-id=msrtc"
  },
  { id: "mono", icon: Train, color: "#14b8a6", label: "Monorail",
    flow: ["Enter Current Station","Choose Direction","View All Arrival Times","Select Time","View Journey Path"],
    before: "Asked direction first, confusing users. Dark cramped list. No logic around user's current location.",
    after: "Station-first flow. Direction chosen after. Cleaner station list with improved spacing and visual hierarchy.",
    improvements: ["Station-first input logic","Direction after station","Cleaner arrival list","Journey path view"],
    figma: "https://www.figma.com/design/vBuXLqrRjmbtMcK0A8Xlpr/M-INDICATOR-Enhanced-SEM5?node-id=monorail"
  },
  { id: "ferry", icon: Ship, color: "#3b82f6", label: "Ferry",
    flow: ["Select Ferry","Type Source/Dest to Filter OR View All","Fare, Frequency, Journey Time, Bike","Quick Search for fast lookup"],
    before: "Plain list with static info. No filtering. Fare and journey time buried in text.",
    after: "Source-destination search. All routes shown with fare, frequency, bike allowance icons. Clean card layout.",
    improvements: ["Quick search filter","All routes default view","Fare & bike icons","Clean info cards"],
    figma: "https://www.figma.com/design/vBuXLqrRjmbtMcK0A8Xlpr/M-INDICATOR-Enhanced-SEM5?node-id=ferry"
  },
];

const testResults = [
  { module: "Local Train", ui: 4.1, ease: 4.3, emoji: "🚂", easeLabel: "Train Search Ease" },
  { module: "Train Route", ui: 4.3, ease: 4.4, emoji: "🗺️", easeLabel: "Route Clarity" },
  { module: "Metro", ui: 4.1, ease: 4.5, emoji: "🚇", easeLabel: "Line Selection" },
  { module: "Bus", ui: 4.3, ease: 4.1, emoji: "🚌", easeLabel: "Stop Search" },
  { module: "Monorail", ui: 4.3, ease: 4.2, emoji: "🚝", easeLabel: "Station Clarity" },
  { module: "Ferry", ui: 4.3, ease: 4.2, emoji: "⛴️", easeLabel: "Info Clarity" },
  { module: "MSRTC", ui: 4.2, ease: 4.3, emoji: "🚍", easeLabel: "Search Process" },
  { module: "Overall", ui: 4.2, ease: 4.5, emoji: "⭐", easeLabel: "Overall Ease" },
];

// ── Shared UI ─────────────────────────────────────────────────────────────────
const s = { fontFamily: "'DM Sans', sans-serif" };
const display = { fontFamily: "'DM Serif Display', serif" };
const mono = { fontFamily: "'JetBrains Mono', monospace" };

const Chip = ({ children, color = R }) => (
  <span style={{ ...mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color, background: `${color}15`, border: `1px solid ${color}30`, borderRadius: 999, padding: "4px 12px", display: "inline-flex", alignItems: "center", gap: 6 }}>
    <span style={{ width: 5, height: 5, borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0 }} />
    {children}
  </span>
);

const SectionHeader = ({ tag, title, sub, color = R }) => (
  <div style={{ marginBottom: 48 }}>
    <Chip color={color}>{tag}</Chip>
    <h2 style={{ ...display, fontSize: "clamp(28px,4vw,52px)", color: "#fff", margin: "14px 0 16px", lineHeight: 1.1 }}>{title}</h2>
    {sub && <p style={{ ...s, color: "rgba(255,255,255,0.45)", fontSize: 16, lineHeight: 1.7, maxWidth: 560 }}>{sub}</p>}
  </div>
);

const GlassCard = ({ children, style = {}, hover = true, onClick }) => (
  <div onClick={onClick} style={{
    background: "rgba(255,255,255,0.032)", border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 20, backdropFilter: "blur(12px)", transition: "all 0.3s",
    cursor: onClick ? "pointer" : "default", ...style
  }}
    onMouseEnter={e => { if (hover) { e.currentTarget.style.border = "1px solid rgba(232,51,42,0.3)"; e.currentTarget.style.transform = "translateY(-3px)"; } }}
    onMouseLeave={e => { if (hover) { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; } }}
  >{children}</div>
);

const Stars = ({ n }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1,2,3,4,5].map(i => (
      <Star key={i} size={11} style={{ fill: i <= n ? "#f59e0b" : "rgba(255,255,255,0.1)", color: i <= n ? "#f59e0b" : "rgba(255,255,255,0.1)" }} />
    ))}
  </div>
);

const vp = { once: true, margin: "-80px" };
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } };

// ── Navigation ────────────────────────────────────────────────────────────────
const Nav = ({ scrolled }) => (
  <motion.nav initial={{ y: -60 }} animate={{ y: 0 }} style={{
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 60,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 32px",
    background: scrolled ? "rgba(8,8,8,0.92)" : "transparent",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
    transition: "all 0.3s", ...s
  }}>
    {/* Back — uses history.back() to avoid 404 */}
    <button onClick={() => window.history.back()} style={{
      display: "flex", alignItems: "center", gap: 8, background: "none", border: "none",
      color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 13, fontWeight: 600, ...s,
      transition: "color 0.2s"
    }}
      onMouseEnter={e => e.currentTarget.style.color = "#fff"}
      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
    >
      <ArrowLeft size={14} /> Portfolio
    </button>

    <div style={{ display: "flex", gap: 4 }}>
      {["Research","Pain Points","Heuristics","Flows","Testing"].map(s2 => (
        <a key={s2} href={`#${s2.toLowerCase().replace(/ /g,"-")}`} style={{
          ...s, fontSize: 12, color: "rgba(255,255,255,0.38)", padding: "6px 12px",
          borderRadius: 8, textDecoration: "none", transition: "all 0.2s"
        }}
          onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.38)"; e.currentTarget.style.background = "transparent"; }}
        >{s2}</a>
      ))}
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: 8, background: `${R}15`, border: `1px solid ${R}30`, borderRadius: 999, padding: "6px 14px" }}>
      <div style={{ width: 22, height: 22, borderRadius: "50%", background: R, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 10, color: "#fff" }}>M</div>
      <span style={{ ...mono, fontSize: 10, letterSpacing: "0.18em", color: "#e87878" }}>M-INDICATOR</span>
    </div>
  </motion.nav>
);

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const op = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "0 32px" }}>
      {/* Grid bg */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `linear-gradient(rgba(232,51,42,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(232,51,42,0.7) 1px, transparent 1px)`, backgroundSize: "52px 52px", pointerEvents: "none" }} />
      {/* Radial glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 15% 40%, rgba(232,51,42,0.18) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 85% 70%, rgba(249,115,22,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />

      <motion.div style={{ y, opacity: op, position: "relative", zIndex: 2, width: "100%", maxWidth: 1200, margin: "0 auto", paddingTop: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 48, alignItems: "center" }}>
          {/* Left */}
          <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
            <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: `${R}12`, border: `1px solid ${R}25`, borderRadius: 999, padding: "8px 18px", marginBottom: 0 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: R, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#fff" }}>M</div>
                <span style={{ ...mono, fontSize: 10, letterSpacing: "0.22em", color: "#e87878" }}>UX CASE STUDY — SEM 5</span>
              </div>
            </motion.div>

            <motion.h1 variants={fadeUp} style={{ ...display, fontSize: "clamp(42px,6vw,80px)", color: "#fff", lineHeight: 0.95, margin: "0 0 12px" }}>
              M-Indicator
              <span style={{ display: "block", color: R, fontStyle: "italic" }}>Redesigned.</span>
            </motion.h1>

            <motion.p variants={fadeUp} style={{ ...s, fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: 520, margin: "16px 0 28px" }}>
              A full UX redesign of Mumbai's most-used transit app — tackling cluttered UI, confusing navigation, intrusive ads, and outdated aesthetics across <strong style={{ color: "rgba(255,255,255,0.8)" }}>7 transport modules</strong>.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
              {["UX Research","UI Design","Figma Prototype","User Testing","Heuristic Evaluation"].map(t => (
                <span key={t} style={{ ...s, fontSize: 11, color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "5px 12px" }}>{t}</span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: "flex", gap: 12 }}>
              <a href="https://www.figma.com/design/vBuXLqrRjmbtMcK0A8Xlpr/M-INDICATOR-Enhanced-SEM5" target="_blank" rel="noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8, background: R, color: "#fff", border: "none",
                borderRadius: 999, padding: "12px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer", textDecoration: "none", ...s,
                boxShadow: `0 0 24px ${R}40`, transition: "all 0.2s"
              }}
                onMouseEnter={e => { e.currentTarget.style.background = RD; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = R; e.currentTarget.style.transform = "translateY(0)"; }}
              ><Figma size={15} /> View Figma Prototype <ExternalLink size={12} /></a>

              <a href="https://docs.google.com/forms/d/e/1FAIpQLSdI-XpxAIpiwukfuExZPteIM98MooDvsSbFJxrkW14QXWm3Ag/viewform?usp=dialog" target="_blank" rel="noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 999, padding: "12px 24px", fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "none", ...s, transition: "all 0.2s"
              }}
                onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
              ><FileText size={15} /> View Survey Responses</a>
            </motion.div>
          </motion.div>

          {/* Right — stats card */}
          <motion.div initial={{ opacity: 0, x: 40, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <GlassCard style={{ padding: 24, border: "1px solid rgba(232,51,42,0.2)" }} hover={false}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 16, marginBottom: 20 }}>
                <div>
                  <p style={{ ...mono, fontSize: 9, color: `${R}80`, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 4 }}>Project Stats</p>
                  <p style={{ ...s, fontWeight: 700, color: "#fff", fontSize: 15 }}>M-Indicator Enhanced SEM5</p>
                </div>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${R}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Target size={18} color={R} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                {[
                  { l: "Team Members", v: "7", icon: Users },
                  { l: "Transport Modes", v: "7", icon: Train },
                  { l: "Survey Responses", v: "91", icon: BarChart2 },
                  { l: "Testers", v: "10", icon: CheckCircle },
                  { l: "Overall Rating", v: "4.2/5", icon: Star },
                  { l: "Task Completion", v: "99%", icon: TrendingUp },
                ].map(({ l, v, icon: Icon }) => (
                  <div key={l} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "12px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                      <Icon size={12} color={`${R}aa`} />
                      <p style={{ ...mono, fontSize: 8, color: "rgba(255,255,255,0.3)", letterSpacing: "0.16em", textTransform: "uppercase" }}>{l}</p>
                    </div>
                    <p style={{ ...display, fontSize: 26, color: "#fff", margin: 0 }}>{v}</p>
                  </div>
                ))}
              </div>

              <div style={{ background: `${R}0e`, border: `1px solid ${R}20`, borderRadius: 14, padding: "14px 16px" }}>
                <p style={{ ...s, fontSize: 11, fontWeight: 600, color: "#e87878", marginBottom: 10 }}>Team</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {team.map(n => (
                    <span key={n} style={{ ...s, fontSize: 10, color: n === "Preksha Salvi" ? "#ffb3b0" : "rgba(255,255,255,0.45)", background: n === "Preksha Salvi" ? `${R}22` : "rgba(255,255,255,0.05)", border: `1px solid ${n === "Preksha Salvi" ? R+"40" : "rgba(255,255,255,0.08)"}`, borderRadius: 999, padding: "4px 10px" }}>{n}</span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} style={{ display: "flex", justifyContent: "center", marginTop: 60 }}>
          <ChevronDown size={22} color="rgba(255,255,255,0.2)" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// ── Primary Research ──────────────────────────────────────────────────────────
const PrimaryResearch = () => {
  // Real chart images from project PDF (placeholders with proper instructions)
  const charts = [
    {
      question: "How visually appealing do you find the app?",
      insight: "Users find the design very old and clunky to use",
      pct: 50.5, label: "rated it 3/5 or below", icon: Eye, color: R,
      // Embed as PDF screenshot — user should replace src with actual exported chart images
      imgSrc: null
    },
    {
      question: "How easy is it to navigate through the app?",
      insight: "Users find the UI unintuitive",
      pct: 49.4, label: "rated navigation below average", icon: Navigation, color: O,
      imgSrc: null
    },
    {
      question: "Is the layout cluttered?",
      insight: "Users feel the UI is cluttered with useless features",
      pct: 68.2, label: "said it's cluttered (1 or 2)", icon: AlertCircle, color: "#eab308",
      imgSrc: null
    },
    {
      question: "What do you primarily use M-Indicator for?",
      insight: "Primary use is Local Train & Metro, yet app doesn't prioritize these",
      pct: 65.9, label: "use it for local trains", icon: Train, color: "#22c55e",
      imgSrc: null
    },
  ];

  return (
    <section id="research" style={{ padding: "100px 32px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.035, backgroundImage: `linear-gradient(rgba(232,51,42,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(232,51,42,0.7) 1px, transparent 1px)`, backgroundSize: "52px 52px", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp}>
          <SectionHeader
            tag="01 — Primary Research"
            title="What real users told us about M-Indicator."
            sub={<>By talking directly to metro and railway travellers, we found M-Indicator — while still popular — is frustrating users due to poor UI. <a href="https://docs.google.com/forms/d/e/1FAIpQLSdI-XpxAIpiwukfuExZPteIM98MooDvsSbFJxrkW14QXWm3Ag/viewform?usp=dialog" target="_blank" rel="noreferrer" style={{ color: R, textDecoration: "none", fontWeight: 600 }}>91 survey responses →</a></>}
          />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {charts.map((item, i) => (
            <motion.div key={item.question} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ delay: i * 0.1 }}>
              <GlassCard style={{ padding: 0, overflow: "hidden" }}>
                {/* Image area — replace with actual chart screenshots */}
                <div style={{ background: "rgba(255,255,255,0.025)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: 20, minHeight: 160, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  {item.imgSrc ? (
                    <img src={item.imgSrc} alt={item.question} style={{ width: "100%", objectFit: "contain", maxHeight: 200 }} />
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <div style={{ width: "100%", height: 100, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 6, marginBottom: 8, paddingBottom: 8 }}>
                        {/* Mini bar chart visual */}
                        {[0.28, 0.48, 1, 0.22, 0.05].map((h, j) => (
                          <motion.div key={j} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + j * 0.08, duration: 0.6 }} style={{ width: 28, background: j === 2 ? item.color : `${item.color}40`, borderRadius: "4px 4px 0 0", transformOrigin: "bottom", height: `${h * 90}px` }} />
                        ))}
                      </div>
                      <p style={{ ...mono, fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.18em" }}>REPLACE WITH ACTUAL CHART IMAGE</p>
                    </div>
                  )}
                </div>

                <div style={{ padding: "18px 20px" }}>
                  <p style={{ ...s, fontSize: 13, color: "rgba(255,255,255,0.65)", marginBottom: 12, lineHeight: 1.6 }}>{item.question}</p>

                  {/* Animated bar */}
                  <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden", marginBottom: 8 }}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.pct}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 }} style={{ height: "100%", background: `linear-gradient(90deg, ${item.color}cc, ${item.color})`, borderRadius: 99 }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ ...s, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{item.label}</span>
                    <span style={{ ...mono, fontSize: 12, color: item.color, fontWeight: 500 }}>{item.pct}%</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8, background: `${item.color}0f`, border: `1px solid ${item.color}20`, borderRadius: 10, padding: "8px 12px" }}>
                    <item.icon size={13} color={item.color} style={{ flexShrink: 0 }} />
                    <p style={{ ...s, fontSize: 12, color: `${item.color}dd`, fontWeight: 500 }}>{item.insight}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Link to actual form */}
        <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp} style={{ marginTop: 24, textAlign: "center" }}>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdI-XpxAIpiwukfuExZPteIM98MooDvsSbFJxrkW14QXWm3Ag/viewform" target="_blank" rel="noreferrer" style={{ ...s, display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 99, padding: "10px 20px", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
          ><Link2 size={14} /> View Full Survey Responses on Google Forms</a>
        </motion.div>
      </div>
    </section>
  );
};

// ── Secondary Research ────────────────────────────────────────────────────────
const SecondaryResearch = () => (
  <section style={{ padding: "100px 32px", background: BG2, borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp}>
        <SectionHeader tag="02 — Secondary Research" title="What Play Store reviews revealed." sub="Examining app reviews exposed consistent pain points — cluttered UI, repetitive actions, confusing navigation, intrusive ads, and half-baked features." color={O} />
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {reviewQuotes.map((r, i) => (
          <motion.div key={r.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ delay: i * 0.07 }}>
            <GlassCard style={{ padding: 20, height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${R}18`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "#e87878", flexShrink: 0 }}>{r.name[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ ...s, fontWeight: 600, fontSize: 13, color: "#fff", margin: 0 }}>{r.name}</p>
                  <p style={{ ...s, fontSize: 11, color: "rgba(255,255,255,0.28)", margin: "2px 0 4px" }}>{r.date}</p>
                  <Stars n={r.stars} />
                </div>
              </div>
              <blockquote style={{ ...s, fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontStyle: "italic", flex: 1, margin: "0 0 14px", borderLeft: `2px solid rgba(255,255,255,0.08)`, paddingLeft: 12 }}>"{r.text}"</blockquote>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 7, background: `${O}0f`, border: `1px solid ${O}22`, borderRadius: 10, padding: "8px 12px" }}>
                <XCircle size={12} color={O} style={{ marginTop: 1, flexShrink: 0 }} />
                <p style={{ ...s, fontSize: 11, color: `${O}cc`, fontWeight: 500, lineHeight: 1.5 }}>{r.tag}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ── Pain Points ───────────────────────────────────────────────────────────────
const PainPoints = () => {
  const [active, setActive] = useState(0);
  return (
    <section id="pain-points" style={{ padding: "100px 32px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.035, backgroundImage: `linear-gradient(rgba(232,51,42,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(232,51,42,0.7) 1px, transparent 1px)`, backgroundSize: "52px 52px", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp}>
          <SectionHeader tag="03 — Pain Points" title="8 core problems we identified & solved." />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {painPoints.map((p, i) => (
            <motion.div key={p.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={vp} transition={{ delay: i * 0.06 }}>
              <GlassCard onClick={() => setActive(i)} style={{ padding: 20, border: active === i ? `1px solid ${p.color}50` : "1px solid rgba(255,255,255,0.07)", background: active === i ? `${p.color}08` : "rgba(255,255,255,0.032)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.color, boxShadow: `0 0 10px ${p.color}80` }} />
                  <span style={{ ...mono, fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.18em", textTransform: "uppercase" }}>{p.no}</span>
                </div>
                <h3 style={{ ...s, fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 8 }}>{p.label}</h3>
                <p style={{ ...s, fontSize: 12, color: "rgba(255,255,255,0.42)", lineHeight: 1.65 }}>{p.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Heuristics ────────────────────────────────────────────────────────────────
const Heuristics = () => {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="heuristics" style={{ padding: "100px 32px", background: BG2, borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp}>
          <SectionHeader tag="04 — Heuristic Evaluation" title="Scored against Nielsen's 10 heuristics." sub="Only 2 of 10 heuristics scored high. 8 scored 4 or below — revealing systematic UX failures across the board." color="#a855f7" />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {heuristics.map((h, i) => (
            <motion.div key={h.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ delay: i * 0.06 }}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{ display: "flex", alignItems: "center", gap: 14, background: hovered === i ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "14px 18px", transition: "all 0.2s" }}
            >
              {/* Score badge */}
              <div style={{ width: 40, height: 40, borderRadius: 10, background: h.good ? "rgba(34,197,94,0.15)" : "rgba(232,51,42,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ ...display, fontSize: 18, color: h.good ? "#22c55e" : R, fontWeight: 700 }}>{h.score}</span>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ ...s, fontSize: 13, color: "rgba(255,255,255,0.72)", marginBottom: 8 }}>{h.label}</p>
                <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${h.score * 10}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 + i * 0.05 }} style={{ height: "100%", background: h.good ? "#22c55e" : R, borderRadius: 99 }} />
                </div>
              </div>

              <div style={{ flexShrink: 0 }}>
                {h.good ? <CheckCircle size={16} color="#22c55e" /> : <XCircle size={16} color={R} />}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Callouts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 20 }}>
          <GlassCard style={{ padding: 20, border: "1px solid rgba(34,197,94,0.2)" }} hover={false}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <CheckCircle size={15} color="#22c55e" />
              <span style={{ ...s, fontSize: 13, fontWeight: 600, color: "#22c55e" }}>What worked well</span>
            </div>
            <p style={{ ...s, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>Clear and simple language — vocabulary aligns with everyday commuter understanding. Consistent standards maintained across sections.</p>
          </GlassCard>

          <GlassCard style={{ padding: 20, border: `1px solid ${R}25` }} hover={false}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <XCircle size={15} color={R} />
              <span style={{ ...s, fontSize: 13, fontWeight: 600, color: "#e87878" }}>Critical failures</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {["No system status visibility for schedule updates","No built-in support or contact options","Limited customizability for user needs","Rigid navigation requiring multiple clicks","Low flexibility for frequent task shortcuts"].map(f => (
                <p key={f} style={{ ...s, fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0 }}>· {f}</p>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

// ── User Flows ────────────────────────────────────────────────────────────────
const FlowCard = ({ mod }) => {
  const [tab, setTab] = useState("flow");
  const Icon = mod.icon;
  return (
    <GlassCard style={{ overflow: "hidden" }} hover={false}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: `${mod.color}08` }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${mod.color}1a`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={22} color={mod.color} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ ...s, fontWeight: 700, fontSize: 16, color: "#fff", margin: 0 }}>{mod.label}</p>
          <p style={{ ...s, fontSize: 11, color: "rgba(255,255,255,0.3)", margin: "2px 0 0" }}>Section Redesign</p>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {(["flow","compare","improvements"]).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              ...s, fontSize: 11, padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600,
              background: tab === t ? mod.color : "rgba(255,255,255,0.06)",
              color: tab === t ? "#fff" : "rgba(255,255,255,0.4)", transition: "all 0.2s", textTransform: "capitalize"
            }}>{t === "compare" ? "Before/After" : t}</button>
          ))}
        </div>
        <a href={mod.figma} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: mod.color, textDecoration: "none", ...s, opacity: 0.8 }}>
          <Figma size={13} /> Figma
        </a>
      </div>

      {/* Content */}
      <div style={{ padding: 20 }}>
        <AnimatePresence mode="wait">
          {tab === "flow" && (
            <motion.div key="flow" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              <p style={{ ...mono, fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>User Journey</p>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
                {mod.flow.map((step, i) => (
                  <div key={step} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "8px 14px" }}>
                      <p style={{ ...s, fontSize: 12, color: "rgba(255,255,255,0.65)", margin: 0 }}>{step}</p>
                    </div>
                    {i < mod.flow.length - 1 && <ChevronRight size={13} color={mod.color} style={{ flexShrink: 0 }} />}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {tab === "compare" && (
            <motion.div key="compare" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: `${R}08`, border: `1px solid ${R}22`, borderRadius: 12, padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
                  <XCircle size={13} color={R} />
                  <p style={{ ...s, fontSize: 12, fontWeight: 600, color: "#e87878", margin: 0 }}>Before Redesign</p>
                </div>
                <p style={{ ...s, fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{mod.before}</p>
              </div>
              <div style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 12, padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
                  <CheckCircle size={13} color="#22c55e" />
                  <p style={{ ...s, fontSize: 12, fontWeight: 600, color: "#6ee7b7", margin: 0 }}>After Redesign</p>
                </div>
                <p style={{ ...s, fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{mod.after}</p>
              </div>
            </motion.div>
          )}

          {tab === "improvements" && (
            <motion.div key="improvements" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              <p style={{ ...mono, fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>Key Improvements</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {mod.improvements.map(imp => (
                  <div key={imp} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "10px 14px" }}>
                    <CheckCircle size={13} color={mod.color} style={{ flexShrink: 0 }} />
                    <p style={{ ...s, fontSize: 12, color: "rgba(255,255,255,0.65)", margin: 0 }}>{imp}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Figma screens placeholder row */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "14px 20px", background: "rgba(255,255,255,0.015)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <p style={{ ...s, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", margin: 0 }}>Prototype Screens</p>
          <a href={mod.figma} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: mod.color, textDecoration: "none", ...s }}>
            <ExternalLink size={11} /> Open in Figma
          </a>
        </div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
          {/* Phone-frame placeholders for Figma screenshots */}
          {["Screen 1","Screen 2","Screen 3"].map(sc => (
            <div key={sc} style={{ flexShrink: 0, width: 90 }}>
              <div style={{ aspectRatio: "9/19", background: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
                {/* Top notch */}
                <div style={{ position: "absolute", top: 6, width: 28, height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 99 }} />
                <Image size={16} color="rgba(255,255,255,0.15)" />
                <p style={{ ...mono, fontSize: 7, color: "rgba(255,255,255,0.18)", marginTop: 6, textAlign: "center", lineHeight: 1.4, padding: "0 8px" }}>Add Figma screenshot</p>
              </div>
              <p style={{ ...mono, fontSize: 8, color: "rgba(255,255,255,0.25)", textAlign: "center", marginTop: 6 }}>{sc}</p>
            </div>
          ))}
          <a href={mod.figma} target="_blank" rel="noreferrer" style={{ flexShrink: 0, width: 90, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", aspectRatio: "9/19", border: `1px dashed ${mod.color}40`, borderRadius: 14, textDecoration: "none", transition: "all 0.2s", background: `${mod.color}05` }}
            onMouseEnter={e => e.currentTarget.style.borderColor = `${mod.color}80`}
            onMouseLeave={e => e.currentTarget.style.borderColor = `${mod.color}40`}
          >
            <ExternalLink size={16} color={`${mod.color}60`} />
            <p style={{ ...mono, fontSize: 7, color: `${mod.color}60`, marginTop: 6, textAlign: "center", lineHeight: 1.4, padding: "0 8px" }}>View all in Figma</p>
          </a>
        </div>
      </div>
    </GlassCard>
  );
};

const UserFlows = () => {
  const [active, setActive] = useState(0);
  return (
    <section id="flows" style={{ padding: "100px 32px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.035, backgroundImage: `linear-gradient(rgba(232,51,42,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(232,51,42,0.7) 1px, transparent 1px)`, backgroundSize: "52px 52px", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp}>
          <SectionHeader tag="06 — User Flows & Section Redesigns" title="Every transport module, redesigned." sub="7 sections completely rethought — user journeys, before/after screens, and Figma prototype links for each module." color={O} />
        </motion.div>

        {/* Module pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {modules.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.button key={m.id} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => setActive(i)} style={{
                display: "flex", alignItems: "center", gap: 7, borderRadius: 10, padding: "8px 16px",
                background: active === i ? `${m.color}20` : "rgba(255,255,255,0.05)",
                border: active === i ? `1px solid ${m.color}50` : "1px solid rgba(255,255,255,0.07)",
                color: active === i ? "#fff" : "rgba(255,255,255,0.4)",
                cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s", ...s
              }}>
                <Icon size={14} color={active === i ? m.color : "rgba(255,255,255,0.3)"} />
                {m.label}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
            <FlowCard mod={modules[active]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};



const DemoVideos = () => {
  const videos = [
    {
      label: "Home & Navigation Flow",
      desc: "Onboarding, home screen, and main navigation redesign walkthrough",
      file: "/HomePage1.mp4",
    },
    {
      label: "Local Train Search",
      desc: "Station selection, A-to-B search, train timings and route view",
      file: "/Train.mp4",
    },
    {
      label: "Metro & Bus Modules",
      desc: "Metro line selection, station cards, bus search by stop/number",
      file: "/Bus1.mp4",
    },
    {
      label: "MSRTC, Monorail & Ferry",
      desc: "Intercity bus, color-coded status, ferry route cards, monorail flow",
      file: "/Mono1.mp4",
    },
  ];

  return (
    <section style={{ padding: "80px 32px", background: BG2, borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp}>
          <SectionHeader
            tag="07 — Demo Walkthroughs"
            title="See the redesign in action."
            sub="Hover a card to play. Each walkthrough is in portrait format matching the Figma prototype."
          />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {videos.map((v, i) => {
            const videoRef = useRef<HTMLVideoElement>(null);
            const [paused, setPaused] = useState(true);
            const [hovered, setHovered] = useState(false);

            const handleMouseEnter = () => {
              setHovered(true);
              videoRef.current?.play();
              setPaused(false);
            };

            const handleMouseLeave = () => {
              setHovered(false);
              videoRef.current?.pause();
              setPaused(true);
            };

            const togglePause = (e: React.MouseEvent) => {
              e.stopPropagation();
              if (videoRef.current?.paused) {
                videoRef.current.play();
                setPaused(false);
              } else {
                videoRef.current?.pause();
                setPaused(true);
              }
            };

            return (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard style={{ overflow: "hidden" }}>
                  <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      position: "relative",
                      aspectRatio: "9/16",
                      background: "#0a0a0a",
                      overflow: "hidden",
                      cursor: "pointer",
                      borderRadius: 12,
                    }}
                  >
                    <video
                      ref={videoRef}
                      src={v.file}
                      playsInline
                      muted
                      loop
                      preload="metadata"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        background: "#000",
                        display: "block",
                      }}
                    />

                    {/* Pause button — only visible on hover */}
                    {hovered && (
                      <button
                        onClick={togglePause}
                        style={{
                          position: "absolute",
                          bottom: 12,
                          right: 12,
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: "rgba(0,0,0,0.55)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        {paused ? (
                          // Play triangle
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                            <polygon points="2,1 11,6 2,11" />
                          </svg>
                        ) : (
                          // Pause bars
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                            <rect x="2" y="1" width="3" height="10" rx="1" />
                            <rect x="7" y="1" width="3" height="10" rx="1" />
                          </svg>
                        )}
                      </button>
                    )}

                    {/* Play hint when not hovered */}
                    {!hovered && (
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0,0,0,0.25)",
                        transition: "opacity 0.2s",
                      }}>
                        <div style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.12)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backdropFilter: "blur(6px)",
                        }}>
                          <svg width="14" height="14" viewBox="0 0 12 12" fill="white">
                            <polygon points="2,1 11,6 2,11" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Phone notch */}
                    <div style={{
                      position: "absolute",
                      top: 8,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 40,
                      height: 4,
                      background: "rgba(255,255,255,0.12)",
                      borderRadius: 99,
                      pointerEvents: "none",
                    }} />
                  </div>

                  <div style={{ padding: "10px 14px" }}>
                    <p style={{ ...s, fontWeight: 600, fontSize: 12, color: "#fff", marginBottom: 3 }}>{v.label}</p>
                    <p style={{ ...s, fontSize: 10, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{v.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp} style={{ ...s, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 16 }}>
          Videos are in portrait (9:16) format matching the Figma mobile prototype dimensions.
        </motion.p>
      </div>
    </section>
  );
};

// ── Testing Results ───────────────────────────────────────────────────────────
const TestingResults = () => {
  const [sel, setSel] = useState(7);
  const cur = testResults[sel];

  return (
    <section id="testing" style={{ padding: "100px 32px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.035, backgroundImage: `linear-gradient(rgba(232,51,42,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(232,51,42,0.7) 1px, transparent 1px)`, backgroundSize: "52px 52px", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp}>
          <SectionHeader tag="08 — User Testing Results" title="10 participants. 7 modules. December 2025." sub={<>Testing included daily commuters, college students, and working professionals aged 18–50. <a href="https://docs.google.com/forms/d/e/1FAIpQLSdI-XpxAIpiwukfuExZPteIM98MooDvsSbFJxrkW14QXWm3Ag/viewform" target="_blank" rel="noreferrer" style={{ color: "#22c55e", textDecoration: "none" }}>View responses →</a></>} color="#22c55e" />
        </motion.div>

        {/* Module pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {testResults.map((r, i) => (
            <button key={r.module} onClick={() => setSel(i)} style={{
              display: "flex", alignItems: "center", gap: 7, borderRadius: 10, padding: "8px 16px",
              background: sel === i ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.05)",
              border: sel === i ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(255,255,255,0.07)",
              color: sel === i ? "#fff" : "rgba(255,255,255,0.4)",
              cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s", ...s
            }}>
              <span>{r.emoji}</span> {r.module}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={sel} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
            {/* UI Rating */}
            <GlassCard style={{ padding: 28 }} hover={false}>
              <p style={{ ...mono, fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Overall UI Quality</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 20 }}>
                <span style={{ ...display, fontSize: 64, color: "#fff", lineHeight: 1 }}>{cur.ui}</span>
                <span style={{ ...s, fontSize: 18, color: "rgba(255,255,255,0.2)", marginBottom: 6 }}>/ 5</span>
              </div>
              <div style={{ height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${(cur.ui / 5) * 100}%` }} transition={{ duration: 1 }} style={{ height: "100%", background: `linear-gradient(90deg, ${R}cc, ${R})`, borderRadius: 99 }} />
              </div>
              <p style={{ ...s, fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 10 }}>{cur.module} — UI quality rating</p>
            </GlassCard>

            {/* Ease Rating */}
            <GlassCard style={{ padding: 28 }} hover={false}>
              <p style={{ ...mono, fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>{cur.easeLabel}</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 20 }}>
                <span style={{ ...display, fontSize: 64, color: "#fff", lineHeight: 1 }}>{cur.ease}</span>
                <span style={{ ...s, fontSize: 18, color: "rgba(255,255,255,0.2)", marginBottom: 6 }}>/ 5</span>
              </div>
              <div style={{ height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${(cur.ease / 5) * 100}%` }} transition={{ duration: 1 }} style={{ height: "100%", background: "linear-gradient(90deg, #16a34a, #22c55e)", borderRadius: 99 }} />
              </div>
              <p style={{ ...s, fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 10 }}>{cur.module} — ease of use rating</p>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        {/* Module grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10 }}>
          {testResults.slice(0, 7).map((r, i) => (
            <motion.div key={r.module} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={vp} transition={{ delay: i * 0.06 }} onClick={() => setSel(i)} style={{ cursor: "pointer" }}>
              <GlassCard style={{ padding: "14px 12px", textAlign: "center", border: sel === i ? "1px solid rgba(34,197,94,0.35)" : "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{r.emoji}</div>
                <p style={{ ...display, fontSize: 22, color: "#fff", margin: "0 0 4px" }}>{r.ui}</p>
                <p style={{ ...s, fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>{r.module}</p>
                <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", background: `linear-gradient(90deg, ${R}cc, ${R})`, width: `${(r.ui / 5) * 100}%`, borderRadius: 99 }} />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Conclusion ────────────────────────────────────────────────────────────────
const Conclusion = () => (
  <section style={{ padding: "100px 32px", background: BG2, borderTop: "1px solid rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 70% at 50% 100%, ${R}12 0%, transparent 60%)`, pointerEvents: "none" }} />
    <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative" }}>
      <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp}>
        <Chip>09 — Conclusion</Chip>
        <h2 style={{ ...display, fontSize: "clamp(28px,4vw,52px)", color: "#fff", margin: "16px 0", lineHeight: 1.1 }}>From cluttered to clear.</h2>
        <p style={{ ...s, fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, maxWidth: 620, margin: "0 auto 48px" }}>
          The M-Indicator redesign transforms a functional but complex transportation platform into an intuitive, user-friendly application. Through systematic design methodology, comprehensive user testing, and careful attention to diverse user needs, the redesign achieves substantial improvements across all 7 transportation modules.
        </p>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 40 }}>
        {[
          { label: "User Satisfaction", value: "4.2/5", desc: "Across all modules", color: R },
          { label: "Task Completion", value: "99%", desc: "All testing tasks", color: O },
          { label: "Modules Redesigned", value: "7", desc: "End-to-end flows", color: "#22c55e" },
        ].map(({ label, value, desc, color }) => (
          <motion.div key={label} whileHover={{ y: -4 }} style={{ background: `${color}08`, border: `1px solid ${color}25`, borderRadius: 20, padding: "28px 20px", textAlign: "center" }}>
            <p style={{ ...display, fontSize: 52, color, margin: "0 0 8px" }}>{value}</p>
            <p style={{ ...s, fontWeight: 700, fontSize: 13, color: "#fff", marginBottom: 4 }}>{label}</p>
            <p style={{ ...s, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{desc}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
        <a href="https://www.figma.com/design/vBuXLqrRjmbtMcK0A8Xlpr/M-INDICATOR-Enhanced-SEM5" target="_blank" rel="noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: 8, background: R, color: "#fff", borderRadius: 999, padding: "13px 28px", fontSize: 14, fontWeight: 700, textDecoration: "none", ...s,
          boxShadow: `0 0 28px ${R}40`, transition: "all 0.2s"
        }}
          onMouseEnter={e => { e.currentTarget.style.background = RD; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = R; e.currentTarget.style.transform = "translateY(0)"; }}
        ><Figma size={16} /> View Full Figma Prototype <ExternalLink size={13} /></a>

        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdI-XpxAIpiwukfuExZPteIM98MooDvsSbFJxrkW14QXWm3Ag/viewform" target="_blank" rel="noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.65)", borderRadius: 999, padding: "13px 28px", fontSize: 14, fontWeight: 600, textDecoration: "none", ...s, transition: "all 0.2s"
        }}
          onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
        ><Link2 size={15} /> Survey Responses</a>

        <button onClick={() => window.history.back()} style={{
          display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", borderRadius: 999, padding: "13px 28px", fontSize: 14, fontWeight: 600, background: "none", cursor: "pointer", ...s, transition: "all 0.2s"
        }}
          onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
        ><ArrowLeft size={15} /> Back to Portfolio</button>
      </div>
    </div>
  </section>
);

// ── Problem & Goal ────────────────────────────────────────────────────────────
const ProblemGoal = () => (
  <section style={{ padding: "100px 32px", background: BG2, borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ duration: 0.6 }}>
          <GlassCard style={{ padding: 32, height: "100%", border: `1px solid ${R}22` }} hover={false}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: `${R}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <AlertCircle size={24} color={R} />
            </div>
            <Chip color={R}>05 — Problem Statement</Chip>
            <h3 style={{ ...display, fontSize: 26, color: "#fff", margin: "14px 0 16px", lineHeight: 1.2 }}>Why users are frustrated.</h3>
            <p style={{ ...s, fontSize: 14, lineHeight: 1.85, color: "rgba(255,255,255,0.5)" }}>
              Users are experiencing frustration due to the app's <span style={{ color: "#e87878" }}>cluttered interface</span>, <span style={{ color: "#e87878" }}>confusing navigation structure</span>, <span style={{ color: "#e87878" }}>repetitive user actions</span>, and <span style={{ color: "#e87878" }}>poorly placed advertisements</span>. Additionally, several features feel incomplete or non-functional, leading to decreased trust and a lack of engagement with the app.
            </p>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ duration: 0.6, delay: 0.1 }}>
          <GlassCard style={{ padding: 32, height: "100%", border: "1px solid rgba(34,197,94,0.2)" }} hover={false}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(34,197,94,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <Target size={24} color="#22c55e" />
            </div>
            <Chip color="#22c55e">Goal Statement</Chip>
            <h3 style={{ ...display, fontSize: 26, color: "#fff", margin: "14px 0 16px", lineHeight: 1.2 }}>What we set out to build.</h3>
            <p style={{ ...s, fontSize: 14, lineHeight: 1.85, color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>
              Redesign the app with a focus on <span style={{ color: "#6ee7b7" }}>simplifying the UI</span>, <span style={{ color: "#6ee7b7" }}>streamlining navigation</span>, minimizing repetitive steps, and improving clarity. Eliminate distracting ads and deliver a polished, seamless experience.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[{ icon: Zap, l: "Faster task flows" }, { icon: Eye, l: "Cleaner hierarchy" }, { icon: Navigation, l: "Streamlined nav" }, { icon: CheckCircle, l: "Ad-free core" }].map(({ icon: Icon, l }) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 10, padding: "8px 12px" }}>
                  <Icon size={13} color="#22c55e" />
                  <span style={{ ...s, fontSize: 12, color: "#6ee7b7", fontWeight: 500 }}>{l}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  </section>
);

// ── Main ──────────────────────────────────────────────────────────────────────
export default function MIndicatorCaseStudy() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "#fff", overflowX: "hidden" }}>
      <FontInjector />
      <Nav scrolled={scrolled} />
      <Hero />
      <PrimaryResearch />
      <SecondaryResearch />
      <PainPoints />
      <Heuristics />
      <ProblemGoal />
      <UserFlows />
      <DemoVideos />
      <TestingResults />
      <Conclusion />
    </div>
  );
}
