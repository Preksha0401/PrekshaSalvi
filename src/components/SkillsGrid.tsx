import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  { icon: "💻", title: "Languages & Databases", tags: ["Java", "Python", "C", "C++", "JavaScript", "HTML/CSS", "MongoDB"] },
  { icon: "⚛️", title: "Frameworks & Libraries", tags: ["React", "Node.js", "Express.js", "Bootstrap", "REST APIs"] },
  { icon: "🛠️", title: "Tools & Design", tags: ["Git", "GitHub", "VSCode", "Figma", "Canva", "Linux"] },
  { icon: "🏆", title: "Competitive Platforms", tags: ["LeetCode", "HackerRank", "DSA", "Consistent Practice"] },
];

const SkillsGrid = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20">
      <div className="container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="section-eyebrow mb-2.5">Tech Arsenal</div>
          <h2 className="section-title">Technical <em>Skills</em></h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
          {skills.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-6 group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hoverable"
              style={{ boxShadow: "0 2px 14px hsla(306,55%,33%,0.06)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "var(--gradient-primary)" }} />
              <div className="text-[22px] mb-3">{s.icon}</div>
              <div className="font-display text-sm font-bold text-foreground mb-3">{s.title}</div>
              <div className="flex flex-wrap gap-[7px]">
                {s.tags.map((t) => (
                  <span key={t} className="tag-pill hoverable">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsGrid;
