import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { portfolio } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Work — Case Studies · Mako Studio",
  description:
    "Selected work from Mako Studio — custom Next.js builds for industrial B2B, healthcare, energy, security, and AI-native products. Real case studies, real outcomes, preserved on frozen showcase forks.",
  alternates: { canonical: "https://makoai.studio/work" },
  openGraph: {
    title: "Work — Case Studies · Mako Studio",
    description:
      "Selected case studies from Mako Studio — custom Next.js sites and AI-native products, end-to-end.",
    url: "https://makoai.studio/work",
    type: "website",
    siteName: "Mako Studio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Work — Case Studies · Mako Studio",
    description:
      "Selected case studies from Mako Studio — custom Next.js sites and AI-native products, end-to-end."
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
      name: "Work",
      item: "https://makoai.studio/work"
    }
  ]
};

export default function WorkIndexPage() {
  const caseStudies = portfolio.filter((p) => p.caseStudy);

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Mako Studio — Work",
    url: "https://makoai.studio/work",
    description:
      "Case studies from Mako Studio — custom Next.js builds across industrial B2B, healthcare, energy, security, and AI-native products.",
    hasPart: caseStudies.map((p) => ({
      "@type": "CreativeWork",
      name: p.name,
      url: `https://makoai.studio/work/${p.slug}`,
      description: p.caseStudy?.oneLiner ?? p.description
    }))
  };

  return (
    <main className="relative">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      <section className="relative pt-32 md:pt-40 pb-16">
        <div className="absolute inset-0 bg-hero-radial pointer-events-none" />
        <div className="container-narrow relative">
          <nav
            className="mb-10 text-[12px] text-steel-400 font-medium"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="hover:text-tide-300 transition-colors"
            >
              Home
            </Link>
            <span className="mx-2 text-steel-400/50">/</span>
            <span className="text-steel-200">Work</span>
          </nav>

          <span className="section-label">Work</span>
          <h1 className="mt-5 font-display font-semibold text-[40px] md:text-[68px] leading-[1.02] tracking-tight max-w-3xl">
            Case studies from
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tide-300 to-steel-200">
              Mako Studio.
            </span>
          </h1>
          <p className="mt-7 text-[17px] md:text-[19px] text-steel-300 leading-relaxed max-w-2xl">
            Custom Next.js builds across industrial B2B, healthcare, energy,
            security, and AI-native products — each one designed, coded, and
            shipped end-to-end. Approved client builds live on frozen showcase
            forks so the portfolio stays canonical even as live sites evolve.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-6 md:gap-7">
            {caseStudies.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="group glass rounded-2xl overflow-hidden transition-all hover:border-tide-500/40"
              >
                {p.screenshot ? (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.screenshot}
                      alt={`${p.name} homepage screenshot`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : null}
                <div className="p-6 md:p-7">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-steel-400 font-medium">
                    <span>{p.status}</span>
                    {p.year ? (
                      <>
                        <span className="text-steel-400/40">·</span>
                        <span>{p.year}</span>
                      </>
                    ) : null}
                  </div>
                  <h2 className="mt-3 font-display font-semibold text-[22px] md:text-[26px] text-steel-100 leading-tight tracking-tight">
                    {p.name}
                  </h2>
                  <p className="mt-2 text-[13px] md:text-[14px] text-tide-300 font-medium">
                    {p.tagline}
                  </p>
                  <p className="mt-4 text-[14px] md:text-[15px] text-steel-300 leading-relaxed line-clamp-4">
                    {p.caseStudy?.oneLiner ?? p.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-steel-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-[13px] text-tide-300 font-medium group-hover:text-tide-200">
                    Read the case study
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-narrow">
          <div className="glass rounded-2xl p-8 md:p-12 text-center">
            <span className="section-label">Start a project</span>
            <h2 className="mt-5 font-display font-semibold text-[28px] md:text-[38px] leading-tight tracking-tight">
              Want something like this?
            </h2>
            <p className="mt-4 text-[15px] md:text-[16px] text-steel-300 leading-relaxed max-w-lg mx-auto">
              We ship premium sites fast — AI-native, end-to-end, signed where
              it matters.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-tide-500 hover:bg-tide-600 text-white text-[14px] font-medium transition-all shadow-glow"
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
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
