"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Clock, FileText, Lock } from "lucide-react";
import {
  PUBLICATION_ACCESS_COPY,
  PUBLICATION_ACCESS_PARAM,
  type Publication,
} from "@/lib/publicationsContent";
import {
  generatePublicationAccessToken,
  getPublicationAccessGrant,
  storePublicationAccessGrant,
  validatePublicationAccessToken,
} from "@/lib/publicationAccess";
import { submitToWeb3Forms } from "@/lib/web3forms";
import { PublicationAccessModal } from "./PublicationAccessModal";
import { PublicationReportViewer } from "./PublicationReportViewer";

type PublicationDetailViewProps = {
  publication: Publication;
};

export function PublicationDetailView({ publication }: PublicationDetailViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reportRef = useRef<HTMLDivElement>(null);
  const scrollToReportRef = useRef(false);

  const [unlocked, setUnlocked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const accessTokenFromUrl = searchParams.get(PUBLICATION_ACCESS_PARAM);

  const syncAccessUrl = useCallback(
    (token: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(PUBLICATION_ACCESS_PARAM, token);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const clearAccessUrl = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(PUBLICATION_ACCESS_PARAM);
    const query = params.toString();
    router.replace(query ? `?${query}` : "?", { scroll: false });
  }, [router, searchParams]);

  useEffect(() => {
    const tokenFromUrl = searchParams.get(PUBLICATION_ACCESS_PARAM);
    const grant = getPublicationAccessGrant(publication.id);

    if (tokenFromUrl) {
      if (validatePublicationAccessToken(publication.id, tokenFromUrl)) {
        setUnlocked(true);
        setInvalidLink(false);
      } else {
        setUnlocked(false);
        setInvalidLink(true);
      }
    } else if (grant) {
      setUnlocked(true);
      setInvalidLink(false);
      syncAccessUrl(grant.token);
    } else {
      setUnlocked(false);
      setInvalidLink(false);
    }

    setHydrated(true);
  }, [publication.id, searchParams, syncAccessUrl]);

  useEffect(() => {
    if (!unlocked || !hydrated || !scrollToReportRef.current) return;
    scrollToReportRef.current = false;
    requestAnimationFrame(() => {
      reportRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [unlocked, hydrated]);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleSubmit = async (data: {
    name: string;
    email: string;
    company: string;
    role: string;
    botcheck?: string;
  }) => {
    if (!data.name || !data.email || !data.company) return;

    setSubmitting(true);

    const token = generatePublicationAccessToken();
    storePublicationAccessGrant(publication.id, token);

    const result = await submitToWeb3Forms({
      subject: "New O3Xs Publication Access Request",
      form_type: "publication_access",
      source_page: "Publications",
      botcheck: data.botcheck,
      fields: {
        name: data.name,
        email: data.email,
        company: data.company,
        role: data.role,
        publication_id: publication.id,
        publication_title: publication.title,
        report_title: publication.reportTitle,
        access_token: token,
      },
    });

    if (!result.ok) {
      console.warn(
        "[Web3Forms] Publication access email failed:",
        result.message,
      );
    }

    setUnlocked(true);
    setInvalidLink(false);
    setModalOpen(false);
    setSubmitting(false);
    scrollToReportRef.current = true;
    syncAccessUrl(token);
  };

  const previewSection = publication.sections[0];
  const showLockedState = hydrated && !unlocked;

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
              <div ref={reportRef} className="mt-10 space-y-8">
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

                {publication.reportPdf && (
                  <PublicationReportViewer
                    title={publication.reportTitle}
                    pdfPath={publication.reportPdf}
                  />
                )}
              </div>
            ) : showLockedState ? (
              <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8 text-center md:p-10">
                {invalidLink && accessTokenFromUrl && (
                  <div className="mx-auto mb-6 max-w-md rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-[13px] leading-relaxed text-amber-900">
                    <p className="font-medium">
                      {PUBLICATION_ACCESS_COPY.invalidLinkTitle}
                    </p>
                    <p className="mt-1">{PUBLICATION_ACCESS_COPY.invalidLinkBody}</p>
                    <button
                      type="button"
                      onClick={clearAccessUrl}
                      className="mt-2 text-[12px] font-medium text-amber-800 underline underline-offset-2 hover:text-amber-950"
                    >
                      Clear invalid link
                    </button>
                  </div>
                )}

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--indigo-bg)] text-[var(--indigo)]">
                  <Lock size={20} aria-hidden />
                </div>
                <h2 className="mt-5 text-[20px] font-medium tracking-[-0.02em] text-[var(--ink)]">
                  Continue reading
                </h2>
                <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[var(--ink-secondary)]">
                  Request access to read the full article and executive report on this
                  page. Your private link works on this device only — sharing it will
                  not unlock the report elsewhere.
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
            ) : null}
          </div>
        </section>
      </article>

      <PublicationAccessModal
        publication={publication}
        open={modalOpen}
        submitting={submitting}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </>
  );
}
