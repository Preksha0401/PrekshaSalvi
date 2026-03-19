import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import mindicator from "@/assets/uiux-indicator.png";
import stayease from "@/assets/stayease.jpg";
import shopping from "@/assets/shopping.jpg";


const projects = [
  {
    title: "m-Indicator Redesign",
    subtitle: "Mobile App Redesign",
    desc: "A UX-led redesign of Mumbai's most-used transit app — simplifying cluttered navigation, modernising the visual language, and reducing the steps needed to find a train route. Focused on commuter-first hierarchy and one-thumb usability.",
    image: mindicator,
    device: "mobile",
    tags: ["Figma", "UX Audit", "Redesign", "Mobile", "Navigation"],
    links: [
      { label: "Figma", href: "#" },
      { label: "Assignment", href: "#" },
    ],
  },
  {
    title: "ShopLens",
    subtitle: "E-Commerce Dashboard",
    desc: "A clean, data-rich admin dashboard for e-commerce sellers — focused on information hierarchy, quick actions, and reducing cognitive load.",
    image: shopping,
    device: "laptop",
    tags: ["Figma", "Dashboard", "Design System", "Wireframing"],
    links: [{ label: "Figma", href: "#" }, { label: "Project", href: "#" }],
  },
  {
    title: "WanderPlan",
    subtitle: "Travel Planner App",
    desc: "An intuitive mobile travel planner that helps users build itineraries, discover local gems, and collaborate with fellow travelers.",
    image: stayease,
    device: "mobile",
    tags: ["Figma", "User Research", "Interaction Design", "Travel"],
    links: [{ label: "Figma", href: "#" }, { label: "Project", href: "#" }],
  },
];
const ProjectsGrid = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20">
      <div className="container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="section-eyebrow mb-2.5">Featured Work</div>
          <h2 className="section-title ">Ui Ux <em>Projects</em></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass-panel overflow-hidden group hoverable transition-all duration-300 hover:-translate-y-1.5"
              style={{ boxShadow: "0 3px 20px hsla(306,55%,33%,0.07)" }}
            >
              {/* Image — always visible */}
              <div className="h-[200px] relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Glassmorphism overlay on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-4 group-hover:translate-y-0"
                  style={{ background: "linear-gradient(to top, hsla(260,60%,5%,0.9) 0%, hsla(260,60%,5%,0.4) 60%, transparent 100%)", backdropFilter: "blur(6px)" }}>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="font-body text-[10px] tracking-wide px-2.5 py-1 rounded-md border text-foreground"
                        style={{ background: "hsla(306,55%,33%,0.2)", borderColor: "hsla(306,55%,33%,0.3)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <a href="#" className="mt-2 font-body text-[11px] font-semibold text-accent hover:text-foreground transition-colors hoverable">
                    View Project →
                  </a>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-display text-[25px] font-bold text-foreground mb-2">{p.title}</h3>
                <p className="font-body text-[15px] text-muted-foreground leading-relaxed mb-3.5">{p.desc}</p>
                <div className="flex gap-2">
                  {p.links.map((l) => (
                    <a key={l.label} href={l.href} className="font-body text-[12px] font-semibold text-accent px-3.5 py-1.5 rounded-md border border-border transition-all duration-200 hover:border-accent hoverable text-[12px] md:text-[13px]"
                      style={{ background: "hsla(306,55%,33%,0.07)" }}>
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
