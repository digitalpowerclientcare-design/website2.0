"use client";

export function BetaAccessForm() {
  return (
    <form
      action="#"
      method="post"
      className="mx-auto max-w-lg space-y-4 rounded-xl border border-[var(--border)] bg-white p-8 shadow-[var(--shadow-card)]"
    >
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
      <button type="submit" className="btn-indigo w-full sm:w-auto">
        Request Access →
      </button>
      <p className="text-xs text-[var(--ink-muted)]">
        Form ready for Formspree — set action URL when endpoint is available.
      </p>
    </form>
  );
}
