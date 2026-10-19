import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { parseFrontmatter } from "../lib/frontmatter.ts";

test("preserves quoted values, dates, and article body", () => {
  const result = parseFrontmatter('---\r\ntitle: "Tax: an overview"\r\ndate: "2026-10-20"\r\ndraft: false\r\n---\r\n## Introduction\nBody');
  assert.equal(result.data.title, "Tax: an overview");
  assert.equal(result.data.date, "2026-10-20");
  assert.equal(result.data.draft, false);
  assert.equal(result.content, "## Introduction\nBody");
});

test("leaves content without frontmatter intact", () => {
  assert.deepEqual(parseFrontmatter("# Article\nText"), { data: {}, content: "# Article\nText" });
});

test("rejects malformed YAML and non-mapping metadata", () => {
  assert.throws(() => parseFrontmatter("---\ntitle: [\n---\nBody"));
  assert.throws(() => parseFrontmatter("---\n- a\n- b\n---\nBody"), /mapping/);
});

test("limits YAML alias expansion", () => {
  const yaml = "---\na: &a [x, x, x, x, x, x, x, x, x, x]\nb: &b [*a, *a, *a, *a, *a, *a, *a, *a, *a, *a]\nc: [*b, *b, *b, *b, *b, *b, *b, *b, *b, *b]\n---\nBody";
  assert.throws(() => parseFrontmatter(yaml), /alias/i);
});

test("all published repository articles retain their required metadata", () => {
  const dir = new URL("../content/insights/", import.meta.url);
  const files = readdirSync(dir).filter((file) => file.endsWith(".mdx"));
  assert.ok(files.length > 0);
  for (const file of files) {
    const { data, content } = parseFrontmatter(readFileSync(new URL(file, dir), "utf8"));
    for (const field of ["title", "excerpt", "category", "date"]) {
      assert.equal(typeof data[field], "string", `${file}: ${field}`);
      assert.ok(data[field].length > 0, `${file}: empty ${field}`);
    }
    assert.ok(content.trim().length > 0, `${file}: missing article body`);
  }
});
