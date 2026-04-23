import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";

const BrainNavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-14 transition-all duration-400"
        style={{
          background: scrolled
            ? "rgba(5,2,14,0.88)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(100,180,255,0.08)"
            : "none",
        }}
      >
        {/* back link */}
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:-translate-x-0.5 group"
          style={{ color: "rgba(180,210,240,0.7)" }}
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-0.5 transition-transform duration-200"
            style={{ color: "rgba(96,213,247,0.7)" }}
          />
          Portfolio
        </Link>

        {/* page title */}
        <span
          className="hidden sm:block text-xs tracking-[2px] uppercase"
          style={{
            color: "rgba(140,200,255,0.35)",
            fontFamily: "'Space Mono', monospace",
          }}
        >
          Brain Tumor Detection
        </span>

        {/* quick CTAs */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Shambhavi-Bhalekar/Mini-Project"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full transition-all duration-200 hover:scale-110"
            style={{
              color: "rgba(180,210,240,0.6)",
              background: "rgba(100,200,255,0.05)",
              border: "1px solid rgba(100,200,255,0.1)",
            }}
            aria-label="GitHub"
          >
            <Github size={14} />
          </a>
          <a
            href="https://mini-project-sooty-psi.vercel.app/landing"
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #6366f1, #06b6d4)",
              color: "#fff",
              boxShadow: "0 2px 12px rgba(99,102,241,0.3)",
            }}
          >
            <ExternalLink size={11} />
            Live Demo
          </a>
        </div>
      </motion.header>
    </AnimatePresence>
  );
};

export default BrainNavBar;
