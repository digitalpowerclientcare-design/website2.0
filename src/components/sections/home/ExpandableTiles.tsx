"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { Check, Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { assetPath } from "@/lib/assetPath";
import { TextRollButton } from "@/components/ui/TextRollButton";
import { StripeMesh } from "./StripeMesh";

type TileId = "consulting" | "forge";

const TILES: {
  id: TileId;
  title: string;
  summary: string;
  mesh: "tile-warm" | "tile-purple";
  cta: { href: string; label: string };
  bullets: string[];
  panels: { title: string; stat?: string; caption?: string; image?: string; mesh: "tile-warm" | "tile-purple" | "tile-cyan" }[];
}[] = [
  {
    id: "consulting",
    title: "Embed intelligence into enterprise operations.",
    summary:
      "We diagnose where you're losing money, implement AI to stop it, and operate until results compound — measured in dollars, not decks.",
    mesh: "tile-warm",
    cta: { href: "/consulting", label: "Explore Consulting" },
    bullets: [
      "Performance Diagnostic included",
      "ROI-linked commercial models",
      "Cross-industry playbooks",
      "Tool-agnostic execution",
    ],
    panels: [
      {
        title: "Quantified leakage analysis",
        stat: "60%",
        caption: "average cycle-time reduction across engagements",
        mesh: "tile-warm",
      },
      {
        title: "Operations dashboard",
        caption: "Live metrics tied to business outcomes",
        image: "/forge/pipeline.png",
        mesh: "tile-cyan",
      },
    ],
  },
  {
    id: "forge",
    title: "Verification between AI generation and production.",
    summary:
      "FORGE AI runs six agents against your real codebase — server-side verified, SOC2-ready audit trail, senior-engineer-level review.",
    mesh: "tile-purple",
    cta: { href: "/forge-ai", label: "Explore FORGE AI" },
    bullets: [
      "EDIT_TARGETS hallucination prevention",
      "Server-side codebase verification",
      "SOC2-compliant audit trail",
      "Private beta — request access",
    ],
    panels: [
      {
        title: "Agent execution pipeline",
        caption: "Six agents. One verified output.",
        image: "/forge/agents.png",
        mesh: "tile-purple",
      },
      {
        title: "Authorization boost",
        stat: "45%",
        caption: "fewer security issues vs. unverified AI code",
        mesh: "tile-warm",
      },
    ],
  },
];

function TilePreview({
  tile,
  onToggle,
}: {
  tile: (typeof TILES)[number];
  onToggle: () => void;
}) {
  return (
    <motion.button
      type="button"
      layout="position"
      onClick={onToggle}
      className={cn(
        "group relative flex w-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white text-left shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_8px_32px_rgba(83,58,253,0.1)]",
        "min-h-[340px] md:min-h-[400px]",
      )}
    >
      <StripeMesh variant={tile.mesh} className="opacity-90" />

      <div className="relative z-10 flex flex-1 flex-col p-8 md:p-10">
        <div className="mb-auto flex justify-end">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--indigo)] text-white transition-transform duration-300 group-hover:scale-105">
            <Maximize2 size={16} />
          </span>
        </div>

        <div className="relative mt-16 min-h-[140px] md:min-h-[180px]">
          {tile.id === "forge" && (
            <div className="absolute right-0 bottom-0 w-[72%] overflow-hidden rounded-xl border border-white/50 shadow-xl">
              <div className="relative aspect-[16/11] bg-[#0a0a12]">
                <Image
                  src={assetPath("/forge/validation.png")}
                  alt=""
                  fill
                  className="object-cover object-top"
                  unoptimized
                  sizes="400px"
                />
              </div>
            </div>
          )}
          {tile.id === "consulting" && (
            <div className="absolute right-4 bottom-0 left-4 rounded-xl border border-white/60 bg-white/80 p-4 shadow-lg backdrop-blur-md">
              <p className="font-stat text-3xl text-[var(--indigo)]">ROI</p>
              <p className="text-sm text-[var(--ink-secondary)]">
                Ranked improvement roadmap
              </p>
            </div>
          )}
        </div>

        <h3 className="relative z-10 mt-8 max-w-md text-2xl font-medium tracking-tight text-[var(--ink)] md:text-[1.65rem]">
          {tile.title}
        </h3>
      </div>
    </motion.button>
  );
}

