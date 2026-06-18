import type { ReactNode } from "react";
import Reveal from "./Reveal";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
};

export default function PageHero({ eyebrow, title, intro }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy-900 pt-32 pb-16 lg:pt-40 lg:pb-20">
      {/* decorative motif */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_70%_at_85%_0%,rgba(176,141,69,0.12),transparent_70%)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #B08D45 0, #B08D45 2px, transparent 2px, transparent 64px)",
        }}
      />

      <div className="container-px relative">
        <Reveal className="max-w-3xl">
          {eyebrow && <span className="eyebrow mb-5">{eyebrow}</span>}
          <h1 className="font-serif text-4xl font-semibold leading-tight text-offwhite sm:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-offwhite/75">
              {intro}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
