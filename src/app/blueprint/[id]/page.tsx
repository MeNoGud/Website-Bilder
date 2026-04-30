import type { Metadata } from "next";
import { list } from "@vercel/blob";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import type { BlueprintJSON } from "@/lib/blueprint-generator";

/* ── Secret guard ─────────────────────────────────────────── */

function isAuthorised(secret: string | undefined): boolean {
  const expected = process.env.BLUEPRINT_SECRET;
  if (!expected) return false;
  return secret === expected;
}

/* ── Data fetching ────────────────────────────────────────── */

async function getBlueprint(id: string): Promise<(BlueprintJSON & { repoUrl?: string; blueprintId?: string }) | null> {
  try {
    const { blobs } = await list({ prefix: `blueprints/${id}` });
    const blob = blobs.find((b) => b.pathname === `blueprints/${id}.json`);
    if (!blob) return null;

    const res = await fetch(blob.url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

/* ── Metadata ─────────────────────────────────────────────── */

export async function generateMetadata(
  { params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ s?: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const { s } = await searchParams;
  if (!isAuthorised(s)) return { title: "Marchio Studio" };
  const bp = await getBlueprint(id);
  if (!bp) return { title: "Blueprint Not Found" };
  return {
    title: `Blueprint — ${bp.businessName}`,
    description: bp.siteConfig.tagline,
  };
}

/* ── Color swatch ─────────────────────────────────────────── */

function ColorSwatch({ label, hex }: { label: string; hex: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="h-8 w-8 rounded-lg border border-black/10 flex-shrink-0"
        style={{ background: hex }}
      />
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-cream-dim">{label}</p>
        <p className="font-mono text-xs text-cream">{hex}</p>
      </div>
    </div>
  );
}

/* ── Site type badge ──────────────────────────────────────── */

const SITE_TYPE_LABELS: Record<string, string> = {
  brochure:   "Brochure Site",
  ecommerce:  "E-Commerce",
  portfolio:  "Portfolio",
  services:   "Services Business",
  restaurant: "Restaurant / Hospitality",
  saas:       "SaaS / Startup",
};

/* ── Page ─────────────────────────────────────────────────── */

export default async function BlueprintPage(
  { params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ s?: string }> }
) {
  const { id } = await params;
  const { s } = await searchParams;

  if (!isAuthorised(s)) redirect("/");

  const bp = await getBlueprint(id);
  if (!bp) notFound();

  const siteTypeLabel = SITE_TYPE_LABELS[bp.siteType] ?? bp.siteType;

  return (
    <div className="min-h-screen bg-void">

      {/* Header */}
      <header className="border-b border-void-border bg-void/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-10">
          <Link href="https://marchio.design" className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream-dim hover:text-gold transition-colors">
            Marchio Studio
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-border bg-emerald-subtle px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-emerald-light">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-light animate-pulse" />
            Blueprint ready
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 sm:px-10 py-16 sm:py-24">

        {/* Hero */}
        <div className="mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/[0.07] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
              {siteTypeLabel}
            </span>
            <span className="font-mono text-[10px] text-cream-dim">
              {bp.estimatedWeeks} week delivery
            </span>
          </div>

          <h1
            className="font-display font-light leading-tight text-cream mb-4"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}
          >
            {bp.businessName}
          </h1>

          <p className="font-sans text-lg leading-relaxed text-cream-muted max-w-2xl">
            {bp.siteConfig.tagline}
          </p>

          <div className="mt-6 h-px w-20 bg-gradient-to-r from-gold to-transparent" />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Main — site map */}
          <div className="lg:col-span-2 space-y-8">

            {/* Site map */}
            <section>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-5">
                — Site map
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {bp.pages.map((page) => (
                  <div
                    key={page.route}
                    className="rounded-xl border border-void-border bg-void-surface p-5 hover:bg-void-elevated transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-sans text-[13px] font-medium text-cream">{page.name}</p>
                        <p className="font-mono text-[10px] text-cream-dim mt-0.5">{page.route}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {page.sections.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center rounded-full border border-void-hover px-2.5 py-0.5 font-mono text-[9px] text-cream-dim"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    {page.notes && (
                      <p className="mt-3 font-sans text-[11px] text-cream-dim leading-relaxed italic">
                        {page.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Features */}
            {bp.features.length > 0 && (
              <section>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-5">
                  — Features included
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {bp.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 rounded-lg border border-void-border bg-void-surface px-4 py-3">
                      <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="M2 6l3 3 5-5" stroke="#E82400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="font-sans text-[13px] text-cream-muted">{f}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Services */}
            {bp.siteConfig.services.length > 0 && (
              <section>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-5">
                  — Services / offerings
                </p>
                <div className="space-y-3">
                  {bp.siteConfig.services.map((s, i) => (
                    <div key={i} className="rounded-xl border border-void-border bg-void-surface px-5 py-4">
                      <p className="font-sans text-[13px] font-medium text-cream">{s.title}</p>
                      <p className="mt-1 font-sans text-[12px] text-cream-muted leading-relaxed">{s.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Sidebar — design + tech */}
          <div className="space-y-6">

            {/* Brand colors */}
            <div className="rounded-xl border border-void-border bg-void-surface p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-5">Brand colors</p>
              <div className="space-y-3">
                <ColorSwatch label="Primary"    hex={bp.brandColors.primary} />
                <ColorSwatch label="Secondary"  hex={bp.brandColors.secondary} />
                <ColorSwatch label="Accent"     hex={bp.brandColors.accent} />
                <ColorSwatch label="Background" hex={bp.brandColors.background} />
                <ColorSwatch label="Text"       hex={bp.brandColors.text} />
              </div>
            </div>

            {/* Typography */}
            <div className="rounded-xl border border-void-border bg-void-surface p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-5">Typography</p>
              <div className="space-y-3">
                <div>
                  <p className="font-mono text-[10px] text-cream-dim uppercase tracking-[0.1em]">Display / Headings</p>
                  <p className="mt-1 font-sans text-sm text-cream">{bp.typography.display.replace(/_/g, " ")}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-cream-dim uppercase tracking-[0.1em]">Body</p>
                  <p className="mt-1 font-sans text-sm text-cream">{bp.typography.body.replace(/_/g, " ")}</p>
                </div>
              </div>
            </div>

            {/* Tech stack */}
            <div className="rounded-xl border border-void-border bg-void-surface p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-5">Tech stack</p>
              <div className="flex flex-wrap gap-2">
                {bp.technicalStack.map((t) => (
                  <span key={t} className="inline-flex items-center rounded-full border border-void-border px-3 py-1 font-mono text-[10px] text-cream-dim">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Design direction */}
            <div className="rounded-xl border border-void-border bg-void-surface p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-4">Design direction</p>
              <p className="font-sans text-[12px] text-cream-muted leading-relaxed">{bp.designNotes}</p>
            </div>

            {/* E-commerce details */}
            {bp.ecommerce && (
              <div className="rounded-xl border border-gold/20 bg-gold/[0.05] p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-5">E-Commerce</p>
                <div className="space-y-2">
                  {Object.entries(bp.ecommerce).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="font-mono text-[10px] text-cream-dim capitalize">{k}</span>
                      <span className="font-sans text-[12px] text-cream">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Next steps */}
        <div className="mt-16 rounded-2xl border border-void-border bg-void-surface p-8 sm:p-10 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-4">— What happens next</p>
          <h2 className="font-display text-2xl font-light text-cream mb-6 sm:text-3xl">
            Your project is in good hands.
          </h2>
          <div className="grid gap-4 sm:grid-cols-3 mb-8 text-left">
            {[
              { step: "01", title: "Discovery call", desc: "We'll discuss this blueprint together and align on every detail." },
              { step: "02", title: "Design & build", desc: "Production begins. You review at every milestone." },
              { step: "03", title: "Launch", desc: "Your site goes live. Full handover with ongoing support available." },
            ].map((s) => (
              <div key={s.step} className="rounded-xl border border-void-border bg-void p-5">
                <p className="font-mono text-[10px] text-gold mb-2">{s.step}</p>
                <p className="font-sans text-sm font-medium text-cream mb-1">{s.title}</p>
                <p className="font-sans text-[12px] text-cream-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <a
            href="mailto:studio@marchio.design"
            className="inline-flex items-center gap-2 rounded-full border border-void-border px-8 py-3 font-sans text-[13px] text-cream-muted transition-all hover:border-gold hover:text-gold"
          >
            Questions? Get in touch →
          </a>
        </div>

      </main>

      <footer className="border-t border-void-border mt-16 py-8">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 flex items-center justify-between">
          <p className="font-mono text-[10px] text-cream-dim uppercase tracking-[0.2em]">
            Marchio Studio · marchio.design
          </p>
          <p className="font-mono text-[10px] text-cream-dim">
            Blueprint ID: {id}
          </p>
        </div>
      </footer>

    </div>
  );
}
