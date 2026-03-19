import { useEffect, useState } from "react";

const CurtainWipe = () => {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setGone(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  if (gone) return null;

  return (
    <div className="fixed inset-0 z-[9500] flex pointer-events-none">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 origin-top"
          style={{
            background: "hsl(var(--navy))",
            animation: `curtain-lift 0.65s cubic-bezier(0.77,0,0.18,1) ${i * 0.06}s forwards`,
          }}
        />
      ))}
    </div>
  );
};

export default CurtainWipe;
