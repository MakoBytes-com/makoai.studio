import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI-Native Web Design for Greater Houston, TX — Mako Studio",
  description:
    "Custom Next.js web design for Houston-area businesses — no WordPress, no templates. Industrial B2B, energy corridor, specialty trades, and small businesses that need more than a Galleria-priced agency can profitably deliver. Featured: Buffalo Seal & Gasket.",
  alternates: { canonical: "https://makoai.studio/serving/houston-tx" },
  openGraph: {
    title: "Web Design for Greater Houston, TX — Mako Studio",
    description:
      "AI-native web design for Houston small businesses. Industrial B2B, energy corridor, specialty trades.",
    url: "https://makoai.studio/serving/houston-tx",
    type: "website"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Mako Studio — Web Design for Greater Houston, TX",
  url: "https://makoai.studio/serving/houston-tx",
  parentOrganization: {
    "@type": "Organization",
    name: "Mako Logics",
    legalName: "Mako Logics LLC",
    url: "https://makologics.com"
  },
  telephone: "+1-281-206-4848",
  address: {
    "@type": "PostalAddress",
    streetAddress: "550 Club Dr #264",
    addressLocality: "Montgomery",
    addressRegion: "TX",
    postalCode: "77316",
    addressCountry: "US"
  },
  areaServed: [
    {
      "@type": "City",
      name: "Houston",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Harris County, Texas"
      }
    },
    { "@type": "City", name: "Spring" },
    { "@type": "City", name: "League City" },
    { "@type": "City", name: "Tomball" },
    { "@type": "City", name: "Cypress" }
  ],
  serviceType: ["Web Design", "Web Development", "SEO", "Managed Hosting"]
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://makoai.studio" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Service Areas",
      item: "https://makoai.studio/#work"
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Houston, TX",
      item: "https://makoai.studio/serving/houston-tx"
    }
  ]
};

