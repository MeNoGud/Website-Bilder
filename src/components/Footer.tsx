import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-void-border px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <span className="font-display text-base text-cream-dim">A · M</span>
          <span className="font-mono text-[11px] text-cream-dim">
            © {year} {site.name}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-mono text-[11px] text-cream-dim">
            Built with Next.js · {site.location}
          </span>
          <a
            href="#top"
            className="font-mono text-[11px] text-cream-dim transition-colors hover:text-gold"
          >
            ↑ Top
          </a>
        </div>
      </div>
    </footer>
  );
}
