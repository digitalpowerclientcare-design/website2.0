"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import {
  CONSULTATION_STATS,
  FORGE_STATS,
  type ServiceId,
} from "@/lib/homeContent";
import { EASE_OUT, FADE_UP_INITIAL, FADE_UP_ANIMATE } from "@/lib/motion";
import { StatCounter } from "@/components/ui/StatCounter";

type HomeStatsProps = {
  service: ServiceId;
};

const COPY: Record<
  ServiceId,
  {
    eyebrow: string;
    titleLineOne: string;
    titleLineTwo: string;
    body: string;
    linkLabel: string;
    linkHref: string;
  }
> = {
  consultation: {
    eyebrow: "Consultation impact",
    titleLineOne: "Verified outcomes.",
    titleLineTwo: "Across every function.",
    body: "Real metrics from operated engagements — delivery cycles, reporting effort, and ROI verified by client leadership, not projected in a deck.",
    linkLabel: "View Case Studies",
    linkHref: "/case-studies",
  },
  forge: {
    eyebrow: "FORGE AI impact",
    titleLineOne: "Engineering velocity.",
    titleLineTwo: "With governance built in.",
    body: "Measured across enterprise SDLC deployments — cycle time reduction, pre-merge verification rates, and audit-ready delivery at scale.",
    linkLabel: "Explore FORGE AI",
    linkHref: "/forge-ai",
  },
};

export function HomeStats({ service }: HomeStatsProps) {
  const stats = service === "consultation" ? CONSULTATION_STATS : FORGE_STATS;
  const copy = COPY[service];

  return (
    <section
      className="relative bg-[var(--canvas)]"
      style={{
        paddingTop: 120,
        paddingBottom: 120,
        backgroundImage:
          "linear-gradient(to bottom, #FAFBFD 0%, var(--canvas) 12%, var(--canvas) 100%)",
      }}
    >
      <div className="content-container grid gap-12 md:grid-cols-[2fr_3fr] md:items-start md:gap-14">
        <motion.div
          key={service}
          initial={FADE_UP_INITIAL}
          animate={FADE_UP_ANIMATE}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <p className="eyebrow mb-3">{copy.eyebrow}</p>
          <h2 className="heading-section">
            {copy.titleLineOne}
            <br />
            <span className="text-[var(--ink-muted)]">{copy.titleLineTwo}</span>
          </h2>
          <p className="body-base mt-6 max-w-[360px]">{copy.body}</p>
          <Link
            href={copy.linkHref}
            className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-[var(--indigo)] transition-opacity hover:opacity-80"
          >
            {copy.linkLabel}
            <ArrowUpRight size={18} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {stats.map((stat, i) => (
            <motion.article
              key={`${service}-${stat.label}`}
              initial={FADE_UP_INITIAL}
              whileInView={FADE_UP_ANIMATE}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.1,
                ease: EASE_OUT,
              }}
              className="group rounded-2xl border border-[var(--border)] bg-white p-8 transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(83,58,253,0.08)]"
            >
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                delay={i * 0.1}
                className="font-stat block text-[56px] leading-none tracking-[-2px] text-[var(--indigo)]"
              />
              <p className="mt-6 line-clamp-2 text-[14px] font-medium leading-snug text-[var(--ink-secondary)]">
                {stat.label}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
