"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";

const GradientMesh = dynamic(
  () => import("./GradientMesh").then((m) => m.GradientMesh),
  { ssr: false },
);

type GradientCanvasProps = {
  variant?: "light" | "dark";
  className?: string;
};

export function GradientCanvas({
  variant = "light",
  className = "",
}: GradientCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(el);

    const onVisibility = () => {
      setPaused(document.hidden);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const shouldRender = visible && !paused;

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div
        className="absolute inset-0 -top-[15%] h-[65%] w-[140%] -translate-x-[10%]"
        style={{ transform: "rotate(-12deg) scale(1.1)" }}
      >
        {shouldRender && (
          <Canvas
            camera={{ position: [0, 0, 2.5], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
          >
            <Suspense fallback={null}>
              <GradientMesh variant={variant} />
            </Suspense>
          </Canvas>
        )}
      </div>
    </div>
  );
}
