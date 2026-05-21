"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FRAMEWORK_STAGES } from "@/lib/site";
import { TextReveal } from "@/components/ui/TextReveal";

gsap.registerPlugin(ScrollTrigger);

type FrameworkProps = {
  expanded?: boolean;
  vertical?: boolean;
};

export function Framework({ expanded = false, vertical = false }: FrameworkProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current || vertical) return;

    const cards = gridRef.current.querySelectorAll(".framework-card");
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        x: -32,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, [vertical]);

  return (
    <section className="section-padding bg-[var(--surface-alt)]">
      <div className="content-container">
        <p className="eyebrow mb-4">WHAT WE DO</p>
        <TextReveal as="h2" className="heading-section mb-3">
          The O3Xs Framework
        </TextReveal>
        <p className="body-lg mb-12 max-w-2xl">
          Optimize. Orchestrate. Operate. Innovate. Scale.
        </p>

        <div
          ref={gridRef}
          className={
            vertical
              ? "relative space-y-0 border-l border-[var(--border)] pl-8"
              : "grid gap-4 lg:grid-cols-5"
          }
        >
          {FRAMEWORK_STAGES.map((stage) => (
            <article
              key={stage.number}
              className={`framework-card stripe-card p-6 ${
                vertical ? "relative mb-8 ml-2" : ""
              }`}
            >
              {vertical && (
                <span className="absolute -left-[2.35rem] top-6 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-white text-sm font-medium text-[var(--indigo)]">
                  {stage.number}
                </span>
              )}
              {!vertical && (
                <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--indigo)] text-sm font-medium text-white">
                  {stage.number}
                </span>
              )}
              <h3 className="heading-card mb-1 text-xl">{stage.title}</h3>
              <p className="mb-3 text-sm font-medium text-[var(--indigo)]">
                {stage.subtitle}
              </p>
              <p className="body-base mb-4">{stage.description}</p>
              <p className="caption text-[var(--indigo)]">
                Deliverable: {stage.deliverable}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
