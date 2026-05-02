import Image from "next/image";
import { site } from "@/lib/site";
import { HeroAnimation } from "./HeroAnimation";

export function Hero() {
  const project = site.projects[0];

  return (
    <section
      id="top"
      className="noise relative overflow-hidden bg-void lg:min-h-screen"
    >
      {/* Dot-grid texture — tighter, lower opacity than before */}
      <div
        className="pointer-events-none absolute inset-0 bg-dot-grid bg-[length:28px_28px] opacity-[0.35]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <div className="grid items-center gap-10 py-24 sm:py-28 lg:grid-cols-12 lg:gap-8 lg:min-h-screen">

          {/* ── Left: text column (cols 1–6) ───────────────────── */}
          <div className="flex flex-col gap-6 lg:col-span-6 lg:py-28">

            {/* Eyebrow row — availability pill + label */}
            <div className="hero-eyebrow flex items-center gap-3">
              {site.currently.active && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-green-400">
                  <span className="status-dot h-1 w-1 rounded-full bg-green-400" />
                  Available
                </span>
              )}
              <span className="section-label text-cream-dim">
                Independent brand &amp; web designer
              </span>
            </div>

            {/* H1 — each line wrapped in overflow-hidden for yPercent reveal */}
            <h1
              className="font-display font-light text-cream"
              style={{ fontSize: "clamp(2.4rem, 4.2vw, 4.2rem)", lineHeight: 1.05 }}
            >
              <span className="block overflow-hidden">
                <span className="hero-h1-line block">Premium websites</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-h1-line block">with clarity, character,</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-h1-line block">and momentum.</span>
              </span>
            </h1>

            {/* Supporting paragraph */}
            <p className="hero-paragraph font-sans text-[15px] leading-[1.75] text-cream-muted max-w-[30rem]">
              I design and build custom websites for brands, founders, and
              businesses that need a stronger digital presence and a more
              credible first impression.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="hero-cta-item group inline-flex items-center gap-2.5 rounded-full bg-gold px-6 py-3 font-sans text-[13px] font-medium text-void transition-all duration-300 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(232,36,0,0.28)]"
              >
                View selected work
                <span
                  className="inline-block transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                >
                  →
                </span>
              </a>
              <a
                href="/consultation"
                className="hero-cta-item inline-flex items-center rounded-full border border-void-hover px-6 py-3 font-sans text-[13px] text-cream-muted transition-all duration-300 hover:border-cream-dim hover:text-cream"
              >
                Book a call
              </a>
            </div>

            {/* Trust line */}
            <p className="hero-trust section-label text-cream-dim">
              Based in London — working across Europe
            </p>

          </div>

          {/* ── Right: visual panel (cols 8–12, col 7 = gutter) ─── */}
          <a
            href={project?.href ?? "#work"}
            target={project?.href ? "_blank" : undefined}
            rel={project?.href ? "noopener noreferrer" : undefined}
            className="hero-visual-wrap group relative block overflow-hidden rounded-2xl
                       h-72 sm:h-96
                       lg:col-span-5 lg:col-start-8 lg:h-auto lg:self-stretch lg:min-h-[480px]"
            aria-label={`View project: ${project?.name ?? "Featured project"}`}
          >
            {/* Cover image — GSAP animates scale 1.06 → 1 then CSS hover takes over */}
            <Image
              src="/jashita-cover.jpg"
              alt={project?.name ?? "Featured project"}
              fill
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="hero-visual-img object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              priority
            />

            {/* Dark gradient — legible caption on any image */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(26,17,14,0.82) 0%, rgba(26,17,14,0.3) 40%, transparent 72%)",
              }}
              aria-hidden
            />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="section-label text-white/40 mb-2">Featured project</p>
              <p className="font-display font-light text-white leading-snug"
                style={{ fontSize: "clamp(1rem, 1.4vw, 1.15rem)" }}>
                {project?.name ?? "Jashita Hotel & Luxury Villas"}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="section-label text-white/35">
                  {project?.location ?? "Soliman Bay, Mexico"}
                </span>
                <span
                  className="section-label text-gold/60 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                >
                  ↗
                </span>
              </div>
            </div>
          </a>

        </div>
      </div>

      <HeroAnimation />
    </section>
  );
}
