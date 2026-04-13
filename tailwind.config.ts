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
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        gold: {
          DEFAULT: "#C4975A",
          light: "#D4AE7A",
          muted: "#8C6A3A",
          faint: "rgba(196,151,90,0.08)",
          border: "rgba(196,151,90,0.22)",
        },
        cream: {
          DEFAULT: "#E8E4DC",
          muted: "#8A8680",
          dim: "#55534F",
        },
        void: {
          DEFAULT: "#080810",
          surface: "#0D0D1C",
          elevated: "#121224",
          border: "rgba(232,228,220,0.06)",
          hover: "rgba(232,228,220,0.10)",
        },
        emerald: {
          DEFAULT: "#2D6A4F",
          light: "#52B788",
          subtle: "rgba(82,183,136,0.10)",
          border: "rgba(82,183,136,0.25)",
        },
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(circle at 1px 1px, rgba(232,228,220,0.05) 1px, transparent 0)",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
