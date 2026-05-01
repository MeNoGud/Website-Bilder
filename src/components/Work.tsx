import { site } from "@/lib/site";

const IN_PROGRESS_COUNT = Math.max(0, 3 - site.projects.length);

export function Work() {
  return (
    <section
      id="work"
      className="scroll-mt-20 border-t border-void-border px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <p className="reveal section-label text-gold">
          — Portfolio
        </p>
        <h2 className="reveal mt-4 font-display text-3xl font-light text-cream sm:text-5xl">
          Selected work
        </h2>

        <div className="mt-14 flex flex-col gap-5 lg:gap-6">

          {/* ── Real project cards ─────────────────────── */}
          {site.projects.map((project) => {
            const roles = project.role.split(" · ");
            return (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group relative overflow-hidden rounded-2xl"
                style={{ minHeight: "clamp(320px, 45vw, 520px)" }}
                aria-label={`View ${project.name}`}
              >
                {/* Cover image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/jashita-cover.jpg"
                  alt={project.name}
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Gradient overlay — legible bottom text on any image */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(26,17,14,0.92) 0%, rgba(26,17,14,0.45) 45%, rgba(26,17,14,0.12) 100%)",
                  }}
                  aria-hidden
                />

                {/* Content */}
                <div className="relative flex h-full flex-col justify-between p-8 sm:p-10 lg:p-12"
                  style={{ minHeight: "clamp(320px, 45vw, 520px)" }}>

                  {/* Top row — location eyebrow */}
                  <div className="flex items-start justify-between">
                    <span className="section-label text-white/50">
                      {project.location}
                    </span>
                    <span
                      className="section-label text-white/40 transition-colors duration-300 group-hover:text-white/80"
                      aria-hidden
                    >
                      ↗
                    </span>
                  </div>

                  {/* Bottom content stack */}
                  <div>
                    {/* Project name */}
                    <h3 className="font-display font-light text-white leading-[1.0]"
                      style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}>
                      {project.name}
                    </h3>

                    {/* Role tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {roles.map((r) => (
                        <span
                          key={r}
                          className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-3 py-1 section-label text-white/55"
                        >
                          {r.trim()}
                        </span>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="gold-rule my-6 w-10" />

                    {/* Highlights */}
                    <ul className="flex flex-col gap-2">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3">
                          <span className="mt-[2px] text-[8px] text-gold" aria-hidden>✦</span>
                          <span className="font-sans text-[13px] leading-snug text-white/65">
                            {h}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* View link */}
                    <div className="mt-8 inline-flex items-center gap-2 border-b border-white/20 pb-0.5 section-label text-white/70 transition-all duration-300 group-hover:border-white/60 group-hover:text-white">
                      View project
                      <span aria-hidden>→</span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}

          {/* ── In-progress slots ─────────────────────── */}
          {IN_PROGRESS_COUNT > 0 && (
            <div className={`grid gap-5 lg:gap-6 ${IN_PROGRESS_COUNT === 1 ? "grid-cols-1" : "sm:grid-cols-2"}`}>
              {Array.from({ length: IN_PROGRESS_COUNT }).map((_, i) => (
                <div
                  key={i}
                  className="reveal relative overflow-hidden rounded-2xl border border-dashed border-void-border flex flex-col items-center justify-center min-h-[220px]"
                  style={{
                    background:
                      "radial-gradient(ellipse at 30% 60%, rgba(232,36,0,0.07) 0%, transparent 65%), #1A110E",
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 bg-dot-grid bg-[length:24px_24px] opacity-30"
                    aria-hidden
                  />
                  <div className="relative text-center px-8">
                    <p className="section-label text-cream-dim/30">
                      In progress
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
