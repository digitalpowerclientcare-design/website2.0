"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { assetPath } from "@/lib/assetPath";
import { motion } from "motion/react";
import { TextRollButton } from "@/components/ui/TextRollButton";

const SHOTS = [
  { src: assetPath("/forge/pipeline.png"), label: "Feature Pipeline" },
  { src: assetPath("/forge/agents.png"), label: "Agent Execution" },
  { src: assetPath("/forge/code-review.png"), label: "Verified Code Review" },
  { src: assetPath("/forge/compliance.png"), label: "SOC2 Compliance" },
] as const;

const LOGS = [
  "Agent A · Intake parsed",
  "Agent D · EDIT_TARGETS pass",
  "Agent F · Audit trail written",
  "Gate · Ready for production",
] as const;

export function ForgeShowcase() {
  const [shot, setShot] = useState(0);
  const [log, setLog] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setShot((s) => (s + 1) % SHOTS.length), 4500);
    const t2 = setInterval(() => setLog((l) => (l + 1) % LOGS.length), 2200);
    return () => {
      clearInterval(t1);
      clearInterval(t2);
    };
  }, []);

  return (
    <section className="section-padding relative overflow-hidden bg-[var(--ink)] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(83,58,253,0.5), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="content-container relative z-10">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium backdrop-blur-md">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--emerald)]" />
              Live · Private Beta
            </span>
            <h2 className="heading-display text-white">FORGE AI</h2>
            <p className="mt-4 max-w-xl text-lg text-white/70">
              The verification layer between AI code generation and production.
              Six agents. Server-side verified. SOC2-ready audit trail.
            </p>
          </div>
          <TextRollButton
            href="/forge-ai"
            label="Explore FORGE AI"
            variant="indigo"
            className="shrink-0"
          />
        </div>

        <div className="relative mx-auto max-w-5xl [perspective:1400px]">
          <motion.div
            className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.45)]"
            style={{ transform: "rotateX(6deg) rotateY(-6deg)" }}
            whileHover={{
              rotateX: 2,
              rotateY: -2,
              transition: { duration: 0.5 },
            }}
          >
            <div className="flex items-center gap-2 border-b border-white/10 bg-[#12141f] px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-red-400/80" />
              <span className="h-2 w-2 rounded-full bg-amber-400/80" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
              <span className="ml-2 font-mono text-[11px] text-white/50">
                forge — {SHOTS[shot].label}
              </span>
            </div>
            <div className="relative aspect-[16/9] bg-[#0a0a12]">
              {SHOTS.map((s, i) => (
                <Image
                  key={s.src}
                  src={s.src}
                  alt={s.label}
                  fill
                  unoptimized
                  className={`object-cover object-top transition-opacity duration-700 ${
                    i === shot ? "opacity-100" : "opacity-0"
                  }`}
                  sizes="100vw"
                />
              ))}
              <div className="absolute right-4 bottom-4 left-4 rounded-lg border border-emerald-500/20 bg-black/80 px-4 py-3 font-mono text-xs text-emerald-400/90 backdrop-blur-md">
                › {LOGS[log]}
              </div>
            </div>
          </motion.div>

          <div className="mt-6 flex justify-center gap-2">
            {SHOTS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`View screenshot ${i + 1}`}
                onClick={() => setShot(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === shot ? "w-8 bg-white" : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
