"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Clock, FileText, Lock, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PUBLICATION_CATEGORIES,
  PUBLICATIONS,
  getStoredPublicationAccess,
  storePublicationAccess,
  type Publication,
  type PublicationCategory,
} from "@/lib/publicationsContent";
import { submitToWeb3Forms } from "@/lib/web3forms";
import { PublicationAccessModal } from "./PublicationAccessModal";

export function PublicationsExplorer() {
  const [category, setCategory] = useState<PublicationCategory>("All");
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [modalPublication, setModalPublication] = useState<Publication | null>(null);
  const [successEmail, setSuccessEmail] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setUnlockedIds(getStoredPublicationAccess());
  }, []);

  const filtered = useMemo(() => {
    if (category === "All") return PUBLICATIONS;
    return PUBLICATIONS.filter((p) => p.category === category);
  }, [category]);

  const activePublication = useMemo(
    () => PUBLICATIONS.find((p) => p.id === activeId) ?? null,
    [activeId],
  );

  const openAccess = useCallback((publication: Publication) => {
    setModalPublication(publication);
    setSuccessEmail(null);
  }, []);

  const closeModal = useCallback(() => {
    setModalPublication(null);
    setSuccessEmail(null);
  }, []);

  const handleCardClick = (publication: Publication) => {
    const unlocked = unlockedIds.includes(publication.id);
    if (unlocked) {
      setActiveId(publication.id);
      document.getElementById("publication-reader")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    openAccess(publication);
  };

  const handleSubmit = async (data: {
    name: string;
    email: string;
    company: string;
    role: string;
    botcheck?: string;
  }) => {
    if (!modalPublication) return;
    if (!data.name || !data.email || !data.company) return;

    storePublicationAccess(modalPublication.id);
    setUnlockedIds(getStoredPublicationAccess());
    setSuccessEmail(data.email);
    setActiveId(modalPublication.id);

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
        publication_id: modalPublication.id,
        publication_title: modalPublication.title,
        report_title: modalPublication.reportTitle,
      },
    });

    if (!result.ok) {
      console.warn(
        "[Web3Forms] Publication access email failed:",
        result.message,
      );
    }
  };

  const afterSuccessClose = () => {
    closeModal();
    if (activeId) {
      requestAnimationFrame(() => {
        document.getElementById("publication-reader")?.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  return (
    <>
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
            {filtered.map((publication) => {
              const unlocked = unlockedIds.includes(publication.id);
              const isActive = activeId === publication.id;

              return (
                <button
                  key={publication.id}
                  type="button"
                  onClick={() => handleCardClick(publication)}
                  className={cn(
                    "group flex flex-col rounded-2xl border bg-[var(--surface)] p-6 text-left transition-all duration-200",
                    isActive
                      ? "border-[var(--indigo)] shadow-[0_12px_40px_rgba(83,58,253,0.12)]"
                      : "border-[var(--border)] hover:border-[var(--indigo)]/35 hover:shadow-[0_12px_40px_rgba(83,58,253,0.08)]",
                  )}
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[var(--indigo-bg)] px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--indigo)] uppercase">
                      {publication.category}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 text-[12px] font-medium",
                        unlocked ? "text-[var(--emerald)]" : "text-[var(--ink-muted)]",
                      )}
                    >
                      {unlocked ? (
                        <>
                          <Unlock size={14} aria-hidden />
                          Unlocked
                        </>
                      ) : (
                        <>
                          <Lock size={14} aria-hidden />
                          Request access
                        </>
                      )}
                    </span>
                  </div>

                  <h2 className="text-[20px] font-medium tracking-[-0.02em] text-[var(--ink)] group-hover:text-[var(--indigo)]">
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
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {activePublication && unlockedIds.includes(activePublication.id) && (
        <section
          id="publication-reader"
          className="border-t border-[var(--border)] bg-[var(--surface)] py-20 md:py-24"
        >
          <div className="content-container max-w-3xl">
            <p className="eyebrow mb-3">{activePublication.category}</p>
            <h2 className="heading-section text-[var(--ink)]">{activePublication.title}</h2>
            <p className="mt-4 text-[14px] text-[var(--ink-muted)]">
              {activePublication.author} · {activePublication.publishedAt} ·{" "}
              {activePublication.readMinutes} min read
            </p>
            <p className="body-lg mt-8 text-[var(--ink-secondary)]">
              {activePublication.excerpt}
            </p>

            <div className="mt-10 space-y-8">
              {activePublication.sections.map((section, i) => (
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

            <p className="mt-12 rounded-2xl border border-[var(--indigo)]/20 bg-white px-6 py-5 text-[14px] text-[var(--ink-secondary)]">
              <span className="font-medium text-[var(--ink)]">Full report: </span>
              {activePublication.reportTitle} — delivered to the email you provided. Need help?
              Contact us at{" "}
              <a href="/contact" className="font-medium text-[var(--indigo)] hover:underline">
                o3xs.com/contact
              </a>
              .
            </p>
          </div>
        </section>
      )}

      <PublicationAccessModal
        publication={modalPublication}
        open={modalPublication !== null}
        successEmail={successEmail}
        onClose={successEmail ? afterSuccessClose : closeModal}
        onSubmit={handleSubmit}
      />
    </>
  );
}
