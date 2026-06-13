"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, FileText, Lock, Mail } from "lucide-react";
import {
  getStoredPublicationAccess,
  storePublicationAccess,
  type Publication,
} from "@/lib/publicationsContent";
import { PublicationAccessModal } from "./PublicationAccessModal";

type PublicationDetailViewProps = {
  publication: Publication;
};

export function PublicationDetailView({ publication }: PublicationDetailViewProps) {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [successEmail, setSuccessEmail] = useState<string | null>(null);

  useEffect(() => {
    setUnlocked(getStoredPublicationAccess().includes(publication.id));
  }, [publication.id]);

  const openModal = useCallback(() => {
    setSuccessEmail(null);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSuccessEmail(null);
  }, []);

  const handleSuccessClose = useCallback(() => {
    setModalOpen(false);
    setSuccessEmail(null);
    router.push("/publications");
  }, [router]);

  const handleSubmit = (data: {
    name: string;
    email: string;
    company: string;
    role: string;
  }) => {
    if (!data.name || !data.email || !data.company) return;

    storePublicationAccess(publication.id);
    setUnlocked(true);
    setSuccessEmail(data.email);

    // Hook for future API / Formspree / CRM — payload available here
    void data;
  };

  const previewSection = publication.sections[0];

  return (
    <>
      <article>
        <section className="relative overflow-hidden bg-[var(--brand-dark)]">
          <div className="absolute inset-0" aria-hidden>
            <Image
              src={publication.coverImage}
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
              href="/publications"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft size={16} aria-hidden />
              All publications
            </Link>

            <div className="mt-10 max-w-3xl">
              <span className="inline-flex rounded-full bg-[var(--indigo)]/20 px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--indigo-soft)] uppercase">
                {publication.category}
              </span>
              <h1 className="heading-display mt-4 text-white">{publication.title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
                {publication.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-[13px] text-white/55">
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
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="content-container max-w-3xl">
            {previewSection && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10">
                {previewSection.heading && (
                  <h2 className="text-[20px] font-medium tracking-[-0.02em] text-[var(--ink)]">
                    {previewSection.heading}
                  </h2>
                )}
                <p
                  className={
                    previewSection.heading
                      ? "mt-4 text-[16px] leading-relaxed text-[var(--ink-secondary)]"
                      : "text-[16px] leading-relaxed text-[var(--ink-secondary)]"
                  }
                >
                  {previewSection.body}
                </p>
              </div>
            )}

            {unlocked ? (
              <div className="mt-10 space-y-8">
                {publication.sections.slice(1).map((section, i) => (
                  <div key={i}>
                    {section.heading && (
                      <h3 className="text-[18px] font-medium tracking-[-0.01em] text-[var(--ink)]">
                        {section.heading}
                      </h3>
                    )}
                    <p
                      className={
                        section.heading
                          ? "mt-3 text-[16px] leading-relaxed text-[var(--ink-secondary)]"
                          : "text-[16px] leading-relaxed text-[var(--ink-secondary)]"
                      }
                    >
                      {section.body}
                    </p>
                  </div>
                ))}

                <div className="flex items-start gap-4 rounded-2xl border border-[var(--indigo)]/25 bg-[var(--indigo-bg)] px-6 py-5">
                  <Mail size={20} className="mt-0.5 shrink-0 text-[var(--indigo)]" aria-hidden />
                  <p className="text-[14px] leading-relaxed text-[var(--ink-secondary)]">
                    <span className="font-medium text-[var(--ink)]">Full report: </span>
                    {publication.reportTitle} — delivered to the email you provided.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8 text-center md:p-10">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--indigo-bg)] text-[var(--indigo)]">
                  <Lock size={20} aria-hidden />
                </div>
                <h2 className="mt-5 text-[20px] font-medium tracking-[-0.02em] text-[var(--ink)]">
                  Continue reading
                </h2>
                <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[var(--ink-secondary)]">
                  Request access to read the full article on-site. We&apos;ll also email you the
                  complete report for your records.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={openModal}
                    className="inline-flex items-center justify-center rounded-full bg-[var(--indigo)] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--indigo-deep)]"
                  >
                    Get full article &amp; report
                  </button>
                  <Link
                    href="/publications"
                    className="text-[14px] font-medium text-[var(--ink-secondary)] transition-colors hover:text-[var(--indigo)]"
                  >
                    Back to publications
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </article>

      <PublicationAccessModal
        publication={publication}
        open={modalOpen}
        successEmail={successEmail}
        onClose={successEmail ? handleSuccessClose : closeModal}
        onSubmit={handleSubmit}
      />
    </>
  );
}
