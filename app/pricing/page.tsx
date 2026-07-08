import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pricing — Mako Studio",
  description:
    "Honest pricing for custom AI-native websites. Get a custom site for $0 down at $349/mo, or own it outright from $2,500. Monthly maintenance from $149/mo with optional self-hosted email. No ghost pricing, no $500/mo SEO retainers, no surprise fees.",
  alternates: { canonical: "https://makoai.studio/pricing" }
};

const buildTiers = [
  {
    name: "Starter",
    price: "$2,500",
    tagline: "Most small-business sites start here.",
    features: [
      "Up to 5 pages",
      "Custom design (not a template)",
      "Contact form → your inbox",
      "Mobile-first, accessible",
      "Technical SEO baked in",
      "Deployed + 30 days of support"
    ],
    typicalClient: "Local service businesses, one-person shops, new ventures. Delivered in ~2 weeks."
  },
  {
    name: "Standard",
    price: "$4,000",
    tagline: "The sweet spot for growing businesses.",
    features: [
      "6–12 pages",
      "Everything in Starter",
      "Google Maps embed + local SEO",
      "Analytics wiring, Resend email",
      "Custom sections / interactions",
      "Light CMS for copy edits"
    ],
    typicalClient: "Practices, shops, and B2B companies that need more than a brochure. Delivered in ~3 weeks.",
    highlighted: true
  },
  {
    name: "Premium",
    price: "$6,000",
    tagline: "Custom build plus one AI feature.",
    features: [
      "Everything in Standard",
      "One AI feature of your choice:",
      "  · Chatbot on your content",
      "  · Smart search / AI lookup",
      "  · AI content generator",
      "Custom admin or CMS",
      "Priority launch support"
    ],
    typicalClient: "Businesses ready to differentiate with real AI. Delivered in 4–6 weeks."
  },
  {
    name: "Custom",
    price: "Let's talk",
    tagline: "Multi-admin portals, complex integrations, bigger scopes.",
    features: [
      "Client portals (like the one we built for ourselves)",
      "Multi-tenant apps",
      "Complex third-party integrations",
      "Ongoing product work",
      "RAG over internal docs",
      "Quoted scoped to your specific project"
    ],
    typicalClient: "Anything beyond the Premium tier. We scope it and price it before we start."
  }
];

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
      "Up to 5 self-hosted email accounts included"
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

const emailTiers = [
  {
    name: "Included with Care",
    price: "Bundled",
    range: "1–5 accounts",
    note: "Comes free with the Care maintenance tier."
  },
  {
    name: "Tier 1",
    price: "$50",
    range: "6–10 accounts",
    note: "Add-on for Care or higher."
  },
  {
    name: "Tier 2",
    price: "$100",
    range: "11–25 accounts",
    note: "Add-on for Care or higher.",
    highlighted: true
  },
  {
    name: "Tier 3",
    price: "$200",
    range: "26–50 accounts",
    note: "Add-on for Care or higher."
  }
];

