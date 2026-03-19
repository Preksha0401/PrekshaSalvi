import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const uxProjects = [
  { cat: "Dashboard UI", title: "Indicator App Design", desc: "A data-rich analytics dashboard with KPI cards, clean visualizations, and intuitive navigation.", tags: ["Figma", "Dashboard", "Data Viz"], gradient: "linear-gradient(135deg, hsl(252,42%,25%), hsl(306,55%,33%), hsl(316,65%,60%))" },
  { cat: "E-Commerce UI", title: "Shopping App Interface", desc: "A modern e-commerce UI with product grids, cart flow, and checkout — frictionless UX.", tags: ["Figma", "E-Commerce", "User Flow"], gradient: "linear-gradient(135deg, hsl(230,40%,23%), hsl(252,42%,25%), hsl(260,50%,70%))" },
  { cat: "Mobile UI", title: "Mobile App Concepts", desc: "Interface concepts for iOS/Android — micro-interactions, onboarding, and gesture-based nav.", tags: ["Mobile", "iOS/Android", "Interaction Design"], gradient: "linear-gradient(135deg, hsl(280,50%,20%), hsl(306,55%,33%), hsl(316,65%,60%))" },
];

const MockWireframe = ({ variant }: { variant: number }) => (
  <div className="w-[60%] max-w-[160px] rounded-lg p-3 border" style={{ background: "hsla(255,255,255,0.1)", borderColor: "hsla(255,255,255,0.18)", backdropFilter: "blur(3px)" }}>
    <div className="h-[5px] rounded bg-foreground/20 mb-2" style={{ width: variant === 0 ? "80%" : variant === 1 ? "60%" : "50%" }} />
    <div className="h-[5px] rounded mb-2" style={{ width: "60%", background: variant === 0 ? "hsla(316,65%,60%,0.6)" : "hsla(260,50%,70%,0.5)" }} />
    <div className="flex gap-1 mb-2">
      <div className="w-7 h-7 rounded bg-foreground/15 flex-shrink-0" />
      <div className="flex-1 flex flex-col gap-1 justify-center">
        <div className="h-1 rounded bg-foreground/20" />
        <div className="h-1 rounded bg-foreground/15 w-[55%]" />
      </div>
    </div>
    <div className="h-[5px] rounded bg-foreground/15" style={{ width: "45%" }} />
  </div>
);

const UIUXProjects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="uiux" className="py-20">
      <div className="container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="section-eyebrow mb-2.5">Design Portfolio</div>
          <h2 className="section-title">UI/UX <em>Projects</em></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px]">
          {uxProjects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel overflow-hidden group hoverable transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-[160px] flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105" style={{ background: p.gradient }}>
                <MockWireframe variant={i} />
              </div>
              <div className="p-[18px]">
                <div className="font-body text-[10px] tracking-[2px] uppercase text-accent mb-1">{p.cat}</div>
                <h4 className="font-display text-base font-bold text-foreground mb-[7px]">{p.title}</h4>
                <p className="font-body text-[12.5px] text-muted-foreground leading-relaxed mb-3">{p.desc}</p>
                <div className="flex flex-wrap gap-[5px]">
                  {p.tags.map((t) => <span key={t} className="tag-pill text-[9px]">{t}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UIUXProjects;
