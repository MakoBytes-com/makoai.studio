import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Service Areas — Mako Studio",
  description:
    "Mako Studio serves The Woodlands, Conroe, and Houston, TX with custom Next.js web design — healthcare, professional services, industrial B2B, and boutique retail. Built from Montgomery, 20 minutes up I-45.",
  alternates: { canonical: "https://makoai.studio/serving" },
  openGraph: {
    title: "Service Areas — Mako Studio",
    description:
      "Custom web design for The Woodlands, Conroe, and Houston, TX. Real local work, no templates.",
    url: "https://makoai.studio/serving",
    type: "website",
    siteName: "Mako Studio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Areas — Mako Studio",
    description:
      "Custom web design for The Woodlands, Conroe, and Houston, TX. Real local work, no templates."
  }
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://makoai.studio"
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Service Areas",
      item: "https://makoai.studio/serving"
    }
  ]
};

type ServiceArea = {
  slug: string;
  city: string;
  label: string;
  blurb: string;
  highlight: string;
};

const areas: ServiceArea[] = [
  {
    slug: "the-woodlands-tx",
    city: "The Woodlands, TX",
    label: "Healthcare · Professional services",
    blurb:
      "Clinical practices, legal and financial firms, and specialty retail along the Research Forest corridor. Patients and prospects here read websites closely — trust signals decide whether they pick up the phone. We build custom Next.js sites with secure intake forms, HIPAA-aware copy where it matters, and real local SEO. 20 minutes up I-45 from Montgomery.",
    highlight: "Featured: Family Psychiatry of The Woodlands"
  },
  {
    slug: "conroe-tx",
    city: "Conroe, TX",
    label: "Small business · Professional services",
    blurb:
      "Montgomery County's commercial seat — small businesses, professional service firms, contractors, and specialty retail. Conroe clients want a credible local web presence without paying Houston-downtown agency rates or getting buried in a five-hand-off engagement. One engineer, end to end, on a stack that doesn't decay.",
    highlight: "Local studio · Montgomery County"
  },
  {
    slug: "houston-tx",
    city: "Houston, TX",
    label: "Industrial B2B · Energy · Healthcare",
    blurb:
      "Houston runs on industrial B2B — petrochemical, NDT, awnings and fabrication, upstream oil & gas, security, and the professional services orbiting them. We ship custom Next.js builds that read like real catalogs and operator pages, not generic templates. AI-search ready, schema-rich, and tuned for the long-tail equipment-name and city-intent searches that actually drive B2B leads.",
    highlight: "Featured: AAA Awning, Burton NDT, Utilities Plus"
  }
];

export default function ServingIndexPage() {
  return (
    <main className="relative">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section className="relative pt-32 md:pt-40 pb-16">
        <div className="absolute inset-0 bg-surface-light pointer-events-none" />
        <div className="container-narrow relative">
          <nav
            className="mb-10 text-[12px] text-mist-400 font-medium"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="hover:text-lumen-300 transition-colors"
            >
              Home
            </Link>
            <span className="mx-2 text-mist-400/50">/</span>
            <span className="text-mist-200">Service Areas</span>
          </nav>

          <span className="section-label">Service areas</span>
          <h1 className="mt-5 font-display font-medium text-[40px] md:text-[68px] leading-[1.02] tracking-tight max-w-3xl">
            Where we
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lumen-300 via-tide-300 to-mist-200 italic">
              build locally.
            </span>
          </h1>
          <p className="mt-7 text-[17px] md:text-[19px] text-mist-300 leading-relaxed max-w-2xl">
            Mako Studio is a Montgomery, TX-based studio shipping custom Next.js
            sites across the Greater Houston region. We cover The Woodlands,
            Conroe, and Houston directly — close enough for an in-person
            kickoff, far enough off the downtown agency treadmill to stay
            sensibly priced.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-narrow">
          <div className="grid md:grid-cols-3 gap-6 md:gap-7">
            {areas.map((a) => (
              <Link
                key={a.slug}
                href={`/serving/${a.slug}`}
                className="group glass-deep rounded-2xl p-6 md:p-7 transition-all hover:border-lumen-400/40"
              >
                <div className="text-[11px] uppercase tracking-[0.2em] text-mist-400 font-medium">
                  {a.label}
                </div>
                <h2 className="mt-3 font-display font-medium text-[22px] md:text-[26px] text-mist-100 leading-tight tracking-tight">
                  {a.city}
                </h2>
                <p className="mt-4 text-[14px] md:text-[15px] text-mist-300 leading-relaxed">
                  {a.blurb}
                </p>
                <p className="mt-5 text-[12px] text-lumen-300 font-medium">
                  {a.highlight}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-[13px] text-lumen-300 font-medium group-hover:text-lumen-200">
                  See {a.city.split(",")[0]} services
                  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none">
                    <path
                      d="M3 8h10m0 0l-4-4m4 4l-4 4"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-narrow">
          <div className="grid md:grid-cols-[220px_1fr] gap-10 md:gap-16">
            <div>
              <span className="section-label">Outside these areas?</span>
            </div>
            <div className="space-y-5 text-[15px] md:text-[16px] text-mist-200 leading-relaxed">
              <p>
                We work remotely with clients across Texas and the U.S. on
                anything that doesn&apos;t need an in-person kickoff. Industrial
                B2B, healthcare, professional services, and AI-native product
                builds travel well on a shared staging URL.
              </p>
              <p>
                If you&apos;re anywhere between Galveston and Austin and want a
                custom Next.js site that won&apos;t look dated three years from
                now, send a few sentences about what you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-narrow">
          <div className="glass-deep rounded-2xl p-8 md:p-12 text-center">
            <span className="section-label">Start a project</span>
            <h2 className="mt-5 font-display font-medium text-[28px] md:text-[38px] leading-tight tracking-tight">
              Ready to talk?
            </h2>
            <p className="mt-4 text-[15px] md:text-[16px] text-mist-300 leading-relaxed max-w-lg mx-auto">
              Send a few sentences about what you need. If you&apos;re in the
              Greater Houston area, we can meet for coffee this week.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-tide-500 hover:bg-tide-600 text-white text-[14px] font-medium transition-all shadow-glow hover:shadow-glow-lumen"
              >
                Contact form
              </Link>
              <a
                href="tel:+12812064848"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-mist-300/10 text-mist-100 hover:border-lumen-400/40 text-[14px] font-medium transition-all"
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
