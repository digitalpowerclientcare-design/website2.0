"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type TextRollButtonProps = {
  href: string;
  label: string;
  variant?: "indigo" | "dark" | "ghost" | "white";
  className?: string;
};

export function TextRollButton({
  href,
  label,
  variant = "indigo",
  className,
}: TextRollButtonProps) {
  const roll = (
    <span className="flex h-6 flex-col overflow-hidden">
      <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
        <span className="leading-6">{label}</span>
        <span className="leading-6">{label}</span>
      </span>
    </span>
  );

  if (variant === "ghost") {
    return (
      <Link
        href={href}
        className={cn(
          "group inline-flex items-center gap-2 text-[15px] font-medium text-[var(--indigo)]",
          className,
        )}
      >
        {roll}
        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-45" />
      </Link>
    );
  }

  const styles =
    variant === "dark"
      ? "bg-[var(--ink)] text-white hover:bg-[var(--brand-dark)]"
      : variant === "white"
        ? "bg-white text-[var(--brand-dark)] hover:bg-white/90"
        : "bg-[var(--indigo)] text-white hover:bg-[var(--indigo-light)]";

  const iconStyles =
    variant === "white"
      ? "bg-[var(--indigo)] text-white"
      : variant === "dark"
        ? "bg-white text-[var(--ink)]"
        : "bg-white text-[var(--indigo)]";

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full py-3 pl-7 pr-2.5 text-[16px] font-semibold tracking-[-0.01em] transition-colors duration-300",
        styles,
        className,
      )}
    >
      {roll}
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-500 group-hover:-rotate-45",
          iconStyles,
        )}
      >
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
