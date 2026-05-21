"use client";

type StripeMeshProps = {
  variant?: "hero-right" | "section" | "tile-warm" | "tile-purple" | "tile-cyan";
  className?: string;
};

const VARIANTS = {
  "hero-right": "stripe-mesh-hero-right",
  section: "stripe-mesh-section",
  "tile-warm": "stripe-mesh-tile-warm",
  "tile-purple": "stripe-mesh-tile-purple",
  "tile-cyan": "stripe-mesh-tile-cyan",
} as const;

/** Stripe-style flowing mesh gradients (CSS only — no header cross artifact) */
export function StripeMesh({
  variant = "section",
  className = "",
}: StripeMeshProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${VARIANTS[variant]} ${className}`}
      aria-hidden
    />
  );
}
