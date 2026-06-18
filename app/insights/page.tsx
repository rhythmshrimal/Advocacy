import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import { RevealGroup, RevealItem } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Commentary and notes on legal developments from Shrimal & Associates — across criminal, matrimonial, service, and economic-offence law.",
};

// [PLACEHOLDER] Replace with real articles. Each could later link to /insights/[slug].
const posts = [
  {
    category: "PMLA",
    date: "Coming soon",
    title: "Bail under the PMLA: what the twin conditions really require",
    excerpt:
      "A practical look at how courts have approached the Section 45 twin conditions and what it means for an accused seeking bail.",
  },
  {
    category: "Matrimonial Law",
    date: "Coming soon",
    title: "Mutual-consent divorce: timelines, waivers, and what to expect",
    excerpt:
      "Understanding the cooling-off period, when it can be waived, and how to approach a dignified, time-bound separation.",
  },
  {
    category: "Criminal Law",
    date: "Coming soon",
    title: "Quashing FIRs under Section 482: when the High Court will step in",
    excerpt:
      "The principles courts apply when deciding whether to quash criminal proceedings at the threshold.",
  },
  {
    category: "Service Law",
    date: "Coming soon",
    title: "Departmental inquiries: protecting your rights from day one",
    excerpt:
      "Procedural safeguards every government servant should know before responding to a charge memo.",
  },
];

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Notes on the law, in plain language"
        intro="Periodic commentary on legal developments and practical guidance. Written to inform — not as legal advice for any specific matter."
      />

      <section className="container-px py-20 lg:py-28">
        <RevealGroup className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <RevealItem key={post.title}>
              <article className="group flex h-full flex-col rounded-md border border-navy/8 bg-white p-8 shadow-card transition-all duration-500 ease-brand hover:-translate-y-1 hover:shadow-card-hover">
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide">
                  <span className="text-gold">{post.category}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-light" />
                  <span className="text-slate-light">{post.date}</span>
                </div>
                <h2 className="mt-4 font-serif text-xl font-semibold leading-snug text-navy">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 leading-relaxed text-slate">
                  {post.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold/70">
                  Article coming soon
                </span>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-slate-light">
          This section is a scaffold for thought-leadership content. Replace the
          placeholder posts in{" "}
          <code className="rounded bg-navy/5 px-1.5 py-0.5 text-navy">app/insights/page.tsx</code>{" "}
          with real articles, or wire it to a CMS / MDX when you are ready to
          publish.
        </p>
      </section>

      <CTA heading="Have a question we haven't covered?" />
    </>
  );
}
