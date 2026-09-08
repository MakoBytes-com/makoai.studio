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
  status: "Live" | "Client" | "In Progress" | "Available" | "Proposal" | "Archived";
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
    slug: "bulldog-water",
    name: "Bulldog Water",
    url: "https://bulldogh2o.com",
    tagline: "Home water treatment — Houston, Austin, Dallas, Fort Worth",
    description:
      "A second company launched under the Bulldog roof, built from nothing: a HomeWater dealer selling whole-home filtration, drinking water, point-of-use and replacement systems across four Texas metros. The lead offer is a free in-home water test rather than a quote form, so the site is built to book a visit. It ships with its own control panel — leads, traffic, errors, FAQs, users, two-factor — because a new company needs to run itself from day one.",
    tags: ["Next.js", "Drizzle", "Control panel", "Local SEO"],
    status: "Client",
    year: "2026",
    accent: "blue",
    screenshot: "/portfolio/bulldogh2o.png",
    tier: "client-build",
    caseStudy: {
      oneLiner:
        "A new company under the Bulldog roof, launched with its own site and its own control panel — free in-home water tests, a four-category system catalog, and an admin the office runs itself.",
      client: "Bulldog Water · a Bulldog Security Services, LLC company",
      role: "Design + full-stack build + control panel",
      timeline: "2026 · live",
      stack: [
        "Next.js 16",
        "Drizzle ORM",
        "Supabase Postgres",
        "iron-session + TOTP",
        "Vercel"
      ],
      viewUrl: "https://bulldogh2o.com",
      viewLabel: "Visit the live site",
      problem:
        "Bulldog Security Services has been in Texas homes since 2010 with an A+ BBB rating and a 2019 BBB Award of Excellence. Water treatment was a new line of business under the same roof, which is a harder starting position than it sounds: no reviews of its own, no history of its own, and a category full of companies that sell a system before anyone knows what is in the water.\n\nTwo constraints shaped everything. The reputation is real but it belongs to the parent, so it can be shown and must be attributed — the homepage reads \"4.5★ · 2,556 Google reviews for Bulldog Security Services, our parent company\", never as this company's own rating. And a brand-new operation cannot wait on someone else to publish a price change or add an FAQ.",
      approach:
        "Sell the test, not the system. The primary call to action across the site is a free in-home water test, and the page explaining it is deliberately sequenced: we come to you, we test your actual water, you get the numbers, and only then do we talk systems. That is a materially different promise from a quote form, and the site is built around booking a visit.\n\nThe catalog is structured rather than listed — whole-home, drinking water, point-of-use and replacements, each category with its own products underneath — so a homeowner who knows they want a softener and one who knows nothing both have a route in. Four metros get their own service-area pages.",
      shipped: [
        {
          title: "Free in-home water test as the front door",
          body: "The lead offer is a technician at your kitchen tap with a test kit, not a form promising a callback. Sequenced so the numbers come before the sales conversation, which is the whole argument against the way this category usually sells."
        },
        {
          title: "Structured system catalog",
          body: "Whole-home, drinking water, point-of-use and replacements, each with products underneath and its own page. Sized and installed by Bulldog as an authorized HomeWater dealer, with the manufacturer relationship stated plainly rather than buried."
        },
        {
          title: "Its own control panel",
          body: "Leads inbox, traffic, error log, FAQ editor, user management, TOTP two-factor, password reset. The office runs the site without us in the loop, and the FAQ module genuinely feeds the public page — verified with a live edit round-trip, not assumed."
        },
        {
          title: "Leads survive a mail outage",
          body: "A submission is written to the database BEFORE the notification email is attempted. If mail fails the lead still exists, which is the difference between a slow day and a lost customer."
        },
        {
          title: "Borrowed credibility, correctly attributed",
          body: "The parent's rating, BBB standing, Texas licence and 2010 founding all appear, always tied to the company that earned them. A new brand gets the benefit of the history without claiming a review it never received."
        },
        {
          title: "Locked-down data layer",
          body: "Its own Supabase project with row-level security on every table and the anonymous role revoked, proven by probing with the public key rather than trusting the config. Wired into the Mako control panel so it reports uptime, deploys, errors and traffic with the rest of the fleet."
        }
      ],
      outcome:
        "Live at bulldogh2o.com and running its own operation — leads, content and users all handled in-house. Sits alongside the parent security business and BDS Lighting as one of three Bulldog properties we build and operate."
    }
  },
  {
    slug: "bds-lighting",
    name: "BDS Lighting",
    url: "https://bdslighting.com",
    tagline: "Permanent architectural lighting — Houston metro",
    description:
      "The third company under the Bulldog roof: an authorized Trimlight dealer installing permanent LED lighting that is invisible by day and programmable by night. Eight product categories from holiday runs to game-day colours and commercial work, seven Houston-area cities, and the same self-service control panel as its sister site. The service area stops at the Houston metro on purpose, because that is exactly what the dealer registration covers.",
    tags: ["Next.js", "Drizzle", "Control panel", "Dealer compliance"],
    status: "Client",
    year: "2026",
    accent: "steel",
    screenshot: "/portfolio/bdslighting.png",
    tier: "client-build",
    caseStudy: {
      oneLiner:
        "An authorized Trimlight dealer's site where the dealer is the brand — eight lighting categories, seven Houston-metro cities, and product claims that cannot be written unless the manufacturer published them.",
      client: "BDS Lighting · Bulldog Signature Lighting, LLC",
      role: "Design + full-stack build + control panel",
      timeline: "2026 · live",
      stack: [
        "Next.js 16",
        "Drizzle ORM",
        "Supabase Postgres",
        "iron-session + TOTP",
        "Vercel"
      ],
      viewUrl: "https://bdslighting.com",
      viewLabel: "Visit the live site",
      problem:
        "Permanent lighting is an easy product to sell badly. The tracks disappear into the roofline and the app does the rest, so most dealer sites end up as a manufacturer brochure with a local phone number stapled on — which makes the dealer look like a reseller and gives the homeowner no reason to pick one over another.\n\nBDS Lighting is a Bulldog company and a Trimlight dealer, and those are different things. The site had to sell the installer, not the manufacturer, while staying strictly inside what a dealer is permitted to claim and where a dealer is permitted to sell.",
      approach:
        "The dealer is the brand. Customer-facing copy talks about our channel, our app, our factory-trained installers; Trimlight appears once, on the About page, as the credential it is. That reads as confidence rather than evasion, and it is also what makes the company ownable — a homeowner is hiring the people who climb the ladder.\n\nThe honesty constraints are enforced in code rather than remembered. Product claims must trace to a fact the manufacturer published, held in an allow-list — if a claim is not on the list, the site does not make it. The parent's 2,556 Google reviews are shown with attribution and never emitted as this company's own structured-data rating, which would be a lie a search engine would happily repeat.",
      shipped: [
        {
          title: "Beautiful by day, unforgettable by night",
          body: "The whole pitch of permanent lighting is that you cannot see it until you want to. The hero shows a house lit at night above the promise that it disappears in daylight, and the feature row leads with discreet-by-day and colour-matched channel rather than a spec sheet."
        },
        {
          title: "Eight ways to light a property",
          body: "Permanent holiday lighting, down lights, patio globes, landscape, pool cage, accent and security, game day, and commercial — each its own page. Holiday runs are the way in; game-day colours and year-round accent lighting are what stop it being a seasonal purchase."
        },
        {
          title: "A service area that matches the paperwork",
          body: "Seven Houston-metro cities and nothing beyond, because that is the territory the Trimlight dealer registration covers. The parent company reaches four Texas metros; inheriting that footprint would have advertised work this company cannot legitimately take."
        },
        {
          title: "Claims that trace to a source",
          body: "An allow-list of manufacturer-published facts backs the product pages. Warranty terms, colour capability and app behaviour all resolve to something Trimlight actually states, so nobody has to relitigate a specification later or explain it to a customer who read it here."
        },
        {
          title: "Its own control panel",
          body: "Leads, traffic, errors, FAQs, users and TOTP two-factor, plus a Trimlight section for the dealer-specific content. Same shape as Bulldog Water, so one office learns one admin and runs both sites."
        },
        {
          title: "Built as a sibling, not a copy",
          body: "Forked from the Bulldog Water build and re-themed rather than started over: same security baseline, same admin, same data layer, entirely different brand and category. A third Bulldog company reached its own live site in a fraction of the time the first one took."
        }
      ],
      outcome:
        "Live at bdslighting.com, running its own leads and content. Completes the set of Bulldog properties we build and operate — security, water and lighting — each with its own brand, its own territory and its own control panel, sharing one security baseline underneath."
    }
  },
  {
    slug: "bds-government-services",
    name: "BDS Government Services",
    url: "https://bdsgovservices.com",
    tagline: "Federal security & life-safety contracting — Texas",
    description:
      "The fourth Bulldog company, and the one with the narrowest audience: a capability site aimed at contracting officers and prime contractors rather than homeowners. Eighteen years and 30,000+ protected homes behind it, the SAM identifiers a buyer checks first put in the hero, and a past-performance page that says plainly the company is new to federal work instead of dressing commercial jobs up as contracts.",
    tags: ["Next.js", "B2G", "Capability statement", "SAM / NAICS"],
    status: "Client",
    year: "2026",
    accent: "steel",
    screenshot: "/portfolio/bdsgovservices.png",
    tier: "client-build",
    caseStudy: {
      oneLiner:
        "A commercial security operator's front door for federal work — identifiers in the hero, a printable capability statement, and an honest answer to the question every contracting officer asks first.",
      client: "Bulldog Security Services, LLC · Texas",
      role: "Positioning + design + full-stack build",
      timeline: "2026 · live",
      stack: ["Next.js", "Supabase Postgres", "Turnstile", "Cloudflare Email", "Vercel"],
      viewUrl: "https://bdsgovservices.com",
      viewLabel: "Visit the live site",
      problem:
        "Bulldog has protected more than 30,000 homes since 2008 and runs eight offices across Texas and Florida as the top ADT authorized dealer in the state. None of that is what a contracting officer needs to know.\n\nGovernment buyers open a vendor site looking for a specific, short list: are you registered, what is your UEI and CAGE, what NAICS codes do you hold, what size standard are you under, and have you done federal work before. A consumer security site answers none of those, and burying them three clicks deep reads as a company that has not done this before.\n\nThe honest complication was the last question. Bulldog is new to federal contracting. The tempting move is to blur the line between commercial jobs and federal past performance, which experienced buyers see through immediately and which is exactly the sort of thing that ends a relationship with an agency.",
      approach:
        "Answer the checklist above the fold. The hero states what the company is, then puts UEI, CAGE, primary NAICS and Disaster Response Registry status directly under the buttons as monospaced chips — the four things a buyer would otherwise go to SAM to look up. The eyebrow says SAM active and small business before the headline finishes.\n\nThe positioning line does the rest of the work: security and life-safety contracting, backed by a real operating company. Bulldog is an installer and operator, not a broker, and in a market full of resellers with no crews that distinction is the whole pitch.\n\nOn past performance the site simply tells the truth — new to federal, building it through subcontracting and teaming with established primes, bringing eighteen years of commercial delivery. That reads as a company that understands how the process works, which is a better first impression than an inflated one.",
      shipped: [
        {
          title: "Identifiers where the buyer looks",
          body: "UEI, CAGE, primary NAICS and registry status in the hero, with the full 28-code registration and the size standard a click away. A contracting officer can qualify or disqualify the company without leaving the first screen.",
        },
        {
          title: "A capability statement that prints",
          body: "The one-page artifact this whole market runs on, as a real page rather than a PDF attachment — laid out to print cleanly when someone needs it in a folder, and impossible to serve out of date because it reads from the same data as the site.",
        },
        {
          title: "An honest past-performance page",
          body: "States that the company is new to federal contracting and describes the route it is taking. Commercial delivery is presented as commercial delivery. Nothing on the page invites a buyer to assume a federal contract that does not exist.",
        },
        {
          title: "A teaming page for primes, not agencies",
          body: "The realistic near-term route to federal revenue is as a subcontractor, so primes get their own page describing what Bulldog brings to a team — licensed field crews, monitoring, and a contact-center operation that already runs.",
        },
        {
          title: "Facts held back rather than guessed",
          body: "Headcount and a dedicated contracting phone number were left off entirely until the client confirms them, because a figure on a government-facing site that disagrees with the SAM record is worse than no figure. Every published fact lives in one file with its source.",
        },
        {
          title: "Part of a family, and says so",
          body: "An illustrated silhouette frieze of homes, civic buildings and a monitoring mast sets the institutional tone, and the About page links the four Bulldog division sites — proof to a buyer that the operating company behind the registration is real.",
        },
      ],
      outcome:
        "Live at bdsgovservices.com on its own domain with its own sending address, contact form tested end to end. Completes the Bulldog set — security, water, lighting and now government — and it is the only one of the four whose success is measured in whether a stranger with a solicitation number takes the company seriously in thirty seconds.",
    },
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
    status: "Client",
    year: "2026",
    accent: "steel",
    screenshot: "/portfolio/bndt.png",
    tier: "client-build",
    caseStudy: {
      oneLiner:
        "Custom build for a Texas non-destructive testing rental house — equipment catalog, quote-cart workflow, calibration + repair services, all tuned for oil & gas and petrochemical buyer intent.",
      client: "Burton NDT Rentals · La Porte, TX",
      role: "Design + full-stack build",
      timeline: "2026 · client build, live in production",
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
        "Approved by the client and live in production under their own domain at bndtrentals.com. The showcase fork stays locked as the canonical 'as we built it' version while the live site evolves under active management."
    }
  },
  {
    slug: "utilities-plus",
    name: "Utilities Plus",
    url: "https://utilities-plus.com",
    tagline: "Free utility concierge — Houston, TX",
    description:
      "A WordPress rebuild that kept going. Utilities Plus coordinates electricity, internet and TV, smart security, gas and water, water filtration, moving services, home warranty and insurance referrals for people about to move house — one rep, no charge to the homeowner. It now runs on its own control panel: the office edits page copy, FAQs, providers and media, works the leads, and reads its own traffic without touching a developer.",
    tags: ["Next.js", "Drizzle", "CMS + control panel", "WP Migration", "Local SEO"],
    status: "Client",
    year: "2026",
    accent: "blue",
    screenshot: "/portfolio/utilities-plus.png",
    tier: "client-build",
    caseStudy: {
      oneLiner:
        "A Houston utility concierge moved off WordPress and onto a site its own office runs — page copy, FAQs, providers, media, leads and traffic all editable in-house, with no developer in the loop.",
      client: "Utilities Plus · Houston, TX",
      role: "Design + full-stack build + migration + control panel",
      timeline: "2026 · live",
      stack: [
        "Next.js",
        "React 19",
        "Tailwind v4",
        "Drizzle ORM",
        "Postgres",
        "iron-session + TOTP",
        "Turnstile",
        "Vercel",
      ],
      viewUrl: "https://utilities-plus.com",
      viewLabel: "Visit the live site",
      problem:
        "Utilities Plus sets up a household's services before move-in day — electricity, internet and TV, smart security, gas and water, water filtration, moving services, home warranty, insurance referrals — through one rep, at no charge to the homeowner, earning from the providers instead. The old site was a stock WordPress build on Astra and Elementor: slow, generic, and indistinguishable from a thousand other home-services templates.\n\nTwo audiences use the site for opposite reasons. A homeowner arrives stressed and three weeks from a move, wanting to know this is real and free. A real-estate agent arrives evaluating whether to hand clients over, wanting to know it will not embarrass them. One page cannot serve both, and a bullet list of eight services serves neither.\n\nThe rebuild solved that. What it did not solve was the reason people leave WordPress and then miss it: every copy change, every new FAQ, every provider logo came back to us.",
      approach:
        "The homepage answers the homeowner in one line — everything your new home needs, handled before move in — and then shows it rather than describing it. Floating beside the photograph are the cards a customer would actually receive: internet scheduled Tuesday at ten, movers confirmed, security installation Thursday at two. That is the product. Everything below it is the explanation.\n\nThe order is deliberate. How it works comes first, the eight services second, the partner pitch third, because a stressed homeowner three weeks from a move needs to understand the process before a menu means anything. \"100% free, no hidden fees, ever\" sits in the benefits row, since the first question anyone asks about a free concierge is where the catch is. Agents get their own route into the same operation instead of a paragraph aimed at somebody else. Inter for reading, Playfair Display for headlines, with the decorative face deliberately kept off the critical render path so the type it sets is not what people wait for.\n\nProvider names do the work that adjectives usually get asked to do. Reliant, Xfinity, Frontier, ADT, Vivint — a homeowner recognises the companies and stops wondering whether this is a real service. That is worth more than another sentence about being trusted.\n\nThen the site was given a back office. Page copy, FAQs, providers and media all moved into Postgres behind an admin panel, so the content on the public pages is data the client owns rather than markup only a developer can reach.",
      shipped: [
        {
          title: "Off WordPress, onto their own stack",
          body: "The Astra and Elementor build replaced with hand-written components, every old slug redirected, and the full Mako baseline underneath: HSTS preload, a real CSP, locked Permissions-Policy, no server fingerprint, sitemap, robots and llms.txt.",
        },
        {
          title: "A content panel the office actually uses",
          body: "Page copy, FAQs, providers and a media library all live in Postgres and are edited in the admin. The public pages read from the same rows, so a change is live when they save it — the thing WordPress was doing for them, without WordPress.",
        },
        {
          title: "Leads worked in an inbox, not an inbox",
          body: "Submissions land in a database and are read, opened and tracked in the panel rather than scattered across a mailbox. Turnstile on the forms, rate limiting on the endpoints, and the record written before the notification is attempted so a mail failure cannot lose an enquiry.",
        },
        {
          title: "Their own analytics, not a third party's",
          body: "Page views, events and Core Web Vitals collected in-house and read in the panel, with background-tab and bfcache samples dropped rather than capped so the vitals reflect what visitors experienced. Connected to the Mako control panel, where it reported 1,047 views and 839 sessions on the day it was wired up.",
        },
        {
          title: "Real providers, named",
          body: "Reliant, Xfinity, Frontier, ADT and Vivint appear as the companies behind the service, managed as records rather than hardcoded logos. The fastest way to prove a free concierge is legitimate is to show whose services it connects.",
        },
        {
          title: "Two audiences, two routes",
          body: "Homeowners get how-it-works and the eight services; real-estate agents get a partner track of their own. Fifteen questions grouped by who is asking, in ARIA-correct accordions with FAQPage schema, plus Organization, PostalAddress and WebSite structured data across the site.",
        },
        {
          title: "Admin nobody can walk into",
          body: "iron-session with TOTP two-factor, recovery codes, rate-limited attempts, and a bot check that fails open rather than locking a real person out of their own panel — a bug found and fixed after a blocked check did exactly that.",
        },
      ],
      outcome:
        "Live at utilities-plus.com and no longer dependent on us for day-to-day changes. The client edits their own copy, FAQs, providers and media, works their own leads, and reads their own traffic; error capture and the fleet control panel keep the parts they should not have to think about visible on our side.",
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
    slug: "nautidawgs",
    name: "nautiDAWGS",
    url: "https://nautidawgs-showcase.vercel.app",
    tagline: "The dog boat ladder — an AI-native e-commerce rebuild",
    description:
      "Full rebuild of a family-owned dog boat ladder brand from Wix to an AI-native storefront: a cinematic AI hero video anchored to real product photos, Remmy the product-trained chat assistant (MakoChat), a Claude-vision Fit Check that reads customers' boat photos with a human always confirming, a dedicated waterfowl-hunter landing page, drag-and-drop photo uploads, and Stripe checkout — with the old site's search rankings preserved. Shown as shipped on a frozen showcase fork.",
    tags: ["Next.js 16", "AI Video Hero", "Claude Vision", "MakoChat", "E-commerce"],
    status: "Client",
    year: "2026",
    accent: "blue",
    screenshot: "/portfolio/nautidawgs.png",
    tier: "client-build",
    caseStudy: {
      oneLiner:
        "Wix-to-Next.js rebuild for a family dog-boat-ladder brand — AI cinematic hero grounded in real product photos, a product-trained chat assistant, Claude-vision fit checks with human sign-off, and Stripe commerce.",
      client: "Nauti Dawgs LLC · Goshen, Kentucky",
      role: "Design + full-stack build",
      timeline: "2026 · first pass delivered",
      stack: [
        "Next.js 16",
        "Claude Opus 5 (vision fit checks)",
        "CrazyRouter (nano-banana-pro + Kling 3.0 hero)",
        "MakoChat + Retell",
        "Stripe Checkout",
        "Vercel Blob",
        "Cloudflare Turnstile",
        "Vercel",
      ],
      viewUrl: "https://nautidawgs-showcase.vercel.app",
      viewLabel: "View frozen showcase",
      problem:
        "nautiDAWGS makes a fold-flat boarding ladder that lets dogs climb back onto boats on their own — a genuinely loved product stuck on a template Wix site. The family had professional footage, a strong origin story, and a fit-sensitive product (customers drill three holes in their boat), but the site couldn't sell the differentiators, capture fit questions, or serve the waterfowl-hunter audience that loves the product most.\n\nThe rebuild had to move commerce off Wix without losing the keyword-rich URLs already ranking on Google, and had to automate the family's 'email us first' fit-check philosophy without ever letting software be the final word on someone's hull.",
      approach:
        "Next.js 16 on the Mako stack, with the existing Wix slugs preserved verbatim so rankings carry over. The hero is an AI-generated cinematic — a keyframe composed with nano-banana-pro conditioned on real product photos so the ladder is exact (down to the mounting plate the client himself fact-checked), then animated with Kling 3.0 — a yellow Lab climbing out of clear Florida water.\n\nRemmy, the site's chat assistant, runs on MakoChat with a Retell-powered brain trained on the full product knowledge and refreshed from the live site every 12 hours, behind a custom dog-face launcher. The AI Fit Check pairs Claude vision with tape-measure inputs: it reads the customer's platform photos, cross-checks the numbers, and returns a structured verdict — while every submission, confident or not, is emailed to the family for personal confirmation. Anything below high confidence auto-routes to a human.\n\nStripe Checkout, direct-to-Blob drag-and-drop photo uploads with per-file progress, a hunter-specific landing page built from the client's duck-blind photography, and the full Mako security + AI-search baseline round it out.",
      shipped: [
        {
          title: "AI cinematic hero, product-exact",
          body: "A 10-second hero film generated from a nano-banana-pro keyframe conditioned on real product photos, animated with Kling 3.0 — regenerated once when the client flagged a mount detail, then locked as the master.",
        },
        {
          title: "Remmy — product-trained chat",
          body: "MakoChat tenant with a Retell brain carrying the full spec sheet, fit rules, and origin story; auto-refreshes from the live site every 12 hours; collects leads in-conversation; custom dog-face launcher.",
        },
        {
          title: "Claude-vision AI Fit Check",
          body: "Customers drop platform photos + two measurements; Claude Opus 5 reads the photos, cross-checks the numbers, and returns a structured verdict. Every check emails the family with the evidence — the AI triages, a human always confirms.",
        },
        {
          title: "Hunter audience page",
          body: "A waterfowl landing page from the client's own blind photography — stay-in-the-pocket copy, blind-material mounting, cold-water dog recovery — with its own keyword slug.",
        },
        {
          title: "Commerce + migration without SEO loss",
          body: "Stripe Checkout wired and gated for the client's account, order webhooks and emails ready; every indexed Wix slug preserved verbatim, with structured data, llms.txt, and the full security-header baseline.",
        },
        {
          title: "Frozen showcase fork",
          body: "nautidawgs-showcase.vercel.app with noindex + a Portfolio Demo pill; AI keys, uploads, and email stripped so the demo is credential-free while every page and the chat remain as shipped.",
        },
      ],
      outcome:
        "Live on nautidawgs.com — the Wix store is retired and the domain now serves the new build, with every indexed slug from the old site redirected rather than dropped. Hero film, chat assistant, fit checks, hunter page and Stripe checkout all shipped. The frozen showcase locks the as-shipped version for the portfolio while the client's own site evolves under their ownership.",
    },
  },
  {
    slug: "stress-ad",
    name: "Stress Aerospace & Defense",
    url: "https://stress-ad-preview.vercel.app",
    tagline: "Aerospace & defense engineering — a proposal, not a commission",
    description:
      "Nobody hired us for this one. StressAD is a Houston aerospace and defense engineering firm whose site runs on WordPress, and we rebuilt it on spec to show what their own material looks like in a faster shell: an animated blueprint hero, a fixed capability rail, and all 30 routes carrying their writing, photography, technical illustrations and PDFs across intact. Their live site is untouched. The proposal build is noindexed and carries a proposal notice on every page so it can never be mistaken for theirs.",
    tags: ["Proposal", "Vite", "WordPress rebuild", "30 routes"],
    status: "Proposal",
    year: "2026",
    accent: "blue",
    screenshot: "/portfolio/stress-ad.png",
    tier: "client-build",
    caseStudy: {
      oneLiner:
        "A speculative rebuild of a Houston aerospace engineering firm's WordPress site — 30 routes, their own content preserved verbatim, an animated blueprint hero, and a proposal notice on every page.",
      client: "Stress Aerospace and Defense, LLC · Houston, TX",
      role: "Design proposal · built on spec",
      timeline: "2026 · proposal build",
      stack: ["Vite", "Static SPA", "Vanilla JS", "Vercel", "Playwright"],
      viewUrl: "https://stress-ad-preview.vercel.app",
      viewLabel: "View the proposal",
      problem:
        "StressAD does the kind of engineering that is genuinely hard to explain: resonant fatigue testing, six-degrees-of-freedom rocket engine duct tests, structural test programs for subsea drones, CMMC Level 2 work for defense customers. All of it was already written down on their site, in their words, with their own photography and technical illustrations.\n\nSo the question this build asks is not what to say. It is what that same material looks like when the engineering is the thing you see first, instead of a page of body copy under a stock banner. We had no brief, no engagement, and no access. Everything here came from what they had already published.",
      approach:
        "A static build in Vite, deliberately small. The whole site is 29 kB of JavaScript and 45 kB of CSS, because a firm that tests hardware to destruction should not need a megabyte of framework to show a page of prose.\n\nContent was imported rather than rewritten. A Python pass archived every source page, then extracted copy, images, PDFs and video embeds into a single content file the site renders from. Nothing was invented, no claim was added, and no number was changed. The navigation became a fixed rail so the capability set is on screen at all times, and the hero became an animated blueprint rather than the original background film.",
      shipped: [
        {
          title: "Animated blueprint hero",
          body: "A continuous aircraft outline drawn as a technical blueprint, with orbital motion, scanning highlights and pointer parallax. The original homepage film is not used in the hero at all; it plays on demand from a film card further down the page, rather than autoplaying at a first-time visitor.",
        },
        {
          title: "Interactive capability explorer",
          body: "Analysis, instrumentation and monitoring, materials engineering, technical due diligence, and testing services, each with its own panel, imagery and deep link. One click to the detail instead of five scrolls to a paragraph.",
        },
        {
          title: "All 30 routes, content intact",
          body: "Home, about, certifications, insights articles, resources, literature, the full video gallery, service areas, site map and the legal pages. Their photographs, technical illustrations and PDFs are preserved rather than substituted, and a 30-route check suite runs content, navigation and browser assertions against the build.",
        },
        {
          title: "Certification feature",
          body: "CMMC Level 2 is the credential that decides whether a defense contractor can hold controlled information at all, and on the original it read as one more page. Here it gets its own section on the homepage.",
        },
        {
          title: "Honest contact form",
          body: "The form prepares an email draft and says so. It does not claim a message was sent, because no submission backend exists on a build for a company that has not engaged us, and pretending otherwise would lose a real enquiry.",
        },
        {
          title: "Proposal notice on every page",
          body: "noindex, nofollow, a robots.txt that disallows everything, an X-Robots-Tag on every response, and a visible notice stating this is a Mako Studio proposal that is not affiliated with, commissioned by, or endorsed by Stress Aerospace and Defense. A speculative build must never compete with the real company in search.",
        },
      ],
      outcome:
        "Unbuilt work is a promise; this is the thing itself. The proposal sits on its own URL where it can be looked at rather than described, and it is finished enough to hand over: what remains is a submission backend and a domain, both of which are a client's decision to make. Their own site continues to run exactly as it did.",
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
    slug: "makoanswer",
    name: "MakoAnswer",
    url: "https://makoanswer.com",
    tagline: "AI phone receptionist — every call answered, 24/7",
    description:
      "An AI receptionist for phone-driven service businesses. Mae picks up on the first ring day or night, books and qualifies the caller, screens spam and robocalls, warm-transfers the urgent ones to a human, and delivers a transcript, summary, recording, and lead after every call. Live demo line, flat published pricing from $24.95/mo, a customer dashboard for calls and leads, and 20+ industry and solution landing pages.",
    tags: ["Next.js 16", "Retell voice AI", "Twilio", "Programmatic SEO", "Stripe"],
    status: "Live",
    year: "2026",
    accent: "blue",
    screenshot: "/portfolio/makoanswer.png",
    tier: "product",
    caseStudy: {
      oneLiner:
        "An AI phone receptionist for service businesses — answers 24/7 on the first ring, books and qualifies, screens spam, warm-transfers the urgent calls, and delivers a transcript, summary, and lead every time. Flat published pricing, no contracts.",
      client: "Mako Logics (own product)",
      role: "Design + full-stack build + voice design",
      timeline: "2026 · live",
      stack: [
        "Next.js 16",
        "React 19",
        "Tailwind v4",
        "Retell (voice AI)",
        "Twilio",
        "Supabase Postgres",
        "Stripe",
        "iron-session + TOTP",
        "Vercel"
      ],
      viewUrl: "https://makoanswer.com",
      viewLabel: "Visit MakoAnswer",
      problem:
        "A missed call at a trades business is usually a lost job — the caller dials the next plumber on the list before your voicemail finishes playing. The existing options are all bad trades: voicemail loses the customer, a live answering service bills per call and reads from a script, and a front-desk hire costs more than most small shops can carry for a phone that rings in bursts.\n\nThe brief (own product): an AI receptionist that answers on the first ring at any hour, sounds like a person rather than a phone tree, actually books the job instead of just taking a name, and prices flat and public so an owner can decide in thirty seconds instead of booking a sales call.",
      approach:
        "Next.js 16 for the marketing site, the customer dashboard, and the internal ops panel, with the voice layer on Retell and telephony on Twilio so businesses can forward their existing number immediately and port it later — no number change on day one.\n\nMae, the receptionist, is a designed voice persona, not a default. Every greeting includes a call-recording notice; spam, robocall, and anonymous-caller screening runs on every plan; appointment booking and live warm transfer unlock on the higher tiers. After each call the system writes a transcript, summary, recording, and structured lead and pushes it to the business.\n\nThe SEO surface is programmatic and honest: twelve industry pages (HVAC, plumbing, electrical, roofing, restoration, towing, law firms, insurance and more), nine solution pages, and three named competitor comparisons built strictly from each provider's own published rates and dated, so the numbers can be checked rather than trusted.",
      shipped: [
        {
          title: "Mae — the AI receptionist",
          body: "A natural-voice receptionist on Retell that picks up on the first ring, 24/7/365 including nights, weekends, and holidays. Callers can dial the live demo line and talk to her before buying anything."
        },
        {
          title: "Books, qualifies, screens, escalates",
          body: "Appointment booking and lead qualification on the higher plans, spam / robocall / anonymous-caller screening on every plan, and live warm transfer of urgent calls to the business's own team."
        },
        {
          title: "Every call comes back as a lead",
          body: "Transcript, summary, recording, and a structured lead delivered after each call — so the record of what a caller wanted survives the call instead of living in someone's memory."
        },
        {
          title: "Customer dashboard",
          body: "Calls, leads, and settings behind iron-session auth with TOTP. Businesses keep their existing number: forward now, port later, no cutover on day one."
        },
        {
          title: "Programmatic SEO across 20+ pages",
          body: "Twelve industry pages and nine solution pages with their own intent-matched copy, plus vs-Ruby, vs-Smith.ai, and vs-AnswerConnect comparisons built from each provider's published pricing and dated so the claims stay checkable."
        },
        {
          title: "Flat public pricing + Stripe billing",
          body: "Four plans published on the site from $24.95/mo with per-call rates shown, annual billing, no setup fees, and no contracts — priced to undercut per-call answering services outright."
        },
        {
          title: "Internal ops panel",
          body: "Admin side covering clients, calls, leads, messages, blocked numbers, analytics, error monitoring, security posture, and team — the console the service is actually operated from."
        }
      ],
      outcome:
        "Live and taking real calls, with a public demo line anyone can dial to hear the receptionist before they buy. Pricing is published up front instead of gated behind a sales call, and the whole stack — voice, telephony, billing, customer dashboard, and ops panel — is Mako-built and Mako-operated."
    }
  },
  {
    slug: "makopulse",
    name: "MakoPulse",
    url: "https://makopulse.com",
    tagline: "Uptime monitoring that never cries wolf",
    description:
      "A full monitoring platform: seven check types from two continents as often as every 30 seconds, real-browser checks that catch JavaScript errors, AI that diagnoses the root cause within a minute of an incident opening, phone calls that read the alert aloud, heartbeat monitoring for cron jobs, and branded public status pages. Free for 5 monitors, $15/mo for 50. Every Mako client site is on it.",
    tags: ["Next.js 16", "Fly.io probers", "Cloudflare Workers", "Claude", "Stripe", "Supabase"],
    status: "Live",
    year: "2026",
    accent: "blue",
    screenshot: "/portfolio/makopulse.png",
    tier: "product",
    caseStudy: {
      oneLiner:
        "An uptime and API monitoring service built to solve the problem every monitoring tool has — it pages you for things that aren't broken. Multi-region probes, real-browser checks, AI root-cause diagnosis, escalation ladders, cron heartbeats, and branded status pages, running the monitoring for our own fleet and every client site we operate.",
      client: "Mako Logics (own product)",
      role: "Product, platform architecture, probe infrastructure, billing",
      timeline: "2026 · shipping continuously",
      stack: [
        "Next.js 16",
        "React 19",
        "Fly.io (always-on regional probers)",
        "Playwright (real-browser checks)",
        "Cloudflare Workers",
        "Supabase (Postgres)",
        "Claude (incident diagnosis + post-mortems)",
        "Stripe",
        "Resend",
        "Twilio (SMS + voice)",
        "Web Push",
        "Vercel"
      ],
      viewUrl: "https://makopulse.com",
      viewLabel: "Visit MakoPulse",
      problem:
        "Monitoring tools fail in two directions and both of them are expensive. They cry wolf — a single blip from a single location wakes you at 3am for a site that was never down — or they run entirely inside the platform they're supposed to be watching, so a regional outage takes down the site and the thing that was meant to tell you about it at the same moment.\n\nThere is a third gap nobody covers well: a scheduled job that simply stops firing produces no error, no log and no alert. It just goes quiet, and quiet is indistinguishable from healthy. And when something genuinely does break, the alert tells you what failed but not why — you still start from zero at the worst possible time.",
      approach:
        "Checks do not run on the same platform as the app. Two always-on probers sit on Fly.io in Virginia and Amsterdam, which is what makes real ICMP ping, TCP connects, traceroute and MTR possible at all — serverless functions cannot do any of them. A confirmed failure has to be seen from both regions before an incident opens, which is what removes most false alarms. A Cloudflare Worker on a separate cron watches MakoPulse itself, so 'everything is quiet because everything is down' still reaches a human.\n\nWhen an incident opens, Claude re-probes from both regions, runs traceroutes, inspects DNS and certificate state, and posts a plain-English root cause with next steps within about a minute — then writes the post-mortem automatically when it resolves. Alerts escalate on a timer through email, SMS, and phone calls that read the alert aloud, so a sleeping phone is not a single point of failure.\n\nCron jobs get inbound heartbeats instead of outbound checks: the job pings a URL each run, and MakoPulse alerts when a check-in does not arrive inside its expected window. Certificate and domain-expiry monitoring stays deliberately quiet on auto-renewing hosts until expiry is genuinely close, because an alert you learn to ignore is worse than no alert.",
      shipped: [
        {
          title: "Seven check types, two continents, 30-second floor",
          body: "HTTP availability, keyword present, keyword absent, expected status code, real ICMP ping, TCP port, and full headless-Chrome browser checks that catch JavaScript errors a status-code check cannot see. Response times break down by DNS, connect, TLS, and transfer phase, per region."
        },
        {
          title: "AI incident diagnosis and automatic post-mortems",
          body: "An opening incident triggers a re-probe from both regions plus traceroute and DNS/SSL inspection, and Claude posts a plain-English root cause with next steps in about a minute. When it resolves, the post-mortem writes itself."
        },
        {
          title: "Escalation that reaches a person",
          body: "Timed escalation ladders across email, SMS, and phone calls that read the alert aloud, plus webhook and Slack-style integrations and on-call assignment — so an unacknowledged incident climbs instead of sitting."
        },
        {
          title: "Heartbeat monitoring for scheduled jobs",
          body: "Inbound check-ins with a period and grace window, for the failure mode nothing else catches: a cron that silently stops firing. Now deployed across every scheduled job in the Mako fleet."
        },
        {
          title: "Branded public status pages",
          body: "Customer-facing status pages with 90-day uptime history, email subscriptions, and custom domains — so a client's own visitors get told before they have to ask."
        },
        {
          title: "Live network diagnostics + read-only API",
          body: "Traceroute, MTR, and ping on demand from either region against any incident, plus a read-only REST API over monitors and incidents for pulling status into other systems."
        }
      ],
      outcome:
        "Live with a free tier that needs no card — 5 monitors and 3-minute checks — and a $15/mo Pro tier for 50 monitors, 30-second checks, real-browser checks, AI diagnosis, and phone-call alerts. It is not a demo: MakoPulse runs the uptime monitoring for the entire Mako fleet, including every client site we operate, and there is a live public status page anyone can look at before signing up."
    }
  },
  {
    slug: "makochat",
    name: "MakoChat",
    url: "https://makochat.app",
    tagline: "The AI chat receptionist — from $39/mo",
    description:
      "Mae answers the visitors a small business misses. She reads the company's own website to learn the business, replies in a real conversation rather than a decision tree, books onto the actual calendar, and emails the lead the moment it happens. Self-setup takes about fifteen minutes; the same assistant escalates to a phone call on the top tier. Running on live client sites, not a demo.",
    tags: ["Next.js", "Site-crawl knowledge", "Stripe", "Multi-tenant"],
    status: "Live",
    year: "2026",
    accent: "blue",
    screenshot: "/portfolio/makochat.png",
    tier: "product",
    caseStudy: {
      oneLiner:
        "An AI chat receptionist that learns a business by reading its own website, books on the real calendar, and emails every lead — $39 to $199 a month, deployed on live client sites.",
      client: "MakoChat · a Mako Logics product",
      role: "Product, design, and full-stack build",
      timeline: "2026 · live",
      stack: ["Next.js", "Supabase Postgres", "Stripe", "Retell", "Twilio SMS", "Vercel"],
      viewUrl: "https://makochat.app",
      viewLabel: "Visit MakoChat",
      problem:
        "A plumber gets a question at 9:40 in the evening. By morning that person has booked someone else. Every small business knows this and almost none of them can staff it.\n\nThe existing answers are both bad. A chat widget staffed by humans costs more than the jobs it saves. A scripted bot is a decision tree that visitors recognise in one exchange and abandon, and every one of those is a customer who now thinks the business is careless.\n\nThe real obstacle is setup. An assistant is only useful if it knows the prices, the service area, the brands carried and the questions that business actually gets — and no owner is going to spend a weekend writing that into a form.",
      approach:
        "Skip the form. MakoChat crawls the customer's own website and builds the assistant's knowledge from it, up to 5,000 pages on the top tier, and PDFs and price sheets can be uploaded on top. The business already wrote all of this down; the setup problem was only ever that somebody expected them to write it again. That is what makes self-setup in about fifteen minutes real rather than a marketing number.\n\nMae is deliberately one character across two products. She answers chat here and phones on MakoAnswer, and the top tier escalates a chat to a call rather than handing the visitor to a different assistant with a different name and no memory of the conversation.\n\nEvery deployment is a tenant: its own knowledge, its own conversations, its own leads, its own billing. The admin side has clients, transcripts, a lead pipeline and a security page; each customer also gets their own portal.",
      shipped: [
        {
          title: "Knowledge from the site itself",
          body: "A crawler reads the customer's pages and builds what the assistant knows — 100 pages on Starter, 1,000 on Growth, 5,000 on Scale — with document uploads for the things that never made it onto the website.",
        },
        {
          title: "Booking on the real calendar",
          body: "Appointments land on the calendar the business already uses through a free Cal.com connection, so a booking is a booking rather than a request someone has to transcribe in the morning.",
        },
        {
          title: "Every lead, immediately",
          body: "Captured to the database and emailed the moment it happens, day or night. The lead exists whether or not the notification goes through, which is the ordering that decides whether a mail outage costs a customer.",
        },
        {
          title: "Three tiers, published",
          body: "$39, $79 and $199 a month on the page, in public, with what each includes. Features still being rolled out — SMS follow-ups and phone escalation — are labelled as such rather than sold as shipped.",
        },
        {
          title: "SMS with the opt-out built in",
          body: "Keyword handling and a suppression list of its own, checked at send time rather than trusting the carrier layer to have caught a STOP. Vendor handling is treated as a second line of defence, not the only one.",
        },
        {
          title: "Free tools that stand alone",
          body: "A missed-lead calculator, a review QR generator and a sitemap checker, each useful without an account — the kind of thing an owner finds first and remembers later.",
        },
      ],
      outcome:
        "Live and selling, and genuinely deployed rather than demonstrated: the widget runs on Bulldog client sites we operate, which means the product is exercised by real customers asking real questions before it is sold to anyone else.",
    },
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
    slug: "handpenned",
    name: "HandPenned",
    url: "https://handpenned.com",
    tagline: "Make an AI draft read like a person wrote it",
    description:
      "Paste a draft or a web address and HandPenned rewrites it in your own voice, keeps every price, phone number, name and date exactly as they were, and scores the result before you publish. The final words come from an open model no company controls, so they carry none of the hidden watermark the big three now put in everything they write. Eight tools; seven are free and need no account.",
    tags: ["Next.js", "Open-weight models", "Stripe", "Deterministic fact lock"],
    status: "Live",
    year: "2026",
    accent: "blue",
    screenshot: "/portfolio/handpenned.png",
    tier: "product",
    caseStudy: {
      oneLiner:
        "A rewrite pass that makes AI copy read human without changing a single fact — enforced by code, not by asking a model nicely, and finished by a model no vendor controls.",
      client: "HandPenned · a MakoBytes product from Mako Logics",
      role: "Product, design, and full-stack build",
      timeline: "2026 · live",
      stack: ["Next.js", "Supabase Postgres", "Open-weight models", "Stripe", "Vercel"],
      viewUrl: "https://handpenned.com",
      viewLabel: "Visit HandPenned",
      problem:
        "Anyone publishing AI-drafted copy has the same two fears, and they pull in opposite directions. The first is that it reads like a machine wrote it — the uniform paragraphs, the tidy list of three, the conclusion that restates the introduction. The second is that fixing the first will quietly break something true: a price becomes a different price, a phone number loses a digit, a date drifts by a day.\n\nEvery rewriting tool solves the first by asking a model to try harder, which is the same mechanism that caused the problem. And the way they solve the second is to hope. A model asked to preserve facts will usually preserve facts, and usually is not a standard you can publish against.\n\nThere is a third problem the category has mostly ignored. The major models now embed a statistical signature in the prose they generate. Rewriting an AI draft with another AI leaves it there.",
      approach:
        "Three decisions, each enforced in code rather than in a prompt.\n\nThe final text comes only from an open-weight model, held in an allowlist the application checks before any call. No keyed vendor model can touch text that reaches the page, which is what makes the watermark claim structural rather than aspirational.\n\nFacts are locked deterministically. Numbers, names, dates, prices and contact details are extracted and verified by ordinary code, and a model is not allowed to overrule a failure. It may add a note; it may not decide a mismatch was fine. The editor character on the homepage carries the whole product promise: she changes how it reads, never what it says.\n\nAnd the work is visible while it happens. Long jobs report a real percentage from paragraphs actually finished, with the stage in words, rather than a spinner that looks the same whether it is working or dead.",
      shipped: [
        {
          title: "Rewrite that cannot change the facts",
          body: "Deterministic extraction and verification of every number, name, date and price, run against the output before it is returned. A model may annotate a failure; it cannot override one.",
        },
        {
          title: "A score that explains itself",
          body: "The AI-score tool returns a number and the reasons behind it, naming what tripped it rather than leaving the writer to guess which sentence to rewrite.",
        },
        {
          title: "Seven free tools, no account",
          body: "AI score, readability, fact check, voice check, grammar, plagiarism and the browser extension all work without signing up. Only the rewrite costs money — the business model is the one operation that has real compute behind it.",
        },
        {
          title: "Priced in words, not tokens",
          body: "One credit is ten words. Free covers 200 credits a month, Solo is $29 and Studio $79, with one-time packs at $10, $25 and $75 labelled in pages rather than credits, because nobody thinks in credits.",
        },
        {
          title: "Finished by a model nobody owns",
          body: "An enforced allowlist of open-weight models for any text that reaches the page. It is the only way to claim output is unwatermarked and be able to show why.",
        },
        {
          title: "Progress you can actually read",
          body: "Real percentages from paragraphs completed, the current stage in plain words, and a stall timeout that says what went wrong instead of spinning forever.",
        },
      ],
      outcome:
        "Live at handpenned.com with open signup and a free tier. Eight tools shipped, seven of them usable without an account, and the paid rewrite behind a credit model priced in words. The rule it enforces — never invent a number, a name, a review or a credential — is the same one every Mako site is written under.",
    },
  },
  {
    slug: "pixelcopy",
    name: "PixelCopy",
    url: "https://pixelcopy.app",
    tagline: "Screen-capture studio for Windows — signed, Store-certified",
    description:
      "The Windows screen-capture app Mac users have had for years, plus the product site, account portal, and billing behind it. Region, window, and scrolling capture, a native markup editor, screen recording with audio, pin-to-screen, and on-device OCR in 25+ languages — free forever locally, with an $8/mo Pro tier for hosted sharing. The homepage is a scroll-scrubbed cinematic that flies into a workstation and shows the app doing the work.",
    tags: ["WinUI 3", "MSIX + code signing", "Next.js 15", "Stripe", "Supabase"],
    status: "Live",
    year: "2026",
    accent: "steel",
    screenshot: "/portfolio/pixelcopy.png",
    tier: "product",
    caseStudy: {
      oneLiner:
        "A code-signed, Microsoft Store certified screen-capture, annotation, and recording studio for Windows — free for every local feature, $8/mo for cloud sharing — shipped with its own product site, passwordless account portal, and subscription billing.",
      client: "Mako Logics (own product · MakoBytes)",
      role: "Desktop app + product site + release and billing infrastructure",
      timeline: "2026 · shipping continuously",
      stack: [
        "WinUI 3 (C# / .NET)",
        "MSIX + code signing",
        "Windows Media OCR",
        "Next.js 15",
        "React 19",
        "Supabase",
        "Stripe",
        "Resend",
        "Vercel"
      ],
      viewUrl: "https://pixelcopy.app",
      viewLabel: "Visit PixelCopy",
      problem:
        "Windows has never had the polished capture tool Mac users take for granted. Snipping Tool is a shortcut, not a workflow — no scrolling capture, no real annotation, no recording worth using. ShareX is genuinely powerful and genuinely overwhelming. Snagit is the professional answer and prices like one, per seat, forever.\n\nThe brief (own product): one native Windows app that captures, annotates, records, pins, and reads text off the screen — good enough to replace the paid tools, honest enough to leave every local feature free, and signed properly so it installs on a locked-down work machine without a SmartScreen fight.",
      approach:
        "The app is WinUI 3 on .NET, native rather than a wrapped web view, with OCR running on-device through Windows Media OCR in 25+ languages — screen text never leaves the machine to be read. Distribution is a code-signed MSIX that auto-updates from the official signed release, plus a Microsoft Store listing that passed certification review, so it installs cleanly on managed Windows without an unknown-publisher warning.\n\nThe business model is drawn on purpose: every local capture, annotation, recording, and OCR feature is free with no nag and no expiry, and only hosted sharing sits behind the $8/mo Pro tier. Cancel and the local app keeps working — nothing you already made stops opening.\n\nThe product site is Next.js on Vercel with Stripe subscriptions, a passwordless magic-link account portal for managing shared links, and a homepage rebuilt as a scroll-scrubbed camera flight into a workstation, where each beat demonstrates a real capability instead of describing it. Customer share pages and raw media are noindexed so nobody's screenshot ends up in a search index.",
      shipped: [
        {
          title: "Capture, annotate, record — one native app",
          body: "Region, window, fullscreen, and scrolling capture; a markup editor with arrows, text, blur, pixelate, and numbered steps; screen recording with mic and system audio; GIF export; and pin-to-screen for keeping a capture on top while you work."
        },
        {
          title: "On-device OCR in 25+ languages",
          body: "Text is lifted off any capture through Windows Media OCR, locally. No upload, no third-party vision API, nothing to disclose in a privacy policy because nothing leaves the machine."
        },
        {
          title: "Code-signed MSIX + Microsoft Store",
          body: "Signed installer that auto-updates from the official signed release through Windows App Installer, plus a Store listing that passed Microsoft's certification review — so it installs on managed corporate machines without a publisher warning."
        },
        {
          title: "A free tier that stays free",
          body: "Every local capture, annotation, recording, and OCR feature is free with no nag screen and no expiry. Pro is $8/mo for hosted sharing only, and cancelling never disables the local app."
        },
        {
          title: "Cloud sharing + account portal",
          body: "Pro uploads produce a short link and a web viewer, with a passwordless magic-link portal showing every link shared from any PC as a thumbnail grid — each one re-copyable, expirable, password-protectable, view-counted, or deletable."
        },
        {
          title: "Scroll-cinematic product site",
          body: "The homepage is a scroll-scrubbed camera flight into a workstation that demonstrates capture, annotation, recording, pin/OCR, and sharing with the app's real UI — built alongside honest side-by-side comparisons against Snagit, ShareX, Snipping Tool, and Greenshot."
        },
        {
          title: "Privacy-first sharing surface",
          body: "Customer share pages and raw media are noindexed, AI-crawler rules are current, and the marketing surface is kept separate from anything a user actually uploaded."
        }
      ],
      outcome:
        "Published and downloadable — v1.0.8 for Windows 10 (1903+) and Windows 11 on x64 and ARM64, live on the Microsoft Store after passing certification, with the $8/mo Pro subscription running. Free download, no account required to use it."
    }
  },
  {
    slug: "makobytes",
    name: "MakoBytes",
    url: "https://makobytes.com",
    tagline: "The software studio site that boots like a desktop",
    description:
      "MakoOS: the entire product site runs as a desktop — boot screen, draggable windows, taskbar, start menu. PixelCopy and MakoBot ship installed, code-signing is shown as a certificate dialog, and a captcha-gated contact form composes like an email client.",
    tags: ["Next.js", "MakoOS UI", "Turnstile", "Analytics"],
    status: "Live",
    year: "2026",
    accent: "blue",
    screenshot: "/portfolio/makobytes.png",
    tier: "product"
  },
  {
    slug: "scrollhouse",
    name: "Scrollhouse",
    url: "https://scrollhouse-theme.vercel.app",
    tagline: "Scroll-cinematic site theme — the scroll drives a camera flight",
    description:
      "A landing site whose hero is a pre-rendered continuous camera flight, scrubbed frame-by-frame by the scroll position: dusk exterior, into the interior, an alert beat, an operations centre, back out to a calm night and the CTA. Filmed twice natively — 16:9 for desktop and a real 9:16 vertical for phones. Available to license and rebrand.",
    tags: ["Next.js", "Scroll cinematic", "Theme", "AI-generated film"],
    status: "Available",
    year: "2026",
    accent: "blue",
    screenshot: "/portfolio/scrollhouse.png",
    tier: "product",
    caseStudy: {
      oneLiner:
        "A scroll-scrubbed cinematic site theme: one continuous pre-rendered camera flight from a dusk exterior into the interior and back out, filmed natively for both desktop and mobile. Available to license and rebrand.",
      client: "Mako Studio product",
      role: "Direction, film generation, full-stack build",
      timeline: "2026",
      stack: [
        "Next.js 15",
        "Tailwind CSS 4",
        "Vanilla scrub engine",
        "Vercel",
        "Higgsfield (seedance_2_0)"
      ],
      viewUrl: "https://scrollhouse-theme.vercel.app",
      viewLabel: "View live demo",
      problem:
        "Most \"cinematic\" websites are one of two things: a looping video background that ignores the visitor entirely, or CSS parallax that slides flat layers past each other. Neither gives the feeling the format promises — that the visitor is moving through a real place, at their own pace, in control.\n\nThe hard version is a genuine camera flight the scroll wheel drives: scroll down and the camera moves forward through the space, stop and it stops, scroll back and it reverses. Done naively it is enormous — a WebGL scene, 3D assets, a render budget, and a performance problem on every phone.",
      approach:
        "Pre-render the flight instead of computing it. The camera move is generated once as five chained eight-second clips, each starting from the previous clip's final frame so the seams are continuous and the whole thing reads as one unbroken take. At runtime the browser is only seeking a video — no 3D, no physics, no WebGL, and a dependency-free engine under 500 lines.\n\nThe part most builds skip: phones. A 16:9 flight letterboxed or centre-cropped into a portrait viewport throws away the composition. So the entire flight was generated a second time in native 9:16, and the engine picks the right encode per viewport. Most traffic is mobile, so the mobile cut is not the compromise version.\n\nEncoding matters more than it looks. A short keyframe interval is what makes scrubbing feel attached to the scroll — a long GOP makes every seek visibly mushy — so the clips are encoded at low -g and cached immutably.",
      shipped: [
        {
          title: "Scroll-scrubbed continuous flight",
          body: "Five scenes, frame-locked seams, no cuts. Scroll position maps directly to camera position — forward, paused, or reversed, at the visitor's pace."
        },
        {
          title: "Two native films, not one crop",
          body: "Desktop 16:9 and mobile 9:16 are separately composed and separately encoded. The engine serves the right one per viewport."
        },
        {
          title: "Copy and CTAs pinned into the film",
          body: "Per-scene headline, body and tags fade in over the moving image, and the pricing cards pin into the film's held final frame rather than waiting below the fold."
        },
        {
          title: "Static, fast, and cheap to host",
          body: "Fully static Next.js — no database, no API routes, no server runtime. Assets are immutably cached; the whole site is a CDN read."
        },
        {
          title: "Security baseline shipped, not optional",
          body: "HSTS with preload, tight CSP, X-Frame-Options, Referrer-Policy, deny-all Permissions-Policy, no X-Powered-By."
        },
        {
          title: "Documented to rebrand",
          body: "Brand assets regenerate from one script, colours are CSS variables, and the README documents the two engine patches, the re-encode recipe, and every step to make it yours."
        }
      ],
      outcome:
        "Live demo deployed. The film's scenes are deliberately generic — a house, a wall device, an operations centre — so it fits home security and monitoring, smart home, solar, HVAC and home services, remodelling, and residential real estate. Licensed per project; contact for pricing."
    }
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
