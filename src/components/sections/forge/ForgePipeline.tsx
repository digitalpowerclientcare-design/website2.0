"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Agent = {
  letter: string;
  name: string;
  description: string;
};

const AGENTS: Agent[] = [
  {
    letter: "A",
    name: "Intake & Parse",
    description:
      "Receives plain-English feature request and extracts intent, scope, and constraints.",
  },
  {
    letter: "B",
    name: "Codebase Analysis",
    description:
      "Maps existing architecture, dependencies, and patterns from your actual repository.",
  },
  {
    letter: "C",
    name: "Generation",
    description:
      "Produces candidate code grounded in real codebase context — not generic model assumptions.",
  },
  {
    letter: "D",
    name: "Validation",
    description:
      "EDIT_TARGETS hallucination prevention layer verifies every change against the codebase.",
  },
  {
    letter: "E",
    name: "Agent F Review",
    description:
      "Senior-engineer-level code review simulation catches what humans miss in fatigue.",
  },
  {
    letter: "F",
    name: "Audit Trail",
    description:
      "SOC2-compliant log of every agent decision, prompt, and output. Compliance built in.",
  },
];

export function ForgePipeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const arrowRefs = useRef<(SVGSVGElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tid = window.setTimeout(() => {
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        const arrows = arrowRefs.current.filter(Boolean) as SVGSVGElement[];

        gsap.set(cards, { opacity: 0, y: 24 });
        gsap.set(arrows, { opacity: 0, scale: 0.6 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });

        cards.forEach((card, i) => {
          tl.to(
            card,
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
            i * 0.12,
          );
          if (arrows[i]) {
            tl.to(
              arrows[i],
              { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" },
              i * 0.12 + 0.18,
            );
          }
        });

        ScrollTrigger.refresh();
      }, 80);

      return () => window.clearTimeout(tid);
    }, sectionRef);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative bg-[var(--surface-alt)] py-24 md:py-28"
    >
      <div className="content-container mb-14 max-w-3xl">
        <p className="eyebrow mb-3">Six agents. One verified output.</p>
        <h2 className="heading-section">The FORGE Verification Pipeline</h2>
        <p className="body-lg mt-4">
          A structured handoff between specialized agents — each one
          accountable for a stage in the verification chain.
        </p>
      </div>

      <div className="content-container">
        <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center lg:gap-3">
          {AGENTS.map((agent, i) => (
            <div key={agent.letter} className="contents">
              <div
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="relative flex shrink-0 flex-col rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[0_4px_20px_rgba(28,30,84,0.04)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(83,58,253,0.10)] lg:h-[260px] lg:w-[180px]"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--indigo-bg)]">
                  <span className="font-stat text-[28px] leading-none text-[var(--indigo)]">
                    {agent.letter}
                  </span>
                </div>
                <p className="text-[14px] font-semibold text-[var(--ink)]">
                  {agent.name}
                </p>
                <p className="mt-2 line-clamp-4 text-[12px] leading-relaxed text-[var(--ink-secondary)]">
                  {agent.description}
                </p>
              </div>

              {i < AGENTS.length - 1 && (
                <svg
                  ref={(el) => {
                    arrowRefs.current[i] = el;
                  }}
                  viewBox="0 0 24 24"
                  className="hidden h-5 w-5 shrink-0 self-center text-[var(--indigo)] lg:block"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
