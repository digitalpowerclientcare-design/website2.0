'use client';

import { motion } from 'motion/react';
import { CanvasGradientMesh } from '@/components/ui/CanvasGradientMesh';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <CanvasGradientMesh />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          paddingTop: '160px',
          paddingBottom: '120px',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '780px' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'var(--indigo-soft)',
              border: '1px solid var(--indigo-mid)',
              borderRadius: 'var(--r-pill)',
              padding: '8px 16px',
              marginBottom: '32px',
            }}
          >
            <span
              className="pulse-dot-badge"
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#10B981',
                display: 'block',
              }}
            />
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink-2)' }}>
              FORGE AI · Private Beta
            </span>
          </motion.div>

          <motion.h1
            className="t-display"
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            We build AI systems that{' '}
            <span
              style={{
                background: 'var(--grad-indigo)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              engineer trust
            </span>{' '}
            into software delivery.
          </motion.h1>

          <motion.p
            className="t-body"
            style={{
              fontSize: '18px',
              maxWidth: '560px',
              margin: '24px auto 0',
              color: 'var(--ink-2)',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            O3Xs diagnoses where your operations leak value, implements AI to stop it,
            and operates the solution until results compound.
          </motion.p>

          <motion.div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              marginTop: '40px',
              flexWrap: 'wrap',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
          >
            <MagneticButton
              href="/contact"
              className="btn-primary"
              style={{ fontSize: '16px', padding: '16px 32px' }}
            >
              Book a Consultation →
            </MagneticButton>
            <MagneticButton
              href="/forge-ai"
              className="btn-ghost"
              style={{ fontSize: '16px', padding: '16px 32px' }}
            >
              Explore FORGE AI
            </MagneticButton>
          </motion.div>

          <motion.div
            style={{
              display: 'flex',
              gap: '24px',
              justifyContent: 'center',
              marginTop: '48px',
              flexWrap: 'wrap',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
          >
            {['6 Verification Agents', 'Server-Side Verified', 'SOC2 Ready'].map((badge) => (
              <span
                key={badge}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--ink-3)',
                  background: 'rgba(255,255,255,0.8)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-pill)',
                  padding: '8px 16px',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span style={{ color: 'var(--indigo)', fontSize: '16px' }}>✦</span>
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 1,
        }}
      >
        <div
          className="scroll-indicator-line"
          style={{
            width: 1,
            height: 48,
            background: 'var(--indigo-mid)',
          }}
        />
        <span className="t-label" style={{ marginBottom: 0 }}>scroll</span>
      </div>
    </section>
  );
}
