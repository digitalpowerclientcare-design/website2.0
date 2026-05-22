'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { assetPath } from '@/lib/assetPath';

const links = [
  { href: '/consulting', label: 'Consulting' },
  { href: '/forge-ai', label: 'FORGE AI' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(255,255,255,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled
          ? '1px solid var(--border)'
          : '1px solid transparent',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px',
        }}
      >
        <Link href="/">
          <Image
            src={assetPath('/logos/o3xs-logo.png')}
            alt="O3Xs"
            width={80}
            height={28}
            style={{ objectFit: 'contain' }}
            unoptimized
          />
        </Link>

        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
          }}
          className="hide-mobile"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--ink-2)',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                transition: 'color 0.2s',
              }}
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <MagneticButton href="/contact" className="btn-primary hide-mobile">
          Book a Consultation →
        </MagneticButton>

        <button
          type="button"
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
          }}
        >
          <div
            style={{
              width: 24,
              height: 2,
              background: 'var(--ink)',
              marginBottom: 6,
              transition: 'transform 0.3s',
              transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }}
          />
          <div
            style={{
              width: 24,
              height: 2,
              background: 'var(--ink)',
              opacity: menuOpen ? 0 : 1,
              transition: 'opacity 0.3s',
            }}
          />
          <div
            style={{
              width: 24,
              height: 2,
              background: 'var(--ink)',
              marginTop: menuOpen ? 0 : 6,
              transition: 'transform 0.3s',
              transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: '18px',
                  fontWeight: 500,
                  color: 'var(--ink)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
            <a href="/contact" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
              Book a Consultation →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
