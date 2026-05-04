"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const INITIAL = "Marchio";
const FINAL = "Alberto";

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic strip: opens on the initial glyph, cycles random, settles on final */
function buildStrip(initial: string, final: string, seed: number): string[] {
  const pool = "ABCDEFGHJKLMNPQRSTUVWXYZ023456789";
  const rand = mulberry32(seed ^ 0xbee5);
  const spins = 18 + Math.floor(rand() * 16);
  const seq: string[] = [initial.toUpperCase()];
  for (let i = 0; i < spins; i++) seq.push(pool[Math.floor(rand() * pool.length)]!);
  seq.push(final.toUpperCase());
  return seq;
}

export function HeroName() {
  const lineRef = useRef<HTMLSpanElement>(null);
  const srRef = useRef<HTMLSpanElement>(null);

  const strips = useMemo(() => {
    const from = [...INITIAL];
    const to = [...FINAL];
    if (from.length !== to.length)
      throw new Error("INITIAL and FINAL must be the same length for scroll tumblers.");

    return from.map((ch, i) =>
      buildStrip(ch, to[i]!, i * 741 + to.join("").length * 11),
    );
  }, []);

  const initialLetters = [...INITIAL];

  useLayoutEffect(() => {
    const hero = document.getElementById("hero");
    const sr = srRef.current;
    if (!hero || !lineRef.current) return;

    const slots = [...lineRef.current.querySelectorAll<HTMLSpanElement>(".hero-char")];
    if (slots.length !== strips.length || slots.length === 0) return;

    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) {
      [...FINAL].forEach((ch, i) => {
        slots[i].textContent = ch.toUpperCase();
      });
      if (sr) sr.textContent = FINAL;
      return;
    }

    const computeIdx = (strip: string[], t: number) => {
      if (strip.length <= 1) return 0;
      const capped = gsap.utils.clamp(0, 1, t);
      return Math.min(strip.length - 1, Math.floor(capped * (strip.length - 1)));
    };

    const st = ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom 55%",
      scrub: 0.55,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const g = self.progress;

        strips.forEach((strip, i) => {
          const start = i * 0.075;
          const span = 0.58 + i * 0.035;
          const slotT = gsap.utils.clamp(0, 1, (g - start) / span);
          slots[i].textContent = strip[computeIdx(strip, slotT)]!;
        });

        if (sr) sr.textContent = g > 0.92 ? FINAL : INITIAL;
      },
    });

    strips.forEach((strip, i) => {
      slots[i].textContent = strip[0]!;
    });
    if (sr) sr.textContent = INITIAL;

    return () => {
      st.kill();
    };
  }, [strips]);

  return (
    <div className="relative w-full">
      <h1
        className="font-tolken relative z-[1] w-full perspective-[760px] text-center uppercase leading-none text-[#F4EEE4]"
        style={{
          fontSize: "clamp(2.5rem, 11vw, 11rem)",
          letterSpacing: "0.06em",
        }}
      >
        <span ref={srRef} className="sr-only">
          {INITIAL}
        </span>
        <span
          ref={lineRef}
          className="hero-line-1 inline-flex flex-wrap justify-center [transform-style:preserve-3d]"
          aria-hidden
        >
          {initialLetters.map((ch, i) => (
            <span
              key={`brand-slot-${INITIAL}-${i}`}
              className="hero-char-tumbler inline-block overflow-visible [transform-style:preserve-3d]"
            >
              <span className="hero-char inline-block origin-center">{ch}</span>
            </span>
          ))}
        </span>
      </h1>
    </div>
  );
}
