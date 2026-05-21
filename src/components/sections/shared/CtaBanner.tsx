"use client";

import { motion } from "motion/react";
import { TextRollButton } from "@/components/ui/TextRollButton";

type CtaBannerProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

/** Dark indigo CTA banner — used on Home, Consulting, About. */
export function CtaBanner({
  eyebrow,
  title = "Book a 60-minute consultation.",
  subtitle = "Get a Performance Diagnostic Report — quantified leakage, prioritized fixes, and an ROI-ranked roadmap.",
  ctaLabel = "Start Your Diagnostic",
  ctaHref = "/contact",
}: CtaBannerProps) {
  return (
    <section className="section-padding relative overflow-hidden bg-[var(--brand-dark)]">
      <div
        className="hero-mesh-css absolute inset-0 opacity-30 invert"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(12,14,40,0.9)_100%)]"
        aria-hidden
      />

      <div className="content-container relative z-10 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          {eyebrow && (
            <p className="mb-3 text-[11px] font-medium tracking-[0.22em] text-white/60 uppercase">
              {eyebrow}
            </p>
          )}
          <h2 className="heading-display text-white">{title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <TextRollButton
            href={ctaHref}
            label={ctaLabel}
            variant="white"
            className="btn-glow-pulse"
          />
        </motion.div>
      </div>
    </section>
  );
}
