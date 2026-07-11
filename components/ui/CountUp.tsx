"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type CountUpProps = {
  /** Display string, e.g. "95%", "<50ms", "3+", "5.0", "18". */
  value: string;
  /** Seconds to wait after entering view (e.g. to outlast the intro loader). */
  delay?: number;
  duration?: number;
  className?: string;
};

/**
 * Animates the numeric part of a stat string from 0 to its value when it
 * scrolls into view, preserving any prefix/suffix ("<50ms" counts the 50).
 * Falls back to static text when there is no number or the user prefers
 * reduced motion.
 */
export function CountUp({
  value,
  delay = 0,
  duration = 0.9,
  className,
}: CountUpProps) {
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [text, setText] = useState(() => {
    if (!match) return value;
    const decimals = match[2].split(".")[1]?.length ?? 0;
    return `${match[1]}${(0).toFixed(decimals)}${match[3]}`;
  });

  useEffect(() => {
    if (!inView || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(value);
      return;
    }
    const [, prefix, num, suffix] = match;
    const target = parseFloat(num);
    const decimals = num.split(".")[1]?.length ?? 0;
    let raf = 0;
    const timer = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / (duration * 1000));
        const eased = 1 - Math.pow(1 - t, 3);
        setText(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay * 1000);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
