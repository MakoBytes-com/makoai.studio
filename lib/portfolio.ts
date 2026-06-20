export type CaseStudyShipped = {
  title: string;
  body: string;
};

export type CaseStudyGalleryItem = {
  src: string;
  alt: string;
  caption?: string;
};

export type CaseStudy = {
  oneLiner: string;
  client: string;
  role: string;
  timeline: string;
  stack: string[];
  viewUrl?: string;
  viewLabel?: string;
  problem: string;
  approach: string;
  shipped: CaseStudyShipped[];
  outcome?: string;
  gallery?: CaseStudyGalleryItem[];
};

export type PortfolioItem = {
  slug: string;
  name: string;
  url: string;
  tagline: string;
  description: string;
  tags: string[];
  status: "Live" | "Client" | "In Progress" | "Available" | "Archived";
  year: string;
  screenshot?: string;
  accent?: "blue" | "silver" | "steel";
  tier: "product" | "client-build" | "earlier-work";
  archived?: boolean;
  archivedNote?: string;
  caseStudy?: CaseStudy;
};

export const portfolio: PortfolioItem[] = [
  {
    slug: "bulldog-security",
    name: "Bulldog Security Service",
    url: "https://bulldog-showcase.vercel.app",
    tagline: "ADT authorized dealer — 30,000+ homes protected",
    description:
      "Full rebuild for a family-owned ADT authorized dealer serving Texas and Florida. Smart home security, 24/7 monitoring, life safety, and home automation — with a custom theme, location landing pages, and a leads pipeline behind a password-protected admin. Shown as shipped on a frozen showcase fork.",
    tags: ["Next.js", "Drizzle", "ADT Partner", "Local SEO"],
    status: "Client",
    year: "2026",
    accent: "steel",
    screenshot: "/portfolio/bulldog.png",
    tier: "client-build",
    caseStudy: {
      oneLiner:
        "Full rebuild for a family-owned ADT authorized dealer protecting 30,000+ homes across Texas and Florida — custom theme, location landing pages, lead pipeline behind a password-protected admin.",
      client: "Bulldog Security Service · Texas + Florida",
      role: "Design + full-stack build",
      timeline: "2026 · approved build",
      stack: [
        "Next.js 15",
        "Drizzle ORM",
        "Postgres",
        "Vercel",
        "ADT Authorized Dealer integrations"
      ],
      viewUrl: "https://bulldog-showcase.vercel.app",
      viewLabel: "View frozen showcase",
      problem:
        "Bulldog Security is a family-owned ADT Authorized Dealer protecting 30,000+ homes across Texas and Florida. They sell smart home security, 24/7 monitoring, life safety, and home automation — but the existing site read like a generic security template, not a 30-year family-built operation. Homeowners shopping for a security system are anxious by definition; they need to see authority, local presence, and a fast path to a real human.\n\nThe brief: a custom-built site that reflects the family-owned story, makes 'request a quote' frictionless, and ranks for security-system intent in every metro Bulldog serves.",
      approach:
        "Next.js 15 with Drizzle for the data layer and a custom authoring path for location landing pages. Each metro Bulldog covers gets its own page with locally-relevant content, schema, and a local-phone CTA — not the same boilerplate copy under a different city name.\n\nThe lead pipeline lives behind a password-protected admin so the office can actually work the leads instead of leaving them in an inbox. Secrets, sessions, and any other admin-only surfaces sit behind real auth, not security-by-obscurity. The theme is calibrated to the existing Bulldog blue brand — the homepage feels like Bulldog, not a template.",
      shipped: [
        {
          title: "Custom location landing pages",
          body: "Each Texas + Florida metro gets a unique landing page with local-intent copy, LocalBusiness schema, and a region-specific CTA — built to rank for 'home security in [city]' searches without thin-content penalties."
        },
        {
          title: "Lead pipeline + admin",
          body: "Inquiries flow into a Postgres-backed leads table with timestamps, source attribution, and status. Admin UI is gated behind a real session — not a /admin URL someone can guess."
        },
        {
          title: "ADT Partner-ready content",
          body: "Plans, monitoring tiers, smart-home automation, life safety, and authorized dealer credentials all surfaced clearly. Brochure-grade content without the brochure clichés."
        },
        {
          title: "Family-owned narrative",
          body: "30+ years of operating history surfaced as authority signals — about page, leadership bios, neighborhood-deep service area. Builds the trust that decides whether a homeowner picks up the phone."
        },
        {
          title: "Calibrated brand theme",
          body: "Bulldog navy + cream palette tuned to feel premium without overshooting into 'enterprise SaaS.' Typography and spacing built for trust, not flash."
        },
        {
          title: "Frozen showcase fork",
          body: "Once approved, the build is preserved on bulldog-showcase.vercel.app with noindex + a Portfolio Demo pill. The portfolio version stays canonical even as the live site evolves under client ownership."
        }
      ],
      outcome:
        "Approved by the client. Rebuilt their digital presence from a generic template into a family-owned, locally-credible site that supports real lead workflow. Frozen showcase deployed and locked for portfolio purposes."
    }
  },
  {
    slug: "aaaawning",
    name: "AAA Awning Co.",
    url: "https://aaaawning-showcase.vercel.app",
    tagline: "40-year Texas awning fabricator — full WordPress migration",
    description:
      "Complete WordPress → Next.js 16 rebuild for a Houston awning manufacturer serving Texas since 1984. 64 prerendered pages including 36 city landing pages with unique local content, LocalBusiness + FAQPage schema, llms.txt for AI-search visibility, live Google reviews, Resend + Turnstile lead form, and a password-protected Umami analytics dashboard. Shown as shipped on a frozen showcase fork.",
    tags: ["Next.js 16", "Local SEO", "WP Migration", "Resend", "Umami"],
    status: "Client",
    year: "2026",
    accent: "silver",
    screenshot: "/portfolio/aaaawning.png",
    tier: "client-build",
    caseStudy: {
      oneLiner:
        "Full WordPress → Next.js 16 migration for a 40-year Houston awning fabricator — 64 prerendered pages, 36 city landing pages, AI-search ready, with a password-protected Umami dashboard for the owner.",
      client: "AAA Awning Co. · Houston, TX",
      role: "Design + full-stack build + migration",
      timeline: "2026 · live",
      stack: [
        "Next.js 16",
        "Vercel",
        "Resend",
        "Cloudflare Turnstile",
        "Umami (self-hosted)",
        "Google Places API",
        "JSON-LD schema"
      ],
      viewUrl: "https://aaaawning-showcase.vercel.app",
      viewLabel: "View frozen showcase",
      problem:
        "AAA Awning has been fabricating custom awnings, canopies, and shade structures for Texas homes and businesses since 1984. Their WordPress site had accumulated 40 years of plugin sediment, a slow theme, and zero Texas-wide SEO depth — they ranked in Houston by reputation alone, but were invisible in Dallas, Austin, San Antonio, Fort Worth, and 30+ other Texas markets they could easily serve.\n\nThe brief: migrate completely off WordPress to a fast, prerendered stack; build out city-by-city content with real local-intent depth; surface live reviews; give the owner a private analytics view he can actually read; and ship it AI-search ready, not just Google-search ready.",
      approach:
        "Next.js 16 with full prerendering across all 64 routes. The site loads instantly because every page is a static asset by the time a visitor hits it. 36 Texas city landing pages, each with unique copy, LocalBusiness + FAQPage schema, and area-specific signals — no thin-content cloning.\n\nlive Google Reviews via the Places API surface in real time, filtered for quality. Resend + Cloudflare Turnstile keep the lead form spam-free without breaking accessibility. A self-hosted Umami dashboard gives the owner a private analytics view at a /dashboard URL gated by a password — no Google Analytics privacy theater.\n\nllms.txt + llms-full.txt published for AI search engines (ChatGPT, Claude, Perplexity) so the site is ingestible as an authoritative awning source, not just crawlable HTML.",
      shipped: [
        {
          title: "Full WordPress → Next.js 16 migration",
          body: "Every WP page rebuilt, content audited, plugin tax removed. 64 prerendered routes serve as static assets — Lighthouse green across the board."
        },
        {
          title: "36 Texas city landing pages",
          body: "Houston, Dallas, Austin, San Antonio, Fort Worth, Galveston, Corpus Christi, and 29 more. Each page has unique local content + LocalBusiness schema, no thin-content duplication."
        },
        {
          title: "Live Google Reviews via Places API",
          body: "Real reviews surface on the site in real time, filtered for quality. Refreshes automatically — no manual review-card maintenance."
        },
        {
          title: "AI-search ready",
          body: "llms.txt + llms-full.txt + JSON-LD (LocalBusiness, FAQPage, Organization). The site reads cleanly to GPT, Claude, Perplexity, and Google's AI overviews."
        },
        {
          title: "Resend + Turnstile lead form",
          body: "Branded HTML email on submit, Cloudflare Turnstile for bot protection. Mailbox-deliverable, no SPF/DKIM gotchas."
        },
        {
          title: "Private Umami analytics dashboard",
          body: "Self-hosted Umami at /dashboard behind a password. The owner sees real visitor data without the privacy theater of GA4 — no cookie banners, no PII collection."
        },
        {
          title: "Frozen showcase fork",
          body: "aaaawning-showcase.vercel.app with noindex + Portfolio Demo pill. The portfolio version stays canonical regardless of how the live site evolves."
        }
      ],
      outcome:
        "Live and serving Texas. The owner can see his own analytics, the lead form works, Google + AI search engines can read the site cleanly, and 36 Texas markets that were invisible in search now have a credible AAA Awning page each. Frozen showcase deployed."
    }
  },
  {
    slug: "bndt-rentals",
    name: "Burton NDT Rentals",
    url: "https://bndt-showcase.vercel.app",
    tagline: "Industrial inspection equipment — La Porte, TX",
    description:
      "Custom build for a La Porte, TX provider of non-destructive testing equipment — rental, sales, calibration, and repair across ultrasonic, RVI, PMI, X-ray, and eddy-current. Equipment catalog organized by application, online quote-cart workflow, and an oil & gas / petrochemical content depth that ranks for industrial-buyer intent. Shown as shipped on a frozen showcase fork.",
    tags: ["Next.js 16", "B2B Catalog", "Industrial SEO", "Quote Cart"],
    status: "In Progress",
    year: "2026",
    accent: "steel",
    screenshot: "/portfolio/bndt.png",
    tier: "client-build",
    caseStudy: {
      oneLiner:
        "Custom build for a Texas non-destructive testing rental house — equipment catalog, quote-cart workflow, calibration + repair services, all tuned for oil & gas and petrochemical buyer intent.",
      client: "Burton NDT Rentals · La Porte, TX",
      role: "Design + full-stack build",
      timeline: "2026 · pitch build, pending close",
      stack: [
        "Next.js 16",
        "Vercel",
        "JSON-LD (LocalBusiness)",
        "Quote-cart UX",
        "Industrial SEO"
      ],
      viewUrl: "https://bndt-showcase.vercel.app",
      viewLabel: "View frozen showcase",
      problem:
        "Burton NDT Rentals serves the Texas industrial corridor — refineries, petrochem, pipeline, aerospace, power gen — with rental, sales, calibration, and repair of inspection equipment (Olympus, Eddyfi, Niton, GE Krautkrämer, and similar). Their buyers are inspection contractors and asset-integrity engineers who need to find the right gauge, transducer, or analyzer fast and put a quote in front of their PM by the end of the day.\n\nThe brief: a site that reads like a real catalog (not a brochure), supports building up a multi-line quote across categories, and ranks for the specific equipment-name searches that NDT buyers actually use.",
      approach:
        "Next.js 16 with all routes prerendered. The catalog is organized by application first (UT, RVI, PMI, X-ray, eddy current) and category second, mirroring how an inspector thinks. Each product page surfaces specs, OEM, applicable standards, and the call-to-action: add to quote.\n\nA persistent quote-cart sits across the site so a buyer can build a multi-product line over a 20-minute browse and submit it as a single inquiry — closer to how rental houses actually transact than the 'fill out one form per product' pattern.\n\nLocalBusiness schema, La Porte / Houston-corridor signals, and equipment-name-rich content make the site eligible for the long-tail searches that drive B2B industrial leads. AI-search ready as a default, not as an upsell.",
      shipped: [
        {
          title: "Application-first equipment catalog",
          body: "Categories organized by inspection method (UT, RVI, PMI, X-ray, eddy current) first, then by manufacturer + product line. Matches how inspectors actually shop, not how a generic ecommerce template assumes."
        },
        {
          title: "Persistent quote cart",
          body: "Buyers build a multi-product quote across the catalog, then submit once. Cart survives navigation. Closer to how rental houses actually transact."
        },
        {
          title: "Calibration + repair service pages",
          body: "Dedicated content for ISO 17025-relevant calibration, repair turnaround, and loaner availability. Plain English, no jargon-for-jargon's-sake."
        },
        {
          title: "Industrial-grade SEO",
          body: "LocalBusiness schema, Houston-corridor geographic signals, equipment-name + standard-name rich content, and llms.txt-ready structure for AI search."
        },
        {
          title: "Project + application gallery",
          body: "Real projects organized by application — refinery turnaround, pipeline integrity, aerospace inspection, power-gen — so a procurement contact can match Burton's track record to their use case in two clicks."
        },
        {
          title: "Frozen showcase fork",
          body: "bndt-showcase.vercel.app with noindex + Portfolio Demo pill. The portfolio version stays canonical even after the live site rolls out under the client's domain."
        }
      ],
      outcome:
        "Pitch build complete and live on the showcase fork. Currently in front of the client for evaluation. When the deal closes, this is the design we ship under their production domain — and the showcase stays locked as the canonical 'as we built it' version."
    }
  },
  {
    slug: "utilities-plus",
    name: "Utilities Plus",
    url: "https://utilities-plus-showcase.vercel.app",
    tagline: "Free utility concierge — Houston, TX",
    description:
      "Full WordPress → Next.js 16 rebuild for a utility concierge service that sets up electricity, internet, security, gas, water, solar, waste, home warranty, and insurance referrals through one dedicated rep. Pexels hero video, deep-navy brand theme, custom SVG icon system across services and partner-types, FAQ with FAQPage schema, Google Maps embed on contact, and the full Mako security + AI-search baseline. Shown as shipped on a frozen showcase fork.",
    tags: ["Next.js 16", "Tailwind v4", "WP Migration", "Local SEO", "FAQ Schema"],
    status: "In Progress",
    year: "2026",
    accent: "blue",
    screenshot: "/portfolio/utilities-plus.png",
    tier: "client-build",
    caseStudy: {
      oneLiner:
        "Full WordPress → Next.js 16 rebuild for a Houston utility concierge — Pexels hero video, deep-navy brand theme, custom icon system, FAQPage schema, Google Maps on contact, and the complete Mako security + AI-search baseline.",
      client: "Utilities Plus · Houston, TX",
      role: "Design + full-stack build + migration",
      timeline: "2026 · pitch build, pending close",
      stack: [
        "Next.js 16",
        "React 19",
        "Tailwind v4",
        "Vercel",
        "Pexels (hero video)",
        "Google Maps Embed",
        "JSON-LD (Organization, WebSite, BlogPosting, FAQPage)",
      ],
      viewUrl: "https://utilities-plus-showcase.vercel.app",
      viewLabel: "View frozen showcase",
      problem:
        "Utilities Plus is a free utility concierge service in Houston that sets up electricity, internet, security, gas, water, solar, waste, home warranty, and insurance referrals for homebuyers and real-estate professionals through one dedicated rep. Their old site was a stock WordPress / Astra / Elementor build — slow, generic, and indistinguishable from a thousand other home-services templates. The brand was meant to feel premium and trust-first; the site read like a brochure.\n\nThe brief: a custom rebuild that captures the white-glove positioning, makes the eight services feel like one cohesive offering instead of a bullet list, and gives both audiences (homebuyers and real-estate partners) clear paths through the site. AI-search ready. Same security baseline we ship on every Mako property.",
      approach:
        "Next.js 16 + Tailwind v4 with the brand palette extracted from a sister-property reference and dialed in across a deep-navy ramp from brand-50 to brand-950. Mulish for body, Baskervville for display headlines, Frank Ruhl Libre as a serif accent for the editorial step-numerals — typography mix that reads premium without overshooting into luxury territory.\n\nThe homepage hero pairs a looping Pexels family-moving clip (3.95 MB at 720p, autoplay-muted-loop-playsinline, hidden under prefers-reduced-motion) with a brand-navy gradient overlay so the headline stays sharp. A custom SVG icon library covers all eight services plus the How-It-Works steps, the Why-Use-Us benefits grid, and the Who-We-Partner-With grid — every section has its own visual rhythm without leaning on a third-party icon font.\n\nThe FAQ converts the original blog topics into 29 grouped questions across 5 categories with FAQPage JSON-LD for Google rich results. Google Maps keyless embed on the contact page sits under the office hours, with CSP frame-src updated to allow Google's iframe domains. Full Mako security baseline: HSTS preload, X-Frame, X-Content nosniff, Referrer-Policy, locked Permissions-Policy, full CSP with frame-ancestors none. 301 redirects from every old WordPress slug.",
      shipped: [
        {
          title: "Full WordPress → Next.js 16 migration",
          body: "Astra + Elementor source replaced with hand-written Next.js 16 components. 22 routes generating cleanly — every WP page rebuilt, every image migrated to public/images, every blog post re-stubbed with original copy.",
        },
        {
          title: "Pexels family-moving hero video",
          body: "3.95 MB 720p mp4 self-hosted, autoplay-muted-loop-playsinline, brand-navy gradient overlay for legibility, Cache-Control immutable. Falls back to a poster JPG under prefers-reduced-motion.",
        },
        {
          title: "Custom icon system (24+ SVGs)",
          body: "Hand-written stroke-based icons covering services (plug, wifi, shield, droplet, sun, trash, warranty, umbrella), how-it-works steps, why-use benefits, and partner-types. One ServiceIcon component, no icon font dependency.",
        },
        {
          title: "FAQ with FAQPage JSON-LD",
          body: "29 questions across 5 groups (About, Before move, Choosing plans, Day-of, Real-estate pros) using native details/summary accordion. Schema-tagged for Google rich results without third-party widgets.",
        },
        {
          title: "Google Maps embed on contact",
          body: "Keyless Google Maps iframe lazy-loaded under office hours with a Get Directions link. CSP frame-src updated to allow www.google.com and maps.google.com without weakening the rest of the policy.",
        },
        {
          title: "Mako security + SEO baseline",
          body: "HSTS preload, full CSP with frame-ancestors none, locked Permissions-Policy, poweredByHeader off, immutable cache on /images and /videos. Sitemap, robots, llms.txt, Organization + WebSite + BlogPosting + FAQPage JSON-LD, OG/Twitter cards, 301s from every old WP slug.",
        },
        {
          title: "Frozen showcase fork",
          body: "utilities-plus-showcase.vercel.app with noindex + a Portfolio Demo pill. The portfolio version stays canonical even as the live site evolves under client ownership.",
        },
      ],
      outcome:
        "Pitch build live and serving from Vercel. In front of the client for evaluation. When the deal closes, this is the design we ship under their production domain — and the showcase stays locked as the canonical 'as we built it' version.",
    },
  },
  {
    slug: "axyscorp",
    name: "AXYS Industrial Solutions",
    url: "https://axyscorp-showcase.vercel.app",
    tagline: "Chemical & refining secondary-stream recovery — Houston, TX",
    description:
      "Full WordPress → Next.js 16 rebuild for a Houston chemical & refining partner that turns byproducts and off-spec streams into revenue. Verbatim content migration including the real 183-chemical product catalog, full team bios, a cinematic full-screen refinery hero video, the client's own industry line-art icon set, and the complete Mako security + AI-search baseline. Shown as shipped on a frozen showcase fork.",
    tags: ["Next.js 16", "Tailwind v4", "WP Migration", "Industrial SEO"],
    status: "In Progress",
    year: "2026",
    accent: "steel",
    screenshot: "/portfolio/axyscorp.png",
    tier: "client-build",
    caseStudy: {
      oneLiner:
        "Full WordPress → Next.js 16 rebuild for a Houston chemical & refining recovery partner — real 183-chemical catalog, cinematic refinery hero video, the client's own icon set, and the complete Mako security + AI-search baseline.",
      client: "AXYS Corporation · Houston, TX",
      role: "Design + full-stack build + migration",
      timeline: "2026 · build delivered",
      stack: [
        "Next.js 16",
        "Tailwind v4",
        "Vercel",
        "next/image (AVIF/WebP)",
        "JSON-LD schema",
      ],
      viewUrl: "https://axyscorp-showcase.vercel.app",
      viewLabel: "View frozen showcase",
      problem:
        "AXYS has partnered with manufacturers and refiners since 2003, converting chemical and refining secondary streams — byproducts, off-spec materials, wash oils, high boilers — into compliant reuse, recovery, and revenue. Their WordPress site buried that value behind a generic industrial template: the real depth (a 183-line product catalog, categorized organic streams, a credentialed team) was either missing or trapped in plugin-rendered tables that read poorly and ranked worse.\n\nThe brief: migrate completely off WordPress to a fast, prerendered stack; carry over every piece of real content verbatim — the full catalog, the organic product groups, the complete team bios — and present it like a serious industrial partner, not a brochure. AI-search ready, same security baseline we ship on every Mako property.",
      approach:
        "Next.js 16 + Tailwind v4 with the brand recolored to a deep industrial navy palette, serif display headings (Frank Ruhl Libre) over a Mulish body. Every page was rebuilt from the real source — all nine live pages deep-scraped to verbatim text, the 183-chemical TablePress catalog extracted into a typed data module and rendered in a clean multi-column layout, the categorized organic product groups and full multi-paragraph team bios carried over exactly.\n\nThe homepage hero is a full-screen, seamlessly looping refinery video (pre-rendered boomerang so it runs forward and back without a seek stutter) behind a navy overlay. Industries use the client's own blue line-art icon set pulled from their media library — not stock icons or the legacy photos. Plant-background imagery confirmed against the original Elementor section CSS so every image lands where it belongs.\n\nFull Mako baseline: HSTS preload, strict CSP with frame-ancestors none, X-Frame, nosniff, Referrer-Policy, locked Permissions-Policy, poweredByHeader off, AVIF/WebP with immutable cache on static assets. SEO: sitemap, robots with AI-crawler rules, per-page metadata + canonicals, Organization JSON-LD, llms.txt + llms-full.txt, manifest, custom not-found.",
      shipped: [
        {
          title: "Full WordPress → Next.js 16 migration",
          body: "Every WP page rebuilt and prerendered; all real content carried over verbatim. Lighthouse-green static delivery in place of the plugin-laden Elementor build.",
        },
        {
          title: "Real 183-chemical product catalog",
          body: "The live TablePress 3-column catalog extracted into a typed data module and rendered in a clean four-column layout — searchable, fast, and crawlable instead of trapped in a plugin table.",
        },
        {
          title: "Cinematic full-screen refinery hero",
          body: "A pre-rendered boomerang refinery video (ffmpeg forward+reverse concat) loops smoothly both directions behind a navy gradient overlay. Self-hosted, immutable-cached, paused under prefers-reduced-motion.",
        },
        {
          title: "Client's own icon + image system",
          body: "Industries render the client's blue line-art icons from their own media library; plant backgrounds and step photos placed exactly where the original Elementor CSS had them. No stock filler.",
        },
        {
          title: "Verbatim team bios + organic product groups",
          body: "Full multi-paragraph leadership bios and the categorized organic-stream product groups carried over word-for-word from the real source, cross-referenced page-by-page against the live site.",
        },
        {
          title: "Mako security + AI-search baseline",
          body: "HSTS preload, full CSP with frame-ancestors none, locked Permissions-Policy, poweredByHeader off, AVIF/WebP immutable cache. Sitemap, robots, Organization JSON-LD, llms.txt + llms-full.txt, OG/Twitter cards.",
        },
        {
          title: "Frozen showcase fork",
          body: "axyscorp-showcase.vercel.app with noindex + a Portfolio Demo pill. The portfolio version stays canonical even as the live site evolves under client ownership.",
        },
      ],
      outcome:
        "Built, content-accurate, and live on the showcase fork — ready to ship under the client's production domain. The frozen showcase is deployed and locked as the canonical 'as we built it' version.",
    },
  },
  {
    slug: "bishopbend",
    name: "Bishopbend Insurance Services",
    url: "https://bishopbend-showcase.vercel.app",
    tagline: "Independent insurance agency licensed in 33+ states",
    description:
      "Ground-up build for a women-owned, mother-daughter independent insurance agency writing personal, commercial, farm, bonds, and specialty coverage across 33+ states. Custom navy brand with a script-accent hero and light/dark theming, an MFA-protected client portal with a document vault and coverage-specific quote requests, a full admin CRM with HawkSoft integration, and a GLBA-aware security baseline. Shown as shipped on a frozen showcase fork.",
    tags: ["Next.js 16", "Drizzle", "Client Portal", "MFA", "Insurance"],
    status: "Client",
    year: "2026",
    accent: "blue",
    screenshot: "/portfolio/bishopbend.png",
    tier: "client-build",
    caseStudy: {
      oneLiner:
        "Ground-up build for a women-owned independent insurance agency licensed in 33+ states — custom brand, MFA-protected client portal with a document vault, a full admin CRM with HawkSoft integration, and a GLBA-aware security baseline.",
      client: "Bishopbend Insurance Services · Texas",
      role: "Design + full-stack build",
      timeline: "2026 · build delivered",
      stack: [
        "Next.js 16",
        "Drizzle ORM",
        "Supabase Postgres",
        "iron-session + TOTP MFA",
        "Cloudflare Turnstile",
        "Resend",
        "Vercel",
      ],
      viewUrl: "https://bishopbend-showcase.vercel.app",
      viewLabel: "View frozen showcase",
      problem:
        "Bishopbend is a women-owned, mother-daughter independent agency that solves complex insurance needs one client-partner at a time — personal, commercial, farm and ranch, surety bonds, plus specialty lines from identity-theft and pet to tornado, travel, non-profit, and IRS-audit coverage, licensed across 33+ states. They needed more than a brochure site: a credible boutique brand, a secure way for clients to request coverage and exchange documents, and an internal panel the team could actually run the agency from.\n\nAs an insurance broker the agency is regulated under GLBA and state insurance data-security rules, so client data handling had to be built right from day one — not bolted on later.",
      approach:
        "Next.js 16 + Drizzle over Supabase Postgres, with a custom navy brand, a flowing Tangerine script accent on the hero (Playfair display + Inter body), and a FOUC-safe light/dark theme toggle. The public marketing site covers every coverage line with its own page, generated from a typed coverage module with per-page schema.\n\nThe client portal is real software: signup with email verification, iron-session auth, TOTP multi-factor, a document vault, and coverage-specific quote-request flows (business auto, commercial property, general liability, inland marine, umbrella, workers' comp, and more). The admin side is a full CRM — customers with CSV import and a HawkSoft export bridge, quote-request and message queues, an error-monitoring dashboard, in-house analytics with real-user Core Web Vitals, and a master-API bridge for fleet oversight.\n\nGLBA-aware security baseline throughout: bcrypt, TOTP, Cloudflare Turnstile on every auth form, DB-backed rate limiting, Postgres row-level security, HSTS preload, strict CSP, locked Permissions-Policy, and poweredByHeader off. Secrets stay server-side; the public/client boundary is enforced with server-only guards.",
      shipped: [
        {
          title: "Custom boutique brand + theming",
          body: "Navy palette with a Tangerine script-accent hero, Playfair display over Inter body, and a flash-free light/dark toggle. Reads like a trusted boutique agency, not a template.",
        },
        {
          title: "Coverage-line marketing site",
          body: "Every personal, commercial, farm, bond, and specialty line gets its own page from a typed coverage module with canonical URLs and per-page schema — built to rank for real coverage intent.",
        },
        {
          title: "MFA-protected client portal",
          body: "Client signup with email verification, iron-session auth, TOTP multi-factor, a document vault, and coverage-specific quote-request flows. Real account software, not a contact form.",
        },
        {
          title: "Full admin CRM + HawkSoft bridge",
          body: "Customers with CSV import and a HawkSoft export path, quote-request and message queues, ticketing, an error-monitoring dashboard, and in-house analytics with real-user Core Web Vitals.",
        },
        {
          title: "GLBA-aware security baseline",
          body: "bcrypt + TOTP, Turnstile on every auth form, DB-backed rate limiting, Postgres row-level security, HSTS preload, strict CSP, locked Permissions-Policy, poweredByHeader off, server-only secret boundaries.",
        },
        {
          title: "Frozen showcase fork",
          body: "bishopbend-showcase.vercel.app served as a static, credential-free demo (admin + database stripped) with noindex + a Portfolio Demo pill — the portfolio shows the design with zero client data on it.",
        },
      ],
      outcome:
        "Built and live — marketing site, client portal, and admin CRM shipped with a regulation-aware security baseline. The frozen showcase is a static, no-credentials demo so the portfolio carries none of the client's data.",
    },
  },
  {
    slug: "toppaws",
    name: "TopPaws.com",
    url: "https://toppaws.com",
    tagline: "The \"Yelp for pets\" — directory, adoption, lost & found + community",
    description:
      "A nationwide pet platform on a premium domain: a 148,000-business directory with pet-owner reviews and owner claiming, plus four marketplace + community verticals — adopt (59,000+ shelter pets), AI-matched lost & found, a pets-for-sale classifieds with Section-230 guardrails, and a community forum. Programmatic SEO across tens of thousands of city pages, an in-house analytics + moderation admin, and the full Mako security / AI-search baseline.",
    tags: ["Next.js 16", "Supabase + PostGIS", "Programmatic SEO", "Marketplace", "iron-session"],
    status: "Live",
    year: "2026",
    accent: "blue",
    screenshot: "/portfolio/toppaws.png",
    tier: "product",
    caseStudy: {
      oneLiner:
        "A nationwide \"Yelp for pets\" on a premium domain — a 148k-business directory with reviews + owner claiming, adopt / lost-&-found / for-sale marketplaces, a community forum, and programmatic SEO across tens of thousands of pages.",
      client: "Mako Logics (own product)",
      role: "Design + full-stack build",
      timeline: "2026 · live",
      stack: [
        "Next.js 16",
        "Supabase Postgres + PostGIS",
        "iron-session auth",
        "Resend",
        "Cloudflare Turnstile",
        "OpenAI (moderation, embeddings, vision)",
        "RescueGroups API",
        "Recharts",
        "Vercel"
      ],
      viewUrl: "https://toppaws.com",
      viewLabel: "Visit TopPaws",
      problem:
        "TopPaws.com is a premium, high-authority pet domain — which flips the usual directory cold-start problem on its head. Programmatic pages on an established domain rank fast, and there's an audience to build a real product against from day one. The opportunity: a 'Yelp for pets' that no single competitor covers end-to-end — Yelp has reviews but no pet depth, Petfinder has adoption but nothing else, PawBoost has lost-and-found alone. None of them put all of it on one trusted pet domain.\n\nThe brief (own product): build the whole flywheel — a nationwide business directory with real pet-owner reviews and owner claiming, adoption + lost-and-found + for-sale marketplaces, and a community — production-grade, SEO-first, and legally defensible.",
      approach:
        "Next.js 16 (App Router) over Supabase Postgres with PostGIS for geo. The directory is seeded from legal open data (never scraped from Google or Yelp, whose terms forbid it), normalized and de-duplicated into ~148k active US pet businesses, then enriched from each business's own website. Tens of thousands of city × category pages render via tiered SSG/ISR so the long tail is crawlable without blowing up the build.\n\nReviews, business claiming (email-to-domain verification), and a moderation queue sit on iron-session auth with Cloudflare Turnstile + honeypots on every public form and OpenAI moderation on every piece of user content. The marketplace verticals are classifieds by design — TopPaws never processes a pet transaction, which preserves Section 230 and removes transaction liability — with adoption sourced live from the RescueGroups API (59k+ pets, weekly refresh, link-out only), AI photo-matching for lost & found via OpenAI vision + pgvector, and a hardened for-sale flow (USDA/AWA seller attestations, non-dismissable 2025 scam-pattern warnings).\n\nEverything ships on the full Mako baseline: HSTS preload, strict CSP, locked Permissions-Policy, JSON-LD across every page type, llms.txt for AI search, a WCAG accessibility pass, an in-house analytics + audit-logged moderation admin, and a custom 3D-clay icon system across the brand.",
      shipped: [
        {
          title: "148k-business directory + reviews",
          body: "Nationwide pet-business directory seeded from legal open data, deduplicated, and enriched — with pet-owner reviews, ratings, photos, owner responses, and AggregateRating rich results. Owner claiming via email-to-domain verification unlocks an editable listing plus a views + messages analytics dashboard."
        },
        {
          title: "Programmatic SEO at scale",
          body: "Tens of thousands of city × category pages on a high-authority domain, tiered SSG/ISR so the long tail caches on first crawl. Sitemaps, robots with AI-crawler rules, JSON-LD (LocalBusiness, Product, FAQPage, Breadcrumb, ItemList), and llms.txt — built to rank in Google and read cleanly to GPT, Claude, and Perplexity."
        },
        {
          title: "Adopt — 59k shelter pets",
          body: "Live adoption listings from the RescueGroups API (display + link-out only, weekly refresh), each pet with its own page that routes adopters to the rescue's website, email, or phone. Stale and dead-link listings are validated and auto-pruned so the directory stays clean."
        },
        {
          title: "AI-matched lost & found",
          body: "Post a lost or found pet with a photo and last-seen location; OpenAI vision + pgvector surface look-alike matches nearby, ranked by similarity, with Resend email alerts. Free forever — the goodwill + traffic engine."
        },
        {
          title: "Pets-for-sale classifieds (Section 230)",
          body: "A pure classifieds vertical — TopPaws never processes payment — with USDA/AWA seller attestations recorded as proof, a moderation queue, and non-dismissable scam-pattern warnings researched against current BBB/FTC guidance. Built legally defensible, not just functional."
        },
        {
          title: "Community, messaging + admin",
          body: "A Discourse-style community forum, a pet gallery, private finder↔owner messaging, real DB-backed contact + report forms, and a full in-house admin: Recharts analytics, an audit-logged moderation queue, error-event logging, business dedup, and a contact inbox."
        },
        {
          title: "Full security + AI-search baseline",
          body: "iron-session auth, Turnstile + honeypot + AI moderation on every form, HSTS preload, strict CSP, locked Permissions-Policy, peppered credentials, rate limiting, a WCAG a11y pass, and the complete JSON-LD + llms.txt AI-search build — plus a bespoke 3D-clay icon system across categories, species, and the community."
        }
      ],
      outcome:
        "Live on the toppaws.com domain — a 148k-business directory, 59k adoptable pets, four marketplace + community verticals, and an in-house analytics/moderation admin, all on one SEO-first, legally-defensible platform. What an agency would scope as a multi-quarter engagement, shipped end-to-end in AI-native build cycles."
    }
  },
  {
    slug: "makobot",
    name: "MakoBot",
    url: "https://makobot.com",
    tagline: "AI memory tool for Windows",
    description:
      "Desktop app plus marketing site for MakoBytes' cross-project AI memory tool. Code-signed installer, in-app auto-updater, Skills Exchange.",
    tags: ["WPF", "Next.js", "Azure Trusted Signing"],
    status: "Live",
    year: "2026",
    accent: "silver",
    screenshot: "/portfolio/makobot.png",
    tier: "product",
    caseStudy: {
      oneLiner:
        "AI memory tool for Windows — cross-project brain, code-signed through Azure Trusted Signing, shipped with its own in-app auto-updater and release pipeline.",
      client: "Mako Logics (own product)",
      role: "Design + desktop build + marketing site + release infrastructure",
      timeline: "2026 · shipping continuously",
      stack: [
        "WPF (.NET)",
        "Next.js",
        "Vercel",
        "Azure Trusted Signing",
        "Inno Setup",
        "GitHub Releases"
      ],
      viewUrl: "https://makobot.com",
      viewLabel: "Visit MakoBot",
      problem:
        "Claude, ChatGPT, Gemini, and Cursor all have memory systems that don't talk to each other. If you move between AI tools across a day, you either copy context around manually or lose it. The cross-project timeline — who asked what last Tuesday, what we decided on the API, why we picked that library — lives in your head or in a dozen transcripts you can't search.\n\nThe goal was a Windows-native app that watches AI sessions across tools, writes them to a single local brain file, and auto-injects the relevant context into every new conversation. No cloud, no sign-up, no vendor lock-in.",
      approach:
        "Built in WPF for a real desktop feel — big readable UI, dark theme with blue accents, 12px+ fonts by default. The app watches local AI session files, parses transcripts, and maintains a master brain.md plus per-project context files. Claude Code picks those up via the standard CLAUDE.md injection point.\n\nThe release pipeline is as much of the product as the app itself. Every build is signed through Azure Trusted Signing (Mako Logics LLC), timestamped for long-term validity, wrapped in an Inno Setup installer, signed again, and published to a GitHub Release. The auto-updater reads the release title, downloads the new installer in-app, and installs it — no browser roundtrip.",
      shipped: [
        {
          title: "Cross-project memory brain",
          body: "A single brain.md that tracks activity across every watched project, auto-synced. Per-project context files with recent commits, files touched, and session summaries."
        },
        {
          title: "Code-signed Windows installer",
          body: "Azure Trusted Signing with a Mako Logics LLC cert profile. Signtool + timestamp + Inno Setup, all automated. The installer is signed; the executable inside is signed."
        },
        {
          title: "In-app auto-updater",
          body: "About tab shows installed vs. GitHub version. One-click download, progress bar, silent install, restart. No browser roundtrip."
        },
        {
          title: "Skills Exchange",
          body: "Marketing-site page listing Claude Code skills the community can download. Skills load on demand, not inline, so project CLAUDE.md files stay small."
        },
        {
          title: "Defense-in-depth file writes",
          body: "Every file-writing subsystem is guarded against corruption and unbounded growth. Rule born from an incident where stacked injection blocks hit 8 MB before being caught — guard rails now make it impossible to repeat."
        },
        {
          title: "Marketing site + download flow",
          body: "Next.js on Vercel. /api/download reads a DOWNLOAD_URL env var and redirects to the latest GitHub release asset. No env change needed on new builds — same tag, same filename."
        }
      ],
      outcome:
        "MakoBot ships signed, installs cleanly on fresh Windows machines, and updates itself. 80+ builds shipped across 2026 without breaking a user install."
    }
  },
  {
    slug: "aipromptshive",
    name: "AI Prompts Hive",
    url: "https://aipromptshive.com",
    tagline: "Curated library of 5,000+ AI prompts",
    description:
      "Community-driven prompt library with scraped plus user-submitted content, R2 image CDN, category pillar pages, and run-links to every major model.",
    tags: ["Next.js", "Supabase", "Cloudflare R2", "SEO"],
    status: "Live",
    year: "2026",
    accent: "steel",
    screenshot: "/portfolio/aipromptshive.png",
    tier: "product"
  },
  {
    slug: "makobytes",
    name: "MakoBytes",
    url: "https://makobytes.com",
    tagline: "Product line for Mako Logics tools",
    description:
      "Umbrella site for the MakoBytes product line — PromptPixel, AI Prompts Hive, MakoBot. Product pages, analytics dashboard, download flow.",
    tags: ["Next.js", "Cloudflare", "Analytics"],
    status: "Live",
    year: "2026",
    accent: "blue",
    screenshot: "/portfolio/makobytes.png",
    tier: "product"
  },
  {
    slug: "machine-template",
    name: "Machine Template",
    url: "https://machine-template-web.vercel.app",
    tagline: "Industrial / B2B website template — Next.js + Tailwind",
    description:
      "A production-ready, brandable website template for industrial, manufacturing, and B2B-supply businesses. One-file rebranding, SEO and security baked in, and a Resend-wired quote form. Built as a Mako Studio product, licensed per project.",
    tags: ["Next.js", "Tailwind", "Template", "Industrial B2B"],
    status: "Available",
    year: "2026",
    accent: "silver",
    screenshot: "/portfolio/machine-template.png",
    tier: "product",
    caseStudy: {
      oneLiner:
        "A brandable Next.js + Tailwind website template for industrial and B2B-supply businesses — rebrand from a single config file, with SEO, security headers, and a wired quote form out of the box.",
      client: "Mako Studio product",
      role: "Design + full-stack build",
      timeline: "2026",
      stack: ["Next.js 16", "Tailwind CSS", "Vercel", "Resend"],
      viewUrl: "https://machine-template-web.vercel.app",
      viewLabel: "View live demo",
      problem:
        "Industrial and B2B-supply businesses keep needing the same thing: a fast, professional, contact-driven site with a product/services structure and real local SEO — not a WordPress theme. Rebuilding that from scratch for every prospect is slow and hard to price profitably.\n\nThe goal: package the proven structure into a clean, brandable template that can stand up a new industrial site in an afternoon, and sell it as a product.",
      approach:
        "Every business-specific value — name, tagline, phones, address, hours — lives in a single site.ts config, so a full rebrand is a one-file change. SEO (sitemap, robots, llms.txt, JSON-LD), security headers + CSP, accessibility basics, and a Resend-powered quote form are wired in from the start. Demo imagery uses neutral placeholders the buyer swaps for their own.",
      shipped: [
        {
          title: "One-file rebranding",
          body: "All brand, contact, and copy tokens centralized in src/lib/site.ts — change once, updates the whole site, metadata, schema, sitemap, and llms.txt."
        },
        {
          title: "SEO + AI-search baseline",
          body: "Sitemap, robots, /llms.txt, Organization JSON-LD, per-page metadata, and an auto-generated Open Graph image."
        },
        {
          title: "Security baseline",
          body: "Strict CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy, and poweredByHeader disabled — shipped, not optional."
        },
        {
          title: "Wired quote form",
          body: "Contact form posts to a server route that emails via Resend when configured, with a graceful demo mode until keys are added."
        }
      ],
      outcome:
        "Live demo deployed and licensed per end product. Reusable foundation for future industrial and B2B builds."
    }
  },
  {
    slug: "woodlands",
    name: "Family Psychiatry of The Woodlands",
    url: "https://woodlands-showcase.vercel.app",
    tagline: "Private psychiatric practice — The Woodlands, TX",
    description:
      "Professional healthcare site for a family psychiatry practice with 30+ years in The Woodlands, TX. Provider bios, services, secure intake forms, clinical trials, HIPAA-aware content. Shown as shipped on a frozen showcase fork.",
    tags: ["Next.js", "Healthcare", "Intake forms"],
    status: "In Progress",
    year: "2026",
    accent: "steel",
    screenshot: "/portfolio/woodlands.png",
    tier: "client-build",
    caseStudy: {
      oneLiner:
        "Warm, HIPAA-aware healthcare site for a family psychiatry practice with 30+ years in The Woodlands, TX — provider bios, secure intake, clinical trials, patient-first tone.",
      client: "Family Psychiatry of The Woodlands · The Woodlands, TX",
      role: "Design + full-stack build",
      timeline: "2026 · approved build",
      stack: [
        "Next.js 15",
        "Vercel",
        "First-party intake forms",
        "JSON-LD schema"
      ],
      viewUrl: "https://woodlands-showcase.vercel.app",
      viewLabel: "View frozen showcase",
      problem:
        "A family psychiatry practice with 30+ years in The Woodlands, TX was running a Wix site that matched neither the quality of the clinical work nor the trust signals patients actually need. New patients weighing a first appointment read healthcare sites closely — credentials, tone, intake process, clarity on what to expect.\n\nThe client needed a site that reads clinical but human: clean provider bios, services explained without jargon, secure intake forms, and clear information on clinical trials and insurance.",
      approach:
        "Next.js 15 with a calm, muted palette and generous line-heights for readability under stress — patients landing on a psychiatry site often aren't in a \"skim the nav\" mood. Intake forms are first-party on the site, not third-party widgets, so the experience stays in-brand and HIPAA considerations are handled intentionally.\n\nSame frozen-showcase pattern as every client build: once the client approves and goes live, we preserve the shipped design on a Vercel fork. Healthcare sites in particular tend to drift as staff change and new services get added — the showcase keeps the portfolio honest.",
      shipped: [
        {
          title: "Provider + service pages",
          body: "Clean bios with credentials, services explained plainly, clear pathways from 'thinking about care' to 'book an intake'."
        },
        {
          title: "Secure intake forms",
          body: "First-party forms on the site — no third-party embed, no Wix widget. Form fields and handling designed with HIPAA-awareness built in."
        },
        {
          title: "Clinical trials + research section",
          body: "Dedicated clinical-trials content for the practice's research arm — eligibility, enrollment, timelines."
        },
        {
          title: "Healthcare-grade SEO",
          body: "MedicalClinic / LocalBusiness schema, provider name + credential markup, Woodlands-area geographic signals."
        },
        {
          title: "Tone + typography calibrated for patients",
          body: "Generous line-height, calm color palette, low-anxiety tone. Treats readers like adults going through something real."
        },
        {
          title: "Frozen showcase fork",
          body: "woodlands-showcase.vercel.app with noindex plus a Portfolio Demo pill. Preserves the design we shipped, regardless of how the client evolves the live site after takeover."
        }
      ],
      outcome:
        "Approved by the client. Replaces their Wix site when they're ready to flip the domain. The showcase fork is deployed and locked as the canonical portfolio version."
    }
  },
  {
    slug: "davis-investigations",
    name: "Davis Investigation Services",
    url: "",
    tagline: "Pre-employment screening — Conroe, TX",
    description:
      "Full site for a Conroe, TX investigation firm serving Fortune 500 companies and government agencies since 2005. Covers pre-employment screening, background checks, DOT drug testing, and legal investigations. Designed and built from scratch with a custom theme.",
    tags: ["Long-term client", "Custom theme"],
    status: "Archived",
    year: "",
    accent: "silver",
    screenshot: "/portfolio/davis.png",
    tier: "earlier-work",
    archived: true,
    archivedNote:
      "10+ year Makologics MSP client · shown as originally shipped · client has since modified the frontend."
  },
  {
    slug: "pro-surve",
    name: "Pro-Surve Technical Services",
    url: "",
    tagline: "Industrial inspection & NDT — League City, TX",
    description:
      "Site for an inspection, engineering, and non-destructive testing provider serving oil & gas, petrochemical, aerospace, and power generation clients. Designed and built from scratch with a custom theme.",
    tags: ["Ongoing MSP", "Custom theme"],
    status: "Archived",
    year: "",
    accent: "silver",
    screenshot: "/portfolio/prosurve.png",
    tier: "earlier-work",
    archived: true,
    archivedNote:
      "Active Makologics MSP client · web engagement 2023–2026 · shown as originally shipped · company recently sold."
  }
];

export const portfolioBySlug = (slug: string): PortfolioItem | undefined =>
  portfolio.find((p) => p.slug === slug);

export const caseStudySlugs = (): string[] =>
  portfolio.filter((p) => p.caseStudy).map((p) => p.slug);
