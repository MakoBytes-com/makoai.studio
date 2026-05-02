import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pricing — Mako Studio",
  description:
    "Honest pricing for custom AI-native websites. Projects from $2,500. Most small-business sites land at $3,500–$4,500. Monthly maintenance from $99/mo. No ghost pricing, no $500/mo SEO retainers, no surprise fees.",
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
    price: "$99",
    tagline: "Keep the lights on.",
    features: [
      "Hosting + SSL + domain routing",
      "Automated daily backups",
      "Uptime monitoring",
      "Security monitoring + patch updates",
      "Email deliverability kept healthy"
    ]
  },
  {
    name: "Standard",
    price: "$149",
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
    price: "$249",
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

const faqs = [
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
    a: "Maintenance includes hosting (Vercel) and the domain's DNS / email routing (Cloudflare). You only pay your domain registrar its annual renewal fee (typically $10–$15/year — we register at cost through Cloudflare)."
  },
  {
    q: "Why is this cheaper than other agencies?",
    a: "We're AI-native, not AI-assisted. Every project runs through one engineer with AI leverage end-to-end — no hand-offs between designer / developer / PM. That's the overhead traditional agencies bill you for. We cut it out, keep the quality, pass the savings."
  },
  {
    q: "What's not included in the project price?",
    a: "Third-party paid services (paid stock photography, premium fonts you specifically ask for, paid API plans), professional copywriting if you want us to write from scratch (we edit what you have; full copywriting is a quoted add-on), and paid SEO / paid ads (separate specialty)."
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
        <div className="absolute inset-0 bg-hero-radial pointer-events-none" />
        <div className="container-narrow relative">
          <span className="section-label">Pricing</span>
          <h1 className="mt-5 font-display font-semibold text-[44px] md:text-[72px] leading-[1.02] tracking-tight">
            No ghost pricing.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tide-300 to-steel-200">
              No $500/mo SEO scam.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-[17px] md:text-[19px] text-steel-300 leading-relaxed">
            Most agencies bury pricing and hand you a $12,000 quote for a
            brochure site. We don't. Projects start at $2,500. Most small-
            business builds land at $3,500–$4,500. Monthly maintenance starts
            at $99. What you see below is what you pay.
          </p>
        </div>
      </section>

      {/* Build pricing */}
      <section className="py-20 md:py-28">
        <div className="container-narrow">
          <div className="mb-12">
            <span className="section-label">New builds</span>
            <h2 className="mt-4 font-display font-semibold text-[32px] md:text-[44px] leading-tight tracking-tight">
              Project pricing.
            </h2>
            <p className="mt-3 max-w-xl text-[15px] text-steel-300 leading-relaxed">
              Fixed-price tiers. We scope it, you approve it, we deliver. No
              hourly billing, no padded estimates, no "scope creep" surcharges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {buildTiers.map((t) => (
              <article
                key={t.name}
                className={`glass rounded-2xl p-7 flex flex-col ${t.highlighted ? "border-tide-500/40 shadow-glow" : ""}`}
              >
                {t.highlighted ? (
                  <span className="inline-block self-start mb-3 px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold text-tide-200 bg-tide-500/15 border border-tide-500/30 rounded-full">
                    Most common
                  </span>
                ) : null}
                <h3 className="font-display text-[22px] font-semibold text-steel-100">
                  {t.name}
                </h3>
                <div className="mt-3 font-display font-semibold text-[36px] text-steel-100 leading-none">
                  {t.price}
                </div>
                <p className="mt-3 text-[13px] text-tide-300 font-medium">
                  {t.tagline}
                </p>
                <ul className="mt-5 space-y-2 text-[13px] text-steel-300 leading-relaxed flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      {f.startsWith("  ·") ? (
                        <>
                          <span className="w-4 flex-shrink-0" />
                          <span className="text-steel-400">{f.replace("  · ", "")}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-tide-400 mt-0.5 flex-shrink-0">+</span>
                          <span>{f}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 pt-5 text-[12px] text-steel-400 italic leading-relaxed">
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
            <h2 className="mt-4 font-display font-semibold text-[32px] md:text-[44px] leading-tight tracking-tight">
              Monthly maintenance.
            </h2>
            <p className="mt-3 max-w-xl text-[15px] text-steel-300 leading-relaxed">
              Your site shipped. Now it needs to stay shipped. Pick a tier
              based on how often you want us touching it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {msTiers.map((t) => (
              <article
                key={t.name}
                className={`glass rounded-2xl p-7 flex flex-col ${t.highlighted ? "border-tide-500/40 shadow-glow" : ""}`}
              >
                {t.highlighted ? (
                  <span className="inline-block self-start mb-3 px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold text-tide-200 bg-tide-500/15 border border-tide-500/30 rounded-full">
                    Recommended
                  </span>
                ) : null}
                <h3 className="font-display text-[22px] font-semibold text-steel-100">
                  {t.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-display font-semibold text-[36px] text-steel-100 leading-none">
                    {t.price}
                  </span>
                  <span className="text-[14px] text-steel-400">/ mo</span>
                </div>
                <p className="mt-3 text-[13px] text-tide-300 font-medium">
                  {t.tagline}
                </p>
                <ul className="mt-5 space-y-2 text-[13px] text-steel-300 leading-relaxed flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-tide-400 mt-0.5 flex-shrink-0">+</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-8 text-[13px] text-steel-400 italic max-w-2xl">
            Anything larger than what maintenance covers — a new section, a new
            integration, a redesign — is quoted separately. You approve the
            estimate before we start. Never any surprise invoices.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="container-narrow max-w-3xl">
          <div className="mb-10">
            <span className="section-label">Straight answers</span>
            <h2 className="mt-4 font-display font-semibold text-[32px] md:text-[44px] leading-tight tracking-tight">
              Common questions.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="glass rounded-2xl p-6 group">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                  <h3 className="font-display font-semibold text-[16px] text-steel-100 group-hover:text-white">
                    {f.q}
                  </h3>
                  <span className="text-steel-400 group-open:rotate-45 transition-transform text-[22px] leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-[14px] text-steel-300 leading-relaxed">
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
          <h2 className="mt-5 font-display font-semibold text-[32px] md:text-[48px] leading-tight tracking-tight">
            Ready to get a real quote?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-[15px] text-steel-300 leading-relaxed">
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
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/10 hover:border-tide-500/40 text-steel-100 hover:text-white text-[14px] font-semibold transition-colors"
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
