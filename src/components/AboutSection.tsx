import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20">
      <div className="container max-w-[800px]" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="section-eyebrow mb-2.5">Who Am I</div>
          <h2 className="section-title">About <em>Me</em></h2>

          <div className="glass-panel p-8 md:p-10">
            <p className="font-body text-[15px] text-muted-foreground leading-[1.8] mb-6">
              I'm <strong className="text-accent font-semibold">Preksha Salvi</strong>, a Computer Engineering student at
              <strong className="text-foreground font-semibold"> Sardar Patel Institute of Technology, Mumbai</strong> (CSE '27) with a CGPA of 8.00/10. 
              I'm passionate about building full-stack applications and crafting intuitive user experiences.
            </p>
            <p className="font-body text-[15px] text-muted-foreground leading-[1.8] mb-6">
              Currently pursuing a <strong className="text-accent font-semibold">Minor in UI/UX Design from Pearl Academy</strong>, 
              bridging the gap between code and design. Previously interned as a <strong className="text-foreground font-semibold">Data Science Intern at Corizo</strong>, 
              working with Python's data ecosystem.
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {["MERN Stack", "Java", "Python", "Figma", "React", "Node.js", "MongoDB", "Git"].map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
