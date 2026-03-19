import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const timelineData = [
  {
    year: "2025 — Present",
    title: "Minors in UX Design",
    org: "Pearl Academy",
    desc: "Pursuing a minor in UX Design — exploring user research, wireframing, prototyping, and the psychology behind great digital experiences.",
    tags: ["UX Research", "Prototyping", "Figma", "Pearl Academy"],
  },
  {
    year: "2024",
    title: "Data Science Intern",
    org: "Corizo",
    desc: "Worked on real-world data science projects — data cleaning, exploratory analysis, visualization, and building basic ML models with Python's data ecosystem.",
    tags: ["Python", "Pandas", "NumPy", "Data Science", "Corizo"],
  },
  {
    year: "2023",
    title: "B.E. Computer Engineering",
    org: "SPIT, Mumbai",
    desc: "Started the formal CS journey at SPIT — data structures, algorithms, databases, and web development. Built the foundation for everything that followed.",
    tags: ["SPIT", "DSA", "C", "Java", "DBMS"],
  },
];

const TimelineItem = ({ item, index }: { item: typeof timelineData[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} mb-16`}>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`glass-panel p-6 md:w-[calc(50%-32px)] w-full ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}
        style={inView ? { boxShadow: "0 0 30px hsla(306,55%,33%,0.12)" } : {}}
      >
        <div className="font-body text-[10px] tracking-[2px] uppercase text-accent font-semibold mb-1">{item.year}</div>
        <h3 className="font-display text-lg font-bold text-foreground mb-1">{item.title}</h3>
        <div className="font-body text-[13px] text-accent font-medium mb-2">{item.org}</div>
        <p className="font-body text-[13px] text-muted-foreground leading-relaxed mb-3">{item.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((t) => (
            <span key={t} className="tag-pill text-[9px]">{t}</span>
          ))}
        </div>
      </motion.div>

      {/* Center dot — positioned on the line */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glow-dot"
        />
      </div>
    </div>
  );
};

const Timeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionH = sectionRef.current.offsetHeight;
      const winH = window.innerHeight;
      const scrolled = Math.max(0, Math.min(1, (winH - rect.top) / (sectionH + winH)));
      setProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="journey" className="py-20" ref={sectionRef}>
      <div className="container max-w-[900px]" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-eyebrow mb-2.5">My Story</div>
          <h2 className="section-title">The <em>Journey</em></h2>
        </motion.div>

        <div className="relative">
          {/* Center vertical line bg */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border" />

          {/* Animated progress line */}
          <div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-[2px] transition-none"
            style={{
              height: `${progress * 100}%`,
              background: `linear-gradient(to bottom, hsl(var(--mag)), hsl(var(--cyan)))`,
              boxShadow: "0 0 12px hsla(186,100%,50%,0.4)",
            }}
          />

          {timelineData.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
