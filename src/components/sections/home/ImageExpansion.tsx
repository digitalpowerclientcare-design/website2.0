"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=2400";

function useIsMobile(query = "(max-width: 767px)") {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return isMobile;
}

const TEXT_OVERLAY = (
  <>
    <p
      className="mb-4 text-[11px] font-medium tracking-[0.22em] text-white/85 uppercase"
      style={{ textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}
    >
      Why we exist
    </p>
    <h2
      className="max-w-3xl text-4xl font-light leading-[1] tracking-[-0.035em] sm:text-5xl md:text-6xl"
      style={{ textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}
    >
      Strategy decks don&apos;t ship.
      <br />
      <span className="opacity-70">We do.</span>
    </h2>
  </>
);

function MobileBanner() {
  return (
    <section className="relative h-[80svh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(83,58,253,0.55), rgba(129,140,248,0.35), rgba(240,244,255,0.2)), url(${HERO_IMAGE})`,
        }}
        aria-hidden
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        {TEXT_OVERLAY}
        <p
          className="mt-5 max-w-md text-base text-white/85"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
        >
          We&apos;re the only AI consulting firm that diagnoses, implements,
          operates, and guarantees the ROI. Not advisors. Operators.
        </p>
      </div>
    </section>
  );
}

export function ImageExpansion() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined" || isMobile) return;
    const section = sectionRef.current;
    const frame = frameRef.current;
    const textWrap = textWrapRef.current;
    const subtext = subtextRef.current;
    if (!section || !frame || !textWrap) return;

    const ctx = gsap.context(() => {
      const tid = window.setTimeout(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=80%",
            scrub: true,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          frame,
          { width: "60vw", height: "50vh", borderRadius: 24 },
          {
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            ease: "none",
          },
          0,
        );

        tl.fromTo(
          textWrap,
          { scale: 1 },
          { scale: 1.2, ease: "none" },
          0,
        );

        if (subtext) {
          tl.fromTo(
            subtext,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, ease: "none" },
            0.7,
          );
        }

        ScrollTrigger.refresh();
      }, 100);

      return () => window.clearTimeout(tid);
    }, sectionRef);

    const handleResize = () => ScrollTrigger.refresh();
    const ro = new ResizeObserver(handleResize);
    ro.observe(section);
    window.addEventListener("resize", handleResize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, [isMobile]);

  if (isMobile) return <MobileBanner />;

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden bg-[var(--canvas)]"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={frameRef}
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            width: "60vw",
            height: "50vh",
            borderRadius: 24,
            backgroundImage: `linear-gradient(135deg, rgba(83,58,253,0.65), rgba(129,140,248,0.4), rgba(240,244,255,0.15)), url(${HERO_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0 30px 80px rgba(28, 30, 84, 0.25)",
          }}
        >
          <div
            ref={textWrapRef}
            className="relative z-10 flex w-full flex-col items-center justify-center px-8 text-center text-white"
            style={{ transformOrigin: "center center" }}
          >
            {TEXT_OVERLAY}
            <p
              ref={subtextRef}
              className="mt-6 max-w-xl text-base text-white/85 md:text-lg"
              style={{
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                opacity: 0,
              }}
            >
              We&apos;re the only AI consulting firm that diagnoses, implements,
              operates, and guarantees the ROI. Not advisors. Operators.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
