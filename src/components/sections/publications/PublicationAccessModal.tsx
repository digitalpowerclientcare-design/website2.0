"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import {
  PUBLICATION_ACCESS_COPY,
  type Publication,
} from "@/lib/publicationsContent";

const inputBase =
  "w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3.5 text-[15px] text-[var(--ink)] transition-shadow duration-200 placeholder:text-[var(--ink-muted)] focus:border-[var(--indigo)] focus:shadow-[0_0_0_4px_rgba(83,58,253,0.12)] focus:outline-none";

const labelBase =
  "mb-1.5 block text-[13px] font-medium text-[var(--ink-secondary)]";

type PublicationAccessModalProps = {
  publication: Publication | null;
  open: boolean;
  submitting?: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    company: string;
    role: string;
    botcheck?: string;
  }) => void;
};

export function PublicationAccessModal({
  publication,
  open,
  submitting = false,
  onClose,
  onSubmit,
}: PublicationAccessModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && publication) {
      if (!dialog.open) dialog.showModal();
      requestAnimationFrame(() => firstFieldRef.current?.focus());
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open, publication]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      if (!submitting) onClose();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, [onClose, submitting]);

  if (!publication) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="fixed inset-0 z-[100] m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-4 backdrop:bg-black/50 open:flex open:items-center open:justify-center"
      onClick={(e) => {
        if (e.target === dialogRef.current && !submitting) onClose();
      }}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-[var(--ink-muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--ink)] disabled:opacity-40"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <p className="eyebrow mb-2">Free access</p>
        <h2 id={titleId} className="pr-8 text-[22px] font-medium tracking-[-0.02em] text-[var(--ink)]">
          {PUBLICATION_ACCESS_COPY.modalTitle}
        </h2>
        <p className="mt-2 text-[14px] text-[var(--ink-secondary)]">
          {PUBLICATION_ACCESS_COPY.modalSubtitle}
        </p>
        <p className="mt-3 rounded-xl bg-[var(--indigo-bg)] px-4 py-3 text-[13px] font-medium text-[var(--indigo)]">
          {publication.title}
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (submitting) return;
            const fd = new FormData(e.currentTarget);
            onSubmit({
              name: String(fd.get("name") ?? "").trim(),
              email: String(fd.get("email") ?? "").trim(),
              company: String(fd.get("company") ?? "").trim(),
              role: String(fd.get("role") ?? "").trim(),
              botcheck: String(fd.get("botcheck") ?? ""),
            });
          }}
        >
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />
          <input type="hidden" name="publication_id" value={publication.id} />
          <input type="hidden" name="report_title" value={publication.reportTitle} />

          <label className="block">
            <span className={labelBase}>
              Full name <span className="text-[var(--emerald)]">*</span>
            </span>
            <input
              ref={firstFieldRef}
              type="text"
              name="name"
              required
              disabled={submitting}
              autoComplete="name"
              className={inputBase}
              placeholder="Jane Doe"
            />
          </label>

          <label className="block">
            <span className={labelBase}>
              Work email <span className="text-[var(--emerald)]">*</span>
            </span>
            <input
              type="email"
              name="email"
              required
              disabled={submitting}
              autoComplete="email"
              className={inputBase}
              placeholder="jane@company.com"
            />
          </label>

          <label className="block">
            <span className={labelBase}>
              Company <span className="text-[var(--emerald)]">*</span>
            </span>
            <input
              type="text"
              name="company"
              required
              disabled={submitting}
              autoComplete="organization"
              className={inputBase}
              placeholder="Acme Inc."
            />
          </label>

          <label className="block">
            <span className={labelBase}>Job title</span>
            <input
              type="text"
              name="role"
              disabled={submitting}
              autoComplete="organization-title"
              className={inputBase}
              placeholder="VP Engineering"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 w-full rounded-full bg-[var(--indigo)] py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[var(--indigo-deep)] disabled:opacity-60"
          >
            {submitting ? "Unlocking report…" : PUBLICATION_ACCESS_COPY.submitLabel}
          </button>

          <p className="text-center text-[12px] leading-relaxed text-[var(--ink-muted)]">
            {PUBLICATION_ACCESS_COPY.privacyNote}
          </p>
        </form>
      </div>
    </dialog>
  );
}