export default function HoustonPage() {
  return (
    <main className="relative">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section className="relative pt-32 md:pt-40 pb-16">
        <div className="absolute inset-0 bg-hero-radial pointer-events-none" />
        <div className="container-narrow relative">
          <span className="section-label">Service area</span>
          <h1 className="mt-5 font-display font-semibold text-[40px] md:text-[68px] leading-[1.02] tracking-tight max-w-3xl">
            Web design for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tide-300 to-steel-200">
              Greater Houston, TX.
            </span>
          </h1>
          <p className="mt-7 text-[17px] md:text-[19px] text-steel-300 leading-relaxed max-w-2xl">
            Our service area reaches from our Montgomery, TX headquarters down
            into Harris County — through Spring, Cypress, Tomball, League
            City, and into the core of Houston. The market is larger and the
            competition denser, but there&apos;s plenty of small-business work
            where a premium, custom-coded site actually pays back.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-narrow">
          <div className="grid md:grid-cols-[220px_1fr] gap-10 md:gap-16">
            <div>
              <span className="section-label">Who we work with in Houston</span>
            </div>
            <div className="space-y-6 text-[16px] md:text-[17px] text-steel-200 leading-relaxed">
              <p>
                Houston is an industrial and energy town first. The clients
                most of our Houston work comes from are B2B suppliers,
                specialty trades, inspection and NDT shops, and professional
                services feeding the petrochemical, aerospace, and power
                corridors. Different brief than a downtown boutique or a
                Medical Center professional practice, though we take on both
                when the fit is right.
              </p>
              <p>
                What unites them: they need sites that close B2B deals, not
                sites that win design awards. Product categories and service
                pages have to read like a catalog, not a brochure. Contact
                info has to be everywhere. And the local SEO has to actually
                work inside Houston&apos;s crowded industrial search space —
                which is a very specific craft, not a checkbox.
              </p>
              <p>
                We do this from Montgomery, 40 minutes north of downtown,
                which is both close enough to be in-person when it matters
                and far enough from the Energy Corridor rents that we can
                charge what our work is actually worth instead of what a
                Galleria agency needs to charge to make rent.
              </p>
              <p>
                Our Houston-area work spans the Energy Corridor and Memorial
                out west, the Galleria and Uptown, the Medical Center and its
                support businesses, northwest Houston through Cypress and
                Tomball, north into Spring, The Woodlands, and Conroe, and
                southeast into League City, Clear Lake, and Kemah. If your
                business is inside Beltway 8 or the I-45 / US-290 / I-10
                corridors, we&apos;re within one drive for a kickoff.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-narrow">
          <div className="grid md:grid-cols-[220px_1fr] gap-10 md:gap-16">
            <div>
              <span className="section-label">Featured work</span>
            </div>
            <div>
              <div className="glass rounded-2xl p-7 md:p-9">
                <div className="text-[11px] uppercase tracking-[0.2em] text-steel-400 font-medium">
                  Industrial B2B · Houston, TX
                </div>
                <h2 className="mt-3 font-display font-semibold text-[24px] md:text-[30px] text-steel-100 leading-tight tracking-tight">
                  Buffalo Seal &amp; Gasket
                </h2>
                <p className="mt-4 text-[15px] md:text-[16px] text-steel-300 leading-relaxed">
                  Buffalo Seal &amp; Gasket is a Houston-based industrial seal
                  and gasket supplier. The old site didn&apos;t do the hard
                  job: distributors and procurement contacts couldn&apos;t find
                  product categories fast, couldn&apos;t get straight to a
                  human, and couldn&apos;t tell the outfit was worth picking
                  up the phone for. The new build is clean, professional,
                  contact-driven — product/service pages that read like a
                  catalog, contact parity on every page, and local SEO tuned
                  for Houston industrial search intent. LocalBusiness schema,
                  Houston-area geographic signals, and heading structure
                  written for procurement search behavior.
                </p>
                <div className="mt-6">
                  <Link
                    href="/work/buffaloseal"
                    className="inline-flex items-center gap-2 text-[14px] text-tide-300 hover:text-tide-200 font-medium"
                  >
                    Read the full case study
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
              </div>

              <div className="mt-5 glass rounded-2xl p-7">
                <div className="text-[11px] uppercase tracking-[0.2em] text-steel-400 font-medium">
                  Inspection &amp; NDT · League City, TX
                </div>
                <h3 className="mt-2 font-display font-semibold text-[18px] text-steel-100">
                  Pro-Surve Technical Services
                </h3>
                <p className="mt-3 text-[14px] md:text-[15px] text-steel-300 leading-relaxed">
                  Inspection, engineering, and non-destructive testing for oil
                  &amp; gas, petrochemical, aerospace, and power generation
                  clients out of League City. Custom-themed site, built from
                  scratch. Longstanding Mako Logics MSP client, represented in
                  the portfolio&apos;s earlier-work tier.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-narrow">
          <div className="grid md:grid-cols-[220px_1fr] gap-10 md:gap-16">
            <div>
              <span className="section-label">Why a Montgomery-based studio works for Houston clients</span>
            </div>
            <div className="space-y-5 text-[15px] md:text-[16px] text-steel-200 leading-relaxed">
              <p>
                The Houston-agency market is full of two kinds of shops: large
                downtown agencies with hand-offs and markup, or gig-platform
                generalists who will ship a WordPress theme with your logo on
                it. We sit in neither lane.
              </p>
              <p>
                Montgomery rents are a fraction of Energy Corridor or Galleria
                office-tower overhead, which is most of why a traditional
                agency has to bill $12k for what a custom Next.js site should
                actually cost. We pass that arithmetic directly back to the
                client. A Houston small business gets a production-grade build
                at Starter ($2,500) to Premium ($6,000), not at $15k
                downtown-agency minimum.
              </p>
              <p>
                The trade-off is: you don&apos;t meet at a high-rise, you meet
                at a coffee shop or on Zoom. For most Houston small businesses
                that&apos;s not a downside — it&apos;s the point.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-narrow">
          <div className="glass rounded-2xl p-8 md:p-12 text-center">
            <span className="section-label">Start a project</span>
            <h2 className="mt-5 font-display font-semibold text-[28px] md:text-[38px] leading-tight tracking-tight">
              Ready to talk?
            </h2>
            <p className="mt-4 text-[15px] md:text-[16px] text-steel-300 leading-relaxed max-w-lg mx-auto">
              Send a few sentences about your project. For Houston-area
              clients we can usually meet on-site within the week.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-tide-500 hover:bg-tide-600 text-white text-[14px] font-medium transition-all shadow-glow"
              >
                Contact form
              </Link>
              <a
                href="tel:+12812064848"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-steel-100 hover:border-tide-500/40 text-[14px] font-medium transition-all"
              >
                (281) 206-4848
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
