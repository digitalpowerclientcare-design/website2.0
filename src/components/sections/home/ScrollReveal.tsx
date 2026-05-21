"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "heading" | "eyebrow" | "body" | "card";
};

export function ScrollReveal({
  children,
  className,
  variant = "body",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const base = {
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      };

      if (variant === "heading") {
        gsap.from(el, { ...base, y: 40, rotateX: 12 });
      } else if (variant === "eyebrow") {
        gsap.from(el, { ...base, y: 12, letterSpacing: "0.2em" });
        gsap.to(el, {
          letterSpacing: "0.12em",
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      } else if (variant === "card") {
        gsap.from(el, { ...base, y: 32, rotateX: 15 });
      } else {
        gsap.from(el, { ...base, y: 20, filter: "blur(10px)" });
        gsap.to(el, {
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [variant]);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
