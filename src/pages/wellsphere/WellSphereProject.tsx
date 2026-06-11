import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiFastapi,
  SiFirebase,
  SiJsonwebtokens,
  SiNumpy,
  SiPandas,
  SiGithub,        
  SiPostgresql,
  SiPython,
  SiScikitlearn,
  SiVuedotjs,
} from "react-icons/si";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BellRing,
  CheckCircle2,
  CircleUserRound,
  ClipboardList,
  Database,
  Fingerprint,
  Gauge,
  HeartPulse,
  KeyRound,
  MessageSquareText,
  QrCode,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Utensils,
  Video,
} from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import img1 from "../../assets/WellsphereHomepage.png";
import img2 from "../../assets/Warden1.png";
import img3 from "../../assets/masteradmin.png";
import img4 from "../../assets/masteradmin.png";

const screenshots = [
  img1,
  img2,
  img3,
  img4,
];


// ─── Types ────────────────────────────────────────────────────────────────────
type LucideIcon = typeof Activity;

// ─── Data ─────────────────────────────────────────────────────────────────────

const roles = ["Admin", "Hostel Manager", "Warden", "Medical Staff", "Mess Manager", "Student"];

const metrics = [
  { label: "Risk recall", value: "0.83", caption: "improved from 0.69" },
  { label: "Build progress", value: "50%", caption: "core modules live" },
  { label: "Signal sources", value: "5+", caption: "attendance, mess, health, grievances, self reports" },
];

const pipeline = [
  { icon: QrCode, title: "Campus Signals", text: "QR mess attendance, health logs, grievances, hostel activity, and student check-ins are collected as daily behavioral signals." },
  { icon: Database, title: "Health Data Layer", text: "PostgreSQL and Firebase keep role-aware records clean, traceable, and ready for analysis." },
  { icon: Activity, title: "Hybrid AI Scan", text: "Isolation Forest catches outliers while temporal analysis studies unusual changes over time." },
  { icon: MessageSquareText, title: "Mess NLP", text: "VADER, TF-IDF, and review integrity checks detect sentiment shifts and suspicious feedback patterns." },
  { icon: BellRing, title: "Early Alerts", text: "Wardens and medical staff receive explainable risk alerts before small issues become emergencies." },
];

// Doc 2 timeline (5 phases, zigzag layout)
const timeline = [
  {
    phase: "01",
    title: "Foundation",
    status: "Completed",
    month: "Auth Core",
    icon: KeyRound,
    text: "Secure login, Firebase OTP, JWT sessions, and role-based access control.",
    bullets: ["OTP auth", "JWT session", "Role routes"],
    color: "#34d399",
    ringColor: "rgba(52,211,153,",
  },
  {
    phase: "02",
    title: "Hostel Ops",
    status: "Completed",
    month: "Campus Flow",
    icon: Utensils,
    text: "Hostel management, mess attendance, and feedback capture workflows.",
    bullets: ["Hostel records", "QR scans", "Mess feedback"],
    color: "#34d399",
    ringColor: "rgba(52,211,153,",
  },
  {
    phase: "03",
    title: "Health Layer",
    status: "Completed",
    month: "Risk Engine",
    icon: HeartPulse,
    text: "Daily health metrics, anomaly scoring, and warden alert dashboard.",
    bullets: ["Daily metrics", "Risk scoring", "Alert desk"],
    color: "#34d399",
    ringColor: "rgba(251,191,36,",
    spin: true,
  },
  {
    phase: "04",
    title: "NLP Integrity",
    status: "Completed",
    month: "Feedback AI",
    icon: MessageSquareText,
    text: "Sentiment analysis and manipulated review detection for mess feedback.",
    bullets: ["VADER", "TF-IDF", "Fake review checks"],
    color: "#34d399",
    ringColor: "rgba(251,191,36,",
    spin: true,
  },
  {
    phase: "05",
    title: "Future Intelligence",
    status: "In Progress",
    month: "Forecasting",
    icon: Sparkles,
    text: "IndicBERT, LSTM Autoencoder, SHAP explainability, and scheduled forecasting.",
    bullets: ["IndicBERT", "LSTM", "SHAP"],
    color: "#a78bfa",
    ringColor: "rgba(167,139,250,",
    dim: true,
  },
];

const features = [
  { icon: ShieldCheck, title: "Role-Based Platform", text: "Different dashboards for admins, wardens, medical staff, mess managers, and students." },
  { icon: Gauge, title: "AI Risk Scoring", text: "Hybrid anomaly detection turns fragmented campus data into early-warning health signals." },
  { icon: Utensils, title: "Mess Behavior Intelligence", text: "Attendance and feedback connect food habits, satisfaction, and risk patterns." },
  { icon: MessageSquareText, title: "Feedback Integrity", text: "Sentiment detection and fake review checks reduce manipulated mess ratings." },
  { icon: KeyRound, title: "Secure Access", text: "Firebase OTP, JWT, and RBAC protect sensitive hostel and health information." },
  { icon: ClipboardList, title: "Warden Alert Desk", text: "High-priority students surface with context, confidence, and recommended intervention cues." },
];

