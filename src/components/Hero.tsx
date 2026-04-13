import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      className="noise relative flex min-h-screen flex-col overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 18% 45%, rgba(196,151,90,0.05) 0%, transparent 55%), radial-gradient(ellipse at 82% 15%, rgba(100,80,200,0.04) 0%, transparent 55%), #080810",
      }}
    >
      {/* Ambient blobs */}
      <div
        className="ambient-blob pointer-events-none absolute left-[10%] top-[20%] h-[500px] w-[500px] rounded-full blur-[130px]"
        style={{ background: "rgba(196,151,90,0.04)" }}
        aria-hidden
      />
      <div
        className="ambient-blob-2 pointer-events-none absolute bottom-[10%] right-[5%] h-[400px] w-[400px] rounded-full blur-[110px]"
        style={{ background: "rgba(80,60,180,0.035)" }}
        aria-hidden
      />

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-dot-grid bg-[length:32px_32px] opacity-100"
        aria-hidden
      />

      {/* Top metadata bar */}
      <div className="hero-meta relative mx-auto mt-20 w-full max-w-6xl px-6 sm:px-10">
        <div className="flex items-center justify-between border-b border-void-border pb-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream-dim">
            Personal Brand
          </span>
          <span className="font-mono text-[10px] text-cream-dim">
            London · {new Date().getFullYear()}
          </span>
        </div>
      </div>

      {/* Main hero content */}
      <div className="relative flex flex-1 items-center">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_56px]">
            {/* Left: name + info */}
            <div>
              {/* Overline */}
              <p className="hero-role mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
                Hospitality · AI · Blockchain · Marketing
              </p>

              {/* Name */}
              <h1 className="font-display font-light leading-[0.88] tracking-[-0.01em] text-cream">
                <span className="hero-line-1 block text-[clamp(3.8rem,10.5vw,9rem)]">
                  Alberto
                </span>
                <span className="hero-line-2 block text-[clamp(3.8rem,10.5vw,9rem)]">
                  Marchiorello
                </span>
              </h1>

              {/* Gold rule */}
              <div className="hero-rule gold-rule my-8 w-20" />

              {/* Role + Company */}
              <div className="hero-tag space-y-1">
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
                  </a>{" "}
                  · Tulum, Mexico
                </p>
              </div>

              {/* Positioning */}
              <p className="hero-tag mt-6 max-w-lg font-display text-xl italic text-cream-muted sm:text-2xl leading-relaxed">
                &ldquo;{site.positioning}&rdquo;
              </p>

              {/* CTAs */}
              <div className="hero-cta mt-10 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-2.5 font-sans text-[13px] font-medium text-void shadow-lg shadow-gold/20 transition-all duration-300 hover:bg-gold-light hover:shadow-gold/30"
                >
                  Connect with me
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-void-hover bg-void-surface px-7 py-2.5 font-sans text-[13px] text-cream-muted transition-all duration-300 hover:border-void-hover hover:bg-void-elevated hover:text-cream"
                >
                  View work
                  <span aria-hidden className="text-gold">↓</span>
                </a>
              </div>
            </div>

            {/* Right: vertical decorative element */}
            <div className="hero-side hidden lg:flex flex-col items-center gap-3 pb-3">
              <div className="h-20 w-px bg-gradient-to-b from-transparent to-gold/40" />
              <span
                className="font-mono text-[9px] uppercase tracking-[0.35em] text-cream-dim"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Glion · London · Tulum
              </span>
              <div className="h-20 w-px bg-gradient-to-t from-transparent to-gold/40" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll relative mx-auto mb-10 flex w-full max-w-6xl justify-center px-6 sm:px-10">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-cream-dim">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-cream-dim to-transparent" />
        </div>
      </div>
    </section>
  );
}
