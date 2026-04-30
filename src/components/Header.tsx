"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const nav = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-void-border bg-void/88 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:h-16 sm:px-10">
          {/* Monogram */}
          <Link
            href="#top"
            className="transition-opacity hover:opacity-80"
            aria-label="Home"
            onClick={() => setMenuOpen(false)}
          >
            <img src="/logo.svg" alt="AM" className="h-10 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 sm:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative font-sans text-[13px] tracking-wide text-cream-muted transition-colors hover:text-cream after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="/consultation"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2 font-sans text-[13px] font-medium text-void transition-all duration-300 hover:bg-gold-light"
          >
            Book consultation
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden flex flex-col justify-center items-end gap-[5px] h-8 w-8 shrink-0"
          >
            <span
              className={`h-px bg-cream transition-all duration-300 ease-in-out ${
                menuOpen ? "w-6 translate-y-[6px] rotate-45" : "w-6"
              }`}
            />
            <span
              className={`h-px bg-cream transition-all duration-300 ease-in-out ${
                menuOpen ? "w-0 opacity-0" : "w-4"
              }`}
            />
            <span
              className={`h-px bg-cream transition-all duration-300 ease-in-out ${
                menuOpen ? "w-6 -translate-y-[6px] -rotate-45" : "w-6"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 sm:hidden transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-void/98 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
        />
        <nav
          className={`absolute inset-0 flex flex-col items-center justify-center gap-2 transition-transform duration-500 ${
            menuOpen ? "translate-y-0" : "translate-y-6"
          }`}
        >
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 font-display text-5xl font-light text-cream transition-colors duration-200 hover:text-gold"
              style={{
                transitionDelay: menuOpen ? `${80 + i * 55}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.4s ease ${80 + i * 55}ms, transform 0.4s ease ${80 + i * 55}ms, color 0.2s ease`,
              }}
            >
              {item.label}
            </Link>
          ))}

          <div
            className="mt-8"
            style={{
              opacity: menuOpen ? 1 : 0,
              transition: `opacity 0.4s ease 360ms`,
            }}
          >
            <a
              href="/consultation"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 font-sans text-[14px] font-medium text-void"
            >
              Book consultation →
            </a>
          </div>

          <div
            className="mt-8 flex items-center gap-6"
            style={{
              opacity: menuOpen ? 1 : 0,
              transition: `opacity 0.4s ease 420ms`,
            }}
          >
            {site.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => setMenuOpen(false)}
                className="font-mono text-xs uppercase tracking-[0.2em] text-cream-dim transition-colors hover:text-gold"
              >
                {s.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
