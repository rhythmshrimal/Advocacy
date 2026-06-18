import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTA from "@/components/CTA";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { matters } from "@/lib/site";

export const metadata: Metadata = {
  title: "Notable Matters & Experience",
  description:
    "Representative, confidentiality-safe examples of the matters Shrimal & Associates has handled across criminal, matrimonial, service, PMLA, and civil litigation.",
};

const forums = [
  "Supreme Court of India",
  "High Courts",
  "District & Sessions Courts",
  "Family Courts",
  "PMLA Special Courts",
  "Administrative Tribunals",
  "Appellate Tribunals",
  "Metropolitan Magistrate Courts",
];

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="Experience"
        title="A record built across forums"
        intro="The examples below are generalised to protect client confidentiality. They reflect the nature and breadth of the matters we are regularly trusted to handle."
      />

      {/* Matters grid */}
      <section className="container-px py-20 lg:py-28">
        <RevealGroup className="grid gap-6 md:grid-cols-2">
          {matters.map((m) => (
            <RevealItem key={m.area}>
              <article className="h-full rounded-md border border-navy/8 bg-white p-8 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-gold" />
                  <h2 className="font-serif text-lg font-semibold text-navy">
                    {m.area}
                  </h2>
                </div>
                <p className="mt-4 leading-relaxed text-slate">{m.summary}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Forums */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="container-px">
          <SectionHeading
            tone="light"
            eyebrow="Where We Appear"
            title="Forums across the Indian judicial system"
            intro="From trial courts and specialised tribunals to the constitutional courts."
            align="center"
            className="mb-12"
          />
          <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-4">
            {forums.map((forum) => (
              <RevealItem
                key={forum}
                className="flex min-h-[110px] items-center justify-center bg-navy px-5 py-7 text-center"
              >
                <span className="font-serif text-base text-offwhite/90">
                  {forum}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-offwhite/50">
            Note: Past results do not guarantee a similar outcome. Every matter is
            decided on its own facts and merits.
          </p>
        </div>
      </section>

      <CTA />
    </>
  );
}
