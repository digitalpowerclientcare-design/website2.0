"use client";

import {
  Bot,
  FileText,
  Layers,
  Network,
  Puzzle,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { PROBLEMS } from "@/lib/site";
import { TextReveal } from "@/components/ui/TextReveal";

const ICONS: Record<string, LucideIcon> = {
  Layers,
  Puzzle,
  Bot,
  FileText,
  TrendingDown,
  Network,
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

type ProblemItem = {
  icon: string;
  title: string;
  description: string;
};

type ProblemCardsProps = {
  eyebrow?: string;
  title?: string;
  problems?: readonly ProblemItem[];
};

export function ProblemCards({
  eyebrow = "ENTERPRISE CHALLENGES",
  title = "The Enterprise Problem Isn't Technology. It's Value Realization.",
  problems = PROBLEMS,
}: ProblemCardsProps) {
  return (
    <section className="section-padding bg-[var(--canvas)]">
      <div className="content-container">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        {title ? (
          <TextReveal as="h2" className="heading-section mb-12 max-w-3xl">
            {title}
          </TextReveal>
        ) : null}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, i) => {
            const Icon = ICONS[problem.icon] ?? Layers;
            return (
              <motion.article
                key={problem.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="stripe-card p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--indigo-bg)] text-[var(--indigo)]">
                  <Icon size={20} />
                </div>
                <h3 className="heading-card mb-2 text-xl">{problem.title}</h3>
                <p className="body-base">{problem.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
