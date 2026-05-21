import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { StatsGrid } from "@/components/sections/shared/StatsGrid";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import {
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/ui/SocialIcons";

export const metadata: Metadata = {
  title: "About",
  description:
    "O3Xs is an AI engineering studio for enterprises that demand accountability. We diagnose, implement, operate — and own the outcomes.",
};

const PRINCIPLES = [
  {
    number: "01",
    title: "Diagnose Before Automating",
    body: "Most AI fails because broken processes get automated instead of fixed. We optimize before we orchestrate — always.",
  },
  {
    number: "02",
    title: "Tools Are Means, Not Ends",
    body: "Our methodology is tool-agnostic. The right AI stack for your organization depends on your data, KPIs, and regulatory reality — not our partnerships.",
  },
  {
    number: "03",
    title: "Outcomes Over Outputs",
    body: "A delivered project isn't success. Sustained performance improvement is success. We tie our compensation to verified business outcomes.",
  },
  {
    number: "04",
    title: "Compounding Beats One-Time",
    body: "Every engagement we deliver strengthens our playbooks for the next one. Your engagement benefits from every previous one.",
  },
] as const;

const SOCIALS = [
  {
    Icon: LinkedInIcon,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  { Icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
  { Icon: GitHubIcon, href: "https://github.com", label: "GitHub" },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 80% 30%, rgba(83,58,253,0.10), transparent 60%), radial-gradient(ellipse 40% 35% at 15% 90%, rgba(99,102,241,0.08), transparent 60%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent 80%)",
          }}
          aria-hidden
        />

        <div className="content-container relative z-10 max-w-3xl py-24 md:py-32">
          <p className="eyebrow mb-4">About O3Xs</p>
          <h1 className="heading-display text-[var(--ink)]">
            An AI engineering studio.
          </h1>
          <h1 className="heading-display mt-1 font-light text-[var(--ink-muted)]">
            Not a consultancy. Not an agency.
          </h1>
          <p className="body-lg mt-8 max-w-2xl">
            O3Xs builds and operates AI systems for enterprises that demand
            accountability. We diagnose, we implement, we operate, and we own
            the outcomes.
          </p>
        </div>
      </section>

      {/* WHY WE EXIST */}
      <section className="bg-[var(--surface)] py-24 md:py-28">
        <div className="content-container grid gap-12 md:grid-cols-[3fr_2fr] md:items-start md:gap-16">
          <div>
            <p className="eyebrow mb-3">Why we exist</p>
            <h2 className="heading-section">
              Strategy decks don&apos;t ship. We do.
            </h2>
            <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-[var(--ink-secondary)]">
              <p>
                Every enterprise we talk to has the same story. Consultants
                delivered strategy. Vendors delivered tools. Internal teams
                delivered automation. And somehow, results never compounded.
              </p>
              <p>
                The gap isn&apos;t strategy or technology. It&apos;s
                accountability for sustained performance after the project
                ends — when the slides are archived and the consultants have
                moved on.
              </p>
              <p>
                O3Xs exists to close that gap. We optimize, orchestrate,
                operate, innovate, and scale — and we don&apos;t leave after
                go-live.
              </p>
            </div>
          </div>

          <div className="relative">
            <div
              className="rounded-3xl border border-[var(--border)] bg-white p-8 shadow-[0_12px_40px_rgba(28,30,84,0.06)] md:p-10"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at top right, rgba(83,58,253,0.08), transparent 60%)",
              }}
            >
              <Quote
                className="text-[var(--indigo)]"
                size={28}
                strokeWidth={1.75}
              />
              <p className="mt-5 text-[20px] leading-[1.5] font-light tracking-[-0.01em] text-[var(--ink)] md:text-[22px]">
                The hardest part of AI transformation isn&apos;t the AI.
                It&apos;s the operating discipline after the AI ships.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-[15px] font-medium text-white"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #533AFD 0%, #2D1E54 100%)",
                  }}
                  aria-hidden
                >
                  PN
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[var(--ink)]">
                    Prasanth Nath
                  </p>
                  <p className="text-[13px] text-[var(--ink-muted)]">
                    Founder, O3Xs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="bg-white py-24 md:py-28">
        <div className="content-container mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Our principles</p>
          <h2 className="heading-section">
            How we think about AI in enterprises.
          </h2>
        </div>

        <div className="content-container grid gap-5 md:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <article
              key={p.number}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--indigo)]/30 hover:shadow-[0_16px_48px_rgba(83,58,253,0.08)]"
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

      {/* LEADERSHIP / FOUNDER */}
      <section className="bg-[var(--surface)] py-24 md:py-28">
        <div className="content-container mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Leadership</p>
          <h2 className="heading-section">
            Built by operators, not theorists.
          </h2>
        </div>

        <div className="content-container">
          <article
            className="mx-auto flex max-w-[760px] flex-col gap-8 rounded-3xl border border-[var(--border)] bg-white p-8 shadow-[0_12px_40px_rgba(28,30,84,0.06)] md:flex-row md:items-start md:p-10"
          >
            <div
              className="relative flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-2xl text-3xl font-light tracking-tight text-white"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #533AFD 0%, #2D1E54 100%)",
              }}
              aria-hidden
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 50%)",
                }}
              />
              <span className="relative font-stat">PN</span>
            </div>

            <div className="flex-1">
              <h3 className="text-[28px] leading-tight font-light tracking-[-0.025em] text-[var(--ink)] md:text-[32px]">
                Prasanth Nath
              </h3>
              <p className="mt-1 text-[14px] font-medium text-[var(--indigo)]">
                Founder · AI Engineering Lead
              </p>
              <p className="body-base mt-5">
                Prasanth leads AI-driven innovation and engineering at O3Xs.
                Previously building enterprise AI platforms for software
                development (FORGE AI) and marketing operations across
                multi-location businesses. Hands-on full-stack engineering
                across backend systems, AI agents, and production infrastructure.
              </p>

              <div className="mt-6 flex items-center gap-3">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--indigo-bg)] text-[var(--indigo)] transition-colors duration-200 hover:bg-[var(--indigo)] hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* STATS */}
      <StatsGrid
        background="canvas"
        eyebrow="By the Numbers"
        titleLineOne="Outcomes we sign for."
        titleLineTwo="Not promises we float."
        body="Every figure here came out of an executive sign-off — measured against the diagnostic baseline, verified post go-live."
        linkLabel="Read the framework"
        linkHref="/consulting#framework"
      />

      {/* CTA */}
      <CtaBanner
        eyebrow="Work with us"
        title="See what an accountable engagement looks like."
        subtitle="Start with a diagnostic. Walk away with a written report you can use — whether or not we end up working together."
        ctaLabel="Start Your Diagnostic"
      />
    </>
  );
}
