'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Activity,
  Scale,
  TrendingUp,
  Headphones,
  Layers,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const INDUSTRIES = [
  {
    icon: Code2,
    label: 'Software & SDLC',
    stat: '60% faster cycles',
    desc: 'AI verification and delivery intelligence for engineering teams.',
    tags: ['SDLC', 'Verification', 'Compliance'],
  },
  {
    icon: Activity,
    label: 'Healthcare',
    stat: '45% lower costs',
    desc: 'Operational automation with compliance-first guardrails.',
    tags: ['Patient Care', 'Compliance', 'Automation'],
  },
  {
    icon: Scale,
    label: 'Legal Services',
    stat: '40+ hrs/lawyer/wk',
    desc: 'Document intelligence and review workflows at scale.',
    tags: ['Document AI', 'Review', 'Compliance'],
  },
  {
    icon: TrendingUp,
    label: 'Marketing Ops',
    stat: '55% less waste',
    desc: 'Attribution and pipeline orchestration with measurable ROI.',
    tags: ['Attribution', 'Orchestration', 'Pipeline'],
  },
  {
    icon: Headphones,
    label: 'Customer Experience',
    stat: '45% cost cut',
    desc: 'Routing, quality, and resolution intelligence for CX teams.',
    tags: ['CX', 'Routing', 'Quality'],
  },
  {
    icon: Layers,
    label: 'Enterprise Ops',
    stat: 'Process intel at scale',
    desc: 'Workflow intelligence that compounds across the org.',
    tags: ['Workflow', 'Intelligence', 'Compounding'],
  },
];

export function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useLayoutEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    if (!section) return;

    let tid: ReturnType<typeof setTimeout>;
    const ctx = gsap.context(() => {
      tid = setTimeout(() => {
        const track = trackRef.current;
        const pin = pinRef.current;
        if (!track || !pin) return;

        gsap.to(track, {
          x: () => -(track.scrollWidth - pin.offsetWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${track.scrollWidth - pin.offsetWidth}`,
            pin: true,
            scrub: 1.2,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.width = `${self.progress * 100}%`;
              }
            },
          },
        });
        ScrollTrigger.refresh();
      }, 150);
    }, section);

    return () => {
      clearTimeout(tid);
      ctx.revert();
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="section" style={{ background: 'var(--canvas)' }}>
      <div className="container" style={{ marginBottom: '48px' }}>
        <ScrollReveal>
          <p className="eyebrow">ACROSS INDUSTRIES</p>
          <h2 className="t-h2" style={{ color: 'var(--ink)' }}>
            Engineered for every operations-heavy domain.
          </h2>
          <p className="t-body" style={{ marginTop: '12px' }}>
            We&apos;ve shipped AI systems across regulated and ops-heavy industries.
          </p>
        </ScrollReveal>
      </div>

      <div ref={pinRef} className={isMobile ? '' : 'industries-pin'}>
        <div
          className={isMobile ? 'industries-track-mobile container' : 'industries-track'}
          ref={trackRef}
          style={isMobile ? undefined : { paddingLeft: '48px' }}
        >
          {INDUSTRIES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="card industries-tile-new" style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'var(--indigo-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--indigo)',
                    marginBottom: '20px',
                  }}
                >
                  <Icon size={22} />
                </div>
                <p className="t-label" style={{ marginBottom: '12px' }}>{item.label}</p>
                <p
                  className="t-mono"
                  style={{ fontSize: '40px', color: 'var(--indigo)', fontWeight: 300, lineHeight: 1.1 }}
                >
                  {item.stat}
                </p>
                <p className="t-small" style={{ marginTop: '16px', flex: 1 }}>{item.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px' }}>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '12px',
                        padding: '6px 12px',
                        borderRadius: 'var(--r-pill)',
                        background: 'var(--surface)',
                        color: 'var(--ink-3)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {!isMobile && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
            <div style={{ width: 200, height: 2, background: 'var(--border)', borderRadius: 2 }}>
              <div
                ref={progressRef}
                style={{
                  height: '100%',
                  width: '0%',
                  background: 'var(--indigo)',
                  borderRadius: 2,
                  transition: 'width 0.1s linear',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
