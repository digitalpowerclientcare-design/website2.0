"use client";

import { Download, FileText } from "lucide-react";
import { assetPath } from "@/lib/assetPath";

type PublicationReportViewerProps = {
  title: string;
  pdfPath: string;
};

export function PublicationReportViewer({
  title,
  pdfPath,
}: PublicationReportViewerProps) {
  const src = assetPath(pdfPath);

  return (
    <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--indigo-bg)] text-[var(--indigo)]">
            <FileText size={18} aria-hidden />
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-wide text-[var(--indigo)] uppercase">
              Full report
            </p>
            <h2 className="text-[16px] font-medium tracking-[-0.01em] text-[var(--ink)]">
              {title}
            </h2>
          </div>
        </div>
        <a
          href={src}
          download
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-[13px] font-medium text-[var(--ink-secondary)] transition-colors hover:border-[var(--indigo)]/40 hover:text-[var(--indigo)]"
        >
          <Download size={14} aria-hidden />
          Download PDF
        </a>
      </div>

      <div className="bg-[#525659]">
        <iframe
          title={title}
          src={`${src}#view=FitH`}
          className="h-[min(85vh,920px)] w-full border-0"
        />
      </div>
    </div>
  );
}
