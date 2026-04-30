import { MagneticButton } from "./MagneticButton";
import { RemarkableShine } from "./RemarkableShine";

export function CallToAction() {
  return (
    <section
      className="relative overflow-hidden border-t border-white/[0.06] px-6 py-28 sm:px-10 sm:py-40"
      style={{ background: "#1A110E" }}
    >
      {/* Subtle red glow from below */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full blur-[120px]"
        style={{ background: "rgba(232,36,0,0.10)" }}
        aria-hidden
      />

      {/* Slowly rotating large ✦ — wrapper centers, inner span rotates */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        <span
          className="animate-spin-slow block select-none font-display leading-none"
          style={{ fontSize: "clamp(18rem, 50vw, 42rem)", color: "rgba(244,238,228,0.03)" }}
        >
          ✦
        </span>
      </div>

      {/* Orbiting symbols */}
      <span
        className="animate-spin-reverse pointer-events-none absolute left-[12%] top-[15%] select-none text-4xl sm:text-6xl"
        style={{ color: "rgba(232,36,0,0.18)" }}
        aria-hidden
      >
        ✦
      </span>
      <span
        className="animate-float pointer-events-none absolute right-[10%] bottom-[20%] select-none text-3xl sm:text-5xl"
        style={{ animationDelay: "3s", color: "rgba(244,238,228,0.08)" }}
        aria-hidden
      >
        ◆
      </span>
      <span
        className="animate-float pointer-events-none absolute left-[20%] bottom-[15%] select-none text-xl sm:text-3xl"
        style={{ animationDelay: "1.5s", color: "rgba(232,36,0,0.10)" }}
        aria-hidden
      >
        ✦
      </span>

      <div className="relative mx-auto max-w-5xl text-center">
        <p className="reveal font-mono text-[10px] uppercase tracking-[0.32em] text-gold mb-10">
          — Start a project
        </p>

        <h2
          className="reveal-clip font-display font-light italic leading-[0.88]"
          style={{ fontSize: "clamp(3.2rem, 9vw, 8.5rem)", color: "#F4EEE4" }}
        >
          Ready to build
          <br />
          something
          <br />
          <RemarkableShine />
        </h2>

        <div className="reveal gold-rule mx-auto mt-10 w-16" />

        <p
          className="reveal mx-auto mt-8 max-w-md font-sans text-base leading-relaxed"
          style={{ color: "rgba(244,238,228,0.55)" }}
        >
          A 30-minute call is all it takes. No hard sell — just an honest conversation about your project, your goals, and what&apos;s possible.
        </p>

        {/* Price guarantee */}
        <div
          className="reveal mx-auto mt-10 max-w-2xl rounded-2xl px-8 py-6"
          style={{ border: "1px solid rgba(232,36,0,0.3)", background: "rgba(232,36,0,0.06)" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold/70 mb-3">
            ✦ Price guarantee
          </p>
          <p
            className="font-display font-semibold leading-tight"
            style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)", color: "#F4EEE4" }}
          >
            I&apos;ll beat any comparable European agency quote.
          </p>
          <p className="mt-3 font-sans text-sm" style={{ color: "rgba(244,238,228,0.45)" }}>
            Same quality. Faster delivery. Direct communication — no account managers, no markup.
          </p>
        </div>

        <div className="reveal mt-10 flex justify-center">
          <MagneticButton>
            <a
              href="/consultation"
              className="inline-flex items-center gap-3 rounded-full bg-gold px-10 py-4 font-sans text-[14px] font-semibold text-void shadow-xl shadow-gold/30 transition-all duration-300 hover:bg-gold-light hover:shadow-gold/50 hover:gap-4"
            >
              Book your free consultation
              <span aria-hidden>→</span>
            </a>
          </MagneticButton>
        </div>

        <p
          className="reveal mt-10 font-mono text-[10px] uppercase tracking-[0.22em] opacity-40"
          style={{ color: "#F4EEE4" }}
        >
          Typically responds within 24 hours · Based in London, working across Europe
        </p>
      </div>
    </section>
  );
}
