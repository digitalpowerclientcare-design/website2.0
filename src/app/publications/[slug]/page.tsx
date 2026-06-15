import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PublicationDetailView } from "@/components/sections/publications/PublicationDetailView";
import {
  PUBLICATIONS,
  getPublicationBySlug,
} from "@/lib/publicationsContent";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PUBLICATIONS.map((publication) => ({ slug: publication.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const publication = getPublicationBySlug(slug);
  if (!publication) return { title: "Publication not found" };

  return {
    title: publication.title,
    description: publication.excerpt,
  };
}

export default async function PublicationPage({ params }: PageProps) {
  const { slug } = await params;
  const publication = getPublicationBySlug(slug);
  if (!publication) notFound();

  return (
    <Suspense
      fallback={
        <div className="content-container py-32 text-center text-[var(--ink-muted)]">
          Loading…
        </div>
      }
    >
      <PublicationDetailView publication={publication} />
    </Suspense>
  );
}
