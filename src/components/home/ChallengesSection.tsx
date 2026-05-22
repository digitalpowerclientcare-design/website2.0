'use client';

import {
  Brain,
  Layers,
  Zap,
  FileText,
  TrendingDown,
  Grid3x3,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const CARDS = [
  {
    icon: Brain,
    title: 'Fragmented AI Initiatives',
    body: 'Pilots multiply without a unified operating model or measurable ROI.',
  },
  {
    icon: Layers,
    title: 'Tool Sprawl, No Ownership',
    body: 'Vendors stack up while accountability for outcomes stays undefined.',
  },
  {
    icon: Zap,
    title: 'Automation Without Optimization',
    body: "Processes get faster before anyone fixes what's actually broken.",
  },
  {
    icon: FileText,
    title: 'Consulting Without Execution',
    body: 'Strategy decks land; production systems and ownership rarely follow.',
  },
  {
    icon: TrendingDown,
    title: 'High Spend, Low ROI',
    body: 'AI budgets grow while value realization stays invisible to leadership.',
  },
  {
    icon: Grid3x3,
    title: 'No Operating Model',
    body: 'No playbook to run, measure, and compound intelligence over time.',
  },
];

export function ChallengesSection() {
  return (
    <section className="section" style={{ background: 'var(--canvas)' }}>
      <div className="container">
        <ScrollReveal>
          <p className="eyebrow">ENTERPRISE CHALLENGES</p>
          <h2 className="t-h2" style={{ color: 'var(--ink)', maxWidth: '720px' }}>
            The problem isn&apos;t technology. It&apos;s value realization.
          </h2>
        </ScrollReveal>

        <div className="home-challenges-grid" style={{ marginTop: '48px' }}>
          {CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <ScrollReveal key={card.title} delay={index * 0.08}>
                <div className="card">
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 'var(--r-md)',
                      background: 'var(--indigo-soft)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                      color: 'var(--indigo)',
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="t-h3" style={{ color: 'var(--ink)', marginBottom: '12px' }}>
                    {card.title}
                  </h3>
                  <p className="t-small">{card.body}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
