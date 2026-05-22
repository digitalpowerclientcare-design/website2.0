'use client';

import { MagneticButton } from '@/components/ui/MagneticButton';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function CtaSection() {
  return (
    <section
      style={{
        background: 'var(--brand-dark)',
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.4,
        }}
      />
      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 800 }}>
        <ScrollReveal>
          <p className="t-label" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
            READY TO COMPOUND YOUR AI INVESTMENTS
          </p>
          <h2 className="t-h1" style={{ color: 'white' }}>
            Book a 60-Minute Consultation.
          </h2>
          <p
            style={{
              marginTop: '20px',
              fontSize: '16px',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            Get a Performance Diagnostic Report — quantified leakage, prioritized fixes,
            and an ROI-ranked roadmap.
          </p>
          <div style={{ marginTop: '40px' }}>
            <MagneticButton
              href="/contact"
              style={{
                display: 'inline-flex',
                background: 'white',
                color: 'var(--ink)',
                padding: '18px 40px',
                borderRadius: 'var(--r-pill)',
                fontSize: '16px',
                fontWeight: 500,
                boxShadow: '0 8px 32px rgba(255,255,255,0.15)',
              }}
            >
              Book a Consultation →
            </MagneticButton>
          </div>
          <p style={{ marginTop: '16px', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
            No obligation. No sales pitch. Written diagnostic report included.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
