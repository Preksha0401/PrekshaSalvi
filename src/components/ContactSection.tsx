import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Github, Download, ArrowUpRight, Send, Heart } from "lucide-react";
import resume from "@/assets/RESUME_FINAL.pdf";
import contactBg from "@/assets/image1.png";

const socials = [
  { icon: Mail,     label: "EMAIL ME", sub: "prekshasalvi05@gmail.com",      href: "mailto:prekshasalvi05@gmail.com" },
  { icon: Linkedin, label: "LINKEDIN", sub: "linkedin.com/in/preksha-salvi", href: "https://www.linkedin.com/in/preksha-salvi-87871728b/" },
  { icon: Github,   label: "GITHUB",   sub: "github.com/Preksha0401",        href: "https://github.com/Preksha0401" },
  { icon: Download, label: "RESUME",   sub: "Download My Resume",            href: resume, download: true },
];

const ContactSection = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent]  = useState(false);
  const [liked, setLiked] = useState(false);

  const handleSend = () => {
    if (!form.name || !form.email) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const focusIn = (e: React.FocusEvent) => {
    const p = e.currentTarget.parentElement as HTMLElement;
    p.style.borderColor = "rgba(217,70,239,0.6)";
    p.style.boxShadow   = "0 0 16px rgba(192,38,211,0.18)";
  };
  const focusOut = (e: React.FocusEvent) => {
    const p = e.currentTarget.parentElement as HTMLElement;
    p.style.borderColor = "rgba(255,255,255,0.08)";
    p.style.boxShadow   = "none";
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* background image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${contactBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        zIndex: 0,
      }} />

      {/* dark overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(180deg, rgba(2,0,8,0.52) 0%, rgba(2,0,8,0.28) 40%, rgba(2,0,8,0.60) 100%)",
      }} />

      {/* content */}
      <div style={{
        position: "relative", zIndex: 10,
        flex: 1, display: "flex", flexDirection: "column",
        padding: "0 5vw",
        paddingTop: "clamp(22px,3.5vh,44px)",
        paddingBottom: "clamp(24px,3vh,40px)",
        boxSizing: "border-box",
        overflow: "hidden",
      }}>

        {/* eyebrow — matches "FEATURED WORK" style from Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.45 }}
          className="flex items-center gap-2"
          style={{ marginBottom: "clamp(8px,1.4vh,16px)" }}
        >
          {/* pink dash line — same as Projects section */}
          <div style={{ width: 28, height: 2, background: "hsl(316,65%,60%)", borderRadius: 2 }} />
          <span className="font-body text-[10px] tracking-[3px] uppercase font-semibold"
            style={{ color: "hsl(316,65%,60%)" }}>
            LET'S CONNECT
          </span>
        </motion.div>

        {/* two-col grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "3vw", flex: 1, alignItems: "center", overflow: "hidden",
        }}>

          {/* ════ LEFT ════ */}
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {/* headline — matches "Ui Ux Projects" heading size & weight */}
            <div style={{ marginBottom: "clamp(4px,0.8vh,10px)", lineHeight: 1.05 }}>
              {/* white part like "Ui Ux" */}
              <h2 className="font-display"
                style={{
                  fontWeight: 900,
                  fontSize: "clamp(2.4rem,4.8vw,4.2rem)",
                  color: "#fff",
                  margin: 0, lineHeight: 1.05,
                }}>
                Let's Create
              </h2>
              {/* pink gradient part like "Projects" */}
              <h2 className="font-display"
                style={{
                  fontWeight: 900,
                  fontSize: "clamp(2.4rem,4.8vw,4.2rem)",
                  fontStyle: "italic",
                  background: "linear-gradient(135deg, hsl(316,65%,80%), hsl(260,50%,75%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  margin: 0, lineHeight: 1.05,
                }}>
                Something Amazing.
              </h2>
            </div>

            {/* 24h — italic, small, like body text */}
            <div style={{ marginBottom: "clamp(6px,1vh,12px)" }}>
              <span className="font-body"
                style={{ fontStyle: "italic", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                I reply within{" "}
                <span style={{ color: "hsl(316,65%,70%)", fontStyle: "normal", fontWeight: 700 }}>24h</span>
              </span>
              <svg width="32" height="22" viewBox="0 0 32 22"
                style={{ display: "inline-block", marginLeft: 5, verticalAlign: "middle", opacity: 0.7 }}>
                <path d="M2 3 Q16 5 26 18" stroke="hsl(316,65%,70%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M22 17 L26 18 L25 14" stroke="hsl(316,65%,70%)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* body — matches project card description style */}
            <p className="font-body"
              style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.5)", maxWidth: 310, marginBottom: "clamp(8px,1.5vh,18px)" }}>
              I'm always excited to work on new ideas, collaborate,
              or just talk about tech. Drop me a message and I'll get back to you!
            </p>

            {/* social cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 7, maxWidth: 360 }}>
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                    download={(s as any).download}
                    whileHover={{ x: 5 }}
                    style={{
                      display: "flex", alignItems: "center", gap: 11,
                      padding: "8px 13px", borderRadius: 11,
                      background: "rgba(0,0,0,0.40)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(14px)",
                      textDecoration: "none",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "hsl(316,65%,50%)";
                      (e.currentTarget as HTMLElement).style.boxShadow   = "0 0 18px rgba(192,38,211,0.22)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                      (e.currentTarget as HTMLElement).style.boxShadow   = "none";
                    }}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "rgba(192,38,211,0.2)", border: "1px solid rgba(217,70,239,0.3)",
                    }}>
                      <Icon size={13} color="hsl(316,65%,75%)" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {/* label matches "Figma / Project" pill label style */}
                      <span className="font-body"
                        style={{ fontSize: 9.5, letterSpacing: "2px", textTransform: "uppercase", color: "hsl(316,65%,70%)", fontWeight: 600 }}>
                        {s.label}
                      </span>
                      <span className="font-body"
                        style={{ fontSize: 11.5, color: "rgba(255,255,255,0.5)" }}>{s.sub}</span>
                    </div>
                    <ArrowUpRight size={12} style={{ marginLeft: "auto", color: "rgba(255,255,255,0.28)" }} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* ════ RIGHT: form ════ */}
          <motion.div
            initial={{ opacity: 0, x: 22 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            style={{ display: "flex", flexDirection: "column", gap: 0, zIndex: 2 }}
          >
            {/* macOS bar */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "7px 14px",
              borderRadius: "12px 12px 0 0",
              background: "rgba(4,0,14,0.88)",
              border: "1px solid rgba(217,70,239,0.22)",
              borderBottom: "none",
              backdropFilter: "blur(20px)",
            }}>
              <div style={{ display: "flex", gap: 5 }}>
                {["#ef4444","#eab308","#22c55e"].map(c => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.85 }} />
                ))}
              </div>
              <span className="font-body"
                style={{ fontSize: 9.5, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(217,70,239,0.75)", marginLeft: 6 }}>
                SEND ME A MESSAGE
              </span>
            </div>

            {/* form body */}
            <div style={{
              display: "flex", flexDirection: "column", gap: 7,
              padding: "14px 16px",
              borderRadius: "0 0 12px 12px",
              background: "rgba(4,0,14,0.78)",
              border: "1px solid rgba(217,70,239,0.22)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 8px 40px rgba(139,92,246,0.12)",
            }}>
              {[
                { key:"name",    emoji:"👤", placeholder:"Your Name",         type:"text"  },
                { key:"email",   emoji:"✉️",  placeholder:"Your Email",        type:"email" },
                { key:"subject", emoji:"📁", placeholder:"Project / Subject", type:"text"  },
              ].map(f => (
                <div key={f.key} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 13px", borderRadius: 8,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}>
                  <span style={{ fontSize: 13, opacity: 0.38, flexShrink: 0 }}>{f.emoji}</span>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    className="font-body"
                    style={{
                      width: "100%", background: "transparent", border: "none", outline: "none",
                      fontSize: 13, color: "rgba(255,255,255,0.85)",
                    }}
                    onFocus={focusIn} onBlur={focusOut}
                  />
                </div>
              ))}

              <div style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                padding: "9px 13px", borderRadius: 8,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}>
                <span style={{ fontSize: 13, opacity: 0.38, flexShrink: 0, marginTop: 2 }}>✏️</span>
                <textarea
                  rows={3}
                  placeholder="Your Message"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="font-body"
                  style={{
                    width: "100%", background: "transparent", border: "none", outline: "none",
                    resize: "none", fontSize: 13, color: "rgba(255,255,255,0.85)",
                  }}
                  onFocus={focusIn} onBlur={focusOut}
                />
              </div>

              {/* Send button — matches "Figma / Case Study" pill style but full-width */}
              <motion.button
                onClick={handleSend}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="font-body"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "12px 0", borderRadius: 9, border: "none", cursor: "pointer",
                  fontSize: 14, fontWeight: 700, color: "#fff",
                  background: sent
                    ? "linear-gradient(135deg,#22c55e,#16a34a)"
                    : "linear-gradient(135deg, hsl(316,65%,45%) 0%, hsl(260,50%,45%) 100%)",
                  boxShadow: sent
                    ? "0 4px 22px rgba(34,197,94,0.35)"
                    : "0 4px 24px rgba(192,38,211,0.38)",
                  transition: "background 0.35s, box-shadow 0.35s",
                }}
              >
                {sent ? "Message Sent! 🎉" : <><span>Send Message</span><Send size={14} /></>}
              </motion.button>
            </div>

            {/* quote + heart */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, paddingLeft: 4, marginTop: 10 }}>
              <span style={{ fontSize: 26, lineHeight: 1, color: "hsla(316,65%,60%,0.5)", fontFamily: "serif", marginTop: -4 }}>"</span>
              <div>
                <p className="font-body"
                  style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.55, margin: 0 }}>
                  Great things happen when people code together.
                </p>
                <p className="font-body"
                  style={{ fontSize: 12, color: "hsl(316,65%,70%)", fontWeight: 600, margin: "2px 0 0" }}>
                  Let's build the future.
                </p>
              </div>
              <motion.button
                onClick={() => setLiked(l => !l)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.85 }}
                style={{
                  marginLeft: "auto", width: 32, height: 32, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: liked ? "rgba(217,70,239,0.25)" : "rgba(192,38,211,0.1)",
                  border: `1px solid ${liked ? "rgba(217,70,239,0.55)" : "rgba(217,70,239,0.28)"}`,
                  cursor: "pointer",
                  boxShadow: liked ? "0 0 14px rgba(217,70,239,0.4)" : "none",
                  transition: "all 0.25s",
                }}
              >
                <Heart size={13} color={liked ? "hsl(316,65%,85%)" : "hsl(316,65%,70%)"} fill={liked ? "hsl(316,65%,85%)" : "none"} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;