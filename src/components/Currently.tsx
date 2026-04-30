import { site } from "@/lib/site";

export function Currently() {
  return (
    <section className="border-t border-void-border px-6 py-20 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="reveal grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20 items-start">
          {/* Left label */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              — Currently
            </p>
            <h2 className="mt-4 font-display text-3xl font-light text-cream sm:text-4xl leading-[1.1]">
              Available for<br />
              <span className="italic text-cream-muted">new projects.</span>
            </h2>
            <p className="mt-6 font-sans text-sm leading-relaxed text-cream-muted max-w-xs">
              Ready to take on the right project. Let&apos;s make it yours.
            </p>
          </div>

          {/* Right: status card */}
          <div className="rounded-2xl border border-void-border bg-void-surface p-8">
            {/* Active status */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="status-dot h-2.5 w-2.5 rounded-full bg-emerald-light shrink-0"
                aria-label="Active"
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-light">
                Taking on new work
              </span>
            </div>

            <p className="font-sans text-base leading-relaxed text-cream-muted">
              {site.currently.status}
            </p>

            {/* Divider */}
            <div className="my-6 border-t border-void-border" />

            {/* Open to */}
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream-dim mb-4">
              Open to
            </p>
            <div className="flex flex-wrap gap-2">
              {site.currently.openTo.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-gold-border bg-gold-faint px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-gold"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <a
                href="#consultation"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 font-sans text-[13px] font-medium text-void transition-all duration-300 hover:bg-gold-light"
              >
                Book a free consultation
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
