import { site } from "@/lib/site";
import { HeroAnimation } from "./HeroAnimation";
import { HeroFixedWatermark } from "./HeroFixedWatermark";
import { HeroName } from "./HeroName";
import { HeroScrollSlew } from "./HeroScrollSlew";

export function Hero() {
  return (
    <div
      id="hero"
      className="noise relative min-h-[210vh]"
      style={{ background: "#080808" }}
    >
      <HeroFixedWatermark />

      <section className="relative z-10 flex min-h-screen flex-col overflow-visible">
        <HeroScrollSlew>
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

          <div className="relative grid min-h-screen w-full grid-rows-[1fr_auto_1fr]">
            {/* Top flex row so “Marchio” sits on the viewport midpoint (same Y as fixed watermark) */}
            <div className="col-span-full row-start-1 min-h-0 select-none" aria-hidden />

            <div className="col-span-full row-start-2 mx-auto flex w-full max-w-6xl flex-col px-6 sm:px-10">
              <HeroName />
            </div>

            <div
              className="hero-tag col-span-full row-start-3 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-[clamp(3rem,6vw,8rem)] pt-[calc(clamp(4.25rem,13vw,6.75rem)+30px)] text-center sm:px-10 lg:pt-[calc(clamp(4.25rem,13vw,6.75rem)+70px)]"
            >
              <p
                className="hero-tag-lines font-tolken mx-auto max-w-[min(94vw,32rem)] text-balance uppercase leading-snug tracking-[0.06em] text-white/70 sm:max-w-[36rem]"
                style={{ fontSize: "clamp(0.72rem, 1.45vw, 0.82rem)" }}
              >
                <span className="hero-tag-line block">{site.hook}</span>
              </p>
            </div>

            <div
              className="pointer-events-none absolute left-0 right-0 top-0 z-[11] px-6 sm:px-10"
              style={{ paddingTop: "clamp(4rem,8vw,7rem)" }}
            >
              <div className="pointer-events-auto mx-auto flex w-full max-w-6xl items-center justify-between hero-meta">
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
            </div>
          </div>
        </HeroScrollSlew>
      </section>

      <HeroAnimation />
    </div>
  );
}
