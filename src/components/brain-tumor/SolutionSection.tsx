import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, Zap, Target, Shield } from "lucide-react";

const pillars = [
  {
    icon: Layers,
    title: "U-Net Architecture",
    desc: "Encoder-decoder CNN with skip connections trained on BraTS dataset for precise pixel-level tumor segmentation.",
    color: "#60d5f7",
  },
  {
    icon: Zap,
    title: "FastAPI Backend",
    desc: "High-performance Python backend serving the PyTorch model via REST API with sub-second inference latency.",
    color: "#a78bfa",
  },
  {
    icon: Target,
    title: "Risk Classification",
    desc: "Automated grading (Low / Medium / High) of detected tumors based on segmentation mask morphology and size.",
    color: "#4ade80",
  },
  {
    icon: Shield,
    title: "Heatmap Overlay",
    desc: "Grad-CAM visualizations overlaid on MRI scans — making model decisions transparent and clinically interpretable.",
    color: "#fb923c",
  },
];

const SolutionSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="solution"
      className="relative py-24 md:py-32"
      style={{
        background:
          "linear-gradient(180deg, #05020e 0%, #0a0420 50%, #05020e 100%)",
      }}
    >
      {/* background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(100,180,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(100,180,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <p
              className="text-[11px] tracking-[4px] uppercase mb-4 flex items-center gap-2"
              style={{ color: "rgba(96,213,247,0.8)" }}
            >
              <span
                className="inline-block w-5 h-px"
                style={{ background: "rgba(96,213,247,0.6)" }}
              />
              The Solution
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight"
              style={{
                fontFamily: "'DM Serif Display', serif",
                background: "linear-gradient(135deg, #ffffff 0%, #60d5f7 60%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Intelligent Segmentation
              <br />& Automated Diagnosis
            </h2>
          </div>
          <p
            className="text-sm leading-relaxed max-w-sm"
            style={{ color: "rgba(170,185,210,0.65)" }}
          >
            A full-stack AI platform combining a U-Net segmentation model with
            an intuitive React frontend — making advanced tumor analysis
            accessible to clinicians.
          </p>
        </motion.div>

        {/* pillar cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group flex gap-5 rounded-2xl p-6 border cursor-default transition-all duration-300"
              style={{
                background: "rgba(10,6,30,0.7)",
                borderColor: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: `${p.color}12`,
                  border: `1px solid ${p.color}30`,
                  boxShadow: `0 0 20px ${p.color}18`,
                }}
              >
                <p.icon size={20} style={{ color: p.color }} />
              </div>
              <div>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ color: "rgba(235,240,255,0.95)" }}
                >
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(170,185,210,0.65)" }}>
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* highlight stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "94.2%", label: "Dice Score" },
            { value: "<1s", label: "Inference Time" },
            { value: "3 Grades", label: "Risk Levels" },
            { value: "BraTS", label: "Dataset" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-5 text-center border"
              style={{
                background: "rgba(96,213,247,0.04)",
                borderColor: "rgba(96,213,247,0.1)",
              }}
            >
              <div
                className="text-3xl font-bold mb-1"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  color: "#60d5f7",
                }}
              >
                {s.value}
              </div>
              <div
                className="text-[11px] tracking-[2px] uppercase"
                style={{ color: "rgba(170,185,210,0.5)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
