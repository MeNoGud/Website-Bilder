"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

// Trigger:  component mount (page load)
// Purpose:  7-step orchestrated entrance — eyebrow, H1 line reveals, paragraph,
//           CTA stagger, trust line, right panel clip-path, inner image scale.
// Tools:    gsap.timeline(), gsap.fromTo(), gsap.matchMedia() only — no ScrollTrigger.
// Cleanup:  mm.revert() removes all matchMedia contexts and inline GSAP styles on unmount.
export function HeroAnimation() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline();

      // 1. Eyebrow — opacity + small y shift
      // Purpose: anchors the sequence, establishes the brand context before the headline
      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )

      // 2. H1 lines — yPercent reveal from overflow-hidden parent wrappers, staggered
      // Purpose: premium editorial line-reveal — text rises into view like a printed page
      .fromTo(
        ".hero-h1-line",
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.08 },
        "-=0.25"
      )

      // 3. Paragraph — opacity + y settle
      // Purpose: supporting copy arrives after headline is readable, not competing
      .fromTo(
        ".hero-paragraph",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.55"
      )

      // 4. CTA items — staggered opacity + y
      // Purpose: two CTAs stagger slightly so the eye can register both individually
      .fromTo(
        ".hero-cta-item",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.06 },
        "-=0.4"
      )

      // 5. Trust line — opacity + small y
      // Purpose: final detail closes the left column sequence with authority
      .fromTo(
        ".hero-trust",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
        "-=0.3"
      )

      // 6. Right visual wrapper — clip-path reveal (left to right)
      // Purpose: visual panel arrives as the text sequence completes — grand reveal
      // Overlap: starts 0.7s before trust line ends for a concurrent close
      .fromTo(
        ".hero-visual-wrap",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power4.out" },
        "-=0.7"
      )

      // 7. Inner image — scale settle from 1.06 to 1
      // Purpose: slight "breathe in" effect on the image as the panel opens
      // clearProps: "transform" — releases the inline GSAP style so CSS hover can take over
      .fromTo(
        ".hero-visual-img",
        { scale: 1.06 },
        { scale: 1, duration: 1.2, ease: "power3.out", clearProps: "transform" },
        "<"
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      // Reduced motion — no movement or clip-path; just ensure everything is visible
      gsap.set(".hero-eyebrow",     { opacity: 1, y: 0 });
      gsap.set(".hero-h1-line",     { yPercent: 0 });
      gsap.set(".hero-paragraph",   { opacity: 1, y: 0 });
      gsap.set(".hero-cta-item",    { opacity: 1, y: 0 });
      gsap.set(".hero-trust",       { opacity: 1, y: 0 });
      gsap.set(".hero-visual-wrap", { clipPath: "inset(0 0% 0 0)" });
      gsap.set(".hero-visual-img",  { scale: 1, clearProps: "transform" });
    });

    return () => mm.revert();
  }, []);

  return null;
}
