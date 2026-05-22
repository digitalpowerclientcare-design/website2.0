"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "indigo" | "white";
  className?: string;
};

const MAX_OFFSET = 8;

export function MagneticButton({
  href,
  children,
  variant = "indigo",
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovering, setHovering] = useState(false);

  const x = useSpring(0, { stiffness: 350, damping: 28 });
  const y = useSpring(0, { stiffness: 350, damping: 28 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = ((e.clientX - centerX) / rect.width) * MAX_OFFSET;
    const deltaY = ((e.clientY - centerY) / rect.height) * MAX_OFFSET;
    x.set(deltaX);
    y.set(deltaY);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setHovering(false);
  };

  return (
    <motion.span
      style={{ x, y, willChange: hovering ? "transform" : "auto" }}
      className="inline-block"
    >
      <Link
        ref={ref}
        href={href}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={reset}
        onMouseMove={handleMove}
        className={cn(
          variant === "indigo" ? "btn-indigo" : "btn-white",
          className,
        )}
      >
        {children}
      </Link>
    </motion.span>
  );
}
