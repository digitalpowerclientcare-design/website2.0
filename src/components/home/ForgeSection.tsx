'use client';

import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const AGENTS = [
  { id: 'A', name: 'Intent Parser', status: 'completed' },
  { id: 'B', name: 'Code Verifier', status: 'completed' },
  { id: 'C', name: 'Target Resolver', status: 'completed' },
  { id: 'D', name: 'Patch Applier', status: 'processing' },
  { id: 'E', name: 'Compliance Logger', status: 'completed' },
  { id: 'F', name: 'Audit Exporter', status: 'completed' },
];

const FEATURES = [
  'EDIT_TARGETS hallucination prevention',
  'Server-side codebase verification',
  'SOC2-compliant audit trail',
];

export function ForgeSection() {
  return (
    <section className="section" style={{ background: 'var(--surface-alt)' }}>
      <div className="container-wide home-forge-grid" style={{ alignItems: 'center', gap: '64px' }}>
        <ScrollReveal direction="left">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            <span
              className="pulse-dot-badge"
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#10B981',
              }}
            />
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink-2)' }}>
              Live · Private Beta
            </span>
          </div>
          <p className="eyebrow">OUR PRODUCT</p>
          <h2 className="t-h1" style={{ color: 'var(--ink)' }}>FORGE AI</h2>
          <p className="t-body" style={{ marginTop: '20px' }}>
            The verification layer between AI code generation and production. Six agents.
            Server-side verified. SOC2-ready audit trail.
          </p>
          <ul style={{ listStyle: 'none', marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FEATURES.map((f) => (
              <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: 'var(--ink-2)' }}>
                <Check size={18} color="var(--emerald)" />
                {f}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '32px' }}>
            <MagneticButton href="/forge-ai" className="btn-primary">
              Explore FORGE AI →
            </MagneticButton>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.15}>
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                width: 400,
                height: 400,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(80,70,229,0.12), transparent 70%)',
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                background: 'var(--brand-dark)',
                borderRadius: 'var(--r-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl), 0 0 80px rgba(80,70,229,0.15)',
                transform: 'perspective(1200px) rotateY(-8deg) rotateX(3deg)',
                transition: 'transform 0.4s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'perspective(1200px) rotateY(-4deg) rotateX(1deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1200px) rotateY(-8deg) rotateX(3deg)';
              }}
            >
              <div
                style={{
                  padding: '14px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {['#FF5F57', '#FFBD2E', '#28CA41'].map((c) => (
                  <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                ))}
                <span style={{ marginLeft: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                  FORGE AI — Agent Pipeline
                </span>
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {AGENTS.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      borderRadius: 'var(--r-md)',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '8px',
                          background: 'var(--indigo)',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 600,
                        }}
                      >
                        {agent.id}
                      </span>
                      <span style={{ color: 'white', fontSize: '14px' }}>{agent.name}</span>
                    </div>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: agent.status === 'completed' ? 'var(--emerald)' : '#F59E0B',
                      }}
                    />
                  </motion.div>
                ))}
              </div>
              <div
                style={{
                  padding: '14px 20px',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  fontSize: '12px',
                  color: 'var(--emerald)',
                }}
              >
                6/6 agents complete · Verified ✓ · SOC2 logged
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
