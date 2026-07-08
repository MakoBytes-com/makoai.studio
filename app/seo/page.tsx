import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Honest SEO — What Actually Works (and What's a Scam) — Mako Studio",
  description:
    "Most SEO agencies sell fear and vague monthly retainers. Our honest take: only three things truly move the needle for a local business — a well-run Google Business Profile, real customer reviews, and a site built with the right keywords and schema. No $500/mo SEO scam.",
  alternates: { canonical: "https://makoai.studio/seo" },
  openGraph: {
    title: "Honest SEO — What Actually Works — Mako Studio",
    description:
      "Our honest take on SEO: Google Business Profile, customer reviews, and a site with real keywords + schema. The rest is theater.",
    url: "https://makoai.studio/seo",
    type: "website"
  }
};

const levers = [
  {
    number: "01",
    name: "Your Google Business Profile",
    tag: "The single biggest local lever",
    points: [
      "A complete, verified profile — right categories, hours, and service area",
      "Name, address, and phone that exactly match your website",
      "Real photos, products, posts, and Q&A kept current",
      "It's free, it's yours, and it's what powers the map pack at the top of local search"
    ]
  },
  {
    number: "02",
    name: "Customer reviews",
    tag: "Trust that compounds",
    points: [
      "Real Google reviews are social proof and a ranking signal at the same time",
      "A simple, repeatable way to ask happy customers — we set this up for you",
      "Responding to every review, good and bad, like a real business",
      "A steady flow of fresh reviews tells Google you're active and trusted"
    ]
  },
  {
    number: "03",
    name: "A site built right",
    tag: "Real keywords + clean code + schema",
    points: [
      "Content that uses the words your customers actually type into Google",
      "Schema / structured data so Google understands who you are and what you do",
      "Fast, mobile-first, accessible pages — the technical SEO that's table stakes",
      "Sitemaps, clean URLs, and metadata — built into every site, never an add-on"
    ]
  }
];

const weDo = [
  "Build every site with real keywords, clean structure, and full schema — included, never a line item",
  "Set up and optimize your Google Business Profile",
  "Stand up a simple system to collect and respond to customer reviews",
  "Wire analytics so you can actually see what's working",
  "Handle the technical SEO — sitemaps, metadata, Core Web Vitals, AI-search readiness"
];

const weDont = [
  "Sell you a $500/mo retainer with no defined deliverable",
  "Promise you “#1 on Google” — nobody honest can",
  "Buy backlinks or run link schemes that get you penalized",
  "Pump out AI-spun blog filler just to pad a monthly report",
  "Hold your Google account, domain, or files hostage"
];

const aiPoints = [
  {
    h: "Schema / structured data",
    p: "We mark up every page so AI can read exactly what your business is, instead of guessing. Pages with proper FAQ and business schema are far more likely to show up in Google's AI answers."
  },
  {
    h: "Clear, direct answers",
    p: "AI pulls the page that answers the question plainly and up front — not the one stuffed with keywords. We write your pages to be quotable."
  },
  {
    h: "An llms.txt file",
    p: "A plain-text guide at yoursite.com/llms.txt that tells ChatGPT, Claude, and Perplexity what you do and what matters. We build one into every site — ours is live right now."
  },
  {
    h: "Open to AI crawlers",
    p: "If your robots.txt blocks GPTBot, ClaudeBot, or Google's AI crawler, you're invisible to them. We make sure the right bots are let in."
  },
  {
    h: "Authority across the web",
    p: "AI stitches its answer together from many sources — so the same Google Business Profile, real reviews, and consistent business info that win local search also feed AI recommendations."
  }
];

