import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const INSIGHTS_DIR = path.join(process.cwd(), "content", "insights");

export type InsightFrontmatter = {
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO date, e.g. "2026-02-14"
  author?: string;
  draft?: boolean;
};

export type InsightMeta = InsightFrontmatter & {
  slug: string;
  readingTime: string;
  formattedDate: string;
};

export type Insight = InsightMeta & { content: string };

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function readFiles(): string[] {
  if (!fs.existsSync(INSIGHTS_DIR)) return [];
  return fs.readdirSync(INSIGHTS_DIR).filter((f) => f.endsWith(".mdx"));
}

/** All published insights, newest first. */
export function getAllInsights(): InsightMeta[] {
  return readFiles()
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(INSIGHTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const fm = data as InsightFrontmatter;
      return {
        ...fm,
        slug,
        readingTime: readingTime(content).text,
        formattedDate: formatDate(fm.date),
      };
    })
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getInsightSlugs(): string[] {
  return getAllInsights().map((p) => p.slug);
}

export type Author = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  /** Path under /public, e.g. "/images/team/founder.jpg". "" → initials avatar. */
  image: string;
};

/**
 * Author registry. The `author` value in an article's frontmatter is matched
 * against these keys; unknown authors fall back to the firm.
 */
export const authors: Record<string, Author> = {
  "Shrimal & Associates": {
    name: "Shrimal & Associates",
    role: "Advocates & Legal Consultants",
    bio: "Shrimal & Associates is a litigation-focused firm representing clients across Indian courts in criminal, matrimonial, service, and economic-offence matters. Our writing distils practical, plain-language guidance from day-to-day courtroom experience.",
    initials: "SA",
    image: "",
  },
  // Add named advocates here, e.g.:
  // "Adv. Full Name": { name: "Adv. Full Name", role: "Managing Advocate", bio: "…", initials: "FN", image: "/images/team/founder.jpg" },
};

const FIRM_AUTHOR = "Shrimal & Associates";

export function getAuthor(name?: string): Author {
  return authors[name ?? FIRM_AUTHOR] ?? authors[FIRM_AUTHOR];
}

/**
 * Related insights for a given slug — same category first, then the most
 * recent of the rest, excluding the current article.
 */
export function getRelatedInsights(slug: string, limit = 2): InsightMeta[] {
  const all = getAllInsights();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];
  const others = all.filter((p) => p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/** Full insight (with raw MDX content) by slug, or null if missing/draft. */
export function getInsight(slug: string): Insight | null {
  const file = path.join(INSIGHTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const fm = data as InsightFrontmatter;
  if (fm.draft) return null;
  return {
    ...fm,
    slug,
    content,
    readingTime: readingTime(content).text,
    formattedDate: formatDate(fm.date),
  };
}
