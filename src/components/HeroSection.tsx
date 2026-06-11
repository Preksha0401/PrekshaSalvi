import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import heroBg from "../assets/hero-girl.png";
import resume from "../assets/RESUME_PREKSHA (1).pdf";

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
    <section
      id="hero"
      className="min-h-screen flex items-center pt-[68px] relative overflow-hidden"
    >
      {/* ── Full-section background: dark purple base ── */}
      <div className="absolute inset-0 bg-[#0d0618]" />

      {/* ── Hero girl image — right 52%, fills height ── */}
      <div className="absolute inset-y-0 right-0 w-[52%] pointer-events-none select-none">
        <div
          className="absolute inset-y-0 left-0 w-[45%] z-10"
          style={{
            background:
              "linear-gradient(to right, #0d0618 0%, #0d0618cc 40%, #0d061840 75%, transparent 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[30%] z-10"
          style={{
            background: "linear-gradient(to top, #0d0618 0%, transparent 100%)",
          }}
        />
        <motion.img
          src={heroBg}
          alt="Developer illustration"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          className="w-full h-full object-cover object-left"
          style={{ objectPosition: "35% center" }}
        />
      </div>

      {/* ── Noise overlay ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] z-10">
        <filter id="noise">
          <feTurbulence baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* ── Ambient glow blob behind text ── */}
      <div
        className="absolute left-[-80px] top-[20%] w-[420px] h-[420px] rounded-full pointer-events-none z-[5]"
        style={{
          background: "radial-gradient(circle, hsla(290,60%,25%,0.35) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Left text column ── */}
      <div className="relative z-20 flex flex-col gap-4 w-[55%] max-w-[620px] px-10 md:px-16 lg:px-24 text-left">

        {/* Hello, I'm */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="font-display italic text-lg md:text-xl text-muted-foreground flex items-center gap-2"
        >
          Hello, I'm
          <svg
            width="34"
            height="20"
            viewBox="0 0 38 22"
            fill="none"
            className="opacity-50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4 C10 0, 28 16, 36 14"
              stroke="#e1cbf8"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M30 10 L36 14 L29 17"
              stroke="#e1cbf8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </motion.div>

        {/* Name — fits on one line, well-proportioned */}
        <h1 className="font-display text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[5rem] font-bold leading-[1.08] whitespace-nowrap">
          {nameChars.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.12 + i * 0.04, duration: 0.45 }}
              className="inline-block gradient-text"
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </h1>

        {/* Quote — snug below name */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.38, duration: 0.6 }}
          className="border-l-2 border-accent/40 pl-4"
        >
          <p className="font-display italic text-base md:text-lg text-muted-foreground leading-snug">
            Code is my craft.{" "}
            <span className="gradient-text">Creativity is my edge.</span>
          </p>
        </motion.div>

        {/* Typed role badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.52, duration: 0.5 }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap"
            style={{
              background: "hsla(290,40%,18%,0.7)",
              border: "1px solid hsla(290,55%,40%,0.35)",
              color: "#e2b4ff",
              minWidth: "260px",
            }}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: "#c084fc",
                boxShadow: "0 0 6px #c084fc",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <span className="text-accent">{typed}</span>
            <span className="type-cursor" />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.85, duration: 0.6 }}
          className="font-body text-sm md:text-base leading-relaxed text-muted-foreground max-w-[460px]"
        >
          I build meaningful digital experiences through{" "}
          <strong className="text-accent font-semibold">code, creativity,</strong> and{" "}
          <strong className="text-accent font-semibold">design thinking</strong>.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.6 }}
          className="flex gap-3 flex-wrap"
        >
          <a href="#projects" className="btn-primary hoverable">
            View Projects
          </a>
          <a
            href={resume}
            download="Preksha_Salvi_Resume.pdf"
            className="btn-outline hoverable"
          >
            Download Resume
          </a>
        </motion.div>

      </div>

      {/* ── Scroll indicator (centered bottom) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.7, duration: 0.7 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground z-20"
        style={{ animation: "scroll-bounce 2.5s ease-in-out infinite" }}
      >
        <span className="font-body text-[9px] tracking-[3px] uppercase opacity-45">Scroll</span>
        <div
          className="w-px h-9"
          style={{
            background: "linear-gradient(to bottom, hsla(306,55%,33%,0.3), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;