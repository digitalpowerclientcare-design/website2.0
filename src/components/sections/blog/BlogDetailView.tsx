import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import { TextRollButton } from "@/components/ui/TextRollButton";
import { cn } from "@/lib/utils";
import type { BlogPost, BlogSection } from "@/lib/blogContent";

type BlogDetailViewProps = {
  post: BlogPost;
};

function RichBody({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={cn(
        "blog-prose text-[16px] leading-relaxed text-[var(--ink-secondary)] [&_a]:font-medium [&_a]:text-[var(--indigo)] [&_a]:underline-offset-2 hover:[&_a]:underline [&_strong]:font-semibold [&_strong]:text-[var(--ink)]",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function SectionBlock({ section }: { section: BlogSection }) {
  return (
    <div className="space-y-5">
      {section.heading && (
        <h2 className="text-[22px] font-medium tracking-[-0.02em] text-[var(--ink)]">
          {section.heading}
        </h2>
      )}
      {section.body && (
        <RichBody html={section.body} className={section.heading ? undefined : undefined} />
      )}
      {section.list && (
        <ul className="space-y-2.5 border-l-2 border-[var(--indigo)]/30 pl-5">
          {section.list.map((item) => (
            <li
              key={item}
              className="text-[16px] leading-relaxed text-[var(--ink-secondary)]"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      {section.image && (
        <figure className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="relative aspect-[16/9]">
            <Image
              src={section.image.src}
              alt={section.image.alt}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
          <figcaption className="border-t border-[var(--border)] px-5 py-3 text-[13px] leading-relaxed text-[var(--ink-muted)]">
            {section.image.caption}
          </figcaption>
        </figure>
      )}
      {section.cta && (
        <aside className="rounded-2xl border border-[var(--indigo)]/25 bg-[var(--indigo-bg)] p-6 md:p-8">
          {section.cta.eyebrow && (
            <p className="eyebrow mb-2 text-[var(--indigo)]">{section.cta.eyebrow}</p>
          )}
          <h3 className="text-[18px] font-medium tracking-[-0.01em] text-[var(--ink)]">
            {section.cta.title}
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink-secondary)]">
            {section.cta.body}
          </p>
          <div className="mt-5">
            <TextRollButton href={section.cta.href} label={section.cta.label} variant="indigo" />
          </div>
        </aside>
      )}
    </div>
  );
}

export function BlogDetailView({ post }: BlogDetailViewProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seo.description,
    image: post.coverImage,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "O3Xs", url: "https://o3xs.com" },
    keywords: post.seo.keywords.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <section className="relative overflow-hidden bg-[var(--brand-dark)]">
          <div className="absolute inset-0" aria-hidden>
            <Image
              src={post.coverImage}
              alt=""
              fill
              unoptimized
              priority
              sizes="100vw"
              className="object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/75 to-[#1c1e54]/60" />
          </div>

          <div className="content-container relative z-10 py-10 md:py-14">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft size={16} aria-hidden />
              All articles
            </Link>

            <div className="mt-10 max-w-3xl">
              <span className="inline-flex rounded-full bg-[var(--indigo)]/20 px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--indigo-soft)] uppercase">
                {post.category}
              </span>
              <h1 className="heading-display mt-4 text-white">{post.title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
                {post.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-[13px] text-white/55">
                <span className="inline-flex items-center gap-1.5">
                  <User size={14} aria-hidden />
                  {post.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} aria-hidden />
                  {post.readMinutes} min read
                </span>
                <span>{post.publishedAt}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="content-container max-w-3xl">
            <div className="space-y-10">
              {post.sections.map((section, i) => (
                <SectionBlock key={i} section={section} />
              ))}
            </div>

            <footer className="mt-16 border-t border-[var(--border)] pt-10">
              <p className="text-[14px] text-[var(--ink-muted)]">
                Written by {post.author} · Published {post.publishedAt}
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/blog"
                  className="text-[14px] font-medium text-[var(--indigo)] hover:underline"
                >
                  ← Back to blog
                </Link>
                <Link
                  href="/publications"
                  className="text-[14px] font-medium text-[var(--ink-secondary)] hover:text-[var(--indigo)]"
                >
                  Research publications
                </Link>
                <Link
                  href="/contact"
                  className="text-[14px] font-medium text-[var(--ink-secondary)] hover:text-[var(--indigo)]"
                >
                  Contact us
                </Link>
              </div>
            </footer>
          </div>
        </section>
      </article>
    </>
  );
}
