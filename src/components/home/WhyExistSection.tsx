'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const PROOFS = [
  { title: 'Diagnose', text: 'Find the leak before building the fix' },
  { title: 'Implement', text: 'Build the system that stops it' },
  { title: 'Operate', text: 'Stay until results compound' },
];

export function WhyExistSection() {
  return (
    <section className="section" style={{ background: 'var(--surface-alt)' }}>
      <div className="container home-why-grid" style={{ alignItems: 'center', gap: '64px' }}>
        <ScrollReveal direction="left">
          <p className="eyebrow">WHY WE EXIST</p>
          <h2 className="t-h2" style={{ color: 'var(--ink)' }}>
            Strategy decks don&apos;t ship. We do.
          </h2>
          <p className="t-body" style={{ marginTop: '20px' }}>
            We&apos;re the only AI consulting firm that diagnoses, implements, operates,
            and guarantees the ROI. Not advisors. Operators.
          </p>
          <div style={{ marginTop: '32px' }}>
            {PROOFS.map((p) => (
              <div
                key={p.title}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '16px',
                  background: 'white',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-md)',
                  marginBottom: '12px',
                }}
              >
                <span style={{ color: 'var(--indigo)' }}>✦</span>
                <div>
                  <strong style={{ color: 'var(--ink)' }}>{p.title}</strong>
                  <span style={{ color: 'var(--ink-2)', fontSize: '14px' }}> → {p.text}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <QuoteCard />
      </div>
    </section>
  );
}

function QuoteCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.96, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.96, opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{
        background: 'var(--brand-dark)',
        borderRadius: 'var(--r-xl)',
        padding: '48px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '240px',
          height: '240px',
          background: 'radial-gradient(circle, rgba(80,70,229,0.35), transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <blockquote
        style={{
          color: 'white',
          fontSize: '20px',
          fontWeight: 300,
          lineHeight: 1.6,
          position: 'relative',
        }}
      >
        &ldquo;The hardest part of AI transformation isn&apos;t the AI. It&apos;s the
        operating discipline after the AI ships.&rdquo;
      </blockquote>
      <p style={{ marginTop: '24px', color: 'var(--indigo-mid)', fontSize: '14px' }}>
        — Prasanth Nath, Founder · O3Xs
      </p>
    </motion.div>
  );
}
