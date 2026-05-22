'use client';

import Link from 'next/link';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const STATS = [
  { value: 60, label: 'Reduction in design-to-deployment cycle time' },
  { value: 55, label: 'Decrease in wasted marketing spend' },
  { value: 60, label: 'Faster operations process cycles' },
  { value: 45, label: 'Lower customer support costs' },
];

export function StatsSection() {
  return (
    <section className="section" style={{ background: 'var(--canvas)' }}>
      <div className="container home-stats-grid" style={{ alignItems: 'start', gap: '64px' }}>
        <ScrollReveal>
          <p className="eyebrow">IMPACT REALIZATION</p>
          <h2 className="t-h2" style={{ color: 'var(--ink)' }}>
            Verified outcomes.{' '}
            <span style={{ color: 'var(--ink-3)' }}>Not projections.</span>
          </h2>
          <p className="t-body" style={{ marginTop: '20px' }}>
            Real metrics from real engagements. Every number here is verified client
            outcome data — not a projection, not a forecast.
          </p>
          <Link
            href="/consulting"
            style={{
              display: 'inline-block',
              marginTop: '24px',
              color: 'var(--indigo)',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            View Case Studies →
          </Link>
        </ScrollReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
          }}
        >
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08}>
              <div className="card">
                <div
                  style={{
                    fontSize: '56px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--indigo)',
                    fontWeight: 300,
                    lineHeight: 1,
                  }}
                >
                  <AnimatedCounter value={stat.value} suffix="%" />
                </div>
                <p className="t-small" style={{ marginTop: '12px', maxWidth: '220px' }}>
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
