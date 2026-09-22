---
name: prospect-aws-app-takeover
description: OPEN (2026-08-04) — an existing MSP client asked Russell to take over a web app + database a third party built on AWS; client owns the code per contract; awaiting account/stack details
metadata: 
  node_type: memory
  type: project
  originSessionId: fa774725-c7a8-4bd7-a6ec-d57923c0af93
  modified: 2026-08-04T22:32:16.754Z
---

**OPEN ENGAGEMENT — asked 2026-08-04, Russell is gathering details ("I will find out").**

An existing client had a third party build a web app + "database hosted on Amazon S3"
and has asked Russell to take it over. Client name not yet given.

**UPDATE + FRAMING CORRECTION (2026-08-04, from Russell — supersedes the custody-risk
framing below):** The vendor's email confirmed the production server (EC2,
3.135.84.154, us-east-2) is provisioned in **Russell's side's own AWS account** — access
Russell's side granted them. This is the easy scenario: no account transfer, no
migration. Russell PAID for the build and OWNS the code; the vendor is doing contracted
work, will help over the coming months, and the relationship ends normally whenever
Russell's side is self-sufficient. **Russell's words: "Stop assuming we're fucking
them. We paid them and we own the code."** Do NOT frame this engagement as covert,
adversarial, or leverage-based — the vendor questions (repo access, IAM inventory,
secrets locations, third-party account ownership, backups, Elastic IP before DNS) are
ordinary owner due diligence, nothing more. Sent to Russell as a 16-question list
2026-08-04; answers pending.

**Already settled:** the contract assigns **code ownership to the client**. That clears
the single biggest blocker (a license-not-work-for-hire deal would have made takeover
legally impossible). Remaining risk is logistics and custody, not law.

**"Database on S3" is almost certainly wrong** — S3 is object storage and cannot run a
database. Expect S3 (+ likely CloudFront) serving a static frontend, with real data in
DynamoDB, RDS/Aurora, or JSON blobs in a bucket, probably with Lambda + API Gateway
between them. Confirm the real architecture before quoting anything; whoever said "S3"
either simplified or doesn't know the stack.

**The question that sizes the job — whose AWS account is it in?**
1. *Client owns the account* → easy. Take root email + password, rotate everything,
   replace shared-root with proper IAM.
2. *Third party owns it, client is a member account in the agency's AWS Organization* →
   good path exists: **AWS Organizations direct account transfer** (shipped Nov 2025)
   moves the account org-to-org with resources, resource IDs and data preserved, no
   rebuild. Both sides must act (they invite, receiver accepts). Formal ownership change
   also needs an AWS support case: Account and billing → Account → Ownership Transfer.
3. *Client's resources are mixed INTO the agency's shared account alongside other
   clients* → nothing is transferable; everything must be migrated out resource by
   resource. This is the expensive/hostile case — identify it early.

**Ownership of code ≠ possession, and ≠ the rest.** Insist on the repo WITH git history
(not a zip snapshot), the IaC (Terraform/CDK/CloudFormation — or an honest "it was all
clickops"), CI/CD config, and env vars/secrets. Separately confirm the client owns the
AWS account and the DATA, and hunt for third-party dependencies still in the agency's
name (paid API keys, Mapbox/Twilio/SendGrid/Stripe accounts, licensed components or
fonts) — those do not transfer with code ownership and are what breaks a month later
when the agency's card is removed. Also check the contract for a **transition-assistance
/ termination-cooperation clause** — if present it is leverage for a cooperative handover.

**Russell's asked-for list:** AWS account ID + standalone-or-in-an-Organization; root or
admin IAM access; source repo + CI/CD location; the original build contract; inventory of
running services; DNS/registrar control; last 3 months of AWS invoices.

**MY RECOMMENDATION (given, not yet decided): take custody FIRST, decide the stack
SECOND.** Do not commit to running it long-term on AWS as-is before we can see it. The
whole fleet is Vercel + Supabase and every piece of Russell's tooling — portal
monitoring, MakoPulse heartbeats, the error bridge, the duty officer, weekly security
sweeps — has ZERO coverage for a bespoke AWS stack; one client on unwatched
infrastructure is how things rot quietly. Once visible the answer is usually either
"small, rebuild it on his stack" or "substantial, keep it on AWS and wire the monitoring
in." Also: get the current AWS bill before agreeing — whoever owns the account owns the
run rate, and that sets the pricing floor against [[pricing-waas-model]].

**Step one after custody is a security audit, not a feature.** He inherits the third
party's posture the moment he takes it. The AWS equivalents of today's Supabase finding
are public S3 buckets, unauthenticated API Gateway routes and over-broad IAM — see
[[supabase-rls-fleet-exposure-2026-08]] for why "nobody checked the setting" is the
normal case, not the rare one.

**I OWE, once he reports back:** read the contract for the data / infrastructure /
transition-assistance clauses (he has only confirmed the code-IP clause), and run the
assessment of what is actually running, what it costs, and what shape it is in.
Per Russell's standing rule I review contracts myself — never tell him to get a lawyer.

---

## Handover information sheet (given to Russell 2026-08-04 — fill in as vendor answers)

**Probe fact:** 3.135.84.154 = real EC2 in us-east-2 (Ohio); answered on neither :80
nor :443 on 2026-08-04 (consistent with "point DNS first, then we issue certs").

**Application:** language + version · framework (the single biggest maintainability
fact) · frontend + build · web server / process manager / Docker-or-bare · server OS.

**Database:** engine + version · where it runs (same EC2 vs RDS — changes backup and
cost story) · DB names, size, connection method · admin credentials + who holds them.

**Code:** repo location + our access WITH git history · clean-checkout-to-running
build steps · private/paid packages · complete env-var list with meanings.

**AWS:** every resource (EC2 type/size, Elastic IP, S3, LB, DNS zones, security
groups) · IaC or clickops · open ports + SSH key holders.

**Third parties:** every external service (email, payments, SMS, maps, analytics,
auth) — and for EACH: whose account, whose card, where the key lives. Anything under
the vendor's account must migrate before wind-down (the classic month-later breakage).

**Operations:** backups (what/where/schedule/restore-tested?) · step-by-step deploy
procedure · scheduled jobs · SSL issuance/renewal · monitoring + alert recipient ·
expected monthly AWS cost.

**Access:** portal admin logins · user/role model · vendor's IAM users + access keys
in our account (clean record of what access exists).

**Documents:** architecture diagram · README/runbook · original spec/scope doc.

**The four answers that shape everything:** framework, database engine + location,
deploy procedure, third-party account ownership. Once in, I assess maintainability,
run cost, and how much vendor help is genuinely still needed.

**Also pending:** the 16-question vendor email (sent to Russell same day — includes
the Elastic-IP-before-DNS check, the subdomain list, and the HTTPS plan).
