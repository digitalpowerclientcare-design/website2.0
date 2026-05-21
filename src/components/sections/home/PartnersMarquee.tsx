"use client";

import Image from "next/image";

const PARTNERS = [
  { src: "/logos/perplexity.png", alt: "Perplexity" },
  { src: "/logos/jasper.png", alt: "Jasper" },
  { src: "/logos/google.png", alt: "Google" },
  { src: "/logos/defender.png", alt: "Microsoft Defender" },
  { src: "/logos/cursor.png", alt: "Cursor" },
  { src: "/logos/copilot.png", alt: "GitHub Copilot" },
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
              src={logo.src}
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
