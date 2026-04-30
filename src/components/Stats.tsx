export function Stats() {
  return (
    <div className="border-b border-t border-void-border bg-void-surface">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex flex-col items-center justify-center gap-8 py-20 text-center sm:py-28 lg:flex-row lg:items-center lg:justify-between lg:text-left lg:gap-16">

          {/* Main promise */}
          <div className="flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold mb-5">
              — The price promise
            </p>
            <h2
              className="font-display font-light text-cream leading-[1.0]"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
            >
              I will beat any competitor&apos;s quote —{" "}
              <em className="not-italic text-gold">guaranteed.</em>
            </h2>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px self-stretch bg-void-border" aria-hidden />

          {/* Supporting copy + micro-details */}
          <div className="flex-1 max-w-md">
            <p className="font-sans text-base leading-relaxed text-cream-muted mb-8">
              Show me any written quote from another agency or freelancer and I will
              deliver the same scope — better design, faster delivery — for less.
              No hidden fees, no bait-and-switch.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-6 lg:flex-col lg:gap-3">
              {[
                "Better design than the competition",
                "Faster delivery, every time",
                "Full transparency on pricing",
              ].map((point) => (
                <span
                  key={point}
                  className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-cream-dim"
                >
                  <span className="text-gold text-base leading-none" aria-hidden>✦</span>
                  {point}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
