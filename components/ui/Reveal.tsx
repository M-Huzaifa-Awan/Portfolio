"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useIsMobile } from "@/lib/useIsMobile";

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  }),
};

// Mobile: opacity-only, no stagger, and a short duration. Translating
// elements as they enter the viewport reads as scroll jank on phones, and
// stagger delays make content feel late while the user keeps scrolling.
const mobileVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    // Server markup renders the desktop hidden state (y: 28) before the
    // mobile variants take over, so y must be animated back to 0 here or
    // content sits 28px low and clips inside overflow-hidden cards.
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayIndex?: number;
  as?: "div" | "li" | "section" | "span";
};

export function Reveal({
  children,
  className,
  delayIndex = 0,
  as = "div",
}: RevealProps) {
  const isMobile = useIsMobile();
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      custom={delayIndex}
      variants={isMobile ? mobileVariants : variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: isMobile ? "-40px" : "-80px" }}
    >
      {children}
    </MotionTag>
  );
}
