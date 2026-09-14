import { useMemo } from "react";
import { motion } from "framer-motion";

export default function PetalRain({ count = 12 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 12 + Math.random() * 10,
        size: 8 + Math.random() * 12,
        opacity: 0.15 + Math.random() * 0.3,
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-[-5%] rounded-full border border-primary/60"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.4,
            opacity: p.opacity,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, 30, -20, 15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
