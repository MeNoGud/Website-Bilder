import OpenAI from "openai";
import type { GithubFile } from "./github";

/* ─────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────── */

export type SiteType =
  | "brochure"
  | "ecommerce"
  | "portfolio"
  | "services"
  | "restaurant"
  | "saas";

export interface BlueprintPage {
  name: string;
  route: string;
  sections: string[];
  notes?: string;
}

export interface BlueprintService {
  title: string;
  description: string;
}

export interface BlueprintJSON {
  slug: string;
  clientName: string;
  businessName: string;
  clientEmail: string;
  siteType: SiteType;
  pages: BlueprintPage[];
  navigation: Array<{ label: string; href: string }>;
  siteConfig: {
    tagline: string;
    description: string;
    role: string;
    location: string;
    about: string[];
    services: BlueprintService[];
    stats: Array<{ value: string; label: string }>;
    email: string;
    socialLinks: Array<{ label: string; href: string }>;
  };
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    display: string;
    body: string;
  };
  features: string[];
  ecommerce?: {
    platform: string;
    currency: string;
    productCount: string;
    payments: string;
    shipping: string;
  };
  designNotes: string;
  technicalStack: string[];
  cursorInstructions: string;
  estimatedWeeks: number;
}

/* ─────────────────────────────────────────────────────────────
   GPT-4o System Prompt
───────────────────────────────────────────────────────────── */

const SYSTEM_PROMPT = `You are a senior web architect and designer working for Marchio Studio.
Given a client project brief, you analyse every detail and return a complete JSON blueprint for their website.

OUTPUT: A single valid JSON object. No markdown, no prose outside the JSON.

SCHEMA:
{
  "slug": string,              // kebab-case: business-name-YYYYMMDD
  "clientName": string,
  "businessName": string,
  "clientEmail": string,
  "siteType": "brochure"|"ecommerce"|"portfolio"|"services"|"restaurant"|"saas",
  "pages": [{ "name": string, "route": string, "sections": string[], "notes": string }],
  "navigation": [{ "label": string, "href": string }],
  "siteConfig": {
    "tagline": string,           // compelling one-liner from the brief
    "description": string,       // 2-3 sentence SEO meta description
    "role": string,              // business type label e.g. "Luxury Interior Design Studio"
    "location": string,
    "about": string[],           // 2 short about paragraphs derived from brief
    "services": [{ "title": string, "description": string }],
    "stats": [{ "value": string, "label": string }],
    "email": string,
    "socialLinks": [{ "label": string, "href": string }]
  },
  "brandColors": {
    "primary": string,           // hex
    "secondary": string,         // hex
    "accent": string,            // hex
    "background": string,        // hex
    "text": string               // hex
  },
  "typography": {
    "display": string,           // MUST be one of: Syne, Playfair_Display, DM_Sans, Raleway, Space_Grotesk, Cormorant_Garamond, Outfit, Josefin_Sans, Nunito, Bebas_Neue
    "body": string               // MUST be one of: Inter, DM_Sans, Lato, Nunito, Open_Sans, Source_Sans_3, Outfit
  },
  "features": string[],
  "ecommerce": null | { "platform": string, "currency": string, "productCount": string, "payments": string, "shipping": string },
  "designNotes": string,         // 1-2 paragraphs guiding the visual direction
  "technicalStack": string[],
  "cursorInstructions": string,  // 600-900 words: step-by-step build instructions for Cursor AI agent
  "estimatedWeeks": number
}

SITE TYPE RULES:
- brochure: pages = Home, About, Services, Contact
- ecommerce: pages = Home, Shop, [Product Detail], Cart, Checkout, About, Contact
- portfolio: pages = Home, Work, [Case Study], About, Contact
- services: pages = Home, Services, Pricing, About, FAQ, Contact
- restaurant: pages = Home, Menu, Reservations, About, Location, Contact
- saas: pages = Home, Features, Pricing, [Changelog], About, Contact

CURSOR INSTRUCTIONS must be detailed enough for an AI agent to build the site without further questions. Include:
1. Step-by-step build order (Foundation → Pages → Features → Polish)
2. Each component name and what it renders
3. Design tokens to use (colors, fonts, spacing)
4. Interaction patterns (hover states, animations, transitions)
5. Mobile responsiveness notes
6. Any integrations (forms, shop, booking, etc.)

TYPOGRAPHY GUIDANCE by site type:
- Luxury / hospitality / high-end: Cormorant_Garamond or Playfair_Display + Lato
- Creative / design / portfolio: Syne or Space_Grotesk + DM_Sans
- Modern business / SaaS / tech: Outfit or DM_Sans + Inter
- Friendly / health / wellness: Nunito + Open_Sans
- Bold / fashion / editorial: Bebas_Neue or Raleway + Inter
- Restaurant / food: Josefin_Sans or Playfair_Display + Source_Sans_3`;

