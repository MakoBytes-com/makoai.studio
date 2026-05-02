import Image from "next/image";
import Link from "next/link";
import type { PortfolioItem } from "@/lib/portfolio";

const statusColor: Record<PortfolioItem["status"], string> = {
  Live: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  Client: "bg-tide-500/15 text-tide-300 border-tide-500/20",
  "In Progress": "bg-amber-500/15 text-amber-300 border-amber-500/20",
  Available: "bg-steel-400/15 text-steel-300 border-steel-400/20",
  Archived: "bg-steel-400/10 text-steel-300 border-steel-400/15"
};

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  const hasCaseStudy = Boolean(item.caseStudy);
  const archived = Boolean(item.archived);

  const cardBody = (
    <>
      {/* Preview */}
      <div
        className={`relative aspect-[16/10] overflow-hidden bg-ink-700 ${
          archived ? "opacity-90" : ""
        }`}
      >
        {item.screenshot ? (
          <Image
            src={item.screenshot}
            alt={`${item.name} homepage screenshot`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={`object-cover object-top transition-transform duration-700 ${
              archived ? "grayscale-[30%]" : "group-hover:scale-[1.03]"
            }`}
          />
        ) : (
          <>
            <div
              className={`absolute inset-0 transition-transform duration-700 group-hover:scale-105 ${previewGradient(
                item.accent
              )}`}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-[28px] md:text-[36px] font-semibold text-white/90 tracking-tight">
                {item.name}
              </span>
            </div>
          </>
        )}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-ink-900/70 to-transparent pointer-events-none" />
        <div className="absolute top-4 left-4">
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full border ${statusColor[item.status]} backdrop-blur`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {item.status}
          </span>
        </div>
        {item.year ? (
          <div className="absolute top-4 right-4 text-[11px] text-white/80 font-mono">
            {item.year}
          </div>
        ) : null}
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-[20px] font-semibold text-steel-100 group-hover:text-white transition-colors">
              {item.name}
            </h3>
            <p className="mt-1 text-[13px] text-tide-300 font-medium">
              {item.tagline}
            </p>
          </div>
          {!archived ? (
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-steel-400 group-hover:text-tide-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0"
              fill="none"
              aria-hidden="true"
            >
              <path
                d={hasCaseStudy ? "M5 12h14m0 0l-5-5m5 5l-5 5" : "M7 17L17 7M17 7H8M17 7v9"}
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </div>
        <p className="mt-3 text-[14px] text-steel-300 leading-relaxed">
          {item.description}
        </p>
        {item.tags.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-steel-300 border border-white/5"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
        {archived && item.archivedNote ? (
          <p className="mt-5 text-[12px] text-steel-400 italic leading-relaxed pt-4">
            {item.archivedNote}
          </p>
        ) : null}
        {hasCaseStudy ? (
          <p className="mt-5 text-[12px] font-medium text-tide-300 flex items-center gap-1.5">
            Read case study
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none">
              <path
                d="M3 8h10m0 0l-4-4m4 4l-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
        ) : null}
      </div>
    </>
  );

  const shellClass = `group relative glass rounded-2xl overflow-hidden block ${
    archived
      ? "cursor-default"
      : "hover:border-tide-500/30 transition-all hover:-translate-y-1 hover:shadow-card"
  }`;

  if (archived) {
    return <div className={shellClass}>{cardBody}</div>;
  }

  if (hasCaseStudy) {
    return (
      <Link href={`/work/${item.slug}`} className={shellClass}>
        {cardBody}
      </Link>
    );
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={shellClass}
    >
      {cardBody}
    </a>
  );
}

function previewGradient(accent: PortfolioItem["accent"]): string {
  switch (accent) {
    case "silver":
      return "bg-gradient-to-br from-steel-300/20 via-ink-600 to-ink-800";
    case "steel":
      return "bg-gradient-to-br from-tide-600/30 via-ink-700 to-ink-900";
    case "blue":
    default:
      return "bg-gradient-to-br from-tide-500/30 via-tide-600/20 to-ink-800";
  }
}
