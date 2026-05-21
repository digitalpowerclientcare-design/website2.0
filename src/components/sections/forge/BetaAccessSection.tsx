"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function BetaAccessSection() {
  return (
    <section
      id="beta"
      className="relative overflow-hidden py-24 md:py-28"
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 text-[11px] font-medium tracking-[0.22em] text-white/60 uppercase">
            Ready to ship safely?
          </p>
          <h2 className="heading-display text-white">Request beta access.</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">
            FORGE is in private beta with select engineering teams. Tell us
            about your stack and we&apos;ll schedule a technical demo.
          </p>
        </motion.div>

        <motion.form
          action="#"
          method="post"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="sr-only">Work Email</span>
              <input
                type="email"
                name="email"
                required
                placeholder="Work email"
                className="w-full rounded-full border border-white/15 bg-white/[0.05] px-6 py-3.5 text-[15px] text-white placeholder:text-white/50 transition-colors duration-200 focus:border-[#818CF8] focus:bg-white/[0.08] focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="sr-only">Company Name</span>
              <input
                type="text"
                name="company"
                required
                placeholder="Company name"
                className="w-full rounded-full border border-white/15 bg-white/[0.05] px-6 py-3.5 text-[15px] text-white placeholder:text-white/50 transition-colors duration-200 focus:border-[#818CF8] focus:bg-white/[0.08] focus:outline-none"
              />
            </label>
          </div>

          <button
            type="submit"
            className="group inline-flex items-center gap-2 rounded-full bg-white py-3 pr-2 pl-7 text-[15px] font-medium text-[#0A0A14] transition-colors duration-300 hover:bg-white/90"
          >
            Request Access
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--indigo)] text-white transition-transform duration-500 group-hover:-rotate-45">
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>

          <p className="text-[12px] text-white/45">
            We&apos;ll only use your details to schedule a technical demo.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
