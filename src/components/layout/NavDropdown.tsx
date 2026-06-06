"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Cpu,
  FileText,
  Layers3,
  Newspaper,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  isNavItemActive,
  type NavDropdownItem,
  type NavDropdownTile,
  type NavTileVariant,
} from "@/lib/navContent";

const TILE_ICONS: Record<NavTileVariant, LucideIcon> = {
  consultation: Layers3,
  forge: Cpu,
  blog: Newspaper,
  publications: BookOpen,
};

const TILE_ACCENT: Record<
  NavTileVariant,
  { icon: string; border: string; pill: string; glow: string }
> = {
  consultation: {
    icon: "bg-[var(--emerald)]/12 text-[var(--emerald)]",
    border: "group-hover:border-[var(--emerald)]/35",
    pill: "bg-[var(--emerald)]/8 text-[var(--emerald)]",
    glow: "from-[var(--emerald)]/8",
  },
  forge: {
    icon: "bg-[var(--indigo)]/12 text-[var(--indigo)]",
    border: "group-hover:border-[var(--indigo)]/40",
    pill: "bg-[var(--indigo-bg)] text-[var(--indigo)]",
    glow: "from-[var(--indigo)]/10",
  },
  blog: {
    icon: "bg-[#0ea5e9]/12 text-[#0284c7]",
    border: "group-hover:border-[#0ea5e9]/35",
    pill: "bg-[#0ea5e9]/8 text-[#0369a1]",
    glow: "from-[#0ea5e9]/8",
  },
  publications: {
    icon: "bg-[var(--brand-dark)]/10 text-[var(--brand-dark)]",
    border: "group-hover:border-[var(--brand-dark)]/25",
    pill: "bg-[var(--brand-dark)]/8 text-[var(--brand-dark)]",
    glow: "from-[var(--brand-dark)]/8",
  },
};

type MegaMenuPanelProps = {
  item: NavDropdownItem;
  onNavigate?: () => void;
  compact?: boolean;
};

function MegaMenuTile({
  tile,
  onNavigate,
  compact,
}: {
  tile: NavDropdownTile;
  onNavigate?: () => void;
  compact?: boolean;
}) {
  const pathname = usePathname();
  const active =
    pathname === tile.href || pathname.startsWith(`${tile.href}/`);
  const Icon = TILE_ICONS[tile.variant];
  const accent = TILE_ACCENT[tile.variant];

  return (
    <Link
      href={tile.href}
      onClick={onNavigate}
      className={cn(
        "group relative flex gap-4 overflow-hidden transition-all duration-300",
        compact ? "rounded-xl border p-4" : "p-5 md:p-6",
        compact
          ? active
            ? "border-[var(--indigo)] bg-[var(--indigo-bg)]/40"
            : cn("border-[var(--border)] bg-white", accent.border)
          : active
            ? "bg-[var(--indigo-bg)]/50"
            : cn("hover:bg-[var(--surface)]", accent.border),
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          accent.glow,
        )}
        aria-hidden
      />

      <div
        className={cn(
          "relative z-10 flex shrink-0 items-center justify-center rounded-xl",
          compact ? "h-10 w-10" : "h-12 w-12",
          accent.icon,
        )}
      >
        <Icon size={compact ? 18 : 22} strokeWidth={1.75} />
      </div>

      <div className="relative z-10 min-w-0 flex-1">
        <p className="text-[10px] font-semibold tracking-[0.16em] text-[var(--ink-muted)] uppercase">
          {tile.eyebrow}
        </p>
        <p
          className={cn(
            "mt-1 font-semibold tracking-[-0.02em] text-[var(--ink)] transition-colors group-hover:text-[var(--indigo)]",
            compact ? "text-[15px]" : "text-[17px]",
          )}
        >
          {tile.label}
        </p>
        <p
          className={cn(
            "mt-2 leading-relaxed text-[var(--ink-secondary)]",
            compact ? "text-[12px]" : "text-[13px]",
          )}
        >
          {tile.description}
        </p>

        {!compact && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {tile.highlights.map((point) => (
              <li
                key={point}
                className={cn(
                  "rounded-md px-2 py-0.5 text-[10px] font-medium tracking-wide",
                  accent.pill,
                )}
              >
                {point}
              </li>
            ))}
          </ul>
        )}

        <span
          className={cn(
            "mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--indigo)] transition-all duration-300",
            "translate-x-0 group-hover:translate-x-0.5",
          )}
        >
          {tile.ctaLabel}
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}

