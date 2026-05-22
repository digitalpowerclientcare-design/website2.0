'use client';

import { assetPath } from '@/lib/assetPath';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const LOGOS = [
  { src: '/logos/perplexity.png', alt: 'Perplexity' },
  { src: '/logos/jasper.png', alt: 'Jasper' },
  { src: '/logos/google.png', alt: 'Google' },
  { src: '/logos/defender.png', alt: 'Microsoft Defender' },
  { src: '/logos/cursor.png', alt: 'Cursor' },
  { src: '/logos/copilot.png', alt: 'Copilot' },
];

const TRACK = [...LOGOS, ...LOGOS, ...LOGOS];

export function PartnersSection() {
  return (
    <section style={{ background: 'var(--surface)', padding: '64px 0' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <ScrollReveal>
          <p className="eyebrow">OUR PARTNERS</p>
          <h3 className="t-h2" style={{ color: 'var(--ink)' }}>Tool-Agnostic. Outcome-Obsessed.</h3>
          <p className="t-body" style={{ marginTop: '12px' }}>
            We don&apos;t sell tools. We make them work — together.
          </p>
        </ScrollReveal>
      </div>
      <div className="marquee-wrap">
        <div className="marquee-track">
          {TRACK.map((logo, i) => (
            <img
              key={`${logo.alt}-${i}`}
              src={assetPath(logo.src)}
              alt={logo.alt}
              style={{
                height: 36,
                width: 'auto',
                opacity: 0.5,
                filter: 'grayscale(20%)',
                transition: '0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.filter = 'none';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.5';
                e.currentTarget.style.filter = 'grayscale(20%)';
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
