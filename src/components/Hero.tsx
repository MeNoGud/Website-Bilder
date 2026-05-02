import { site } from "@/lib/site";
import { HeroAnimation } from "./HeroAnimation";
import { HeroName } from "./HeroName";
import { HeroScrollExit } from "./HeroScrollExit";

export function Hero() {
  return (
    <section
      id="top"
      className="hero-section noise relative flex flex-col overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 20% 50%, rgba(232,36,0,0.13) 0%, transparent 50%), radial-gradient(ellipse at 85% 15%, rgba(180,80,0,0.08) 0%, transparent 50%), #080808",
      }}
    >
      {/* Ambient blobs */}
      <div
        className="ambient-blob pointer-events-none absolute left-[2%] top-[30%] h-[700px] w-[700px]"
        style={{ background: "radial-gradient(circle, rgba(232,36,0,0.14) 0%, transparent 65%)" }}
        aria-hidden
      />
      <div
        className="ambient-blob-2 pointer-events-none absolute bottom-[0%] right-[5%] h-[500px] w-[500px]"
        style={{ background: "radial-gradient(circle, rgba(140,60,20,0.10) 0%, transparent 65%)" }}
        aria-hidden
      />

      {/* Dot grid — light variant for dark background */}
      <div
        className="pointer-events-none absolute inset-0 bg-dot-grid-light bg-[length:32px_32px] opacity-100"
        aria-hidden
      />

      {/* Floating decorative symbols */}
      <span
        className="hero-deco animate-float pointer-events-none absolute left-[6%] bottom-[28%] select-none font-display text-3xl text-gold/20 sm:text-5xl"
        style={{ animationDelay: "2s" }}
        aria-hidden
      >
        ◆
      </span>
      <span
        className="hero-deco animate-float pointer-events-none absolute right-[20%] bottom-[18%] select-none font-display text-2xl text-gold/15 sm:text-4xl"
        style={{ animationDelay: "4s" }}
        aria-hidden
      >
        ✦
      </span>

      {/* Main content */}
      <div className="relative flex flex-col" style={{ paddingTop: "clamp(4rem,8vw,7rem)", paddingBottom: "clamp(3rem,6vw,8rem)" }}>
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">

          {/* Status bar */}
          <div className="hero-meta flex items-center justify-between" style={{ marginBottom: "clamp(4rem,8vw,7rem)" }}>
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

          {/* Parallax name */}
          <HeroName />

          <div className="hero-tag text-center" style={{ marginTop: "clamp(1.5rem, 14vw, 14vw)" }}>
            <p className="font-tolken leading-relaxed text-white/70 uppercase tracking-[0.06em] max-w-2xl mx-auto" style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.85rem)" }}>
              {site.positioning.replace(/\.$/, "")} — {site.hook}
            </p>
          </div>

          {/* CTA */}
          <div className="hero-cta mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-8 py-3.5 font-sans text-[13px] text-white/60 transition-all duration-300 hover:border-white/40 hover:text-white"
            >
              View work
              <span aria-hidden className="text-gold">↓</span>
            </a>
          </div>
        </div>

      </div>
      <HeroAnimation />
      <HeroScrollExit />
    </section>
  );
}
