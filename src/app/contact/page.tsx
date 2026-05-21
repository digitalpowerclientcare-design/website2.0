import type { Metadata } from "next";
import { Check } from "lucide-react";
import { DiagnosticForm } from "@/components/sections/contact/DiagnosticForm";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/ui/SocialIcons";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a 60-minute consultation. Get a written Performance Diagnostic Report identifying where you're losing money — with quantified impact and prioritized fixes.",
};

const INCLUDED = [
  "60-minute deep-dive consultation",
  "Written Performance Diagnostic Report",
  "Quantified revenue / cost leakage analysis",
  "ROI-ranked improvement roadmap",
] as const;

const SOCIALS = [
  { Icon: LinkedInIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: TwitterIcon, href: "https://twitter.com", label: "Twitter / X" },
  { Icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { Icon: GitHubIcon, href: "https://github.com", label: "GitHub" },
] as const;

export default function ContactPage() {
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

        <div className="content-container relative z-10 max-w-3xl py-24 md:py-32">
          <p className="eyebrow mb-4">Contact us</p>
          <h1 className="heading-display text-[var(--ink)]">
            Book a 60-minute consultation.
          </h1>
          <h1 className="heading-display mt-1 font-light text-[var(--ink-muted)]">
            Get a Performance Diagnostic Report.
          </h1>
          <p className="body-lg mt-8 max-w-[640px]">
            In one focused session, we&apos;ll analyze your operations and
            deliver a written diagnostic report identifying where you&apos;re
            losing money — with quantified impact and prioritized fixes.
          </p>
        </div>
      </section>

      {/* SPLIT — Info + Form */}
      <section className="bg-white py-24 md:py-28">
        <div className="content-container grid gap-8 md:grid-cols-[2fr_3fr] md:gap-10">
          {/* LEFT — info card */}
          <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-10">
            <h3 className="text-[20px] font-medium tracking-[-0.015em] text-[var(--ink)]">
              What&apos;s included
            </h3>
            <ul className="mt-6 space-y-4">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--emerald)]/12 text-[var(--emerald)]">
                    <Check size={13} strokeWidth={2.4} />
                  </span>
                  <span className="text-[15px] leading-relaxed text-[var(--ink-secondary)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className="my-8 h-px w-full"
              style={{ backgroundColor: "var(--border)" }}
              aria-hidden
            />

            <h3 className="text-[20px] font-medium tracking-[-0.015em] text-[var(--ink)]">
              Direct contact
            </h3>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-3 inline-block text-[15px] font-medium text-[var(--indigo)] transition-opacity hover:opacity-80 hover:underline"
            >
              {SITE.email}
            </a>

            <div className="mt-8 flex items-center gap-3">
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
          </aside>

          {/* RIGHT — form */}
          <DiagnosticForm />
        </div>
      </section>

      {/* TRUST SIGNALS */}
      <section className="bg-[var(--surface)] py-24 md:py-28">
        <div className="content-container mx-auto max-w-[800px] text-center">
          <h3 className="text-[24px] font-medium tracking-[-0.02em] text-[var(--ink)] md:text-[28px]">
            Confidential. No obligation. No sales pitch.
          </h3>
          <p className="mt-5 text-[16px] leading-relaxed text-[var(--ink-secondary)]">
            The diagnostic call is purely consultative. You&apos;ll leave with
            a written report you can use whether or not you engage with O3Xs
            further. Our diagnostic process is covered by mutual NDA.
          </p>
        </div>
      </section>
    </>
  );
}
