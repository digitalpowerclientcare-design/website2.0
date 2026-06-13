"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BLOG_CATEGORIES,
  BLOG_POSTS,
  type BlogCategory,
} from "@/lib/blogContent";

export function BlogExplorer() {
  const [category, setCategory] = useState<BlogCategory>("All");

  const filtered = useMemo(() => {
    if (category === "All") return BLOG_POSTS;
    return BLOG_POSTS.filter((p) => p.category === category);
  }, [category]);

  return (
    <section className="section-padding bg-white pt-12 md:pt-14">
      <div className="content-container">
        <div className="mb-10 flex flex-wrap gap-2">
          {BLOG_CATEGORIES.map((cat) => (
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-left transition-all duration-200 hover:border-[var(--indigo)]/35 hover:shadow-[0_12px_40px_rgba(83,58,253,0.08)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--border)]">
                <Image
                  src={post.coverImage}
                  alt={post.coverImageAlt}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/45 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--indigo)] uppercase backdrop-blur-sm">
                  {post.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-[18px] font-medium tracking-[-0.02em] text-[var(--ink)] group-hover:text-[var(--indigo)]">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[var(--ink-secondary)] line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-[var(--border)] pt-4 text-[12px] text-[var(--ink-muted)]">
                  <span className="inline-flex items-center gap-1.5">
                    <User size={14} aria-hidden />
                    {post.author}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} aria-hidden />
                    {post.readMinutes} min
                  </span>
                  <span>{post.publishedAt}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
