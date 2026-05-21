"use client";

const PARTNERS = [
  { src: "https://o3xs.com/wp-content/uploads/2026/01/perplexity.png", alt: "Perplexity" },
  { src: "https://o3xs.com/wp-content/uploads/2026/01/jasper.png", alt: "Jasper" },
  { src: "https://o3xs.com/wp-content/uploads/2026/01/google-1.png", alt: "Google" },
  { src: "https://o3xs.com/wp-content/uploads/2026/01/defender.png", alt: "Microsoft Defender" },
  { src: "https://o3xs.com/wp-content/uploads/2026/01/cursor.png", alt: "Cursor" },
  { src: "https://o3xs.com/wp-content/uploads/2026/01/copilot.png", alt: "GitHub Copilot" },
] as const;

export function PartnersMarquee() {
  // Two copies side by side for a seamless 0% → -50% loop.
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
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${logo.alt}-${i}`}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              decoding="async"
              className="partners-marquee__logo"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