const waasIncludes = [
  "A custom, AI-native build up to our Standard tier (6–12 pages) — designed for your business, never a template",
  "Hosting, SSL, domain + email routing, fully managed",
  "Up to 5 self-hosted you@yourdomain.com mailboxes",
  "Security hardening, daily backups, uptime + patch monitoring",
  "Monthly content & design edits",
  "SEO + analytics review and performance tuning",
  "A direct line to the person who actually built it"
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
    a: "The free $0-down build covers up to our Standard tier — a custom 6–12 page site with custom design, Google Maps + local SEO, analytics, Resend email, and a light CMS for your own copy edits. That fits the large majority of small-business sites. Need a Premium AI feature (chatbot, smart search, AI content generator) or a Custom build (client portal, multi-tenant app, complex integrations)? We fold it in for a quoted adder on top of the $349 — and we tell you the number before we start, never a surprise."
  },
  {
    q: "$0-down or buy outright — which should I pick?",
    a: "If you'd rather not write a big check up front and you want us handling hosting, security, and edits every month, the $0-down plan at $349/mo is the easiest way to launch. If you'd rather own the site outright from day one and keep monthly costs minimal, buy it outright from $2,500 and add a maintenance tier only if you want one. Same custom build either way."
  },
  {
    q: "Do I own my website on the $0-down plan?",
    a: "Your domain and all your content are always yours — registered in your name, portable, no strings. The site's code itself stays ours while you're on the $0-down plan; that's the trade that lets us build it for nothing up front. Any time you want to own the code outright, pay the one-time build buy-out and it's fully yours. Prefer to own everything from day one? Buy the site outright instead — same build."
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
    q: "What about existing clients — are you raising prices on them?",
    a: "No. Existing maintenance clients stay at their current rate. New pricing applies only to new clients and new engagements."
  },
  {
    q: "Do I pay for hosting + domain separately?",
    a: "No. Both the $0-down plan and our maintenance tiers include hosting (Vercel) and the domain's DNS / email routing (Cloudflare). You only pay your domain registrar its annual renewal fee (typically $10–$15/year — we register at cost through Cloudflare)."
  },
  {
    q: "Why is this cheaper than other agencies?",
    a: "We're AI-native, not AI-assisted. Every project runs through one engineer with AI leverage end-to-end — no hand-offs between designer / developer / PM. That's the overhead traditional agencies bill you for. We cut it out, keep the quality, pass the savings."
  },
  {
    q: "What's not included in the price?",
    a: "Whether you're on the $0-down plan or buying outright: third-party paid services (paid stock photography, premium fonts you specifically ask for, paid API plans), professional copywriting if you want us to write from scratch (we edit what you have; full copywriting is a quoted add-on), and paid SEO / paid ads (separate specialty)."
  },
  {
    q: "Can we start small and upgrade later?",
    a: "Yes. Many Starter-tier clients add a Growth feature (chatbot, AI search) 6–12 months in, which we bolt on at that point for a quoted adder."
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
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-16">
        <div className="absolute inset-0 bg-surface-light pointer-events-none" />
        <div className="container-narrow relative">
          <span className="section-label">Pricing</span>
          <h1 className="mt-5 font-display font-medium text-[44px] md:text-[72px] leading-[1.02] tracking-tight">
            No ghost pricing.
            <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-lumen-300 via-tide-300 to-mist-200">
              No $500/mo SEO scam.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-[17px] md:text-[19px] text-mist-300 leading-relaxed">
            Most agencies bury pricing and hand you a $12,000 quote for a
            brochure site. We don't. Get a custom, AI-native site for{" "}
            <span className="text-mist-100 font-semibold">$0 down at $349/mo</span>{" "}
            — or own it outright from $2,500. What you see below is what you
            pay. No ghost pricing, no surprise fees.
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
            <span className="section-label">Most popular · $0 down</span>
            <h2 className="mt-4 font-display font-medium text-[32px] md:text-[44px] leading-tight tracking-tight">
              Free build.{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-lumen-300 via-tide-300 to-mist-200">
                $349 a month.
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-[15px] text-mist-300 leading-relaxed">
              No big check up front. We design and build your custom,
              AI-native site for <span className="text-mist-100 font-semibold">$0 down</span>, then host, secure, and
              maintain it for one flat monthly price. It's the way most small
              businesses launch with us.
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
                    The $0-down build covers up to our{" "}
                    <span className="text-mist-100 font-semibold">Standard tier</span>{" "}
                    — a custom 6–12 page site with local SEO, analytics, and a
                    light CMS. Want Premium AI features or a custom portal? We
                    fold them in for a small quoted adder — we tell you the
                    number before we start.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-mist-300/10">
                  <h4 className="text-[14px] font-display font-medium text-mist-100">
                    You're never locked in.
                  </h4>
                  <p className="mt-2 text-[13px] text-mist-300 leading-relaxed">
                    Cancel after 12 months with 30 days' notice — no penalty.
                    Want to leave early, or own the site outright? Pay a
                    one-time build buy-out and it's yours, code and all. No
                    hostage situations, ever.
                  </p>
                </div>
              </div>

              {/* What's included + how it works */}
              <div className="flex flex-col gap-8 lg:border-l lg:border-mist-300/10 lg:pl-12">
                <div>
                  <h4 className="text-[12px] uppercase tracking-widest font-semibold text-mist-400 mb-4">
                    Everything's included
                  </h4>
                  <ul className="space-y-2.5 text-[13px] text-mist-300 leading-relaxed">
                    {waasIncludes.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="text-lumen-400 mt-0.5 flex-shrink-0">+</span>
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
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-tide-500/15 border border-tide-500/30 text-tide-200 text-[11px] font-semibold flex items-center justify-center">
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

          <p className="mt-8 text-[13px] text-mist-400 italic max-w-2xl">
            Prefer to own your site outright from day one? Keep scrolling —
            same custom build, paid once instead of monthly.
          </p>
        </div>
      </section>

      {/* Build pricing — buy outright */}
      <section className="py-20 md:py-28">
        <div className="container-narrow">
          <div className="mb-12">
            <span className="section-label">Or buy it outright</span>
            <h2 className="mt-4 font-display font-medium text-[32px] md:text-[44px] leading-tight tracking-tight">
              Project pricing.
            </h2>
            <p className="mt-3 max-w-xl text-[15px] text-mist-300 leading-relaxed">
              Rather own it outright from day one and skip the monthly? These
              are fixed-price, pay-once builds. We scope it, you approve it, we
              deliver. No hourly billing, no padded estimates, no "scope creep"
              surcharges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {buildTiers.map((t) => (
              <article
                key={t.name}
                className={`glass-deep rounded-2xl p-7 flex flex-col ${t.highlighted ? "border-lumen-400/40 shadow-glow-lumen" : ""}`}
              >
                {t.highlighted ? (
                  <span className="inline-block self-start mb-3 px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold text-tide-200 bg-tide-500/15 border border-tide-500/30 rounded-full">
                    Most common
                  </span>
                ) : null}
                <h3 className="font-display text-[22px] font-semibold text-mist-100">
                  {t.name}
                </h3>
                <div className="mt-3 font-display font-medium text-[36px] text-mist-100 leading-none">
                  {t.price}
                </div>
                <p className="mt-3 text-[13px] text-lumen-300 font-medium">
                  {t.tagline}
                </p>
                <ul className="mt-5 space-y-2 text-[13px] text-mist-300 leading-relaxed flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      {f.startsWith("  ·") ? (
                        <>
                          <span className="w-4 flex-shrink-0" />
                          <span className="text-mist-400">{f.replace("  · ", "")}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-lumen-400 mt-0.5 flex-shrink-0">+</span>
                          <span>{f}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 pt-5 text-[12px] text-mist-400 italic leading-relaxed">
                  {t.typicalClient}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance */}
      <section className="py-20 md:py-28">
        <div className="container-narrow">
          <div className="mb-12">
            <span className="section-label">Ongoing</span>
            <h2 className="mt-4 font-display font-medium text-[32px] md:text-[44px] leading-tight tracking-tight">
              Monthly maintenance.
            </h2>
            <p className="mt-3 max-w-xl text-[15px] text-mist-300 leading-relaxed">
              Your site shipped. Now it needs to stay shipped. Pick a tier
              based on how often you want us touching it.
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
                      <span className="text-lumen-400 mt-0.5 flex-shrink-0">+</span>
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

      {/* Email hosting */}
      <section className="py-20 md:py-28">
        <div className="container-narrow">
          <div className="mb-12">
            <span className="section-label">Email hosting</span>
            <h2 className="mt-4 font-display font-medium text-[32px] md:text-[44px] leading-tight tracking-tight">
              Mailboxes,{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-lumen-300 via-tide-300 to-mist-200">
                on our server.
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-[15px] text-mist-300 leading-relaxed">
              Real <code>you@yourdomain.com</code> mailboxes hosted on our own
              cPanel — no Google Workspace tax, no per-seat creep. The first
              five accounts come bundled with Care. Past that it scales in flat
              tiers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {emailTiers.map((t) => (
              <article
                key={t.name}
                className={`glass-deep rounded-2xl p-7 flex flex-col ${t.highlighted ? "border-lumen-400/40 shadow-glow-lumen" : ""}`}
              >
                {t.highlighted ? (
                  <span className="inline-block self-start mb-3 px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold text-tide-200 bg-tide-500/15 border border-tide-500/30 rounded-full">
                    Most common
                  </span>
                ) : null}
                <h3 className="font-display text-[18px] font-semibold text-mist-100">
                  {t.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-display font-medium text-[32px] text-mist-100 leading-none">
                    {t.price}
                  </span>
                  {t.price.startsWith("$") ? (
                    <span className="text-[13px] text-mist-400">/ mo</span>
                  ) : null}
                </div>
                <p className="mt-3 text-[13px] text-lumen-300 font-medium">
                  {t.range}
                </p>
                <p className="mt-3 text-[13px] text-mist-300 leading-relaxed flex-1">
                  {t.note}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-8 text-[13px] text-mist-400 italic max-w-2xl">
            Storage: each tier covers the first 20 GB of mail data shared
            across all accounts. Past that, every additional 10 GB is
            +$5 / month. We&apos;ll tell you before you cross the line.
          </p>
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
            Ready to get a real quote?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-[15px] text-mist-300 leading-relaxed">
            Tell us about your project. We'll come back within one business
            day with a real scope and a fixed quote — usually inside the tiers
            above, sometimes with a note about why it might fall outside.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-tide-500 hover:bg-tide-400 text-white text-[14px] font-semibold transition-colors shadow-glow"
            >
              Start a project
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
