import assert from "node:assert/strict";

const base = process.env.VERIFY_URL || "http://127.0.0.1:3001";
const expectedSite = "https://shrimalassociates.vercel.app";
const sitemapResponse = await fetch(`${base}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]));
assert.equal(urls.length, 23, "All expected pages should be in the sitemap");
assert.ok(urls.every((url) => url.origin === expectedSite), "Sitemap should use the review deployment domain");
const paths = new Set(["/robots.txt", "/icon.webp"]);

for (const url of urls) {
  const response = await fetch(`${base}${url.pathname}`);
  assert.equal(response.status, 200, url.pathname);
  const html = await response.text();
  for (const match of html.matchAll(/(?:src|href)="(\/[^"<>]*)"/g)) {
    const path = match[1].replaceAll("&amp;", "&").split("#")[0];
    if (path && !path.startsWith("//")) paths.add(path);
  }
}

for (const path of paths) {
  const response = await fetch(`${base}${path}`, { headers: { Accept: "image/webp" } });
  assert.equal(response.status, 200, path);
}
const robots = await (await fetch(`${base}/robots.txt`)).text();
assert.ok(robots.includes(`${expectedSite}/sitemap.xml`));

// These cases never send email, even against a configured deployment.
const cases = [
  ["null", "null", 400],
  ["array", "[]", 400],
  ["invalid field type", '{"name":123}', 400],
  ["malformed JSON", "{", 400],
  ["empty fields", "{}", 400],
  ["oversized body", JSON.stringify({ message: "x".repeat(17000) }), 413],
  ["invalid phone", JSON.stringify({ name: "Check", phone: "abc", message: "Check" }), 400],
  ["invalid email", JSON.stringify({ name: "Check", phone: "+919876543210", email: "invalid", message: "Check" }), 400],
  ["missing message", JSON.stringify({ name: "Check", phone: "+919876543210" }), 400],
  ["honeypot", JSON.stringify({ company: "automated test" }), 200],
];
if (process.env.VERIFY_UNCONFIGURED_SMTP === "1") {
  cases.push(["unconfigured SMTP", JSON.stringify({ name: "Local readiness check", phone: "+919876543210", message: "Local check" }), 503]);
}
for (const [name, body, expected] of cases) {
  const response = await fetch(`${base}/api/contact`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body,
  });
  assert.equal(response.status, expected, name);
}
assert.equal((await fetch(`${base}/nonexistent-readiness-check`)).status, 404);
console.log(`PASS: ${urls.length} pages, ${paths.size} assets/internal links, ${cases.length} API cases, sitemap domain, and 404 response.`);
