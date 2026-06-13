import type { Metadata } from "next";
import Image from "next/image";
import { BlogExplorer } from "@/components/sections/blog/BlogExplorer";
import { BLOG_INTRO } from "@/lib/blogContent";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "O3Xs blog — in-depth guides on enterprise AI, agentic workflows, verified software delivery, and business process automation for CIOs and engineering leaders.",
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=85&w=1920";

export default function BlogPage() {
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
          <p className="eyebrow mb-4 text-[var(--indigo-soft)]">{BLOG_INTRO.eyebrow}</p>
          <h1 className="heading-display text-white">{BLOG_INTRO.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{BLOG_INTRO.description}</p>
        </div>
      </section>

      <BlogExplorer />
    </>
  );
}
