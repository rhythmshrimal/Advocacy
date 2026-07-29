import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import PracticeCard from "@/components/PracticeCard";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import Parallax from "@/components/Parallax";
import OrganizationSchema from "@/components/OrganizationSchema";
import { practiceAreas, values, matters, site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <Hero />

      {/* ── Values strip ── */}
      <section className="container-px py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Who We Are"
              title={
                <>
                  A litigation practice built on <span className="text-gold">trust</span>.
                </>
              }
              intro="Clients come to us at difficult moments - facing investigation, a contested separation, or a career on the line. Our role is to bring clarity, strategy, and steady advocacy to matters that matter most."
            />
            <Reveal delay={0.1}>
              <Link href="/about" className="link-underline mt-8">
                More about the firm
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Reveal>
          </div>

          <RevealGroup className="grid gap-6 sm:grid-cols-3 lg:col-span-7">
            {values.map((v) => (
              <RevealItem
                key={v.title}
                className="rounded-md border border-navy/8 bg-white p-7 shadow-card"
              >
                <h3 className="font-serif text-xl text-navy">{v.title}</h3>
                <div className="mt-3 h-px w-10 bg-gold" />
                <p className="mt-4 text-sm leading-relaxed text-slate">{v.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Practice areas ── */}
      <section className="bg-white/60 py-20 lg:py-28">
        <div className="container-px">
          <SectionHeading
            eyebrow="Practice Areas"
            title="Where we focus"
            intro="Five core areas of litigation, handled end to end - from first advice through to the final forum."
            align="center"
            className="mb-14"
          />
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.map((area, i) => (
              <RevealItem key={area.slug} className="h-full">
                <PracticeCard area={area} index={i} />
              </RevealItem>
            ))}
            {/* CTA tile */}
            <RevealItem className="h-full">
              <Link
                href="/contact"
                className="group flex h-full flex-col justify-between rounded-md bg-navy p-8 text-offwhite shadow-card transition-all duration-500 ease-brand hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="eyebrow">Not sure where you fit?</span>
                <div className="mt-8">
                  <h3 className="font-serif text-2xl text-offwhite">
                    Speak with us directly.
                  </h3>
                  <span className="mt-5 inline-flex items-center gap-2 font-semibold text-gold">
                    Request a consultation
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* ── Firm statement w/ parallax accent ── */}
      <section className="relative overflow-hidden bg-navy py-24 lg:py-32">
        <Parallax
          speed={90}
          className="pointer-events-none absolute -right-10 top-0 h-full opacity-20"
        >
          <div
            aria-hidden="true"
            className="h-[130%] w-72"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg,#B08D45 0,#B08D45 2px,transparent 2px,transparent 56px)",
            }}
          />
        </Parallax>
        <div className="container-px relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow mb-6 justify-center">{site.brandLine}</span>
            <p className="font-serif text-2xl font-medium leading-snug text-offwhite sm:text-3xl lg:text-[2.4rem] lg:leading-[1.25]">
              “We measure our work not by the cases we take, but by the trust our
              clients place in us and the outcomes we secure on their behalf.”
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-navy-900 pb-20 pt-0 lg:pb-28">
        <div className="container-px -translate-y-10">
          <Stats />
        </div>
        {/* Experience teaser */}
        <div className="container-px">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading
                tone="light"
                eyebrow="Experience"
                title="Tested across forums - trial to apex court"
                intro="Representative, confidentiality-safe examples of the matters we handle."
              />
            </div>
            <div className="lg:col-span-5">
              <Reveal>
                <Link href="/experience" className="btn-gold">
                  View notable matters
                </Link>
              </Reveal>
            </div>
          </div>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {matters.slice(0, 3).map((m) => (
              <RevealItem
                key={m.area}
                className="rounded-md border border-white/10 bg-white/[0.03] p-7"
              >
                <h3 className="font-serif text-lg text-gold-light">{m.area}</h3>
                <p className="mt-3 text-sm leading-relaxed text-offwhite/70">
                  {m.summary}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTA />
    </>
  );
}
