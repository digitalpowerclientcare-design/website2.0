"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MasonryGallery, type MasonryItem } from "@/components/ui/MasonryGallery";

const ITEMS: MasonryItem[] = [
  {
    id: "1",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=600",
    height: 400,
    title: "SDLC Verification Pipeline",
  },
  {
    id: "2",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    height: 250,
    title: "Healthcare AI Workflow",
  },
  {
    id: "3",
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600",
    height: 600,
    title: "Legal Document Intelligence",
  },
  {
    id: "4",
    img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=600",
    height: 350,
    title: "Marketing Orchestration",
  },
  {
    id: "5",
    img: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80&w=600",
    height: 500,
    title: "Process Intelligence",
  },
  {
    id: "6",
    img: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=600",
    height: 450,
    title: "Compliance Audit Trail",
  },
];

export function WorkSamples() {
  return (
    <section
      className="relative bg-white"
      style={{ paddingTop: 120, paddingBottom: 96 }}
    >
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="eyebrow mb-3">Work Samples</p>
          <h2 className="heading-section mb-3">A glimpse of what we&apos;ve built.</h2>
          <p className="body-lg">Production systems, not slides.</p>
        </div>

        <MasonryGallery
          items={ITEMS}
          animateFrom="bottom"
          blurToFocus
          stagger={0.08}
          scaleOnHover
          colorShiftOnHover
        />

        <div className="mt-12 flex justify-center">
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 text-[15px] font-medium text-[var(--indigo)] transition-opacity hover:opacity-80"
          >
            View all work
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
