import Link from "next/link";
import type { PracticeArea } from "@/lib/site";

// SVG path data per practice area
const ICONS: Record<string, string> = {
  "criminal-law": "M12 3l7 3v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3Z",
  "matrimonial-family-law":
    "M12 20s-6.5-4.3-8.5-8.2C2 8.7 3.6 6 6.5 6c1.8 0 3.1 1 3.5 2 1-2 2.2-2 3.5-2C16.4 6 18 8.7 16.5 11.8 14.5 15.7 12 20 12 20Z",
  "service-law":
    "M4 20h16M6 20V9l6-4 6 4v11M9 20v-5h6v5",
  "pmla-special-legislation":
    "M4 21h16M6 21V9m4 12V9m4 12V9m4 12V9M3 9l9-6 9 6",
  "civil-litigation":
    "M12 3v18M5 8l7-5 7 5M5 8l-2 6h4l-2-6Zm14 0l-2 6h4l-2-6Z",
};

type PracticeCardProps = {
  area: PracticeArea;
  index: number;
};

function AreaIcon({ slug }: { slug: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-7 w-7"
      aria-hidden="true"
    >
      <path
        d={ICONS[slug] ?? ICONS["civil-litigation"]}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PracticeCard({ area, index }: PracticeCardProps) {
  return (
    <Link
      href={`/practice-areas/${area.slug}`}
      className="group relative flex h-full flex-col rounded-md border border-navy/8 bg-white p-7 shadow-card transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-gold/40 hover:shadow-card-hover sm:p-8"
    >
      {/* number + icon row */}
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-navy/5 text-navy transition-colors duration-500 group-hover:bg-navy group-hover:text-gold">
          <AreaIcon slug={area.slug} />
        </span>
        <span className="font-serif text-sm text-slate-light">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-6 font-serif text-xl font-semibold text-navy">
        {area.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">
        {area.short}
      </p>

      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold">
        Learn more
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
