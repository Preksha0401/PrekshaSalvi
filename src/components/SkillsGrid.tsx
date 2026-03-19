import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Database, Wrench, Trophy } from "lucide-react";
import {
  FaJava,
  FaPython,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaFigma,
  FaBootstrap,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import {
  SiC,
  SiCplusplus,
  SiMongodb,
  SiExpress,
  SiCanva,
  SiLeetcode,
  SiHackerrank,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const skills = [
  {
    title: "Languages & Databases",
    sectionIcon: Database,
    accent: "from-[#2F6BFF]/20 to-[#B13D9D]/10",
    items: [
      { name: "Java", icon: FaJava },
      { name: "Python", icon: FaPython },
      { name: "C", icon: SiC },
      { name: "C++", icon: SiCplusplus },
      { name: "JavaScript", icon: FaJs },
      { name: "HTML", icon: FaHtml5 },
      { name: "CSS", icon: FaCss3Alt },
      { name: "MongoDB", icon: SiMongodb },
    ],
  },
  {
    title: "Frameworks & Libraries",
    sectionIcon: Code2,
    accent: "from-[#B13D9D]/20 to-[#D6B36A]/10",
    items: [
      { name: "React", icon: FaReact },
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express.js", icon: SiExpress },
      { name: "Bootstrap", icon: FaBootstrap },
    ],
  },
  {
    title: "Tools & Design",
    sectionIcon: Wrench,
    accent: "from-[#D6B36A]/20 to-[#C98B8B]/10",
    items: [
      { name: "Git", icon: FaGitAlt },
      { name: "GitHub", icon: FaGithub },
      { name: "VS Code", icon: VscVscode },
      { name: "Figma", icon: FaFigma },
      { name: "Canva", icon: SiCanva },
    ],
  },
  {
    title: "Competitive Platforms",
    sectionIcon: Trophy,
    accent: "from-[#2F6BFF]/15 to-[#D6B36A]/10",
    items: [
      { name: "LeetCode", icon: SiLeetcode },
      { name: "HackerRank", icon: SiHackerrank },
      { name: "GeeksforGeeks", icon: Code2 },
    ],
  },
];

const SkillsGrid = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[12%] top-24 h-56 w-56 rounded-full bg-[#2F6BFF]/8 blur-[120px]" />
        <div className="absolute right-[10%] top-32 h-64 w-64 rounded-full bg-[#B13D9D]/10 blur-[140px]" />
        <div className="absolute bottom-10 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-[#D6B36A]/8 blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-[1400px] px-6 md:px-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <div className="section-eyebrow mb-3">Tech Arsenal</div>
          <h2 className="section-title mb-8">
            Technical <em>Skills</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {skills.map((section, i) => {
            const SectionIcon = section.sectionIcon;

            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-[30px] border border-white/8 bg-white/[0.025] backdrop-blur-xl p-6 md:p-7 hover:-translate-y-1.5 transition-all duration-500"
                style={{
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.03)",
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${section.accent} opacity-60`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_35%)]" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40" />

                <div className="relative z-10">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <SectionIcon className="h-6 w-6 text-[#F5F1EA]" strokeWidth={1.8} />
                  </div>

                  <h3 className="font-display text-xl md:text-2xl font-semibold text-[#F5F1EA] mb-5 leading-tight">
                    {section.title}
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {section.items.map((item) => {
                      const Icon = item.icon as any;
                      return (
                        <div
                          key={item.name}
                          className="group/tag inline-flex items-center gap-2 rounded-xl border border-white/8 bg-black/20 px-3 py-2 text-sm text-[#F5F1EA]/88 backdrop-blur-md transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]"
                        >
                          <Icon className="h-4 w-4 text-[#C98B8B] group-hover/tag:text-[#D6B36A] transition-colors duration-300" />
                          <span className="font-body">{item.name}</span>
                        </div>
                      );
                    })}
                  </div>
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