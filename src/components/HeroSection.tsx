import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = ["Full Stack Developer", "UI/UX Designer", "MERN Stack", "Creative Coder"];

const HeroSection = () => {
  const [typed, setTyped] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = roles[roleIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < role.length) {
          setTyped(role.slice(0, charIdx + 1));
          setCharIdx(charIdx + 1);
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (charIdx > 0) {
          setTyped(role.slice(0, charIdx - 1));
          setCharIdx(charIdx - 1);
        } else {
          setDeleting(false);
          setRoleIdx((roleIdx + 1) % roles.length);
        }
      }
    }, deleting ? 40 : 90);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx]);

  const nameChars = "Preksha Salvi".split("");

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-[68px] relative overflow-hidden">
      {/* Floating gradient blobs */}
      <div className="absolute w-[480px] h-[480px] rounded-full top-[-100px] right-[-110px] pointer-events-none animate-pulse opacity-30" style={{ background: "radial-gradient(circle, hsla(306,55%,33%,0.4), transparent 70%)", filter: "blur(90px)" }} />
      <div className="absolute w-[320px] h-[320px] rounded-full bottom-0 left-[-70px] pointer-events-none animate-pulse opacity-25" style={{ background: "radial-gradient(circle, hsla(186,100%,50%,0.3), transparent 70%)", filter: "blur(90px)", animationDelay: "3s" }} />

      {/* Noise overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]">
        <filter id="noise"><feTurbulence baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      <div className="relative z-10 flex flex-col items-center gap-4 max-w-[700px] w-full px-5 text-center">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.7 }} className="section-eyebrow mb-0">
          Full Stack Developer + UI/UX Designer
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: 0.7 }} className="font-display italic text-xl md:text-2xl text-muted-foreground">
          Hello, I'm
        </motion.div>

        <h1 className="font-display text-6xl md:text-8xl font-bold leading-none">
          {nameChars.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.28 + i * 0.045, duration: 0.5 }}
              className="inline-block gradient-text"
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.56, duration: 0.5 }} className="font-body text-lg md:text-xl font-medium text-muted-foreground">
          <span className="text-accent">{typed}</span>
          <span className="type-cursor" />
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.95, duration: 0.7 }} className="font-body text-[15px] leading-relaxed text-muted-foreground max-w-[480px]">
          I build meaningful digital experiences through <strong className="text-accent font-semibold">code, creativity, and design thinking</strong>.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3, duration: 0.7 }} className="flex gap-3 flex-wrap justify-center">
          <a href="#projects" className="btn-primary hoverable">View Projects</a>
          <a href="#contact" className="btn-outline hoverable">Download Resume</a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.9, duration: 0.7 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        style={{ animation: "scroll-bounce 2.5s ease-in-out infinite" }}
      >
        <span className="font-body text-[9px] tracking-[3px] uppercase opacity-45">Scroll</span>
        <div className="w-px h-9" style={{ background: "linear-gradient(to bottom, hsla(306,55%,33%,0.3), transparent)" }} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
