import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { portfolio, portfolioBySlug, type PortfolioItem } from "@/lib/portfolio";

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolio
    .filter((p) => p.caseStudy)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = portfolioBySlug(slug);
  if (!item || !item.caseStudy) {
    return { title: "Case study not found — Mako Studio" };
  }

  const title = `${item.name} — Case Study · Mako Studio`;
  const description = item.caseStudy.oneLiner;
  const url = `https://makoai.studio/work/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "Mako Studio",
      images: item.screenshot ? [{ url: item.screenshot }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: item.screenshot ? [item.screenshot] : undefined
    }
  };
}

export default async function CaseStudyPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = portfolioBySlug(slug);
  if (!item || !item.caseStudy) notFound();

  const cs = item.caseStudy;

  const breadcrumbJsonLd = {
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
        item: "https://makoai.studio/#work"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: item.name,
        item: `https://makoai.studio/work/${slug}`
      }
    ]
  };

  return (
    <main className="relative">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-20">
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
            <Link
              href="/#work"
              className="hover:text-tide-300 transition-colors"
            >
              Work
            </Link>
            <span className="mx-2 text-steel-400/50">/</span>
            <span className="text-steel-200">{item.name}</span>
          </nav>

          <span className="section-label">Case study</span>
          <h1 className="mt-5 font-display font-semibold text-[38px] md:text-[62px] leading-[1.05] tracking-tight max-w-3xl">
            {item.name}
          </h1>
          <p className="mt-6 text-[18px] md:text-[20px] text-steel-300 leading-relaxed max-w-2xl">
            {cs.oneLiner}
          </p>

          {cs.viewUrl ? (
            <div className="mt-8">
              <a
                href={cs.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-tide-500 hover:bg-tide-600 text-white text-[14px] font-medium transition-all shadow-glow"
              >
                {cs.viewLabel ?? "Visit the site"}
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                  <path
                    d="M7 17L17 7M17 7H8M17 7v9"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          ) : null}

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 pt-8">
            <MetaItem label="Client" value={cs.client} />
            <MetaItem label="Role" value={cs.role} />
            <MetaItem label="Timeline" value={cs.timeline} />
            <MetaItem label="Status" value={statusLabel(item)} />
          </div>
        </div>
      </section>

      {/* Hero image */}
      {item.screenshot ? (
        <section className="py-16 md:py-20">
          <div className="container-narrow">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden glass">
              <Image
                src={item.screenshot}
                alt={`${item.name} homepage screenshot`}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </section>
      ) : null}

      {/* Problem */}
      <CaseSection label="Problem">
        <p className="text-[17px] md:text-[19px] text-steel-200 leading-relaxed whitespace-pre-line">
          {cs.problem}
        </p>
      </CaseSection>

      {/* Approach */}
      <CaseSection label="Approach">
        <p className="text-[17px] md:text-[19px] text-steel-200 leading-relaxed whitespace-pre-line">
          {cs.approach}
        </p>
      </CaseSection>

      {/* Stack */}
      <CaseSection label="Stack">
        <div className="flex flex-wrap gap-2">
          {cs.stack.map((s) => (
            <span
              key={s}
              className="text-[12px] md:text-[13px] px-3 py-1.5 rounded-full glass text-steel-200"
            >
              {s}
            </span>
          ))}
        </div>
      </CaseSection>

      {/* Shipped */}
      <section className="py-20 md:py-28">
        <div className="container-narrow">
          <div className="grid md:grid-cols-[200px_1fr] gap-10 md:gap-16 mb-10">
            <div>
              <span className="section-label">What shipped</span>
            </div>
            <div>
              <h2 className="font-display font-semibold text-[26px] md:text-[34px] leading-tight tracking-tight text-steel-100">
                The surface area we built.
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {cs.shipped.map((s) => (
              <div key={s.title} className="glass rounded-2xl p-6 md:p-7">
                <h3 className="font-display font-semibold text-[18px] text-steel-100">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14px] md:text-[15px] text-steel-300 leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome */}
      {cs.outcome ? (
        <CaseSection label="Outcome">
          <p className="text-[17px] md:text-[19px] text-steel-200 leading-relaxed whitespace-pre-line">
            {cs.outcome}
          </p>
        </CaseSection>
      ) : null}

      {/* Gallery */}
      {cs.gallery && cs.gallery.length > 0 ? (
        <section className="py-20 md:py-28">
          <div className="container-narrow">
            <span className="section-label mb-10 block">Gallery</span>
            <div className="grid md:grid-cols-2 gap-5 mt-6">
              {cs.gallery.map((g) => (
                <figure
                  key={g.src}
                  className="glass rounded-2xl overflow-hidden"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  {g.caption ? (
                    <figcaption className="px-5 py-4 text-[12px] text-steel-400">
                      {g.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Next / CTA */}
      <section className="py-20 md:py-28">
        <div className="container-narrow">
          <div className="glass rounded-2xl p-8 md:p-12 text-center">
            <span className="section-label">Next</span>
            <h3 className="mt-5 font-display font-semibold text-[28px] md:text-[38px] leading-tight tracking-tight">
              Want something like this?
            </h3>
            <p className="mt-4 text-[15px] md:text-[16px] text-steel-300 leading-relaxed max-w-lg mx-auto">
              We ship premium sites fast — AI-native, end-to-end, signed where
              it matters.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {cs.viewUrl ? (
                <a
                  href={cs.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-steel-100 hover:border-tide-500/40 hover:text-white text-[14px] font-medium transition-all"
                >
                  {cs.viewLabel ?? "View project"}
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                    <path
                      d="M7 17L17 7M17 7H8M17 7v9"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ) : null}
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
            <p className="mt-8 text-[12px] text-steel-400">
              <Link
                href="/#work"
                className="hover:text-steel-200 transition-colors"
              >
                ← Back to all work
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function CaseSection({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-narrow grid md:grid-cols-[200px_1fr] gap-10 md:gap-16">
        <div>
          <span className="section-label">{label}</span>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.2em] text-steel-400 font-medium">
        {label}
      </div>
      <div className="mt-2 text-[14px] md:text-[15px] text-steel-100 font-medium leading-tight">
        {value}
      </div>
    </div>
  );
}

function statusLabel(item: PortfolioItem): string {
  if (item.tier === "product") return "Live";
  if (item.tier === "client-build") return "Approved · frozen showcase";
  return item.status;
}
