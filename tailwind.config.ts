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
        "pulse-lumen": "pulse-lumen 4s ease-in-out infinite",
        "dive-line": "dive-line 2.2s cubic-bezier(0.22, 1, 0.36, 1) infinite"
      },
      keyframes: {
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