const faqs = [
  {
    q: "Do I need to pay for SEO every month?",
    a: "For most small businesses, no. The SEO that actually moves the needle — a site built with real keywords and schema, a well-run Google Business Profile, and a steady flow of customer reviews — is mostly a set-it-up-right-then-maintain-it job, not a forever retainer. We bake the on-site part into every build at no extra charge and help you set up your Google Business Profile and reviews, which covers the vast majority of local businesses. If you're in a genuinely competitive market and want ongoing content work, we'll scope it honestly — but we'll never sell you a vague monthly fee just to have one."
  },
  {
    q: "Can you guarantee I'll rank #1 on Google?",
    a: "No — and anyone who does is lying to you. Nobody controls Google's algorithm, and rankings depend on your competition, your location, and dozens of signals no agency owns. What we can do is the work that genuinely improves your odds: a technically sound site with the right keywords and schema, an optimized Google Business Profile, and real customer reviews. That's what actually shows up in local search."
  },
  {
    q: "What's the single most important thing for local SEO?",
    a: "For a local business, your Google Business Profile is usually the biggest lever — it's what powers the map pack at the top of local searches. A complete, verified profile with the right categories, accurate contact info that matches your website, current photos, and a steady stream of reviews will out-perform almost any paid SEO retainer. It's free, and it's yours."
  },
  {
    q: "What about all those SEO reports and backlink packages?",
    a: "Most of it is theater. Monthly vanity-metric reports, bought backlinks, and AI-spun blog filler exist to justify a retainer, not to grow your business — and some of it, link schemes especially, can actively get you penalized by Google. We'd rather do the few things that genuinely work and not charge you for the rest."
  },
  {
    q: "Will AI tools like ChatGPT actually recommend my business?",
    a: "They can — if your site is built so AI can read and trust it. AI answer engines (ChatGPT, Claude, Perplexity, Google's AI Overviews) pull from sites with clear answers, proper schema / structured data, an llms.txt guide, and open access to AI crawlers, then cross-check that against your reviews and consistent business info around the web. Those are the same fundamentals that win local search, plus a few AI-specific touches — and we build all of them into every site by default, because we're AI-native."
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

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://makoai.studio" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Honest SEO",
      item: "https://makoai.studio/seo"
    }
  ]
};

