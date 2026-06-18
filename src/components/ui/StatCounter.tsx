"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type StatCounterProps = {
  value: number;
  suffix?: string;
  delay?: number;
  className?: string;
};

export function StatCounter({
  value,
  suffix = "%",
  delay = 0,
  className,
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: value,
        duration: 1.6,
        delay,
        ease: "power3.out",
        snap: { val: 1 },
        scrollTrigger: { trigger: el, start: "top 88%" },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.val)}${suffix}`;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value, suffix, delay]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
