import { parse } from "yaml";

/** Parse repository-authored YAML metadata without evaluating JavaScript. */
export function parseFrontmatter(raw: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(raw);
  if (!match) return { data: {}, content: raw };

  const data: unknown = parse(match[1], { maxAliasCount: 20 });
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Article frontmatter must be a YAML mapping.");
  }
  return {
    data: data as Record<string, unknown>,
    content: raw.slice(match[0].length),
  };
}
