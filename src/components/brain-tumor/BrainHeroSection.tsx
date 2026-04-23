import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ───────── tiny helpers ───────── */
const TAU = Math.PI * 2;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
}

interface OrbitalNode {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  hue: number;
}

interface PulseRing {
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

/* ───────── Canvas Animation ───────── */
const NeuralCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let w: number, h: number;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* particles */
    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    /* orbital nodes */
    const nodes: OrbitalNode[] = [
      { angle: 0,   radius: 120, speed: 0.003,  size: 6, hue: 200 },
      { angle: 1.2, radius: 120, speed: 0.003,  size: 4, hue: 260 },
      { angle: 2.5, radius: 120, speed: 0.003,  size: 5, hue: 180 },
      { angle: 0.8, radius: 180, speed: 0.002,  size: 7, hue: 220 },
      { angle: 2.0, radius: 180, speed: 0.002,  size: 5, hue: 280 },
      { angle: 3.6, radius: 180, speed: 0.002,  size: 4, hue: 190 },
      { angle: 0.3, radius: 240, speed: 0.0014, size: 5, hue: 210 },
      { angle: 1.8, radius: 240, speed: 0.0014, size: 6, hue: 270 },
      { angle: 3.2, radius: 240, speed: 0.0014, size: 4, hue: 195 },
    ];

    /* pulse rings */
    const rings: PulseRing[] = [
      { radius: 0,  maxRadius: 320, alpha: 0.35, speed: 0.45 },
      { radius: 80, maxRadius: 320, alpha: 0.25, speed: 0.35 },
      { radius: 160,maxRadius: 320, alpha: 0.15, speed: 0.28 },
    ];

    /* brain rotation angle */
    let brainAngle = 0;

    const drawBrain = (cx: number, cy: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(brainAngle);
      brainAngle += 0.002;

      /* brain outline – two hemispheres */
      const scale = Math.min(w, h) < 600 ? 0.55 : 0.8;

      /* outer glow */
      const glowGrad = ctx.createRadialGradient(0, 0, 30 * scale, 0, 0, 90 * scale);
      glowGrad.addColorStop(0, "rgba(100, 180, 255, 0.12)");
      glowGrad.addColorStop(0.5, "rgba(140, 80, 255, 0.06)");
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 90 * scale, 0, TAU);
      ctx.fill();

      /* left hemisphere */
      ctx.strokeStyle = "rgba(100, 200, 255, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(-8 * scale, -6 * scale, 46 * scale, 56 * scale, -0.1, 0, TAU);
      ctx.stroke();

      /* right hemisphere */
      ctx.strokeStyle = "rgba(160, 100, 255, 0.5)";
      ctx.beginPath();
      ctx.ellipse(8 * scale, -6 * scale, 46 * scale, 56 * scale, 0.1, 0, TAU);
      ctx.stroke();

      /* central fissure */
      ctx.strokeStyle = "rgba(120, 200, 255, 0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -55 * scale);
      ctx.bezierCurveTo(-3 * scale, -20 * scale, 3 * scale, 20 * scale, 0, 55 * scale);
      ctx.stroke();

      /* sulci (brain folds) – left */
      ctx.strokeStyle = "rgba(100, 200, 255, 0.2)";
      ctx.lineWidth = 0.8;
      for (let i = 0; i < 4; i++) {
        const yOff = -35 * scale + i * 20 * scale;
        ctx.beginPath();
        ctx.moveTo(-5 * scale, yOff);
        ctx.bezierCurveTo(-20 * scale, yOff - 8 * scale, -35 * scale, yOff + 4 * scale, -42 * scale, yOff);
        ctx.stroke();
      }

      /* sulci – right */
      ctx.strokeStyle = "rgba(160, 100, 255, 0.2)";
      for (let i = 0; i < 4; i++) {
        const yOff = -30 * scale + i * 20 * scale;
        ctx.beginPath();
        ctx.moveTo(5 * scale, yOff);
        ctx.bezierCurveTo(20 * scale, yOff - 8 * scale, 35 * scale, yOff + 4 * scale, 42 * scale, yOff);
        ctx.stroke();
      }

      /* cerebellum hint at bottom */
      ctx.strokeStyle = "rgba(0, 220, 220, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 48 * scale, 28 * scale, 14 * scale, 0, 0, Math.PI);
      ctx.stroke();

