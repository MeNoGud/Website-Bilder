export function CallToAction() {
  return (
    <section
      className="relative overflow-hidden border-t border-void-border px-6 py-28 sm:px-10 sm:py-40"
      style={{
        background:
          "radial-gradient(ellipse at 50% 110%, rgba(232,36,0,0.07) 0%, transparent 55%), #F4EEE4",
      }}
    >
      {/* Slowly rotating large ✦ — background decoration */}
      <span
        className="animate-spin-slow pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display leading-none text-gold/[0.06]"
        style={{ fontSize: "clamp(18rem, 50vw, 42rem)" }}
        aria-hidden
      >
        ✦
      </span>

      {/* Smaller orbiting ✦ symbols */}
      <span
        className="animate-spin-reverse pointer-events-none absolute left-[12%] top-[15%] select-none text-4xl text-gold/20 sm:text-6xl"
        aria-hidden
      >
        ✦
      </span>
      <span
        className="animate-float pointer-events-none absolute right-[10%] bottom-[20%] select-none text-3xl text-gold/15 sm:text-5xl"
        style={{ animationDelay: "3s" }}
        aria-hidden
      >
        ◆
      </span>
      <span
        className="animate-float pointer-events-none absolute left-[20%] bottom-[15%] select-none text-xl text-gold/10 sm:text-3xl"
        style={{ animationDelay: "1.5s" }}
        aria-hidden
      >
        ✦
      </span>

      <div className="relative mx-auto max-w-5xl text-center">
        <p className="reveal font-mono text-[10px] uppercase tracking-[0.32em] text-gold mb-10">
          — Start a project
        </p>

        <h2
          className="reveal font-display font-light italic leading-[0.88] text-cream"
          style={{ fontSize: "clamp(3.2rem, 9vw, 8.5rem)" }}
        >
          Ready to build
          <br />
          something
          <br />
          <span className="text-gold not-italic">remarkable?</span>
        </h2>

        <div className="reveal gold-rule mx-auto mt-10 w-16" />

        <p className="reveal mx-auto mt-8 max-w-md font-sans text-base leading-relaxed text-cream-muted">
          A 30-minute call is all it takes. No hard sell — just an honest conversation about your project, your goals, and what&apos;s possible.
        </p>

          <div className="reveal mt-12 flex justify-center">
          <a
            href="/consultation"
            className="inline-flex items-center gap-3 rounded-full bg-gold px-10 py-4 font-sans text-[14px] font-semibold text-void shadow-xl shadow-gold/25 transition-all duration-300 hover:bg-gold-light hover:shadow-gold/40 hover:gap-4"
          >
            Book your free consultation
            <span aria-hidden>→</span>
          </a>
        </div>

        <p className="reveal mt-10 font-mono text-[10px] uppercase tracking-[0.22em] text-cream-dim opacity-60">
          Typically responds within 24 hours · Based in London, working globally
        </p>
      </div>
    </section>
  );
}
