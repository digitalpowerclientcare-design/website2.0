"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Award,
  Car,
  Code2,
  Database,
  HardHat,
  HeartPulse,
  Hotel,
  Landmark,
  MapPin,
  Quote,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DEFAULT_ENGAGEMENT,
  DEFAULT_FORGE_USE_CASE,
  DEFAULT_VERTICAL,
  ENGAGEMENT_TYPES,
  FORGE_USE_CASES,
  VERTICALS,
  getConsultationCaseStudy,
  getForgeCaseStudy,
  isForgeUseCaseId,
  isVerticalId,
  type EngagementType,
  type ForgeUseCaseId,
  type VerticalId,
} from "@/lib/caseStudies";
import { TextRollButton } from "@/components/ui/TextRollButton";

const VERTICAL_ICONS = {
  automotive: Car,
  software: Code2,
  healthcare: HeartPulse,
  finance: Landmark,
  infrastructure: HardHat,
  hospitality: Hotel,
} as const;

const FORGE_USE_CASE_ICONS = {
  "custom-software": Code2,
  crm: Users,
  erp: Database,
} as const;

export function CaseStudyExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [vertical, setVertical] = useState<VerticalId>(DEFAULT_VERTICAL);
  const [forgeUseCase, setForgeUseCase] = useState<ForgeUseCaseId>(
    DEFAULT_FORGE_USE_CASE,
  );
  const [engagement, setEngagement] =
    useState<EngagementType>(DEFAULT_ENGAGEMENT);

  useEffect(() => {
    const engagementParam = searchParams.get("engagement");
    if (engagementParam === "forge") {
      setEngagement("forge");
      const useParam = searchParams.get("use");
      if (useParam && isForgeUseCaseId(useParam)) {
        setForgeUseCase(useParam);
      }
      return;
    }

    setEngagement("consultation");
    const verticalParam = searchParams.get("vertical");
    if (verticalParam && isVerticalId(verticalParam)) {
      setVertical(verticalParam);
    }
  }, [searchParams]);

  const study = useMemo(() => {
    if (engagement === "forge") {
      return (
        getForgeCaseStudy(forgeUseCase) ??
        getForgeCaseStudy(DEFAULT_FORGE_USE_CASE)!
      );
    }
    return (
      getConsultationCaseStudy(vertical) ??
      getConsultationCaseStudy(DEFAULT_VERTICAL)!
    );
  }, [engagement, vertical, forgeUseCase]);

  const syncUrl = useCallback(
    (nextEngagement: EngagementType, nextVertical?: VerticalId, nextUse?: ForgeUseCaseId) => {
      const params = new URLSearchParams();
      if (nextEngagement === "forge") {
        params.set("engagement", "forge");
        params.set("use", nextUse ?? forgeUseCase);
      } else {
        params.set("vertical", nextVertical ?? vertical);
      }
      router.replace(`/case-studies/?${params.toString()}`, { scroll: false });
    },
    [router, vertical, forgeUseCase],
  );

  const onEngagementChange = useCallback(
    (id: EngagementType) => {
      setEngagement(id);
      syncUrl(id, vertical, forgeUseCase);
    },
    [syncUrl, vertical, forgeUseCase],
  );

  const onVerticalChange = useCallback(
    (id: VerticalId) => {
      setVertical(id);
      syncUrl("consultation", id);
    },
    [syncUrl],
  );

  const onForgeUseCaseChange = useCallback(
    (id: ForgeUseCaseId) => {
      setForgeUseCase(id);
      syncUrl("forge", vertical, id);
    },
    [syncUrl, vertical],
  );

  const subNavLabel =
    engagement === "consultation" ? "By industry" : "By product type";

  return (
    <section
      id="case-studies"
      className="bg-[var(--surface)] py-20 md:py-28"
      aria-label="Case study browser"
    >
      <div className="content-container mb-10 max-w-2xl">
        <p className="eyebrow mb-3">Case studies</p>
        <h2 className="heading-section">
          Explore outcomes by engagement type.
        </h2>
        <p className="body-lg mt-4">
          Consultation spans six industries with clients in the United States
          and India. FORGE AI covers custom software development, CRM, and ERP
          only.
        </p>
      </div>

      {/* Engagement type — primary selector */}
      <div className="content-container mb-8">
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

      {/* Secondary navigation — industry or FORGE product type */}
      <div className="content-container mb-12">
        <p className="font-stat mb-3 text-[11px] tracking-[0.1em] text-[var(--ink-muted)] uppercase">
          {subNavLabel}
        </p>
        <nav
          className="flex flex-wrap gap-2"
          aria-label={
            engagement === "consultation"
              ? "Industry verticals"
              : "FORGE product types"
          }
        >
          {engagement === "consultation"
            ? VERTICALS.map((v) => {
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
              })
            : FORGE_USE_CASES.map((u) => {
                const Icon = FORGE_USE_CASE_ICONS[u.id];
                const active = forgeUseCase === u.id;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => onForgeUseCaseChange(u.id)}
                    aria-pressed={active}
                    className={cn(
                      "inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-[14px] font-medium transition-all duration-200",
                      active
                        ? "border-[var(--indigo)] bg-[var(--indigo)] text-white shadow-[0_8px_24px_rgba(83,58,253,0.25)]"
                        : "border-[var(--border)] bg-white text-[var(--ink-secondary)] hover:border-[var(--indigo)]/40 hover:text-[var(--ink)]",
                    )}
                  >
                    <Icon size={16} strokeWidth={1.75} aria-hidden />
                    {u.label}
                  </button>
                );
              })}
        </nav>
        <p className="mt-3 text-[13px] text-[var(--ink-muted)]">
          {engagement === "consultation"
            ? VERTICALS.find((v) => v.id === vertical)?.tagline
            : FORGE_USE_CASES.find((u) => u.id === forgeUseCase)?.tagline}
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

              <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--indigo-bg)] px-3 py-1 text-[12px] font-semibold text-[var(--indigo)]">
                    <MapPin size={12} strokeWidth={2} aria-hidden />
                    {study.client.region}
                  </span>
                  <span className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-[12px] font-medium text-[var(--ink-secondary)]">
                    {study.client.segment}
                  </span>
                  <span className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-[12px] font-medium text-[var(--ink-secondary)]">
                    {study.client.size}
                  </span>
                </div>
                <h4 className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--ink)]">
                  About the client
                </h4>
                <p className="body-base mt-2 max-w-3xl text-[var(--ink-secondary)]">
                  {study.client.profile}
                </p>
                <dl className="mt-5 grid gap-4 border-t border-[var(--border)] pt-5 sm:grid-cols-2">
                  <div>
                    <dt className="text-[12px] font-medium tracking-wide text-[var(--ink-muted)] uppercase">
                      Location
                    </dt>
                    <dd className="mt-1 text-[14px] font-medium text-[var(--ink)]">
                      {study.client.location}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[12px] font-medium tracking-wide text-[var(--ink-muted)] uppercase">
                      {engagement === "forge" ? "Product type" : "Industry segment"}
                    </dt>
                    <dd className="mt-1 text-[14px] font-medium text-[var(--ink)]">
                      {study.client.segment}
                    </dd>
                  </div>
                </dl>
              </div>

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

      <div className="content-container mt-16">
        <p className="eyebrow mb-4">
          {engagement === "consultation"
            ? "Switch engagement"
            : "More FORGE use cases"}
        </p>
        <div className="flex flex-wrap gap-3">
          {engagement === "consultation" ? (
            <button
              type="button"
              onClick={() => onEngagementChange("forge")}
              className="group inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[14px] font-medium text-[var(--ink)] transition-all hover:border-[var(--indigo)]/40 hover:shadow-[0_8px_24px_rgba(83,58,253,0.08)]"
            >
              View FORGE AI case studies
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </button>
          ) : (
            <>
              {FORGE_USE_CASES.filter((u) => u.id !== forgeUseCase).map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => onForgeUseCaseChange(u.id)}
                  className="group inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[14px] font-medium text-[var(--ink)] transition-all hover:border-[var(--indigo)]/40 hover:shadow-[0_8px_24px_rgba(83,58,253,0.08)]"
                >
                  View {u.label}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </button>
              ))}
              <button
                type="button"
                onClick={() => onEngagementChange("consultation")}
                className="group inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[14px] font-medium text-[var(--ink)] transition-all hover:border-[var(--indigo)]/40 hover:shadow-[0_8px_24px_rgba(83,58,253,0.08)]"
              >
                View Consultation cases
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
