import { site } from "@/lib/site";
import { HeroName } from "./HeroName";

export function Hero() {
  return (
    <section
      id="top"
      className="noise relative flex min-h-screen flex-col overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 20% 50%, rgba(232,36,0,0.05) 0%, transparent 50%), radial-gradient(ellipse at 85% 15%, rgba(245,162,0,0.04) 0%, transparent 50%), #F4EEE4",
      }}
    >
      {/* Ambient blobs */}
      <div
        className="ambient-blob pointer-events-none absolute left-[2%] top-[30%] h-[700px] w-[700px] rounded-full blur-[160px]"
        style={{ background: "rgba(232,36,0,0.04)" }}
        aria-hidden
      />
      <div
        className="ambient-blob-2 pointer-events-none absolute bottom-[0%] right-[5%] h-[500px] w-[500px] rounded-full blur-[130px]"
        style={{ background: "rgba(100,60,40,0.04)" }}
        aria-hidden
      />

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-dot-grid bg-[length:32px_32px] opacity-60"
        aria-hidden
      />

      {/* Floating decorative symbols */}
      <span
        className="animate-float pointer-events-none absolute left-[6%] bottom-[28%] select-none font-display text-3xl text-gold/15 sm:text-5xl"
        style={{ animationDelay: "2s" }}
        aria-hidden
      >
        ◆
      </span>
      <span
        className="animate-float pointer-events-none absolute right-[20%] bottom-[18%] select-none font-display text-2xl text-gold/10 sm:text-4xl"
        style={{ animationDelay: "4s" }}
        aria-hidden
      >
        ✦
      </span>

      {/* Main content */}
      <div className="relative flex flex-1 flex-col justify-between pt-28 pb-0">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">

          {/* Status bar */}
          <div className="hero-meta flex items-center justify-between mb-10 lg:mb-14">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-cream-dim">
              Web Design Studio · {new Date().getFullYear()}
            </span>
            <div className="flex items-center gap-3">
              {site.currently.active && (
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-border bg-emerald-subtle px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-emerald-light">
                  <span className="status-dot h-1.5 w-1.5 rounded-full bg-emerald-light" />
                  Taking projects
                </span>
              )}
              <span className="hidden sm:block font-mono text-[10px] text-cream-dim">
                {site.location}
              </span>
            </div>
          </div>

          {/* Parallax name */}
          <HeroName />

          {/* Rule + tagline */}
          <div className="hero-rule gold-rule mt-8 mb-6 w-full max-w-[200px]" />

          <div className="hero-tag flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md font-sans text-base leading-relaxed text-cream-muted sm:text-[17px]">
              {site.positioning}
            </p>
            <p className="font-display text-lg italic text-cream-dim sm:text-xl sm:text-right max-w-xs">
              &ldquo;{site.hook}&rdquo;
            </p>
          </div>

          {/* CTA */}
          <div className="hero-cta mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full border border-void-hover bg-transparent px-8 py-3.5 font-sans text-[13px] text-cream-muted transition-all duration-300 hover:bg-void-surface hover:text-cream"
            >
              View work
              <span aria-hidden className="text-gold">↓</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
