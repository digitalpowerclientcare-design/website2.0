"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, FileText, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PUBLICATION_CATEGORIES,
  PUBLICATIONS,
  type PublicationCategory,
} from "@/lib/publicationsContent";

export function PublicationsExplorer() {
  const [category, setCategory] = useState<PublicationCategory>("All");

  const filtered = useMemo(() => {
    if (category === "All") return PUBLICATIONS;
    return PUBLICATIONS.filter((p) => p.category === category);
  }, [category]);

  return (
    <section className="section-padding bg-white pt-12 md:pt-14">
      <div className="content-container">
        <div className="mb-10 flex flex-wrap gap-2">
          {PUBLICATION_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-[13px] font-medium transition-colors",
                category === cat
                  ? "bg-[var(--indigo)] text-white"
                  : "border border-[var(--border)] bg-white text-[var(--ink-secondary)] hover:border-[var(--indigo)]/40 hover:text-[var(--ink)]",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((publication) => (
            <PublicationCard key={publication.id} publication={publication} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PublicationCard({ publication }: { publication: (typeof PUBLICATIONS)[number] }) {
  return (
    <Link
      href={`/publications/${publication.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-left transition-all duration-200 hover:border-[var(--indigo)]/35 hover:shadow-[0_12px_40px_rgba(83,58,253,0.08)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--border)]">
        <Image
          src={publication.coverImage}
          alt={publication.coverImageAlt}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/50 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--indigo)] uppercase backdrop-blur-sm">
          {publication.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex w-fit items-center gap-1.5 text-[12px] font-medium text-[var(--ink-muted)]">
          <Lock size={14} aria-hidden />
          Request access
        </span>

        <h2 className="mt-3 text-[20px] font-medium tracking-[-0.02em] text-[var(--ink)] group-hover:text-[var(--indigo)]">
          {publication.title}
        </h2>
        <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[var(--ink-secondary)]">
          {publication.excerpt}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-[var(--border)] pt-4 text-[12px] text-[var(--ink-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <FileText size={14} aria-hidden />
            {publication.author}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} aria-hidden />
            {publication.readMinutes} min read
          </span>
          <span>{publication.publishedAt}</span>
        </div>
      </div>
    </Link>
  );
}
