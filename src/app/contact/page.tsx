import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactPageView } from "@/components/sections/contact/ContactPageView";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a consultation or request Forge AI trial, plan, or beta access. One contact flow tailored to how you want to work with O3Xs.",
};

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="content-container py-32 text-center text-[var(--ink-muted)]">
          Loading…
        </div>
      }
    >
      <ContactPageView />
    </Suspense>
  );
}
