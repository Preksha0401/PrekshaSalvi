import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import ss1 from "@/assets/homepage.png";
import ss2 from "@/assets/login.png";
import ss3 from "@/assets/homepage.png";

const slides = [
  {
    label: "MRI Upload Dashboard",
    sub: "Drag-and-drop interface with DICOM preview and slice selector",
    accent: "#60d5f7",
    image: ss1,
  },
  {
    label: "Segmentation Result",
    sub: "U-Net mask overlaid on MRI scan with tumor boundary highlighted",
    accent: "#a78bfa",
    image: ss2,
  },
  {
    label: "Heatmap Visualization",
    sub: "Grad-CAM attention map showing model focus regions in warm colors",
    accent: "#f472b6",
    image: ss3,
  },
];

const ScreenshotsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const [modal, setModal] = useState<number | null>(null);

  const prev = () => setActive((a) => (a - 1 + slides.length) % slides.length);
  const next = () => setActive((a) => (a + 1) % slides.length);

  return (
    <section
      ref={ref}
      id="screenshots"
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
            style={{ color: "rgba(244,114,182,0.8)" }}
          >
            <span className="inline-block w-5 h-px" style={{ background: "rgba(244,114,182,0.6)" }} />
            Interface
            <span className="inline-block w-5 h-px" style={{ background: "rgba(244,114,182,0.6)" }} />
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              fontFamily: "'DM Serif Display', serif",
              background: "linear-gradient(135deg, #fff 0%, #f472b6 60%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Screenshots
          </h2>
        </motion.div>

        {/* main carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{
                height: "clamp(260px, 45vw, 500px)",
                border: `1px solid ${slides[active].accent}30`,
                boxShadow: `0 0 60px ${slides[active].accent}15`,
              }}
              onClick={() => setModal(active)}
            >
              {/* actual screenshot image */}
              <img
                src={slides[active].image}
                alt={slides[active].label}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* browser chrome top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-8 flex items-center gap-1.5 px-3 z-10"
                style={{
                  background: "rgba(5,2,14,0.85)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {["#f87171", "#facc15", "#4ade80"].map((c) => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
                ))}
                <div
                  className="flex-1 mx-4 h-4 rounded-full text-[9px] flex items-center px-2"
                  style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.2)" }}
                >
                  brain-detect.vercel.app/{slides[active].label.toLowerCase().replace(/\s+/g, "-")}
                </div>
              </div>

              {/* zoom icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(5,2,14,0.8)",
                    border: `1px solid ${slides[active].accent}50`,
                  }}
                >
                  <ZoomIn size={18} style={{ color: slides[active].accent }} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* nav arrows */}
          {[
            { fn: prev, pos: "left" },
            { fn: next, pos: "right" },
          ].map(({ fn, pos }, idx) => (
            <button
              key={idx}
              onClick={fn}
              className="absolute top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                [pos]: "0.75rem",
                background: "rgba(5,2,14,0.85)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {idx === 0 ? (
                <ChevronLeft size={16} style={{ color: "rgba(200,220,255,0.7)" }} />
              ) : (
                <ChevronRight size={16} style={{ color: "rgba(200,220,255,0.7)" }} />
              )}
            </button>
          ))}
        </motion.div>

        {/* dot indicators */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="transition-all duration-300"
              style={{
                width: active === i ? "2rem" : "0.5rem",
                height: "0.5rem",
                borderRadius: "9999px",
                background: active === i ? s.accent : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>

        {/* slide label */}
        <div className="mt-4 text-center">
          <p
            className="text-sm"
            style={{ color: "rgba(180,200,230,0.5)", fontFamily: "'Space Mono', monospace" }}
          >
            {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")} —{" "}
            {slides[active].label}
          </p>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {modal !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(2,0,10,0.93)", backdropFilter: "blur(12px)" }}
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl rounded-2xl overflow-hidden"
              style={{
                height: "clamp(300px, 55vw, 580px)",
                border: `1px solid ${slides[modal].accent}40`,
                boxShadow: `0 0 80px ${slides[modal].accent}25`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* actual image in modal */}
              <img
                src={slides[modal].image}
                alt={slides[modal].label}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* label overlay at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 p-5 z-10"
                style={{ background: "linear-gradient(to top, rgba(2,0,10,0.9), transparent)" }}
              >
                <h3 className="text-xl font-bold mb-1" style={{ color: slides[modal].accent }}>
                  {slides[modal].label}
                </h3>
                <p className="text-sm" style={{ color: "rgba(180,200,220,0.6)" }}>
                  {slides[modal].sub}
                </p>
              </div>

              {/* close button */}
              <button
                onClick={() => setModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center z-10"
                style={{ background: "rgba(5,2,14,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <X size={14} style={{ color: "rgba(200,220,255,0.7)" }} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ScreenshotsSection;