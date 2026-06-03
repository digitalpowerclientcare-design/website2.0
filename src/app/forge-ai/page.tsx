import type { Metadata } from "next";
import Image from "next/image";
import { FileCheck, Server, Shield } from "lucide-react";
import { ForgeDarkHero } from "@/components/sections/forge/ForgeDarkHero";
import { ForgePipeline } from "@/components/sections/forge/ForgePipeline";
import { BetaAccessSection } from "@/components/sections/forge/BetaAccessSection";
import { StatsGrid } from "@/components/sections/shared/StatsGrid";
import { PAGE_IMAGES } from "@/lib/companyContent";

export const metadata: Metadata = {
  title: "Forge AI",
  description:
    "Forge is the verification layer between AI code generation and production. Six verification agents, server-side verified, SOC2-ready.",
};

const PROBLEMS = [
  {
    title: "Looks right. Isn't verified.",
    body: "AI code passes syntax checks but isn't verified against your actual codebase, architecture, or dependencies. Hallucinations reach production.",
    imageKey: "validation" as const,
  },
  {
    title: "No audit trail for compliance.",
    body: "Security reviews and SOC2 audits can't trace AI-generated code back to the prompts, models, or context that produced it. Compliance breaks down.",
    imageKey: "compliance" as const,
  },
  {
    title: "No verification gate.",
    body: "Most AI dev tools are autocomplete with a fancy UI. There's no structured verification between generation and merge — just hope and code review fatigue.",
    imageKey: "codeReview" as const,
  },
] as const;

const MOAT = [
  {
    Icon: Shield,
    title: "EDIT_TARGETS Technology",
    body: "Hallucination prevention baked into the generation layer. Not a filter applied after generation — a constraint that shapes what the model is allowed to output in the first place.",
  },
  {
    Icon: Server,
    title: "Server-Side Verification",
    body: "Code is verified against your actual repository in real-time — not against a generic model context or a snapshot from last week. Your codebase is the source of truth.",
  },
  {
    Icon: FileCheck,
    title: "SOC2 Audit Trail",
    body: "Every agent decision logged. Every output traceable. Every prompt archived. Compliance teams audit AI-generated code with the same rigor as human-written code.",
  },
] as const;

export default function ForgeAiPage() {
  const images = PAGE_IMAGES.forgeAi;

  return (
    <>
      <ForgeDarkHero />

      <section className="bg-white py-24 md:py-28">
        <div className="content-container mb-12 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">The problem</p>
            <h2 className="heading-section">
              Not another autocomplete. An SDLC layer.
            </h2>
            <p className="body-lg mt-4">
              AI is writing code in your repos right now. The question isn&apos;t
              whether to allow it — it&apos;s how to verify it.
            </p>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--border)] shadow-[0_16px_48px_rgba(28,30,84,0.08)] lg:aspect-[16/10]">
            <Image
              src={images.agents}
              alt={images.agentsAlt}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 640px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--indigo)]/15 to-transparent" />
          </div>
        </div>

        <div className="content-container grid gap-5 md:grid-cols-3">
          {PROBLEMS.map((p, i) => {
            const img = images[p.imageKey];
            const alt =
              p.imageKey === "validation"
                ? images.validationAlt
                : p.imageKey === "compliance"
                  ? images.complianceAlt
                  : images.codeReviewAlt;
            return (
              <article
                key={p.title}
                className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--indigo)]/30 hover:shadow-[0_16px_48px_rgba(83,58,253,0.08)]"
              >
                <div className="relative aspect-[16/10] border-b border-[var(--border)] bg-[#f4f6fb]">
                  <Image
                    src={img}
                    alt={alt}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-8">
                  <span className="font-stat mb-5 inline-block text-sm tracking-[0.08em] text-[var(--indigo)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-medium tracking-[-0.015em] text-[var(--ink)]">
                    {p.title}
                  </h3>
                  <p className="body-base mt-3">{p.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <ForgePipeline />

      <section className="bg-white py-24 md:py-28">
        <div className="content-container mb-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="relative order-2 aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--border)] shadow-[0_16px_48px_rgba(28,30,84,0.08)] lg:order-1">
            <Image
              src={images.compliance}
              alt={images.complianceAlt}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-dark)]/25 to-transparent" />
          </div>
          <div className="order-1 max-w-3xl lg:order-2">
            <p className="eyebrow mb-3">The moat</p>
            <h2 className="heading-section">
              What makes Forge impossible to replicate.
            </h2>
            <p className="body-lg mt-4">
              Verification is not a feature bolted onto generation — it is the
              product. Every layer is designed for enterprise auditability.
            </p>
          </div>
        </div>

        <div className="content-container grid gap-5 md:grid-cols-3">
          {MOAT.map((m) => (
            <article
              key={m.title}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--indigo)]/30 hover:shadow-[0_16px_48px_rgba(83,58,253,0.08)]"
            >
              <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--indigo-bg)] text-[var(--indigo)] transition-colors group-hover:bg-[var(--indigo)] group-hover:text-white">
                <m.Icon size={22} strokeWidth={1.75} />
              </span>
              <h3 className="text-xl font-medium tracking-[-0.015em] text-[var(--ink)]">
                {m.title}
              </h3>
              <p className="body-base mt-3">{m.body}</p>
            </article>
          ))}
        </div>
      </section>

      <StatsGrid
        background="surface"
        eyebrow="Engineering Outcomes"
        titleLineOne="Verified outputs."
        titleLineTwo="Auditable trails."
        body="Every metric below comes from Forge deployments — measured in production, signed off by engineering and security leads."
        linkLabel="Talk to engineering"
        linkHref="#beta"
      />

      <BetaAccessSection />
    </>
  );
}
