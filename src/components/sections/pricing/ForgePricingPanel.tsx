"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Gift, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BILLING_OPTIONS,
  DECISION_EXPLAINER,
  FORGE_PRICING_PLANS,
  FORGE_TRIAL,
  FORGE_VALUE_PROPOSITION,
  getComparisonRows,
  FORGE_PRICING_FAQ,
  type BillingPeriod,
} from "@/lib/pricingContent";

export function ForgePricingPanel() {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");
  const comparisonRows = getComparisonRows(billing);

  return (
    <>
      <section
        className="section-padding bg-[var(--surface)]"
        aria-labelledby="forge-pricing-heading"
      >
        <div className="content-container">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow mb-3">Forge AI · SaaS</p>
            <h2 id="forge-pricing-heading" className="heading-section">
              Priced by decisions, not tokens.
            </h2>
            <p className="body-lg mt-4">
              Start with a free trial, then choose monthly or yearly billing —
              each decision is one verified request through the Forge pipeline.
            </p>
          </div>

          {/* Trial banner */}
          <div className="mb-8 rounded-2xl border-2 border-[var(--indigo)]/30 bg-gradient-to-r from-[var(--indigo-bg)] to-white p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
            <div className="flex gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--indigo)] text-white">
                <Gift size={20} strokeWidth={2} aria-hidden />
              </span>
              <div>
                <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-[var(--ink)]">
                  {FORGE_TRIAL.headline}
                </h3>
                <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[var(--ink-secondary)]">
                  {FORGE_TRIAL.body}
                </p>
              </div>
            </div>
            <Link
              href={FORGE_TRIAL.ctaHref}
              className="mt-6 inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--indigo)] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[var(--indigo-deep)] md:mt-0"
            >
              {FORGE_TRIAL.ctaLabel}
            </Link>
          </div>

          {/* Monthly / Yearly toggle */}
          <div className="mb-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <div
              className="inline-flex rounded-xl border border-[var(--border)] bg-white p-1"
              role="tablist"
              aria-label="Billing period"
            >
              {BILLING_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  role="tab"
                  aria-selected={billing === opt.id}
                  onClick={() => setBilling(opt.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-[14px] font-medium transition-all duration-200",
                    billing === opt.id
                      ? "bg-[var(--indigo)] text-white shadow-sm"
                      : "text-[var(--ink-secondary)] hover:text-[var(--ink)]",
                  )}
                >
                  {opt.label}
                  {opt.badge && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase",
                        billing === opt.id
                          ? "bg-white/20 text-white"
                          : "bg-[var(--emerald)]/12 text-[var(--emerald)]",
                      )}
                    >
                      {opt.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-12 rounded-2xl border border-[var(--indigo)]/20 bg-white px-6 py-5 md:px-8">
            <h3 className="text-[15px] font-semibold text-[var(--ink)]">
              {DECISION_EXPLAINER.title}
            </h3>
            <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-[var(--ink-secondary)]">
              {DECISION_EXPLAINER.body}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {FORGE_PRICING_PLANS.map((plan) => {
              const rates = plan[billing];
              return (
                <article
                  key={plan.id}
                  className={cn(
                    "relative flex flex-col rounded-2xl border bg-white p-8 transition-all duration-300",
                    plan.highlighted
                      ? "border-[var(--indigo)] shadow-[0_20px_60px_rgba(83,58,253,0.15)] lg:-translate-y-1"
                      : "border-[var(--border)] hover:border-[var(--indigo)]/30 hover:shadow-[0_16px_48px_rgba(83,58,253,0.08)]",
                  )}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--indigo)] px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
                      Most popular
                    </span>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--ink)]">
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-[13px] text-[var(--ink-muted)]">{plan.tagline}</p>
                  </div>

                  <div className="mb-4 border-b border-[var(--border)] pb-6">
                    <p className="font-stat text-[40px] leading-none tracking-tight text-[var(--ink)]">
                      {plan.decisionsPerMonth.toLocaleString()}
                    </p>
                    <p className="mt-1 text-[13px] font-medium text-[var(--indigo)]">
                      {plan.decisionsLabel}
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="font-stat text-[32px] leading-none text-[var(--ink)]">
                      {rates.priceDisplay}
                    </p>
                    <p className="mt-1 text-[12px] text-[var(--ink-muted)]">{rates.priceNote}</p>
                    {billing === "yearly" && rates.monthlyEquivalent && (
                      <p className="mt-1 text-[12px] font-medium text-[var(--indigo)]">
                        {rates.monthlyEquivalent}
                      </p>
                    )}
                    {billing === "yearly" && rates.yearlySavings && (
                      <p className="mt-2 text-[12px] font-medium text-[var(--emerald)]">
                        {rates.yearlySavings}
                      </p>
                    )}
                    <p className="mt-3 inline-flex rounded-full bg-[var(--emerald)]/10 px-3 py-1 text-[12px] font-semibold text-[var(--emerald)]">
                      {rates.costPerDecision} / decision
                    </p>
                  </div>

                  <ul className="mb-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-2.5 text-[13px] leading-relaxed text-[var(--ink-secondary)]"
                      >
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-[var(--emerald)]"
                          strokeWidth={2.25}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/contact?interest=forge-trial&plan=${plan.id}&billing=${billing}`}
                      className="inline-flex w-full items-center justify-center rounded-full border border-[var(--indigo)] bg-[var(--indigo-bg)] px-6 py-3 text-[14px] font-medium text-[var(--indigo)] transition-colors hover:bg-[var(--indigo)] hover:text-white"
                    >
                      Start 3-day trial
                    </Link>
                    <Link
                      href={`${plan.ctaHref}&billing=${billing}`}
                      className={cn(
                        "inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-[14px] font-medium transition-all duration-200",
                        plan.highlighted
                          ? "bg-[var(--indigo)] text-white hover:bg-[var(--indigo-deep)]"
                          : "border border-[var(--border)] bg-white text-[var(--ink)] hover:border-[var(--indigo)] hover:text-[var(--indigo)]",
                      )}
                    >
                      {plan.ctaLabel}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl border border-[var(--emerald)]/25 bg-gradient-to-br from-[var(--indigo-bg)] to-white p-6 md:p-8">
            <div className="flex flex-wrap items-start gap-4">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--emerald)]/12 text-[var(--emerald)]">
                <TrendingDown size={20} strokeWidth={2} />
              </span>
              <div className="max-w-3xl">
                <h3 className="text-[20px] font-medium tracking-[-0.02em] text-[var(--ink)] md:text-[22px]">
                  {FORGE_VALUE_PROPOSITION.headline}
                </h3>
                <p className="body-base mt-3">{FORGE_VALUE_PROPOSITION.body}</p>
                <p className="mt-3 text-[13px] font-semibold tracking-wide text-[var(--indigo)] uppercase">
                  {FORGE_VALUE_PROPOSITION.subline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white" aria-labelledby="pricing-comparison">
        <div className="content-container">
          <h2 id="pricing-comparison" className="heading-section mb-10">
            Forge plan comparison
            <span className="ml-2 text-[16px] font-normal text-[var(--ink-muted)]">
              ({billing === "yearly" ? "Yearly" : "Monthly"} billing)
            </span>
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="w-full min-w-[640px] border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface)]">
                  <th className="px-5 py-4 font-medium text-[var(--ink-muted)]">Feature</th>
                  <th className="px-5 py-4 font-medium text-[var(--ink)]">Starter</th>
                  <th className="px-5 py-4 font-medium text-[var(--indigo)]">Growth</th>
                  <th className="px-5 py-4 font-medium text-[var(--ink)]">Scale</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="border-b border-[var(--border)] last:border-0">
                    <td className="px-5 py-4 font-medium text-[var(--ink-secondary)]">
                      {row.label}
                    </td>
                    <td className="px-5 py-4 text-[var(--ink-secondary)]">{row.starter}</td>
                    <td className="px-5 py-4 font-medium text-[var(--ink)]">{row.growth}</td>
                    <td className="px-5 py-4 text-[var(--ink-secondary)]">{row.scale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[var(--surface)]" aria-labelledby="pricing-faq">
        <div className="content-container max-w-3xl">
          <h2 id="pricing-faq" className="heading-section mb-8">
            Forge pricing FAQ
          </h2>
          <dl className="space-y-4">
            {FORGE_PRICING_FAQ.map((item) => (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white"
              >
                <dt className="border-l-4 border-[var(--indigo)] bg-[var(--indigo-bg)]/60 px-5 py-4 text-[16px] font-semibold tracking-[-0.01em] text-[var(--ink)] md:px-6 md:text-[17px]">
                  {item.question}
                </dt>
                <dd className="body-base px-5 py-4 md:px-6">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