/* ─────────────────────────────────────────────────────────────
   Generate blueprint via GPT-4o
───────────────────────────────────────────────────────────── */

export async function generateBlueprint(
  intake: Record<string, string>
): Promise<BlueprintJSON> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const today = new Date().toISOString().split("T")[0];

  const userPrompt = `PROJECT BRIEF:
Business: ${intake.business}
Industry: ${intake.industry}
Contact: ${intake.name} <${intake.email}>
One-liner: ${intake.oneLiner}
Description: ${intake.description}
Target audience: ${intake.audience}
Goals: ${intake.goals}
Pages needed: ${intake.pages}
Features: ${intake.features}
Domain: ${intake.domain}
CMS required: ${intake.hasCms}
Visual styles: ${intake.styles}
Tone of voice: ${intake.tone}
Typography preference: ${intake.typography}
Primary colour: ${intake.primaryColor || "not specified"}
Secondary colour: ${intake.secondaryColor || "not specified"}
Accent colour: ${intake.accentColor || "not specified"}
Reference sites: ${intake.references || "none"}
About copy: ${intake.aboutCopy || "not provided"}
Services copy: ${intake.servicesCopy || "not provided"}
Instagram: ${intake.instagram || "none"}
LinkedIn: ${intake.linkedin || "none"}
TikTok: ${intake.tiktok || "none"}
Facebook: ${intake.facebook || "none"}
Urgency: ${intake.urgency}
Budget: ${intake.budget}
Notes: ${intake.notes || "none"}
${intake.shopPlatform ? `E-commerce platform: ${intake.shopPlatform}` : ""}
${intake.shopProductQty ? `Product count: ${intake.shopProductQty}` : ""}
${intake.shopCurrency ? `Currency: ${intake.shopCurrency}` : ""}
${intake.shopPayments ? `Payments: ${intake.shopPayments}` : ""}
${intake.shopShipping ? `Shipping: ${intake.shopShipping}` : ""}
Today's date: ${today}`;

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    temperature: 0.4,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
  });

  const raw = response.choices[0]?.message?.content ?? "{}";
  return JSON.parse(raw) as BlueprintJSON;
}

/* ─────────────────────────────────────────────────────────────
   Font mapping for next/font/google imports
───────────────────────────────────────────────────────────── */

const FONT_MAP: Record<string, { weights: string[]; hasItalic: boolean }> = {
  Syne:               { weights: ["400","500","600","700","800"], hasItalic: false },
  Playfair_Display:   { weights: ["400","500","600","700"], hasItalic: true },
  DM_Sans:            { weights: ["400","500","600","700"], hasItalic: false },
  Raleway:            { weights: ["400","500","600","700","800"], hasItalic: false },
  Space_Grotesk:      { weights: ["400","500","600","700"], hasItalic: false },
  Cormorant_Garamond: { weights: ["300","400","500","600"], hasItalic: true },
  Outfit:             { weights: ["400","500","600","700"], hasItalic: false },
  Josefin_Sans:       { weights: ["400","500","600","700"], hasItalic: false },
  Nunito:             { weights: ["400","500","600","700","800"], hasItalic: false },
  Bebas_Neue:         { weights: ["400"], hasItalic: false },
  Inter:              { weights: [], hasItalic: false },
  Lato:               { weights: ["400","700"], hasItalic: false },
  Open_Sans:          { weights: ["400","500","600","700"], hasItalic: false },
  Source_Sans_3:      { weights: ["400","500","600","700"], hasItalic: false },
};

