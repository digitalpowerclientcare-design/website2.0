"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Activity,
  ArrowRight,
  Code2,
  Headphones,
  Layers,
  Scale,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Tile = {
  industry: string;
  Icon: LucideIcon;
  stat: string;
  body: string;
  tags: string[];
};

const TILES: Tile[] = [
  {
    industry: "Software & SDLC",
    Icon: Code2,
    stat: "60% faster cycles",
    body: "AI-assisted development pipelines that ship verified code, not autocomplete suggestions. SOC2-ready audit trails.",
    tags: ["SDLC", "Verification", "Compliance"],
  },
  {
    industry: "Healthcare Operations",
    Icon: Activity,
    stat: "45% lower costs",
    body: "Patient-context-aware automation that reduced support burden while improving care experience. HIPAA-aligned by design.",
    tags: ["Patient Care", "Compliance", "Automation"],
  },
  {
    industry: "Legal Services",
    Icon: Scale,
    stat: "40+ hrs / lawyer / wk",
    body: "Document analysis that gave senior attorneys back routine review time. Auditable, explainable AI outputs.",
    tags: ["Document AI", "Review", "Compliance"],
  },
  {
    industry: "Marketing Operations",
    Icon: TrendingUp,
    stat: "55% less waste",
    body: "Budget orchestration that aligned spend with pipeline conversion. Real-time attribution, not lagging dashboards.",
    tags: ["Attribution", "Orchestration", "Pipeline"],
  },
  {
    industry: "Customer Experience",
    Icon: Headphones,
    stat: "45% support cost cut",
    body: "AI-enabled care routing and contextual response generation. Quality up, cost down — measured, not promised.",
    tags: ["CX", "Routing", "Quality"],
  },
  {
    industry: "Enterprise Operations",
    Icon: Layers,
    stat: "Process intel at scale",
    body: "AI-augmented workflow intelligence that compounds institutional knowledge. Operating models, not one-off projects.",
    tags: ["Workflow", "Intelligence", "Compounding"],
  },
];

const TILE_WIDTH = 460;
const TILE_HEIGHT = 560;
const TILE_GAP = 32;
const TRACK_PADDING = 48;

function TileCard({ tile }: { tile: Tile }) {
  return (
    <article
      className="industries-tile group/tile"
      style={{ width: TILE_WIDTH, height: TILE_HEIGHT }}
    >
      <div className="flex items-start justify-between">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--indigo-bg)] text-[var(--indigo)] transition-colors group-hover/tile:bg-[var(--indigo)] group-hover/tile:text-white">
          <tile.Icon size={24} strokeWidth={1.75} />
        </span>
      </div>

      <p className="mt-10 text-[11px] font-medium tracking-[0.18em] text-[var(--ink-muted)] uppercase">
        {tile.industry}
      </p>
      <h3 className="mt-2 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-[var(--ink)]">
        {tile.stat}
      </h3>
      <p className="mt-5 text-[15px] leading-relaxed text-[var(--ink-secondary)]">
        {tile.body}
      </p>

      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        {tile.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-[11px] font-medium text-[var(--ink-secondary)]"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}

export function HorizontalIndustries() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const tid = window.setTimeout(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
          const pin = pinRef.current;
          const track = trackRef.current;
          if (!pin || !track) return;

          const getDistance = () =>
            Math.max(0, track.scrollWidth - pin.offsetWidth);

          const tw = gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: () => `+=${getDistance()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                const p = self.progress;
                if (progressRef.current) {
                  progressRef.current.style.width = `${p * 100}%`;
                }
                if (counterRef.current) {
                  const idx = Math.min(
                    TILES.length,
                    Math.max(1, Math.floor(p * TILES.length) + 1),
                  );
                  counterRef.current.textContent = `${String(idx).padStart(
                    2,
                    "0",
                  )} / ${String(TILES.length).padStart(2, "0")}`;
                }
                if (hintRef.current) {
                  hintRef.current.style.opacity = p > 0.05 ? "0" : "1";
                }
              },
            },
          });

          ScrollTrigger.refresh();

          return () => {
            tw.scrollTrigger?.kill();
            tw.kill();
          };
        });

        // Recompute on resize / font load.
        const handleRefresh = () => ScrollTrigger.refresh();
        const ro = new ResizeObserver(handleRefresh);
        if (trackRef.current) ro.observe(trackRef.current);
        window.addEventListener("resize", handleRefresh);
        if (document.fonts && "ready" in document.fonts) {
          document.fonts.ready.then(handleRefresh).catch(() => {});
        }

        return () => {
          ro.disconnect();
          window.removeEventListener("resize", handleRefresh);
          mm.revert();
        };
      }, 100);

      return () => window.clearTimeout(tid);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white">
      {/* Header — scrolls normally before pin engages */}
      <div className="content-container max-w-6xl py-24">
        <p className="eyebrow mb-3">Across Industries</p>
        <h2 className="heading-section mb-3 max-w-3xl">
          Engineered for every operations-heavy domain.
        </h2>
        <p className="body-lg max-w-2xl">
          We&apos;ve shipped AI systems across regulated and ops-heavy
          industries. Every engagement compounds our playbooks.
        </p>
        <div
          ref={hintRef}
          className="mt-6 hidden items-center gap-2 text-sm font-medium text-[var(--indigo)]/70 transition-opacity duration-300 md:inline-flex"
        >
          Scroll to explore
          <ArrowRight size={16} />
        </div>
      </div>

      {/* Desktop — pinned horizontal scroll */}
      <div
        ref={pinRef}
        className="relative hidden h-screen w-full overflow-hidden md:block"
      >
        <div
          ref={trackRef}
          className="flex h-full items-center"
          style={{
            width: "max-content",
            paddingLeft: TRACK_PADDING,
            paddingRight: TRACK_PADDING,
            gap: TILE_GAP,
            willChange: "transform",
          }}
        >
          {TILES.map((tile) => (
            <TileCard key={tile.industry} tile={tile} />
          ))}
        </div>

        {/* Progress indicator */}
        <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="relative h-[2px] w-[240px] overflow-hidden rounded-full bg-[rgba(83,58,253,0.15)]">
            <div
              ref={progressRef}
              className="absolute inset-y-0 left-0 w-0 rounded-full bg-[var(--indigo)]"
            />
          </div>
        </div>

        {/* Tile counter */}
        <span
          ref={counterRef}
          className="font-stat absolute right-12 bottom-8 text-sm tracking-[0.08em] text-[var(--ink-muted)]"
        >
          01 / 06
        </span>
      </div>

      {/* Mobile — native horizontal scroll with snap */}
      <div className="block pb-16 md:hidden">
        <div
          className="no-scrollbar flex w-full overflow-x-auto"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div className="shrink-0" style={{ width: 24 }} aria-hidden />
          {TILES.map((tile, i) => (
            <div
              key={tile.industry}
              className="shrink-0"
              style={{
                marginRight: i === TILES.length - 1 ? 24 : 16,
                scrollSnapAlign: "start",
              }}
            >
              <TileCard tile={tile} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
