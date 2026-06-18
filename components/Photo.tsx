import Image from "next/image";

type PhotoProps = {
  /** Path under /public (e.g. "/images/hero.jpg"). When empty, a branded placeholder is shown. */
  src?: string;
  alt: string;
  /** Short label shown on the placeholder, e.g. "Chambers photo" */
  label?: string;
  /** Fill the parent (parent must be position:relative with a set size) */
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** object-fit when using fill */
  fit?: "cover" | "contain";
};

/** Branded placeholder shown until a real photograph is supplied. */
function Placeholder({ label }: { label?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-navy text-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg,#B08D45 0,#B08D45 2px,transparent 2px,transparent 48px)",
        }}
      />
      <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9 text-gold/70" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="9" cy="10" r="1.8" stroke="currentColor" strokeWidth="1.4" />
        <path d="m4 17 5-4 4 3 3-2 4 3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
      {label && (
        <span className="relative mt-3 px-4 text-xs font-semibold uppercase tracking-brand text-gold/80">
          {label}
        </span>
      )}
    </div>
  );
}

export default function Photo({
  src,
  alt,
  label,
  fill = false,
  width,
  height,
  priority = false,
  sizes,
  className = "",
  fit = "cover",
}: PhotoProps) {
  // No real image yet → branded placeholder.
  if (!src) {
    if (fill) {
      return <Placeholder label={label} />;
    }
    return (
      <div
        className={`relative ${className}`}
        style={{ aspectRatio: width && height ? `${width} / ${height}` : "4 / 3" }}
      >
        <Placeholder label={label} />
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "100vw"}
        className={`object-${fit} ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1200}
      height={height ?? 800}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
