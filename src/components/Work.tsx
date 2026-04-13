import Link from "next/link";
import { site } from "@/lib/site";

export function Work() {
  return (
    <section
      id="work"
      className="scroll-mt-20 border-t border-void-border px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Label */}
        <p className="reveal font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
          — Work
        </p>
        <h2 className="reveal mt-4 font-display text-3xl font-light text-cream sm:text-4xl">
          Selected work
        </h2>

        {/* Featured project */}
        {site.projects.map((project) => (
          <div
            key={project.name}
            className="reveal mt-14 grid overflow-hidden rounded-2xl border border-void-border lg:grid-cols-[1fr_1.1fr]"
          >
            {/* Left: ambient panel */}
            <div
              className="relative flex min-h-[220px] flex-col justify-between p-10"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 60%, rgba(196,151,90,0.08) 0%, transparent 65%), #0D0D1C",
              }}
            >
              {/* Decorative grid */}
              <div
                className="pointer-events-none absolute inset-0 bg-dot-grid bg-[length:24px_24px] opacity-60"
                aria-hidden
              />

              {/* Property name */}
              <div className="relative">
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
                  Featured Project
                </span>
                <h3 className="mt-4 font-display text-3xl font-light leading-[1.1] text-cream sm:text-4xl">
                  {project.name}
                </h3>
                <p className="mt-2 font-mono text-[11px] tracking-wide text-cream-dim">
                  {project.location}
                </p>
              </div>

              {/* Link */}
              <div className="relative mt-8">
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 font-sans text-[13px] text-cream-muted transition-colors hover:text-gold"
                >
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 group-hover:after:w-full">
                    Visit property
                  </span>
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Right: details */}
            <div className="border-t border-void-border bg-void p-10 lg:border-l lg:border-t-0">
              {/* Role */}
              <div className="mb-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                  My role
                </span>
                <p className="mt-2 font-sans text-[13px] leading-relaxed text-cream-muted">
                  {project.role}
                </p>
              </div>

              {/* Description */}
              <div className="mb-8 border-t border-void-border pt-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                  About
                </span>
                <p className="mt-2 font-sans text-[13px] leading-[1.75] text-cream-muted">
                  {project.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="border-t border-void-border pt-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                  Key contributions
                </span>
                <ul className="mt-4 space-y-3">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 font-sans text-[13px] text-cream-muted"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {/* Placeholder note */}
        <p className="reveal mt-8 text-center font-mono text-[11px] text-cream-dim">
          More projects coming soon
        </p>
      </div>
    </section>
  );
}
