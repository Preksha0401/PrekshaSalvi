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
    { type: "info", text: "Welcome! Try typing a command." },
    { type: "info", text: "Start with help" },
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
      { type: "cmd", text: `visitor:~$ ${cmd}` },
      { type: result ? "result" : "error", text: result || `Command not found: ${trimmed}. Type 'help'.` },
    ]);
    setInput("");
  };

  useEffect(() => {
    const el = document.getElementById("term-output");
    if (el) el.scrollTop = el.scrollHeight;
  }, [output]);

  return (
    <section id="terminal" className="py-24 md:py-32">
      <div className="container mx-auto max-w-[1200px] px-6 md:px-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-eyebrow mb-3">Preksha Shell</div>
          <h2 className="section-title mb-8">
            Try the <em>Terminal</em>
          </h2>

          <div
            className="glass-panel overflow-hidden rounded-[28px]"
            style={{ boxShadow: "0 16px 60px hsla(306,55%,33%,0.16)" }}
          >
            <div
              className="flex items-center gap-[7px] px-5 py-4"
              style={{ background: "hsla(260,40%,10%,0.8)" }}
            >
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-auto font-mono text-[12px] text-muted-foreground opacity-40">
                preksha@portfolio ~
              </span>
            </div>

            <div
              id="term-output"
              className="p-6 md:p-8 min-h-[360px] max-h-[500px] overflow-y-auto font-mono text-[14px] md:text-[15px] leading-[1.9]"
            >
              {output.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.type === "cmd"
                      ? "text-accent"
                      : line.type === "error"
                      ? "text-[#ff7070]"
                      : line.type === "info"
                      ? "text-muted-foreground"
                      : "text-foreground whitespace-pre-wrap"
                  }
                >
                  {line.text}
                </div>
              ))}

              <div className="flex items-center gap-[7px] mt-2">
                <span className="text-accent">visitor:~$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && input.trim() && runCmd(input)}
                  className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-[14px] md:text-[15px]"
                  placeholder="type here..."
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap mt-4">
            {chips.map((c) => (
              <button key={c} onClick={() => runCmd(c)} className="tag-pill text-[12px] md:text-[13px] hoverable">
                {c}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Terminal;