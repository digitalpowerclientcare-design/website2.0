import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";

type CtaBannerProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  whiteButton?: boolean;
};

export function CtaBanner({
  title = "Book a 60-Minute Consultation.",
  subtitle = "Get a written Performance Diagnostic Report identifying where you're losing money — with quantified impact and prioritized fixes.",
  ctaLabel = "Start Your Diagnostic →",
  ctaHref = "/contact",
  whiteButton = true,
}: CtaBannerProps) {
  return (
    <section className="section-padding bg-[var(--brand-dark)] text-white">
      <div className="content-container flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <TextReveal as="h2" className="heading-section mb-4 text-white">
            {title}
          </TextReveal>
          <p className="text-lg leading-relaxed text-white/75">{subtitle}</p>
        </div>
        <MagneticButton
          href={ctaHref}
          variant={whiteButton ? "white" : "indigo"}
        >
          {ctaLabel}
        </MagneticButton>
      </div>
    </section>
  );
}
