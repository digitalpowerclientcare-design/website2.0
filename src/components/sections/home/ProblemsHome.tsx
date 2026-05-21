"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Bot,
  FileText,
  Layers,
  Network,
  Puzzle,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";
import { PROBLEMS } from "@/lib/site";

const ICONS: Record<string, LucideIcon> = {
  Layers,
  Puzzle,
  Bot,
  FileText,
  TrendingDown,
  Network,
};

function ProblemCard({
  problem,
  index,
}: {
  problem: (typeof PROBLEMS)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = ICONS[problem.icon] ?? Layers;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 14 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformPerspective: 800 }}
      className="bento-card w-[min(100%,320px)] shrink-0 snap-center rounded-2xl border border-[var(--border)] bg-white p-6 md:w-auto"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--indigo-bg)] to-white text-[var(--indigo)]">
        <Icon size={22} />
      </div>
      <h3 className="mb-2 text-xl font-medium tracking-tight text-[var(--ink)]">
        {problem.title}
      </h3>
      <p className="text-[15px] leading-relaxed text-[var(--ink-secondary)]">
        {problem.description}
      </p>
    </motion.article>
  );
}

export function ProblemsHome() {
  return (
    <section className="section-padding relative overflow-hidden bg-[var(--canvas)]">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />

      <div className="content-container relative z-10 mb-10 md:mb-14">
        <p className="eyebrow mb-3">Enterprise challenges</p>
        <h2 className="heading-section max-w-3xl">
          The problem isn&apos;t technology. It&apos;s{" "}
          <span className="text-[var(--indigo)]">value realization</span>.
        </h2>
      </div>

      <div className="content-container relative z-10 hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
        {PROBLEMS.map((p, i) => (
          <ProblemCard key={p.title} problem={p} index={i} />
        ))}
      </div>

      <div className="relative z-10 flex gap-4 overflow-x-auto px-6 pb-2 snap-x snap-mandatory md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PROBLEMS.map((p, i) => (
          <ProblemCard key={p.title} problem={p} index={i} />
        ))}
      </div>
    </section>
  );
}
