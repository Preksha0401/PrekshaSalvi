import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { Code2, Database, Wrench, Trophy, Heart, Mic, BarChart2, Users } from "lucide-react";
import {
  FaJava, FaPython, FaJs, FaReact, FaNodeJs,
  FaGitAlt, FaGithub, FaFigma, FaBootstrap, FaHtml5, FaCss3Alt,
} from "react-icons/fa";
import {
  SiC, SiCplusplus, SiMongodb, SiExpress, SiCanva, SiLeetcode, SiHackerrank,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

/* ─── NOTE: animate is intentionally NOT imported from framer-motion
   to avoid the naming collision with the motion animation system.
   Counter uses a plain requestAnimationFrame loop instead. ─── */

/* ─────────── static data (defined outside component to avoid re-creation) ─── */

const SKILLS = [
  {
    title: "Languages & Databases",
    SectionIcon: Database,
    accent: "#2F6BFF",
    glowColor: "rgba(47,107,255,0.18)",
    items: [
      { name: "Java",       Icon: FaJava,      pct: 90, lucide: false },
      { name: "Python",     Icon: FaPython,    pct: 85, lucide: false },
      { name: "C",          Icon: SiC,         pct: 80, lucide: false },
      { name: "C++",        Icon: SiCplusplus, pct: 80, lucide: false },
      { name: "JavaScript", Icon: FaJs,        pct: 90, lucide: false },
      { name: "HTML",       Icon: FaHtml5,     pct: 95, lucide: false },
      { name: "CSS",        Icon: FaCss3Alt,   pct: 88, lucide: false },
      { name: "MongoDB",    Icon: SiMongodb,   pct: 75, lucide: false },
    ],
  },
  {
    title: "Frameworks & Libraries",
    SectionIcon: Code2,
    accent: "#B13D9D",
    glowColor: "rgba(177,61,157,0.18)",
    items: [
      { name: "React",      Icon: FaReact,     pct: 95, lucide: false },
      { name: "Node.js",    Icon: FaNodeJs,    pct: 90, lucide: false },
      { name: "Express.js", Icon: SiExpress,   pct: 85, lucide: false },
      { name: "Bootstrap",  Icon: FaBootstrap, pct: 80, lucide: false },
    ],
  },
  {
    title: "Tools & Design",
    SectionIcon: Wrench,
    accent: "#D6B36A",
    glowColor: "rgba(214,179,106,0.18)",
    items: [
      { name: "Git",     Icon: FaGitAlt,  pct: 90, lucide: false },
      { name: "GitHub",  Icon: FaGithub,  pct: 95, lucide: false },
      { name: "VS Code", Icon: VscVscode, pct: 95, lucide: false },
      { name: "Figma",   Icon: FaFigma,   pct: 80, lucide: false },
      { name: "Canva",   Icon: SiCanva,   pct: 75, lucide: false },
    ],
  },
  {
    title: "Competitive Platforms",
    SectionIcon: Trophy,
    accent: "#C98B8B",
    glowColor: "rgba(201,139,139,0.18)",
    items: [
      { name: "LeetCode",      Icon: SiLeetcode,   pct: 85, lucide: false },
      { name: "HackerRank",    Icon: SiHackerrank, pct: 90, lucide: false },
      { name: "GeeksforGeeks", Icon: Code2,        pct: 78, lucide: true  },
    ],
  },
] as const;

const STATS = [
  { label: "Projects Built",    value: 5,  suffix: "+", Icon: Code2,      lucide: true  },
  { label: "Years of Learning", value: 2,   suffix: "+", Icon: BarChart2,  lucide: true  },
  { label: "LeetCode Problems", value: 250, suffix: "+", Icon: SiLeetcode, lucide: false },
  { label: "Hackathons",        value: 5,   suffix: "",  Icon: Trophy,     lucide: true  },
  { label: "Dedication",        value: 100, suffix: "%", Icon: Heart,      lucide: true  },
] as const;

const IDENTITY = [
  { Icon: Code2,     label: "Full Stack Developer"    },
  { Icon: BarChart2, label: "Data Science Enthusiast" },
  { Icon: Mic,       label: "Public Speaker"          },
  { Icon: Users,     label: "WIE Lead"                },
  { Icon: Heart,     label: "Creative Head"           },
] as const;

const TERMINAL_LINES = [
  "> loading skills.exe",
  "✓ Initializing...",
  "✓ Java",
  "✓ React",
  "✓ Node.js",
  "✓ MongoDB",
  "✓ Express.js",
  "✓ System Ready.",
  "> _",
];

const FLOATING = [
  { Icon: FaReact,   color: "#61DAFB", top: "8%",  left: "82%", size: 36, dur: 6   },
  { Icon: FaNodeJs,  color: "#68A063", top: "72%", left: "88%", size: 30, dur: 7   },
  { Icon: FaPython,  color: "#FFD43B", top: "18%", left: "4%",  size: 28, dur: 5   },
  { Icon: SiMongodb, color: "#4DB33D", top: "78%", left: "3%",  size: 26, dur: 8   },
  { Icon: FaJs,      color: "#F7DF1E", top: "50%", left: "92%", size: 24, dur: 6.5 },
];

/* ─────────── Counter: plain rAF, zero framer-motion, zero crash risk ─── */
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const elRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(wrapRef, { once: true });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current || !elRef.current) return;
    started.current = true;
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      if (elRef.current) {
        elRef.current.textContent = Math.round(eased * to) + suffix;
      }
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, suffix]);

  return (
    <span ref={wrapRef}>
      <span ref={elRef}>0{suffix}</span>
    </span>
  );
}

