import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stack = [
  {
    category: "Frontend",
    color: "#60d5f7",
    items: [
      { name: "Next.js", icon: "▲", desc: "React framework with SSR + routing" },
      { name: "TypeScript", icon: "TS", desc: "Type-safe development" },
      { name: "Tailwind CSS", icon: "🌊", desc: "Utility-first styling" },
    ],
  },
  {
    category: "Backend",
    color: "#a78bfa",
    items: [
      { name: "Python", icon: "🐍", desc: "Core backend language" },
      { name: "FastAPI", icon: "⚡", desc: "High-performance async REST API" },
    ],
  },
  {
    category: "AI / ML",
    color: "#4ade80",
    items: [
      { name: "U-Net", icon: "🔬", desc: "Encoder-decoder segmentation CNN" },
      { name: "PyTorch", icon: "🔥", desc: "Deep learning framework" },
      { name: "Grad-CAM", icon: "🌡️", desc: "Explainability heatmaps" },
    ],
  },
];

const TechStackSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="tech-stack"
      className="relative py-24 md:py-32"
      style={{ background: "linear-gradient(180deg, #05020e 0%, #080320 50%, #05020e 100%)" }}
    >
      <div className="relative px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p
            className="text-[11px] tracking-[4px] uppercase mb-4 inline-flex items-center gap-2"
            style={{ color: "rgba(74,222,128,0.8)" }}
          >
            <span className="inline-block w-5 h-px" style={{ background: "rgba(74,222,128,0.6)" }} />
            Built With
            <span className="inline-block w-5 h-px" style={{ background: "rgba(74,222,128,0.6)" }} />
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              fontFamily: "'DM Serif Display', serif",
              background: "linear-gradient(135deg, #fff 0%, #4ade80 50%, #60d5f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Tech Stack
          </h2>
        </motion.div>

        <div className="flex flex-col gap-8">
          {stack.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: ci * 0.15 }}
            >
              {/* category header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-1 h-5 rounded-full"
                  style={{ background: cat.color, boxShadow: `0 0 10px ${cat.color}80` }}
                />
                <span
                  className="text-[11px] tracking-[3px] uppercase font-semibold"
                  style={{ color: cat.color }}
                >
                  {cat.category}
                </span>
              </div>

              {/* tech pills */}
              <div className="flex flex-wrap gap-3">
                {cat.items.map((item, ii) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: ci * 0.15 + ii * 0.08 }}
                    whileHover={{ y: -4, scale: 1.04 }}
                    className="group flex items-center gap-3 rounded-xl px-5 py-3 border cursor-default transition-all duration-300"
                    style={{
                      background: "rgba(10,6,30,0.7)",
                      borderColor: `${cat.color}20`,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <span
                      className="text-base flex-shrink-0 font-mono font-bold w-8 h-8 flex items-center justify-center rounded-lg text-xs"
                      style={{
                        background: `${cat.color}12`,
                        border: `1px solid ${cat.color}30`,
                        color: cat.color,
                      }}
                    >
                      {item.icon}
                    </span>
                    <div>
                      <p
                        className="text-sm font-semibold leading-none mb-0.5"
                        style={{ color: "rgba(235,240,255,0.95)" }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="text-[11px]"
                        style={{ color: "rgba(150,170,205,0.55)" }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {ci < stack.length - 1 && (
                <div
                  className="mt-8 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(100,180,255,0.1), transparent)" }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
