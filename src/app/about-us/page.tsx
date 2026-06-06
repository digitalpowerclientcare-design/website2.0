import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TextRollButton } from "@/components/ui/TextRollButton";
import { StatsGrid } from "@/components/sections/shared/StatsGrid";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import {
  ABOUT_METRICS,
  CAPABILITY_AREAS,
  PAGE_IMAGES,
  STUDIO_PRINCIPLES,
} from "@/lib/companyContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "O3Xs is an AI engineering studio for enterprises that demand accountability — consultation for operations, Forge AI for software delivery.",
};

export default function AboutUsPage() {
  const images = PAGE_IMAGES.aboutUs;

  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 80% 30%, rgba(83,58,253,0.10), transparent 60%), radial-gradient(ellipse 40% 35% at 15% 90%, rgba(99,102,241,0.08), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="content-container relative z-10 grid items-center gap-12 py-24 md:py-32 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="min-w-0">
            <p className="eyebrow mb-4">About Us</p>
            <h1 className="heading-display whitespace-nowrap text-[clamp(1.25rem,3.6vw,3.75rem)] text-[var(--ink)]">
              An AI engineering studio.
            </h1>
            <h2 className="mt-1 max-w-full whitespace-nowrap font-light leading-[1.04] tracking-[-0.04em] text-[clamp(0.875rem,1.9vw,1.75rem)] text-[var(--ink-muted)]">
              Not a consultancy. Not an agency.
            </h2>
            <p className="body-lg mt-8 max-w-2xl">
              O3Xs builds and operates AI systems for enterprises that demand
              accountability. We diagnose, implement, operate — and measure
              success in outcomes leadership can verify.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <TextRollButton href="/our-purpose" label="Our Purpose" variant="indigo" />
              <TextRollButton href="/case-studies" label="Case Studies" variant="ghost" />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
            <div className="overflow-hidden rounded-3xl border border-[var(--border)] shadow-[0_24px_64px_rgba(83,58,253,0.12)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src={images.hero}
                  alt={images.heroAlt}
                  fill
                  unoptimized
                  priority
                  sizes="(max-width: 1024px) 90vw, 560px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)] py-16 md:py-20">
        <div className="content-container grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-[var(--border)] bg-white px-6 py-5 text-center"
            >
              <p className="font-stat text-[32px] leading-none text-[var(--indigo)] md:text-[36px]">
                {metric.value}
              </p>
              <p className="mt-2 text-[13px] font-medium text-[var(--ink-secondary)]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="content-container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[16/11] overflow-hidden rounded-3xl border border-[var(--border)] shadow-[0_16px_48px_rgba(28,30,84,0.08)]">
            <Image
              src={images.capabilities}
              alt={images.capabilitiesAlt}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--indigo)]/20 to-transparent" />
          </div>
          <div>
            <p className="eyebrow mb-3">What we do</p>
            <h2 className="heading-section">Two engines. One studio.</h2>
            <p className="body-lg mt-4">
              Consultation transforms how your business runs. Forge AI transforms
              how your software ships. Same team, same standard of accountability.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/consultation"
                className="group inline-flex items-center gap-2 text-[14px] font-medium text-[var(--indigo)]"
              >
                Consultation
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/forge-ai"
                className="group inline-flex items-center gap-2 text-[14px] font-medium text-[var(--indigo)]"
              >
                Forge AI
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="content-container mt-14 grid gap-5 md:grid-cols-3">
          {CAPABILITY_AREAS.map((area) => (
            <article
              key={area.title}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8"
            >
              <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--indigo-bg)] text-[var(--indigo)]">
                <area.Icon size={20} strokeWidth={1.75} />
              </span>
              <h3 className="text-lg font-semibold tracking-[-0.01em] text-[var(--ink)]">
                {area.title}
              </h3>
              <p className="mt-1 text-[13px] font-medium text-[var(--indigo)]">
                {area.subtitle}
              </p>
              <p className="body-base mt-3">{area.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-padding bg-[var(--surface)]">
        <div className="content-container mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Our principles</p>
          <h2 className="heading-section">
            How we think about AI in enterprises.
          </h2>
        </div>
        <div className="content-container grid gap-5 md:grid-cols-2">
          {STUDIO_PRINCIPLES.map((p) => (
            <article
              key={p.number}
              className="rounded-2xl border border-[var(--border)] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--indigo)]/30 hover:shadow-[0_16px_48px_rgba(83,58,253,0.08)]"
            >
              <span className="font-stat mb-5 inline-block text-sm tracking-[0.08em] text-[var(--indigo)]">
                {p.number}
              </span>
              <h3 className="text-xl font-medium tracking-[-0.015em] text-[var(--ink)]">
                {p.title}
              </h3>
              <p className="body-base mt-3">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="content-container grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow mb-3">Our team</p>
            <h2 className="heading-section">Built by operators, not theorists.</h2>
            <p className="body-lg mt-6">
              O3Xs is a collective of AI engineers, delivery operators, and
              enterprise advisors — practitioners who have shipped production
              systems across regulated industries, global SDLC programs, and
              multi-site operations. We measure ourselves by client outcomes, not
              headcount or titles.
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-[var(--border)] shadow-[0_16px_48px_rgba(28,30,84,0.08)]">
            <Image
              src={images.team}
              alt={images.teamAlt}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <StatsGrid
        background="surface"
        eyebrow="By the numbers"
        titleLineOne="Outcomes we sign for."
        titleLineTwo="Not promises we float."
        body="Every figure here came out of an executive sign-off — measured against the diagnostic baseline, verified post go-live."
        linkLabel="Read case studies"
        linkHref="/case-studies"
      />

      <CtaBanner
        eyebrow="Work with us"
        title="See what an accountable engagement looks like."
        subtitle="Start with a diagnostic. Walk away with a written report you can use — whether or not we end up working together."
        ctaLabel="Book a Consultation"
      />
    </>
  );
}
