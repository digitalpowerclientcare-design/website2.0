"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { ContactContext } from "@/lib/contactContent";
import {
  FORGE_REPO_HOST_OPTIONS,
  FORGE_START_TIMELINE_OPTIONS,
  FORGE_TEAM_SIZE_OPTIONS,
  FORGE_USE_CASE_OPTIONS,
} from "@/lib/contactContent";
import { formDataToFields, submitToWeb3Forms } from "@/lib/web3forms";

const BLEEDING_OPTIONS = [
  "SDLC / Engineering inefficiency.",
  "Marketing spend waste.",
  "Operations / process bottlenecks.",
  "Legal / compliance overhead.",
  "Customer support costs.",
  "Other.",
];

const COMPANY_SIZES = [
  "Under $1M Revenue",
  "$1M – $50M Revenue",
  "$50M – $500M Revenue",
  "$500M+ Revenue",
];

const inputBase =
  "w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3.5 text-[15px] text-[var(--ink)] transition-shadow duration-200 placeholder:text-[var(--ink-muted)] focus:border-[var(--indigo)] focus:shadow-[0_0_0_4px_rgba(83,58,253,0.12)] focus:outline-none";

const labelBase =
  "mb-1.5 block text-[13px] font-medium text-[var(--ink-secondary)]";

const Required = () => (
  <span className="ml-0.5 text-[var(--emerald)]" aria-hidden>
    *
  </span>
);

type ContactFormProps = {
  context: ContactContext;
};

export function ContactForm({ context }: ContactFormProps) {
  const isForge = context.variant === "forge";
  const forge = context.forge;
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const fields = formDataToFields(formData);

    const result = await submitToWeb3Forms({
      subject: "New O3Xs Website Lead - Contact Form",
      form_type: "contact",
      source_page:
        typeof window !== "undefined"
          ? `${window.location.pathname}${window.location.search}`
          : "/contact",
      botcheck: String(formData.get("botcheck") ?? ""),
      fields: {
        ...fields,
        variant: context.variant,
        interest: context.interest,
        ...(forge?.kind && { forge_request: forge.kind }),
        ...(forge?.planId && { plan: forge.planId }),
        ...(forge?.billing && { billing: forge.billing }),
        ...(forge?.summary && { context_summary: forge.summary }),
      },
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
        className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-12"
        role="status"
      >
        <p className="eyebrow mb-2 text-[var(--emerald)]">Success</p>
        <h3 className="text-[22px] font-medium tracking-[-0.015em] text-[var(--ink)]">
          Request received
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-secondary)]">
          Thank you — we&apos;ll be in touch within one business day at the email
          you provided.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-8 inline-flex rounded-full border border-[var(--border)] bg-white px-6 py-3 text-[14px] font-medium text-[var(--ink)] transition-colors hover:border-[var(--indigo)]/40"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-12"
    >
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <input type="hidden" name="interest" value={context.interest} />
      {forge?.planId && <input type="hidden" name="plan" value={forge.planId} />}
      {forge?.billing && <input type="hidden" name="billing" value={forge.billing} />}
      {forge?.kind && <input type="hidden" name="forge_request" value={forge.kind} />}

      <h3 className="text-[22px] font-medium tracking-[-0.015em] text-[var(--ink)]">
        {context.page.formTitle}
      </h3>
      <p className="mt-2 text-[14px] text-[var(--ink-secondary)]">
        {context.page.formSubtitle}
      </p>

      {isForge && forge?.summary && (
        <p
          className="mt-4 rounded-xl border border-[var(--indigo)]/20 bg-[var(--indigo-bg)] px-4 py-3 text-[13px] font-medium text-[var(--indigo)]"
          role="status"
        >
          {forge.summary}
        </p>
      )}

      <div className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={labelBase}>
              Full name
              <Required />
            </span>
            <input
              type="text"
              name="name"
              required
              autoComplete="name"
              className={inputBase}
              placeholder="Jane Doe"
            />
          </label>
          <label className="block">
            <span className={labelBase}>
              Work email
              <Required />
            </span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className={inputBase}
              placeholder="jane@company.com"
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={labelBase}>
              Company name
              <Required />
            </span>
            <input
              type="text"
              name="company"
              required
              autoComplete="organization"
              className={inputBase}
              placeholder="Acme Inc."
            />
          </label>
          <label className="block">
            <span className={labelBase}>
              Your role
              <Required />
            </span>
            <input
              type="text"
              name="role"
              required
              className={inputBase}
              placeholder={isForge ? "VP Engineering" : "Chief Operating Officer"}
            />
          </label>
        </div>

        {isForge ? (
          <>
            <label className="block">
              <span className={labelBase}>
                What are you building with Forge?
                <Required />
              </span>
              <select name="use_case" required className={inputBase} defaultValue="">
                <option value="" disabled>
                  Select use case
                </option>
                {FORGE_USE_CASE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className={labelBase}>
                  Where is your code hosted?
                  <Required />
                </span>
                <select name="repo_host" required className={inputBase} defaultValue="">
                  <option value="" disabled>
                    Select platform
                  </option>
                  {FORGE_REPO_HOST_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className={labelBase}>
                  Engineer Size
                  <Required />
                </span>
                <select name="team_size" required className={inputBase} defaultValue="">
                  <option value="" disabled>
                    Select range
                  </option>
                  {FORGE_TEAM_SIZE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className={labelBase}>
                Primary stack (languages / cloud)
                <Required />
              </span>
              <input
                type="text"
                name="stack"
                required
                className={inputBase}
                placeholder="e.g. TypeScript, .NET, AWS, Azure"
              />
            </label>

            <label className="block">
              <span className={labelBase}>When do you want to start?</span>
              <select name="start_timeline" className={inputBase} defaultValue="">
                <option value="">Select timeline</option>
                {FORGE_START_TIMELINE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className={labelBase}>Anything else we should know?</span>
              <textarea
                name="notes"
                rows={3}
                className={inputBase}
                placeholder="Repo size, compliance needs, first feature in mind…"
              />
            </label>
          </>
        ) : (
          <>
            <label className="block">
              <span className={labelBase}>
                What&apos;s bleeding money in your business?
                <Required />
              </span>
              <select name="bleeding" required className={inputBase} defaultValue="">
                <option value="" disabled>
                  Select a challenge
                </option>
                {BLEEDING_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className={labelBase}>Company size</span>
              <select name="size" className={inputBase} defaultValue="">
                <option value="" disabled>
                  Select range
                </option>
                {COMPANY_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className={labelBase}>Phone number</span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  className={inputBase}
                  placeholder="+1 (555) 000-0000"
                />
              </label>
              <label className="block">
                <span className={labelBase}>Preferred date &amp; time</span>
                <input type="datetime-local" name="datetime" className={inputBase} />
              </label>
            </div>
          </>
        )}

        {error && (
          <p
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-800"
            role="alert"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--indigo)] py-3.5 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-[var(--indigo-light)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:pr-2 sm:pl-7"
        >
          {submitting ? "Submitting…" : context.page.submitLabel}
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[var(--indigo)] transition-transform duration-500 group-hover:-rotate-45">
            <ArrowRight className="h-4 w-4" />
          </span>
        </button>
      </div>
    </form>
  );
}
