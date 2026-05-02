import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI-Native Web Design for Conroe, TX — Mako Studio",
  description:
    "Custom Next.js web design for Conroe, TX businesses — no WordPress, no templates. Trades, service-area B2B, investigation firms, and industrial. 10+ year Makologics MSP tenure with Conroe clients. Built from Montgomery, 15 min away.",
  alternates: { canonical: "https://makoai.studio/serving/conroe-tx" },
  openGraph: {
    title: "Web Design for Conroe, TX — Mako Studio",
    description:
      "Custom sites for Conroe-area businesses. Decade-long client relationships, real local work.",
    url: "https://makoai.studio/serving/conroe-tx",
    type: "website"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Mako Studio — Web Design for Conroe, TX",
  url: "https://makoai.studio/serving/conroe-tx",
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
  areaServed: {
    "@type": "City",
    name: "Conroe",
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Montgomery County, Texas"
    }
  },
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
      name: "Conroe, TX",
      item: "https://makoai.studio/serving/conroe-tx"
    }
  ]
};

export default function ConroePage() {
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
              Conroe, TX.
            </span>
          </h1>
          <p className="mt-7 text-[17px] md:text-[19px] text-steel-300 leading-relaxed max-w-2xl">
            Conroe is a 15-minute drive from our Montgomery HQ. We&apos;ve been
            building and maintaining sites for Conroe-area businesses through
            Mako Logics for over a decade — investigation firms, service-area
            B2B shops, compliance-driven trades, and local professionals who
            don&apos;t need a Houston downtown agency to get a working site.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-narrow">
          <div className="grid md:grid-cols-[220px_1fr] gap-10 md:gap-16">
            <div>
              <span className="section-label">The Conroe economy</span>
            </div>
            <div className="space-y-6 text-[16px] md:text-[17px] text-steel-200 leading-relaxed">
              <p>
                Conroe runs a different profile than The Woodlands. More
                trades, more service-area contractors, more industrial and
                compliance-heavy small businesses — DOT screening firms, HVAC
                and mechanical contractors, lake-area services, auto shops,
                and B2B support companies feeding the energy and industrial
                corridor south toward Houston.
              </p>
              <p>
                What those businesses need from a website is different from
                what a downtown boutique needs. The brief is usually:
                professional but not precious, phone number above the fold,
                service area pages Google can actually read, and a trust
                baseline that says &quot;we&apos;ve been doing this for a long
                time&quot; without relying on stock photos of people in hard
                hats.
              </p>
              <p>
                That&apos;s the lane we know. A lot of our earliest client
                relationships came out of Conroe and stayed there for ten-plus
                years because we&apos;re 15 minutes up the road and we
                actually pick up the phone.
              </p>
              <p>
                We work across the full Conroe footprint — downtown Conroe
                and the historic district off Frazier, the commercial corridor
                along FM 105 and Loop 336, Lake Conroe lakefront businesses
                around April Sound and Bentwater, the newer master-planned
                areas of Grand Central Park and Artavia, and out to Panorama
                Village and Woodforest. We also take Montgomery County work
                in Willis, Magnolia, and the Lake Conroe north shore when
                the fit makes sense.
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
                  Investigation & Screening · Conroe, TX
                </div>
                <h2 className="mt-3 font-display font-semibold text-[24px] md:text-[30px] text-steel-100 leading-tight tracking-tight">
                  Davis Investigation Services
                </h2>
                <p className="mt-4 text-[15px] md:text-[16px] text-steel-300 leading-relaxed">
                  Davis Investigation Services runs out of Conroe, serving
                  Fortune 500 companies and government agencies since 2005.
                  Pre-employment screening, background checks, DOT drug
                  testing, and legal investigations — a business that lives or
                  dies on trust signals. We designed and built the original
                  site from scratch with a custom theme and have maintained
                  the working relationship through Mako Logics for 10+ years.
                  That kind of tenure is the actual proof point: we&apos;re
                  not an agency that ships and ghosts.
                </p>
                <div className="mt-6 text-[12px] text-steel-400 italic">
                  Archived case study · original site as shipped; client has
                  since modified the frontend independently, which is why it
                  lives in the earlier-work tier of the portfolio.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-narrow">
          <div className="grid md:grid-cols-[220px_1fr] gap-10 md:gap-16">
            <div>
              <span className="section-label">What Conroe clients typically ask for</span>
            </div>
            <div className="space-y-5 text-[15px] md:text-[16px] text-steel-200 leading-relaxed">
              <p>
                <strong className="text-steel-100">Real service-area pages.</strong>{" "}
                Not a generic &quot;locations&quot; dropdown with copy-paste
                filler for 40 cities. One or two pages that actually describe
                where and how you work, linked from sensible nav.
              </p>
              <p>
                <strong className="text-steel-100">
                  Compliance-aware copy.
                </strong>{" "}
                DOT-regulated trades and investigation firms have language
                requirements most agencies don&apos;t read carefully. We do.
              </p>
              <p>
                <strong className="text-steel-100">
                  Durable tech, not platform lock-in.
                </strong>{" "}
                A lot of our Conroe clients came off hosted platforms after
                hitting migration walls or billing surprises. We build on
                Next.js + Vercel — the code is yours, the domain is yours, the
                emergency exit is always available.
              </p>
              <p>
                <strong className="text-steel-100">
                  Long-term maintenance, not
                  &quot;billable-hour panic&quot;.
                </strong>{" "}
                Monthly maintenance from $99/mo keeps the site current, the
                SSL valid, and security patches applied without an every-issue
                invoice fight.
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
              If you&apos;re in the Conroe area, we&apos;re 15 minutes away
              and happy to meet in person to scope the work.
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
