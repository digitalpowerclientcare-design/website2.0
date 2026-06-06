import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { TextRollButton } from "@/components/ui/TextRollButton";
import { HeroOrbits } from "@/components/sections/consulting/HeroOrbits";
import { FrameworkCards } from "@/components/sections/shared/FrameworkCards";
import { StatsGrid } from "@/components/sections/shared/StatsGrid";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import {
  CONSULTATION_AUDIENCES,
  CONSULTATION_PILLARS,
} from "@/lib/companyContent";

export const metadata: Metadata = {
  title: "Consultation",
  description:
    "O3Xs consultation embeds AI into enterprise operations — diagnostic-led business process automation with owned outcomes across six industries.",
};

const PROOF_CHECKS = [
  "Industry-agnostic methodology",
  "Tool-agnostic integration",
  "Outcome SLA frameworks",
] as const;

export default function ConsultationPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--indigo-bg)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(83,58,253,0.18), transparent 55%), radial-gradient(ellipse 50% 40% at 15% 85%, rgba(99,102,241,0.12), transparent 55%)",
          }}
          aria-hidden
        />
        <div className="content-container relative z-10 grid items-center gap-12 py-24 md:py-32 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Consultation · Business Process Automation</p>
            <h1 className="heading-display text-[var(--ink)]">
              AI-led operations.{" "}
              <span className="text-[var(--indigo)]">Owned to outcome.</span>
            </h1>
            <p className="body-lg mt-6 max-w-[560px]">
              We diagnose where value leaks, implement AI where ROI is provable,
              and operate the solution until performance compounds — without
              replacing your existing systems.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <TextRollButton
                href="/contact"
                label="Book a Consultation"
                variant="indigo"
              />
              <TextRollButton
                href="/consultation#framework"
                label="O³ Framework"
                variant="ghost"
              />
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <HeroOrbits />
          </div>
        </div>
      </section>

      <section className="section-padding border-y border-[var(--border)] bg-white">
        <div className="content-container">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow mb-3">How we deliver</p>
            <h2 className="heading-section">
              Three pillars, one accountability model
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {CONSULTATION_PILLARS.map((pillar) => (
              <article
                key={pillar.number}
                className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_8px_32px_rgba(28,30,84,0.05)]"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={pillar.image}
                    alt={pillar.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/50 to-transparent" />
                  <span className="font-stat absolute bottom-4 left-4 text-sm tracking-[0.08em] text-white/90">
                    {pillar.number}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-medium tracking-[-0.015em] text-[var(--ink)]">
                    {pillar.title}
                  </h3>
                  <p className="body-base mt-3">{pillar.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div id="framework">
        <FrameworkCards
          eyebrow="Our method"
          title="The O³ Framework"
          subtitle="Optimize → Orchestrate → Operate — with optional Innovate and Scale stages for enterprise programs."
          background="white"
        />
      </div>

      <section className="section-padding bg-white">
        <div className="content-container mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Who we serve</p>
          <h2 className="heading-section">
            Built for leaders who measure results.
          </h2>
        </div>
        <div className="content-container grid gap-5 md:grid-cols-3">
          {CONSULTATION_AUDIENCES.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--indigo)]/30 hover:shadow-[0_16px_48px_rgba(83,58,253,0.08)]"
            >
              <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--indigo-bg)] text-[var(--indigo)]">
                <item.Icon size={22} strokeWidth={1.75} />
              </span>
              <h3 className="text-xl font-medium tracking-[-0.015em] text-[var(--ink)]">
                {item.title}
              </h3>
              <p className="body-base mt-3">{item.body}</p>
            </article>
          ))}
        </div>
        <div className="content-container mt-12">
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {PROOF_CHECKS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm font-medium text-[var(--ink-secondary)]"
              >
                <Check size={18} className="text-[var(--emerald)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <StatsGrid
        background="surface"
        eyebrow="Verified outcomes"
        titleLineOne="Numbers from the field."
        titleLineTwo="Not the deck."
        body="Every metric came out of a real engagement with executive sign-off — measured in dollars, hours, or production deltas."
        linkLabel="View case studies"
        linkHref="/case-studies"
      />

      <CtaBanner
        eyebrow="Start here"
        title="Book a diagnostic. Keep the report either way."
        subtitle="A 60-minute consultation yields a written Performance Diagnostic — quantified leakage, prioritized fixes, and an ROI-ranked roadmap."
        ctaLabel="Book a Consultation"
      />
    </>
  );
}