/* ─────────────────────────────────────────────────────────────
   File builders
───────────────────────────────────────────────────────────── */

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function buildSiteConfigFile(bp: BlueprintJSON): string {
  const services = bp.siteConfig.services
    .map(
      (s, i) =>
        `    { number: "${String(i + 1).padStart(2, "0")}", title: ${JSON.stringify(s.title)}, description: ${JSON.stringify(s.description)} }`
    )
    .join(",\n");

  const stats = bp.siteConfig.stats
    .map((s) => `    { value: ${JSON.stringify(s.value)}, label: ${JSON.stringify(s.label)} }`)
    .join(",\n");

  const social = bp.siteConfig.socialLinks
    .map((s) => `    { label: ${JSON.stringify(s.label)}, href: ${JSON.stringify(s.href)} }`)
    .join(",\n");

  const about = bp.siteConfig.about
    .map((p) => `  ${JSON.stringify(p)}`)
    .join(",\n");

  return `/** Auto-generated by Marchio Blueprint System — ${new Date().toISOString().split("T")[0]} */

export const site = {
  name: ${JSON.stringify(bp.businessName)},
  role: ${JSON.stringify(bp.siteConfig.role)},
  tagline: ${JSON.stringify(bp.siteConfig.tagline)},
  description: ${JSON.stringify(bp.siteConfig.description)},
  location: ${JSON.stringify(bp.siteConfig.location)},
  email: ${JSON.stringify(bp.siteConfig.email)},

  about: [
${about}
  ],

  services: [
${services}
  ],

  stats: [
${stats}
  ],

  social: [
${social}
  ],

  projects: [] as Array<{ name: string; description: string; href: string }>,

  navigation: ${JSON.stringify(bp.navigation, null, 2)},
} as const;
`;
}

export function buildTailwindConfig(bp: BlueprintJSON): string {
  const c = bp.brandColors;
  return `import type { Config } from "tailwindcss";

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
        sans:    ["var(--font-sans)",    "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)",    "ui-monospace", "monospace"],
      },
      colors: {
        brand: {
          primary:    "${c.primary}",
          secondary:  "${c.secondary}",
          accent:     "${c.accent}",
          background: "${c.background}",
          text:       "${c.text}",
        },
      },
    },
  },
  plugins: [],
};

export default config;
`;
}

export function buildLayoutFile(bp: BlueprintJSON): string {
  const displayKey = bp.typography.display in FONT_MAP ? bp.typography.display : "Syne";
  const bodyKey    = bp.typography.body    in FONT_MAP ? bp.typography.body    : "Inter";
  const displayMeta = FONT_MAP[displayKey];
  const bodyMeta    = FONT_MAP[bodyKey];

  const displayWeights = displayMeta.weights.length
    ? `  weight: [${displayMeta.weights.map((w) => `"${w}"`).join(", ")}],\n  `
    : "";
  const displayItalic = displayMeta.hasItalic ? `  style: ["normal", "italic"],\n  ` : "";

  const bodyWeights = bodyMeta.weights.length
    ? `  weight: [${bodyMeta.weights.map((w) => `"${w}"`).join(", ")}],\n  `
    : "";

  const displayVarName = displayKey.toLowerCase().replace(/_/g, "");
  const bodyVarName    = bodyKey.toLowerCase().replace(/_/g, "");

  const sameFont = displayKey === bodyKey;

  const fontImports = sameFont
    ? `import { ${displayKey} } from "next/font/google";`
    : `import { ${displayKey}, ${bodyKey} } from "next/font/google";`;

  const fontDefs = sameFont
    ? `const ${displayVarName} = ${displayKey}({
  variable: "--font-display",
  subsets: ["latin"],
  ${displayWeights}${displayItalic}display: "swap",
});`
    : `const ${displayVarName} = ${displayKey}({
  variable: "--font-display",
  subsets: ["latin"],
  ${displayWeights}${displayItalic}display: "swap",
});

const ${bodyVarName} = ${bodyKey}({
  variable: "--font-sans",
  subsets: ["latin"],
  ${bodyWeights}display: "swap",
});`;

  const fontVarClass = sameFont
    ? `\${${displayVarName}.variable}`
    : `\${${displayVarName}.variable} \${${bodyVarName}.variable}`;

  return `import type { Metadata } from "next";
${fontImports}
import "./globals.css";

${fontDefs}

export const metadata: Metadata = {
  metadataBase: new URL("https://${slugify(bp.businessName)}.com"),
  title: {
    default: ${JSON.stringify(bp.businessName + " — " + bp.siteConfig.role)},
    template: \`%s — ${bp.businessName}\`,
  },
  description: ${JSON.stringify(bp.siteConfig.description)},
  openGraph: {
    title: ${JSON.stringify(bp.businessName)},
    description: ${JSON.stringify(bp.siteConfig.description)},
    siteName: ${JSON.stringify(bp.businessName)},
    locale: "en_GB",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={\`${fontVarClass}\`}>
      <body className="font-sans bg-[${bp.brandColors.background}] text-[${bp.brandColors.text}]">
        {children}
      </body>
    </html>
  );
}
`;
}

