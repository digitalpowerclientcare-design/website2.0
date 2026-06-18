"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { EASE_OUT, FADE_UP_INITIAL, FADE_UP_ANIMATE, VIEWPORT_ONCE } from "@/lib/motion";

export function BetaAccessSection() {
  return (
    <section
      id="beta"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--brand-dark)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 30% 30%, rgba(83,58,253,0.35), transparent 60%), radial-gradient(ellipse 40% 35% at 80% 80%, rgba(168,85,247,0.25), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="content-container relative z-10 grid gap-12 md:grid-cols-2 md:items-center">
        <motion.div
          initial={FADE_UP_INITIAL}
          whileInView={FADE_UP_ANIMATE}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <p className="mb-3 text-[11px] font-medium tracking-[0.22em] text-white/60 uppercase">
            Ready to ship safely?
          </p>
          <h2 className="heading-display text-white">Request Forge AI Beta Access</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">
            Forge AI is in private Beta with select engineering teams. Share your
            stack on our contact form and we&apos;ll schedule a Technical Demo.
          </p>
        </motion.div>

        <motion.div
          initial={FADE_UP_INITIAL}
          whileInView={FADE_UP_ANIMATE}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
          className="flex flex-col items-start gap-4"
        >
          <Link
            href="/contact?interest=forge-beta"
            className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white py-3 pr-2 pl-7 text-[15px] font-medium text-[#0A0A14] transition-colors duration-300 hover:bg-white/90"
          >
            Request Forge AI Beta Access
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--indigo)] text-white transition-transform duration-500 group-hover:-rotate-45">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
          <p className="text-[12px] text-white/45">
            Opens the Forge AI Beta form — we&apos;ll only use your details for onboarding and demo scheduling.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
