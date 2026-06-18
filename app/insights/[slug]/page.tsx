import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import Photo from "@/components/Photo";
import {
  getAuthor,
  getInsight,
  getInsightSlugs,
  getRelatedInsights,
} from "@/lib/insights";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return { title: "Article" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} — ${site.name}`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

// Internal links use the client router; external links open safely.
function MdxLink({ href = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith("/")) {
    return <Link href={href} {...props} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

export default async function InsightPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  const author = getAuthor(post.author);
  const related = getRelatedInsights(slug, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": author.name === site.name ? "Organization" : "Person",
      name: author.name,
    },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <PageHero
        eyebrow={post.category}
        title={post.title}
        intro={post.excerpt}
      />

      <article className="container-px py-16 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-navy/10 pb-6 text-sm text-slate">
            <span>{post.formattedDate}</span>
            <span className="h-1 w-1 rounded-full bg-slate-light" />
            <span>{post.readingTime}</span>
            <span className="h-1 w-1 rounded-full bg-slate-light" />
            <span>{post.author ?? site.name}</span>
          </div>

          <div className="prose prose-lg mt-10">
            <MDXRemote source={post.content} components={{ a: MdxLink }} />
          </div>

          {/* Author bio */}
          <div className="mt-12 flex flex-col gap-5 rounded-md border border-navy/8 bg-white p-6 shadow-card sm:flex-row sm:items-center sm:p-7">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-navy">
              {author.image ? (
                <Photo src={author.image} alt={author.name} fill sizes="64px" />
              ) : (
                <span className="flex h-full w-full items-center justify-center font-serif text-xl text-gold">
                  {author.initials}
                </span>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-brand text-gold">
                Written by
              </p>
              <p className="mt-1 font-serif text-lg text-navy">{author.name}</p>
              <p className="text-sm text-slate-light">{author.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate">{author.bio}</p>
            </div>
          </div>

          <div className="mt-10 border-t border-navy/10 pt-8">
            <Link href="/insights" className="link-underline">
              ← Back to all insights
            </Link>
          </div>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="bg-white/60 py-16 lg:py-20">
          <div className="container-px">
            <h2 className="font-serif text-2xl font-semibold text-navy sm:text-3xl">
              Related insights
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/insights/${rel.slug}`}
                  className="group flex flex-col rounded-md border border-navy/8 bg-white p-7 shadow-card transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-gold/40 hover:shadow-card-hover"
                >
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide">
                    <span className="text-gold">{rel.category}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-light" />
                    <span className="text-slate-light">{rel.readingTime}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-lg font-semibold leading-snug text-navy group-hover:text-gold">
                    {rel.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {rel.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
