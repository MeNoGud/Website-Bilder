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
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to(".hero-meta",   { opacity: 1,              duration: 0.6 })
        .to(".hero-line-1", { opacity: 1, y: 0,         duration: 1.0 }, "-=0.4")
        .to(".hero-tag",    { opacity: 1, y: 0,         duration: 0.7 }, "-=0.35")
        .to(".hero-cta",    { opacity: 1, y: 0,         duration: 0.6 }, "-=0.3");
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      // Instant show — no layout shift, no invisible content left behind
      gsap.set(
        [".hero-meta", ".hero-line-1", ".hero-tag", ".hero-cta"],
        { opacity: 1, y: 0, clearProps: "all" }
      );
    });

    return () => mm.revert();
  }, []);

  return null;
}
