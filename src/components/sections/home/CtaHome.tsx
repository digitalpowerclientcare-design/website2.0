"use client";

import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { CONSULTATION_CTA_IMAGE } from "@/lib/homeContent";

export function CtaHome() {
  return (
    <CtaBanner
      eyebrow="Start with a diagnostic"
      title="Book a consultation."
      subtitle="A structured session to map where AI-led business process automation can recover value — with a Performance Diagnostic Report and implementation plan included."
      ctaLabel="Book a Consultation"
      ctaHref="/contact"
      image={CONSULTATION_CTA_IMAGE}
      imageAlt="Senior executives in a consultation session reviewing business performance"
    />
  );
}
