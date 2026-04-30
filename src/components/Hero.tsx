import { site } from "@/lib/site";
import { HeroName } from "./HeroName";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  return (
    <section
      id="top"
      className="noise relative flex flex-col overflow-hidden"
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
      <div className="relative flex flex-col pt-28 pb-24 sm:pb-32">
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
          <div className="hero-rule gold-rule-hero mt-8 mb-6 w-full max-w-xs" />

          <div className="hero-tag flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md font-sans text-base leading-relaxed text-cream-muted sm:text-[17px]">
              {site.positioning}
            </p>
            <p className="font-display text-lg italic text-cream-dim sm:text-xl sm:text-right max-w-xs">
              &ldquo;{site.hook}&rdquo;
            </p>
          </div>

          {/* CTA */}
          <div className="hero-cta mt-10 flex justify-center">
            <MagneticButton>
              <a
                href="#work"
                className="group relative flex items-center justify-center font-sans text-[12px] tracking-[0.12em] uppercase text-[#F4EEE4]/70 transition-colors duration-300 hover:text-[#F4EEE4]"
                style={{ width: "130px", height: "95px" }}
              >
                {/* Gem outline */}
                <svg
                  className="pointer-events-none absolute inset-0 w-full h-full"
                  viewBox="0 0 130 95"
                  fill="none"
                  aria-hidden
                >
                  <defs>
                    <radialGradient id="gemFill" cx="35%" cy="65%" r="70%">
                      <stop offset="0%"   stopColor="#E82400" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#1A110E" stopOpacity="1" />
                    </radialGradient>
                    <radialGradient id="gemHover" cx="35%" cy="65%" r="70%">
                      <stop offset="0%"   stopColor="#E82400" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#1A110E" stopOpacity="1" />
                    </radialGradient>
                  </defs>
                  <polygon
                    points="24,2 106,2 128,37 65,93 2,37"
                    className="transition-all duration-300 [stroke-width:1.5]
                      stroke-[rgba(232,36,0,0.3)]
                      group-hover:stroke-[rgba(232,36,0,0.7)]"
                    fill="url(#gemFill)"
                  />
                  {/* Hover overlay */}
                  <polygon
                    points="24,2 106,2 128,37 65,93 2,37"
                    fill="url(#gemHover)"
                    className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </svg>
                <span className="relative">View work</span>
              </a>
            </MagneticButton>
          </div>
        </div>

      </div>
    </section>
  );
}
