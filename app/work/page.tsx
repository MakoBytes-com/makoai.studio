import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { portfolio } from "@/lib/portfolio";
import { Reveal, RevealLines } from "@/components/motion/Reveal";

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

      <section className="relative pt-32 md:pt-40 pb-16 overflow-hidden">
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
            <span className="text-mist-200">Work</span>
          </nav>

          <Reveal y={18}>
            <span className="section-label">Work</span>
          </Reveal>
          <RevealLines
            as="h1"
            delay={0.15}
            className="mt-6 font-display font-medium text-[40px] md:text-[68px] leading-[1.02] tracking-tight max-w-3xl text-mist-100"
          >
            <>Case studies from</>
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-lumen-300 via-tide-300 to-mist-200 pr-1.5">
              Mako Studio.
            </span>
          </RevealLines>
          <Reveal delay={0.45}>
            <p className="mt-7 text-[17px] md:text-[19px] text-mist-300 leading-relaxed max-w-2xl">
              Custom Next.js builds across industrial B2B, healthcare, energy,
              security, and AI-native products — each one designed, coded, and
              shipped end-to-end. Approved client builds live on frozen showcase
              forks so the portfolio stays canonical even as live sites evolve.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-narrow">
          <Reveal stagger={0.1} className="grid md:grid-cols-2 gap-6 md:gap-7">
            {caseStudies.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="group glass-deep rounded-2xl overflow-hidden"
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
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-t from-lumen-400/[0.07] to-transparent"
                      aria-hidden
                    />
                  </div>
                ) : null}
                <div className="p-6 md:p-7">
                  <div className="flex items-center gap-3 telemetry">
                    <span>{p.status}</span>
                    {p.year ? (
                      <>
                        <span className="text-mist-400/40">·</span>
                        <span>{p.year}</span>
                      </>
                    ) : null}
                  </div>
                  <h2 className="mt-3 font-display font-medium text-[22px] md:text-[26px] text-mist-100 leading-tight tracking-tight">
                    {p.name}
                  </h2>
                  <p className="mt-2 text-[13px] md:text-[14px] text-lumen-300/90 font-medium">
                    {p.tagline}
                  </p>
                  <p className="mt-4 text-[14px] md:text-[15px] text-mist-300 leading-relaxed line-clamp-4">
                    {p.caseStudy?.oneLiner ?? p.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-mist-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-[13px] text-lumen-300 font-medium group-hover:text-lumen-200">
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
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-narrow">
          <Reveal>
            <div className="glass-deep rounded-2xl p-8 md:p-12 text-center">
              <span className="section-label justify-center">Start a project</span>
              <h2 className="mt-5 font-display font-medium text-[28px] md:text-[38px] leading-tight tracking-tight text-mist-100">
                Want something like this?
              </h2>
              <p className="mt-4 text-[15px] md:text-[16px] text-mist-300 leading-relaxed max-w-lg mx-auto">
                We ship premium sites fast — AI-native, end-to-end, signed where
                it matters.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-tide-500 hover:bg-tide-400 text-white text-[14px] font-medium transition-all shadow-glow hover:shadow-glow-lumen"
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
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
