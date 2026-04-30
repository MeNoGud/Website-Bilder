/** Edit this file to personalise your site. */

export const site = {
  name: "Alberto Marchiorello",
  initials: "AM",
  role: "Web Designer & Developer",
  company: "Jashita Hotel & Luxury Villas",
  companyUrl: "https://www.jashitahotel.com",
  location: "London, UK",

  // ── Hero ────────────────────────────────────────
  hook: "I build websites that make your brand impossible to ignore.",
  positioning:
    "Custom websites for businesses, brands, and founders who want to stand out.",
  tagline:
    "Web designer and developer crafting high-performance digital experiences that convert visitors into clients — for any industry, any scale.",

  // ── Currently (update to reflect your real status) ──
  currently: {
    active: true,
    status:
      "Accepting new website projects & consultations. Open to working with businesses of any size, any industry.",
    openTo: ["New Websites", "Redesigns", "Landing Pages", "Consultations"],
  },

  // ── About (1st person) ──────────────────────────
  about: [
    "I build beautiful, fast, and purposeful websites for businesses that want to stand out. Every project starts with understanding your goals, your audience, and what makes you different — then turning that into a website that actually works.",
    "Every website I deliver combines sharp design with engineering precision. The result: a digital presence that earns trust instantly, converts browsers into buyers, and keeps performing long after launch.",
  ],

  // ── Stats ────────────────────────────────────────
  stats: [
    { value: "15+", label: "Websites delivered" },
    { value: "100%", label: "Client satisfaction" },
    { value: "98", label: "Avg. performance score" },
    { value: "4wk", label: "Average delivery time" },
  ],

  // ── Services / Expertise ─────────────────────────
  expertise: [
    {
      number: "01",
      title: "Strategy & Discovery",
      description:
        "Before a single pixel is placed, we map your goals, audience, and competitive landscape — so every design decision has a clear reason behind it.",
    },
    {
      number: "02",
      title: "Design & Craft",
      description:
        "Editorial-quality interfaces with obsessive attention to detail. Typography, motion, and colour chosen to position you as the undeniable premium choice.",
    },
    {
      number: "03",
      title: "Development & Engineering",
      description:
        "Clean, fast code built on Next.js, React, and Tailwind. Performance-first by default — because a slow website is a lost client.",
    },
    {
      number: "04",
      title: "Launch & Growth",
      description:
        "SEO-optimised from day one, with analytics, conversion tracking, and ongoing support to keep your site performing long after launch.",
    },
    {
      number: "05",
      title: "E-Commerce Platforms",
      description:
        "Custom online stores built on Shopify, WooCommerce, or fully bespoke solutions — designed to sell, built to scale, and optimised to convert from day one.",
    },
  ],

  // ── Process ─────────────────────────────────────
  process: [
    {
      step: "01",
      title: "Discovery Call",
      description:
        "A focused 30-minute conversation to understand your goals, audience, and vision. No commitment required — just clarity.",
    },
    {
      step: "02",
      title: "Proposal & Strategy",
      description:
        "A tailored proposal with scope, timeline, investment, and a clear creative direction built specifically for your project.",
    },
    {
      step: "03",
      title: "Design & Build",
      description:
        "Pixel-perfect design followed by production-ready development. You review at every stage, we refine until it's exactly right.",
    },
    {
      step: "04",
      title: "Launch & Support",
      description:
        "Seamless deployment with full handover docs and training. Ongoing care plans available to keep your site growing.",
    },
  ],

  // ── Marquee strip ───────────────────────────────
  marquee: [
    "Web Design",
    "Next.js",
    "Brand Strategy",
    "UI · UX",
    "React",
    "E-Commerce",
    "Shopify",
    "SEO",
    "Performance",
    "Landing Pages",
    "Web Applications",
    "Digital Identity",
    "TypeScript",
    "Motion Design",
    "Conversion Optimisation",
  ],

  // ── Affiliations / Logo strip ───────────────────
  affiliations: [
    {
      name: "Glion",
      subtitle: "Institute of Higher Education",
      url: "https://www.glion.edu/",
    },
    {
      name: "Jashita",
      subtitle: "Hotel & Luxury Villas",
      url: "https://www.jashitahotel.com",
    },
  ],

  // ── Testimonials (replace with real quotes) ─────
  testimonials: [
    {
      quote:
        "Alberto delivered a website that perfectly captures the essence of our brand. The attention to detail — from typography to performance — was exceptional from start to finish.",
      author: "Your Name Here",
      role: "Founder · Company Name",
    },
  ],

  // ── Work / Projects ─────────────────────────────
  projects: [
    {
      name: "Jashita Hotel & Luxury Villas",
      location: "Soliman Bay & Tulum, Mexico",
      description:
        "Complete digital transformation for a boutique luxury property — brand identity, custom web design, and AI-powered systems — delivering a fully immersive online presence that earns trust and converts from the first scroll.",
      role: "Web Design · Development · Brand Strategy",
      highlights: [
        "Custom Next.js website with cinematic visual design",
        "Performance score 98+ across all Core Web Vitals",
        "AI-powered personalisation and booking flow",
        "Full brand identity and digital communications suite",
      ],
      href: "https://www.jashitahotel.com",
    },
  ],

  // ── Education ───────────────────────────────────
  education: {
    school: "Glion Institute of Higher Education",
    degree: "Hospitality Administration, Business Management",
  },

  // ── Social / Contact ────────────────────────────
  social: [
    { label: "Email", href: "mailto:marchiorelloalberto20@gmail.com" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/alberto-marchiorello-0a944829b/",
    },
  ],
} as const;
