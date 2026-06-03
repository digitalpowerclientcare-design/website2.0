"use client";

import Link from "next/link";
import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Sparkles,
  Workflow,
} from "lucide-react";
import { TextRollButton } from "@/components/ui/TextRollButton";
import {
  CONSULTATION_FRAMEWORK,
  CONSULTATION_VALUES,
  FORGE_HIGHLIGHTS,
  FORGE_PIPELINE,
  type ServiceId,
} from "@/lib/homeContent";
import { FORGE_AGENTS } from "@/lib/site";

type ServicesTabsProps = {
  activeTab?: ServiceId;
  onTabChange?: (tab: ServiceId) => void;
};

export function ServicesTabs({
  activeTab = "consultation",
  onTabChange,
}: ServicesTabsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const selectTab = (tab: ServiceId) => {
    onTabChange?.(tab);
  };

  const tabs: { id: ServiceId; label: string; description: string }[] = [
    {
      id: "consultation",
      label: "Consultation",
      description: "Cross-industry business performance",
    },
    {
      id: "forge",
      label: "FORGE AI",
      description: "Enterprise AI SDLC platform",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-padding relative overflow-hidden bg-[var(--surface)]"
    >
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />

      <div className="content-container relative z-10">
        <div className="mb-12 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">Two distinct capabilities</p>
            <h2 className="heading-section mb-4">
              One operator.{" "}
              <span className="text-[var(--ink-muted)]">
                Two paths to measurable impact.
              </span>
            </h2>
            <p className="body-lg">
              Consultation transforms how your business operates — any industry,
              any function. FORGE AI transforms how your engineering organization
              ships software. Same standard of accountability. Different domains
              of execution.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="O3Xs services"
            className="inline-flex shrink-0 rounded-2xl border border-[var(--border)] bg-white p-1.5 shadow-[0_4px_24px_rgba(83,58,253,0.06)]"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => selectTab(tab.id)}
                className={`relative rounded-xl px-5 py-3 text-left transition-colors md:min-w-[160px] ${
                  activeTab === tab.id
                    ? "text-[var(--ink)]"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink-secondary)]"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="service-tab-bg"
                    className="absolute inset-0 rounded-xl bg-[var(--indigo-bg)]"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative block text-sm font-medium">
                  {tab.label}
                </span>
                <span className="relative mt-0.5 hidden text-[11px] text-[var(--ink-muted)] sm:block">
                  {tab.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "consultation" ? (
            <motion.div
              key="consultation"
              id="panel-consultation"
              role="tabpanel"
              aria-labelledby="tab-consultation"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ConsultationPanel onSwitchToForge={() => selectTab("forge")} />
            </motion.div>
          ) : (
            <motion.div
              key="forge"
              id="panel-forge"
              role="tabpanel"
              aria-labelledby="tab-forge"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ForgePanel onSwitchToConsultation={() => selectTab("consultation")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ConsultationPanel({
  onSwitchToForge,
}: {
  onSwitchToForge: () => void;
}) {
  return (
    <div className="space-y-16">
      <div>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-medium text-[var(--indigo)]">
              <Workflow size={14} />
              O³ Consultation Framework
            </div>
            <h3 className="heading-card text-[var(--ink)]">
              Diagnose. Implement. Operate.
            </h3>
            <p className="body-base mt-2 max-w-xl">
              The operating model enterprises need and vendors rarely deliver —
              with an implementation plan and ongoing ownership built into every
              engagement.
            </p>
          </div>
          <TextRollButton
            href="/consulting"
            label="View Consulting"
            variant="ghost"
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {CONSULTATION_FRAMEWORK.map((stage, i) => (
            <article
              key={stage.title}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--indigo)]/30 hover:shadow-[0_16px_48px_rgba(83,58,253,0.08)]"
            >
              <span className="font-stat text-4xl text-[var(--indigo)]/20 transition-colors group-hover:text-[var(--indigo)]/40">
                {stage.step}
              </span>
              <h4 className="mt-4 text-xl font-medium tracking-tight text-[var(--ink)]">
                {stage.title}
              </h4>
              <p className="mt-1 text-sm font-medium text-[var(--indigo)]">
                {stage.subtitle}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-secondary)]">
                {stage.description}
              </p>
              <div className="mt-6 flex items-center gap-2 border-t border-[var(--border)] pt-4">
                <ChevronRight size={14} className="text-[var(--indigo)]" />
                <span className="text-xs font-medium text-[var(--ink-muted)]">
                  {stage.deliverable}
                </span>
              </div>
              {i < CONSULTATION_FRAMEWORK.length - 1 && (
                <span
                  className="pointer-events-none absolute top-1/2 -right-3 hidden h-px w-6 bg-[var(--indigo)]/20 lg:block"
                  aria-hidden
                />
              )}
            </article>
          ))}
        </div>

        <p className="caption mt-6 text-center text-[var(--ink-muted)]">
          Extended framework includes Innovate and Scale phases for institutional
          capability building.{" "}
          <Link href="/consulting" className="text-[var(--indigo)] hover:underline">
            See full methodology →
          </Link>
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {CONSULTATION_VALUES.map((v) => (
          <article
            key={v.title}
            className="rounded-2xl border border-[var(--border)] bg-[var(--canvas)] p-7"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--indigo-bg)] text-[var(--indigo)]">
              <Check size={18} strokeWidth={2.5} />
            </div>
            <h4 className="text-lg font-medium tracking-tight text-[var(--ink)]">
              {v.title}
            </h4>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-secondary)]">
              {v.body}
            </p>
          </article>
        ))}
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-white p-8 md:p-10">
        <p className="eyebrow mb-3">Industries we serve</p>
        <h4 className="heading-card mb-4">
          Consultation applies wherever operations drive competitive advantage.
        </h4>
        <p className="body-base mb-6 max-w-2xl">
          From regulated healthcare to capital-intensive infrastructure — we
          bring the same O³ operating model, adapted to your domain, regulations,
          and KPIs.
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "Healthcare",
            "Automotive",
            "Software Development",
            "Financial Services",
            "Infrastructure",
            "Hospitality",
          ].map((ind) => (
            <span
              key={ind}
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--ink-secondary)]"
            >
              {ind}
            </span>
          ))}
        </div>
        <div className="mt-8">
          <TextRollButton
            href="/contact"
            label="Book a Consultation"
            variant="indigo"
          />
        </div>
      </div>

      <p className="caption text-center text-[var(--ink-muted)]">
        Need AI-native software delivery instead?{" "}
        <button
          type="button"
          onClick={onSwitchToForge}
          className="text-[var(--indigo)] hover:underline"
        >
          Explore FORGE AI →
        </button>
      </p>
    </div>
  );
}

function ForgePanel({
  onSwitchToConsultation,
}: {
  onSwitchToConsultation: () => void;
}) {
  return (
    <div className="space-y-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-medium text-[var(--indigo)]">
            <Sparkles size={14} />
            AI-Native SDLC Platform
          </div>
          <h3 className="heading-card text-[var(--ink)]">
            Built for enterprises that ship software — not slide decks.
          </h3>
          <p className="body-lg mt-4">
            FORGE AI is purpose-built for product and engineering organizations.
            Describe a feature in plain English. Six specialized agents handle
            requirements, codebase analysis, validation, preview, generation,
            and verification — then ship through your existing Git workflow.
          </p>
          <p className="body-base mt-4 text-[var(--ink-secondary)]">
            Unlike generic copilots, FORGE understands your repository, enforces
            your standards, and produces audit-ready evidence at every step.
            Typical user involvement: 20–30 minutes per feature. Traditional
            engineering: 3–5 days.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <TextRollButton href="/forge-ai" label="Explore FORGE AI" variant="indigo" />
            <TextRollButton href="/contact?interest=forge-beta" label="Request Private Beta" variant="ghost" />
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-white p-6 md:p-8">
          <p className="mb-6 text-xs font-medium tracking-[0.14em] text-[var(--ink-muted)] uppercase">
            Feature-to-production pipeline
          </p>
          <ol className="space-y-0">
            {FORGE_PIPELINE.map((step, i) => (
              <li key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
                {i < FORGE_PIPELINE.length - 1 && (
                  <span
                    className="absolute top-8 left-[11px] h-[calc(100%-16px)] w-px bg-[var(--border)]"
                    aria-hidden
                  />
                )}
                <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--indigo)] text-[10px] font-bold text-white">
                  {i + 1}
                </span>
                <div className="pt-0.5">
                  <p className="text-sm font-medium text-[var(--ink)]">{step.label}</p>
                  <p className="text-xs text-[var(--ink-muted)]">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {FORGE_HIGHLIGHTS.map((h) => (
          <article
            key={h.title}
            className="rounded-2xl border border-[var(--border)] bg-[var(--canvas)] p-7"
          >
            <h4 className="text-lg font-medium tracking-tight text-[var(--ink)]">
              {h.title}
            </h4>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-secondary)]">
              {h.body}
            </p>
          </article>
        ))}
      </div>

      <div className="rounded-2xl border border-[var(--brand-dark)] bg-[var(--brand-dark)] p-8 text-white md:p-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-medium tracking-[0.14em] text-white/50 uppercase">
              Six verification agents
            </p>
            <h4 className="text-2xl font-light tracking-tight">
              Specialized intelligence at every stage.
            </h4>
          </div>
          <Link
            href="/forge-ai"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--indigo-soft)] transition-opacity hover:opacity-80"
          >
            Full platform overview
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FORGE_AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <span className="font-stat text-lg text-[var(--indigo-soft)]">
                Agent {agent.id}
              </span>
              <p className="mt-1 text-sm font-medium text-white">{agent.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-white/60">
                {agent.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="caption text-center text-[var(--ink-muted)]">
        FORGE AI is designed exclusively for software development lifecycle
        acceleration. For business operations across other functions, see{" "}
        <button
          type="button"
          onClick={onSwitchToConsultation}
          className="text-[var(--indigo)] hover:underline"
        >
          Consultation
        </button>
        .
      </p>
    </div>
  );
}
