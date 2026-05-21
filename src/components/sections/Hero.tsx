"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "motion/react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SITE } from "@/lib/site";

const GradientCanvas = dynamic(
  () =>
    import("@/components/ui/GradientCanvas").then((m) => m.GradientCanvas),
  { ssr: false },
);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-[72px]">
      <GradientCanvas variant="light" />

      <div className="content-container relative z-10 w-full py-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-[800px] text-center"
        >
          <motion.p variants={item} className="eyebrow mb-6">
            AI Engineering Studio
          </motion.p>
          <motion.h1 variants={item} className="heading-hero mb-6">
            {SITE.tagline}
          </motion.h1>
          <motion.p variants={item} className="body-lg mx-auto mb-10 max-w-[560px]">
            O3Xs diagnoses where your operations leak value, implements AI to
            stop it, and operates the solution until results compound.
          </motion.p>
          <motion.div
            variants={item}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <MagneticButton href="/contact">Book a Consultation →</MagneticButton>
            <Link href="/forge-ai" className="btn-ghost">
              See FORGE AI ↓
            </Link>
          </motion.div>
          <motion.p
            variants={item}
            className="mt-12 text-sm text-[var(--ink-muted)]"
          >
            Trusted by enterprise teams in software, healthcare, marketing, and
            legal operations
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
