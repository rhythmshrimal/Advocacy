import Link from "next/link";
import type { PracticeArea } from "@/lib/site";

// Consistent 24px outline icons, with a distinct symbol for each practice.
const ICONS: Record<string, string> = {
  "criminal-law":
    "M12 3 4.5 6v5.5c0 4.3 3.1 7.7 7.5 9.5 4.4-1.8 7.5-5.2 7.5-9.5V6L12 3Z M8.5 11.5l2.3 2.3 4.7-4.7",
  "matrimonial-family-law":
    "M20.2 5.3a5 5 0 0 0-7.1 0L12 6.4l-1.1-1.1a5 5 0 0 0-7.1 7.1L12 20.6l8.2-8.2a5 5 0 0 0 0-7.1Z",
  "service-law":
    "M9 6V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V6 M5 6h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z M3 10l7 3h4l7-3 M10 12v3h4v-3",
  "civil-commercial-law":
    "M12 3v17 M8 21h8 M5 6h14 M5 6l-3 7h6L5 6Z M19 6l-3 7h6l-3-7Z M2 13a3 3 0 0 0 6 0 M16 13a3 3 0 0 0 6 0",
  taxation:
    "M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z M8 6h8v4H8V6Z M8 14h1 M12 14h1 M16 14h.01 M8 18h1 M12 18h1 M16 17v2",
  arbitration:
    "M5 3h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2Z M8 18h8l5 3V10a2 2 0 0 0-2-2 M7 7h6 M7 10h4",
  "pmla-special-legislation":
    "M3 9h18L12 3 3 9Z M5 12v6 M9.5 12v6 M14.5 12v6 M19 12v6 M4 21h16 M3 18h18 M12 6.5h.01",
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
        d={ICONS[slug] ?? ICONS["civil-commercial-law"]}
        stroke="currentColor"
        strokeWidth="1.6"
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
        <span className="flex h-12 w-12 items-center justify-center rounded-xs bg-navy/5 text-navy transition-colors duration-500 group-hover:bg-navy group-hover:text-gold">
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
