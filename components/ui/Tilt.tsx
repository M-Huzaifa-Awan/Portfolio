"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** True only for mouse-like pointers; cached after first check. */
let fine: boolean | null = null;
function finePointer() {
  if (fine === null) {
    fine =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }
  return fine;
}

type TiltProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
};

/**
 * Generic cursor-driven 3D tilt wrapper (same mechanics as SpotlightCard's
 * `tilt`): CSS variables + the `.card-tilt` transform in globals.css, so it
 * is transform-only, desktop pointers only, and composes with children that
 * animate their own transforms (hover lifts, framer entrances).
 */
export function Tilt({ children, className, max = 3 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!finePointer()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(x - 0.5) * 2 * max}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * 2 * max}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("card-tilt", className)}
    >
      {children}
    </div>
  );
}
