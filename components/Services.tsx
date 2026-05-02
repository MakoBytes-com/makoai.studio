const serviceAreas = [
  { href: "/serving/the-woodlands-tx", label: "The Woodlands, TX" },
  { href: "/serving/conroe-tx", label: "Conroe, TX" },
  { href: "/serving/houston-tx", label: "Greater Houston, TX" }
];

const services = [
  {
    title: "Web Design",
    body: "Custom visual direction, typography, motion, and layout. No templates. No AI-looking boilerplate. Each site is built to match the brand behind it.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect x="4" y="6" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 11h24M8 17h8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    title: "Web Development",
    body: "Next.js, React, and modern stacks. Fast page loads, accessible components, solid forms, real analytics. Built to be maintained — not abandoned.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <path
          d="M11 10l-5 6 5 6M21 10l5 6-5 6M18 7l-4 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    )
  },
  {
    title: "AI Integration",
    body: "Chatbots, LLM-powered search, content generation, embeddings, RAG over client docs. Real AI features shipped inside the product — not bolted-on marketing fluff. It's the whole DNA of this studio.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <path
          d="M13 4L15 11L22 13L15 15L13 22L11 15L4 13L11 11z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M23 18L24 21L27 22L24 23L23 26L22 23L19 22L22 21z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    title: "SEO",
    body: "Schema, sitemaps, Core Web Vitals, structured data, AI-search ready (LLMs.txt, FAQ + HowTo). Built in at build time — not sold back to you as a $500/mo retainer. Most \"SEO packages\" are agencies charging monthly to fix what should have been done right the first time. We do it right the first time.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 20l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: "Security",
    body: "Rate limits, Turnstile, MFA, strict CSP, encrypted secrets, Cloudflare edge WAF, error monitoring, automated dependency audits. Not an add-on, not a post-breach scramble — every Mako site ships hardened from day one. The same protection we use on the portal that runs our own business.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <path
          d="M16 4l10 4v8c0 6-4.5 10-10 12-5.5-2-10-6-10-12V8l10-4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M12 16l3 3 5-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    title: "Hosting & Ops",
    body: "Vercel, Cloudflare, domain routing, email deliverability, monitoring, and update work. One partner, one invoice, one Slack thread.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <path
          d="M6 20c-2 0-3-1-3-3 0-2 2-3 4-3 0-3 3-5 6-5 3 0 5 2 5 4 3 0 5 2 5 4 0 3-2 5-5 5H6z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-28 md:py-36"
    >
      <div className="container-narrow">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-5">
            <span className="section-label">What we do</span>
            <h2 className="mt-5 font-display font-semibold text-[36px] md:text-[52px] leading-[1.05] tracking-tight">
              Built end-to-end.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tide-300 to-steel-200">
                Shipped fast.
              </span>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex items-end">
            <p className="text-[16px] text-steel-300 leading-relaxed">
              Most freelancers hand you a design and disappear. Most agencies
              pass you between strangers. Mako Studio does all of it — design,
              build, deploy, host, maintain — without losing the thread.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {services.map((s) => (
            <article
              key={s.title}
              className="group glass rounded-2xl p-8 hover:border-tide-500/30 transition-colors"
            >
              <div className="flex items-start gap-5">
                <div className="w-11 h-11 rounded-xl bg-tide-500/10 text-tide-300 flex items-center justify-center group-hover:bg-tide-500/20 transition-colors">
                  {s.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-[20px] font-semibold text-steel-100">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[14px] text-steel-300 leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 glass rounded-2xl p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 shrink-0 rounded-xl bg-tide-500/10 text-tide-300 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <path
                  d="M12 21s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <h3 className="font-display text-[17px] font-semibold text-steel-100">
                Serving Montgomery County &amp; Greater Houston
              </h3>
              <p className="mt-1 text-[13px] text-steel-400 leading-relaxed">
                Pick your city for a page with local case studies, neighborhood
                context, and how we work with businesses in your area.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 md:shrink-0">
            {serviceAreas.map((a) => (
              <a
                key={a.href}
                href={a.href}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 hover:border-tide-500/40 hover:bg-white/5 text-[13px] text-steel-200 hover:text-steel-100 font-medium transition-colors"
              >
                {a.label}
                <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none">
                  <path
                    d="M3 8h10m0 0l-4-4m4 4l-4 4"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
