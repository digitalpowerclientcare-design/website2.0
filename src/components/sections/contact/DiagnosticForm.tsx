"use client";

import { ArrowRight } from "lucide-react";

const BLEEDING_OPTIONS = [
  "SDLC / Engineering inefficiency",
  "Marketing spend waste",
  "Operations / process bottlenecks",
  "Legal / compliance overhead",
  "Customer support costs",
  "Other",
];

const COMPANY_SIZES = [
  "Under $1M revenue",
  "$1M – $50M revenue",
  "$50M – $500M revenue",
  "$500M+ revenue",
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

export function DiagnosticForm() {
  return (
    <form
      action="#"
      method="post"
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-12"
    >
      <h3 className="text-[22px] font-medium tracking-[-0.015em] text-[var(--ink)]">
        Start Your Performance Diagnostic
      </h3>
      <p className="mt-2 text-[14px] text-[var(--ink-secondary)]">
        We&apos;ll be in touch within one business day.
      </p>

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
              placeholder="Chief Operating Officer"
            />
          </label>
        </div>

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
            <input
              type="datetime-local"
              name="datetime"
              className={inputBase}
            />
          </label>
        </div>

        <button
          type="submit"
          className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--indigo)] py-3.5 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-[var(--indigo-light)] sm:w-auto sm:pr-2 sm:pl-7"
        >
          Submit Request
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[var(--indigo)] transition-transform duration-500 group-hover:-rotate-45">
            <ArrowRight className="h-4 w-4" />
          </span>
        </button>
      </div>
    </form>
  );
}
