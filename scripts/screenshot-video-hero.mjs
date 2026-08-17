#!/usr/bin/env node
/**
 * Thumbnail capture for portfolio sites whose homepage ANIMATES before it
 * settles. Microlink (scripts/screenshots.mjs) grabs a poster/boot/blank frame
 * on these, so they get driven in a real browser instead.
 *
 * Usage:
 *   npm i -D puppeteer-core           # one-off, local only
 *   node scripts/screenshot-video-hero.mjs               # all entries
 *   node scripts/screenshot-video-hero.mjs nautidawgs    # one slug
 *
 * Output matches every other thumbnail: 1440x900 @2x => 2880x1800 PNG in
 * public/portfolio/<slug>.png.
 *
 * Each entry may pin `frame` (seconds into the hero video). Seeking to a fixed
 * frame is deliberate: wall-clock waiting lands on a different moment every run,
 * so the tile drifts. Pin the moment that best represents the product.
 */

import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const sites = [
  {
    slug: "nautidawgs",
    url: "https://nautidawgs-showcase.vercel.app/",
    // hero film is 10s; t=2.0 is the money frame — dog mid-climb ON the ladder,
    // mounting plate in the same brushed finish as the ladder, and "Get On Up"
    // legible on the front-facing strip at the platform edge.
    frame: 2.0,
    // guards: refuse to save a thumbnail that misrepresents what shipped
    expectVideo: /hero-v8/,
    expectText: "$499",
  },
  {
    slug: "makobytes",
    url: "https://makobytes.com/",
    // boots MakoOS — no <video>, just needs time to settle
    settle: 6000,
  },
  {
    slug: "pixelcopy",
    url: "https://pixelcopy.app/",
    // scroll-scrubbed cinematic — needs time, then scroll back to top
    settle: 6000,
  },
];

const wanted = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const filtered = wanted.length
  ? sites.filter((s) => wanted.includes(s.slug))
  : sites;

if (wanted.length && filtered.length !== wanted.length) {
  const missing = wanted.filter((w) => !sites.some((s) => s.slug === w));
  console.error(`Unknown slug(s): ${missing.join(", ")}`);
  process.exit(1);
}

let puppeteer;
try {
  ({ default: puppeteer } = await import("puppeteer-core"));
} catch {
  console.error(
    "puppeteer-core is not installed. It is a local authoring tool only —\n" +
      "install it when you need to refresh these thumbnails:\n\n" +
      "  npm i -D puppeteer-core\n"
  );
  process.exit(1);
}

const outDir = resolve(process.cwd(), "public", "portfolio");
await mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: "new",
  executablePath: process.env.CHROME_PATH || CHROME,
  args: ["--autoplay-policy=no-user-gesture-required"],
});

const results = [];

for (const site of filtered) {
  const out = resolve(outDir, `${site.slug}.png`);
  process.stdout.write(`→ ${site.slug.padEnd(16)} `);
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto(site.url, { waitUntil: "networkidle0", timeout: 90000 });
    await new Promise((r) => setTimeout(r, site.settle ?? 5000));
    await page.evaluate(() => window.scrollTo(0, 0));

    if (site.frame != null) {
      // prove the hero video is genuinely PLAYING before pinning a frame — a
      // paused video at t=0 is exactly the blank/poster capture we're avoiding
      const state = await page.evaluate(() => {
        const v = document.querySelector("video");
        if (!v) return null;
        return {
          src: v.currentSrc,
          currentTime: v.currentTime,
          paused: v.paused,
          readyState: v.readyState,
        };
      });
      if (!state) throw new Error("no <video> element — would capture a still hero");
      if (state.paused || state.currentTime === 0 || state.readyState < 2) {
        throw new Error(
          `hero video not playing (paused=${state.paused} t=${state.currentTime} rs=${state.readyState})`
        );
      }
      if (site.expectVideo && !site.expectVideo.test(state.src)) {
        throw new Error(`unexpected hero video: ${state.src}`);
      }

      await page.evaluate(async (t) => {
        const v = document.querySelector("video");
        v.pause();
        await new Promise((res) => {
          v.addEventListener("seeked", res, { once: true });
          v.currentTime = t;
        });
      }, site.frame);
      await new Promise((r) => setTimeout(r, 600));

      const after = await page.evaluate(() => {
        const v = document.querySelector("video");
        return { currentTime: v.currentTime, videoWidth: v.videoWidth };
      });
      if (Math.abs(after.currentTime - site.frame) > 0.35) {
        throw new Error(`seek missed: wanted ${site.frame}, got ${after.currentTime}`);
      }
      if (!after.videoWidth) throw new Error("video has no decoded dimensions — blank frame");
    }

    if (site.expectText) {
      const found = await page.evaluate(
        (needle) => document.body.innerText.includes(needle),
        site.expectText
      );
      if (!found) throw new Error(`page does not contain ${site.expectText}`);
    }

    await page.screenshot({ path: out });
    console.log(`✓ ${site.slug}.png`);
    results.push({ slug: site.slug, ok: true });
  } catch (e) {
    console.log(`✗ ${e.message}`);
    results.push({ slug: site.slug, ok: false, error: e.message });
  } finally {
    await page.close();
  }
}

await browser.close();

const ok = results.filter((r) => r.ok).length;
const fail = results.length - ok;
console.log(`\nDone. ${ok} saved, ${fail} failed.`);
if (fail > 0) process.exit(1);
