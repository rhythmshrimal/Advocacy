import { RevealGroup, RevealItem } from "./Reveal";
import { stats } from "@/lib/site";

export default function Stats() {
  return (
    <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 lg:grid-cols-4">
      {stats.map((stat) => (
        <RevealItem
          key={stat.label}
          className="bg-navy px-6 py-9 text-center sm:py-10"
        >
          <div className="font-serif text-4xl font-semibold text-gold sm:text-5xl">
            {stat.value}
          </div>
          <div className="mt-2 text-xs uppercase tracking-wide text-offwhite/65 sm:text-sm">
            {stat.label}
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
