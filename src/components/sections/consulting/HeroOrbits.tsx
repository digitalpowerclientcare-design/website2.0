"use client";

import { motion } from "motion/react";

/** Decorative SVG illustration: orbits + data nodes for the consulting hero. */
export function HeroOrbits() {
  const nodes = [
    { cx: 220, cy: 120, r: 5, color: "#533AFD", delay: 0 },
    { cx: 320, cy: 220, r: 4, color: "#10B981", delay: 0.3 },
    { cx: 110, cy: 230, r: 4, color: "#F59E0B", delay: 0.6 },
    { cx: 270, cy: 320, r: 5, color: "#A855F7", delay: 0.9 },
    { cx: 100, cy: 140, r: 3, color: "#3B82F6", delay: 1.2 },
  ];

  return (
    <div className="relative aspect-square w-full max-w-[460px]">
      <svg
        viewBox="0 0 420 420"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <radialGradient id="ring-fade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#533AFD" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#533AFD" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#533AFD" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#533AFD" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        <circle cx="210" cy="210" r="200" fill="url(#ring-fade)" />

        {[80, 130, 180].map((r, i) => (
          <motion.circle
            key={r}
            cx="210"
            cy="210"
            r={r}
            fill="none"
            stroke="rgba(83,58,253,0.18)"
            strokeWidth="1"
            strokeDasharray="4 6"
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360, opacity: 1 }}
            transition={{
              opacity: { duration: 0.6, delay: i * 0.15 },
              rotate: { duration: 60 + i * 20, ease: "linear", repeat: Infinity },
            }}
            style={{ originX: "210px", originY: "210px" }}
          />
        ))}

        {nodes.map((n, i) => (
          <motion.line
            key={`l-${i}`}
            x1="210"
            y1="210"
            x2={n.cx}
            y2={n.cy}
            stroke="url(#line-grad)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 + n.delay }}
          />
        ))}

        <motion.circle
          cx="210"
          cy="210"
          r="10"
          fill="#533AFD"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.15, 1] }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx="210"
          cy="210"
          r="22"
          fill="none"
          stroke="#533AFD"
          strokeOpacity="0.35"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [0.6, 1.6, 0.6], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {nodes.map((n, i) => (
          <motion.g key={`n-${i}`}>
            <motion.circle
              cx={n.cx}
              cy={n.cy}
              r={n.r}
              fill={n.color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + n.delay }}
            />
            <motion.circle
              cx={n.cx}
              cy={n.cy}
              r={n.r * 2.2}
              fill="none"
              stroke={n.color}
              strokeOpacity="0.25"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.6, 0.8], opacity: [0.5, 0, 0.5] }}
              transition={{
                duration: 2.4,
                delay: 0.6 + n.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
