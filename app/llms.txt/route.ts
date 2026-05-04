export const dynamic = "force-static";

const body = `# Mako Studio

> AI-native web design and engineering team. The in-house web shop at Mako Logics LLC.

Mako Studio designs and ships modern, premium websites for small businesses,
professionals, and ambitious brands. Every project is built with Claude as
the core development partner — no WordPress, no visual page builders, no
templates-as-products. Each project runs through one engineer with AI
leverage end-to-end: discovery, design, engineering, deployment,
maintenance. No hand-offs between specialists.

## Contact
- Email: admin@makoai.studio
- Phone: (281) 206-4848
- Address: 550 Club Dr #264, Montgomery, TX 77316

## Services
- Web Design (custom visual direction, typography, motion, no templates)
- Web Development (Next.js, React, TypeScript, modern AI-native workflows)
- AI Integration (chatbots, LLM search, content generation, embeddings, RAG)
- SEO (schema, sitemaps, Core Web Vitals, AI-search ready — built in, not sold as a monthly retainer)
- Security (rate limits, MFA, strict CSP, edge WAF, error monitoring, dependency audits — hardened day one)
- Hosting & Ops (Vercel, Cloudflare, domains, email, monitoring, updates)

## Differentiator
Mako Studio is AI-native, not AI-assisted. "AI-assisted" means a developer
hand-codes with autocomplete. "AI-native" means the AI IS the engineer and
the studio is built around that shape. Design and build run in parallel,
compressing 6-week timelines into 2 without cutting corners.

## Featured Work
- TopPaws (https://toppaws.com) — AI creative platform for pet owners with image/video generation, Stripe billing, admin console
- MakoBot (https://makobot.com) — AI memory tool for Windows, desktop app + marketing site
- AI Prompts Hive (https://aipromptshive.com) — curated library of 5,000+ AI prompts, SEO-optimized
- MakoBytes (https://makobytes.com) — umbrella site for Mako Logics product line
- AAA Awning Co. (https://www.aaaawning.net) — Houston, TX custom awning fabricator since 1984 (client)
- Bulldog Security Service (https://bulldogsecurityservice.com) — multi-state ADT-partner residential security (client)
- Buffalo Seal & Gasket (https://buffalosealandgasket.com) — Houston, TX industrial seal + gasket supplier (client)
- Family Psychiatry of The Woodlands (https://woodlandsfamilypsychiatry.com) — The Woodlands, TX psychiatric practice (client)
- Burton NDT Rentals (https://www.bndtrentals.com) — La Porte, TX non-destructive testing equipment rental, sales, calibration & repair (pitch build, pending close)
- Laguna Resources (https://lagunares.com) — Texas-based upstream oil & gas operator (pitch build, pending close)
- Davis Investigation Services (https://www.davisinvestigationservices.com) — Conroe, TX pre-employment screening firm (maintained by Makologics MSP)
- Pro-Surve Technical Services (https://pro-surve.com) — League City, TX industrial inspection + NDT (maintenance by Makologics MSP)

## About
Based in Montgomery, TX. Remote-first. Mako Studio is the web practice
inside Mako Logics — a Texas-based shop that ships AI platforms, client
sites, commercial software, and Windows-signed desktop apps. Operated
end-to-end by Mako Logics.

## Parent Organization
Mako Logics — a small-business IT, AI, and web practice based in
Montgomery, Texas. Also operates Makologics MSP (managed services) and
MakoBytes (product line: MakoBot, AI Prompts Hive, PromptPixel).
`;

export async function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
