import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, Clock, Activity, Brain } from "lucide-react";
import { Variants } from "framer-motion";


const problems = [
  {
    icon: Clock,
    title: "Delayed Diagnosis",
    desc: "Manual MRI analysis by radiologists can take days to weeks, often delaying critical treatment decisions for patients.",
    color: "#f87171",
    glow: "rgba(248,113,113,0.15)",
  },
  {
    icon: AlertTriangle,
    title: "Human Error Risk",
    desc: "Visual inspection of complex MRI scans is prone to fatigue-induced errors, especially in high-volume hospital environments.",
    color: "#fb923c",
    glow: "rgba(251,146,60,0.15)",
  },
  {
    icon: Activity,
    title: "No Automated Segmentation",
    desc: "Traditional workflows lack pixel-level tumor delineation, making it hard to quantify tumor size, location, and growth.",
    color: "#facc15",
    glow: "rgba(250,204,21,0.12)",
  },
  {
    icon: Brain,
    title: "Inaccessible AI Tools",
    desc: "Existing AI solutions are siloed in research labs — there is no end-to-end accessible system for clinical use.",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.15)",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12 },
  }),
};

const ProblemSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="problem"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto"
    >
      {/* divider line top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(100,180,255,0.3))",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-14"
      >
        <p
          className="text-[11px] tracking-[4px] uppercase mb-4 flex items-center gap-2"
          style={{ color: "rgba(248,113,113,0.8)" }}
        >
          <span
            className="inline-block w-5 h-px"
            style={{ background: "rgba(248,113,113,0.6)" }}
          />
          The Problem
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold leading-tight"
          style={{
            fontFamily: "'DM Serif Display', serif",
            background: "linear-gradient(135deg, #ffffff 0%, #f87171 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Why Brain Tumor Detection
          <br />
          <em className="not-italic" style={{ color: "#f87171" }}>Needs AI</em>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {problems.map((p, i) => (
          <motion.div
            key={p.title}
            custom={i}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group rounded-2xl p-6 flex flex-col gap-4 border cursor-default"
            style={{
              background: "rgba(12,8,32,0.7)",
              borderColor: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
              boxShadow: `0 0 0 0 ${p.glow}`,
              transition: "box-shadow 0.3s, transform 0.3s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px ${p.glow}`)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 transparent")
            }
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${p.glow}`, border: `1px solid ${p.color}22` }}
            >
              <p.icon size={18} style={{ color: p.color }} />
            </div>
            <h3
              className="text-base font-semibold"
              style={{ color: "rgba(240,240,255,0.95)" }}
            >
              {p.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(170,185,210,0.7)" }}>
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProblemSection;
