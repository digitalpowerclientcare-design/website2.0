"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { FRAMEWORK_STAGES } from "@/lib/site";
import { SplitWords } from "./SplitWords";
import { ScrollReveal } from "./ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

export function FrameworkTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    const track = trackRef.current;
    if (!section || !line || !track) return;

    const length = 1200;
    line.style.strokeDasharray = `${length}`;
    line.style.strokeDashoffset = `${length}`;

    const stages = track.querySelectorAll(".timeline-stage");

    const ctx = gsap.context(() => {
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        },
      });

      stages.forEach((stage) => {
        gsap.from(stage, {
          opacity: 0,
          x: (stage as HTMLElement).dataset.side === "right" ? 40 : -40,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stage,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-gradient-to-b from-[var(--surface-alt)] via-[var(--indigo-bg)]/30 to-[var(--surface-alt)]"
    >
      <div className="content-container">
        <ScrollReveal variant="eyebrow" className="eyebrow mb-4">
          WHAT WE DO
        </ScrollReveal>
        <ScrollReveal variant="heading" className="heading-section mb-3">
          <SplitWords as="span" text="The O3Xs Framework" once={false} />
        </ScrollReveal>
        <ScrollReveal variant="body" className="body-lg mb-16 max-w-2xl">
          Optimize. Orchestrate. Operate. Innovate. Scale.
        </ScrollReveal>

        <div ref={trackRef} className="relative mx-auto max-w-4xl">
          <svg
            className="absolute top-0 left-1/2 hidden h-full w-px -translate-x-1/2 md:block"
            width="2"
            height="100%"
            style={{ minHeight: "100%" }}
            aria-hidden
          >
            <line
              ref={lineRef}
              x1="1"
              y1="0"
              x2="1"
              y2="1200"
              stroke="url(#line-grad)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="line-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#533afd" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#533afd" />
                <stop offset="100%" stopColor="#665efd" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          <div className="flex flex-col gap-12 md:gap-16">
            {FRAMEWORK_STAGES.map((stage, i) => {
              const isRight = i % 2 === 1;
              return (
                <article
                  key={stage.number}
                  data-side={isRight ? "right" : "left"}
                  className={`timeline-stage relative flex md:w-[calc(50%-2rem)] ${
                    isRight ? "md:ml-auto md:pl-8" : "md:mr-auto md:pr-8 md:text-right"
                  }`}
                >
                  <span
                    className={`absolute top-6 hidden h-4 w-4 rounded-full border-2 border-white bg-[var(--indigo)] shadow-[0_0_16px_rgba(83,58,253,0.6)] md:block ${
                      isRight ? "-left-[2.35rem]" : "-right-[2.35rem] md:left-auto"
                    }`}
                  />

                  <div className="w-full rounded-xl border border-[var(--border)] bg-white/90 p-6 shadow-[var(--shadow-card)] backdrop-blur-sm transition-shadow hover:shadow-[var(--shadow-card-hover)]">
                    <span className="font-stat mb-3 inline-block text-sm text-[var(--indigo)] shadow-[0_0_20px_rgba(83,58,253,0.25)]">
                      {String(stage.number).padStart(2, "0")}
                    </span>
                    <h3 className="heading-card mb-1 text-xl">{stage.title}</h3>
                    <p className="mb-3 text-sm font-medium text-[var(--indigo)]">
                      {stage.subtitle}
                    </p>
                    <p className="body-base mb-4">{stage.description}</p>
                    <p className="inline-flex items-center gap-2 rounded-full bg-[var(--indigo-bg)] px-3 py-1.5 text-xs font-medium text-[var(--indigo-deep)]">
                      <Check size={14} className="text-[var(--emerald)]" />
                      Deliverable: {stage.deliverable}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
