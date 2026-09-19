import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnglerFish from "@/components/AnglerFish";

export const metadata: Metadata = {
  title: "Pricing — Mako Studio",
  description:
    "One plan, no surprises: a custom AI-native website for $0 down at $349/mo — built, hosted, secured, and maintained. Social media + Google Business Profile management for $200/mo. Maintenance for existing sites from $149/mo. No ghost pricing.",
  alternates: { canonical: "https://makoai.studio/pricing" }
};

const msTiers = [
  {
    name: "Care",
    price: "$149",
    tagline: "Keep the lights on.",
    features: [
      "Hosting + SSL + domain routing",
      "Automated daily backups",
      "Uptime monitoring",
      "Security monitoring + patch updates",
      "Domain + email routing managed"
    ]
  },
  {
    name: "Standard",
    price: "$249",
    tagline: "The real MSP tier.",
    features: [
      "Everything in Care",
      "30–60 minutes of content/design edits per month",
      "Quarterly performance + SEO review",
      "Content + image refreshes",
      "Rolling dependency audits"
    ],
    highlighted: true
  },
  {
    name: "Growth",
    price: "$349",
    tagline: "Active hands on your site.",
    features: [
      "Everything in Standard",
      "2 hours of edits / improvements per month",
      "Light SEO + analytics review",
      "Performance tuning",
      "Priority response (same-day on business days)"
    ]
  }
];

const waasIncludes = [
  "A custom, AI-native build of up to a dozen pages — designed for your business, never a template",
  "Hosting, SSL, domain + email routing, fully managed",
  "Security hardening, daily backups, uptime + patch monitoring",
  "Monthly content & design edits",
  "SEO + analytics review and performance tuning",
  "A direct line to the person who actually built it"
];

const socialIncludes = [
  "Google Business Profile managed — posts, photos, hours, Q&A kept current",
  "Review monitoring with responses drafted in your voice",
  "Facebook page posts and replies, on a steady schedule",
  "YouTube uploads posted with titles and descriptions written for search",
  "Name, address, and phone kept consistent across every listing",
  "Posts drawn from your real work — never generic filler",
  "A plain-English monthly recap of what went out and what it did"
];

const waasSteps = [
  "Free discovery + build — we scope, design, and build your site at $0 down.",
  "Launch — your site goes live on fast, managed hosting.",
  "We keep it shipped — security, backups, edits, and SEO every month."
];

const faqs = [
  {
    q: "How does the $0-down / $349-a-month website work?",
    a: "We design and build your custom site at no upfront cost, then host, secure, and maintain it for $349/month on a 12-month term. After the first year it goes month-to-month — cancel anytime with 30 days' notice. Want to leave early or own the site outright? Pay a one-time build buy-out and the site is yours, code and all. No lock-in games, no held-hostage files."
  },
  {
    q: "What size site does the $0-down plan include?",
    a: "The free $0-down build covers a custom site of up to a dozen pages with custom design, Google Maps + local SEO, analytics, Cloudflare email, and a light CMS for your own copy edits. That fits the large majority of small-business sites. Need an AI feature (chatbot, smart search, AI content generator) or something bigger — a client portal, a multi-tenant app, complex integrations? We fold it in for a quoted adder on top of the $349 — and we tell you the number before we start, never a surprise."
  },
  {
    q: "Do I own my website on the $0-down plan?",
    a: "Your domain and all your content are always yours — registered in your name, portable, no strings. The site's code itself stays ours while you're on the plan; that's the trade that lets us build it for nothing up front. Any time you want to own the code outright, pay the one-time build buy-out and it's fully yours."
  },
  {
    q: "What happens to my site if I cancel?",
    a: "Finish the 12-month term and you can cancel anytime after with 30 days' notice. If you want to keep the exact site, pay the one-time buy-out and we hand over the code and help you move it — it's yours. If you don't buy it out, the build and its managed hosting come down when the plan ends, but your domain and content stay with you to take anywhere. We tell you the buy-out number up front, so it's never a surprise."
  },
  {
    q: "Will the $349 go up on me?",
    a: "Not during your term — the rate you start at is locked for the 12 months. After that it stays month-to-month at the same price unless we agree otherwise. Any future pricing changes only ever apply to new sign-ups, never retroactively to clients already on a plan."
  },
  {
    q: "What if a change is bigger than my monthly maintenance covers?",
    a: "We flag it the moment we see it, send a quick quote for the extra time, and wait for your approval before starting. No surprise invoices, ever. Most months, maintenance covers everything."
  },
  {
    q: "Do I need the $349 plan to get social media management?",
    a: "No. The $200/mo presence management stands on its own — we can manage your Google Business Profile, Facebook, and YouTube even if someone else built your website. It also stacks onto the $349 plan or any maintenance tier, and most clients pair it with one of those so the whole online presence is handled in one place."
  },
  {
    q: "What about existing clients — are you raising prices on them?",
    a: "No. Existing maintenance clients stay at their current rate. New pricing applies only to new clients and new engagements."
  },
  {
    q: "Do I pay for hosting + domain separately?",
    a: "No. Both the $349 plan and our maintenance tiers include hosting (Vercel) and the domain's DNS / email routing (Cloudflare). You only pay your domain registrar its annual renewal fee (typically $10–$15/year — we register at cost through Cloudflare)."
  },
  {
    q: "Why is this cheaper than other agencies?",
    a: "We're AI-native, not AI-assisted. Every project runs through one engineer with AI leverage end-to-end — no hand-offs between designer / developer / PM. That's the overhead traditional agencies bill you for. We cut it out, keep the quality, pass the savings."
  },
  {
    q: "What's not included in the price?",
    a: "Third-party paid services (paid stock photography, premium fonts you specifically ask for, paid API plans), professional copywriting if you want us to write from scratch (we edit what you have; full copywriting is a quoted add-on), and paid SEO / paid ads (separate specialty)."
  },
  {
    q: "Can we start small and upgrade later?",
    a: "Yes. Many clients add an AI feature (chatbot, smart search) 6–12 months in, which we bolt on at that point for a quoted adder."
  }
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a
    }
  }))
};

