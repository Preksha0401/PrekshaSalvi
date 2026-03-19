import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Github, Download, ArrowUpRight } from "lucide-react";
import resume from "@/assets/RESUME_FINAL.pdf";

const socials = [
  {
    icon: Mail,
    label: "prekshasalvi05@gmail.com",
    href: "mailto:prekshasalvi05@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/preksha-salvi-87871728b/",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Preksha0401",
  },
  {
    icon: Download,
    label: "Download Resume",
    href: resume,
    download: true,
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <section
      id="contact"
      className="py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(252,42%,25%) 0%, hsl(306,55%,33%) 60%, hsl(316,65%,60%) 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
            <div>
              <h2 className="font-display text-5xl md:text-7xl font-black leading-none mb-[18px]">
                <span className="block text-foreground">Let's</span>
                <span
                  className="block italic"
                  style={{
                    WebkitTextStroke: "1.5px hsla(0,0%,100%,0.45)",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Build
                </span>
                <span
                  className="block gradient-text"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(316,65%,80%), hsl(260,50%,75%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Together.
                </span>
              </h2>

              <p
                className="font-body text-sm font-light leading-relaxed mb-7 max-w-[340px]"
                style={{ color: "hsla(0,0%,100%,0.55)" }}
              >
                Open to full-time roles, internships, and interesting
                collaborations. Have a project in mind? Let's talk.
              </p>

              <div className="flex flex-col gap-2.5">
                {socials.map((s) => {
                  const Icon = s.icon;
                  const isExternal =
                    s.href.startsWith("http") || s.href.startsWith("mailto:");
                  const isResume = s.label === "Download Resume";

                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target={isExternal && !isResume ? "_blank" : undefined}
                      rel={isExternal && !isResume ? "noreferrer" : undefined}
                      download={isResume ? true : undefined}
                      className="flex items-center gap-3.5 px-[18px] py-3.5 rounded-xl border transition-all duration-200 hover:translate-x-1 hoverable"
                      style={{
                        background: "hsla(0,0%,100%,0.09)",
                        borderColor: "hsla(0,0%,100%,0.14)",
                        color: "hsla(0,0%,100%,0.75)",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <span className="w-5 flex justify-center">
                        <Icon size={18} />
                      </span>
                      <span className="font-body text-[13.5px] font-medium">
                        {s.label}
                      </span>
                      <span className="ml-auto opacity-50">
                        {isResume ? <Download size={14} /> : <ArrowUpRight size={14} />}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {[
                {
                  label: "Your Name",
                  type: "text",
                  key: "name",
                  placeholder: "Recruiter from Dream Company",
                },
                {
                  label: "Email",
                  type: "email",
                  key: "email",
                  placeholder: "hello@company.com",
                },
              ].map((f) => (
                <div key={f.key} className="flex flex-col gap-[7px]">
                  <label
                    className="font-body text-[10px] tracking-[2px] uppercase font-semibold"
                    style={{ color: "hsla(0,0%,100%,0.55)" }}
                  >
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) =>
                      setForm({ ...form, [f.key]: e.target.value })
                    }
                    className="rounded-lg px-[15px] py-3 text-foreground font-body text-[13.5px] outline-none transition-all duration-200 border placeholder:opacity-30"
                    style={{
                      background: "hsla(0,0%,100%,0.07)",
                      borderColor: "hsla(0,0%,100%,0.16)",
                    }}
                  />
                </div>
              ))}

              <div className="flex flex-col gap-[7px]">
                <label
                  className="font-body text-[10px] tracking-[2px] uppercase font-semibold"
                  style={{ color: "hsla(0,0%,100%,0.55)" }}
                >
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell me about the opportunity..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="rounded-lg px-[15px] py-3 text-foreground font-body text-[13.5px] outline-none resize-none transition-all duration-200 border placeholder:opacity-30"
                  style={{
                    background: "hsla(0,0%,100%,0.07)",
                    borderColor: "hsla(0,0%,100%,0.16)",
                  }}
                />
              </div>

              <button
                className="self-start px-8 py-3.5 rounded-full font-body text-sm font-bold tracking-wide transition-all duration-200 hover:-translate-y-0.5 hoverable"
                style={{
                  background: "white",
                  color: "hsl(306,55%,33%)",
                  boxShadow: "0 4px 18px hsla(0,0%,0%,0.14)",
                }}
              >
                Send Message →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;