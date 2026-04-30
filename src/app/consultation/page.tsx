import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CalendlyEmbed } from "@/components/consultation/CalendlyEmbed";
import { IntakeForm } from "@/components/consultation/IntakeForm";

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description:
    "Schedule a free 30-minute consultation and share your project details. Alberto will review everything before the call.",
};

export default function ConsultationPage() {
  return (
    <div id="top" className="bg-void min-h-screen">
      <Header />

      <main>
        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-void-border">
          {/* Background blobs */}
          <div
            className="pointer-events-none absolute left-[-10%] top-[20%] h-[600px] w-[600px] opacity-40"
            style={{ background: "radial-gradient(circle, rgba(245,162,0,0.18) 0%, transparent 65%)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-[-5%] bottom-[-10%] h-[500px] w-[500px] opacity-30"
            style={{ background: "radial-gradient(circle, rgba(232,36,0,0.16) 0%, transparent 65%)" }}
            aria-hidden
          />

          <div className="relative mx-auto max-w-6xl px-6 sm:px-10 pt-36 pb-24">
            <div className="grid gap-16 lg:grid-cols-[1fr_auto] lg:items-end">

              {/* Left — text */}
              <div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-void-border bg-void-surface px-5 py-2.5 font-sans text-[13px] text-cream-muted transition-all duration-300 hover:border-gold hover:text-gold mb-10"
                >
                  <span aria-hidden>←</span> Back to portfolio
                </Link>

                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold mb-5">
                  — Free 30-minute consultation
                </p>

                <h1
                  className="font-display font-light text-cream leading-[0.88] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(3.2rem, 7vw, 6.5rem)" }}
                >
                  Let&apos;s build
                  <br />
                  something
                  <br />
                  <span className="italic text-gold">remarkable.</span>
                </h1>

                <div className="gold-rule mt-8 w-20" />

                <p className="mt-8 max-w-lg font-sans text-base leading-relaxed text-cream-muted">
                  Book a time below, then fill in the project brief. The more detail
                  you share, the faster and more accurate the build — your brief goes
                  straight into the process.
                </p>

                {/* Steps overview */}
                <div className="mt-10 flex flex-wrap gap-3">
                  {[
                    "01 — Pick a time",
                    "02 — Complete the brief",
                    "03 — We build your site",
                  ].map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center rounded-full border border-void-border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-cream-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — stat cards */}
              <div className="hidden lg:flex flex-col gap-3 min-w-[200px]">
                {[
                  { value: "30 min", label: "Discovery call" },
                  { value: "4 wks", label: "Avg. delivery" },
                  { value: "100%", label: "Satisfaction rate" },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-void-border bg-void-surface px-6 py-5 text-right"
                  >
                    <p className="font-display text-3xl font-light text-cream">{value}</p>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-cream-dim">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 01 Calendly ──────────────────────────────── */}
        <section className="border-b border-void-border bg-void">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 py-16">
            <div className="flex items-center gap-5 mb-10">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold font-mono text-[11px] font-bold text-void shrink-0">
                01
              </span>
              <div>
                <p className="font-display text-xl font-light text-cream">Choose a date & time</p>
                <p className="font-sans text-sm text-cream-muted mt-0.5">Pick a slot — it goes straight into the calendar.</p>
              </div>
            </div>
            <CalendlyEmbed />
          </div>
        </section>

        {/* ── 02 Brief ─────────────────────────────────── */}
        <section className="bg-void-surface">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 py-16">
            <div className="flex items-center gap-5 mb-10">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold font-mono text-[11px] font-bold text-void shrink-0">
                02
              </span>
              <div>
                <p className="font-display text-xl font-light text-cream">Complete the project brief</p>
                <p className="font-sans text-sm text-cream-muted mt-0.5">
                  The more specific you are, the better the output.
                </p>
              </div>
            </div>
            <IntakeForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
