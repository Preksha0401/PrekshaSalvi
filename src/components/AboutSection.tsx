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

const TimelineItem = ({
  item,
  index,
}: {
  item: (typeof timelineData)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative pl-10 pb-10 last:pb-0">
      <div className="absolute left-0 top-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="glow-dot"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="glass-panel p-5 md:p-6 rounded-[24px]"
        style={inView ? { boxShadow: "0 0 30px hsla(306,55%,33%,0.12)" } : {}}
      >
        <div className="font-body text-[10px] tracking-[2px] uppercase text-accent font-semibold mb-1">
          {item.year}
        </div>
        <h3 className="font-display text-lg md:text-[22px] font-bold text-foreground mb-1">
          {item.title}
        </h3>
        <div className="font-body text-[13px] text-accent font-medium mb-2">
          {item.org}
        </div>
        <p className="font-body text-[13px] md:text-[14px] text-muted-foreground leading-relaxed mb-3">
          {item.desc}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((t) => (
            <span key={t} className="tag-pill text-[12px] md:text-[13px]">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionH = sectionRef.current.offsetHeight;
      const winH = window.innerHeight;
      const scrolled = Math.max(
        0,
        Math.min(1, (winH - rect.top) / (sectionH + winH))
      );
      setProgress(scrolled);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="about" className="py-24 md:py-32" ref={sectionRef}>
      <div
        className="container mx-auto max-w-[1400px] px-6 md:px-10"
        ref={ref}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 xl:gap-16 items-start"
        >
          {/* LEFT: ABOUT */}
          <div className="lg:sticky lg:top-28">
            <div className="section-eyebrow mb-3">Who Am I</div>
            <h2 className="section-title mb-8">
              About <em>Me</em>
            </h2>

            <div className="glass-panel p-8 md:p-10 lg:p-12 rounded-[28px]">
              <p className="font-body text-[16px] md:text-[18px] text-muted-foreground leading-[1.9] mb-6">
                I'm{" "}
                <strong className="text-accent font-semibold">
                  Preksha Salvi
                </strong>
                , a Computer Engineering student at
                <strong className="text-foreground font-semibold">
                  {" "}
                  Sardar Patel Institute of Technology, Mumbai
                </strong>{" "}
                (CE '27). I'm passionate about building
                full-stack applications and crafting intuitive user experiences.
              </p>

              <p className="font-body text-[16px] md:text-[18px] text-muted-foreground leading-[1.9] mb-8">
                Currently pursuing a{" "}
                <strong className="text-accent font-semibold">
                  Minor in UI/UX Design from Pearl Academy
                </strong>
                , bridging the gap between code and design. Previously interned
                as a
                <strong className="text-foreground font-semibold">
                  {" "}
                  Data Science Intern at Corizo
                </strong>
                , working with Python's data ecosystem.
              </p>

              
            </div>
          </div>

          {/* RIGHT: TIMELINE */}
          <div>
            <div className="section-eyebrow mb-3">My Story</div>
            <h2 className="section-title mb-8">
              The <em>Journey</em>
            </h2>

            <div className="relative pl-2">
              {/* line bg */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

              {/* animated progress line */}
              <div
                className="absolute left-[7px] top-2 w-[2px]"
                style={{
                  height: `calc(${progress * 100}% - 8px)`,
                  background:
                    "linear-gradient(to bottom, hsl(var(--mag)), hsl(var(--cyan)))",
                  boxShadow: "0 0 12px hsla(186,100%,50%,0.35)",
                }}
              />

              <div className="space-y-1">
                {timelineData.map((item, i) => (
                  <TimelineItem key={i} item={item} index={i} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;