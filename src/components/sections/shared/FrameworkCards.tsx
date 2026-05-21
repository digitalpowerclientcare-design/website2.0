"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Stage = {
  index: number;
  name: string;
  title: string;
  description: string;
  tags: string[];
  pillBg: string;
  pillText: string;
  glow: string;
  image: string;
};

const STAGES: Stage[] = [
  {
    index: 1,
    name: "OPTIMIZE",
    title: "Optimize",
    description:
      "We map value leakage across operations, engineering, and go-to-market before touching tools. Diagnose before automating.",
    tags: ["Diagnostic", "Audit", "Roadmap"],
    pillBg: "rgba(59,130,246,0.15)",
    pillText: "#60A5FA",
    glow: "rgba(59,130,246,0.25)",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
  },
  {
    index: 2,
    name: "ORCHESTRATE",
    title: "Orchestrate",
    description:
      "We integrate AI and workflow intelligence where ROI is provable. No rip-and-replace — your existing systems, augmented.",
    tags: ["Integration", "Workflow", "Automation"],
    pillBg: "rgba(16,185,129,0.15)",
    pillText: "#34D399",
    glow: "rgba(16,185,129,0.25)",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
  },
  {
    index: 3,
    name: "OPERATE",
    title: "Operate",
    description:
      "We don't hand over and disappear. Post-deployment, we monitor KPIs, detect drift, and own the performance outcomes.",
    tags: ["Monitoring", "SLAs", "Accountability"],
    pillBg: "rgba(168,85,247,0.15)",
    pillText: "#C084FC",
    glow: "rgba(168,85,247,0.25)",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200",
  },
  {
    index: 4,
    name: "INNOVATE",
    title: "Innovate",
    description:
      "As we operate, we identify next-generation optimization opportunities. Innovation becomes systematic, not episodic.",
    tags: ["R&D", "Predictive", "Agents"],
    pillBg: "rgba(245,158,11,0.15)",
    pillText: "#FBBF24",
    glow: "rgba(245,158,11,0.25)",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200",
  },
  {
    index: 5,
    name: "SCALE",
    title: "Scale",
    description:
      "Proven solutions replicated across functions, geographies, and business units. One fix becomes an institutional operating model.",
    tags: ["Replication", "Playbooks", "Platforms"],
    pillBg: "rgba(83,58,253,0.15)",
    pillText: "#818CF8",
    glow: "rgba(83,58,253,0.25)",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
  },
];

const STICKY_TOPS = [80, 96, 112, 128, 144];

function StageCard({
  stage,
  total,
  cardRef,
}: {
  stage: Stage;
  total: number;
  cardRef: (el: HTMLElement | null) => void;
}) {
  return (
    <article
      ref={cardRef}
      className="framework-card relative overflow-hidden rounded-3xl border md:h-[480px]"
      style={{
        backgroundColor: "#0A0A14",
        borderColor: "rgba(255,255,255,0.08)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        willChange: "transform, opacity",
      }}
    >
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        <div className="relative h-[200px] w-full overflow-hidden md:h-full">
          <Image
            src={stage.image}
            alt={`${stage.title} stage`}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 550px"
          />
          <div
            className="pointer-events-none absolute inset-0 hidden md:block"
            style={{
              background:
                "linear-gradient(to right, transparent 70%, rgba(10,10,20,0.4) 100%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 md:hidden"
            style={{
              background:
                "linear-gradient(to bottom, transparent 60%, rgba(10,10,20,0.55) 100%)",
            }}
            aria-hidden
          />
        </div>

        <div
          className="relative flex flex-col p-6 md:p-14"
          style={{
            backgroundImage: `radial-gradient(circle at top right, ${stage.glow} 0%, transparent 50%)`,
          }}
        >
          <div className="flex items-center">
            <span
              className="rounded-full px-3.5 py-1.5 text-[12px] font-semibold tracking-[0.05em] uppercase"
              style={{
                backgroundColor: stage.pillBg,
                color: stage.pillText,
              }}
            >
              {stage.name}
            </span>
            <span className="font-stat ml-3 text-[13px] text-white/40">
              {String(stage.index).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mt-5 text-[32px] leading-[1.05] font-semibold tracking-[-0.04em] text-white md:mt-6 md:text-[44px]">
            {stage.title}
          </h3>
          <p className="mt-4 max-w-[360px] text-[15px] leading-[1.6] text-white/65 md:mt-5">
            {stage.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2 md:mt-7">
            {stage.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[12px] font-medium text-white/70"
              >
                {t}
              </span>
            ))}
          </div>

          <Link
            href="/consulting"
            className="group/cta mt-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-white md:mt-auto md:pt-8"
          >
            See deliverables
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

type FrameworkCardsProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  background?: "surface-alt" | "white";
};

/** Dark deck-of-cards Framework section. Used on Home and Consulting. */
export function FrameworkCards({
  eyebrow = "What we do",
  title = "The O3Xs Framework",
  subtitle = "Optimize · Orchestrate · Operate · Innovate · Scale",
  background = "surface-alt",
}: FrameworkCardsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const tid = window.setTimeout(() => {
        const cards = cardRefs.current.filter(Boolean) as HTMLElement[];

        for (let i = 1; i < cards.length; i++) {
          const prev = cards[i - 1];
          const cur = cards[i];
          gsap.to(prev, {
            scale: 0.96,
            opacity: 0.6,
            ease: "none",
            scrollTrigger: {
              trigger: cur,
              start: "top 80%",
              end: "top 30%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }

        ScrollTrigger.refresh();
      }, 100);

      return () => window.clearTimeout(tid);
    }, sectionRef);

    const handleResize = () => ScrollTrigger.refresh();
    const ro = new ResizeObserver(handleResize);
    if (sectionRef.current) ro.observe(sectionRef.current);
    window.addEventListener("resize", handleResize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  const bg =
    background === "white" ? "bg-white" : "bg-[var(--surface-alt)]";

  return (
    <section
      ref={sectionRef}
      id="framework"
      className={`relative ${bg}`}
      style={{ paddingTop: 96, paddingBottom: 96 }}
    >
      <div className="content-container mb-16">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="heading-section">{title}</h2>
        <p className="body-lg mt-3">{subtitle}</p>
      </div>

      <div className="content-container max-w-[1140px]">
        {STAGES.map((stage, i) => {
          const top = STICKY_TOPS[Math.min(i, STICKY_TOPS.length - 1)];
          return (
            <div
              key={stage.index}
              className="relative mb-6 md:mb-0 md:min-h-[70vh]"
            >
              <div className="md:sticky" style={{ top, zIndex: i + 1 }}>
                <StageCard
                  stage={stage}
                  total={STAGES.length}
                  cardRef={(el) => {
                    cardRefs.current[i] = el;
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
