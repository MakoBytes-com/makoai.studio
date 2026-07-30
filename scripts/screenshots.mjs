#!/usr/bin/env node
/**
 * Grabs homepage screenshots for each portfolio site via Microlink's free
 * screenshot API and saves them to public/portfolio/<slug>.png.
 *
 * Usage:  node scripts/screenshots.mjs
 * Re-run anytime to refresh. Microlink free tier limit: 50 req/day.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

// Source thumbnails from frozen showcase forks for ALL client builds —
// every portfolio entry except our own products (toppaws, makobot,
// makobytes, pixelcopy, makoanswer) gets sourced from a
// *-showcase.vercel.app fork so the portfolio image never drifts
// post-handover. Our own products point straight at the live site.
//
// ⚠️ DO NOT use this script for sites whose homepage animates before it
// settles — makobytes.com boots MakoOS and pixelcopy.app scroll-scrubs a
// cinematic, so Microlink captures a boot screen or a mid-flight frame.
// Those two are captured with Puppeteer instead: load, wait ~5s, scroll to
// top, then shoot at 1440x900 @2x to match the other thumbnails.
const sites = [
  { slug: "bulldog", url: "https://bulldog-showcase.vercel.app" },
  { slug: "aaaawning", url: "https://aaaawning-showcase.vercel.app" },
  { slug: "bndt", url: "https://bndt-showcase.vercel.app" },
  { slug: "utilities-plus", url: "https://utilities-plus-showcase.vercel.app" },
  { slug: "axyscorp", url: "https://axyscorp-showcase.vercel.app" },
  { slug: "bishopbend", url: "https://bishopbend-showcase.vercel.app" },
  { slug: "toppaws", url: "https://toppaws.com" },
  { slug: "makoanswer", url: "https://makoanswer.com" },
  { slug: "makobot", url: "https://makobot.com" },
  { slug: "machine-template", url: "https://machine-template-web.vercel.app" },
  { slug: "makopulse", url: "https://makopulse.com" },
  { slug: "woodlands", url: "https://woodlands-showcase.vercel.app" }
  // makobytes + pixelcopy deliberately omitted — Puppeteer only, see above.
];

// Optional slug filter:  node scripts/screenshots.mjs toppaws makobot
const wanted = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const filtered = wanted.length
  ? sites.filter((s) => wanted.includes(s.slug))
  : sites;

if (wanted.length && filtered.length !== wanted.length) {
  const missing = wanted.filter((w) => !sites.some((s) => s.slug === w));
  console.error(`Unknown slug(s): ${missing.join(", ")}`);
  process.exit(1);
}

const outDir = resolve(process.cwd(), "public", "portfolio");
await mkdir(outDir, { recursive: true });

const results = [];

for (const site of filtered) {
  const api = new URL("https://api.microlink.io/");
  api.searchParams.set("url", site.url);
  api.searchParams.set("screenshot", "true");
  api.searchParams.set("meta", "false");
  api.searchParams.set("embed", "screenshot.url");
  api.searchParams.set("viewport.width", "1440");
  api.searchParams.set("viewport.height", "900");
  api.searchParams.set("waitUntil", "networkidle0");

  process.stdout.write(`→ ${site.slug.padEnd(16)} `);
  try {
    const res = await fetch(api.toString(), { redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.startsWith("image/")) {
      throw new Error(`unexpected content-type: ${contentType}`);
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    const ext = contentType.includes("jpeg") ? "jpg" : "png";
    const filename = `${site.slug}.${ext}`;
    await writeFile(resolve(outDir, filename), buffer);
    const kb = (buffer.length / 1024).toFixed(0);
    console.log(`✓ ${filename} (${kb} KB)`);
    results.push({ slug: site.slug, ok: true, filename, size: buffer.length });
  } catch (e) {
    console.log(`✗ ${e.message}`);
    results.push({ slug: site.slug, ok: false, error: e.message });
  }

  // tiny delay to be polite to the free tier
  await new Promise((r) => setTimeout(r, 1500));
}

const ok = results.filter((r) => r.ok).length;
const fail = results.length - ok;
console.log(`\nDone. ${ok} saved, ${fail} failed.`);
if (fail > 0) process.exit(1);
