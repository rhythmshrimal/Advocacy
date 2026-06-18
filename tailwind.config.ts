import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — see lib/site.ts and the brand brief
        navy: {
          DEFAULT: "#0E2A47",
          900: "#0A2038",
          800: "#0E2A47",
          700: "#163758",
        },
        charcoal: "#1A1A1A",
        gold: {
          DEFAULT: "#B08D45",
          light: "#C9A55C",
          dark: "#967534",
        },
        offwhite: "#F8F6F2",
        slate: {
          DEFAULT: "#5C6470",
          light: "#8A909A",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        brand: "0.18em",
      },
      maxWidth: {
        content: "1180px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(14,42,71,0.04), 0 8px 30px rgba(14,42,71,0.06)",
        "card-hover": "0 4px 12px rgba(14,42,71,0.08), 0 18px 50px rgba(14,42,71,0.12)",
        header: "0 1px 0 rgba(14,42,71,0.06), 0 8px 24px rgba(14,42,71,0.06)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "#1A1A1A",
            "--tw-prose-headings": "#0E2A47",
            "--tw-prose-links": "#967534",
            "--tw-prose-bold": "#0E2A47",
            "--tw-prose-quotes": "#0E2A47",
            "--tw-prose-quote-borders": "#B08D45",
            "--tw-prose-bullets": "#B08D45",
            "--tw-prose-counters": "#B08D45",
            maxWidth: "68ch",
            h2: { fontFamily: "var(--font-playfair)", fontWeight: "600" },
            h3: { fontFamily: "var(--font-playfair)", fontWeight: "600" },
            a: { textDecoration: "none", fontWeight: "600" },
            "a:hover": { textDecoration: "underline" },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
