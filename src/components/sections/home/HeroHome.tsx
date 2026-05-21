"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { TextRollButton } from "@/components/ui/TextRollButton";
import { SITE } from "@/lib/site";
import { HeroMesh } from "./HeroMesh";

export function HeroHome() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.35]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden border-b border-[var(--border)]"
    >
      <HeroMesh />

      <motion.div
        style={{ y, opacity }}
        className="content-container relative z-10 grid min-h-[100svh] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-24"
      >
        <div className="max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="heading-display mb-6 text-[var(--ink)]"
          >
            We build AI systems that{" "}
            <span className="gradient-text-animated">engineer trust</span> into
            software delivery.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-10 max-w-[520px] text-lg leading-[1.65] text-[var(--ink-secondary)]"
          >
            {SITE.tagline.includes("engineer")
              ? "O3Xs diagnoses where your operations leak value, implements AI to stop it, and operates the solution until results compound."
              : SITE.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <TextRollButton
              href="/contact"
              label="Book a Consultation"
              variant="indigo"
            />
            <TextRollButton
              href="/forge-ai"
              label="Explore FORGE AI"
              variant="ghost"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
        >
          <div className="liquid-glass-card overflow-hidden rounded-[20px] border border-white/60 shadow-[0_32px_80px_rgba(83,58,253,0.18)]">
            <div className="flex items-center justify-between border-b border-[var(--border)]/80 bg-white/90 px-4 py-3 backdrop-blur-xl">
              <span className="font-mono text-[11px] text-[var(--ink-muted)]">
                FORGE · Agent Pipeline
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--indigo-bg)] px-2.5 py-0.5 text-[10px] font-medium text-[var(--indigo)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--emerald)]" />
                Live
              </span>
            </div>
            <div className="relative aspect-[16/11] bg-[#f4f6fb]">
              <Image
                src="/forge/agents.png"
                alt="FORGE AI verification pipeline"
                fill
                className="object-cover object-top"
                priority
                unoptimized
                sizes="(max-width: 1024px) 90vw, 560px"
              />
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -left-4 hidden rounded-xl border border-[var(--border)] bg-white px-4 py-3 shadow-lg sm:block"
          >
            <p className="font-stat text-2xl text-[var(--indigo)]">6</p>
            <p className="text-xs text-[var(--ink-muted)]">Verification agents</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -top-3 -right-2 hidden rounded-xl border border-[var(--border)] bg-white px-4 py-3 shadow-lg sm:block"
          >
            <p className="text-xs font-medium text-[var(--ink-secondary)]">
              Server-side verified
            </p>
            <p className="font-stat text-sm text-[var(--emerald)]">SOC2 Ready</p>
          </motion.div>
        </motion.div>
      </motion.div>

      <Link
        href="#partners"
        aria-label="Scroll to next section"
        className="pointer-events-auto absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[var(--ink-muted)] transition-colors hover:text-[var(--indigo)] md:flex"
      >
        <span className="text-[10px] font-medium tracking-[0.22em] uppercase">
          Scroll
        </span>
        <span className="relative block h-8 w-px overflow-hidden bg-[var(--border)]">
          <motion.span
            className="absolute inset-x-0 top-0 block w-px bg-[var(--indigo)]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "top", height: "100%" }}
          />
        </span>
        <motion.span
          animate={{ y: [0, 4, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="-mt-1 inline-flex"
        >
          <ChevronDown size={14} />
        </motion.span>
      </Link>
    </section>
  );
}
