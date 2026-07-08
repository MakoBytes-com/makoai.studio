import { fetchPlaceReviews } from "@/lib/places";
import TestimonialsVideoBackground from "./TestimonialsVideoBackground";
import { Reveal, RevealLines } from "@/components/motion/Reveal";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="inline-flex gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          viewBox="0 0 20 20"
          className={`w-4 h-4 ${n <= rating ? "text-amber-300" : "text-white/10"}`}
          fill="currentColor"
          aria-hidden
        >
          <path d="M10 1.7l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 15l-5.2 2.7 1-5.8L1.6 7.8l5.8-.8z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.64 12.204c0-.815-.073-1.6-.208-2.352H12v4.448h6.52c-.281 1.516-1.132 2.8-2.412 3.66v3.04h3.904c2.284-2.104 3.608-5.204 3.608-8.796z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.956-1.076 7.94-2.908l-3.904-3.04c-1.08.72-2.464 1.152-4.036 1.152-3.104 0-5.736-2.096-6.676-4.912H1.3v3.088C3.276 21.312 7.344 24 12 24z"
      />
      <path
        fill="#FBBC04"
        d="M5.324 14.292A7.2 7.2 0 014.948 12c0-.796.136-1.568.376-2.292V6.62H1.3A12 12 0 000 12c0 1.94.464 3.768 1.3 5.38l4.024-3.088z"
      />
      <path
        fill="#EA4335"
        d="M12 4.76c1.76 0 3.332.608 4.572 1.8l3.432-3.432C17.952 1.188 15.24 0 12 0 7.344 0 3.276 2.688 1.3 6.62l4.024 3.088C6.264 6.892 8.896 4.76 12 4.76z"
      />
    </svg>
  );
}

export default async function Testimonials() {
  const data = await fetchPlaceReviews();
  const reviews = data?.reviews ?? [];
  const rating = data?.rating ?? null;
  const userRatingCount = data?.userRatingCount ?? null;
  const hasReviews = reviews.length > 0;

  // Note: no JSON-LD here. These reviews are for Mako Logics LLC (the parent
  // MSP), not Mako Studio — claiming them as schema on makoai.studio could be
  // read as duplicate-entity / review-spam by Google. They render visually as
  // honest social proof; the parent company link clarifies attribution.

  return (
    <section
      id="testimonials"
      className="relative py-28 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0">
        <TestimonialsVideoBackground />
        <div className="absolute inset-0 bg-abyss-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(94,234,255,0.06),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[14rem] md:h-[18rem] bg-[linear-gradient(to_bottom,#020509_0%,rgba(2,5,9,0.85)_35%,rgba(2,5,9,0.5)_65%,transparent_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[14rem] md:h-[18rem] bg-[linear-gradient(to_top,#020509_0%,rgba(2,5,9,0.85)_35%,rgba(2,5,9,0.5)_65%,transparent_100%)]" />
      </div>
      <div className="container-narrow relative">
        <div className="grid md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-5">
            <Reveal y={18}>
              <span className="section-label">What clients say</span>
            </Reveal>
            <RevealLines
              as="h2"
              className="mt-6 font-display font-medium text-[38px] md:text-[56px] leading-[1.04] tracking-tight text-mist-100"
            >
              <>Reviews from</>
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-lumen-300 via-tide-300 to-mist-200 pr-1.5">
                real clients.
              </span>
            </RevealLines>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex items-end">
            <Reveal delay={0.25}>
              <div>
                <p className="text-[16px] text-mist-300 leading-relaxed">
                  Pulled live from{" "}
                  <a
                    href="https://makologics.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lumen-300 hover:text-lumen-200 underline decoration-lumen-400/30 underline-offset-2"
                  >
                    Mako Logics&apos;
                  </a>{" "}
                  Google Business profile — our parent company. We&apos;ve been
                  doing IT + web work for The Woodlands, Montgomery, Conroe, and
                  greater Houston businesses since 2010 — the same people keep
                  coming back.
                </p>
                {rating && userRatingCount ? (
                  <div className="mt-5 inline-flex items-center gap-3 glass-deep rounded-full px-4 py-2">
                    <GoogleMark />
                    <span className="text-[13px] text-mist-200 font-medium">
                      <span className="font-semibold text-mist-100">
                        {rating.toFixed(1)}
                      </span>{" "}
                      · {userRatingCount} reviews
                    </span>
                    <Stars rating={Math.round(rating)} />
                  </div>
                ) : null}
              </div>
            </Reveal>
          </div>
        </div>

        {hasReviews ? (
          <Reveal
            stagger={0.08}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {reviews.slice(0, 6).map((r, i) => (
              <article
                key={`${r.authorName}-${i}`}
                className="glass-deep rounded-2xl p-6 flex flex-col"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <Stars rating={r.rating} />
                  <GoogleMark />
                </div>
                <p className="text-[14px] text-mist-200 leading-relaxed flex-1">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="mt-5 pt-4 flex items-center gap-3">
                  {r.authorPhotoUri ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={r.authorPhotoUri}
                      alt={r.authorName}
                      className="w-8 h-8 rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-lumen-400/15 flex items-center justify-center text-[12px] font-semibold text-lumen-300">
                      {r.authorName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-mist-100 truncate">
                      {r.authorName}
                    </div>
                    <div className="text-[11px] text-mist-400">
                      {r.relativePublishTimeDescription}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </Reveal>
        ) : (
          <Reveal>
            <div className="glass-deep rounded-2xl p-10 text-center">
              <p className="text-[16px] text-mist-200 leading-relaxed">
                See our reviews live on{" "}
                <a
                  href="https://www.google.com/maps/place/?q=place_id:ChIJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lumen-300 hover:text-lumen-200 underline decoration-lumen-400/30 underline-offset-2"
                >
                  Mako Logics&apos; Google Business profile
                </a>
                .
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
