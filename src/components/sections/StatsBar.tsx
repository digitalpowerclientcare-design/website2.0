"use client";

import { STATS } from "@/lib/site";
import { StatCounter } from "@/components/ui/StatCounter";

export function StatsBar() {
  return (
    <section className="section-padding bg-[var(--surface)]">
      <div className="content-container">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="stripe-card flex flex-col items-center p-8 text-center"
            >
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                className="font-stat text-5xl text-[var(--indigo)]"
              />
              <p className="body-base mt-3">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="caption mt-10 text-center">
          Verified outcomes. Not projections.
        </p>
      </div>
    </section>
  );
}
