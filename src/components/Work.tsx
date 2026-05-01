
export function Work() {
  return (
    <section
      id="work"
      className="relative scroll-mt-20 border-t border-void-border px-6 py-24 sm:px-10 sm:py-32 overflow-hidden"
    >
      {/* Spinning 3D shape — right side, partially behind the last card */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/shape-3d.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute animate-spin-shape"
        style={{
          width: "clamp(420px, 45vw, 680px)",
          right: "clamp(-220px, -14vw, -120px)",
          top: "50%",
          transform: "translateY(-50%)",
          mixBlendMode: "multiply",
          opacity: 0.92,
          zIndex: 0,
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="reveal font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
          — Portfolio
        </p>
        <h2 className="reveal mt-4 font-display text-3xl font-light text-cream sm:text-5xl">
          Selected work
        </h2>

        {/* Project cards grid — cards sit above the shape via z-index */}
        <div className="relative mt-14 grid gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ zIndex: 1 }}>
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