export default function PricingPage() {
  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-16">
        <div className="absolute inset-0 bg-surface-light pointer-events-none" />
        {/* The resident anglerfish, drifting in the open water right of
            the hero copy. Decorative only: pointer-inert, aria-hidden,
            dark theme + large screens only. */}
        <div
          className="angler-wrap pointer-events-none absolute hidden lg:block right-[3%] xl:right-[6%] -bottom-36 w-[340px] xl:w-[400px]"
          aria-hidden="true"
        >
          <AnglerFish />
        </div>
        <div className="container-narrow relative">
          <span className="section-label">Pricing</span>
          <h1 className="mt-5 font-display font-medium text-[44px] md:text-[72px] leading-[1.02] tracking-tight">
            No ghost pricing.
            <br />
            <span className="italic text-transparent bg-clip-text bg-linear-to-r from-lumen-300 via-tide-300 to-mist-200">
              No $500/mo SEO scam.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-[17px] md:text-[19px] text-mist-300 leading-relaxed">
            Most agencies bury pricing and hand you a $12,000 quote for a
            brochure site. We don&apos;t. One plan: a custom, AI-native site for{" "}
            <span className="text-mist-100 font-semibold">$0 down at $349/mo</span>{" "}
            — built, hosted, secured, and maintained by the people who made it.
            What you see below is what you pay. No ghost pricing, no surprise
            fees.
          </p>
          <Link
            href="/seo"
            className="mt-6 inline-flex items-center gap-1.5 text-[14px] text-lumen-300 hover:text-lumen-200 font-medium transition-colors"
          >
            Read our honest take on that $500/mo SEO scam
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none">
              <path
                d="M3 8h10m0 0l-4-4m4 4l-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* $0-Down / Website-as-a-Service — flagship */}
      <section className="pt-4 pb-20 md:pb-28">
        <div className="container-narrow">
          <div className="mb-10">
            <span className="section-label">The plan · $0 down</span>
            <h2 className="mt-4 font-display font-medium text-[32px] md:text-[44px] leading-tight tracking-tight">
              Free build.{" "}
              <span className="italic text-transparent bg-clip-text bg-linear-to-r from-lumen-300 via-tide-300 to-mist-200">
                $349 a month.
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-[15px] text-mist-300 leading-relaxed">
              No big check up front. We design and build your custom,
              AI-native site for <span className="text-mist-100 font-semibold">$0 down</span>, then host, secure, and
              maintain it for one flat monthly price. It&apos;s the way our
              clients launch — no big invoice, no handover, no site slowly
              going stale.
            </p>
          </div>

          <div className="glass-deep rounded-3xl border border-lumen-400/40 shadow-glow-lumen p-8 md:p-10">
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12">
              {/* Offer + price + CTA + exit */}
              <div className="flex flex-col">
                <span className="inline-block self-start mb-5 px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold text-tide-200 bg-tide-500/15 border border-tide-500/30 rounded-full">
                  Website-as-a-Service
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-medium text-[56px] md:text-[64px] text-mist-100 leading-none">
                    $349
                  </span>
                  <span className="text-[16px] text-mist-400">/ mo</span>
                </div>
                <p className="mt-3 text-[14px] text-lumen-300 font-medium">
                  $0 down · free custom build · 12-month term, then month-to-month
                </p>

                <Link
                  href="/#contact"
                  className="mt-7 self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-tide-500 hover:bg-tide-400 text-white text-[14px] font-semibold transition-colors shadow-glow"
                >
                  Get your free build
                  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none">
                    <path
                      d="M3 8h10m0 0l-4-4m4 4l-4 4"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                <div className="mt-8 pt-6 border-t border-mist-300/10">
                  <h4 className="text-[14px] font-display font-medium text-mist-100">
                    What your free build covers
                  </h4>
                  <p className="mt-2 text-[13px] text-mist-300 leading-relaxed">
                    The $0-down build covers a{" "}
                    <span className="text-mist-100 font-semibold">custom site of up to a dozen pages</span>{" "}
                    with local SEO, analytics, and a light CMS. Want AI
                    features or a custom portal? We fold them in for a small
                    quoted adder — we tell you the number before we start.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-mist-300/10">
                  <h4 className="text-[14px] font-display font-medium text-mist-100">
                    You&apos;re never locked in.
                  </h4>
                  <p className="mt-2 text-[13px] text-mist-300 leading-relaxed">
                    Cancel after 12 months with 30 days&apos; notice — no penalty.
                    Want to leave early, or own the site outright? Pay a
                    one-time build buy-out and it&apos;s yours, code and all. No
                    hostage situations, ever.
                  </p>
                </div>
              </div>

              {/* What's included + how it works */}
              <div className="flex flex-col gap-8 lg:border-l lg:border-mist-300/10 lg:pl-12">
                <div>
                  <h4 className="text-[12px] uppercase tracking-widest font-semibold text-mist-400 mb-4">
                    Everything&apos;s included
                  </h4>
                  <ul className="space-y-2.5 text-[13px] text-mist-300 leading-relaxed">
                    {waasIncludes.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="text-lumen-400 mt-0.5 shrink-0">+</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[12px] uppercase tracking-widest font-semibold text-mist-400 mb-4">
                    How it works
                  </h4>
                  <ol className="space-y-3 text-[13px] text-mist-300 leading-relaxed">
                    {waasSteps.map((s, i) => (
                      <li key={s} className="flex items-start gap-3">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-tide-500/15 border border-tide-500/30 text-tide-200 text-[11px] font-semibold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Maintenance */}
      <section className="py-20 md:py-28">
        <div className="container-narrow">
          <div className="mb-12">
            <span className="section-label">After your term</span>
            <h2 className="mt-4 font-display font-medium text-[32px] md:text-[44px] leading-tight tracking-tight">
              Monthly maintenance.
            </h2>
            <p className="mt-3 max-w-xl text-[15px] text-mist-300 leading-relaxed">
              Finished your 12-month term and bought your site out, or have a
              site you already own? These tiers keep it healthy without the
              full plan. Pick one based on how often you want us touching it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {msTiers.map((t) => (
              <article
                key={t.name}
                className={`glass-deep rounded-2xl p-7 flex flex-col ${t.highlighted ? "border-lumen-400/40 shadow-glow-lumen" : ""}`}
              >
                {t.highlighted ? (
                  <span className="inline-block self-start mb-3 px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold text-tide-200 bg-tide-500/15 border border-tide-500/30 rounded-full">
                    Recommended
                  </span>
                ) : null}
                <h3 className="font-display text-[22px] font-semibold text-mist-100">
                  {t.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-display font-medium text-[36px] text-mist-100 leading-none">
                    {t.price}
                  </span>
                  <span className="text-[14px] text-mist-400">/ mo</span>
                </div>
                <p className="mt-3 text-[13px] text-lumen-300 font-medium">
                  {t.tagline}
                </p>
                <ul className="mt-5 space-y-2 text-[13px] text-mist-300 leading-relaxed flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-lumen-400 mt-0.5 shrink-0">+</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-8 text-[13px] text-mist-400 italic max-w-2xl">
            Anything larger than what maintenance covers — a new section, a new
            integration, a redesign — is quoted separately. You approve the
            estimate before we start. Never any surprise invoices.
          </p>
        </div>
      </section>

      {/* Social & presence management */}
      <section className="py-20 md:py-28">
        <div className="container-narrow">
          <div className="mb-10">
            <span className="section-label">Add-on · your presence everywhere else</span>
            <h2 className="mt-4 font-display font-medium text-[32px] md:text-[44px] leading-tight tracking-tight">
              Social &amp;{" "}
              <span className="italic text-transparent bg-clip-text bg-linear-to-r from-lumen-300 via-tide-300 to-mist-200">
                Google Business
              </span>{" "}
              management.
            </h2>
            <p className="mt-3 max-w-xl text-[15px] text-mist-300 leading-relaxed">
              Your website is only part of how customers find you. We keep the
              rest of it alive too — Google Business Profile, Facebook,
              YouTube — posting, responding, and keeping every listing
              accurate, so you never have to log into any of them.
            </p>
          </div>

          <div className="glass-deep rounded-3xl p-8 md:p-10">
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12">
              <div className="flex flex-col">
                <span className="inline-block self-start mb-5 px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold text-tide-200 bg-tide-500/15 border border-tide-500/30 rounded-full">
                  Presence management
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-medium text-[56px] md:text-[64px] text-mist-100 leading-none">
                    $200
                  </span>
                  <span className="text-[16px] text-mist-400">/ mo</span>
                </div>
                <p className="mt-3 text-[14px] text-lumen-300 font-medium">
                  Add it to the $349 plan or any maintenance tier — or take it
                  on its own
                </p>
                <p className="mt-5 text-[13px] text-mist-300 leading-relaxed">
                  Most small businesses set these profiles up once and never
                  touch them again — and Google notices. A profile that posts,
                  answers reviews, and keeps its hours right outranks one that
                  went quiet in 2023.
                </p>
                <Link
                  href="/#contact"
                  className="mt-7 self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-tide-500 hover:bg-tide-400 text-white text-[14px] font-semibold transition-colors shadow-glow"
                >
                  Add presence management
                  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none">
                    <path
                      d="M3 8h10m0 0l-4-4m4 4l-4 4"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>

              <div className="lg:border-l lg:border-mist-300/10 lg:pl-12">
                <h4 className="text-[12px] uppercase tracking-widest font-semibold text-mist-400 mb-4">
                  What we handle every month
                </h4>
                <ul className="space-y-2.5 text-[13px] text-mist-300 leading-relaxed">
                  {socialIncludes.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-lumen-400 mt-0.5 shrink-0">+</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="container-narrow max-w-3xl">
          <div className="mb-10">
            <span className="section-label">Straight answers</span>
            <h2 className="mt-4 font-display font-medium text-[32px] md:text-[44px] leading-tight tracking-tight">
              Common questions.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="glass-deep rounded-2xl p-6 group">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                  <h3 className="font-display font-medium text-[16px] text-mist-100 group-hover:text-white">
                    {f.q}
                  </h3>
                  <span className="text-mist-400 group-open:rotate-45 transition-transform text-[22px] leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-[14px] text-mist-300 leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="container-narrow text-center">
          <span className="section-label">Next</span>
          <h2 className="mt-5 font-display font-medium text-[32px] md:text-[48px] leading-tight tracking-tight">
            Ready for your free build?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-[15px] text-mist-300 leading-relaxed">
            Tell us about your business. We&apos;ll come back within one
            business day with a real scope — and if your project needs more
            than the standard build covers, we tell you the adder before we
            start, never after.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-tide-500 hover:bg-tide-400 text-white text-[14px] font-semibold transition-colors shadow-glow"
            >
              Get your free build
              <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none">
                <path
                  d="M3 8h10m0 0l-4-4m4 4l-4 4"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-mist-300/10 hover:border-lumen-400/40 text-mist-100 hover:text-white text-[14px] font-semibold transition-colors"
            >
              See the work first
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
