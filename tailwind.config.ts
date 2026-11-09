import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#E9EDF2",
          card: "#E9EDF2",
          dark: "#171C29",
        },
        text: {
          primary: "#151A23",
          secondary: "#687386",
          muted: "#546073",
        },
        darkText: {
          primary: "#F8FAFC",
          secondary: "#94A3B8",
          muted: "#64748B",
        },
        brand: {
          accent: "#4A65DC",
          accentHover: "#3852C7",
          accentLight: "#6E85EB",
          success: "#36A783",
          surfaceDark: "#171C29",
        },
      },
      boxShadow: {
        // Light Neumorphic 2.0 Elevations
        "neu-flat": "8px 8px 20px rgba(163, 177, 198, 0.38), -8px -8px 20px rgba(255, 255, 255, 0.85)",
        "neu-flat-sm": "4px 4px 10px rgba(163, 177, 198, 0.30), -4px -4px 10px rgba(255, 255, 255, 0.80)",
        "neu-flat-lg": "12px 12px 28px rgba(163, 177, 198, 0.42), -12px -12px 28px rgba(255, 255, 255, 0.90)",
        "neu-pressed": "inset 4px 4px 8px rgba(163, 177, 198, 0.45), inset -4px -4px 8px rgba(255, 255, 255, 0.85)",
        "neu-pressed-sm": "inset 2px 2px 5px rgba(163, 177, 198, 0.40), inset -2px -2px 5px rgba(255, 255, 255, 0.80)",
        "neu-accent": "6px 6px 16px rgba(74, 101, 220, 0.35), -4px -4px 12px rgba(255, 255, 255, 0.60)",
        
        // Dark Neumorphic Surfaces (#171C29)
        "neu-dark-flat": "8px 8px 24px rgba(0, 0, 0, 0.65), -6px -6px 20px rgba(35, 43, 62, 0.45)",
        "neu-dark-flat-lg": "12px 12px 30px rgba(0, 0, 0, 0.80), -8px -8px 24px rgba(45, 55, 78, 0.55)",
        "neu-dark-pressed": "inset 4px 4px 8px rgba(0, 0, 0, 0.75), inset -4px -4px 8px rgba(35, 43, 62, 0.35)",
        "neu-dark-pressed-sm": "inset 2px 2px 4px rgba(0, 0, 0, 0.65), inset -2px -2px 4px rgba(35, 43, 62, 0.25)",
        "neu-dark-dot": "inset 1px 1px 2px rgba(0, 0, 0, 0.8), inset -1px -1px 2px rgba(255, 255, 255, 0.2)",
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
