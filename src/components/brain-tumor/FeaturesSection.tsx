import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Upload, Layers, Thermometer, AlertCircle, MessageCircle, Calendar } from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "MRI Upload",
    desc: "Drag-and-drop DICOM or PNG MRI scans. Instant preview with slice navigation for multi-frame uploads.",
    color: "#60d5f7",
  },
  {
    icon: Layers,
    title: "Tumor Segmentation",
    desc: "U-Net generates pixel-perfect segmentation masks identifying tumor region with sub-second inference.",
    color: "#818cf8",
  },
  {
    icon: Thermometer,
    title: "Heatmap Visualization",
    desc: "Grad-CAM attention heatmaps overlaid on the original scan for transparent, explainable AI analysis.",
    color: "#c084fc",
  },
  {
    icon: AlertCircle,
    title: "Risk Classification",
    desc: "Automated tri-level risk grading (Low / Medium / High) based on tumor morphology and location.",
    color: "#f87171",
  },
  {
    icon: MessageCircle,
    title: "Chatbot Assistant",
    desc: "AI-powered chatbot answers patient questions about results, symptoms, and next steps in plain language.",
    color: "#4ade80",
  },
  {
    icon: Calendar,
    title: "Appointment Booking",
    desc: "Integrated booking system to schedule neurology consultations directly from the result dashboard.",
    color: "#fb923c",
  },
];

const FeaturesSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="features"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-14 text-center"
      >
        <p
          className="text-[11px] tracking-[4px] uppercase mb-4 inline-flex items-center gap-2"
          style={{ color: "rgba(129,140,248,0.8)" }}
        >
          <span className="inline-block w-5 h-px" style={{ background: "rgba(129,140,248,0.6)" }} />
          What It Does
          <span className="inline-block w-5 h-px" style={{ background: "rgba(129,140,248,0.6)" }} />
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
          Features
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feat, i) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.09 }}
            whileHover={{ y: -7, scale: 1.02 }}
            className="group relative rounded-2xl p-7 border overflow-hidden cursor-default transition-all duration-300"
            style={{
              background: "rgba(10,6,30,0.75)",
              borderColor: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* hover glow bg */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${feat.color}0a, transparent 65%)`,
              }}
            />

            {/* top border glow on hover */}
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(90deg, transparent, ${feat.color}60, transparent)`,
              }}
            />

            <div
              className="relative w-12 h-12 rounded-2xl mb-5 flex items-center justify-center"
              style={{
                background: `${feat.color}10`,
                border: `1px solid ${feat.color}30`,
                boxShadow: `0 0 20px ${feat.color}15`,
                transition: "box-shadow 0.3s",
              }}
            >
              <feat.icon size={20} style={{ color: feat.color }} />
            </div>

            <h3
              className="relative text-base font-semibold mb-3"
              style={{ color: "rgba(240,242,255,0.95)" }}
            >
              {feat.title}
            </h3>
            <p
              className="relative text-sm leading-relaxed"
              style={{ color: "rgba(155,175,210,0.65)" }}
            >
              {feat.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