export function buildHomePage(bp: BlueprintJSON): string {
  const homePage = bp.pages.find((p) => p.route === "/" || p.name.toLowerCase() === "home");
  const sections = homePage?.sections ?? ["Hero", "About", "Services", "Contact"];

  const imports = ["Header", ...sections, "Footer"]
    .map((c) => `import { ${c} } from "@/components/${c}";`)
    .join("\n");

  const sectionJsx = sections.map((s) => `        <${s} />`).join("\n");

  return `${imports}

export default function Home() {
  return (
    <div>
      <Header />
      <main>
${sectionJsx}
      </main>
      <Footer />
    </div>
  );
}
`;
}

export function buildBlueprintMd(bp: BlueprintJSON): string {
  const pageList = bp.pages
    .map(
      (p) =>
        `### ${p.name} (\`${p.route}\`)\n**Sections:** ${p.sections.join(", ")}\n${p.notes ? `*${p.notes}*` : ""}`
    )
    .join("\n\n");

  const featureList = bp.features.map((f) => `- ${f}`).join("\n");

  const colorSwatches = Object.entries(bp.brandColors)
    .map(([k, v]) => `| ${k.charAt(0).toUpperCase() + k.slice(1)} | \`${v}\` |`)
    .join("\n");

  const serviceList = bp.siteConfig.services
    .map((s) => `- **${s.title}**: ${s.description}`)
    .join("\n");

  return `# Blueprint — ${bp.businessName}

> Generated ${new Date().toISOString().split("T")[0]} by Marchio Blueprint System

## Overview

| Field | Value |
|---|---|
| **Business** | ${bp.businessName} |
| **Contact** | ${bp.clientName} — ${bp.clientEmail} |
| **Site type** | ${bp.siteType} |
| **Estimated delivery** | ${bp.estimatedWeeks} weeks |
| **Role / positioning** | ${bp.siteConfig.role} |

## Tagline

> ${bp.siteConfig.tagline}

## Site Map

${pageList}

## Navigation

${bp.navigation.map((n) => `- [${n.label}](${n.href})`).join("\n")}

## Features to Build

${featureList}

## Services / Offerings

${serviceList}

## Brand Colors

| Token | Hex |
|---|---|
${colorSwatches}

## Typography

- **Display / Headings:** ${bp.typography.display.replace(/_/g, " ")}
- **Body:** ${bp.typography.body.replace(/_/g, " ")}

## Design Direction

${bp.designNotes}

## Technical Stack

${bp.technicalStack.map((t) => `- ${t}`).join("\n")}

${bp.ecommerce ? `## E-Commerce Details

| Field | Value |
|---|---|
| Platform | ${bp.ecommerce.platform} |
| Currency | ${bp.ecommerce.currency} |
| Products | ${bp.ecommerce.productCount} |
| Payments | ${bp.ecommerce.payments} |
| Shipping | ${bp.ecommerce.shipping} |
` : ""}

## About Copy (Placeholder)

${bp.siteConfig.about.map((p, i) => `**Paragraph ${i + 1}:** ${p}`).join("\n\n")}

---
*This blueprint was generated automatically from the client's project brief. Verify all details with the client before the discovery call.*
`;
}

