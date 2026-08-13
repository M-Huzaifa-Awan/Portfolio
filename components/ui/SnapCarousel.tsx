"use client";

import { useRef, useState, type ReactNode } from "react";
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
};

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
}: SnapCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Active slide = the child whose center is closest to the viewport center.
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const c = child as HTMLElement;
      const dist = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive((prev) => (prev === best ? prev : best));
  };

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
