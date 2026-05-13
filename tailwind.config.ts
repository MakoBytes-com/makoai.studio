import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
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
        },
        tide: {
          600: "#1E4DD8",
          500: "#3B82F6",
          400: "#60A5FA",
          300: "#93C5FD"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "var(--font-inter)", "sans-serif"]
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(ellipse at top, rgba(59,130,246,0.18) 0%, transparent 55%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)"
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(59,130,246,0.35)",
        card: "0 10px 40px -20px rgba(0,0,0,0.8)"
      },
      animation: {
        "float-slow": "float 14s ease-in-out infinite",
        "drift": "drift 22s linear infinite",
        "shimmer": "shimmer 3s ease-in-out infinite"
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
        }
      }
    }
  },
  plugins: []
};

export default config;
