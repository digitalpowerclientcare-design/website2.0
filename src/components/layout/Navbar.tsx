"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV_LINKS, SITE } from "@/lib/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 80,
        end: 99999,
        onEnter: () => nav.classList.add("nav-scrolled"),
        onLeaveBack: () => nav.classList.remove("nav-scrolled"),
      });
    }, nav);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed top-0 z-50 w-full border-b border-transparent bg-[var(--canvas)] transition-[border-color,box-shadow,backdrop-filter] duration-300 [&.nav-scrolled]:border-[var(--border)] [&.nav-scrolled]:bg-white/95 [&.nav-scrolled]:shadow-[0_1px_0_rgba(0,0,0,0.04)] [&.nav-scrolled]:backdrop-blur-md"
    >
      <nav className="content-container flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="relative z-10 flex shrink-0 items-center">
          <Image
            src={SITE.logo}
            alt={`${SITE.name} logo`}
            width={120}
            height={36}
            className="h-8 w-auto object-contain"
            unoptimized
            priority
          />
        </Link>

        <div className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href ||
              pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "nav-link relative text-[16px] tracking-[-0.01em] transition-colors duration-200",
                  active
                    ? "is-active font-semibold text-[var(--indigo)]"
                    : "font-medium text-[var(--ink-secondary)] hover:text-[var(--indigo)]",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <MagneticButton href="/contact" className="hidden sm:inline-flex">
            Book a Consultation →
          </MagneticButton>

          <details className="relative lg:hidden">
            <summary className="cursor-pointer list-none rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium">
              Menu
            </summary>
            <div className="absolute right-0 top-full mt-2 min-w-[200px] rounded-xl border border-[var(--border)] bg-white p-3 shadow-lg">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-[var(--surface)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
