"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Parallax from "./Parallax";
import Photo from "./Photo";
import Logo from "./Logo";
import { site } from "@/lib/site";

/** Decorative courthouse-column backdrop - replace with real chamber/court photography when available. */
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
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-7"
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
              Indian courts - in criminal, matrimonial &amp; family, service, and
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

          {/* Firm emblem + wordmark - right side (desktop) */}
          <motion.div
            initial={
              reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:col-span-5 lg:flex lg:justify-center"
          >
            <Logo layout="stack" asLink={false} emblemClassName="h-40 w-auto xl:h-48" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
