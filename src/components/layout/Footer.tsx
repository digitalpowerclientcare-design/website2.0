import Image from 'next/image';
import Link from 'next/link';
import { assetPath } from '@/lib/assetPath';
import {
  LinkedInIcon,
  TwitterIcon,
  InstagramIcon,
} from '@/components/ui/SocialIcons';

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--canvas)',
        borderTop: '1px solid var(--border)',
        padding: '64px 0 48px',
      }}
    >
      <div className="container home-footer-grid">
        <div>
          <Image
            src={assetPath('/logos/o3xs-logo.png')}
            alt="O3Xs"
            width={80}
            height={28}
            unoptimized
          />
          <p
            style={{
              fontSize: '14px',
              color: 'var(--ink-3)',
              maxWidth: '240px',
              marginTop: '16px',
              lineHeight: 1.6,
            }}
          >
            We build AI systems that engineer trust into software delivery.
          </p>
          <p style={{ fontSize: '12px', color: 'var(--ink-4)', marginTop: '24px' }}>
            © 2026 O3Xs. All rights reserved.
          </p>
        </div>

        <div>
          <p className="t-label" style={{ marginBottom: '16px' }}>Company</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link href="/about" style={{ fontSize: '14px', color: 'var(--ink-2)', textDecoration: 'none' }}>Why We Exist</Link></li>
            <li><Link href="/consulting" style={{ fontSize: '14px', color: 'var(--ink-2)', textDecoration: 'none' }}>How We Work</Link></li>
            <li><Link href="/about" style={{ fontSize: '14px', color: 'var(--ink-2)', textDecoration: 'none' }}>About Us</Link></li>
          </ul>
        </div>

        <div>
          <p className="t-label" style={{ marginBottom: '16px' }}>Products</p>
          <Link href="/forge-ai" style={{ fontSize: '14px', color: 'var(--ink-2)', textDecoration: 'none' }}>FORGE AI</Link>
        </div>

        <div>
          <p className="t-label" style={{ marginBottom: '16px' }}>Contact</p>
          <a href="mailto:contact@o3xs.com" style={{ fontSize: '14px', color: 'var(--indigo)', textDecoration: 'none' }}>
            contact@o3xs.com
          </a>
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            {[
              { Icon: LinkedInIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
              { Icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
              { Icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--ink-2)',
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
