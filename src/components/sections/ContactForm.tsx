"use client";

import { BLEEDING_OPTIONS, COMPANY_SIZES } from "@/lib/site";

export function ContactForm() {
  return (
    <form
      action="#"
      method="post"
      className="space-y-5 rounded-xl border border-[var(--border)] bg-white p-8 shadow-[var(--shadow-card)]"
    >
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

      <button type="submit" className="btn-indigo">
        Submit →
      </button>
    </form>
  );
}
