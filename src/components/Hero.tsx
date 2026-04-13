import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      className="noise relative flex min-h-screen flex-col overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 15% 45%, rgba(196,151,90,0.06) 0%, transparent 55%), radial-gradient(ellipse at 85% 15%, rgba(80,60,200,0.04) 0%, transparent 55%), #080810",
      }}
    >
      {/* Ambient blobs */}
      <div
        className="ambient-blob pointer-events-none absolute left-[5%] top-[25%] h-[600px] w-[600px] rounded-full blur-[140px]"
        style={{ background: "rgba(196,151,90,0.04)" }}
        aria-hidden
      />
      <div
        className="ambient-blob-2 pointer-events-none absolute bottom-[5%] right-[10%] h-[500px] w-[500px] rounded-full blur-[120px]"
        style={{ background: "rgba(80,60,180,0.035)" }}
        aria-hidden
      />

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-dot-grid bg-[length:32px_32px]"
        aria-hidden
      />

      {/* Main content */}
      <div className="relative flex flex-1 flex-col justify-center mt-16">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
          {/* Top metadata bar */}
          <div className="hero-meta flex items-center justify-between border-b border-void-border pb-5 mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream-dim">
              Personal Brand · {new Date().getFullYear()}
            </span>
            <div className="flex items-center gap-3">
              {site.currently.active && (
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-border bg-emerald-subtle px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-emerald-light">
                  <span className="status-dot h-1.5 w-1.5 rounded-full bg-emerald-light" />
                  Available
                </span>
              )}
              <span className="hidden sm:block font-mono text-[10px] text-cream-dim">
                {site.location}
              </span>
            </div>
          </div>

          {/* Two-column: text + portrait */}
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
            {/* Left: text */}
            <div>
              <p className="hero-role mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
                Hospitality · AI · Blockchain · Marketing
              </p>

              <h1 className="font-display font-light leading-[0.88] tracking-[-0.01em] text-cream">
                <span className="hero-line-1 block text-[clamp(4.5rem,12vw,10rem)]">
                  Alberto
                </span>
                <span className="hero-line-2 block text-[clamp(4.5rem,12vw,10rem)]">
                  Marchiorello
                </span>
              </h1>

              <div className="hero-rule gold-rule my-8 w-20" />

              <div className="hero-tag space-y-1.5">
                <p className="font-sans text-base text-cream-muted sm:text-lg">
                  {site.role}
                </p>
                <p className="font-sans text-sm text-cream-dim">
                  <a
                    href={site.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-gold"
                  >
                    {site.company}
                  </a>
                  {" · Tulum, Mexico"}
                </p>
              </div>

              <p className="hero-tag mt-7 max-w-lg font-display text-xl italic leading-relaxed text-cream-muted sm:text-2xl">
                &ldquo;{site.hook}&rdquo;
              </p>

              <div className="hero-cta mt-10 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 font-sans text-[13px] font-medium text-void shadow-lg shadow-gold/20 transition-all duration-300 hover:bg-gold-light hover:shadow-gold/30"
                >
                  Connect with me
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-void-hover bg-void-surface px-7 py-3 font-sans text-[13px] text-cream-muted transition-all duration-300 hover:bg-void-elevated hover:text-cream"
                >
                  View work
                  <span aria-hidden className="text-gold">↓</span>
                </a>
              </div>
            </div>

            {/* Right: portrait frame */}
            <div className="hero-side hidden lg:block shrink-0">
              <div className="relative w-[230px] xl:w-[270px] aspect-[3/4] -rotate-[1.5deg] group">
                <div className="absolute inset-0 rounded-lg border border-gold/15 bg-void-surface overflow-hidden transition-transform duration-700 group-hover:rotate-[1.5deg]">
                  {/* Corner marks */}
                  <div className="absolute top-5 left-5 pointer-events-none">
                    <div className="w-px h-7 bg-gold/35" />
                    <div className="w-7 h-px bg-gold/35 -mt-px" />
                  </div>
                  <div className="absolute top-5 right-5 flex flex-col items-end pointer-events-none">
                    <div className="w-7 h-px bg-gold/35" />
                    <div className="ml-auto w-px h-7 bg-gold/35" />
                  </div>
                  <div className="absolute bottom-5 left-5 flex flex-col pointer-events-none">
                    <div className="w-7 h-px bg-gold/35" />
                    <div className="w-px h-7 bg-gold/35" />
                  </div>
                  <div className="absolute bottom-5 right-5 flex flex-col items-end pointer-events-none">
                    <div className="ml-auto w-px h-7 bg-gold/35" />
                    <div className="w-7 h-px bg-gold/35 -mt-px" />
                  </div>

                  {/* Initials placeholder */}
                  <div className="flex h-full flex-col items-center justify-center gap-5">
                    <span className="font-display text-[5.5rem] font-light leading-none text-gold/20">
                      AM
                    </span>
                    <div className="gold-rule w-10 opacity-40" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-cream-dim opacity-60">
                      Portrait
                    </span>
                  </div>
                </div>
                {/* Shadow glow */}
                <div className="absolute inset-0 rounded-lg blur-xl -z-10 opacity-20 bg-gold" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll relative mx-auto mb-10 flex w-full max-w-6xl justify-center px-6 sm:px-10">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-cream-dim">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-cream-dim to-transparent" />
        </div>
      </div>
    </section>
  );
}