// Doc 2 tech stack with react-icons
const techStack: Array<{ name: string; label: string; icon: IconType | LucideIcon; tone: string; detail: string }> = [
  { name: "Vue.js", label: "Frontend", icon: SiVuedotjs, tone: "#42d392", detail: "Role dashboards and student flows" },
  { name: "FastAPI", label: "Backend", icon: SiFastapi, tone: "#22c7a9", detail: "Secure health intelligence APIs" },
  { name: "PostgreSQL", label: "Database", icon: SiPostgresql, tone: "#69b9ff", detail: "Structured hostel and health data" },
  { name: "Firebase", label: "Auth + OTP", icon: SiFirebase, tone: "#f6c344", detail: "OTP login and identity support" },
  { name: "JWT + RBAC", label: "Security", icon: SiJsonwebtokens, tone: "#9ef7da", detail: "Role-based access boundaries" },
  { name: "Scikit-learn", label: "AI/ML", icon: SiScikitlearn, tone: "#ffb86b", detail: "Isolation Forest risk detection" },
  { name: "Pandas", label: "Data", icon: SiPandas, tone: "#d7ccff", detail: "Health and behavior preprocessing" },
  { name: "NumPy", label: "Computation", icon: SiNumpy, tone: "#75d6ff", detail: "Risk feature calculation" },
  { name: "VADER + TF-IDF", label: "NLP", icon: MessageSquareText, tone: "#66f2c2", detail: "Sentiment and feedback integrity" },
  { name: "Python", label: "ML Runtime", icon: SiPython, tone: "#bdf77f", detail: "Model training and analysis scripts" },
];

const challenges = [
  "Balancing privacy with useful early intervention signals.",
  "Separating genuine mess feedback from manipulated or low-quality reviews.",
  "Combining one-day anomalies with longer behavioral trends.",
  "Designing alerts that help wardens act without overwhelming them.",
];

// Screenshots carousel data (Doc 3 style but with 3 rich slides)
const screenshotSlides = [
  { tag: "Warden Alert Dashboard", subtitle: "Risk Command Center", url: "wellsphere.app/warden/dashboard", accent: "#14b8a6" },
  { tag: "QR Mess Attendance", subtitle: "Mess Flow Scanner", url: "wellsphere.app/mess/attendance", accent: "#f97316" },
  { tag: "Student Health Check-in", subtitle: "Daily Metrics", url: "wellsphere.app/student/health-checkin", accent: "#a78bfa" },
];

// ─── Animation presets ─────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const sectionViewport = { once: true, margin: "-120px" };

// Shared grid background style (Doc 2 pattern, used everywhere)
const gridBg = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
  backgroundSize: "42px 42px",
};

// ─── Shared sub-components ─────────────────────────────────────────────────────

const SignalCard = ({ label, value, caption }: { label: string; value: string; caption: string }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="rounded-lg border border-emerald-200/15 bg-emerald-200/[0.045] p-4 shadow-lg shadow-emerald-950/30 backdrop-blur"
  >
    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/70">{label}</p>
    <p className="mt-2 font-display text-4xl text-white">{value}</p>
    <p className="mt-1 text-sm text-emerald-50/70">{caption}</p>
  </motion.div>
);

// ─── TIMELINE (Doc 2 zigzag style, 5 phases) ──────────────────────────────────

