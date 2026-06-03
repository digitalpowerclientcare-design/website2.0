"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { TextRollButton } from "@/components/ui/TextRollButton";
import { HERO_SLIDES, type HeroSlideId } from "@/lib/homeContent";
import { HeroMesh } from "./HeroMesh";

const AUTO_INTERVAL_MS = 5500;

const SLIDE_LABELS: Record<HeroSlideId, string> = {
  o3xs: "O3Xs",
  consultation: "Consultation",
  forge: "FORGE AI",
};

function slideWindowLabel(id: HeroSlideId): string {
  if (id === "o3xs") return "O3Xs · AI Engineering Studio";
  if (id === "consultation") return "O³ · Business Process Automation";
  return "FORGE · Enterprise SDLC";
}

function slideBadgeLabel(id: HeroSlideId): string {
  if (id === "o3xs") return "Business + Software";
  if (id === "consultation") return "Cross-industry";
  return "Plug & play";
}

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  const goTo = useCallback((index: number) => {
    setActive(index % HERO_SLIDES.length);
  }, []);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, AUTO_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [next]);

  const slide = HERO_SLIDES[active];

  return (
    <section
      className="relative min-h-[calc(100svh-72px)] overflow-hidden border-b border-[var(--border)]"
      aria-roledescription="carousel"
      aria-label="O3Xs services"
    >
      <HeroMesh />

      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 56 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -56 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="content-container relative z-10 grid min-h-[calc(100svh-72px)] items-center gap-8 py-6 sm:gap-10 sm:py-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-10"
        >
          <div className="max-w-xl pt-2 lg:pt-0">
            <p className="eyebrow mb-3">{slide.eyebrow}</p>

            <h1 className="heading-display mb-5 text-[var(--ink)]">
              {slide.headline}{" "}
              <span className="gradient-text-animated">{slide.headlineAccent}</span>
            </h1>

            <p className="mb-8 max-w-[520px] text-lg leading-[1.65] text-[var(--ink-secondary)]">
              {slide.subheadline}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <TextRollButton
                href={slide.ctaHref}
                label={slide.ctaLabel}
                variant="indigo"
              />
              {slide.secondaryLabel && slide.secondaryHref && (
                <TextRollButton
                  href={slide.secondaryHref}
                  label={slide.secondaryLabel}
                  variant="ghost"
                />
              )}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
            <div className="liquid-glass-card overflow-hidden rounded-[20px] border border-white/60 shadow-[0_32px_80px_rgba(83,58,253,0.18)]">
              <div className="flex items-center justify-between border-b border-[var(--border)]/80 bg-white/90 px-4 py-2.5 backdrop-blur-xl">
                <span className="font-mono text-[11px] text-[var(--ink-muted)]">
                  {slideWindowLabel(slide.id)}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--indigo-bg)] px-2.5 py-0.5 text-[10px] font-medium text-[var(--indigo)]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--emerald)]" />
                  {slideBadgeLabel(slide.id)}
                </span>
              </div>
              <div className="relative aspect-[16/10] bg-[#f4f6fb]">
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  className={
                    slide.id === "forge"
                      ? "object-cover object-top"
                      : "object-cover"
                  }
                  priority={active === 0}
                  unoptimized
                  sizes="(max-width: 1024px) 90vw, 560px"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(10,10,15,0.4)] via-[rgba(10,10,15,0.05)] to-transparent"
                  aria-hidden
                />
                {slide.chips && slide.chips.length > 0 && (
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                    {slide.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-md border border-white/25 bg-black/45 px-2 py-1 text-[10px] font-medium tracking-wide text-white backdrop-blur-sm"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {slide.id === "consultation" ? (
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 hidden rounded-xl border border-[var(--border)] bg-white px-4 py-3 shadow-lg sm:block"
              >
                <p className="font-stat text-2xl text-[var(--indigo)]">BPA</p>
                <p className="text-xs text-[var(--ink-muted)]">AI-led automation</p>
              </motion.div>
            ) : slide.id === "forge" ? (
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -top-3 -right-2 hidden rounded-xl border border-[var(--border)] bg-white px-4 py-3 shadow-lg sm:block"
              >
                <p className="text-xs font-medium text-[var(--ink-secondary)]">
                  Legacy + greenfield
                </p>
                <p className="font-stat text-sm text-[var(--emerald)]">SOC2 Ready</p>
              </motion.div>
            ) : (
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.25,
                }}
                className="absolute -bottom-4 -right-3 hidden rounded-xl border border-[var(--indigo)]/20 bg-white px-4 py-3 shadow-lg sm:block"
              >
                <p className="font-stat text-sm text-[var(--indigo)]">2 engines</p>
                <p className="text-xs text-[var(--ink-muted)]">1 accountable team</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-24">
        <div className="flex items-center gap-3">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Show ${SLIDE_LABELS[s.id]} slide`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => goTo(i)}
              className="group relative h-2 overflow-hidden rounded-full bg-[var(--ink-muted)]/25 transition-all"
              style={{ width: i === active ? 40 : 8 }}
            >
              {i === active && (
                <motion.span
                  key={`progress-${active}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-[var(--indigo)]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: AUTO_INTERVAL_MS / 1000,
                    ease: "linear",
                  }}
                />
              )}
            </button>
          ))}
        </div>
        <span className="text-[10px] font-medium tracking-[0.16em] text-[var(--ink-muted)] uppercase">
          Auto-advancing
        </span>
      </div>

      <div className="absolute bottom-20 right-6 z-20 hidden items-center gap-2 md:flex lg:right-12">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            className={`rounded-full border px-3 py-1.5 text-[11px] font-medium tracking-wide uppercase transition-all ${
              i === active
                ? "border-[var(--indigo)] bg-[var(--indigo)] text-white"
                : "border-[var(--border)] bg-white/80 text-[var(--ink-secondary)] backdrop-blur-sm hover:border-[var(--indigo)]/40"
            }`}
          >
            {SLIDE_LABELS[s.id]}
          </button>
        ))}
      </div>

      <Link
        href="#partners"
        aria-label="Scroll to next section"
        className="pointer-events-auto absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[var(--ink-muted)] transition-colors hover:text-[var(--indigo)] md:flex"
      >
        <span className="text-[10px] font-medium tracking-[0.22em] uppercase">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 4, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex"
        >
          <ChevronDown size={14} />
        </motion.span>
      </Link>
    </section>
  );
}
