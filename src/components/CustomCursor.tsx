import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", onMove);

    let raf: number;
    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.left = mx + "px";
        dotRef.current.style.top = my + "px";
      }
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const hovers = document.querySelectorAll("a,button,.hoverable");
    const enter = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "48px";
        ringRef.current.style.height = "48px";
        ringRef.current.style.borderColor = "hsla(306,55%,33%,0.65)";
      }
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };
    const leave = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "34px";
        ringRef.current.style.height = "34px";
        ringRef.current.style.borderColor = "hsla(306,55%,33%,0.45)";
      }
      if (dotRef.current) dotRef.current.style.opacity = "1";
    };
    hovers.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed w-[9px] h-[9px] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "hsl(var(--mag))" }}
      />
      <div
        ref={ringRef}
        className="fixed w-[34px] h-[34px] rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-150"
        style={{ border: "1.5px solid hsla(306,55%,33%,0.45)" }}
      />
    </>
  );
};

export default CustomCursor;
