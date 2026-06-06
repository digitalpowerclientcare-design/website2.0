"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";
import { MobileNavDropdown, NavDropdown } from "@/components/layout/NavDropdown";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";
import { isNavItemActive, NAV_ITEMS } from "@/lib/navContent";
import { SITE } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

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

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      ref={navRef}
      className="fixed top-0 z-50 w-full border-b border-transparent bg-[var(--canvas)] transition-[border-color,box-shadow,backdrop-filter] duration-300 [&.nav-scrolled]:border-[var(--border)] [&.nav-scrolled]:bg-white/95 [&.nav-scrolled]:shadow-[0_1px_0_rgba(0,0,0,0.04)] [&.nav-scrolled]:backdrop-blur-md"
    >
      <nav className="content-container grid h-[72px] grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-4">
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

        <div className="hidden min-w-0 items-center justify-center xl:flex">
          <ul className="flex max-w-full flex-nowrap items-center gap-x-5 2xl:gap-x-6">
            {NAV_ITEMS.map((item) => {
              if (item.type === "dropdown") {
                return (
                  <NavDropdown
                    key={item.label}
                    item={item}
                    open={openDropdown === item.label}
                    onOpen={() => setOpenDropdown(item.label)}
                    onClose={() =>
                      setOpenDropdown((current) =>
                        current === item.label ? null : current,
                      )
                    }
                  />
                );
              }

              const active = isNavItemActive(pathname, item);
              return (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    className={cn(
                      "nav-link whitespace-nowrap text-[14px] tracking-[-0.01em] transition-colors duration-200 2xl:text-[15px]",
                      active
                        ? "is-active font-semibold text-[var(--indigo)]"
                        : "font-medium text-[var(--ink-secondary)] hover:text-[var(--indigo)]",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative flex shrink-0 items-center justify-end gap-2 sm:gap-3 sm:pl-2 md:pl-4">
          <MagneticButton
            href="/contact?interest=consultation"
            className="hidden shrink-0 whitespace-nowrap text-[15px] font-semibold sm:inline-flex !px-5 md:!px-6"
          >
            Book a Consultation →
          </MagneticButton>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--ink)] transition-colors hover:border-[var(--indigo)]/40 hover:bg-[var(--surface)] xl:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {mobileOpen && (
            <>
              <button
                type="button"
                className="fixed inset-0 top-[72px] z-40 bg-black/20 xl:hidden"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              />
              <div
                id="mobile-nav-menu"
                className="absolute top-[calc(100%+0.5rem)] right-0 z-50 max-h-[min(75vh,560px)] w-[min(calc(100vw-2rem),320px)] overflow-y-auto rounded-xl border border-[var(--border)] bg-white p-2 shadow-[0_16px_48px_rgba(0,0,0,0.12)] xl:hidden"
              >
                <ul className="flex flex-col">
                  {NAV_ITEMS.map((item) => {
                    if (item.type === "dropdown") {
                      return (
                        <MobileNavDropdown
                          key={item.label}
                          item={item}
                          expanded={mobileExpanded === item.label}
                          onToggle={() =>
                            setMobileExpanded((current) =>
                              current === item.label ? null : item.label,
                            )
                          }
                          onNavigate={() => setMobileOpen(false)}
                        />
                      );
                    }

                    const active = isNavItemActive(pathname, item);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "block rounded-lg px-3 py-2.5 text-[14px] transition-colors",
                            active
                              ? "bg-[var(--indigo-bg)] font-semibold text-[var(--indigo)]"
                              : "font-medium text-[var(--ink-secondary)] hover:bg-[var(--surface)] hover:text-[var(--ink)]",
                          )}
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-2 border-t border-[var(--border)] p-2 sm:hidden">
                  <Link
                    href="/contact?interest=consultation"
                    className="flex w-full items-center justify-center rounded-full bg-[var(--indigo)] px-4 py-3 text-[14px] font-medium text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    Book a Consultation →
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
