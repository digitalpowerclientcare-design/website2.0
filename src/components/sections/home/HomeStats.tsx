"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import {
  CONSULTATION_STATS,
  FORGE_STATS,
  type ServiceId,
} from "@/lib/homeContent";

gsap.registerPlugin(ScrollTrigger);

type HomeStatsProps = {
  service: ServiceId;
};

function StatValue({
  value,
  suffix,
  delay,
}: {
  value: number;
  suffix: string;
  delay: number;
}) {
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
    <span
      ref={ref}
      className="font-stat block text-[56px] leading-none tracking-[-2px] text-[var(--indigo)]"
    >
      0{suffix}
    </span>
  );
}

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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group rounded-2xl border border-[var(--border)] bg-white p-8 transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(83,58,253,0.08)]"
            >
              <StatValue
                value={stat.value}
                suffix={stat.suffix}
                delay={i * 0.1}
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
