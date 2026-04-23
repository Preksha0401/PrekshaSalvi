import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Upload,
  Cpu,
  Network,
  Layers,
  Thermometer,
  BarChart3,
  ChevronRight,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    label: "Image Upload",
    desc: "User uploads an MRI DICOM/PNG scan via drag-and-drop interface.",
    color: "#60d5f7",
  },
  {
    icon: Cpu,
    label: "Preprocessing",
    desc: "Normalization, skull stripping & slice extraction to prepare tensors.",
    color: "#818cf8",
  },
  {
    icon: Network,
    label: "U-Net Model",
    desc: "PyTorch U-Net processes the scan through encoder-decoder with skip connections.",
    color: "#a78bfa",
  },
  {
    icon: Layers,
    label: "Segmentation Mask",
    desc: "Per-pixel classification returns a binary tumor mask overlaid on the MRI.",
    color: "#c084fc",
  },
  {
    icon: Thermometer,
    label: "Heatmap",
    desc: "Grad-CAM generates attention heatmap highlighting model focus regions.",
    color: "#f472b6",
  },
  {
    icon: BarChart3,
    label: "Risk Output",
    desc: "Final risk grade (Low/Medium/High) with confidence score returned to UI.",
    color: "#4ade80",
  },
];

const HowItWorksSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <p
          className="text-[11px] tracking-[4px] uppercase mb-4 inline-flex items-center gap-2"
          style={{ color: "rgba(167,139,250,0.8)" }}
        >
          <span
            className="inline-block w-5 h-px"
            style={{ background: "rgba(167,139,250,0.6)" }}
          />
          Pipeline
          <span
            className="inline-block w-5 h-px"
            style={{ background: "rgba(167,139,250,0.6)" }}
          />
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold"
          style={{
            fontFamily: "'DM Serif Display', serif",
            background: "linear-gradient(135deg, #fff 0%, #a78bfa 60%, #60d5f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          How It Works
        </h2>
      </motion.div>

      {/* pipeline steps */}
      <div className="flex flex-col lg:flex-row items-stretch gap-0">
        {steps.map((step, i) => (
          <div key={step.label} className="flex flex-col lg:flex-row items-center flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.04 }}
              className="flex flex-col items-center text-center gap-3 rounded-2xl p-5 border flex-1 cursor-default transition-all duration-300"
              style={{
                background: "rgba(10,6,30,0.8)",
                borderColor: `${step.color}22`,
                backdropFilter: "blur(12px)",
                minWidth: 0,
              }}
            >
              {/* step number */}
              <span
                className="text-[10px] tracking-[2px] font-mono"
                style={{ color: `${step.color}88` }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: `${step.color}12`,
                  border: `1px solid ${step.color}35`,
                  boxShadow: `0 0 18px ${step.color}20`,
                }}
              >
                <step.icon size={18} style={{ color: step.color }} />
              </div>

              {/* label */}
              <h3
                className="text-sm font-semibold leading-snug"
                style={{ color: "rgba(240,240,255,0.95)" }}
              >
                {step.label}
              </h3>

              {/* desc */}
              <p
                className="text-[12px] leading-relaxed"
                style={{ color: "rgba(160,175,205,0.6)" }}
              >
                {step.desc}
              </p>
            </motion.div>

            {/* arrow between steps */}
            {i < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="flex-shrink-0 lg:mx-1"
              >
                <ChevronRight
                  size={16}
                  className="rotate-90 lg:rotate-0"
                  style={{ color: "rgba(100,180,255,0.25)" }}
                />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* animated connector line */}
      <div className="relative mt-10 h-px hidden lg:block">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, #60d5f7 20%, #a78bfa 50%, #4ade80 80%, transparent)",
            opacity: 0.15,
          }}
        />
      </div>
    </section>
  );
};

export default HowItWorksSection;
