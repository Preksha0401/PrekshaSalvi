import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play, ExternalLink, Github } from "lucide-react";

const DemoVideoSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="demo"
      className="relative py-24 md:py-32"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 60%), #05020e",
      }}
    >
      <div className="relative px-6 md:px-12 lg:px-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <p
            className="text-[11px] tracking-[4px] uppercase mb-4 inline-flex items-center gap-2"
            style={{ color: "rgba(99,102,241,0.8)" }}
          >
            <span className="inline-block w-5 h-px" style={{ background: "rgba(99,102,241,0.6)" }} />
            In Action
            <span className="inline-block w-5 h-px" style={{ background: "rgba(99,102,241,0.6)" }} />
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              fontFamily: "'DM Serif Display', serif",
              background: "linear-gradient(135deg, #fff 0%, #818cf8 60%, #60d5f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            See It In Action
          </h2>
        </motion.div>

        {/* video container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(99,102,241,0.25)",
            boxShadow:
              "0 0 80px rgba(99,102,241,0.15), 0 0 0 1px rgba(99,102,241,0.05), inset 0 0 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* mock video embed */}
          <div
            className="relative w-full flex items-center justify-center"
            style={{
              aspectRatio: "16/9",
              background: "linear-gradient(135deg, #0d0b2a 0%, #11093a 50%, #0a0820 100%)",
            }}
          >
            {/* grid lines */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(100,180,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(100,180,255,1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* center play button */}
            <div className="relative flex flex-col items-center gap-6">
              {/* glow ring */}
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{
                    background: "rgba(99,102,241,0.2)",
                    animationDuration: "2s",
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                    boxShadow: "0 0 40px rgba(99,102,241,0.5), 0 0 80px rgba(99,102,241,0.2)",
                  }}
                >
                  <Play size={28} style={{ color: "#fff", marginLeft: 4 }} />
                </motion.button>
              </div>
              <p className="text-sm" style={{ color: "rgba(180,200,230,0.4)", fontFamily: "'Space Mono', monospace" }}>
                Demo video preview
              </p>
            </div>

            {/* decorative corner labels */}
            <div
              className="absolute top-3 left-4 text-[10px] tracking-[2px] uppercase"
              style={{ color: "rgba(99,102,241,0.35)", fontFamily: "'Space Mono', monospace" }}
            >
              BRAIN-DETECT v1.0
            </div>
            <div
              className="absolute top-3 right-4 flex items-center gap-1.5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span
                className="text-[10px] tracking-[2px] uppercase"
                style={{ color: "rgba(248,113,113,0.5)", fontFamily: "'Space Mono', monospace" }}
              >
                LIVE
              </span>
            </div>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#"
            className="group relative flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #6366f1, #06b6d4)",
              color: "#fff",
              boxShadow: "0 4px 24px rgba(99,102,241,0.35)",
            }}
          >
            <ExternalLink size={15} />
            Live Demo
          </a>
          <a
            href="https://github.com/Shambhavi-Bhalekar/Mini-Project"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide border transition-all duration-300 hover:-translate-y-0.5"
            style={{
              borderColor: "rgba(100,200,255,0.2)",
              color: "rgba(200,220,255,0.85)",
              background: "rgba(100,200,255,0.04)",
            }}
          >
            <Github size={15} />
            GitHub Repo
          </a>
        </motion.div>

        {/* bottom divider */}
        <div
          className="mt-16 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(99,102,241,0.2), transparent)",
          }}
        />
      </div>
    </section>
  );
};

export default DemoVideoSection;
