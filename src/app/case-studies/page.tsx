import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { TextRollButton } from "@/components/ui/TextRollButton";
import { CaseStudyExplorer } from "@/components/sections/case-studies/CaseStudyExplorer";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { StatsGrid } from "@/components/sections/shared/StatsGrid";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Verified enterprise outcomes — consultation across six industries, and FORGE AI for custom software, CRM, and ERP delivery.",
};

const BANNER_IMAGE =
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1920";

export default function CaseStudiesPage() {
  return (
    <>
      {/* HERO — tagline + banner */}
      <section className="relative overflow-hidden bg-[var(--brand-dark)]">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={BANNER_IMAGE}
            alt=""
            fill
            unoptimized
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/95 via-[#0a0a0f]/80 to-[#1c1e54]/70" />
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
          <p className="eyebrow mb-4 text-[var(--indigo-soft)]">Case Studies</p>
          <h1 className="heading-display text-white">
            Outcomes we sign for.{" "}
            <span className="text-[var(--indigo-soft)]">
              Stories you can verify.
            </span>
          </h1>
          <p className="body-lg mt-6 max-w-2xl text-white/75">
            Consultation engagements span six industries with clients in the
            United States and India. FORGE AI case studies cover custom software
            development, CRM, and ERP — the product types we deliver against.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <TextRollButton
              href="#case-studies"
              label="Browse by industry"
              variant="white"
            />
            <TextRollButton
              href="/contact"
              label="Start your diagnostic"
              variant="ghost"
              className="!text-white/90 hover:!text-white"
            />
          </div>
        </div>
      </section>

      {/* Interactive case study browser */}
      <Suspense
        fallback={
          <div className="content-container py-20 text-[var(--ink-muted)]">
            Loading case studies…
          </div>
        }
      >
        <CaseStudyExplorer />
      </Suspense>

      {/* Aggregate proof */}
      <StatsGrid
        background="canvas"
        eyebrow="Verified Outcomes"
        titleLineOne="Numbers from the field."
        titleLineTwo="Not the deck."
        body="Every metric here came out of a real engagement and an executive sign-off — measured in dollars, hours, or production deltas."
        linkLabel="Book a diagnostic"
        linkHref="/contact"
      />

      <CtaBanner
        eyebrow="Your industry"
        title="See what accountable AI looks like in your vertical."
        subtitle="Start with a diagnostic. Walk away with a written report — whether or not we end up working together."
        ctaLabel="Book a Consultation"
      />
    </>
  );
}
