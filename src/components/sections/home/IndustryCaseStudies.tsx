"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { INDUSTRY_PREVIEWS } from "@/lib/homeContent";

function IndustryCard({
  industry,
  index,
}: {
  industry: (typeof INDUSTRY_PREVIEWS)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[var(--indigo)]/30 hover:shadow-[0_16px_48px_rgba(83,58,253,0.08)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface)]">
        <Image
          src={industry.image}
          alt={industry.name}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,15,0.55)] via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/95 text-[var(--indigo)] shadow-sm backdrop-blur-sm">
            <industry.Icon size={18} strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-sm font-medium text-white">{industry.name}</p>
            <p className="text-[11px] text-white/70">{industry.tagline}</p>
          </div>
        </div>
        {industry.status === "preview" && (
          <span className="absolute top-4 right-4 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/90 uppercase backdrop-blur-sm">
            Case study coming
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-stat text-lg text-[var(--indigo)]">{industry.caseMetric}</p>
        <h3 className="mt-2 text-lg font-medium leading-snug tracking-tight text-[var(--ink)]">
          {industry.caseTitle}
        </h3>
        <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[var(--ink-secondary)]">
          {industry.caseSummary}
        </p>
        <Link
          href={industry.caseStudyHref}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--indigo)] transition-opacity group-hover:opacity-80"
        >
          {industry.status === "live" ? "View case study" : "Explore work"}
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </motion.article>
  );
}

export function IndustryCaseStudies() {
  return (
    <section className="section-padding relative bg-white">
      <div className="content-container">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="eyebrow mb-3">Proven across industries</p>
          <h2 className="heading-section mb-4">
            Case studies that speak in{" "}
            <span className="text-[var(--indigo)]">verified outcomes</span> —
            not projections.
          </h2>
          <p className="body-lg">
            Every engagement follows the same O³ operating model. What changes is
            the domain — and the metrics your leadership cares about. Industry
            pages with full before/after narratives are coming next.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRY_PREVIEWS.map((industry, i) => (
            <IndustryCard key={industry.id} industry={industry} index={i} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 text-[15px] font-medium text-[var(--indigo)] transition-opacity hover:opacity-80"
          >
            View all case studies
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
          <span className="hidden text-[var(--ink-muted)] sm:inline">·</span>
          <Link
            href="/contact"
            className="text-[15px] font-medium text-[var(--ink-secondary)] transition-colors hover:text-[var(--indigo)]"
          >
            Discuss your industry →
          </Link>
        </div>
      </div>
    </section>
  );
}
