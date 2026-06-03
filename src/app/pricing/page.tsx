import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { PricingTabs } from "@/components/sections/pricing/PricingTabs";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Consultation pricing by enquiry — outcome-based BPA engagements. Forge AI SaaS plans priced by decisions (verified requests per month).",
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=85&w=1920";

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--brand-dark)]">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            unoptimized
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/95 via-[#0a0a0f]/85 to-[#1c1e54]/80" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 75% 25%, rgba(83,58,253,0.35), transparent 55%)",
          }}
          aria-hidden
        />
        <div className="content-container relative z-10 max-w-3xl py-24 md:py-32">
          <p className="eyebrow mb-4 text-[var(--indigo-soft)]">Pricing</p>
          <h1 className="heading-display text-white">
            Choose how you work with O3Xs.
          </h1>
          <p className="body-lg mt-6 max-w-2xl text-white/75">
            Enquire for Consultation — scoped to your operation. Or select Forge
            AI plans priced by monthly decisions, with lower cost per feature as
            you scale.
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="content-container py-24 text-center text-[var(--ink-muted)]">
            Loading pricing…
          </div>
        }
      >
        <PricingTabs />
      </Suspense>

      <CtaBanner
        eyebrow="Not sure which plan?"
        title="Talk to us — we'll match the right model."
        subtitle="Consultation for operations transformation. Forge AI for engineering teams shipping CRM, ERP, or custom software."
        ctaLabel="Contact Us"
        ctaHref="/contact"
      />
    </>
  );
}