      /* inner glow */
      const innerGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, 40 * scale);
      innerGlow.addColorStop(0, "rgba(100, 200, 255, 0.08)");
      innerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = innerGlow;
      ctx.beginPath();
      ctx.arc(0, 0, 40 * scale, 0, TAU);
      ctx.fill();

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;

      /* parallax offset from mouse */
      const px = (mouse.current.x - cx) * 0.02;
      const py = (mouse.current.y - cy) * 0.02;

      /* ── particles ── */
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x + px * 0.5, p.y + py * 0.5, p.r, 0, TAU);
        ctx.fillStyle = `rgba(140, 200, 255, ${p.alpha})`;
        ctx.fill();
      });

      /* ── orbit rings (static) ── */
      [120, 180, 240].forEach((r) => {
        ctx.beginPath();
        ctx.arc(cx + px, cy + py, r, 0, TAU);
        ctx.strokeStyle = "rgba(100, 180, 255, 0.07)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      /* ── pulse rings ── */
      rings.forEach((ring) => {
        ring.radius += ring.speed;
        if (ring.radius > ring.maxRadius) ring.radius = 0;
        const a = ring.alpha * (1 - ring.radius / ring.maxRadius);
        ctx.beginPath();
        ctx.arc(cx + px, cy + py, ring.radius, 0, TAU);
        ctx.strokeStyle = `rgba(80, 200, 255, ${a})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      /* ── orbital nodes ── */
      nodes.forEach((n) => {
        n.angle += n.speed;
        const nx = cx + Math.cos(n.angle) * n.radius + px;
        const ny = cy + Math.sin(n.angle) * n.radius + py;

        /* neural pathway line to center */
        ctx.beginPath();
        ctx.moveTo(cx + px, cy + py);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = `hsla(${n.hue}, 80%, 65%, 0.08)`;
        ctx.lineWidth = 0.6;
        ctx.stroke();

        /* glow */
        const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.size * 3);
        g.addColorStop(0, `hsla(${n.hue}, 90%, 70%, 0.6)`);
        g.addColorStop(1, `hsla(${n.hue}, 90%, 70%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(nx, ny, n.size * 3, 0, TAU);
        ctx.fill();

        /* core */
        ctx.beginPath();
        ctx.arc(nx, ny, n.size, 0, TAU);
        ctx.fillStyle = `hsla(${n.hue}, 90%, 75%, 0.9)`;
        ctx.fill();
      });

      /* ── brain ── */
      drawBrain(cx + px, cy + py);

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

/* ───────── Hero Section ───────── */
const BrainHeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, #0d0628 0%, #08031a 50%, #020010 100%)",
      }}
    >
      {/* canvas animation */}
      <NeuralCanvas />

      {/* vignette edges */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(2,0,16,0.85) 100%)",
        }}
      />

      {/* content overlay */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      >
        {/* eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-5 px-4 py-1.5 rounded-full border text-[11px] tracking-[3px] uppercase"
          style={{
            borderColor: "rgba(100, 200, 255, 0.2)",
            background: "rgba(100, 200, 255, 0.06)",
            color: "rgba(140, 210, 255, 0.9)",
          }}
        >
          AI + Medical Imaging
        </motion.div>

        {/* title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-5"
          style={{
            fontFamily: "'DM Serif Display', serif",
            background:
              "linear-gradient(135deg, #ffffff 0%, #8ec5fc 40%, #a78bfa 70%, #60d5f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Brain Tumor Detection
        </motion.h1>

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="text-base sm:text-lg md:text-xl max-w-xl mb-8"
          style={{ color: "rgba(180, 210, 240, 0.7)" }}
        >
          AI-powered MRI analysis for tumor detection and risk classification
        </motion.p>

        {/* buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#demo"
            className="group relative px-7 py-3 rounded-full text-sm font-semibold tracking-wide overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #6366f1, #06b6d4)",
              color: "#fff",
              boxShadow: "0 4px 24px rgba(99, 102, 241, 0.35)",
            }}
          >
            <span className="relative z-10">Live Demo</span>
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, #818cf8, #22d3ee)",
              }}
            />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 rounded-full text-sm font-semibold tracking-wide border transition-all duration-300 hover:-translate-y-0.5"
            style={{
              borderColor: "rgba(100, 200, 255, 0.2)",
              color: "rgba(200, 220, 255, 0.85)",
              background: "rgba(100, 200, 255, 0.04)",
            }}
          >
            GitHub Repo
          </a>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] tracking-[3px] uppercase"
          style={{ color: "rgba(140, 210, 255, 0.4)" }}
        >
          Scroll
        </span>
        <div
          className="w-5 h-8 rounded-full border flex justify-center pt-1.5"
          style={{ borderColor: "rgba(140, 210, 255, 0.2)" }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full"
            style={{ background: "rgba(140, 210, 255, 0.5)" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default BrainHeroSection;
