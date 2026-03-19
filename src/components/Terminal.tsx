import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const commands: Record<string, string> = {
  help: `Available commands:\n  whoami   — about me\n  skills   — tech stack\n  projects — my work\n  contact  — reach me\n  clear    — clear terminal`,
  whoami: `Preksha Salvi\nB.E. Computer Engineering @ SPIT Mumbai (CSE '27)\nFull Stack Developer + UI/UX Designer\nMERN Stack | Java | Python | Figma`,
  skills: `Languages: Java, Python, C, C++, JavaScript\nFrameworks: React, Node.js, Express.js, Bootstrap\nTools: Git, GitHub, Figma, Canva, Linux\nDatabases: MongoDB\nPlatforms: LeetCode, HackerRank`,
  projects: `1. StayEase — MERN stack booking app\n2. Brain Tumor Detection — CNN/TensorFlow\n3. Recipe Route — REST API (Node/Express)`,
  contact: `Email: prekshasalvi05@gmail.com\nLinkedIn: linkedin.com/in/preksha-salvi\nGitHub: github.com/preksha-salvi`,
};

const chips = ["help", "whoami", "skills", "projects", "contact", "clear"];

const Terminal = () => {
  const [output, setOutput] = useState<Array<{ type: string; text: string }>>([
    { type: "info", text: "Welcome to Preksha's shell. Type 'help' to begin." },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const runCmd = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed === "clear") {
      setOutput([]);
      setInput("");
      return;
    }
    const result = commands[trimmed];
    setOutput((prev) => [
      ...prev,
      { type: "cmd", text: `visitor@preksha ~ $ ${cmd}` },
      { type: result ? "result" : "error", text: result || `Command not found: ${trimmed}. Type 'help'.` },
    ]);
    setInput("");
  };

  useEffect(() => {
    const el = document.getElementById("term-output");
    if (el) el.scrollTop = el.scrollHeight;
  }, [output]);

  return (
    <section id="terminal" className="py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-[100px] pointer-events-none" style={{ background: "hsl(186, 100%, 50%)" }} />

      <div className="container max-w-[920px] relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-10">
            <div className="section-eyebrow mb-3 justify-center">Interactive Shell</div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              Try the <em className="not-italic gradient-text">Terminal</em>
            </h2>
          </div>

          {/* Terminal frame */}
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{
              background: "hsla(260, 40%, 6%, 0.9)",
              border: "1px solid hsla(186, 100%, 50%, 0.12)",
              boxShadow: "0 24px 80px hsla(260, 60%, 5%, 0.6), 0 0 60px hsla(186, 100%, 50%, 0.06), inset 0 1px 0 hsla(186, 100%, 50%, 0.05)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Top bar */}
            <div
              className="flex items-center gap-2 px-5 py-3.5"
              style={{
                background: "hsla(260, 40%, 8%, 0.95)",
                borderBottom: "1px solid hsla(186, 100%, 50%, 0.08)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              </div>
              <div className="flex-1 text-center">
                <span className="font-mono text-[11px] tracking-wider" style={{ color: "hsla(186, 100%, 60%, 0.5)" }}>
                  preksha@portfolio:~
                </span>
              </div>
              <div className="w-[52px]" />
            </div>

            {/* Terminal body */}
            <div
              id="term-output"
              className="px-6 py-5 min-h-[300px] max-h-[420px] overflow-y-auto font-mono text-[13px] leading-[2]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {output.map((line, i) => (
                <div
                  key={i}
                  className="whitespace-pre-wrap"
                  style={{
                    color:
                      line.type === "cmd" ? "hsl(186, 100%, 60%)" :
                      line.type === "error" ? "#ff7070" :
                      line.type === "info" ? "hsla(186, 100%, 60%, 0.4)" :
                      "hsla(38, 33%, 93%, 0.85)",
                  }}
                >
                  {line.text}
                </div>
              ))}

              {/* Input line */}
              <div className="flex items-center gap-2 mt-1">
                <span style={{ color: "hsl(160, 70%, 55%)" }} className="font-mono text-[13px]">
                  visitor@preksha
                </span>
                <span style={{ color: "hsla(186, 100%, 60%, 0.4)" }}>~</span>
                <span style={{ color: "hsla(38, 33%, 93%, 0.5)" }}>$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && input.trim() && runCmd(input)}
                  className="flex-1 bg-transparent border-none outline-none font-mono text-[13px]"
                  style={{ color: "hsl(var(--foreground))", fontFamily: "var(--font-mono)" }}
                  placeholder="type a command..."
                  autoComplete="off"
                  spellCheck={false}
                />
                <span className="type-cursor" />
              </div>
            </div>

            {/* Footer status bar */}
            <div
              className="flex items-center justify-between px-5 py-2.5 font-mono text-[10px] tracking-wider"
              style={{
                background: "hsla(260, 40%, 8%, 0.95)",
                borderTop: "1px solid hsla(186, 100%, 50%, 0.08)",
                color: "hsla(186, 100%, 60%, 0.35)",
              }}
            >
              <span>bash — 80×24</span>
              <span>UTF-8</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(160, 70%, 55%)" }} />
                connected
              </span>
            </div>
          </div>

          {/* Command chips */}
          <div className="flex gap-2 flex-wrap mt-5 justify-center">
            {chips.map((c) => (
              <button
                key={c}
                onClick={() => runCmd(c)}
                className="text-[11px] tracking-wider px-4 py-2 rounded-full font-medium transition-all duration-300 hover:-translate-y-0.5 hoverable"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "hsla(186, 100%, 50%, 0.06)",
                  border: "1px solid hsla(186, 100%, 50%, 0.15)",
                  color: "hsl(186, 100%, 60%)",
                  boxShadow: "0 2px 12px hsla(186, 100%, 50%, 0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "hsla(186, 100%, 50%, 0.12)";
                  e.currentTarget.style.boxShadow = "0 4px 20px hsla(186, 100%, 50%, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "hsla(186, 100%, 50%, 0.06)";
                  e.currentTarget.style.boxShadow = "0 2px 12px hsla(186, 100%, 50%, 0.06)";
                }}
              >
                {`> ${c}`}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Terminal;
