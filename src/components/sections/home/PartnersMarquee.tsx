"use client";

import Image from "next/image";
import { assetPath } from "@/lib/assetPath";

type PartnerLogo = {
  kind: "logo";
  file: string;
  alt: string;
};

type PartnerName = {
  kind: "name";
  name: string;
  alt: string;
};

export type Partner = PartnerLogo | PartnerName;

/** Tool-agnostic ecosystem — AI platforms, cloud, DevOps, and enterprise integrations. */
export const PARTNERS: Partner[] = [
  { kind: "logo", file: "copilot.png", alt: "GitHub Copilot" },
  { kind: "logo", file: "cursor.png", alt: "Cursor" },
  { kind: "logo", file: "google.png", alt: "Google Cloud" },
  { kind: "logo", file: "defender.png", alt: "Microsoft" },
  { kind: "logo", file: "perplexity.png", alt: "Perplexity" },
  { kind: "logo", file: "jasper.png", alt: "Jasper" },
  { kind: "name", name: "GitHub", alt: "GitHub" },
  { kind: "name", name: "GitLab", alt: "GitLab" },
  { kind: "name", name: "Azure", alt: "Microsoft Azure" },
  { kind: "name", name: "AWS", alt: "Amazon Web Services" },
  { kind: "name", name: "Jira", alt: "Atlassian Jira" },
  { kind: "name", name: "Anthropic", alt: "Anthropic" },
  { kind: "name", name: "Azure DevOps", alt: "Azure DevOps" },
  { kind: "name", name: "ServiceNow", alt: "ServiceNow" },
];

function PartnerItem({ partner }: { partner: Partner }) {
  if (partner.kind === "logo") {
    return (
      <Image
        src={assetPath(`/logos/${partner.file}`)}
        alt={partner.alt}
        width={200}
        height={44}
        unoptimized
        className="partners-marquee__logo"
      />
    );
  }

  return (
    <span
      className="partners-marquee__name"
      aria-label={partner.alt}
      title={partner.alt}
    >
      {partner.name}
    </span>
  );
}

export function PartnersMarquee() {
  const items = [...PARTNERS, ...PARTNERS];

  return (
    <section
      id="partners"
      className="section-fade-top relative border-b border-[var(--border)] bg-[#FAFBFD] pt-20 pb-20"
    >
      <div className="content-container mb-12 flex flex-col items-center text-center">
        <p className="eyebrow mb-3">Our Partners & Integrations</p>
        <p className="max-w-2xl text-base leading-relaxed text-[var(--ink-secondary)] md:text-[17px]">
          <span className="font-medium text-[var(--ink)]">
            Tool-Agnostic. Outcome-Obsessed.
          </span>
          <span className="mx-2 text-[var(--ink-muted)]">|</span>
          We integrate with your stack — cloud, DevOps, AI, and enterprise
          platforms — without vendor lock-in.
        </p>
      </div>

      <div className="partners-marquee group relative w-full overflow-hidden">
        <div className="partners-marquee__track group-hover:[animation-play-state:paused]">
          {items.map((partner, i) => (
            <PartnerItem key={`${partner.alt}-${i}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
