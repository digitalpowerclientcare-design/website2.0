"use client";

import type { CSSProperties } from "react";

const BRANDS: { name: string; style: CSSProperties }[] = [
  { name: "Enterprise Software", style: { fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: "-0.02em" } },
  { name: "Healthcare", style: { fontFamily: "system-ui", fontWeight: 600, letterSpacing: "0.02em" } },
  { name: "Legal Operations", style: { fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.08em", fontSize: "0.85rem", textTransform: "uppercase" } },
  { name: "Marketing", style: { fontFamily: "system-ui", fontWeight: 500, fontStyle: "italic" } },
  { name: "Financial Services", style: { fontFamily: "Georgia, serif", fontWeight: 400 } },
  { name: "Global Logistics", style: { fontFamily: "system-ui", fontWeight: 700, letterSpacing: "-0.03em" } },
  { name: "SaaS Platforms", style: { fontFamily: "system-ui", fontWeight: 600 } },
  { name: "Operations", style: { fontFamily: "ui-monospace, monospace", fontWeight: 500, letterSpacing: "0.12em", fontSize: "0.8rem", textTransform: "uppercase" } },
];

export function TrustedMarquee() {
  const items = [...BRANDS, ...BRANDS];

  return (
    <section
      id="trusted"
      className="relative overflow-hidden border-b border-[var(--border)] bg-white py-12"
    >
      <p className="content-container mb-6 text-center text-[11px] font-medium tracking-[0.2em] text-[var(--ink-muted)] uppercase">
        Trusted by teams in
      </p>
      <div className="marquee-mask relative w-full overflow-hidden">
        <div className="marquee-track marquee-track-fast">
          {items.map((brand, i) => (
            <span
              key={`${brand.name}-${i}`}
              className="mx-12 shrink-0 whitespace-nowrap text-[var(--ink-secondary)]/70"
              style={{ fontSize: "1.125rem", ...brand.style }}
            >
              {brand.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
