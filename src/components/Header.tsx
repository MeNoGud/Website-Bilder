"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const nav = [
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Expertise" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-void-border bg-void/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:h-16 sm:px-10">
        {/* Monogram */}
        <Link
          href="#top"
          className="group flex items-center gap-1.5 font-display text-xl font-medium text-cream transition-opacity hover:opacity-80"
          aria-label="Home"
        >
          <span>A</span>
          <span className="text-gold transition-transform group-hover:rotate-12 inline-block">·</span>
          <span>M</span>
        </Link>

        {/* Nav */}
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

        {/* CTA */}
        <a
          href={site.social.find((s) => s.label === "Email")?.href ?? "#contact"}
          className="hidden sm:inline-flex items-center gap-2 rounded-full border border-gold-border px-5 py-2 font-sans text-[13px] text-cream-muted transition-all duration-300 hover:border-gold hover:bg-gold-faint hover:text-cream"
        >
          Connect
        </a>

        {/* Mobile CTA */}
        <a
          href="#contact"
          className="sm:hidden text-[13px] text-cream-muted hover:text-cream"
        >
          Connect
        </a>
      </div>
    </header>
  );
}