/* ─────────── TiltCard ─── */
function TiltCard({ children, glowColor }: { children: React.ReactNode; glowColor: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-5, 5]);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  }, [mx, my]);

  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      transition={{ type: "spring", stiffness: 250, damping: 26 }}
      className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl p-6 md:p-7 cursor-default h-full
                 shadow-[0_12px_32px_rgba(0,0,0,0.28)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.38)] transition-shadow duration-300"
    >
      {children}
    </motion.div>
  );
}

/* ─────────── SkillRow ─── */
function SkillRow({ Icon, name, pct, accent, delay, lucide }: {
  Icon: any; name: string; pct: number; accent: string; delay: number; lucide: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="flex flex-col gap-[5px]">
      <div className="flex items-center justify-between" style={{ fontSize: "0.75rem" }}>
        <span className="flex items-center gap-1.5 text-white/75">
          {lucide
            ? <Icon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: accent }} strokeWidth={1.8} />
            : <Icon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: accent }} />
          }
          {name}
        </span>
        <span className="text-white/40 tabular-nums">{pct}%</span>
      </div>
      <div className="h-[3px] w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}77, ${accent})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 0.85, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}

/* ─────────── Terminal ─── */
function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const fired = useRef(false);

  useEffect(() => {
    if (!inView || fired.current) return;
    fired.current = true;
    let idx = 0;
    const id = setInterval(() => {
      if (idx < TERMINAL_LINES.length) {
        const line = TERMINAL_LINES[idx];
        setLines(prev => [...prev, line]);
        idx++;
      } else {
        clearInterval(id);
      }
    }, 330);
    return () => clearInterval(id);
  }, [inView]);

  const colorClass = (l: string) =>
    l.startsWith(">") ? "text-[#c084fc]" : l.startsWith("✓") ? "text-[#4ade80]" : "text-white/55";

  return (
    <div ref={ref} className="rounded-2xl border border-white/[0.08] bg-black/50 backdrop-blur-xl p-4 font-mono text-xs leading-6 h-full">
      <div className="flex gap-1.5 mb-3">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
      </div>
      {lines.map((l, i) => (
        <div key={i} className={colorClass(l)}>{l}</div>
      ))}
      {lines.length > 0 && lines.length < TERMINAL_LINES.length && (
        <span className="inline-block w-1.5 h-3.5 bg-[#c084fc] animate-pulse ml-0.5 align-middle" />
      )}
    </div>
  );
}

