"use client";

import Image from "next/image";
import { assetPath } from "@/lib/assetPath";

const PARTNERS = [
  { file: "perplexity.png", alt: "Perplexity" },
  { file: "jasper.png", alt: "Jasper" },
  { file: "google.png", alt: "Google" },
  { file: "defender.png", alt: "Microsoft Defender" },
  { file: "cursor.png", alt: "Cursor" },
  { file: "copilot.png", alt: "GitHub Copilot" },
] as const;

export function PartnersMarquee() {
  const items = [...PARTNERS, ...PARTNERS];

  return (
    <section
      id="partners"
      className="section-fade-top relative border-b border-[var(--border)] bg-[#FAFBFD] pt-20 pb-20"
    >
      <div className="content-container mb-12 flex flex-col items-center text-center">
        <p className="eyebrow mb-3">Our Partners</p>
        <p className="max-w-2xl text-base leading-relaxed text-[var(--ink-secondary)] md:text-[17px]">
          <span className="font-medium text-[var(--ink)]">
            Tool-Agnostic. Outcome-Obsessed.
          </span>
          <span className="mx-2 text-[var(--ink-muted)]">|</span>
          We don&apos;t sell tools. We make them work — together.
        </p>
      </div>

      <div className="partners-marquee group relative w-full overflow-hidden">
        <div className="partners-marquee__track group-hover:[animation-play-state:paused]">
          {items.map((logo, i) => (
            <Image
              key={`${logo.alt}-${i}`}
              src={assetPath(`/logos/${logo.file}`)}
              alt={logo.alt}
              width={200}
              height={44}
              unoptimized
              className="partners-marquee__logo"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