const StatusBadge = ({ status }: { status: string }) => {
  const cfg = {
    Completed: { bg: "border-emerald-300/30 bg-emerald-300/10", text: "text-emerald-300", dot: "bg-emerald-400" },
    "In progress": { bg: "border-amber-300/30 bg-amber-300/10", text: "text-amber-300", dot: "bg-amber-400" },
    Planned: { bg: "border-white/10 bg-white/[0.04]", text: "text-slate-400", dot: "bg-slate-500" },
  }[status] ?? { bg: "border-white/10 bg-white/[0.04]", text: "text-slate-400", dot: "bg-slate-500" };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium ${cfg.bg} ${cfg.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot} ${status !== "Planned" ? "animate-pulse" : ""}`} />
      {status}
    </span>
  );
};

const PhaseCircle = ({
  icon: Icon,
  color,
  ringColor,
  spin,
  dim,
}: {
  icon: LucideIcon;
  color: string;
  ringColor: string;
  spin?: boolean;
  dim?: boolean;
}) => (
  <div className="relative mx-auto flex items-center justify-center" style={{ width: 112, height: 112 }}>
    {/* Outer dashed spinning ring */}
    <svg
      className="absolute inset-0"
      style={{ animation: spin ? "spin 8s linear infinite" : "none", opacity: dim ? 0.3 : 1 }}
      viewBox="0 0 112 112"
      fill="none"
    >
      <circle cx="56" cy="56" r="54" stroke={`${ringColor}0.35)`} strokeWidth="1.5" strokeDasharray="5 4" />
    </svg>
    {/* Middle solid ring */}
    <svg className="absolute inset-0" viewBox="0 0 112 112" fill="none" style={{ opacity: dim ? 0.4 : 1 }}>
      <circle cx="56" cy="56" r="44" stroke={`${ringColor}0.6)`} strokeWidth="1.5" />
      <circle cx="56" cy="56" r="36" stroke={`${ringColor}0.2)`} strokeWidth="1" />
    </svg>
    {/* Glow bg */}
    <div
      className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full shadow-2xl"
      style={{
        background: `${ringColor}0.1)`,
        boxShadow: `0 0 32px ${ringColor}0.25)`,
        opacity: dim ? 0.6 : 1,
      }}
    >
      <Icon size={30} style={{ color }} />
    </div>
  </div>
);

const TimelineCard = ({ item, side, index }: { item: (typeof timeline)[number]; side: "left" | "right"; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: "easeOut" }}
      className={`group relative cursor-pointer rounded-2xl border border-emerald-200/15 bg-[#071613]/90 p-5
        transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300/40
        hover:shadow-[0_20px_60px_rgba(52,211,153,0.12)] ${item.dim ? "opacity-60" : ""}`}
      style={{ backdropFilter: "blur(8px)" }}
    >
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(to right, transparent, ${item.color}, transparent)` }}
      />

      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/20">
          Phase {item.phase}
        </span>
        <StatusBadge status={item.status} />
      </div>

      <h3 className="mb-3 font-display text-xl font-bold text-white">{item.title}</h3>
      <p className="mb-4 text-sm leading-7 text-emerald-50/65">{item.text}</p>

      <div className="space-y-1.5">
        {item.bullets.map((b) => (
          <p key={b} className="font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-200/55">
            + {b}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

const TimelineSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="timeline"
      className="relative overflow-hidden border-y border-emerald-200/10 px-5 py-24 md:px-10"
      style={{ background: "rgba(6,20,17,0.9)" }}
    >
      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={gridBg} />

      <div className="container relative">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-emerald-200/80">
            Development Journey
          </p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">Project Timeline</h2>
        </motion.div>

        {/* Horizontal spine line */}
        <div className="relative">
          <div
            className="absolute left-0 right-0 top-[56px] hidden h-px lg:block"
            style={{
              background: "linear-gradient(to right, transparent, rgba(52,211,153,0.5) 10%, rgba(251,191,36,0.5) 50%, rgba(167,139,250,0.4) 90%, transparent)",
            }}
          />

          <div className="grid gap-10 lg:flex lg:items-start lg:gap-4">
            {timeline.map((item, index) => {
              const isTop = index % 2 === 0;
              return (
                <div key={item.phase} className="relative flex-1">
                  {/* Top card (even) */}
                  <div className={`mb-6 hidden lg:block ${isTop ? "visible" : "invisible pointer-events-none h-[220px]"}`}>
                    {isTop && <TimelineCard item={item} side="left" index={index} />}
                  </div>

                  {/* Circle */}
                  <div className="relative z-10">
                    <PhaseCircle
                      icon={item.icon}
                      color={item.color}
                      ringColor={item.ringColor}
                      spin={item.spin}
                      dim={item.dim}
                    />
                    <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/50">
                      {item.month}
                    </p>
                  </div>

                  {/* Bottom card (odd) */}
                  <div className={`mt-6 hidden lg:block ${!isTop ? "visible" : "invisible pointer-events-none h-[220px]"}`}>
                    {!isTop && <TimelineCard item={item} side="right" index={index} />}
                  </div>

                  {/* Mobile: always show below */}
                  <div className="mt-5 lg:hidden">
                    <TimelineCard item={item} side="left" index={index} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── SCREENSHOTS CAROUSEL (Doc 3 style, animated) ─────────────────────────────

const BrowserFrame = ({ url, children }: { url: string; children: React.ReactNode }) => (
  <div className="overflow-hidden rounded-2xl border border-emerald-200/15 bg-[#061210] shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
    <div className="flex items-center gap-2 border-b border-emerald-200/[0.08] bg-[#071312]/90 px-5 py-3">
      <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
      <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
      <div className="h-3 w-3 rounded-full bg-[#28c840]" />
      <div className="mx-3 flex-1 rounded-md bg-white/[0.06] px-3 py-1.5 font-mono text-[11px] text-white/35">
        {url}
      </div>
    </div>
    <div className="min-h-[320px]">{children}</div>
  </div>
);

/* Slide 1 — Warden Dashboard */
const WardenDashboard = () => (
  <div className="flex flex-col">
    <div className="flex items-center gap-5 border-b border-emerald-200/[0.07] bg-emerald-950/30 px-6 py-3.5">
      <span className="font-display text-base font-bold text-emerald-400">WellSphere</span>
      {["Dashboard", "Students", "Reports", "Settings"].map((l, i) => (
        <span key={l} className={`text-xs ${i === 0 ? "font-medium text-white" : "text-white/40"}`}>{l}</span>
      ))}
    </div>
    <div className="grid grid-cols-3 gap-3 p-5">
      {[
        { label: "Risk Recall", val: "0.83", sub: "↑ from 0.69", color: "#14b8a6" },
        { label: "High Risk Today", val: "4", sub: "Hostel C", color: "#f97316" },
        { label: "Signals Active", val: "5+", sub: "Sources live", color: "#a78bfa" },
      ].map((s) => (
        <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.04] p-4">
          <p className="mb-2 text-[9px] uppercase tracking-[0.16em] text-white/40">{s.label}</p>
          <p className="font-display text-3xl font-bold" style={{ color: s.color }}>{s.val}</p>
          <p className="mt-1 text-[10px] text-white/30">{s.sub}</p>
        </div>
      ))}
    </div>
    <div className="mx-5 mb-5 overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.03]">
      <div className="border-b border-white/[0.07] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
        Alert Stream
      </div>
      {[
        { level: "High", color: "#fb7185", bg: "rgba(251,113,133,0.12)", text: "Student skipped 4 mess scans and reported low sleep this week." },
        { level: "Review", color: "#a78bfa", bg: "rgba(167,139,250,0.12)", text: "Feedback pattern flagged — unusual similarity across 6 reviews." },
        { level: "Stable", color: "#34d399", bg: "rgba(52,211,153,0.12)", text: "Medical follow-up completed. Status cleared for prior alert." },
      ].map((a, i) => (
        <motion.div
          key={a.level}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
          className="flex items-start gap-3 border-b border-white/[0.04] px-4 py-3 last:border-0"
        >
          <span className="mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em]"
            style={{ background: a.bg, color: a.color }}>{a.level}</span>
          <p className="text-xs leading-5 text-white/65">{a.text}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

/* Slide 2 — QR Mess Attendance */
const MessAttendance = () => {
  const [dinnerWidth, setDinnerWidth] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    if (inView) { const t = setTimeout(() => setDinnerWidth(61), 300); return () => clearTimeout(t); }
    else setDinnerWidth(0);
  }, [inView]);

  return (
    <div ref={ref} className="grid grid-cols-2">
      <div className="border-r border-white/[0.07] p-6">
        <p className="font-display text-lg font-bold text-white">Mess Attendance</p>
        <p className="mb-5 mt-1 text-xs text-white/40">QR scan — Dinner session</p>
        <div className="mb-5 flex h-32 w-32 items-center justify-center rounded-xl bg-white p-3">
          <svg viewBox="0 0 7 7" className="h-full w-full">
            <rect x="0" y="0" width="3" height="3" fill="#071018" rx="0.3" />
            <rect x="0.3" y="0.3" width="2.4" height="2.4" fill="white" rx="0.2" />
            <rect x="0.6" y="0.6" width="1.8" height="1.8" fill="#071018" rx="0.1" />
            <rect x="4" y="0" width="3" height="3" fill="#071018" rx="0.3" />
            <rect x="4.3" y="0.3" width="2.4" height="2.4" fill="white" rx="0.2" />
            <rect x="4.6" y="0.6" width="1.8" height="1.8" fill="#071018" rx="0.1" />
            <rect x="0" y="4" width="3" height="3" fill="#071018" rx="0.3" />
            <rect x="0.3" y="4.3" width="2.4" height="2.4" fill="white" rx="0.2" />
            <rect x="0.6" y="4.6" width="1.8" height="1.8" fill="#071018" rx="0.1" />
            <rect x="3.5" y="3.5" width="0.6" height="0.6" fill="#071018" />
            <rect x="4.2" y="3.5" width="0.6" height="0.6" fill="#071018" />
            <rect x="5" y="3.8" width="0.6" height="0.6" fill="#071018" />
            <rect x="3.5" y="4.4" width="1.1" height="0.6" fill="#071018" />
            <rect x="5" y="4.4" width="0.6" height="0.6" fill="#071018" />
            <rect x="4.2" y="5.2" width="0.6" height="0.6" fill="#071018" />
            <rect x="5" y="5.2" width="1" height="0.6" fill="#071018" />
          </svg>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/40">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Scanner active
        </div>
      </div>
      <div className="p-6">
        <p className="mb-4 text-[10px] uppercase tracking-[0.16em] text-white/40">Today's Attendance</p>
        {[{ label: "Breakfast", pct: 87, color: "#14b8a6" }, { label: "Lunch", pct: 72, color: "#f97316" }].map((b) => (
          <div key={b.label} className="mb-4">
            <div className="mb-1.5 flex justify-between text-xs text-white/50"><span>{b.label}</span><span>{b.pct}%</span></div>
            <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
              <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${b.pct}%`, background: b.color }} />
            </div>
          </div>
        ))}
        <div className="mb-6">
          <div className="mb-1.5 flex justify-between text-xs text-white/50"><span>Dinner</span><span className="text-amber-300">Live</span></div>
          <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
            <div className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${dinnerWidth}%`, background: "linear-gradient(to right,#a78bfa,#818cf8)" }} />
          </div>
        </div>
        <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-white/40">Risk Flags Today</p>
        <p className="font-display text-3xl font-bold text-orange-400">7</p>
        <p className="mt-1 text-[10px] text-white/30">students with 3+ misses this week</p>
      </div>
    </div>
  );
};

/* Slide 3 — Health Check-in */
const HealthCheckin = () => {
  const [riskWidth, setRiskWidth] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    if (inView) { const t = setTimeout(() => setRiskWidth(63), 300); return () => clearTimeout(t); }
    else setRiskWidth(0);
  }, [inView]);

  return (
    <div ref={ref} className="grid grid-cols-2">
      <div className="border-r border-white/[0.07] p-6">
        <p className="font-display text-lg font-bold text-white">Daily Check-in</p>
        <p className="mb-5 mt-1 text-xs text-white/35">Friday, June 7, 2026 · Hostel C</p>
        {[
          { label: "Sleep quality", val: "6/10", color: "#a78bfa" },
          { label: "Energy level", val: "4/10", color: "#fbbf24" },
          { label: "Stress level", val: "7/10", color: "#f97316" },
          { label: "Appetite", val: "5/10", color: "#14b8a6" },
        ].map((m) => (
          <div key={m.label} className="mb-2.5 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-3 transition-all hover:border-white/20">
            <span className="text-xs text-white/55">{m.label}</span>
            <span className="font-display text-base font-bold" style={{ color: m.color }}>{m.val}</span>
          </div>
        ))}
      </div>
      <div className="p-6">
        <p className="mb-3 text-[10px] uppercase tracking-[0.14em] text-white/35">7-day trend</p>
        <svg viewBox="0 0 180 60" className="mb-2 w-full overflow-visible" height="60">
          <polyline points="0,45 30,40 60,50 90,30 120,35 150,20 180,25" fill="none" stroke="rgba(167,139,250,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="0,50 30,48 60,42 90,45 120,38 150,32 180,28" fill="none" stroke="rgba(20,184,166,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="180" cy="25" r="3" fill="#a78bfa" />
          <circle cx="180" cy="28" r="3" fill="#14b8a6" />
        </svg>
        <div className="mb-5 flex gap-3">
          {[{ color: "#a78bfa", label: "Sleep" }, { color: "#14b8a6", label: "Energy" }].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="h-0.5 w-4 rounded-full" style={{ background: l.color }} />
              <span className="text-[10px] text-white/35">{l.label}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
          <p className="mb-3 text-[10px] uppercase tracking-[0.14em] text-white/35">AI Risk Score</p>
          <div className="mb-3 h-2 overflow-hidden rounded-full bg-white/[0.07]">
            <div className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${riskWidth}%`, background: "linear-gradient(to right,#34d399,#fbbf24,#f97316)" }} />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display text-2xl font-bold text-white">0.63</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-orange-400/80">Moderate Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// const ScreenshotsSection = () => {
//   const [current, setCurrent] = useState(0);
//   const prev = () => setCurrent((c) => (c - 1 + screenshotSlides.length) % screenshotSlides.length);
//   const next = () => setCurrent((c) => (c + 1) % screenshotSlides.length);

//   const slideContents = [<WardenDashboard key="w" />, <MessAttendance key="m" />, <HealthCheckin key="h" />];

//   return (
//     <motion.section
//       id="screenshots"
//       className="relative border-y border-emerald-200/10 px-5 py-24 md:px-10"
//       style={{ background: "rgba(6,18,15,0.9)" }}
//       initial="hidden"
//       whileInView="visible"
//       viewport={sectionViewport}
//     >
//       <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={gridBg} />
//       <div className="container relative">
//         <motion.div variants={fadeUp} className="mb-14 text-center">
//           <p className="font-mono text-xs uppercase tracking-[0.28em] text-violet-200/80">Interface</p>
//           <h2 className="mt-3 font-display text-5xl md:text-6xl">Screenshots</h2>
//           <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-emerald-50/55">
//             Live UI mockups showing the warden dashboard, QR attendance, and student health check-in flows.
//           </p>
//         </motion.div>

//         <motion.div variants={fadeUp}>
//           <div className="relative overflow-hidden">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={current}
//                 initial={{ opacity: 0, x: 40, scale: 0.98 }}
//                 animate={{ opacity: 1, x: 0, scale: 1 }}
//                 exit={{ opacity: 0, x: -40, scale: 0.98 }}
//                 transition={{ duration: 0.4, ease: "easeOut" }}
//               >
//                 <BrowserFrame url={screenshotSlides[current].url}>
//                   {slideContents[current]}
//                 </BrowserFrame>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           <div className="mt-8 flex items-center justify-between">
//             <div>
//               <p className="font-display text-lg font-semibold text-white">{screenshotSlides[current].tag}</p>
//               <p className="text-sm text-white/40">{screenshotSlides[current].subtitle}</p>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2">
//                 {screenshotSlides.map((_, i) => (
//                   <button key={i} onClick={() => setCurrent(i)}
//                     className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-violet-400" : "w-2 bg-white/20 hover:bg-white/40"}`} />
//                 ))}
//               </div>
//               <div className="flex gap-2">
//                 <button onClick={prev}
//                   className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all hover:border-violet-400/50 hover:bg-violet-400/10 hover:text-white">
//                   <ArrowLeft size={16} />
//                 </button>
//                 <button onClick={next}
//                   className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all hover:border-violet-400/50 hover:bg-violet-400/10 hover:text-white">
//                   <ArrowRight size={16} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </motion.section>
//   );
// };
// ─── SCREENSHOTS CAROUSEL (using real imported images) ────────────────────────

const ScreenshotsSection = () => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + screenshots.length) % screenshots.length);
  const next = () => setCurrent((c) => (c + 1) % screenshots.length);

  const slideLabels = [
    { tag: "WellSphere Homepage",      subtitle: "Landing & Overview",        url: "wellsphere.app/home",           accent: "#14b8a6" },
    { tag: "Warden Dashboard",         subtitle: "Risk Command Center",        url: "wellsphere.app/warden",         accent: "#f97316" },
    { tag: "Master Admin Panel",       subtitle: "System-Wide Controls",       url: "wellsphere.app/admin",          accent: "#a78bfa" },
    { tag: "Master Admin Overview",    subtitle: "Analytics & Management",     url: "wellsphere.app/admin/overview", accent: "#34d399" },
  ];

  return (
    <motion.section
      id="screenshots"
      className="relative border-y border-emerald-200/10 px-5 py-24 md:px-10"
      style={{ background: "rgba(6,18,15,0.9)" }}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={gridBg} />
      <div className="container relative">
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-14 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-violet-200/80">Interface</p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">Screenshots</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-emerald-50/55">
            Real screens from the WellSphere platform — homepage, warden dashboard, and admin panel.
          </p>
        </motion.div>

        {/* Browser frame + image */}
        <motion.div variants={fadeUp}>
          <div className="overflow-hidden rounded-2xl border border-emerald-200/15 bg-[#061210] shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-emerald-200/[0.08] bg-[#071312]/90 px-5 py-3">
              <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <div className="h-3 w-3 rounded-full bg-[#28c840]" />
              <div className="mx-3 flex-1 rounded-md bg-white/[0.06] px-3 py-1.5 font-mono text-[11px] text-white/35">
                {slideLabels[current].url}
              </div>
            </div>

            {/* Animated image */}
            <div className="relative w-full overflow-hidden bg-[#04100e]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current}
                  src={screenshots[current]}
                  alt={slideLabels[current].tag}
                  initial={{ opacity: 0, x: 40, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -40, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full object-cover object-top"
                  style={{ maxHeight: "520px" }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Controls row */}
          <div className="mt-8 flex items-center justify-between">
            <div>
              <p className="font-display text-lg font-semibold text-white">{slideLabels[current].tag}</p>
              <p className="text-sm text-white/40">{slideLabels[current].subtitle}</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Dot indicators */}
              <div className="flex items-center gap-2">
                {screenshots.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current ? "w-6 bg-violet-400" : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
              {/* Arrow buttons */}
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all hover:border-violet-400/50 hover:bg-violet-400/10 hover:text-white"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={next}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all hover:border-violet-400/50 hover:bg-violet-400/10 hover:text-white"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// ─── TECH STACK (Doc 2 style with react-icons) ────────────────────────────────

const TechStackSection = () => (
  <motion.section
    id="techstack"
    className="relative border-y border-emerald-200/10 px-5 py-24 md:px-10"
    style={{ background: "rgba(6,20,17,0.9)" }}
    initial="hidden"
    whileInView="visible"
    viewport={sectionViewport}
  >
    <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={gridBg} />
    <div className="container relative">
      <motion.div variants={fadeUp} className="mb-12 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-emerald-200/80">Tech Stack</p>
        <h2 className="mt-3 font-display text-5xl md:text-6xl">Built With</h2>
      </motion.div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {techStack.map((tech) => {
          const Icon = tech.icon;
          return (
            <motion.div
              key={tech.name}
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group min-h-[210px] rounded-xl border border-emerald-200/12 bg-[#071613]/90 p-5 shadow-xl shadow-emerald-950/25 transition-all duration-300 hover:border-emerald-300/30 hover:shadow-[0_20px_50px_rgba(52,211,153,0.1)]"
            >
              <div
                className="flex h-20 w-20 items-center justify-center rounded-xl border border-emerald-200/15 bg-black/25 transition-all duration-300 group-hover:border-emerald-200/35"
                style={{ color: tech.tone }}
              >
                <Icon size={42} />
              </div>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/55">{tech.label}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{tech.name}</h3>
              <p className="mt-3 text-sm leading-6 text-emerald-50/60">{tech.detail}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </motion.section>
);

// ─── DEMO VIDEO (Doc 2 BrowserTopBar style) ───────────────────────────────────

const BrowserTopBar = ({ title }: { title: string }) => (
  <div className="flex h-10 items-center gap-2 border-b border-emerald-200/10 bg-[#071312] px-4">
    <span className="h-2.5 w-2.5 rounded-sm bg-emerald-300/70" />
    <span className="h-2.5 w-2.5 rounded-sm bg-lime-200/60" />
    <span className="h-2.5 w-2.5 rounded-sm bg-teal-200/60" />
    <div className="ml-3 h-5 flex-1 rounded bg-emerald-950/70 px-3 font-mono text-[10px] leading-5 text-emerald-100/45">
      wellsphere.app/{title.toLowerCase().replaceAll(" ", "-")}
    </div>
  </div>
);

const DemoSection = () => (
  <motion.section
    id="demo"
    className="relative px-5 py-24 md:px-10"
    initial="hidden"
    whileInView="visible"
    viewport={sectionViewport}
    variants={fadeUp}
  >
    <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={gridBg} />
    <div className="container relative grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-emerald-200/80">Demo Video</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">Walkthrough in a desktop frame.</h2>
        <p className="mt-5 text-sm leading-7 text-emerald-50/65">
          The frame is ready for your real MP4 walkthrough and already reads from the public demo video slot.
        </p>
      </div>
<motion.div
  whileHover={{ y: -6 }}
  className="w-full max-w-6xl rounded-xl border border-emerald-200/15 bg-[#061210] p-3 shadow-2xl shadow-emerald-950/40"
>
        <div className="overflow-hidden rounded-lg border border-emerald-200/10 bg-[#071312]">
          <BrowserTopBar title="demo-video" />
          <div className="bg-black">
            <video className="aspect-video w-full object-cover" src="/WellSphere.mp4" controls playsInline preload="metadata" />
          </div>
        </div>
        <div className="mx-auto h-4 w-1/3 rounded-b-lg bg-emerald-200/10" />
      </motion.div>
    </div>
  </motion.section>
);

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────

const WellSphereProject = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#04100e] text-white">
      {/* Global grid overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.06]" style={gridBg} />

      <CustomCursor />

      {/* ── Header ── */}
      <header
  className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-5 transition-all duration-300 md:px-10"
  style={{
    background: scrolled ? "rgba(4,16,14,0.88)" : "transparent",
    backdropFilter: scrolled ? "blur(18px)" : "none",
    borderBottom: scrolled
      ? "1px solid rgba(98,255,210,0.12)"
      : "1px solid transparent",
  }}
>
  <Link
    to="/"
    className="flex items-center gap-2 text-sm font-semibold text-emerald-50/70 transition hover:text-white"
  >
    <ArrowLeft size={16} />
    Portfolio
  </Link>

  <span className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-200/70 sm:block">
    WellSphere
  </span>

  <div className="flex items-center gap-2">
    <a
      href="https://github.com/alfiyakarbhari/WellSphere"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-white/70 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
    >
      <SiGithub size={14} />
      GitHub
    </a>

    <a
      href="#demo"
      className="flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-xs font-semibold text-emerald-100 transition hover:border-emerald-200/60 hover:bg-emerald-300/15"
    >
      <Video size={14} />
      Demo
    </a>
  </div>
</header>

      <main className="relative z-10">

        {/* ── Hero ── */}
        <section className="relative min-h-screen overflow-hidden px-5 pt-28 md:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(20,184,166,0.18),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(106,255,193,0.13),transparent_25%),linear-gradient(135deg,#071018_0%,#0b1f1b_48%,#06110f_100%)]" />
          <div className="absolute inset-0 opacity-[0.08]" style={gridBg} />

          <div className="container relative grid min-h-[calc(100vh-7rem)] items-center gap-10 pb-16 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-200/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-100">
                <Sparkles size={14} />
                Smart Campus Health Intelligence
              </div>
              <h1 className="max-w-4xl font-display text-5xl leading-[0.98] text-white md:text-7xl">
                WellSphere turns hostel life into early health signals.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-emerald-50/70 md:text-lg">
                An AI-powered Smart Campus and Hostel Health Intelligence System that combines attendance, mess behavior, health logs, grievances, and student self-reports to spot well-being risks before they escalate.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {roles.map((role) => (
                  <motion.span key={role} whileHover={{ y: -3 }}
                    className="rounded-full border border-emerald-200/15 bg-emerald-200/[0.055] px-3 py-1.5 text-xs text-emerald-50/80">
                    {role}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="relative"
            >
              <div className="rounded-lg border border-white/10 bg-[#091520]/90 p-4 shadow-2xl shadow-black/40 backdrop-blur">
                <div className="mb-4 flex items-center justify-between border-b border-emerald-200/10 pb-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-200/70">Live Risk Board</p>
                    <h2 className="mt-1 text-xl font-semibold text-white">Hostel C - Evening Scan</h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-300/10 text-emerald-200">
                    <HeartPulse size={24} />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {metrics.map((m) => <SignalCard key={m.label} {...m} />)}
                </div>
                <div className="mt-5 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
                  <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                    <p className="mb-4 text-sm font-semibold text-white">Risk Composition</p>
                    {["Mess absence spike", "Health fatigue score", "Negative feedback shift", "Grievance frequency"].map((item, index) => (
                      <div key={item} className="mb-4 last:mb-0">
                        <div className="mb-2 flex justify-between text-xs text-emerald-50/70">
                          <span>{item}</span><span>{[84, 67, 58, 42][index]}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-emerald-950">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${[84, 67, 58, 42][index]}%` }}
                            transition={{ duration: 1.2, delay: 0.3 + index * 0.12 }}
                            className="h-full rounded-full bg-gradient-to-r from-emerald-200 via-teal-300 to-lime-200"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                    <p className="mb-4 text-sm font-semibold text-white">Alert Stream</p>
                    {[
                      ["High", "Student skipped 4 mess scans and reported low sleep."],
                      ["Review", "Mess feedback pattern flagged for unusual similarity."],
                      ["Stable", "Medical follow-up completed for prior alert."],
                    ].map(([level, text]) => (
                      <motion.div key={text} whileHover={{ x: 4 }}
                        className="mb-3 rounded-md border border-emerald-200/10 bg-[#04100e]/75 p-3 last:mb-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200/55">{level}</p>
                        <p className="mt-1 text-sm leading-6 text-emerald-50/75">{text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Problem ── */}
        <motion.section id="problem" className="relative px-5 py-24 md:px-10"
          initial="hidden" whileInView="visible" viewport={sectionViewport} variants={fadeUp}>
          <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={gridBg} />
          <div className="container relative grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange-200">Problem</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">Hostel systems see records, not risk.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["Fragmented signals", "Attendance, food habits, grievances, and health notes live in separate corners."],
                ["Late intervention", "Students often receive help only after symptoms or behavior become obvious."],
                ["Noisy feedback", "Mess reviews can be emotional, duplicated, fake, or disconnected from attendance."],
              ].map(([title, text]) => (
                <motion.div key={title} whileHover={{ y: -6 }}
                  className="rounded-lg border border-emerald-200/12 bg-[#071613]/85 p-6">
                  <AlertTriangle className="mb-5 text-orange-300" size={24} />
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-emerald-50/65">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── Solution ── */}
        <motion.section id="solution" className="relative border-y border-emerald-200/10 px-5 py-24 md:px-10"
          style={{ background: "rgba(6,18,15,0.7)" }}
          initial="hidden" whileInView="visible" viewport={sectionViewport} variants={fadeUp}>
          <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={gridBg} />
          <div className="container relative grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-200">Solution</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">A preventive layer over hostel management.</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-emerald-50/70">
                WellSphere does more than administer rooms and mess records. It reads the rhythm of campus life, detects unusual health and behavior patterns, and helps wardens or medical staff intervene with context.
              </p>
            </div>
            <motion.div whileHover={{ rotate: -1, y: -5 }}
              className="rounded-lg border border-emerald-200/15 bg-[#071613] p-6 shadow-xl shadow-emerald-950/30">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-300/10 text-emerald-200">
                  <BadgeCheck size={24} />
                </div>
                <div>
                  <p className="text-sm text-emerald-50/55">Model result</p>
                  <p className="text-2xl font-semibold text-white">Recall improved from 0.69 to 0.83</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-emerald-50/65">
                That jump makes the system stronger for early intervention, where missing a risky case matters more than simply keeping the dashboard quiet.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ── Pipeline ── */}
        <motion.section id="pipeline" className="relative px-5 py-24 md:px-10"
          initial="hidden" whileInView="visible" viewport={sectionViewport}>
          <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={gridBg} />
          <div className="container relative">
            <motion.div variants={fadeUp}>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet-200">The Pipeline</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">From campus touchpoints to action.</h2>
            </motion.div>
            <div className="mt-12 grid gap-4 lg:grid-cols-5">
              {pipeline.map((step, index) => (
                <motion.div key={step.title} variants={fadeUp} whileHover={{ y: -8 }}
                  className="relative overflow-hidden rounded-lg border border-emerald-200/12 bg-[#071613]/85 p-5">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
                  <span className="font-mono text-xs text-emerald-200/45">0{index + 1}</span>
                  <step.icon className="mt-5 text-emerald-200" size={26} />
                  <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-emerald-50/65">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── TIMELINE (Doc 2 zigzag) ── */}
        <TimelineSection />

        {/* ── Features ── */}
        <motion.section id="features" className="relative px-5 py-24 md:px-10"
          initial="hidden" whileInView="visible" viewport={sectionViewport}>
          <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={gridBg} />
          <div className="container relative">
            <motion.div variants={fadeUp}>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-200">Features</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">Controls for every campus role.</h2>
            </motion.div>
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <motion.div key={feature.title} variants={fadeUp} whileHover={{ y: -7 }}
                  className="rounded-lg border border-emerald-200/12 bg-[#071613]/85 p-6">
                  <feature.icon className="text-emerald-200" size={28} />
                  <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-emerald-50/65">{feature.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── SCREENSHOTS CAROUSEL ── */}
        <ScreenshotsSection />

        {/* ── Challenges ── */}
        <motion.section id="challenges" className="relative px-5 py-24 md:px-10"
          initial="hidden" whileInView="visible" viewport={sectionViewport}>
          <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={gridBg} />
          <div className="container relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <motion.div variants={fadeUp}>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange-200">Challenges &amp; Learnings</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">The hard part was making alerts trustworthy.</h2>
            </motion.div>
            <motion.div variants={fadeUp} className="grid gap-3">
              {challenges.map((item) => (
                <motion.div key={item} whileHover={{ x: 6 }}
                  className="flex gap-4 rounded-lg border border-emerald-200/12 bg-[#071613]/85 p-5">
                  <CheckCircle2 className="mt-1 shrink-0 text-emerald-200" size={20} />
                  <p className="text-sm leading-7 text-emerald-50/65">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ── TECH STACK (Doc 2) ── */}
        <TechStackSection />

        {/* ── DEMO VIDEO (Doc 2) ── */}
        <DemoSection />

        {/* ── Summary ── */}
        <motion.section id="summary" className="relative px-5 pb-28 md:px-10"
          initial="hidden" whileInView="visible" viewport={sectionViewport} variants={fadeUp}>
          <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={gridBg} />
          <div className="container relative rounded-xl border border-emerald-200/15 bg-gradient-to-br from-emerald-300/12 via-[#071613] to-lime-200/8 p-8 shadow-2xl shadow-emerald-950/30 md:p-10">
            <div className="flex items-start gap-4">
              <Stethoscope className="mt-2 shrink-0 text-emerald-200" size={28} />
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-100">Concise Summary</p>
                <h2 className="mt-3 font-display text-3xl md:text-4xl">
                  WellSphere is a preventive AI-driven hostel management system.
                </h2>
                <p className="mt-5 max-w-4xl text-sm leading-8 text-emerald-50/70 md:text-base">
                  It combines administrative and health data to detect student well-being risks early, support timely intervention, and evolve toward explainable, personalized, real-world campus health intelligence.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
};

export default WellSphereProject;
