"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type ParallaxProps = {
  children: ReactNode;
  /** Vertical travel in px across the scroll range (positive = moves down slower) */
  speed?: number;
  className?: string;
};

/**
 * Wraps content in a GSAP ScrollTrigger-driven parallax translate.
 * Disabled automatically when the user prefers reduced motion.
 */
export default function Parallax({
  children,
  speed = 80,
  className = "",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced || !ref.current) return;

      gsap.fromTo(
        ref.current,
        { yPercent: -speed / 10 },
        {
          yPercent: speed / 10,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`will-parallax ${className}`}>
      {children}
    </div>
  );
}