export default function SeoPage() {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-16">
        <div className="absolute inset-0 bg-surface-light pointer-events-none" />
        <div className="container-narrow relative">
          <span className="section-label">SEO, honestly</span>
          <h1 className="mt-5 font-display font-medium text-[44px] md:text-[72px] leading-[1.02] tracking-tight">
            Most SEO is sold fear.
            <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-lumen-300 via-tide-300 to-mist-200">
              Here&apos;s what actually works.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-[17px] md:text-[19px] text-mist-300 leading-relaxed">
            We&apos;ll be blunt: most of the SEO industry runs on fear and vague
            monthly invoices. After building and ranking real sites, we think
            only{" "}
            <span className="text-mist-100 font-semibold">
              three things truly move the needle
            </span>{" "}
            for a local business. The rest is theater you&apos;re billed for
            every month.
          </p>
        </div>
      </section>

      {/* Manifesto */}
      <section className="pt-4 pb-16 md:pb-20">
        <div className="container-narrow">
          <div className="glass-deep rounded-3xl border border-lumen-400/40 shadow-glow-lumen p-8 md:p-12">
            <p className="text-[19px] md:text-[24px] text-mist-100 font-display font-medium leading-snug tracking-tight">
              “Most SEO agencies are nothing but BS and lies. The only things
              that truly work are a Google Business listing, customer reviews,
              and a site with good keywords and schema.”
            </p>
            <p className="mt-5 text-[14px] text-mist-400">
              — and we built our whole approach around exactly that.
            </p>
          </div>
        </div>
      </section>

      {/* The three levers */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <div className="mb-12">
            <span className="section-label">What actually works</span>
            <h2 className="mt-4 font-display font-medium text-[32px] md:text-[44px] leading-tight tracking-tight">
              The three levers.
            </h2>
            <p className="mt-3 max-w-xl text-[15px] text-mist-300 leading-relaxed">
              Not twenty. Three. Get these right and you&apos;ll beat almost any
              business paying a five-hundred-dollar-a-month retainer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {levers.map((l) => (
              <article
                key={l.number}
                className="glass-deep rounded-2xl p-7 flex flex-col"
              >
                <div className="font-display font-medium text-[28px] text-lumen-400/70 leading-none">
                  {l.number}
                </div>
                <h3 className="mt-4 font-display text-[22px] font-semibold text-mist-100 leading-tight">
                  {l.name}
                </h3>
                <p className="mt-2 text-[13px] text-lumen-300 font-medium">
                  {l.tag}
                </p>
                <ul className="mt-5 space-y-2.5 text-[13px] text-mist-300 leading-relaxed flex-1">
                  {l.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="text-lumen-400 mt-0.5 flex-shrink-0">+</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-8 text-[13px] text-mist-400 italic max-w-2xl">
            One honest caveat: the single biggest factor in local search is{" "}
            <span className="text-mist-300 font-medium not-italic">
              proximity
            </span>{" "}
            — how close your business is to the person searching — and nobody
            can control that. No agency can move your storefront, and anyone
            who promises to override distance is selling you something. What you{" "}
            <em>can</em> control are the three levers above — and that&apos;s
            exactly where we focus.
          </p>
        </div>
      </section>

      {/* How AI finds you */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <div className="mb-12">
            <span className="section-label">The new frontier</span>
            <h2 className="mt-4 font-display font-medium text-[32px] md:text-[44px] leading-tight tracking-tight">
              How AI finds{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-lumen-300 via-tide-300 to-mist-200">
                your business.
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] text-mist-300 leading-relaxed">
              More and more people don&apos;t scroll ten blue links anymore —
              they ask ChatGPT, Claude, Perplexity, or Google&apos;s AI for a
              recommendation and get one answer back. You&apos;re either in that
              answer or you&apos;re invisible. The good news: the same
              fundamentals that win regular search are what get you cited by AI,
              plus a few AI-specific touches we build in by default.
            </p>
          </div>

          <div className="glass-deep rounded-2xl p-7 md:p-9">
            <ul className="space-y-5">
              {aiPoints.map((a) => (
                <li key={a.h} className="flex items-start gap-3">
                  <span className="text-lumen-400 mt-1 flex-shrink-0">+</span>
                  <div>
                    <span className="text-[15px] font-display font-medium text-mist-100">
                      {a.h}
                    </span>
                    <p className="mt-1 text-[13px] text-mist-300 leading-relaxed">
                      {a.p}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 text-[13px] text-mist-400 italic max-w-2xl">
            Because we&apos;re AI-native, all of this ships with every site we
            build — no add-on, no separate &quot;AI SEO&quot; invoice.
          </p>
        </div>
      </section>

      {/* What we do / what we don't */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <div className="mb-12">
            <span className="section-label">Where we stand</span>
            <h2 className="mt-4 font-display font-medium text-[32px] md:text-[44px] leading-tight tracking-tight">
              What we do —{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-lumen-300 via-tide-300 to-mist-200">
                and what we don&apos;t.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-deep rounded-2xl p-7 md:p-8 border-tide-500/30">
              <h3 className="font-display text-[20px] font-semibold text-mist-100">
                What we do
              </h3>
              <ul className="mt-5 space-y-3 text-[14px] text-mist-300 leading-relaxed">
                {weDo.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="text-lumen-400 mt-0.5 flex-shrink-0">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-deep rounded-2xl p-7 md:p-8">
              <h3 className="font-display text-[20px] font-semibold text-mist-100">
                What we don&apos;t
              </h3>
              <ul className="mt-5 space-y-3 text-[14px] text-mist-400 leading-relaxed">
                {weDont.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="text-mist-500 mt-0.5 flex-shrink-0">✕</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 text-[13px] text-mist-400 italic max-w-2xl">
            The on-site half — keywords, structure, schema, technical SEO — is
            baked into every site we build, at no extra charge. We&apos;ll help
            you stand up the other half (your Google Business Profile and
            reviews) too. That&apos;s the whole playbook.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
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
            Want SEO that isn&apos;t a scam?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-[15px] text-mist-300 leading-relaxed">
            Every site we build ships SEO-ready, and we&apos;ll get your Google
            Business Profile and reviews working too. No retainer, no fear, no
            twenty-page reports. Just the stuff that works.
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
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-mist-300/10 hover:border-lumen-400/40 text-mist-100 hover:text-white text-[14px] font-semibold transition-colors"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
