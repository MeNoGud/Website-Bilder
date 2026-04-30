import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        tolken:  ["var(--font-tolken)", "system-ui", "sans-serif"],
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        mono:    ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        void: {
          DEFAULT: "#2F6AA8",
          surface: "#2a5f97",
          elevated: "#255387",
          border: "rgba(255,255,255,0.12)",
          hover: "rgba(255,255,255,0.18)",
        },
        cream: {
          DEFAULT: "#1A110E",
          muted: "#4E3C36",
          dim: "#8C7970",
        },
        gold: {
          DEFAULT: "#E82400",
          light: "#F03A20",
          muted: "#F05840",
          faint: "rgba(232,36,0,0.07)",
          border: "rgba(232,36,0,0.22)",
        },
        emerald: {
          DEFAULT: "#F5A200",
          light: "#F7B420",
          subtle: "rgba(245,162,0,0.10)",
          border: "rgba(245,162,0,0.28)",
        },
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(circle at 1px 1px, rgba(26,17,14,0.06) 1px, transparent 0)",
      },
      animation: {
        marquee:         "marquee 38s linear infinite",
        "marquee-reverse": "marquee-reverse 32s linear infinite",
        "marquee-slow":  "marquee 55s linear infinite",
        "spin-slow":     "spin 18s linear infinite",
        "spin-reverse":  "spin-reverse 22s linear infinite",
        "float":         "float 3s ease-in-out infinite alternate",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%":   { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "spin-reverse": {
          from: { transform: "rotate(360deg)" },
          to:   { transform: "rotate(0deg)" },
        },
        float: {
          from: { transform: "translateY(0px)" },
          to:   { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
