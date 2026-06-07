"use client";

import { useState } from "react";
import { formDataToFields, submitToWeb3Forms } from "@/lib/web3forms";

export function BetaAccessForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const result = await submitToWeb3Forms({
      subject: "New O3Xs Forge Beta Request",
      form_type: "forge_beta",
      source_page:
        typeof window !== "undefined" ? window.location.pathname : "/",
      botcheck: String(formData.get("botcheck") ?? ""),
      fields: formDataToFields(formData),
    });

    setSubmitting(false);

    if (result.ok) {
      setSuccess(true);
      form.reset();
      return;
    }

    setError(result.message);
  }

  if (success) {
    return (
      <div
        className="mx-auto max-w-lg rounded-xl border border-[var(--border)] bg-white p-8 shadow-[var(--shadow-card)]"
        role="status"
      >
        <p className="text-[15px] font-medium text-[var(--ink)]">Request received</p>
        <p className="mt-2 text-[14px] text-[var(--ink-secondary)]">
          Thank you — we&apos;ll review your beta request and follow up shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-lg space-y-4 rounded-xl border border-[var(--border)] bg-white p-8 shadow-[var(--shadow-card)]"
    >
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div>
        <label htmlFor="beta-email" className="form-label">
          Work Email *
        </label>
        <input
          id="beta-email"
          name="email"
          type="email"
          required
          className="form-input"
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label htmlFor="beta-company" className="form-label">
          Company Name *
        </label>
        <input
          id="beta-company"
          name="company"
          required
          className="form-input"
          placeholder="Company Inc."
        />
      </div>

      {error && (
        <p className="text-[14px] text-red-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="btn-indigo w-full sm:w-auto"
        disabled={submitting}
      >
        {submitting ? "Submitting…" : "Request Access →"}
      </button>
    </form>
  );
}
