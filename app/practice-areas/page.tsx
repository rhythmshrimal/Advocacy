import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import { practiceAreas } from "@/lib/site";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Criminal law, matrimonial & family law, service law, PMLA & special legislation, and civil litigation — handled end to end across Indian courts.",
};

export default function PracticeAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Practice Areas"
        title="Focused litigation, handled end to end"
        intro="We concentrate on five core areas of dispute. Within each, we act at every stage — from first advice and interim relief through trial, appeal, and enforcement."
      />

      {/* Quick index */}
      <section className="border-b border-navy/8 bg-white/60">
        <div className="container-px flex flex-wrap gap-x-6 gap-y-3 py-6">
          {practiceAreas.map((area) => (
            <a
              key={area.slug}
              href={`#${area.slug}`}
              className="text-sm font-medium text-slate transition-colors hover:text-gold"
            >
              {area.title}
            </a>
          ))}
        </div>
      </section>

      {/* Detailed sections */}
      <div className="container-px py-20 lg:py-28">
        <div className="space-y-20 lg:space-y-28">
          {practiceAreas.map((area, i) => (
            <section
              key={area.slug}
              id={area.slug}
              className="scroll-mt-28"
            >
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Reveal>
                    <span className="font-serif text-6xl text-gold/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-2 font-serif text-3xl font-semibold text-navy sm:text-4xl">
                      {area.title}
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-slate sm:text-lg">
                      {area.description}
                    </p>
                    <Link href={`/practice-areas/${area.slug}`} className="link-underline mt-7">
                      Read more about {area.title}
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </Reveal>
                </div>

                <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Reveal from={i % 2 === 1 ? "right" : "left"}>
                    <div className="grid gap-px overflow-hidden rounded-md border border-navy/8 bg-navy/8 sm:grid-cols-2">
                      {area.points.map((point) => (
                        <div
                          key={point}
                          className="flex items-start gap-3 bg-white p-6"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          <span className="text-sm leading-relaxed text-charcoal">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      <CTA heading="Ready to discuss your matter?" />
    </>
  );
}
