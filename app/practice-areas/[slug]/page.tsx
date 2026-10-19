import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { practiceAreas, site } from "@/lib/site";

type Params = { slug: string };

// Pre-render every practice-area page at build time.
export function generateStaticParams(): Params[] {
  return practiceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = practiceAreas.find((a) => a.slug === slug);
  if (!area) return { title: "Practice Area" };
  return {
    title: area.title,
    description: area.description,
    openGraph: {
      title: `${area.title} - ${site.name}`,
      description: area.description,
    },
  };
}

export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const index = practiceAreas.findIndex((a) => a.slug === slug);
  const area = practiceAreas[index];
  if (!area) notFound();

  const prev = index > 0 ? practiceAreas[index - 1] : null;
  const next =
    index < practiceAreas.length - 1 ? practiceAreas[index + 1] : null;

  // FAQ structured data for SEO / rich results
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        eyebrow={`Practice Area ${String(index + 1).padStart(2, "0")}`}
        title={area.title}
        intro={area.short}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-navy/8 bg-white/60"
      >
        <ol className="container-px flex flex-wrap items-center gap-2 py-4 text-sm text-slate">
          <li>
            <Link href="/" className="transition-colors hover:text-gold">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/practice-areas"
              className="transition-colors hover:text-gold"
            >
              Practice Areas
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-navy">{area.title}</li>
        </ol>
      </nav>

      {/* Overview + points */}
      <section className="container-px py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal className="space-y-5 text-base leading-relaxed text-slate sm:text-lg">
              {area.overview.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal from="right" className="space-y-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md shadow-card">
                <Photo
                  src={area.image}
                  alt={`${area.title} at Shrimal & Associates`}
                  label={`${area.title} photo`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="rounded-md border border-navy/8 bg-white p-7 shadow-card">
                <h2 className="font-serif text-lg font-semibold text-navy">
                  What we handle
                </h2>
                <ul className="mt-4 space-y-3">
                  {area.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-charcoal">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-gold mt-7 w-full">
                  Discuss your matter
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white/60 py-20 lg:py-28">
        <div className="container-px max-w-3xl">
          <Reveal>
            <span className="eyebrow mb-4">Common Questions</span>
            <h2 className="font-serif text-3xl font-semibold text-navy sm:text-4xl">
              {area.title} - frequently asked
            </h2>
          </Reveal>
          <div className="mt-10 divide-y divide-navy/10">
            {area.faqs.map((faq) => (
              <Reveal key={faq.q}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg text-navy">
                    {faq.q}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-navy/20 text-gold transition-transform duration-300 group-open:rotate-45">
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-slate">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Prev / next */}
      <section className="container-px py-14">
        <div className="grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/practice-areas/${prev.slug}`}
              className="group rounded-md border border-navy/8 bg-white p-6 shadow-card transition-all duration-300 hover:border-gold/40"
            >
              <span className="text-xs uppercase tracking-brand text-slate-light">
                ← Previous
              </span>
              <p className="mt-1 font-serif text-lg text-navy group-hover:text-gold">
                {prev.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/practice-areas/${next.slug}`}
              className="group rounded-md border border-navy/8 bg-white p-6 text-right shadow-card transition-all duration-300 hover:border-gold/40"
            >
              <span className="text-xs uppercase tracking-brand text-slate-light">
                Next →
              </span>
              <p className="mt-1 font-serif text-lg text-navy group-hover:text-gold">
                {next.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
        </div>
        <div className="mt-8 text-center">
          <Link href="/practice-areas" className="link-underline">
            All practice areas
          </Link>
        </div>
      </section>

      <CTA heading={`Need help with a ${area.title.toLowerCase()} matter?`} />
    </>
  );
}
