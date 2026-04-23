import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, Database, Link2, Cpu, BookOpen, Globe } from "lucide-react";

const challenges = [
  {
    icon: Cpu,
    title: "Model Accuracy Issues",
    desc: "Initial U-Net runs showed 78% Dice on validation — far below target. Required hyperparameter tuning, data augmentation, and weighted loss functions.",
    color: "#f87171",
  },
  {
    icon: Database,
    title: "Data Preprocessing Complexity",
    desc: "DICOM files vary wildly in shape, orientation, and intensity. Building a robust skull-stripping + normalization pipeline took weeks of iteration.",
    color: "#fb923c",
  },
  {
    icon: Link2,
    title: "Frontend–ML Backend Integration",
    desc: "CORS errors, multipart form data handling, and async inference queuing between Next.js + FastAPI caused significant debugging overhead.",
    color: "#facc15",
  },
];

const learnings = [
  {
    icon: BookOpen,
    title: "Mastered U-Net Architecture",
    desc: "Gained deep understanding of encoder-decoder skip connections, loss functions (Dice + BCE), and training dynamics for medical segmentation.",
    color: "#4ade80",
  },
  {
    icon: Globe,
    title: "ML Model Deployment",
    desc: "Learned to serve PyTorch models efficiently with FastAPI, including caching, batching, and GPU/CPU fallback strategies.",
    color: "#60d5f7",
  },
  {
    icon: Link2,
    title: "Full-Stack AI Integration",
    desc: "Developed robust patterns for connecting React frontends to ML APIs: streaming results, error boundaries, and progress indicators.",
    color: "#a78bfa",
  },
];

const ChallengesSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="challenges"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-14"
      >
        <p
          className="text-[11px] tracking-[4px] uppercase mb-4 flex items-center gap-2"
          style={{ color: "rgba(251,146,60,0.8)" }}
        >
          <span className="inline-block w-5 h-px" style={{ background: "rgba(251,146,60,0.6)" }} />
          Reflection
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold"
          style={{
            fontFamily: "'DM Serif Display', serif",
            background: "linear-gradient(135deg, #fff 0%, #fb923c 50%, #4ade80 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Challenges &amp; Learnings
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Challenges column */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 flex items-center gap-3"
          >
            <AlertTriangle size={16} style={{ color: "#f87171" }} />
            <span
              className="text-sm font-semibold tracking-wide"
              style={{ color: "rgba(248,113,113,0.8)" }}
            >
              Challenges Faced
            </span>
          </motion.div>

          <div className="flex flex-col gap-4">
            {challenges.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex gap-4 rounded-xl p-5 border cursor-default transition-all duration-300"
                style={{
                  background: "rgba(10,6,30,0.7)",
                  borderColor: `${c.color}18`,
                  borderLeft: `3px solid ${c.color}60`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                  style={{ background: `${c.color}10`, border: `1px solid ${c.color}25` }}
                >
                  <c.icon size={15} style={{ color: c.color }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1" style={{ color: "rgba(240,240,255,0.9)" }}>
                    {c.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: "rgba(155,175,210,0.6)" }}>
                    {c.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Learnings column */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 flex items-center gap-3"
          >
            <BookOpen size={16} style={{ color: "#4ade80" }} />
            <span
              className="text-sm font-semibold tracking-wide"
              style={{ color: "rgba(74,222,128,0.8)" }}
            >
              Key Learnings
            </span>
          </motion.div>

          <div className="flex flex-col gap-4">
            {learnings.map((l, i) => (
              <motion.div
                key={l.title}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                whileHover={{ x: -4 }}
                className="flex gap-4 rounded-xl p-5 border cursor-default transition-all duration-300"
                style={{
                  background: "rgba(10,6,30,0.7)",
                  borderColor: `${l.color}18`,
                  borderLeft: `3px solid ${l.color}60`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                  style={{ background: `${l.color}10`, border: `1px solid ${l.color}25` }}
                >
                  <l.icon size={15} style={{ color: l.color }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1" style={{ color: "rgba(240,240,255,0.9)" }}>
                    {l.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: "rgba(155,175,210,0.6)" }}>
                    {l.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;
