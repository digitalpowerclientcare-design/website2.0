"use client";

import { useState } from "react";
import { BLEEDING_OPTIONS, COMPANY_SIZES } from "@/lib/site";
import { formDataToFields, submitToWeb3Forms } from "@/lib/web3forms";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;

    try {
      const formData = new FormData(form);

      const result = await submitToWeb3Forms({
        subject: "New O3Xs Website Lead - Legacy Contact Form",
        form_type: "legacy_contact",
        source_page:
          typeof window !== "undefined" ? window.location.pathname : "/",
        botcheck: String(formData.get("botcheck") ?? ""),
        fields: formDataToFields(formData),
      });

      if (result.ok) {
        setSuccess(true);
        form.reset();
        return;
      }

      setError(result.message);
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div
        className="space-y-3 rounded-xl border border-[var(--border)] bg-white p-8 shadow-[var(--shadow-card)]"
        role="status"
      >
        <p className="text-[15px] font-medium text-[var(--ink)]">Request received</p>
        <p className="text-[14px] text-[var(--ink-secondary)]">
          Thank you — we&apos;ll be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-[var(--border)] bg-white p-8 shadow-[var(--shadow-card)]"
    >
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="full-name" className="form-label">
            Full Name *
          </label>
          <input id="full-name" name="name" required className="form-input" />
        </div>
        <div>
          <label htmlFor="work-email" className="form-label">
            Work Email *
          </label>
          <input
            id="work-email"
            name="email"
            type="email"
            required
            className="form-input"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="form-label">
            Company Name *
          </label>
          <input id="company" name="company" required className="form-input" />
        </div>
        <div>
          <label htmlFor="role" className="form-label">
            Your Role *
          </label>
          <input id="role" name="role" required className="form-input" />
        </div>
      </div>

      <div>
        <label htmlFor="bleeding" className="form-label">
          What&apos;s bleeding money in your business? *
        </label>
        <select id="bleeding" name="bleeding" required className="form-input">
          <option value="">Select a challenge</option>
          {BLEEDING_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="size" className="form-label">
          Company Size
        </label>
        <select id="size" name="size" className="form-input">
          <option value="">Select range</option>
          {COMPANY_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input id="phone" name="phone" type="tel" className="form-input" />
        </div>
        <div>
          <label htmlFor="datetime" className="form-label">
            Preferred Date &amp; Time for Call
          </label>
          <input
            id="datetime"
            name="datetime"
            type="datetime-local"
            className="form-input"
          />
        </div>
      </div>

      {error && (
        <p className="text-[14px] text-red-700" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn-indigo" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit →"}
      </button>
    </form>
  );
}
