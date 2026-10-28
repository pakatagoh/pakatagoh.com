import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const output = ".vercel/output";
const staticDir = join(output, "static");
const astroVersion = JSON.parse(
  readFileSync("node_modules/astro/package.json", "utf8"),
).version;
const tailwindVersion = JSON.parse(
  readFileSync("node_modules/tailwindcss/package.json", "utf8"),
).version;
const expectedOrigin =
  process.env.EXPECTED_SITE_ORIGIN ?? "http://localhost:4321";
const routes = [
  "index.html",
  "about/index.html",
  "blog/index.html",
  "contact/index.html",
  "uses/index.html",
  "404.html",
  ...readdirSync("src/data/blog").map((slug) => `blog/${slug}/index.html`),
];

for (const route of routes) {
  test(`built page and local assets: ${route}`, () => {
    const html = readFileSync(join(staticDir, route), "utf8");
    assert.match(html, /<!DOCTYPE html>/i);
    assert.match(html, /<title>[^<]+<\/title>/);
    assert.ok(html.includes(`content="Astro v${astroVersion}"`));
    const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*>/)?.[0];
    assert.ok(canonical, "canonical link exists");
    const canonicalUrl = canonical.match(/href="([^"]+)"/)?.[1];
    assert.equal(new URL(canonicalUrl).origin, expectedOrigin);
    assert.match(html, /id="theme-toggle"/);
    for (const [, asset] of html.matchAll(
      /(?:src|href)="(\/_astro\/[^"?#]+)"/g,
    )) {
      assert.ok(existsSync(join(staticDir, asset)), `missing asset: ${asset}`);
    }
  });
}

test("Tailwind CSS and typography are emitted", () => {
  const styles = readdirSync(join(staticDir, "_astro"))
    .filter((name) => name.endsWith(".css"))
    .map((name) => readFileSync(join(staticDir, "_astro", name), "utf8"))
    .join("\n");
  assert.ok(styles.includes(`tailwindcss v${tailwindVersion} |`));
  assert.ok(styles.includes(".flex{"));
  assert.ok(styles.includes(".prose{"));
  assert.ok(styles.includes(".dark"));
});

test("rehype heading permalinks survive the Markdown processor upgrade", () => {
  const html = readFileSync(
    join(staticDir, "blog/what-i-learned-in-2019/index.html"),
    "utf8",
  );
  assert.match(html, /<h[2-6][^>]*id="([^"]+)"[^>]*><a[^>]*href="#\1"/);
});

test("Vercel uses Node 24 and retains server routes and 404 handling", () => {
  const runtime = JSON.parse(
    readFileSync(
      join(output, "functions/_render.func/.vc-config.json"),
      "utf8",
    ),
  );
  assert.equal(runtime.runtime, "nodejs24.x");
  const config = JSON.parse(readFileSync(join(output, "config.json"), "utf8"));
  assert.ok(
    config.routes.some((route) => route.src?.includes("/api/transactions")),
  );
  assert.ok(
    config.routes.some((route) =>
      route.src?.includes("/blog/getting-started-with-react-spring"),
    ),
  );
  assert.ok(config.routes.some((route) => route.status === 404));
});

test("sitemap uses the correct site origin", () => {
  const sitemap = readFileSync(join(staticDir, "sitemap-0.xml"), "utf8");
  assert.ok(sitemap.includes(`<loc>${expectedOrigin}/</loc>`));
  assert.ok(sitemap.includes(`<loc>${expectedOrigin}/blog/</loc>`));
});
