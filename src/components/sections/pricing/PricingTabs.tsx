"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";
import type { PricingTabId } from "@/lib/pricingContent";
import { ConsultationPricing } from "./ConsultationPricing";
import { ForgePricingPanel } from "./ForgePricingPanel";

const TABS: { id: PricingTabId; label: string }[] = [
  { id: "consultation", label: "Consultation" },
  { id: "forge", label: "Forge AI Plans" },
];

function isPricingTab(value: string | null): value is PricingTabId {
  return value === "consultation" || value === "forge";
}

export function PricingTabs() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTab: PricingTabId =
    tabParam && isPricingTab(tabParam) ? tabParam : "consultation";

  const [active, setActive] = useState<PricingTabId>(initialTab);

  useEffect(() => {
    if (tabParam && isPricingTab(tabParam)) {
      setActive(tabParam);
    }
  }, [tabParam]);

  const selectTab = useCallback((id: PricingTabId) => {
    setActive(id);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", id);
    window.history.replaceState(null, "", url.toString());
  }, []);

  return (
    <>
      <section className="sticky top-[72px] z-30 border-b border-[var(--border)] bg-white/95 backdrop-blur-md">
        <div className="content-container flex justify-center py-4">
          <div
            className="inline-flex rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1"
            role="tablist"
            aria-label="Pricing type"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active === tab.id}
                onClick={() => selectTab(tab.id)}
                className={cn(
                  "rounded-lg px-5 py-2.5 text-[14px] font-medium transition-all duration-200",
                  active === tab.id
                    ? "bg-[var(--indigo)] text-white shadow-sm"
                    : "text-[var(--ink-secondary)] hover:text-[var(--ink)]",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
        >
          {active === "consultation" ? (
            <ConsultationPricing />
          ) : (
            <>
              <ForgePricingPanel />
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
