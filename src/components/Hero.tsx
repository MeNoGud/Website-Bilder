import { site } from "@/lib/site";
import { HeroAnimation } from "./HeroAnimation";
import { HeroEffect } from "./HeroEffect";
import { HeroName } from "./HeroName";

export function Hero() {
  return (
    <div className="hero-pin-spacer relative min-h-[220vh]">
      <section
        id="hero"
        className="noise sticky top-0 z-10 flex min-h-screen flex-col overflow-hidden"
        style={{ background: "#080808" }}
      >
        {/* Floating decorative symbols */}
        <span
          className="hero-float-decor animate-float pointer-events-none absolute left-[6%] bottom-[28%] select-none font-display text-3xl text-gold/15 sm:text-5xl"
          style={{ animationDelay: "2s" }}
          aria-hidden
        >
          ◆
        </span>
        <span
          className="hero-float-decor animate-float pointer-events-none absolute right-[20%] bottom-[18%] select-none font-display text-2xl text-gold/10 sm:text-4xl"
          style={{ animationDelay: "4s" }}
          aria-hidden
        >
          ✦
        </span>

        {/* Main content */}
        <div
          className="relative flex flex-1 flex-col"
          style={{ paddingTop: "clamp(4rem,8vw,7rem)", paddingBottom: "clamp(3rem,6vw,8rem)" }}
        >
          <div className="mx-auto w-full max-w-6xl flex-1 px-6 sm:px-10">
            {/* Status bar */}
            <div
              className="hero-meta flex items-center justify-between"
              style={{ marginBottom: "clamp(4rem,8vw,7rem)" }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold">
                Web Design Studio · {new Date().getFullYear()}
              </span>
              <div className="flex items-center gap-3">
                {site.currently.active && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-green-400">
                    <span className="status-dot h-1.5 w-1.5 rounded-full bg-green-400" />
                    Taking projects
                  </span>
                )}
                <span className="hidden sm:block font-mono text-[10px] text-white/35">
                  {site.location}
                </span>
              </div>
            </div>

            <HeroName />

            <div
              className="hero-tag text-center"
              style={{ marginTop: "clamp(1.5rem, 14vw, 14vw)" }}
            >
              <p
                className="font-tolken mx-auto max-w-2xl uppercase leading-relaxed tracking-[0.06em] text-white/70"
                style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.85rem)" }}
              >
                {site.positioning.replace(/\.$/, "")} — {site.hook}
              </p>
            </div>
          </div>
        </div>
        <HeroAnimation />
        <HeroEffect />
      </section>
    </div>
  );
}
