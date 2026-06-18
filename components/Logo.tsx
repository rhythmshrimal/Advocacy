import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

type LogoProps = {
  /** "row" = emblem + wordmark beside it (navbar/footer); "stack" = emblem above, text below (hero) */
  layout?: "row" | "stack";
  /** wrap in a link to home (default true) */
  asLink?: boolean;
  /** height utility classes for the emblem image */
  emblemClassName?: string;
  className?: string;
  /** kept for API compatibility with existing call sites */
  tone?: "dark" | "light";
  withText?: boolean;
};

function Emblem({ className }: { className: string }) {
  return (
    <Image
      src="/images/emblem.png"
      alt={`${site.name} emblem`}
      width={1024}
      height={1024}
      priority
      className={className}
    />
  );
}

export default function Logo({
  layout = "row",
  asLink = true,
  emblemClassName,
  className = "",
}: LogoProps) {
  const content =
    layout === "stack" ? (
      <span className="flex flex-col items-center text-center">
        <Emblem className={emblemClassName ?? "h-28 w-auto sm:h-36"} />
        <span className="mt-5 font-serif text-3xl font-semibold uppercase tracking-wide text-offwhite sm:text-4xl">
          Shrimal <span className="text-gold">&amp;</span> Associates
        </span>
        <span className="mt-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-brand text-gold">
          <span className="h-px w-6 bg-gold/60" />
          {site.legalLine}
          <span className="h-px w-6 bg-gold/60" />
        </span>
      </span>
    ) : (
      <span className="inline-flex items-center gap-3">
        <Emblem className={emblemClassName ?? "h-10 w-auto sm:h-11"} />
        <span className="flex flex-col leading-none">
          <span className="font-serif text-base font-semibold uppercase tracking-wide text-offwhite sm:text-lg">
            Shrimal <span className="text-gold">&amp;</span> Associates
          </span>
          <span className="mt-1 text-[8.5px] font-semibold uppercase tracking-brand text-gold sm:text-[9.5px]">
            {site.legalLine}
          </span>
        </span>
      </span>
    );

  if (!asLink) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link
      href="/"
      aria-label={`${site.name} - home`}
      className={`group inline-flex items-center transition-transform duration-500 ease-brand hover:scale-[1.02] ${className}`}
    >
      {content}
    </Link>
  );
}
