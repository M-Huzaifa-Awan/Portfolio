"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A soft orange glow that trails the cursor across the whole page.
 * Uses a rAF loop + direct style writes so it never triggers React re-renders.
 *
 * Nothing is rendered on touch devices: `mix-blend-mode` forces the browser
 * to blend this layer against the page behind it on every composite, which
 * costs real frames while scrolling on a phone even when it is invisible.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;
      el.style.transform = `translate3d(${pos.x - 300}px, ${pos.y - 300}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 h-[600px] w-[600px] opacity-0 mix-blend-screen transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(circle, rgba(255,107,53,0.10) 0%, rgba(255,107,53,0.04) 30%, transparent 60%)",
      }}
    />
  );
}
