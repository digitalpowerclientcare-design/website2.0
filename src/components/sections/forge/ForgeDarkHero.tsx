"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { PAGE_IMAGES } from "@/lib/companyContent";

const BADGES = ["SOC2 Ready", "6 Verification Agents", "Server-Side Verified"];

export function ForgeDarkHero() {
  const images = PAGE_IMAGES.forgeAi;

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden text-white">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0A0A14 0%, #1C1E54 50%, #2D1E54 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 80%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 80% 30%, rgba(83,58,253,0.45), transparent 60%), radial-gradient(ellipse 40% 35% at 20% 80%, rgba(168,85,247,0.30), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="content-container relative z-10 grid items-center gap-12 py-24 md:py-32 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium tracking-[0.18em] text-white/80 uppercase">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Forge AI · Private Beta
          </div>

          <h1 className="text-[44px] leading-[1.05] font-light tracking-[-0.04em] text-white md:text-[60px] lg:text-[72px]">
            Your team is using AI to write code.
          </h1>
          <h1
            className="mt-2 text-[44px] leading-[1.05] font-light tracking-[-0.04em] md:text-[60px] lg:text-[72px]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #533AFD 0%, #818CF8 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Forge makes sure it&apos;s safe to ship.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">
            45% of AI-generated code has security vulnerabilities. Forge is the
            verification layer between AI generation and production.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              <Link
                href="/contact?interest=forge-beta"
                className="group inline-flex items-center gap-2 rounded-full bg-white py-3 pr-2 pl-7 text-[15px] font-medium text-[#0A0A14] transition-colors duration-300 hover:bg-white/90"
              >
                Request Beta Access
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--indigo)] text-white transition-transform duration-500 group-hover:-rotate-45">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <Link
                href="#how-it-works"
                className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[15px] font-medium text-white/90 transition-colors duration-300 hover:border-white/60 hover:text-white"
              >
                See how it works
                <ChevronDown
                  size={16}
                  className="transition-transform duration-500 group-hover:translate-y-0.5"
                />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {BADGES.map((b) => (
              <span
                key={b}
                className="rounded-full border border-white/20 bg-white/[0.03] px-3.5 py-1.5 text-[12px] font-medium text-white/75"
              >
                {b}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
        >
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] shadow-[0_32px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            <div className="border-b border-white/10 px-4 py-2.5">
              <span className="font-mono text-[11px] text-white/50">
                Forge · Verification Pipeline
              </span>
            </div>
            <div className="relative aspect-[16/10] bg-[#0d0d18]">
              <Image
                src={images.pipeline}
                alt={images.pipelineAlt}
                fill
                unoptimized
                priority
                sizes="(max-width: 1024px) 90vw, 560px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14]/60 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
