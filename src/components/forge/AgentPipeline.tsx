"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { FORGE_AGENTS } from "@/lib/site";
import { PipelineNode } from "./PipelineNode";
import { TextReveal } from "@/components/ui/TextReveal";

gsap.registerPlugin(ScrollTrigger);

export function AgentPipeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const container = containerRef.current;
    if (!line || !container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: container,
            start: "top 70%",
          },
        },
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding bg-[var(--canvas)]">
      <div className="content-container">
        <p className="eyebrow mb-4">SIX AGENTS. ONE VERIFIED OUTPUT.</p>
        <TextReveal as="h2" className="heading-section mb-12">
          The FORGE Verification Pipeline
        </TextReveal>

        <div ref={containerRef} className="relative">
          <div
            ref={lineRef}
            className="absolute left-0 right-0 top-1/2 hidden h-px origin-left bg-gradient-to-r from-[var(--indigo)] to-transparent lg:block"
            aria-hidden
          />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-4">
            {FORGE_AGENTS.map((agent, index) => (
              <div key={agent.id} className="flex flex-1 items-center gap-2">
                <PipelineNode
                  id={`Agent ${agent.id}`}
                  title={agent.title}
                  description={agent.description}
                />
                {index < FORGE_AGENTS.length - 1 && (
                  <ArrowRight
                    className="hidden shrink-0 text-[var(--indigo)] lg:block"
                    size={20}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
