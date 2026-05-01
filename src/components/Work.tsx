
export function Work() {
  return (
    <section
      id="work"
      className="scroll-mt-20 border-t border-void-border px-6 py-24 sm:px-10 sm:py-32"
      style={{
        backgroundImage: "url('/wave-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <p className="reveal font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">
          — Portfolio
        </p>
        <h2 className="reveal mt-4 font-display text-3xl font-light text-white sm:text-5xl">
          Selected work
        </h2>

        {/* Project cards grid */}
        <div className="mt-14 grid gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="reveal relative overflow-hidden rounded-2xl border border-dashed border-void-border flex items-center justify-center min-h-[280px] lg:min-h-[420px]"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 60%, rgba(232,36,0,0.10) 0%, transparent 65%), #1A110E",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 bg-dot-grid bg-[length:24px_24px] lg:bg-[length:28px_28px] opacity-40"
                aria-hidden
              />
              <div className="relative text-center px-8">
                <span className="font-display text-4xl lg:text-6xl text-gold/20" aria-hidden>✦</span>
                <p className="mt-4 font-mono text-[10px] lg:text-[11px] uppercase tracking-[0.28em] text-cream-dim/40">
                  Coming soon
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
