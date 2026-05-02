import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI-Native Web Design for The Woodlands, TX — Mako Studio",
  description:
    "Custom Next.js web design for small businesses in The Woodlands, TX — no WordPress, no templates. Healthcare, professional services, and boutique retail. Featured work: Family Psychiatry of The Woodlands. Built from Montgomery, 20 min up I-45.",
  alternates: { canonical: "https://makoai.studio/serving/the-woodlands-tx" },
  openGraph: {
    title: "Web Design for The Woodlands, TX — Mako Studio",
    description:
      "Custom web design and development for Woodlands-area small businesses. Real case studies, real local work.",
    url: "https://makoai.studio/serving/the-woodlands-tx",
    type: "website"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Mako Studio — Web Design for The Woodlands, TX",
  url: "https://makoai.studio/serving/the-woodlands-tx",
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
    name: "The Woodlands",
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
      name: "The Woodlands, TX",
      item: "https://makoai.studio/serving/the-woodlands-tx"
    }
  ]
};

export default function WoodlandsPage() {
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
              The Woodlands, TX.
            </span>
          </h1>
          <p className="mt-7 text-[17px] md:text-[19px] text-steel-300 leading-relaxed max-w-2xl">
            We&apos;re a Montgomery, TX-based studio — a 20-minute drive up I-45
            from The Woodlands Town Center. Most of our healthcare and
            professional-services builds ship for clients somewhere between
            Panther Creek and Shenandoah, and we know the local small-business
            economy well enough to skip the generic agency fluff.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-narrow">
          <div className="grid md:grid-cols-[220px_1fr] gap-10 md:gap-16">
            <div>
              <span className="section-label">What we build</span>
            </div>
            <div className="space-y-6 text-[16px] md:text-[17px] text-steel-200 leading-relaxed">
              <p>
                The Woodlands runs on clinical practices, legal and financial
                services, specialty retail, and professional shops that survive
                on word-of-mouth plus a credible digital footprint. The common
                thread: clients here read websites closely. A psychiatry office
                or a financial planner can&apos;t look cheap online — patients
                and prospects check trust signals before they pick up the
                phone.
              </p>
              <p>
                That&apos;s the lane we sit in. Custom Next.js sites, secure
                intake forms, real SEO structure, HIPAA-aware copy when the
                industry demands it, and the ongoing maintenance to keep it
                from drifting three years in. No WordPress, no page builders,
                no template swap with the city name changed.
              </p>
              <p>
                Whether you&apos;re in Alden Bridge, Cochran&apos;s Crossing,
                Carlton Woods, Creekside Park, Indian Springs, Grogan&apos;s
                Mill, or Sterling Ridge — or anywhere the Research Forest
                corridor bleeds into Spring — we&apos;re close enough for an
                in-person kickoff meeting and cheap enough that it&apos;s
                never &quot;worth the drive&quot; to hire a Houston-downtown
                agency with five hand-offs between you and the person writing
                code.
              </p>
              <p>
                We also work often with Town Center retail, Hughes Landing
                professional services, and medical offices clustered around
                Memorial Hermann and Houston Methodist The Woodlands. If your
                business is in a walk-in-foot-traffic context, the Town
                Center area; if it&apos;s professional services, most of our
                Woodlands clientele sits somewhere in the belt between
                Research Forest Drive and the Hardy Toll Road.
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
                  Healthcare · The Woodlands, TX
                </div>
                <h2 className="mt-3 font-display font-semibold text-[24px] md:text-[30px] text-steel-100 leading-tight tracking-tight">
                  Family Psychiatry of The Woodlands
                </h2>
                <p className="mt-4 text-[15px] md:text-[16px] text-steel-300 leading-relaxed">
                  A family psychiatry practice with 30+ years in The Woodlands
                  was running a Wix site that matched neither the quality of
                  the clinical work nor the trust signals new patients
                  actually scan for. We rebuilt it on Next.js 15: calm
                  typography, provider bios that read clinical but human,
                  first-party secure intake forms, and clear copy on clinical
                  trials and insurance. Patients landing on a psychiatry site
                  often aren&apos;t in a &quot;skim the nav&quot; mood — the
                  design treats that as a constraint, not a UX afterthought.
                </p>
                <div className="mt-6">
                  <Link
                    href="/work/woodlands"
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
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-narrow">
          <div className="grid md:grid-cols-[220px_1fr] gap-10 md:gap-16">
            <div>
              <span className="section-label">How we work locally</span>
            </div>
            <div className="space-y-5 text-[15px] md:text-[16px] text-steel-200 leading-relaxed">
              <p>
                <strong className="text-steel-100">Kickoff in person.</strong>{" "}
                For Woodlands-area clients we prefer a real coffee meeting to
                map the project — 20 minutes on our side, no Zoom fatigue on
                yours. After that, everything happens on shared staging URLs
                so you approve real pages, not static mockups.
              </p>
              <p>
                <strong className="text-steel-100">One engineer, end to end.</strong>{" "}
                Design, code, deploy, DNS, email routing, analytics, ongoing
                maintenance — all handled by the same person. No agency
                hand-offs, no &quot;that&apos;s the other team&apos;s ticket.&quot;
              </p>
              <p>
                <strong className="text-steel-100">Local SEO that&apos;s real.</strong>{" "}
                Schema that correctly identifies your business, NAP parity
                between your site and Google Business Profile, and copy that
                actually mentions where you work — because generic agency copy
                is exactly how Woodlands clinicians and firms get buried
                behind Houston-metro competitors.
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
              Send a few sentences about what you need. If you&apos;re in The
              Woodlands area, we can meet for coffee this week.
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
