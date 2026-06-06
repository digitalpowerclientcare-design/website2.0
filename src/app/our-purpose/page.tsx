import type { Metadata } from "next";
import Image from "next/image";
import { Quote } from "lucide-react";
import { TextRollButton } from "@/components/ui/TextRollButton";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import {
  PAGE_IMAGES,
  PURPOSE_BELIEFS,
  PURPOSE_COMMITMENTS,
} from "@/lib/companyContent";

export const metadata: Metadata = {
  title: "Our Purpose",
  description:
    "Why O3Xs exists — to close the accountability gap between AI strategy and sustained enterprise performance.",
};

export default function OurPurposePage() {
  const images = PAGE_IMAGES.ourPurpose;

  return (
    <>
      <section className="relative overflow-hidden bg-[var(--brand-dark)]">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={images.hero}
            alt=""
            fill
            unoptimized
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/95 via-[#0a0a0f]/82 to-[#1c1e54]/75" />
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
          <p className="eyebrow mb-4 text-[var(--indigo-soft)]">Our Purpose</p>
          <h1 className="heading-display text-white">
            Strategy decks don&apos;t ship.{" "}
            <span className="text-[var(--indigo-soft)]">We do.</span>
          </h1>
          <p className="body-lg mt-6 max-w-2xl text-white/75">
            O3Xs exists to close the gap between AI ambition and accountable
            execution — when consultants leave, vendors install, and results
            fail to compound.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[var(--surface)]">
        <div className="content-container grid gap-12 lg:grid-cols-[minmax(260px,340px)_1fr_minmax(0,380px)] lg:items-start lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-3">The gap we close</p>
            <h2 className="heading-section text-[var(--ink)]">
              {PURPOSE_BELIEFS[0].title}
            </h2>
            <p className="body-base mt-4 text-[var(--ink-secondary)]">
              {PURPOSE_BELIEFS[0].body}
            </p>
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--border)] lg:hidden">
              <Image
                src={images.accountability}
                alt={images.accountabilityAlt}
                fill
                unoptimized
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-10">
              <TextRollButton
                href="/consultation"
                label="See our consultation model"
                variant="indigo"
              />
            </div>
          </div>

          <div className="space-y-6">
            {PURPOSE_BELIEFS.slice(1).map((belief) => (
              <article
                key={belief.title}
                className="rounded-2xl border border-[var(--border)] bg-white p-7 md:p-8"
              >
                <h3 className="text-xl font-medium tracking-[-0.015em] text-[var(--ink)]">
                  {belief.title}
                </h3>
                <p className="body-base mt-3">{belief.body}</p>
              </article>
            ))}
          </div>

          <div className="space-y-5 lg:col-start-3">
            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)] shadow-[0_12px_40px_rgba(28,30,84,0.08)] lg:block">
              <Image
                src={images.accountability}
                alt={images.accountabilityAlt}
                fill
                unoptimized
                sizes="480px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/35 to-transparent" />
            </div>
            <div className="rounded-3xl border border-[var(--border)] bg-white p-8 shadow-[0_12px_40px_rgba(28,30,84,0.06)] md:p-10">
              <Quote
                className="text-[var(--indigo)]"
                size={28}
                strokeWidth={1.75}
                aria-hidden
              />
              <p className="mt-5 text-[20px] leading-[1.5] font-light tracking-[-0.01em] text-[var(--ink)] md:text-[22px]">
                The hardest part of AI transformation isn&apos;t the AI.
                It&apos;s the operating discipline after the AI ships.
              </p>
              <p className="mt-8 border-t border-[var(--border)] pt-6 text-[13px] font-medium tracking-wide text-[var(--ink-muted)] uppercase">
                O3Xs operating philosophy
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="content-container mb-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">What we commit to</p>
            <h2 className="heading-section">
              How we show up for every engagement.
            </h2>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--border)] lg:aspect-[16/10]">
            <Image
              src={images.operate}
              alt={images.operateAlt}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 640px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/10" />
          </div>
        </div>
        <div className="content-container grid gap-5 md:grid-cols-2">
          {PURPOSE_COMMITMENTS.map((item) => (
            <article
              key={item.number}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--indigo)]/30 hover:shadow-[0_16px_48px_rgba(83,58,253,0.08)]"
            >
              <span className="font-stat mb-5 inline-block text-sm tracking-[0.08em] text-[var(--indigo)]">
                {item.number}
              </span>
              <h3 className="text-xl font-medium tracking-[-0.015em] text-[var(--ink)]">
                {item.title}
              </h3>
              <p className="body-base mt-3">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBanner
        eyebrow="Next step"
        title="Start with a diagnostic. Leave with clarity."
        subtitle="Whether or not we work together, you'll walk away with a written report — quantified leakage and a prioritized path forward."
        ctaLabel="Book a Consultation"
      />
    </>
  );
}
