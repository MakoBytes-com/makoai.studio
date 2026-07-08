import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mako Studio — AI-native design and engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * BIOLUMINANCE social card — abyss depths, god-light from the surface,
 * a school of bioluminescent motes, and the headline in the site's
 * voice. (next/og can't load display fonts cheaply, so weight and
 * spacing carry the typography here.)
 */
export default function OG() {
  // Deterministic plankton field — no Math.random at the edge
  const motes = Array.from({ length: 42 }, (_, i) => {
    const x = ((i * 733) % 1187) + 8;
    const y = ((i * 419) % 610) + 10;
    const s = 2 + ((i * 7) % 5);
    const o = 0.25 + ((i * 13) % 50) / 100;
    const cyan = i % 3 === 0;
    return { x, y, s, o, cyan };
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 90px",
          background:
            "radial-gradient(ellipse 90% 55% at 50% -12%, rgba(94,234,255,0.20) 0%, rgba(59,130,246,0.12) 34%, transparent 62%), linear-gradient(180deg, #071127 0%, #030711 55%, #020509 100%)",
          color: "#F2F6FB",
          fontFamily: "Georgia, 'Times New Roman', serif",
          position: "relative"
        }}
      >
        {/* bioluminescent motes */}
        {motes.map((m, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: m.x,
              top: m.y,
              width: m.s,
              height: m.s,
              borderRadius: 999,
              background: m.cyan ? "#5EEAFF" : "#60A5FA",
              opacity: m.o,
              boxShadow: m.cyan
                ? "0 0 12px 2px rgba(94,234,255,0.55)"
                : "0 0 10px 2px rgba(96,165,250,0.4)"
            }}
          />
        ))}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 24,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#8A95AD",
            fontFamily: "ui-monospace, monospace"
          }}
        >
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 16,
              background:
                "linear-gradient(135deg, #5EEAFF 0%, #3B82F6 45%, #0A1832 100%)",
              boxShadow: "0 0 70px -8px rgba(94,234,255,0.65)"
            }}
          />
          <span
            style={{
              color: "#F2F6FB",
              fontWeight: 600,
              fontSize: 28,
              letterSpacing: "0.02em",
              fontFamily: "Georgia, serif",
              textTransform: "none"
            }}
          >
            Mako Studio
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 500,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "#F2F6FB",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <span>AI-native design</span>
            <span
              style={{
                fontStyle: "italic",
                color: "#9AF2FF"
              }}
            >
              and engineering.
            </span>
          </div>
          <div
            style={{
              fontSize: 27,
              color: "#C7D3E4",
              maxWidth: 900,
              lineHeight: 1.4,
              fontFamily: "system-ui, sans-serif"
            }}
          >
            The web practice inside Mako Logics. Every site built with Claude
            as the core development partner.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 21,
            color: "#8A95AD",
            borderTop: "1px solid rgba(94,234,255,0.18)",
            paddingTop: 24,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.14em"
          }}
        >
          <span>makoai.studio</span>
          <span style={{ letterSpacing: "0.22em" }}>
            30.3877° N · 95.6966° W — MONTGOMERY · TEXAS
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
