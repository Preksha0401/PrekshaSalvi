import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import stayease from "@/assets/project-stayease.jpg";
import braintumor from "@/assets/project-braintumor.jpg";
import reciperoute from "@/assets/project-reciperoute.jpg";
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet"></link>

const projects = [
  {
    title: "Brain Tumor Detection",
    desc: "AI-powered medical imaging using deep learning (CNN) to detect and classify brain tumors from MRI scans with high accuracy.",
    image: braintumor,
    tags: ["Python", "TensorFlow", "CNN", "OpenCV"],
    links: [{ label: "GitHub", href: "#" }, { label: "Demo", href: "#" }],
    detailLink: "/brain-tumor-detection",
  },
  {
    title: "WellSphere",
    desc: "AI-powered smart campus and hostel health intelligence for early risk detection, mess feedback analysis, and warden alerts.",
    image: stayease,
    tags: ["Vue.js", "FastAPI", "PostgreSQL", "AI/ML"],
    links: [],
    detailLink: "/wellsphere",
  },
  {
    title: "Recipe Route",
    desc: "A robust REST API backend for discovering, saving, and sharing recipes — full CRUD operations with clean documentation.",
    image: reciperoute,
    tags: ["Node.js", "Express", "MongoDB", "REST API"],
    links: [{ label: "GitHub", href: "#" }, { label: "Docs", href: "#" }],
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
          <h2 className="section-title ">My <em>Projects</em></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -8, rotateX: 1.5 }}
              className="glass-panel overflow-hidden group hoverable transition-all duration-300"
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
                  {(p as typeof p & { detailLink?: string }).detailLink ? (
                    <Link to={(p as typeof p & { detailLink?: string }).detailLink!} className="mt-2 font-body text-[11px] font-semibold text-accent hover:text-foreground transition-colors hoverable">
                      View Case Study →
                    </Link>
                  ) : (
                    <a href="#" className="mt-2 font-body text-[11px] font-semibold text-accent hover:text-foreground transition-colors hoverable">
                      View Project →
                    </a>
                  )}
                </div>
              </div>

              <div className="p-5">
                {(p as typeof p & { detailLink?: string }).detailLink ? (
                  <Link to={(p as typeof p & { detailLink?: string }).detailLink!} className="hoverable">
                    <h3 className="font-display text-[25px] font-bold text-foreground mb-2 transition-colors group-hover:text-accent">{p.title}</h3>
                  </Link>
                ) : (
                  <h3 className="font-display text-[25px] font-bold text-foreground mb-2">{p.title}</h3>
                )}
                <p className="font-body text-[15px] text-muted-foreground leading-relaxed mb-3.5">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {(p as typeof p & { detailLink?: string }).detailLink && (
                    <Link to={(p as typeof p & { detailLink?: string }).detailLink!} className="font-body text-[12px] font-semibold text-accent px-3.5 py-1.5 rounded-md border border-accent/60 transition-all duration-200 hover:border-accent hover:bg-accent/10 hoverable text-[12px] md:text-[13px]">
                      Case Study
                    </Link>
                  )}
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
