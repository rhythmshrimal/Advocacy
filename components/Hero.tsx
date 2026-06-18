"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Parallax from "./Parallax";
import Photo from "./Photo";
import { site } from "@/lib/site";

/** Decorative courthouse-column backdrop — replace with real chamber/court photography when available. */
function ColumnMotif() {
  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="col" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B08D45" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#B08D45" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g fill="url(#col)">
        {[120, 320, 520, 720, 920, 1120].map((x) => (
          <rect key={x} x={x} y="60" width="56" height="700" rx="4" />
        ))}
      </g>
      {/* entablature line */}
      <rect x="40" y="40" width="1120" height="10" fill="#B08D45" opacity="0.12" />
    </svg>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-navy-900">
      {/* Optional background photograph (parallax). Shows the column motif until a photo is set. */}
      <div className="pointer-events-none absolute inset-0">
        <Parallax speed={120} className="absolute inset-0">
          {site.images.hero ? (
            <div className="relative h-[120%] w-full opacity-40">
              <Photo src={site.images.hero} alt="" fill priority sizes="100vw" />
            </div>
          ) : (
            <div className="h-[120%] w-full opacity-90">
              <ColumnMotif />
            </div>
          )}
        </Parallax>
      </div>

      {/* gradient overlays for depth + legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-900/85 to-navy-800" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_30%,rgba(176,141,69,0.10),transparent_70%)]" />

      <div className="container-px relative z-10 py-32 lg:py-40">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.span variants={item} className="eyebrow mb-6">
            {site.brandLine}
          </motion.span>

          <motion.h1
            variants={item}
            className="font-serif text-4xl font-semibold leading-[1.08] text-offwhite sm:text-5xl lg:text-6xl"
          >
            {site.tagline.split(", ")[0]},
            <br />
            <span className="text-gold">{site.tagline.split(", ")[1]}.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-xl text-lg leading-relaxed text-offwhite/75"
          >
            {site.name} is a litigation-focused firm representing clients across
            Indian courts — in criminal, matrimonial &amp; family, service, and
            PMLA &amp; special-legislation matters.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/contact" className="btn-gold">
              Request a Consultation
            </Link>
            <Link href="/practice-areas" className="btn-ghost-light">
              Explore Practice Areas
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: reduce ? 1 : [0.3, 1, 0.3] }}
        transition={
          reduce ? { duration: 0 } : { duration: 2.4, repeat: Infinity }
        }
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-offwhite/50"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 40" className="h-9 w-5" fill="none">
          <rect
            x="1"
            y="1"
            width="22"
            height="38"
            rx="11"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="11" r="2.5" fill="currentColor" />
        </svg>
      </motion.div>
    </section>
  );
}
