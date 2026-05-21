import type { Metadata } from "next";
import Image from "next/image";
import { Building2, Check, Target, Workflow } from "lucide-react";
import { TextRollButton } from "@/components/ui/TextRollButton";
import { StatsGrid } from "@/components/sections/shared/StatsGrid";
import { FrameworkCards } from "@/components/sections/shared/FrameworkCards";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { HeroOrbits } from "@/components/sections/consulting/HeroOrbits";

export const metadata: Metadata = {
  title: "AI Consulting",
  description:
    "We diagnose where you're losing money, implement AI to stop it, and operate the solution until results compound.",
};

const DIFFERENTIATORS = [
  {
    number: "01",
    title: "We Optimize Before We Automate",
    body: "Most firms start with tools. We start with business leakage. We map your operations end-to-end, quantify revenue and cost leakage, and identify what should NOT be automated before designing any intervention.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    alt: "Diagnostic mapping",
  },
  {
    number: "02",
    title: "We Own Outcomes — Not Deliverables",
    body: "Success is measured in dollars, time, and performance — not documents or deployments. Our commercial model is hybrid: diagnostic + implementation + operate retainers + success fees tied to verified business impact.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200",
    alt: "Performance KPIs",
  },
  {
    number: "03",
    title: "We Combine Judgment + Execution + Operation",
    body: "Consulting insight without engineering execution is theatre. Engineering execution without ongoing ownership is abandonment. We bring all three — and we stay.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
    alt: "Three-pillar collaboration",
  },
  {
    number: "04",
    title: "We Compound Intelligence Over Time",
    body: "Every engagement strengthens our playbooks, benchmarks, and execution speed. Your engagement benefits from every previous engagement we've delivered.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
    alt: "Compounding growth",
  },
] as const;

const CLIENTS = [
  {
    Icon: Building2,
    title: "Mid-Market to Enterprise",
    body: "Organizations with operational complexity and transformation fatigue from tool sprawl and advisory-only engagements. Multi-team workflows, legacy systems, growing execution risk.",
  },
  {
    Icon: Workflow,
    title: "Ops-Heavy Businesses",
    body: "Companies where process excellence drives competitive advantage: software development, marketing operations, customer experience, legal services, healthcare delivery.",
  },
  {
    Icon: Target,
    title: "Performance-Accountable Leadership",
    body: "CFOs, COOs, and CXOs tired of 'digital transformation' theater and ready for partners who share risk and own outcomes alongside them.",
  },
] as const;

const PROOF = [
  {
    title: "Enterprise Transformations",
    body: "Deep execution experience across enterprise and high-growth mid-market companies in software, healthcare, marketing operations, and professional services.",
  },
  {
    title: "Cross-Industry Execution Intelligence",
    body: "Our frameworks compound learning from IT/SDLC, marketing performance, legal operations, and customer experience — creating institutional knowledge that accelerates every engagement.",
  },
  {
    title: "Outcome-Linked Commercial Models",
    body: "We align our success with yours through hybrid pricing: diagnostic + implementation + operate retainers + success fees tied to verified business impact.",
  },
] as const;

const PROOF_CHECKS = [
  "Industry-Agnostic Methodology",
  "Tool-Agnostic Integration",
  "Outcome SLA Frameworks",
] as const;

export default function ConsultingPage() {
  return (
    <>
      {/* HERO */}
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
            <p className="eyebrow mb-4">AI Consulting</p>
            <h1 className="heading-display text-[var(--ink)]">
              Embedding intelligence into{" "}
              <span className="text-[var(--indigo)]">enterprise operations.</span>
            </h1>
            <p className="body-lg mt-6 max-w-[560px]">
              We diagnose where you&apos;re losing money, implement AI to stop
              it, and operate the solution until results compound.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <TextRollButton
                href="/contact"
                label="Book a Performance Expert"
                variant="indigo"
              />
              <TextRollButton
                href="#framework"
                label="See the framework"
                variant="ghost"
              />
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <HeroOrbits />
          </div>
        </div>
      </section>

      {/* HOW WE ARE DIFFERENT — alternating rows */}
      <section className="bg-white py-24 md:py-28">
        <div className="content-container mb-16 max-w-3xl">
          <p className="eyebrow mb-3">Why us</p>
          <h2 className="heading-section">
            Why this model doesn&apos;t exist anywhere else.
          </h2>
          <p className="body-lg mt-4">
            We don&apos;t leave after go-live. That&apos;s when the real work
            begins.
          </p>
        </div>

        <div className="content-container space-y-24">
          {DIFFERENTIATORS.map((row, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={row.number}
                className={`grid items-center gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="max-w-xl">
                  <span className="font-stat mb-5 inline-block text-sm tracking-[0.08em] text-[var(--indigo)]">
                    {row.number}
                  </span>
                  <h3 className="text-[32px] leading-[1.15] font-medium tracking-[-0.025em] text-[var(--ink)] md:text-[36px]">
                    {row.title}
                  </h3>
                  <p className="body-base mt-5 max-w-[480px]">{row.body}</p>
                </div>

                <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_12px_40px_rgba(28,30,84,0.08)]">
                  <Image
                    src={row.image}
                    alt={row.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(83,58,253,0.18), transparent 55%)",
                    }}
                    aria-hidden
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FRAMEWORK */}
      <FrameworkCards
        eyebrow="Our method"
        title="The O3Xs Framework"
        subtitle="Five stages. One accountability model."
        background="white"
      />

      {/* WHO WE SERVE */}
      <section className="bg-[var(--canvas)] py-24 md:py-28">
        <div className="content-container mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Who it&apos;s for</p>
          <h2 className="heading-section">
            Built for organizations that demand results.
          </h2>
        </div>

        <div className="content-container grid gap-5 md:grid-cols-3">
          {CLIENTS.map((client) => (
            <article
              key={client.title}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--indigo)]/30 hover:shadow-[0_16px_48px_rgba(83,58,253,0.08)]"
            >
              <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--indigo-bg)] text-[var(--indigo)] transition-colors group-hover:bg-[var(--indigo)] group-hover:text-white">
                <client.Icon size={22} strokeWidth={1.75} />
              </span>
              <h3 className="text-xl font-medium tracking-[-0.015em] text-[var(--ink)]">
                {client.title}
              </h3>
              <p className="body-base mt-3">{client.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* PROOF & CREDIBILITY */}
      <section className="bg-[var(--surface)] py-24 md:py-28">
        <div className="content-container mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Proof of credibility</p>
          <h2 className="heading-section">
            Built for enterprises that expect results.
          </h2>
        </div>

        <div className="content-container grid gap-5 md:grid-cols-3">
          {PROOF.map((block) => (
            <article
              key={block.title}
              className="rounded-2xl border border-[var(--border)] bg-white p-8"
            >
              <h3 className="text-lg font-medium tracking-[-0.01em] text-[var(--ink)]">
                {block.title}
              </h3>
              <p className="body-base mt-3">{block.body}</p>
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

      {/* STATS */}
      <StatsGrid
        background="surface"
        eyebrow="Verified Outcomes"
        titleLineOne="Numbers from the field."
        titleLineTwo="Not the deck."
        body="Every metric here came out of a real engagement and an executive sign-off — measured in dollars, hours, or production deltas."
        linkLabel="Book a diagnostic"
        linkHref="/contact"
      />

      {/* CTA */}
      <CtaBanner />
    </>
  );
}
