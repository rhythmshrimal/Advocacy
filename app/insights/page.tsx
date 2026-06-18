import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { getAllInsights } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Commentary and notes on legal developments from Shrimal & Associates — across criminal, matrimonial, service, and economic-offence law.",
};

export default function InsightsPage() {
  const posts = getAllInsights();

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Notes on the law, in plain language"
        intro="Periodic commentary on legal developments and practical guidance. Written to inform — not as legal advice for any specific matter."
      />

      <section className="container-px py-20 lg:py-28">
        {posts.length === 0 ? (
          <p className="text-slate">
            No articles have been published yet. Add an{" "}
            <code className="rounded bg-navy/5 px-1.5 py-0.5 text-navy">.mdx</code>{" "}
            file to{" "}
            <code className="rounded bg-navy/5 px-1.5 py-0.5 text-navy">content/insights/</code>{" "}
            to publish.
          </p>
        ) : (
          <RevealGroup className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <RevealItem key={post.slug} className="h-full">
                <Link
                  href={`/insights/${post.slug}`}
                  className="group flex h-full flex-col rounded-md border border-navy/8 bg-white p-8 shadow-card transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-gold/40 hover:shadow-card-hover"
                >
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide">
                    <span className="text-gold">{post.category}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-light" />
                    <span className="text-slate-light">{post.formattedDate}</span>
                  </div>
                  <h2 className="mt-4 font-serif text-xl font-semibold leading-snug text-navy group-hover:text-gold">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 leading-relaxed text-slate">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between text-sm">
                    <span className="inline-flex items-center gap-2 font-semibold text-gold">
                      Read article
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-slate-light">{post.readingTime}</span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        )}

        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-slate-light">
          Articles live as Markdown/MDX files in{" "}
          <code className="rounded bg-navy/5 px-1.5 py-0.5 text-navy">content/insights/</code>.
          Add a new <code className="rounded bg-navy/5 px-1.5 py-0.5 text-navy">.mdx</code>{" "}
          file with the required frontmatter to publish; set{" "}
          <code className="rounded bg-navy/5 px-1.5 py-0.5 text-navy">draft: true</code>{" "}
          to hide one.
        </p>
      </section>

      <CTA heading="Have a question we haven't covered?" />
    </>
  );
}
