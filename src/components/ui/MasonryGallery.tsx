"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export type MasonryItem = {
  id: string;
  img: string;
  height: number;
  title?: string;
  url?: string;
};

export type MasonryGalleryProps = {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  className?: string;
};

const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  const get = () =>
    values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState<number>(defaultValue);

  useEffect(() => {
    const handler = () => setValue(get());
    handler();
    const lists = queries.map((q) => matchMedia(q));
    lists.forEach((l) => l.addEventListener("change", handler));
    return () => lists.forEach((l) => l.removeEventListener("change", handler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        }),
    ),
  );
};

type GridItem = MasonryItem & {
  x: number;
  y: number;
  w: number;
  h: number;
};

export function MasonryGallery({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  className,
}: MasonryGalleryProps) {
  const columns = useMedia(
    [
      "(min-width: 1500px)",
      "(min-width: 1024px)",
      "(min-width: 768px)",
      "(min-width: 480px)",
    ],
    [5, 4, 3, 2],
    1,
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    preloadImages(items.map((i) => i.img))
      .then(() => setImagesReady(true))
      .catch(() => setImagesReady(true));
  }, [items]);

  const getInitialPos = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === "random") {
      const dirs = ["top", "bottom", "left", "right"] as const;
      direction = dirs[Math.floor(Math.random() * dirs.length)];
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const GAP = 32;
    const colHeights = new Array(columns).fill(0);
    const totalGap = GAP * (columns - 1);
    const colWidth = (width - totalGap) / columns;

    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = (colWidth + GAP) * col;
      const h = (child.height / 600) * colWidth + 40;
      const y = colHeights[col];
      colHeights[col] += h + GAP;
      return { ...child, x, y, w: colWidth, h };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const initial = {
          opacity: 0,
          ...getInitialPos(item),
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: "blur(10px)" }),
        };
        gsap.fromTo(selector, initial, {
          opacity: 1,
          ...animProps,
          ...(blurToFocus && { filter: "blur(0px)" }),
          duration: 0.8,
          ease: "power3.out",
          delay: index * stagger,
        });
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: "auto",
        });
      }
    });

    hasMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, imagesReady]);

  const handleEnter = (id: string, el: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"] .masonry-img`, {
        scale: 1.02,
        duration: 0.35,
        ease: "power2.out",
      });
    }
    const tile = el.querySelector<HTMLElement>(".masonry-tile");
    if (tile) {
      gsap.to(tile, {
        boxShadow: "0 20px 60px rgba(83,58,253,0.12)",
        duration: 0.35,
        ease: "power2.out",
      });
    }
    if (colorShiftOnHover) {
      const overlay = el.querySelector<HTMLElement>(".masonry-overlay");
      if (overlay) gsap.to(overlay, { opacity: 0.35, duration: 0.3 });
    }
  };

  const handleLeave = (id: string, el: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"] .masonry-img`, {
        scale: 1,
        duration: 0.35,
        ease: "power2.out",
      });
    }
    const tile = el.querySelector<HTMLElement>(".masonry-tile");
    if (tile) {
      gsap.to(tile, {
        boxShadow: "0 12px 40px rgba(28,30,84,0.10)",
        duration: 0.35,
        ease: "power2.out",
      });
    }
    if (colorShiftOnHover) {
      const overlay = el.querySelector<HTMLElement>(".masonry-overlay");
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  void hoverScale;

  const totalHeight = useMemo(() => {
    if (!grid.length) return 0;
    return Math.max(...grid.map((g) => g.y + g.h));
  }, [grid]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={{ height: totalHeight }}
    >
      {grid.map((item) => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute cursor-pointer"
          style={{ willChange: "transform, width, height, opacity" }}
          onClick={() => item.url && window.open(item.url, "_blank", "noopener")}
          onMouseEnter={(e) => handleEnter(item.id, e.currentTarget)}
          onMouseLeave={(e) => handleLeave(item.id, e.currentTarget)}
        >
          <div
            className="masonry-tile relative h-full w-full overflow-hidden rounded-2xl"
            style={{ boxShadow: "0 12px 40px rgba(28,30,84,0.10)" }}
          >
            <div
              className="masonry-img absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.img})` }}
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
              aria-hidden
            />
            {colorShiftOnHover && (
              <div
                className="masonry-overlay pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#533AFD]/30 to-[#665EFD]/20 opacity-0"
                aria-hidden
              />
            )}
            {item.title && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end p-4">
                <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-medium tracking-[0.04em] text-[var(--ink)] backdrop-blur-md">
                  {item.title}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