function MegaMenuPanel({ item, onNavigate, compact }: MegaMenuPanelProps) {
  if (compact) {
    return (
      <div className="grid gap-3">
        {item.tiles.map((tile) => (
          <MegaMenuTile key={tile.href} tile={tile} onNavigate={onNavigate} compact />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)]/80 bg-white shadow-[0_28px_80px_rgba(28,30,84,0.16),0_8px_24px_rgba(0,0,0,0.06)]">
      <div className="grid md:grid-cols-[220px_1fr]">
        <aside
          className="relative overflow-hidden px-6 py-7 md:py-8"
          style={{ backgroundColor: "var(--brand-dark)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(83,58,253,0.45), transparent 55%), radial-gradient(ellipse 60% 50% at 90% 90%, rgba(16,185,129,0.2), transparent 50%)",
            }}
            aria-hidden
          />
          <div className="relative z-10">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-white/45 uppercase">
              {item.panelEyebrow}
            </p>
            <h3 className="mt-3 text-[18px] leading-snug font-medium tracking-[-0.02em] text-white">
              {item.panelTitle}
            </h3>
            <p className="mt-3 text-[12px] leading-relaxed text-white/60">
              {item.panelSubtitle}
            </p>
            <div className="mt-6 hidden h-px w-10 bg-white/20 md:block" aria-hidden />
            <p className="mt-6 hidden text-[11px] leading-relaxed text-white/40 md:block">
              Select a capability to explore how O3Xs delivers measurable enterprise outcomes.
            </p>
          </div>
        </aside>

        <div className="divide-y divide-[var(--border)]">
          {item.tiles.map((tile) => (
            <MegaMenuTile key={tile.href} tile={tile} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--border)] bg-[var(--surface)] px-5 py-3">
        <span className="inline-flex items-center gap-2 text-[11px] text-[var(--ink-muted)]">
          <FileText size={13} aria-hidden />
          Enterprise-grade delivery · US & global clients
        </span>
        <Link
          href="/case-studies"
          onClick={onNavigate}
          className="text-[11px] font-semibold text-[var(--indigo)] transition-colors hover:text-[var(--indigo-deep)]"
        >
          View case studies →
        </Link>
      </div>
    </div>
  );
}

type NavDropdownProps = {
  item: NavDropdownItem;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export function NavDropdown({ item, open, onOpen, onClose }: NavDropdownProps) {
  const pathname = usePathname();
  const active = isNavItemActive(pathname, item);

  return (
    <li
      className="relative shrink-0"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => (open ? onClose() : onOpen())}
        className={cn(
          "nav-link inline-flex items-center gap-1 whitespace-nowrap text-[14px] tracking-[-0.01em] transition-colors duration-200 2xl:text-[15px]",
          active || open
            ? "is-active font-semibold text-[var(--indigo)]"
            : "font-medium text-[var(--ink-secondary)] hover:text-[var(--indigo)]",
        )}
      >
        {item.label}
        <ChevronDown
          size={15}
          className={cn(
            "transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 z-50 w-[min(92vw,620px)] -translate-x-1/2 pt-3"
          >
            <MegaMenuPanel item={item} onNavigate={onClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

type MobileNavDropdownProps = {
  item: NavDropdownItem;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
};

export function MobileNavDropdown({
  item,
  expanded,
  onToggle,
  onNavigate,
}: MobileNavDropdownProps) {
  const pathname = usePathname();
  const active = isNavItemActive(pathname, item);

  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[14px] transition-colors",
          active
            ? "bg-[var(--indigo-bg)] font-semibold text-[var(--indigo)]"
            : "font-medium text-[var(--ink-secondary)] hover:bg-[var(--surface)]",
        )}
      >
        {item.label}
        <ChevronDown
          size={16}
          className={cn("shrink-0 transition-transform", expanded && "rotate-180")}
          aria-hidden
        />
      </button>
      {expanded && (
        <div className="px-2 pb-3 pt-1">
          <p className="mb-3 px-1 text-[11px] leading-relaxed text-[var(--ink-muted)]">
            {item.panelSubtitle}
          </p>
          <MegaMenuPanel item={item} onNavigate={onNavigate} compact />
        </div>
      )}
    </li>
  );
}
