"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const cursorX = useSpring(0, { stiffness: 500, damping: 38 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 38 });
  const scale = useSpring(1, { stiffness: 400, damping: 30 });

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;

    setEnabled(true);
    document.documentElement.classList.add("home-cursor-active");

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        "a, button, [data-cursor='true']",
      );
      if (target) {
        setHovering(true);
        scale.set(2.2);
      }
    };

    const onOut = () => {
      setHovering(false);
      scale.set(1);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.documentElement.classList.remove("home-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [cursorX, cursorY, scale]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-normal"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        style={{ scale }}
        className={`flex items-center justify-center rounded-full border transition-colors duration-300 ${
          hovering
            ? "h-10 w-10 border-[var(--indigo)]/40 bg-[var(--indigo)]/10"
            : "h-2.5 w-2.5 border-transparent bg-[var(--indigo)]"
        }`}
      >
        {hovering && (
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--indigo)]" />
        )}
      </motion.div>
    </motion.div>
  );
}