function TileExpanded({
  tile,
  onClose,
}: {
  tile: (typeof TILES)[number];
  onClose: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_24px_64px_rgba(28,30,84,0.12)]"
    >
      <StripeMesh variant={tile.mesh} className="opacity-40" />

      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-white/90 text-[var(--ink)] backdrop-blur-md transition-colors hover:border-[var(--indigo)] hover:text-[var(--indigo)]"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      <div className="relative z-10 grid gap-10 p-8 md:grid-cols-[1fr_0.9fr] md:gap-12 md:p-12">
        <div>
          <h3 className="heading-section mb-4 max-w-lg">{tile.title}</h3>
          <p className="body-lg mb-8 max-w-lg">{tile.summary}</p>
          <div className="mb-8 flex flex-wrap gap-3">
            <TextRollButton href={tile.cta.href} label={tile.cta.label} variant="indigo" />
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-[var(--indigo)] px-5 py-2.5 text-sm font-medium text-[var(--indigo)] transition-colors hover:bg-[var(--indigo-bg)]"
            >
              Book a consultation
            </Link>
          </div>
          <ul className="space-y-3">
            {tile.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-[15px] text-[var(--ink-secondary)]"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ff5a1f]/15 text-[#e05a1a]">
                  <Check size={12} strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:block" />
      </div>

      <div className="relative z-10 grid gap-4 border-t border-[var(--border)] bg-[var(--surface)]/50 p-6 md:grid-cols-2 md:p-8">
        {tile.panels.map((panel) => (
          <div
            key={panel.title}
            className="relative min-h-[220px] overflow-hidden rounded-xl border border-[var(--border)] bg-white"
          >
            <StripeMesh variant={panel.mesh} className="opacity-100" />
            <div className="relative z-10 flex h-full flex-col justify-between p-6">
              {panel.stat ? (
                <>
                  <p className="font-stat text-5xl text-[#e05a1a]">{panel.stat}</p>
                  <div>
                    <p className="font-medium text-[var(--ink)]">{panel.title}</p>
                    <p className="mt-1 text-sm text-[var(--ink-secondary)]">
                      {panel.caption}
                    </p>
                  </div>
                </>
              ) : panel.image ? (
                <>
                  <p className="mb-3 font-medium text-[var(--ink)]">{panel.title}</p>
                  <div className="relative mt-auto aspect-[16/10] overflow-hidden rounded-lg border border-white/40 shadow-md">
                    <Image
                      src={panel.image}
                      alt=""
                      fill
                      className="object-cover object-top"
                      unoptimized
                      sizes="400px"
                    />
                  </div>
                  {panel.caption && (
                    <p className="mt-2 text-xs text-[var(--ink-muted)]">{panel.caption}</p>
                  )}
                </>
              ) : (
                <p className="font-medium">{panel.title}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function ExpandableTiles() {
  const [active, setActive] = useState<TileId | null>(null);

  return (
    <section className="section-padding relative overflow-hidden bg-[var(--canvas)]">
      <StripeMesh variant="section" className="opacity-50" />

      <div className="content-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-14"
        >
          <p className="eyebrow mb-3">What we deliver</p>
          <h2 className="heading-section max-w-2xl">
            AI engineering and verification — built for enterprise scale.
          </h2>
        </motion.div>

        <LayoutGroup>
          <LayoutGroupWrapper active={active} setActive={setActive} />
        </LayoutGroup>
      </div>
    </section>
  );
}

function LayoutGroupWrapper({
  active,
  setActive,
}: {
  active: TileId | null;
  setActive: (id: TileId | null) => void;
}) {
  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="popLayout">
        {active ? (
          <TileExpanded
            key="expanded"
            tile={TILES.find((t) => t.id === active)!}
            onClose={() => setActive(null)}
          />
        ) : (
          <motion.div
            key="grid"
            layout
            className="grid gap-4 md:grid-cols-2 md:gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {TILES.map((tile) => (
              <TilePreview
                key={tile.id}
                tile={tile}
                onToggle={() => setActive(tile.id)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
