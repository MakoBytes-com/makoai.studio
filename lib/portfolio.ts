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
    slug: "lagunares",
    name: "Laguna Resources",
    url: "https://lagunares-showcase.vercel.app",
    tagline: "Texas-based upstream oil & gas — pitch build",
    description:
      "Pitch site for a Texas-based upstream oil & gas prospect. Houston HQ, Midland office, current operations in Dawson County. Warm editorial theme on light neutrals with a dark cinematic hero, organization + LocalBusiness schema, three-section narrative built to be presented over a single live URL. Shown as shipped on a frozen showcase fork.",
    tags: ["Next.js 16", "Editorial Design", "Pitch Build", "JSON-LD"],
    status: "In Progress",
    year: "2026",
    accent: "steel",
    screenshot: "/portfolio/lagunares.png",
    tier: "client-build",
    caseStudy: {
      oneLiner:
        "Pitch site for a Texas-based upstream oil & gas prospect — warm editorial theme, dark cinematic hero, three-section narrative built to be presented over a single live URL.",
      client: "Laguna Resources · Houston + Midland, TX",
      role: "Design + full-stack build",
      timeline: "2026 · pitch build, pending close",
      stack: [
        "Next.js 16",
        "Vercel",
        "JSON-LD (Organization + LocalBusiness)",
        "Self-hosted Umami"
      ],
      viewUrl: "https://lagunares-showcase.vercel.app",
      viewLabel: "View frozen showcase",
      problem:
        "Laguna Resources is a Texas-based upstream oil & gas operator focused on US Onshore. Houston HQ, Midland office, current operations in Dawson County (Permian Basin adjacent). They came to the table needing a credible web presence built fast — something they could send to potential JV partners, capital sources, and acquisition targets without it reading like a deck-built-in-a-weekend.\n\nThe brief: editorial-grade tone, RRC-operator-credible details, and a presentation-ready single live URL. Three sections, no marketing fluff, no stock energy photography.",
      approach:
        "Next.js 16 with a warm light-neutrals palette and a dark cinematic hero. The dark hero anchors the brand identity; the rest of the site reads like an investor letter — generous line-height, restrained typography, real numbers in plain English. About / Operations / Contact, each one tight enough to read in under two minutes but with enough substance to hold up to a partner due-diligence read.\n\nOrganization + LocalBusiness JSON-LD so search engines + AI can map Laguna correctly to its RRC operator number and offices. A self-hosted Umami install gives the team a private view of who's reading the site without sliding into Google Analytics privacy ambiguity.",
      shipped: [
        {
          title: "Warm editorial theme + dark cinematic hero",
          body: "Light neutrals with a walnut-brown accent on the body; dark hero anchors the brand. Reads like an investor letter, not a startup landing page."
        },
        {
          title: "Three-section narrative",
          body: "About / Operations / Contact, each one tight, focused, and credible. Built for a real partner read, not for marketing-funnel KPIs."
        },
        {
          title: "RRC-operator-grade details",
          body: "Operator number, locations, current operating county, and partner posture — surfaced where a counterparty would actually look."
        },
        {
          title: "Schema for AI + search readability",
          body: "Organization + LocalBusiness JSON-LD so Laguna maps cleanly to its actual entity in Google Knowledge Graph and AI search engines."
        },
        {
          title: "Private analytics",
          body: "Self-hosted Umami — no GA cookies, no PII collection — so the team sees real visitor activity during the pitch cycle."
        },
        {
          title: "Frozen showcase fork",
          body: "lagunares-showcase.vercel.app with noindex + Portfolio Demo pill. Locks the design as we built it, regardless of how the engagement evolves."
        }
      ],
      outcome:
        "Pitch build live on the showcase fork. Currently in front of Laguna for evaluation as the final web presence for their next capital cycle. Frozen showcase deployed and locked for portfolio purposes."
    }
  },
  {
    slug: "toppaws",
    name: "TopPaws.com",
    url: "https://toppaws.com",
    tagline: "AI creative platform for pet owners",
    description:
      "Full AI creative platform. Image + video generation, meme studio, user profiles, Stripe billing, admin console, and a community feed.",
    tags: ["Next.js", "Supabase", "Stripe", "Mux", "AI"],
    status: "Live",
    year: "2026",
    accent: "blue",
    screenshot: "/portfolio/toppaws.png",
    tier: "product",
    caseStudy: {
      oneLiner:
        "Full AI creative platform for pet owners — image + video generation, meme studio, Stripe-billable, community-ready, shipped end-to-end.",
      client: "Mako Logics (own product)",
      role: "Design + full-stack build",
      timeline: "2026 · live",
      stack: [
        "Next.js 15",
        "Supabase",
        "Stripe",
        "Mux",
        "Cloudflare R2",
        "fal.ai",
        "Vercel"
      ],
      viewUrl: "https://toppaws.com",
      viewLabel: "Visit TopPaws",
      problem:
        "Pet owners wanted a single place to generate AI images and videos of their pets, make memes, and share creations with a community. Existing tools either gated AI features behind subscriptions that didn't match real usage, or were creator tools with no community layer.\n\nWe wanted to ship something end-to-end: AI generation, meme studio, auth, profiles, billing, admin console, community feed. All production-grade, not a prototype wearing a marketing site.",
      approach:
        "Scaffolded with Next.js 15 and Supabase, then built feature-by-feature in tight AI-native passes. Auth and profiles first, then image generation via fal.ai, then video via Mux. Stripe was wired in for credit-pack billing before the second UI feature shipped — money-in plumbing is easier to build once and leave alone than to retrofit later.\n\nThe admin console and error-logging pipeline were first-class features from day one, not afterthoughts. Every server action and webhook logs to a queryable error table, surfaced in a real admin UI. That turned what would have been a multi-day launch-day debugging slog into a triage workflow.",
      shipped: [
        {
          title: "AI image + video generation",
          body: "fal.ai for images, Mux for HLS video playback across devices. Each generation debits a credit balance tied to the user."
        },
        {
          title: "Meme + photo studio",
          body: "Canvas editor with stickers and AI-fill. Web Share API flow works with iOS share sheets (TikTok, Instagram, Snapchat). Photo-only mode for uploads without generation."
        },
        {
          title: "Stripe credits billing",
          body: "Credit packs, live usage pill, provider-grouped Usage & Costs admin page showing real Stripe + Mux + Supabase spend. Webhook-driven."
        },
        {
          title: "Community feed + profiles",
          body: "Public feed of user creations, profile pages with creation grids, share-to-social with clipboard fallback."
        },
        {
          title: "Admin console",
          body: "Role-gated nav entry. Error Logs, Usage & Costs dashboard, Changelog, quick-link grid for every provider."
        },
        {
          title: "Full SEO + AI-search build",
          body: "Sitemap, robots, OG/Twitter meta, JSON-LD (FAQPage + HowTo), llms.txt, ProfilePage rich-results on every profile."
        }
      ],
      outcome:
        "Live on HTTPS with Stripe billing, Vercel Analytics, and a real admin stack. What a traditional agency would have booked as a 6-month engagement shipped in a single AI-native build cycle without cutting corners on infrastructure."
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
    slug: "buffaloseal",
    name: "Buffalo Seal & Gasket",
    url: "https://buffaloseal-showcase.vercel.app",
    tagline: "Industrial sealing solutions — Houston, TX",
    description:
      "Custom site for a Houston-based industrial seal & gasket supplier. Contact-driven B2B layout with product categories, service pages, and SEO structure. Shown as shipped on a frozen showcase fork.",
    tags: ["Next.js", "B2B", "Local SEO"],
    status: "Client",
    year: "2026",
    accent: "silver",
    screenshot: "/portfolio/buffaloseal.png",
    tier: "client-build",
    caseStudy: {
      oneLiner:
        "Custom B2B site for a Houston industrial seal & gasket supplier — contact-driven, catalog-organized, SEO-tuned for local intent, preserved on a frozen fork so the portfolio never drifts.",
      client: "Buffalo Seal & Gasket · Houston, TX",
      role: "Design + full-stack build",
      timeline: "2026 · approved build",
      stack: ["Next.js 15", "Vercel", "Local SEO", "JSON-LD schema"],
      viewUrl: "https://buffaloseal-showcase.vercel.app",
      viewLabel: "View frozen showcase",
      problem:
        "Buffalo Seal & Gasket is a Houston-based industrial seal and gasket supplier with a functional but dated site. Distributors and procurement contacts need to find product categories fast, get straight to a human, and trust the outfit before picking up the phone. The old site didn't do the second or third part well.\n\nThe brief: clean, professional, contact-driven. No marketing fluff, no quote form that drops into a black hole. Product/service pages that read like a catalog, not a brochure. Local SEO that actually works in a Houston industrial context.",
      approach:
        "Next.js 15 on Vercel for fast page loads on distributor-desk browsers and mobile. Clear product category structure up front, contact info above the fold on every page, and JSON-LD schema marking the business as a LocalBusiness so Google can rank it properly for regional intent.\n\nOnce the client goes live on their own domain, the shipped design is preserved on a frozen Vercel fork. The portfolio on makoai.studio always shows the site as we built it, regardless of how the client evolves it over the years.",
      shipped: [
        {
          title: "Custom-built Next.js site",
          body: "Hand-tailored layout, no template. Typography, spacing, and color calibrated for an industrial B2B read."
        },
        {
          title: "Product + service architecture",
          body: "Category pages that read like a distributor catalog — product family, specs, use cases, contact path on every page."
        },
        {
          title: "Local SEO foundation",
          body: "LocalBusiness schema, contact-info parity across pages, Houston-area geographic signals, heading structure tuned for industrial search intent."
        },
        {
          title: "Contact-driven conversion",
          body: "Phone and email visible above the fold everywhere. Contact form hits a real inbox, not a support queue."
        },
        {
          title: "Frozen showcase fork",
          body: "On approval, final build is forked to buffaloseal-showcase.vercel.app with noindex plus a Portfolio Demo pill. The portfolio never degrades as the client evolves their live site."
        }
      ],
      outcome:
        "Approved by the client. Ready to go live on their production domain. The showcase fork is deployed, locked, and canonical for portfolio purposes."
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
    status: "Client",
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
