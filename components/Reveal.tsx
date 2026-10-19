"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Direction the content travels from */
  from?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  className?: string;
  /** Render as a different element if needed */
  as?: "div" | "section" | "li" | "span";
};

const OFFSET = 26;

export default function Reveal({
  children,
  from = "up",
  delay = 0,
  className = "",
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();

  const offsets: Record<string, { x: number; y: number }> = {
    up: { x: 0, y: OFFSET },
    down: { x: 0, y: -OFFSET },
    left: { x: OFFSET, y: 0 },
    right: { x: -OFFSET, y: 0 },
    none: { x: 0, y: 0 },
  };

  const variants: Variants = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, ...offsets[from] },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Cast the dynamically-selected motion component to a concrete type so JSX
  // doesn't choke on the union of possible element components.
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </MotionTag>
  );
}

/** Staggered container - children using `RevealItem` animate in sequence. */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.12,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
