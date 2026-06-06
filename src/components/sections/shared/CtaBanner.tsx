"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { TextRollButton } from "@/components/ui/TextRollButton";

type CtaBannerProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
  imageAlt?: string;
};

/** Dark indigo CTA banner — used on Home, Consulting, About. */
export function CtaBanner({
  eyebrow,
  title = "Book a 60-minute consultation.",
  subtitle = "Get a Performance Diagnostic Report — quantified leakage, prioritized fixes, and an ROI-ranked roadmap.",
  ctaLabel = "Start Your Diagnostic",
  ctaHref = "/contact",
  image,
  imageAlt = "Enterprise consultation",
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

      <div
        className={`content-container relative z-10 flex gap-10 ${
          image
            ? "flex-col items-stretch lg:grid lg:grid-cols-[1fr_340px] lg:items-center lg:gap-14"
            : "flex-col items-start justify-between lg:flex-row lg:items-center"
        }`}
      >
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
          <p className="mt-4 text-lg leading-relaxed text-white/70">{subtitle}</p>
        </motion.div>

        {image ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.35)]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                unoptimized
                className="object-cover"
                sizes="340px"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--brand-dark)]/50 via-transparent to-transparent"
                aria-hidden
              />
            </div>
            <TextRollButton
              href={ctaHref}
              label={ctaLabel}
              variant="white"
              className="btn-glow-pulse w-full justify-center sm:w-auto"
            />
          </motion.div>
        ) : (
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
        )}
      </div>
    </section>
  );
}
