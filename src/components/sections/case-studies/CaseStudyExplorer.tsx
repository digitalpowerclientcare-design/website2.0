"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Award,
  Car,
  HeartPulse,
  Monitor,
  Quote,
  Sparkles,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CASE_STUDIES,
  DEFAULT_ENGAGEMENT,
  DEFAULT_VERTICAL,
  ENGAGEMENT_TYPES,
  VERTICALS,
  getCaseStudy,
  type EngagementType,
  type VerticalId,
} from "@/lib/caseStudies";
import { TextRollButton } from "@/components/ui/TextRollButton";

const VERTICAL_ICONS = {
  automotive: Car,
  it: Monitor,
  healthcare: HeartPulse,
} as const;

export function CaseStudyExplorer() {
  const [vertical, setVertical] = useState<VerticalId>(DEFAULT_VERTICAL);
  const [engagement, setEngagement] =
    useState<EngagementType>(DEFAULT_ENGAGEMENT);

  const study = useMemo(
    () => getCaseStudy(vertical, engagement) ?? CASE_STUDIES[0],
    [vertical, engagement],
  );

  const onVerticalChange = useCallback((id: VerticalId) => {
    setVertical(id);
  }, []);

  const onEngagementChange = useCallback((id: EngagementType) => {
    setEngagement(id);
  }, []);

  return (
    <section
      id="case-studies"
      className="bg-[var(--surface)] py-20 md:py-28"
      aria-label="Case study browser"
    >
      <div className="content-container mb-10 max-w-2xl">
        <p className="eyebrow mb-3">By industry</p>
        <h2 className="heading-section">
          Explore outcomes by vertical and engagement.
        </h2>
        <p className="body-lg mt-4">
          Select an industry, then choose whether the engagement was a
          consulting program or a FORGE AI delivery.
        </p>
      </div>

      {/* Vertical navigation */}
      <div className="content-container mb-6">
        <nav
          className="flex flex-wrap gap-2"
          aria-label="Industry verticals"
        >
          {VERTICALS.map((v) => {
            const Icon = VERTICAL_ICONS[v.id];
            const active = vertical === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => onVerticalChange(v.id)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-[14px] font-medium transition-all duration-200",
                  active
                    ? "border-[var(--indigo)] bg-[var(--indigo)] text-white shadow-[0_8px_24px_rgba(83,58,253,0.25)]"
                    : "border-[var(--border)] bg-white text-[var(--ink-secondary)] hover:border-[var(--indigo)]/40 hover:text-[var(--ink)]",
                )}
              >
                <Icon size={16} strokeWidth={1.75} aria-hidden />
                {v.label}
              </button>
            );
          })}
        </nav>
        <p className="mt-3 text-[13px] text-[var(--ink-muted)]">
          {VERTICALS.find((v) => v.id === vertical)?.tagline}
        </p>
      </div>

      {/* Engagement sub-menu */}
      <div className="content-container mb-12">
        <div
          className="inline-flex rounded-xl border border-[var(--border)] bg-white p-1"
          role="tablist"
          aria-label="Engagement type"
        >
          {ENGAGEMENT_TYPES.map((e) => {
            const active = engagement === e.id;
            const Icon = e.id === "consultation" ? Sparkles : Wrench;
            return (
              <button
                key={e.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onEngagementChange(e.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-medium transition-all duration-200 sm:px-5 sm:text-[14px]",
                  active
                    ? "bg-[var(--indigo-bg)] text-[var(--indigo)] shadow-sm"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink)]",
                )}
              >
                <Icon size={15} strokeWidth={1.75} aria-hidden />
                {e.label}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[12px] text-[var(--ink-muted)]">
          {ENGAGEMENT_TYPES.find((e) => e.id === engagement)?.description}
        </p>
      </div>

      {/* Case study detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={study.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="content-container"
        >
          {/* Hero image + title */}
          <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-[0_16px_48px_rgba(28,30,84,0.08)]">
            <div className="relative aspect-[21/9] min-h-[200px] w-full sm:min-h-[280px]">
              <Image
                src={study.heroImage}
                alt=""
                fill
                unoptimized
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
                priority
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/85 via-[#0a0a0f]/35 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                <p className="font-stat mb-2 text-[11px] tracking-[0.1em] text-white/70 uppercase">
                  {study.clientDescriptor}
                </p>
                <h3 className="max-w-3xl text-[28px] leading-[1.12] font-light tracking-[-0.025em] text-white md:text-[36px]">
                  {study.title}
                </h3>
                <p className="mt-2 text-[14px] text-white/75">
                  {study.subtitle}
                </p>
              </div>
            </div>

            <div className="p-6 md:p-10">
              <p className="body-lg max-w-3xl">{study.description}</p>

              {/* Improvement metrics */}
              <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {study.improvements.map((item) => (
                  <li
                    key={item.label}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4"
                  >
                    <p className="font-stat text-[28px] leading-none tracking-tight text-[var(--indigo)] md:text-[32px]">
                      {item.value}
                    </p>
                    <p className="mt-2 text-[13px] font-medium text-[var(--ink-secondary)]">
                      {item.label}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Before / After */}
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-[var(--border)] bg-white p-6 md:p-8">
              <span className="font-stat mb-4 inline-block rounded-full bg-[var(--surface)] px-3 py-1 text-[11px] tracking-[0.08em] text-[var(--ink-muted)] uppercase">
                Before
              </span>
              <h4 className="text-xl font-medium tracking-[-0.015em] text-[var(--ink)]">
                {study.before.headline}
              </h4>
              <p className="body-base mt-3">{study.before.summary}</p>
              <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-xl border border-[var(--border)]">
                <Image
                  src={study.before.image}
                  alt=""
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover grayscale-[30%]"
                />
              </div>
              <ul className="mt-6 space-y-2.5">
                {study.before.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-2.5 text-[14px] leading-relaxed text-[var(--ink-secondary)]"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ink-muted)]"
                      aria-hidden
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-[var(--indigo)]/25 bg-white p-6 shadow-[0_12px_40px_rgba(83,58,253,0.06)] md:p-8">
              <span className="font-stat mb-4 inline-block rounded-full bg-[var(--indigo-bg)] px-3 py-1 text-[11px] tracking-[0.08em] text-[var(--indigo)] uppercase">
                After
              </span>
              <h4 className="text-xl font-medium tracking-[-0.015em] text-[var(--ink)]">
                {study.after.headline}
              </h4>
              <p className="body-base mt-3">{study.after.summary}</p>
              <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-xl border border-[var(--indigo)]/20">
                <Image
                  src={study.after.image}
                  alt=""
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[var(--indigo)]/15 to-transparent"
                  aria-hidden
                />
              </div>
              <ul className="mt-6 space-y-2.5">
                {study.after.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-2.5 text-[14px] leading-relaxed text-[var(--ink-secondary)]"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--emerald)]"
                      aria-hidden
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          {/* Testimonial / winning remark */}
          <blockquote className="mt-12 rounded-3xl border border-[var(--border)] bg-[var(--brand-dark)] p-8 text-white md:p-10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <Quote
                className="text-[var(--indigo-soft)]"
                size={32}
                strokeWidth={1.5}
                aria-hidden
              />
              {study.testimonial.award && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[12px] font-medium text-white/90">
                  <Award size={14} aria-hidden />
                  {study.testimonial.award}
                </span>
              )}
            </div>
            <p className="mt-6 max-w-3xl text-[20px] leading-[1.55] font-light tracking-[-0.01em] md:text-[22px]">
              &ldquo;{study.testimonial.quote}&rdquo;
            </p>
            <footer className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-8">
              <div>
                <cite className="not-italic text-[15px] font-semibold text-white">
                  {study.testimonial.author}
                </cite>
                <p className="mt-1 text-[13px] text-white/60">
                  {study.testimonial.role}
                </p>
              </div>
              <TextRollButton
                href="/contact"
                label="Discuss a similar engagement"
                variant="ghost"
                className="!border-white/20 !text-white hover:!bg-white/10"
              />
            </footer>
          </blockquote>
        </motion.div>
      </AnimatePresence>

      {/* Quick jump to other combinations */}
      <div className="content-container mt-16">
        <p className="eyebrow mb-4">More in this vertical</p>
        <div className="flex flex-wrap gap-3">
          {ENGAGEMENT_TYPES.filter((e) => e.id !== engagement).map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => onEngagementChange(e.id)}
              className="group inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[14px] font-medium text-[var(--ink)] transition-all hover:border-[var(--indigo)]/40 hover:shadow-[0_8px_24px_rgba(83,58,253,0.08)]"
            >
              View {e.label} case
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
