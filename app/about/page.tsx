import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTA from "@/components/CTA";
import Photo from "@/components/Photo";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { values, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About the Firm",
  description:
    "Shrimal & Associates is a litigation-focused law firm bringing clarity, strategy, and steady advocacy to criminal, matrimonial, service, and PMLA matters across Indian courts.",
};

const approach = [
  {
    step: "01",
    title: "Listen & assess",
    body: "We begin by understanding your situation in full and giving you a frank assessment of where you stand — risks, options, and likely timelines.",
  },
  {
    step: "02",
    title: "Build the strategy",
    body: "We design a focused litigation strategy tailored to your objectives, the forum, and the facts — not a one-size-fits-all template.",
  },
  {
    step: "03",
    title: "Advocate & advise",
    body: "We prepare meticulously and argue persuasively, keeping you informed and involved in every material decision along the way.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Firm"
        title="Counsel grounded in preparation and principle"
        intro={`${site.name} is a litigation-focused practice serving clients across Indian courts. We act for individuals, professionals, and institutions navigating some of the most consequential moments of their lives and businesses.`}
      />

      {/* Story */}
      <section className="container-px py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Our Story"
              title="A firm defined by the cases we are trusted with"
            />
            <Reveal className="mt-6 space-y-5 text-base leading-relaxed text-slate sm:text-lg">
              <p>
                Shrimal &amp; Associates was founded on a simple conviction: that
                rigorous preparation, candid advice, and disciplined advocacy are
                what move difficult matters forward. Our practice spans criminal
                defence, matrimonial and family disputes, service law, and
                proceedings under the Prevention of Money Laundering Act and allied
                special legislation.
              </p>
              <p>
                We appear before trial courts, tribunals, High Courts, and the
                Supreme Court. Whatever the forum, our clients receive the same
                thing: a lawyer who has read the record, understood the stakes, and
                arrived ready.
              </p>
              <p>
                We keep our practice deliberately focused. That focus lets us go
                deep — on the law, on the facts, and on the human realities behind
                every matter we accept.
              </p>
            </Reveal>
          </div>

          {/* Image + highlight card */}
          <div className="lg:col-span-5">
            <Reveal from="right" className="space-y-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md shadow-card">
                <Photo
                  src={site.images.about}
                  alt="Shrimal & Associates chambers"
                  label="Chambers / firm photo"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="rounded-md border border-navy/8 bg-white p-8 shadow-card">
                <p className="font-serif text-2xl italic leading-snug text-navy">
                  “{site.tagline}.”
                </p>
                <div className="mt-6 h-px w-full bg-navy/10" />
                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-brand text-gold">
                      Focus
                    </dt>
                    <dd className="mt-1 text-slate">
                      Litigation across criminal, family, service &amp; economic-offence law
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-brand text-gold">
                      Forums
                    </dt>
                    <dd className="mt-1 text-slate">
                      Trial courts, tribunals, High Courts &amp; the Supreme Court
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-brand text-gold">
                      Approach
                    </dt>
                    <dd className="mt-1 text-slate">
                      Prepared, principled, and responsive to every client
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white/60 py-20 lg:py-28">
        <div className="container-px">
          <SectionHeading
            eyebrow={site.brandLine}
            title="What we stand for"
            align="center"
            className="mb-14"
          />
          <RevealGroup className="grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <RevealItem
                key={v.title}
                className="rounded-md border border-navy/8 bg-white p-8 shadow-card"
              >
                <h3 className="font-serif text-2xl text-navy">{v.title}</h3>
                <div className="mt-3 h-px w-10 bg-gold" />
                <p className="mt-4 leading-relaxed text-slate">{v.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Approach */}
      <section className="container-px py-20 lg:py-28">
        <SectionHeading
          eyebrow="How We Work"
          title="A clear path through an unclear time"
          intro="Litigation is stressful. Our process is designed to reduce uncertainty and keep you in control of the decisions that matter."
          className="mb-14"
        />
        <RevealGroup className="grid gap-8 md:grid-cols-3">
          {approach.map((a) => (
            <RevealItem key={a.step}>
              <div className="font-serif text-5xl text-gold/30">{a.step}</div>
              <h3 className="mt-4 font-serif text-xl text-navy">{a.title}</h3>
              <p className="mt-3 leading-relaxed text-slate">{a.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <CTA />
    </>
  );
}
