"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type TextRevealProps = {
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  children: string;
};

export function TextReveal({
  as: Tag = "h2",
  className,
  children,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = children.split(" ");
    el.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block overflow-hidden align-bottom"><span class="word inline-block translate-y-full opacity-0">${word}&nbsp;</span></span>`,
      )
      .join("");

    const wordEls = el.querySelectorAll(".word");

    const ctx = gsap.context(() => {
      gsap.to(wordEls, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [children]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
