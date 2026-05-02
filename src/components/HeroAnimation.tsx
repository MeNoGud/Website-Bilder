"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

// Trigger: component mount (page load)
// Purpose: replaces 4 independent CSS animations — eliminates the 540ms dead zone
//          between the brand name arriving and the tagline appearing, producing one
//          continuous, fluid entry rather than elements popping in independently.
// Easing: expo.out — aggressive deceleration gives a premium, unhurried feel.
// Cleanup: mm.revert() removes all matchMedia contexts and inline GSAP styles on unmount.
export function HeroAnimation() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Sequence: status bar → brand name → tagline → CTA
      // Each step overlaps the previous by ~0.3s, creating one continuous motion.
      // fromTo() gives GSAP explicit start AND end values — no CSS-reading ambiguity.
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(".hero-meta",   { opacity: 0 },        { opacity: 1, duration: 0.6 })
        .fromTo(".hero-line-1", { opacity: 0, y: 30 },  { opacity: 1, y: 0, duration: 1.0 }, "-=0.4")
        .fromTo(".hero-tag",    { opacity: 0, y: 20 },  { opacity: 1, y: 0, duration: 0.7 }, "-=0.35")
        .fromTo(".hero-cta",    { opacity: 0, y: 16 },  { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      // Instant show — gsap.set with explicit opacity: 1 (no clearProps, which would
      // remove the inline style and let the CSS opacity: 0 win).
      gsap.set([".hero-meta", ".hero-line-1", ".hero-tag", ".hero-cta"],
        { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, []);

  return null;
}
