#!/usr/bin/env node
/**
 * Lists every contact enquiry whose notification email did NOT go out, so a
 * prospect nobody was told about can be found and answered.
 *
 * WHY THIS EXISTS (added 2026-09-25). The contact route stores each enquiry in
 * the private Vercel Blob store `makoai-enquiries` BEFORE emailing it, then
 * stamps the send result onto the record as `notification: { sent, messageId,
 * error, attemptedAt }` (not `email` — that field is the sender's address). The route also tries to raise an alert when mail fails, but
 * that alert has no working destination yet (lib/alert.ts), so the store itself
 * is the source of truth. This script reads it.
 *
 * HOW TO RUN (from the repo root):
 *
 *     vercel env pull .env.production.local --environment=production
 *     node --env-file=.env.production.local scripts/unsent-enquiries.mjs
 *     del .env.production.local        (it holds live secrets; gitignored anyway)
 *
 * BLOB_READ_WRITE_TOKEN exists on Production only — a preview is a preview and
 * has no business reading the real enquiry pile — so pull production.
 *
 * Options:
 *     --env=preview|development   read another environment's folder (default production)
 *     --all                       print every record, not just the unsent ones
 *
 * What it prints, per record:
 *     FAILED   notification.sent === false — the reason is shown; answer this person
 *     UNKNOWN  no `notification` field — stored before 2026-09-25 (or the outcome
 *              write-back itself failed). Not a failure, just unrecorded:
 *              check the inbox for it before assuming it was missed.
 *     SENT     only with --all
 *
 * Exit code 1 when any FAILED record exists, so it can gate a cron later.
 * Read-only: it never modifies or deletes anything.
 */
import { get, list } from "@vercel/blob";

const args = process.argv.slice(2);
const envArg = args.find((a) => a.startsWith("--env="));
const environment = envArg ? envArg.slice("--env=".length) : "production";
const showAll = args.includes("--all");

// .trim(): a pasted env value with a trailing newline broke this site's mail
// for 79 days. Same guard as everywhere else in the project.
const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
if (!token) {
  console.error(
    "BLOB_READ_WRITE_TOKEN is not set. Pull production env first — see the comment at the top of this file."
  );
  process.exit(2);
}

async function readRecord(pathname) {
  // useCache:false — records are rewritten in place once the email outcome is
  // known, and a cached copy could still show the pre-send version.
  const res = await get(pathname, { access: "private", token, useCache: false });
  if (!res || !res.stream) return null;
  const text = await new Response(res.stream).text();
  return JSON.parse(text);
}

const prefix = `enquiries/${environment}/`;
const blobs = [];
let cursor;
do {
  const page = await list({ prefix, cursor, limit: 1000, token });
  blobs.push(...page.blobs);
  cursor = page.hasMore ? page.cursor : undefined;
} while (cursor);

blobs.sort((a, b) => a.pathname.localeCompare(b.pathname));
console.log(`${blobs.length} enquir${blobs.length === 1 ? "y" : "ies"} under ${prefix}\n`);

const counts = { sent: 0, failed: 0, unknown: 0, unreadable: 0 };
for (const blob of blobs) {
  let record;
  try {
    record = await readRecord(blob.pathname);
  } catch (err) {
    counts.unreadable++;
    console.log(`UNREADABLE  ${blob.pathname}  (${err instanceof Error ? err.message : err})`);
    continue;
  }
  if (!record) {
    counts.unreadable++;
    console.log(`UNREADABLE  ${blob.pathname}  (not found)`);
    continue;
  }

  const who = `${record.name ?? "?"} <${record.email ?? "?"}>`;
  const when = record.receivedAt ?? blob.uploadedAt.toISOString();

  const outcome = record.notification;
  if (!outcome || typeof outcome.sent !== "boolean") {
    counts.unknown++;
    console.log(`UNKNOWN     ${when}  ${who}\n            ${blob.pathname}`);
  } else if (outcome.sent !== true) {
    counts.failed++;
    console.log(
      `FAILED      ${when}  ${who}\n            reason: ${outcome.error ?? "(none recorded)"}\n            ${blob.pathname}`
    );
  } else {
    counts.sent++;
    if (showAll) {
      console.log(`SENT        ${when}  ${who}  id=${outcome.messageId ?? "?"}`);
    }
  }
}

console.log(
  `\nsent: ${counts.sent}   failed: ${counts.failed}   unknown (pre-2026-09-25): ${counts.unknown}   unreadable: ${counts.unreadable}`
);
process.exit(counts.failed > 0 ? 1 : 0);