/* ─────────── main ─── */
const SkillsGrid = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">

      {/* ambient blobs — transparent, your global bg shows through */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-[8%]  top-20  h-72 w-72 rounded-full bg-[#2F6BFF]/[0.09] blur-[130px]" />
        <div className="absolute right-[6%] top-28  h-80 w-80 rounded-full bg-[#B13D9D]/[0.09] blur-[150px]" />
        <div className="absolute bottom-16 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#D6B36A]/[0.07] blur-[120px]" />
      </div>

      {/* floating tech icons */}
      {FLOATING.map(({ Icon, color, top, left, size, dur }, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute z-[2] opacity-[0.13]"
          style={{ top, left }}
          animate={{ y: [0, -14, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: dur, ease: "easeInOut", delay: i * 0.8 }}
          aria-hidden
        >
          <Icon style={{ color, fontSize: size }} />
        </motion.div>
      ))}

      <div className="container mx-auto max-w-[1400px] px-6 md:px-10" ref={sectionRef}>

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="mb-14"
        >
          <div className="section-eyebrow mb-3">Tech Arsenal</div>
          <h2 className="section-title mb-3">
            My Tech.{" "}
            <em className="gradient-text not-italic">My Superpower.</em>
          </h2>
          <p className="font-body text-base text-white/45 max-w-[420px]">
            A curated collection of technologies I use to build, create, and innovate meaningful digital experiences.
          </p>
        </motion.div>

        {/* bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">

          {/* LEFT: identity card + terminal */}
          <div className="lg:col-span-3 flex flex-col gap-5">

            {/* PREKSHA.EXE */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <TiltCard glowColor="rgba(177,61,157,0.25)">
                <div className="absolute inset-0 rounded-[28px] opacity-40"
                  style={{ background: "linear-gradient(135deg,rgba(177,61,157,0.15),rgba(47,107,255,0.08))" }} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-sm font-semibold tracking-wider px-3 py-1 rounded-lg"
                      style={{ background: "rgba(177,61,157,0.2)", border: "1px solid rgba(177,61,157,0.35)", color: "#e879f9" }}>
                      PREKSHA.EXE
                    </span>
                    <Heart className="h-4 w-4 text-[#e879f9] opacity-60" strokeWidth={1.6} />
                  </div>

                  <div className="flex flex-col gap-3 mb-5">
                    {IDENTITY.map(({ Icon: IdentIcon, label }, i) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.28 + i * 0.07 }}
                        className="flex items-center gap-3 text-sm text-white/70 hover:text-white/95 transition-colors duration-200 group"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg flex-shrink-0
                                        transition-transform duration-200 group-hover:scale-110"
                          style={{ background: "rgba(177,61,157,0.15)", border: "1px solid rgba(177,61,157,0.2)" }}>
                          <IdentIcon className="h-3.5 w-3.5 text-[#e879f9]" strokeWidth={1.6} />
                        </div>
                        <span className="font-body">{label}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-white/[0.07] pt-4">
                    <span className="font-mono text-xs text-[#c084fc] opacity-70">&gt; always learning_</span>
                    <span className="inline-block w-1.5 h-3 bg-[#c084fc] animate-pulse ml-1 align-middle opacity-70" />
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* terminal */}
            <motion.div
              className="h-[220px]"
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.16 }}
            >
              <Terminal />
            </motion.div>
          </div>

          {/* CENTER: 2×2 skill cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SKILLS.map((section, si) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 26 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.12 + si * 0.08 }}
              >
                <TiltCard glowColor={section.glowColor}>
                  <div className="absolute inset-0 rounded-[28px] opacity-45"
                    style={{ background: `radial-gradient(circle at top right,${section.accent}1a,transparent 65%)` }} />
                  <div className="absolute bottom-0 left-8 right-8 h-px opacity-20"
                    style={{ background: `linear-gradient(90deg,transparent,${section.accent},transparent)` }} />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0"
                        style={{ background: `${section.accent}1a`, border: `1px solid ${section.accent}44` }}>
                        <section.SectionIcon className="h-5 w-5" style={{ color: section.accent }} strokeWidth={1.8} />
                      </div>
                      <h3 className="font-display text-base md:text-lg font-semibold text-white/90 leading-tight">
                        {section.title}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-3 flex-1">
                      {section.items.map((item, ii) => (
                        <SkillRow
                          key={item.name}
                          Icon={item.Icon}
                          name={item.name}
                          pct={item.pct}
                          accent={section.accent}
                          delay={0.22 + si * 0.08 + ii * 0.04}
                          lucide={item.lucide}
                        />
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* RIGHT: orbit ring + pulse card */}
          <div className="lg:col-span-3 flex flex-col gap-5">

            {/* orbit ring */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              <TiltCard glowColor="rgba(47,107,255,0.2)">
                <div className="absolute inset-0 rounded-[28px] opacity-40"
                  style={{ background: "linear-gradient(135deg,rgba(47,107,255,0.12),rgba(177,61,157,0.08))" }} />
                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-5 py-4">

                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <motion.div
                      className="absolute inset-0 rounded-full border border-[#2F6BFF]/25"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
                    >
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#2F6BFF]"
                        style={{ boxShadow: "0 0 8px #2F6BFF" }} />
                    </motion.div>
                    <motion.div
                      className="absolute inset-5 rounded-full border border-[#B13D9D]/30"
                      animate={{ rotate: -360 }}
                      transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
                    >
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#B13D9D]"
                        style={{ boxShadow: "0 0 6px #B13D9D" }} />
                    </motion.div>
                    <div className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: "radial-gradient(circle,rgba(177,61,157,0.3),rgba(47,107,255,0.15))", border: "1px solid rgba(177,61,157,0.3)" }}>
                      <Code2 className="w-6 h-6 text-white/80" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="font-mono text-xs text-[#c084fc]/70 mb-1 tracking-wider uppercase">Stack depth</p>
                    <p className="font-display text-3xl font-bold text-white">
                      15<span className="text-[#B13D9D]">+</span>
                    </p>
                    <p className="font-body text-xs text-white/40 mt-0.5">Technologies mastered</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {["React", "Node", "Mongo", "Python", "Figma"].map(t => (
                      <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(177,61,157,0.15)", border: "1px solid rgba(177,61,157,0.25)", color: "#e2b4ff" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* equalizer pulse card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.28 }}
            >
              <TiltCard glowColor="rgba(214,179,106,0.2)">
                <div className="absolute inset-0 rounded-[28px] opacity-40"
                  style={{ background: "linear-gradient(135deg,rgba(214,179,106,0.12),rgba(201,139,139,0.08))" }} />
                <div className="relative z-10 text-center py-2">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-[#D6B36A]/60 mb-2">Always</p>
                  <p className="font-display text-xl font-bold text-white/90 leading-tight mb-4">
                    Creative<br />Problem Solver
                  </p>
                  {/* pure CSS equalizer — zero Framer involvement, zero crash risk */}
                  <div className="flex justify-center items-end gap-1" style={{ height: "22px" }}>
                    {[6, 14, 9, 18, 7, 12, 5].map((h, i) => (
                      <div
                        key={i}
                        style={{
                          width: "4px",
                          height: `${h}px`,
                          borderRadius: "2px",
                          background: "#D6B36A",
                          transformOrigin: "bottom",
                          animation: `eqBar 1.1s ease-in-out ${(i * 0.13).toFixed(2)}s infinite alternate`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>

          </div>
        </div>

        {/* stat counter row */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.38 }}
        >
          {STATS.map(({ label, value, suffix, Icon: StatIconComp, lucide }) => (
            <div key={label}
              className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-md px-5 py-4
                         hover:border-white/[0.14] transition-colors duration-300"
            >
              {lucide
                ? <StatIconComp className="h-5 w-5 text-[#B13D9D] flex-shrink-0" strokeWidth={1.6} />
                : <StatIconComp className="h-5 w-5 text-[#B13D9D] flex-shrink-0" />
              }
              <div>
                <p className="font-display text-2xl font-bold text-white leading-none mb-0.5">
                  <Counter to={value} suffix={suffix} />
                </p>
                <p className="font-body text-[11px] text-white/40 leading-tight">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>

      {/* global keyframe — injected once, avoids repeated style tags */}
      <style>{`
        @keyframes eqBar {
          from { transform: scaleY(0.35); opacity: 0.45; }
          to   { transform: scaleY(1);    opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default SkillsGrid;