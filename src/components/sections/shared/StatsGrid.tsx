"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { STATS } from "@/lib/site";
import {
  EASE_OUT,
  FADE_UP_INITIAL,
  FADE_UP_ANIMATE,
  VIEWPORT_ONCE,
  REVEAL_TRANSITION,
} from "@/lib/motion";
import { StatCounter } from "@/components/ui/StatCounter";

type StatsGridProps = {
  eyebrow?: string;
  titleLineOne?: string;
  titleLineTwo?: string;
  body?: string;
  linkLabel?: string;
  linkHref?: string;
  background?: "canvas" | "surface";
};

/** 2×2 stats grid with intro column on the left. Used on Home, Consulting, FORGE AI, About. */
export function StatsGrid({
  eyebrow = "Impact Realization",
  titleLineOne = "Verified outcomes.",
  titleLineTwo = "Not projections.",
  body = "Real metrics from real engagements. Every number here is verified client outcome data — not a projection, not a forecast, not a marketing claim.",
  linkLabel = "View Case Studies",
  linkHref = "/case-studies",
  background = "canvas",
}: StatsGridProps) {
  const sectionStyle =
    background === "surface"
      ? { paddingTop: 120, paddingBottom: 120, backgroundColor: "var(--surface)" }
      : {
          paddingTop: 120,
          paddingBottom: 120,
          backgroundImage:
            "linear-gradient(to bottom, #FAFBFD 0%, var(--canvas) 12%, var(--canvas) 100%)",
        };

  return (
    <section className="relative bg-[var(--canvas)]" style={sectionStyle}>
      <div className="content-container grid gap-12 md:grid-cols-[2fr_3fr] md:items-start md:gap-14">
        <motion.div
          initial={FADE_UP_INITIAL}
          whileInView={FADE_UP_ANIMATE}
          viewport={VIEWPORT_ONCE}
          transition={REVEAL_TRANSITION}
        >
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="heading-section">
            {titleLineOne}
            <br />
            <span className="text-[var(--ink-muted)]">{titleLineTwo}</span>
          </h2>
          <p className="body-base mt-6 max-w-[360px]">{body}</p>
          {linkLabel && (
            <Link
              href={linkHref}
              className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-[var(--indigo)] transition-opacity hover:opacity-80"
            >
              {linkLabel}
              <ArrowUpRight size={18} />
            </Link>
          )}
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {STATS.map((stat, i) => (
            <motion.article
              key={stat.label}
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
