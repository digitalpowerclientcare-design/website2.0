"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { TextReveal } from "@/components/ui/TextReveal";

export function ProductsPreview() {
  return (
    <section className="section-padding bg-[var(--canvas)]">
      <div className="content-container">
        <p className="eyebrow mb-4">OUR PRODUCTS</p>
        <TextReveal as="h2" className="heading-section mb-12">
          AI Tools Built from the Engineering Floor
        </TextReveal>

        <div className="max-w-2xl">
          <motion.article
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="stripe-card overflow-hidden"
          >
            <div className="relative bg-gradient-to-br from-[#1c1e54] to-[#533afd] p-8 pb-32">
              <div className="rounded-xl border border-white/10 bg-[#0a0a14]/80 p-6 shadow-2xl backdrop-blur">
                <div className="mb-3 flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="space-y-2 font-mono text-xs text-indigo-200/90">
                  <p>forge verify --agent pipeline</p>
                  <p className="text-emerald-400">✓ 6 agents · server-side verified</p>
                  <p className="text-white/50">awaiting production gate...</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--indigo-bg)] px-3 py-1 text-xs font-medium text-[var(--ink-secondary)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--emerald)]" />
                Live · Private Beta
              </span>
              <h3 className="heading-card mb-3">FORGE AI</h3>
              <p className="body-base mb-4">
                AI-powered SDLC platform. Six verification agents. Server-side
                code generation your senior engineers trust.
              </p>
              <Link href="/forge-ai" className="btn-ghost">
                Learn more →
              </Link>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
