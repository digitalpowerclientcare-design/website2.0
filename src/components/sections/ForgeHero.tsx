"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "motion/react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const GradientCanvas = dynamic(
  () =>
    import("@/components/ui/GradientCanvas").then((m) => m.GradientCanvas),
  { ssr: false },
);

export function ForgeHero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden text-white">
      <GradientCanvas variant="dark" />
      <div className="absolute inset-0 bg-[var(--brand-dark)]/40" aria-hidden />

      <div className="content-container relative z-10 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl"
        >
          <p className="eyebrow mb-4 text-[var(--indigo-soft)]">
            FORGE AI — PRIVATE BETA
          </p>
          <h1 className="heading-hero mb-2 text-white">
            Your team is using AI to write code.
          </h1>
          <p className="heading-hero gradient-text mb-6">
            FORGE makes sure it&apos;s safe to ship.
          </p>
          <p className="body-lg mb-10 text-white/75">
            45% of AI-generated code has security vulnerabilities. FORGE is the
            verification layer between AI generation and production.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <MagneticButton href="/contact" variant="white">
              Request Beta Access →
            </MagneticButton>
            <Link href="#how-it-works" className="btn-ghost text-white/90">
              See how it works ↓
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-4 text-sm text-white/60">
            {["SOC2 Ready", "6 Verification Agents", "Server-Side Verified"].map(
              (badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/15 px-3 py-1"
                >
                  {badge}
                </span>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
