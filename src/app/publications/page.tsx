import type { Metadata } from "next";
import Image from "next/image";
import { PublicationsExplorer } from "@/components/sections/publications/PublicationsExplorer";
import { PUBLICATIONS_INTRO } from "@/lib/publicationsContent";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "O3Xs research and insights on enterprise AI delivery, business process automation, and governed scale. Request access to read articles and receive full reports by email.",
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1456513089075-9d0f7c9c8f0e?auto=format&fit=crop&q=85&w=1920";

export default function PublicationsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--brand-dark)]">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            unoptimized
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/95 via-[#0a0a0f]/85 to-[#1c1e54]/80" />
        </div>
        <div className="content-container relative z-10 max-w-3xl py-24 md:py-32">
          <p className="eyebrow mb-4 text-[var(--indigo-soft)]">{PUBLICATIONS_INTRO.eyebrow}</p>
          <h1 className="heading-display text-white">{PUBLICATIONS_INTRO.title}</h1>
          <p className="body-lg mt-6 max-w-2xl text-white/75">{PUBLICATIONS_INTRO.description}</p>
        </div>
      </section>

      <PublicationsExplorer />
    </>
  );
}
