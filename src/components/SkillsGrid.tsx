import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillGroups = [
  {
    icon: "🔤",
    title: "Languages & Databases",
    tags: ["Java", "Python", "C", "C++", "JavaScript", "HTML/CSS", "MongoDB"],
    accent: "cyan",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-2",
  },
  {
    icon: "⚛️",
    title: "Frontend",
    tags: ["React", "Bootstrap", "Tailwind CSS", "Responsive Design"],
    accent: "violet",
    colSpan: "lg:col-span-1",
    rowSpan: "",
  },
  {
    icon: "🖧",
    title: "Backend",
    tags: ["Node.js", "Express.js", "REST APIs", "MongoDB"],
    accent: "emerald",
    colSpan: "lg:col-span-1",
    rowSpan: "",
  },
  {
    icon: "🛠️",
    title: "Tools & Design",
    tags: ["Git", "GitHub", "VSCode", "Figma", "Canva", "Linux"],
    accent: "amber",
    colSpan: "lg:col-span-1",
    rowSpan: "",
  },
  {
    icon: "🏆",
    title: "Competitive & Achievements",
    tags: ["LeetCode", "HackerRank", "DSA", "Consistent Practice"],
    accent: "pink",
    colSpan: "lg:col-span-1",
    rowSpan: "",
  },
];

const accentMap: Record<string, { bg: string; border: string; text: string; glow: string; iconBg: string }> = {
  cyan: {
    bg: "hsla(186, 100%, 50%, 0.06)",
    border: "hsla(186, 100%, 50%, 0.18)",
    text: "hsl(186, 100%, 60%)",
    glow: "0 0 40px hsla(186, 100%, 50%, 0.15)",
    iconBg: "hsla(186, 100%, 50%, 0.12)",
  },
  violet: {
    bg: "hsla(270, 80%, 60%, 0.06)",
    border: "hsla(270, 80%, 60%, 0.18)",
    text: "hsl(270, 80%, 70%)",
    glow: "0 0 40px hsla(270, 80%, 60%, 0.15)",
    iconBg: "hsla(270, 80%, 60%, 0.12)",
  },
  emerald: {
    bg: "hsla(160, 80%, 45%, 0.06)",
    border: "hsla(160, 80%, 45%, 0.18)",
    text: "hsl(160, 70%, 55%)",
    glow: "0 0 40px hsla(160, 80%, 45%, 0.15)",
    iconBg: "hsla(160, 80%, 45%, 0.12)",
  },
  amber: {
    bg: "hsla(38, 90%, 55%, 0.06)",
    border: "hsla(38, 90%, 55%, 0.18)",
    text: "hsl(38, 90%, 65%)",
    glow: "0 0 40px hsla(38, 90%, 55%, 0.15)",
    iconBg: "hsla(38, 90%, 55%, 0.12)",
  },
  pink: {
    bg: "hsla(316, 65%, 60%, 0.06)",
    border: "hsla(316, 65%, 60%, 0.18)",
    text: "hsl(316, 65%, 70%)",
    glow: "0 0 40px hsla(316, 65%, 60%, 0.15)",
    iconBg: "hsla(316, 65%, 60%, 0.12)",
  },
};

const SkillsGrid = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none" style={{ background: "hsl(var(--mag))" }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px] pointer-events-none" style={{ background: "hsl(var(--cyan))" }} />

      {/* Subtle star particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: "hsla(38, 33%, 93%, 0.3)",
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="section-eyebrow mb-3 justify-center">Tech Arsenal</div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            Technical <em className="not-italic gradient-text">Skills</em>
          </h2>
          <p className="mt-4 text-muted-foreground text-sm max-w-md mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            A curated stack of languages, frameworks, and tools I work with daily.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
          {skillGroups.map((s, i) => {
            const colors = accentMap[s.accent];
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                className={`group relative rounded-2xl p-6 ${s.colSpan} ${s.rowSpan} overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hoverable`}
                style={{
                  background: `linear-gradient(160deg, ${colors.bg}, hsla(260, 40%, 8%, 0.85))`,
                  border: `1px solid ${colors.border}`,
                  backdropFilter: "blur(20px)",
                  boxShadow: `0 8px 32px hsla(260, 60%, 5%, 0.5), ${colors.glow}`,
                }}
              >
                {/* Hover glow border shimmer */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, transparent 30%, ${colors.border} 50%, transparent 70%)`,
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "xor",
                    WebkitMaskComposite: "xor",
                    padding: "1px",
                  }}
                />

                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `linear-gradient(90deg, transparent, ${colors.text}, transparent)` }}
                />

                {/* Icon tile */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: colors.iconBg,
                    boxShadow: `0 4px 16px ${colors.bg}`,
                  }}
                >
                  {s.icon}
                </div>

                {/* Title */}
                <h3
                  className="text-sm font-bold mb-4 tracking-wide"
                  style={{ fontFamily: "var(--font-body)", color: colors.text }}
                >
                  {s.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] tracking-wide px-3 py-1.5 rounded-full font-medium transition-all duration-200 hover:-translate-y-0.5 hoverable"
                      style={{
                        fontFamily: "var(--font-body)",
                        background: colors.bg,
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsGrid;
