import Link from "next/link";
import { site } from "@/lib/site";

type LogoProps = {
  /** "dark" = navy structure (for light backgrounds), "light" = white structure (for dark backgrounds) */
  tone?: "dark" | "light";
  /** Show the wordmark text next to the emblem */
  withText?: boolean;
  className?: string;
};

/** Scales-of-justice emblem. Structural strokes use `struct`, accents use gold. */
function Emblem({ struct }: { struct: string }) {
  const GOLD = "#B08D45";
  return (
    <svg
      viewBox="0 0 64 64"
      width="100%"
      height="100%"
      role="img"
      aria-label={`${site.name} emblem`}
      className="h-full w-full"
    >
      {/* finial */}
      <circle cx="32" cy="9" r="3.1" fill={GOLD} />
      {/* vertical post */}
      <rect x="30.6" y="11" width="2.8" height="37" rx="1.4" fill={struct} />
      {/* cross-beam */}
      <rect x="9" y="16.6" width="46" height="2.6" rx="1.3" fill={GOLD} />
      {/* hanger lines */}
      <g stroke={struct} strokeWidth="1.3" strokeLinecap="round">
        <path d="M13 18 L8.5 28" />
        <path d="M13 18 L17.5 28" />
        <path d="M51 18 L46.5 28" />
        <path d="M51 18 L55.5 28" />
      </g>
      {/* left pan */}
      <path d="M5.5 28 H20.5 A7.5 7.5 0 0 1 5.5 28 Z" fill={GOLD} />
      {/* right pan */}
      <path d="M43.5 28 H58.5 A7.5 7.5 0 0 1 43.5 28 Z" fill={GOLD} />
      {/* plinth */}
      <rect x="26.5" y="48" width="11" height="4.2" fill={struct} />
      <rect x="21" y="52" width="22" height="3.4" rx="1.7" fill={struct} />
    </svg>
  );
}

export default function Logo({
  tone = "dark",
  withText = true,
  className = "",
}: LogoProps) {
  const struct = tone === "light" ? "#F8F6F2" : "#0E2A47";
  const textColor = tone === "light" ? "text-offwhite" : "text-navy";
  const subColor = tone === "light" ? "text-gold-light" : "text-gold";

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <span className="h-10 w-10 shrink-0 transition-transform duration-500 ease-brand group-hover:scale-105 sm:h-11 sm:w-11">
        <Emblem struct={struct} />
      </span>
      {withText && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-serif text-lg font-semibold tracking-tight sm:text-xl ${textColor}`}
          >
            Shrimal <span className="text-gold">&amp;</span> Associates
          </span>
          <span
            className={`mt-1 text-[9px] font-semibold uppercase tracking-brand sm:text-[10px] ${subColor}`}
          >
            {site.legalLine}
          </span>
        </span>
      )}
    </Link>
  );
}
