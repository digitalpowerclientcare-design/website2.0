'use client';

import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const STAGES = [
  {
    num: '01',
    name: 'Optimize',
    gradient: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
    color: '#3B82F6',
    title: 'Optimize',
    body: 'We map value leakage across operations, engineering, and go-to-market before touching tools. Diagnose before automating.',
    tags: ['Diagnostic', 'Audit', 'Roadmap'],
  },
  {
    num: '02',
    name: 'Orchestrate',
    gradient: 'linear-gradient(135deg, #10B981, #059669)',
    color: '#10B981',
    title: 'Orchestrate',
    body: 'We integrate AI and workflow intelligence where ROI is provable. No rip-and-replace — your existing systems, augmented.',
    tags: ['Integration', 'Workflow', 'Automation'],
  },
  {
    num: '03',
    name: 'Operate',
    gradient: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
    color: '#8B5CF6',
    title: 'Operate',
    body: "We don't hand over and disappear. Post-deployment, we monitor KPIs, detect drift, and own the performance outcomes.",
    tags: ['Monitoring', 'SLAs', 'Accountability'],
  },
  {
    num: '04',
    name: 'Innovate',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
    color: '#F59E0B',
    title: 'Innovate',
    body: 'As we operate, we identify next-generation optimization opportunities. Innovation becomes systematic, not episodic.',
    tags: ['R&D', 'Predictive', 'Agents'],
  },
  {
    num: '05',
    name: 'Scale',
    gradient: 'linear-gradient(135deg, #5046E5, #3730A3)',
    color: '#5046E5',
    title: 'Scale',
    body: 'Proven solutions replicated across functions, geographies, and business units. One fix becomes an institutional operating model.',
    tags: ['Replication', 'Playbooks', 'Platforms'],
  },
];

export function FrameworkSection() {
  return (
    <section className="section" style={{ background: 'var(--surface)' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '64px' }}>
        <ScrollReveal>
          <p className="eyebrow">WHAT WE DO</p>
          <h2 className="t-h2" style={{ color: 'var(--ink)' }}>The O3Xs Framework</h2>
          <p className="t-body" style={{ marginTop: '12px' }}>
            Optimize · Orchestrate · Operate · Innovate · Scale
          </p>
        </ScrollReveal>
      </div>

      <div className="container-wide" style={{ paddingBottom: '120px' }}>
        {STAGES.map((stage, index) => (
          <div
            key={stage.name}
            className="framework-sticky-card"
            style={{ top: `${100 + index * 16}px` }}
          >
            <div
              style={{
                background: stage.gradient,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '32px',
              }}
            >
              <span
                style={{
                  fontSize: '80px',
                  fontFamily: 'var(--font-mono)',
                  color: 'white',
                  fontWeight: 200,
                  opacity: 0.3,
                  lineHeight: 1,
                }}
              >
                {stage.num}
              </span>
              <span
                style={{
                  fontSize: '24px',
                  color: 'white',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                }}
              >
                {stage.name}
              </span>
            </div>

            <div
              style={{
                padding: '48px',
                background: 'rgba(10,11,20,0.4)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    padding: '6px 12px',
                    borderRadius: 'var(--r-pill)',
                    background: `${stage.color}26`,
                    color: stage.color,
                    fontWeight: 600,
                  }}
                >
                  {stage.name}
                </span>
                <span className="t-mono" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                  {stage.num} / 05
                </span>
              </div>
              <h3 style={{ color: 'white', fontSize: '32px', fontWeight: 500, marginBottom: '16px' }}>
                {stage.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: 1.7, flex: 1 }}>
                {stage.body}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px' }}>
                {stage.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '12px',
                      padding: '6px 12px',
                      borderRadius: 'var(--r-pill)',
                      background: 'rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/consulting"
                style={{
                  marginTop: '24px',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                See deliverables →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
