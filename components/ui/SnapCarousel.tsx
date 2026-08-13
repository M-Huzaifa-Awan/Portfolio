"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CarouselSlide = {
  key: string | number;
  content: ReactNode;
  /** Extra classes for this slide's wrapper (e.g. desktop col-span). */
  className?: string;
};

type SnapCarouselProps = {
  slides: CarouselSlide[];
  /** Track layout: mobile flex/snap classes plus desktop grid overrides. */
  trackClassName: string;
  /** Base slide sizing: mobile width/snap plus desktop resets. */
  slideClassName: string;
  /** Controls visibility, e.g. "lg:hidden" to match the track breakpoint. */
  controlsClassName?: string;
  /** Bay-window 3D effect: side slides angle toward the center. */
  coverflow?: boolean;
};

// The centered/settled slide sits at exactly 0° (fully sharp); the rotation
// only shows while slides are in motion, like turning a page.
const COVERFLOW_ANGLE = 32; // deg
const COVERFLOW_SCALE = 0.1;

/**
 * Horizontal snap gallery with slider affordances — arrows and pagination
 * dots — so it's obvious there are more cards to swipe through. On desktop
 * the track's grid classes take over and the controls are hidden.
 */
export function SnapCarousel({
  slides,
  trackClassName,
  slideClassName,
  controlsClassName,
  coverflow = false,
}: SnapCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const widthRef = useRef(0);
  const [active, setActive] = useState(0);

  // Recompute the active dot and (optionally) the coverflow transforms.
  // Direct style writes inside rAF — no React re-render per scroll frame.
  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    const scrollable = el.scrollWidth > el.clientWidth + 8;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const c = child as HTMLElement;
      const childCenter = c.offsetLeft + c.offsetWidth / 2;
      const dist = Math.abs(childCenter - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
      if (coverflow) {
        if (scrollable) {
          const t = Math.max(
            -1,
            Math.min(1, (childCenter - center) / el.clientWidth),
          );
          const scale = 1 - Math.min(Math.abs(t), 1) * COVERFLOW_SCALE;
          c.style.transform = `perspective(900px) rotateY(${(
            -t * COVERFLOW_ANGLE
          ).toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        } else {
          c.style.transform = "";
        }
      }
    });
    setActive((prev) => (prev === best ? prev : best));
  };

  const onScroll = () => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      update();
    });
  };

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    widthRef.current = el.clientWidth;

    /**
     * Watch the track's own width rather than window resize. On mobile the
     * address bar collapsing as you change scroll direction fires `resize`,
     * and re-measuring every slide there forces a synchronous layout in the
     * middle of a scroll — which reads as a jerk.
     */
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      if (Math.abs(w - widthRef.current) < 1) return;
      widthRef.current = w;
      onScroll();
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = (index: number) => {
    const el = trackRef.current;
    const child = el?.children[index] as HTMLElement | undefined;
    if (!el || !child) return;
    el.scrollTo({
      left: child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div ref={trackRef} onScroll={onScroll} className={trackClassName}>
        {slides.map((slide) => (
          <div key={slide.key} className={cn(slideClassName, slide.className)}>
            {slide.content}
          </div>
        ))}
      </div>

      <div
        className={cn(
          "mt-5 flex items-center justify-center gap-4",
          controlsClassName,
        )}
      >
        <button
          type="button"
          onClick={() => scrollTo(active - 1)}
          disabled={active === 0}
          aria-label="Previous"
          className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white/[0.03] text-ink transition-opacity disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={slide.key}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1} of ${slides.length}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active ? "w-5 bg-accent" : "w-1.5 bg-white/25",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollTo(active + 1)}
          disabled={active === slides.length - 1}
          aria-label="Next"
          className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white/[0.03] text-ink transition-opacity disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}
