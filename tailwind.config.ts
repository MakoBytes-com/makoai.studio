import type { Config } from "tailwindcss";

/**
 * BIOLUMINANCE design tokens — the Fable rebuild.
 *
 * The deep ocean is the one place on Earth where light is made, not
 * received. Palette runs from near-black abyss blues up through
 * bioluminescent cyan to pearl white — Russell's blue/white/silver/grey
 * family pushed to its most cinematic register.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // The water column — page backgrounds, cards, borders
        abyss: {
          950: "#020509",
          900: "#030711",
          850: "#050B18",
          800: "#071127",
          700: "#0A1832",
          600: "#0F2247",
          500: "#163158"
        },
        // Bioluminescence — the living glow accent
        lumen: {
          500: "#2FCDEB",
          400: "#5EEAFF",
          300: "#9AF2FF",
          200: "#C9F9FF"
        },
        // Brand blue — carried over, it IS Mako
        tide: {
          600: "#1E4DD8",
          500: "#3B82F6",
          400: "#60A5FA",
          300: "#93C5FD"
        },
        // Silver → pearl — text and surfaces
        mist: {
          500: "#8A95AD",
          400: "#A9B5CB",
          300: "#C7D3E4",
          200: "#DDE6F2",
          100: "#F2F6FB"
        },

        // ── LEGACY (pre-Fable palette) — kept so un-rebuilt pages
        //    render unchanged during the transition. Remove at final sweep.
        ink: {
          900: "#050912",
          800: "#0A1020",
          700: "#10182C",
          600: "#1A2540",
          500: "#26324F"
        },
        steel: {
          400: "#8A95AD",
          300: "#B8BFD0",
          200: "#D6DBE6",
          100: "#E8EDF3"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: [
          "var(--font-jetbrains-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace"
        ]
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(ellipse at top, rgba(59,130,246,0.18) 0%, transparent 55%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        "depth-fade":
          "linear-gradient(180deg, transparent 0%, rgba(2,5,9,0.85) 70%, #020509 100%)",
        "lumen-radial":
          "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(94,234,255,0.10) 0%, transparent 60%)",
        "surface-light":
          "radial-gradient(ellipse 90% 55% at 50% -12%, rgba(94,234,255,0.14) 0%, rgba(59,130,246,0.10) 34%, transparent 62%)",
        "water-column":
          "linear-gradient(180deg, rgba(10,24,50,0.35) 0%, rgba(3,7,17,0.1) 45%, rgba(2,5,9,0.9) 88%, #020509 100%)"
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(59,130,246,0.35)",
        "glow-lumen": "0 0 60px -12px rgba(94,234,255,0.35)",
        "glow-lumen-sm": "0 0 24px -6px rgba(94,234,255,0.45)",
        card: "0 10px 40px -20px rgba(0,0,0,0.8)",
        "card-deep": "0 30px 80px -30px rgba(0,0,0,0.9)"
      },
      letterSpacing: {
        telemetry: "0.28em"
      },
      transitionTimingFunction: {
        // The house ease — everything organic moves on this curve
        current: "cubic-bezier(0.22, 1, 0.36, 1)"
      },
      animation: {
        "float-slow": "float 14s ease-in-out infinite",
        drift: "drift 22s linear infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "pulse-lumen": "pulse-lumen 4s ease-in-out infinite",
        "dive-line": "dive-line 2.2s cubic-bezier(0.22, 1, 0.36, 1) infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-20px) translateX(10px)" }
        },
        drift: {
          "0%": { transform: "translateX(-10%)" },
          "100%": { transform: "translateX(110%)" }
        },
        shimmer: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.9" }
        },
        "pulse-lumen": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" }
        },
        "dive-line": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "15%": { opacity: "1" },
          "100%": { transform: "translateY(400%)", opacity: "0" }
        }
      }
    }
  },
  plugins: []
};

export default config;
