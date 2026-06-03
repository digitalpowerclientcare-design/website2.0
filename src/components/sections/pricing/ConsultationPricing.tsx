import { Check } from "lucide-react";
import Link from "next/link";
import { TextRollButton } from "@/components/ui/TextRollButton";
import { CONSULTATION_PRICING } from "@/lib/pricingContent";

export function ConsultationPricing() {
  const p = CONSULTATION_PRICING;

  return (
    <section id="consultation-pricing" className="bg-white py-24 md:py-28" aria-labelledby="consultation-pricing-heading">
      <div className="content-container">
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow mb-3">{p.subtitle}</p>
          <h2 id="consultation-pricing-heading" className="heading-section">
            {p.title}
          </h2>
        </div>

        <div className="grid gap-10 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 md:grid-cols-[1.2fr_1fr] md:p-12 lg:gap-16">
          <div>
            <h3 className="text-[28px] leading-tight font-medium tracking-[-0.025em] text-[var(--ink)] md:text-[32px]">
              {p.headline}
            </h3>
            <p className="body-lg mt-5">{p.body}</p>
            <p className="mt-4 text-[14px] leading-relaxed text-[var(--ink-muted)]">
              {p.note}
            </p>
            <div className="mt-8">
              <TextRollButton href={p.ctaHref} label={p.ctaLabel} variant="indigo" />
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-white p-7 md:p-8">
            <p className="font-stat mb-5 text-[11px] tracking-[0.12em] text-[var(--indigo)] uppercase">
              Typical engagement includes
            </p>
            <ul className="space-y-4">
              {p.includes.map((item) => (
                <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-[var(--ink-secondary)]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--emerald)]/12 text-[var(--emerald)]">
                    <Check size={13} strokeWidth={2.4} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-[var(--border)] pt-6 text-[13px] text-[var(--ink-muted)]">
              Already know your scope?{" "}
              <Link href="/contact?interest=consultation" className="font-medium text-[var(--indigo)] hover:underline">
                Contact us directly
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