export function buildCursorAgentMd(bp: BlueprintJSON): string {
  return `# Cursor Agent Instructions — ${bp.businessName}

## Mission
Build a complete, production-ready **${bp.siteType} website** for **${bp.businessName}**.

All configuration is pre-loaded:
- Brand identity → \`src/lib/site.ts\`
- Brand colors → \`tailwind.config.ts\`
- Page structure → \`src/app/page.tsx\`
- Full specification → \`BLUEPRINT.md\`

---

## Getting Started

\`\`\`bash
npm install
npm run dev   # http://localhost:3000
\`\`\`

---

## Build Instructions

${bp.cursorInstructions}

---

## Design System

| Token | Value |
|---|---|
| Primary | \`${bp.brandColors.primary}\` |
| Secondary | \`${bp.brandColors.secondary}\` |
| Accent | \`${bp.brandColors.accent}\` |
| Background | \`${bp.brandColors.background}\` |
| Text | \`${bp.brandColors.text}\` |

**Display font:** ${bp.typography.display.replace(/_/g, " ")}
**Body font:** ${bp.typography.body.replace(/_/g, " ")}

${bp.designNotes}

---

## Pages to Build

${bp.pages.map((p) => `### ${p.name} (\`${p.route}\`)\nSections: ${p.sections.join(" → ")}${p.notes ? `\n> ${p.notes}` : ""}`).join("\n\n")}

---

## Technical Stack

${bp.technicalStack.map((t) => `- ${t}`).join("\n")}

---

*Generated by Marchio Blueprint System — do not edit this file manually.*
`;
}

/* ─────────────────────────────────────────────────────────────
   Base template files (non-client-specific Next.js scaffold)
───────────────────────────────────────────────────────────── */

const BASE_PACKAGE_JSON = (businessName: string) => `{
  "name": "${slugify(businessName)}-site",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "framer-motion": "^12.38.0",
    "next": "^15.3.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.20",
    "eslint": "^9",
    "eslint-config-next": "^15.3.0",
    "postcss": "^8",
    "tailwindcss": "^3.4.17",
    "typescript": "^5"
  }
}
`;

const TSCONFIG = `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`;

const NEXT_CONFIG = `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
};

export default nextConfig;
`;

const POSTCSS_CONFIG = `const config = {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};

export default config;
`;

const ESLINT_CONFIG = `import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
`;

const GITIGNORE = `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem
.env*.local
.vercel
*.tsbuildinfo
next-env.d.ts
`;

const buildGlobalsCSS = (bp: BlueprintJSON) => `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --brand-primary:    ${bp.brandColors.primary};
  --brand-secondary:  ${bp.brandColors.secondary};
  --brand-accent:     ${bp.brandColors.accent};
  --brand-bg:         ${bp.brandColors.background};
  --brand-text:       ${bp.brandColors.text};
  color-scheme: light;
}

html { scroll-behavior: smooth; }

body {
  font-feature-settings: "kern" 1, "liga" 1;
  background: var(--brand-bg);
  color: var(--brand-text);
}

::selection {
  background: color-mix(in srgb, var(--brand-primary) 20%, transparent);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.reveal {
  opacity: 0;
  transform: translateY(18px);
}

@supports (animation-timeline: view()) {
  .reveal {
    animation: fadeUp linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 28%;
  }
}

@supports not (animation-timeline: view()) {
  .reveal { opacity: 1; transform: none; }
}
`;

const buildReadme = (bp: BlueprintJSON, repoName: string) => `# ${bp.businessName} — Website

Built by [Marchio Studio](https://marchio.design) · Generated ${new Date().toISOString().split("T")[0]}

## Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000).

## Project Blueprint

See \`BLUEPRINT.md\` for the full site specification and \`CURSOR_AGENT.md\` for the AI build instructions.

## Deploy

Connect this repo to [Vercel](https://vercel.com) for automatic deployments.

---

*Repo: \`${repoName}\` · Client: ${bp.clientName} (${bp.clientEmail})*
`;

/* ─────────────────────────────────────────────────────────────
   Assemble all files for the GitHub repo
───────────────────────────────────────────────────────────── */

export function buildAllFiles(
  bp: BlueprintJSON,
  repoName: string
): GithubFile[] {
  return [
    { path: "README.md",                content: buildReadme(bp, repoName) },
    { path: "BLUEPRINT.md",             content: buildBlueprintMd(bp) },
    { path: "CURSOR_AGENT.md",          content: buildCursorAgentMd(bp) },
    { path: "package.json",             content: BASE_PACKAGE_JSON(bp.businessName) },
    { path: "tsconfig.json",            content: TSCONFIG },
    { path: "next.config.ts",           content: NEXT_CONFIG },
    { path: "postcss.config.mjs",       content: POSTCSS_CONFIG },
    { path: "eslint.config.mjs",        content: ESLINT_CONFIG },
    { path: ".gitignore",               content: GITIGNORE },
    { path: "tailwind.config.ts",       content: buildTailwindConfig(bp) },
    { path: "src/lib/site.ts",          content: buildSiteConfigFile(bp) },
    { path: "src/app/globals.css",      content: buildGlobalsCSS(bp) },
    { path: "src/app/layout.tsx",       content: buildLayoutFile(bp) },
    { path: "src/app/page.tsx",         content: buildHomePage(bp) },
  ];
}
