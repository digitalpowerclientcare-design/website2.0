"use client";

import { useMemo, useState } from "react";
import { Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BLOG_CATEGORIES,
  BLOG_POSTS,
  type BlogCategory,
} from "@/lib/blogContent";

export function BlogExplorer() {
  const [category, setCategory] = useState<BlogCategory>("All");
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (category === "All") return BLOG_POSTS;
    return BLOG_POSTS.filter((p) => p.category === category);
  }, [category]);

  const activePost = useMemo(
    () => BLOG_POSTS.find((p) => p.id === activeId) ?? null,
    [activeId],
  );

  return (
    <>
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
            {filtered.map((post) => {
              const isActive = activeId === post.id;
              return (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => {
                    setActiveId(post.id);
                    requestAnimationFrame(() => {
                      document.getElementById("blog-reader")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    });
                  }}
                  className={cn(
                    "flex flex-col rounded-2xl border bg-[var(--surface)] p-6 text-left transition-all duration-200",
                    isActive
                      ? "border-[var(--indigo)] shadow-[0_12px_40px_rgba(83,58,253,0.12)]"
                      : "border-[var(--border)] hover:border-[var(--indigo)]/35 hover:shadow-[0_12px_40px_rgba(83,58,253,0.08)]",
                  )}
                >
                  <span className="mb-3 w-fit rounded-full bg-[var(--indigo-bg)] px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--indigo)] uppercase">
                    {post.category}
                  </span>
                  <h2 className="text-[18px] font-medium tracking-[-0.02em] text-[var(--ink)]">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[var(--ink-secondary)]">
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
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {activePost && (
        <section
          id="blog-reader"
          className="border-t border-[var(--border)] bg-[var(--surface)] py-20 md:py-24"
        >
          <div className="content-container max-w-3xl">
            <p className="eyebrow mb-3">{activePost.category}</p>
            <h2 className="heading-section">{activePost.title}</h2>
            <p className="mt-4 text-[14px] text-[var(--ink-muted)]">
              {activePost.author} · {activePost.publishedAt} · {activePost.readMinutes} min read
            </p>
            <div className="mt-10 space-y-8">
              {activePost.sections.map((section, i) => (
                <div key={i}>
                  {section.heading && (
                    <h3 className="text-[18px] font-medium tracking-[-0.01em] text-[var(--ink)]">
                      {section.heading}
                    </h3>
                  )}
                  <p
                    className={cn(
                      "text-[16px] leading-relaxed text-[var(--ink-secondary)]",
                      section.heading && "mt-3",
                    )}
                  >
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
