import type { Metadata } from "next";
import localFont from "next/font/local";
import { Syne, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Cursor } from "@/components/Cursor";
import { ScrollProgress } from "@/components/ScrollProgress";

const caMagicHour = localFont({
  src: [
    { path: "../../public/fonts/ca-magic-hour.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/ca-magic-hour.woff",  weight: "400", style: "normal" },
  ],
  variable: "--font-tolken",
  display: "swap",
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marchio.design"),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    title: site.name,
    description: site.tagline,
    siteName: site.name,
    locale: "en_GB",
    type: "website",
    url: "https://marchio.design",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} — ${site.role}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  worksFor: {
    "@type": "Organization",
    name: site.company,
    url: site.companyUrl,
  },
  alumniOf: {
    "@type": "Organization",
    name: site.education.school,
    url: "https://www.glion.edu/",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
    addressCountry: "GB",
  },
  email: "marchiorelloalberto20@gmail.com",
  sameAs: ["https://www.linkedin.com/in/alberto-marchiorello-0a944829b/"],
  url: "https://marchio.design",
  description: site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${caMagicHour.variable} ${syne.variable} ${inter.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
        {/* Skip link — visually hidden until focused, lets keyboard users jump past the fixed nav */}
        <a
          href="#top"
          className="fixed left-4 top-4 z-[9999] -translate-y-20 rounded-full bg-gold px-5 py-2 font-sans text-[13px] font-medium text-void opacity-0 transition-all focus:translate-y-0 focus:opacity-100"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
