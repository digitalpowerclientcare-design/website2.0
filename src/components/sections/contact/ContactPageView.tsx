"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Quote } from "lucide-react";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/ui/SocialIcons";
import {
  CONSULTATION_CONTACT_REVIEWS,
  FORGE_CONTACT_REVIEWS,
  resolveContactContext,
} from "@/lib/contactContent";
import { SITE } from "@/lib/site";
import { ContactForm } from "./ContactForm";

const SOCIALS = [
  { Icon: LinkedInIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: TwitterIcon, href: "https://twitter.com", label: "Twitter / X" },
  { Icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { Icon: GitHubIcon, href: "https://github.com", label: "GitHub" },
] as const;

export function ContactPageView() {
  const searchParams = useSearchParams();
  const context = useMemo(
    () => resolveContactContext(searchParams),
    [searchParams],
  );
  const { page } = context;
  const reviews =
    context.variant === "forge" ? FORGE_CONTACT_REVIEWS : CONSULTATION_CONTACT_REVIEWS;

  return (
    <>
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
          <p className="eyebrow mb-4">{page.eyebrow}</p>
          <h1 className="heading-display text-[var(--ink)]">{page.title}</h1>
          {page.titleAccent && (
            <h1 className="heading-display mt-1 font-light text-[var(--ink-muted)]">
              {page.titleAccent}
            </h1>
          )}
          <p className="body-lg mt-8 max-w-[640px]">{page.description}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="content-container grid gap-8 md:grid-cols-[2fr_3fr] md:gap-10">
          <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-10">
            <h3 className="text-[20px] font-medium tracking-[-0.015em] text-[var(--ink)]">
              What&apos;s included
            </h3>
            <ul className="mt-6 space-y-4">
              {page.included.map((item) => (
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
              What teams say
            </h3>
            <ul className="mt-5 space-y-5">
              {reviews.map((review) => (
                <li
                  key={review.author}
                  className="rounded-xl border border-[var(--border)] bg-white p-4"
                >
                  <Quote
                    size={16}
                    className="text-[var(--indigo)]/50"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--ink-secondary)] italic">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <p className="mt-3 text-[13px] font-medium text-[var(--ink)]">
                    {review.author}
                  </p>
                  <p className="text-[12px] text-[var(--ink-muted)]">{review.role}</p>
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

          <ContactForm context={context} />
        </div>
      </section>

      <section className="section-padding bg-[var(--surface)]">
        <div className="content-container mx-auto max-w-[800px] text-center">
          <h3 className="text-[24px] font-medium tracking-[-0.02em] text-[var(--ink)] md:text-[28px]">
            {page.trustTitle}
          </h3>
          <p className="mt-5 text-[16px] leading-relaxed text-[var(--ink-secondary)]">
            {page.trustBody}
          </p>
        </div>
      </section>
    </>
  );
}
