import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, BookOpen, Code2, Wrench, Rocket } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    phase: "Phase 01",
    title: "The Idea",
    date: "Sep 2024",
    desc: "Identified a gap in accessible AI tools for medical imaging. Chose brain tumor detection as a high-impact, technically challenging problem to solve.",
    color: "#facc15",
  },
  {
    icon: BookOpen,
    phase: "Phase 02",
    title: "Research",
    date: "Oct 2024",
    desc: "Deep dived into U-Net architecture, the BraTS dataset, DICOM formats, and medical image preprocessing pipelines including skull stripping and normalization.",
    color: "#60d5f7",
  },
  {
    icon: Code2,
    phase: "Phase 03",
    title: "Development",
    date: "Nov – Dec 2024",
    desc: "Built the FastAPI backend serving the PyTorch U-Net model. Developed the Next.js frontend with MRI upload, result visualization, and chatbot assistant.",
    color: "#a78bfa",
  },
  {
    icon: Wrench,
    phase: "Phase 04",
    title: "Challenges",
    date: "Jan 2025",
    desc: "Overcame CORS issues between frontend and ML backend, memory leaks on large DICOM files, and model accuracy degradation on out-of-distribution scans.",
    color: "#f87171",
  },
  {
    icon: Rocket,
    phase: "Phase 05",
    title: "Final Product",
    date: "Feb 2025",
    desc: "Launched a complete end-to-end system: MRI upload → segmentation → heatmap → risk grade — with an integrated chatbot and appointment booking flow.",
    color: "#4ade80",
  },
];

const TimelineSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="timeline"
      className="relative py-24 md:py-32"
      style={{
        background: "linear-gradient(180deg, #05020e 0%, #080320 50%, #05020e 100%)",
      }}
    >
      <div className="relative px-6 md:px-12 lg:px-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p
            className="text-[11px] tracking-[4px] uppercase mb-4 inline-flex items-center gap-2"
            style={{ color: "rgba(96,213,247,0.8)" }}
          >
            <span className="inline-block w-5 h-px" style={{ background: "rgba(96,213,247,0.6)" }} />
            Development Journey
            <span className="inline-block w-5 h-px" style={{ background: "rgba(96,213,247,0.6)" }} />
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              fontFamily: "'DM Serif Display', serif",
              background: "linear-gradient(135deg, #fff 0%, #60d5f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Project Timeline
          </h2>
        </motion.div>

        {/* timeline */}
        <div className="relative">
          {/* vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(100,180,255,0.25) 10%, rgba(100,180,255,0.25) 90%, transparent)",
            }}
          />

          <div className="flex flex-col gap-12">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* card */}
                  <div
                    className={`ml-12 md:ml-0 flex-1 ${
                      isEven ? "md:pr-10 md:text-right" : "md:pl-10"
                    }`}
                  >
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="inline-block rounded-2xl p-6 border w-full md:max-w-sm cursor-default transition-all duration-300"
                      style={{
                        background: "rgba(10,6,30,0.8)",
                        borderColor: `${step.color}22`,
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <div
                        className={`flex items-center gap-3 mb-3 ${
                          isEven ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `${step.color}15`,
                            border: `1px solid ${step.color}35`,
                          }}
                        >
                          <step.icon size={14} style={{ color: step.color }} />
                        </div>
                        <div>
                          <p
                            className="text-[10px] tracking-[2px] uppercase"
                            style={{ color: `${step.color}80` }}
                          >
                            {step.phase}
                          </p>
                          <h3
                            className="text-sm font-semibold"
                            style={{ color: "rgba(240,240,255,0.95)" }}
                          >
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <p
                        className="text-[13px] leading-relaxed"
                        style={{ color: "rgba(160,178,210,0.65)" }}
                      >
                        {step.desc}
                      </p>
                      <p
                        className="mt-3 text-[11px] tracking-wide"
                        style={{
                          color: `${step.color}70`,
                          fontFamily: "'Space Mono', monospace",
                        }}
                      >
                        {step.date}
                      </p>
                    </motion.div>
                  </div>

                  {/* center dot */}
                  <div
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 flex-shrink-0 w-4 h-4 rounded-full border-2 z-10"
                    style={{
                      borderColor: step.color,
                      background: "#05020e",
                      boxShadow: `0 0 12px ${step.color}60`,
                    }}
                  />

                  {/* spacer for opposite side on md+ */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
