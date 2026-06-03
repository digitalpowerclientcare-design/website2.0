import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/site";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/ui/SocialIcons";

const SOCIAL = [
  { icon: LinkedInIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: GitHubIcon, href: "https://github.com", label: "GitHub" },
] as const;

const FOOTER_COMPANY = [
  { href: "/our-purpose", label: "Our Purpose" },
  { href: "/about-us", label: "About Us" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/pricing", label: "Pricing" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--canvas)]">
      <div className="content-container grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Image
            src={SITE.logo}
            alt={`${SITE.name} logo`}
            width={100}
            height={30}
            className="h-7 w-auto"
            unoptimized
          />
          <p className="max-w-xs text-sm text-[var(--ink-secondary)]">
            {SITE.tagline}
          </p>
          <p className="text-xs text-[var(--ink-muted)]">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>

        <div>
          <p className="caption mb-4">Company</p>
          <ul className="space-y-2 text-sm text-[var(--ink-secondary)]">
            {FOOTER_COMPANY.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[var(--indigo)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="caption mb-4">Services</p>
          <ul className="space-y-2 text-sm text-[var(--ink-secondary)]">
            {NAV_LINKS.filter(
              (l) =>
                l.href === "/consultation" ||
                l.href === "/forge-ai" ||
                l.href === "/pricing",
            ).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[var(--indigo)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="caption mb-4">Contact</p>
          <Link
            href="/contact"
            className="mb-3 block text-sm text-[var(--ink-secondary)] hover:text-[var(--indigo)]"
          >
            Contact Us
          </Link>
          <a
            href={`mailto:${SITE.email}`}
            className="text-sm text-[var(--indigo)] hover:underline"
          >
            {SITE.email}
          </a>
          <div className="mt-4 flex gap-3">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="rounded-full border border-[var(--border)] p-2 text-[var(--ink-secondary)] transition-colors hover:border-[var(--indigo)] hover:text-[var(--indigo)]"
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
