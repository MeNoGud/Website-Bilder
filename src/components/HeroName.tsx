"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const INITIAL = "Marchio";
const FINAL = "Alberto";

/** 1-based column index play order — "251643" + slot 7 (O last). Maps to slots MARCHIO */
const INTRO_PLAY_ORDER_ONE_BASED = [2, 5, 1, 6, 4, 3, 7] as const;

const INTRO_PLAY_SLOT_INDEXES = INTRO_PLAY_ORDER_ONE_BASED.map((n) => n - 1);

const INTRO_SCRAM_DURATION = 1.55;
const INTRO_STAGGER = 0.22;

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Random glyphs ending on `goal` — used for load intro */
function buildOpeningStrip(goal: string, seed: number): string[] {
  const pool = "ABCDEFGHJKLMNPQRSTUVWXYZ023456789";
  const rand = mulberry32(seed ^ 0xc071);
  const spins = 16 + Math.floor(rand() * 18);
  const seq: string[] = [];
  for (let i = 0; i < spins; i++) seq.push(pool[Math.floor(rand() * pool.length)]!);
  seq.push(goal.toUpperCase());
  return seq;
}

/** Strip for scroll scrub: starts at marchio glyph, rattles to alberto glyph */
function buildScrollStrip(initial: string, final: string, seed: number): string[] {
  const pool = "ABCDEFGHJKLMNPQRSTUVWXYZ023456789";
  const rand = mulberry32(seed ^ 0xbee5);
  const spins = 18 + Math.floor(rand() * 16);
  const seq: string[] = [initial.toUpperCase()];
  for (let i = 0; i < spins; i++) seq.push(pool[Math.floor(rand() * pool.length)]!);
  seq.push(final.toUpperCase());
  return seq;
}

function computeStripIndex(strip: string[], t: number): number {
  if (strip.length <= 1) return 0;
  const capped = gsap.utils.clamp(0, 1, t);
  return Math.min(strip.length - 1, Math.floor(capped * (strip.length - 1)));
}

function assertValidIntroPermutation(slots: readonly number[], letterCount: number) {
  if (slots.length !== letterCount)
    throw new Error("Intro play order length must match brand length.");
  const sorted = [...slots].sort((a, b) => a - b);
  sorted.forEach((v, i) => {
    if (v !== i) throw new Error("Intro play order must be a permutation of all slot indices.");
  });
}

function lockTumblerColumnWidths(
  charSlots: HTMLSpanElement[],
  openingForSlot: string[][],
  scrollForSlot: string[][],
): HTMLSpanElement[] {
  const tumblers = charSlots.map((el, i) => {
    const p = el.parentElement;
    if (!p)
      throw new Error(`Hero tumbler missing parent for slot ${i}`);
    return p as HTMLSpanElement;
  });
  charSlots.forEach((slotEl, i) => {
    const chars = new Set<string>();
    openingForSlot[i].forEach((c) => chars.add(c));
    scrollForSlot[i].forEach((c) => chars.add(c));
    let maxW = 0;
    chars.forEach((glyph) => {
      slotEl.textContent = glyph;
      maxW = Math.max(maxW, slotEl.getBoundingClientRect().width);
    });
    tumblers[i].style.minWidth = `${Math.ceil(maxW + 2)}px`;
  });
  return tumblers;
}

export function HeroName() {
  const lineRef = useRef<HTMLSpanElement>(null);
  const srRef = useRef<HTMLSpanElement>(null);

  const scrollStrips = useMemo(() => {
    const from = [...INITIAL];
    const to = [...FINAL];
    if (from.length !== to.length)
      throw new Error("INITIAL and FINAL must match length.");

    return from.map((ch, i) =>
      buildScrollStrip(ch, to[i]!, i * 741 + to.join("").length * 11),
    );
  }, []);

  const openingStrips = useMemo(
    () => [...INITIAL].map((ch, i) => buildOpeningStrip(ch, i * 409 + INITIAL.length)),
    [],
  );

  const initialLetters = [...INITIAL];

  useLayoutEffect(() => {
    assertValidIntroPermutation(INTRO_PLAY_SLOT_INDEXES, INITIAL.length);

    const hero = document.getElementById("hero");
    const sr = srRef.current;
    if (!hero || !lineRef.current) return;

    const slots = [...lineRef.current.querySelectorAll<HTMLSpanElement>(".hero-char")];
    if (slots.length !== scrollStrips.length || slots.length === 0) return;

    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) {
      [...FINAL].forEach((ch, i) => {
        slots[i].textContent = ch.toUpperCase();
      });
      if (sr) sr.textContent = FINAL;
      return;
    }

    const tumblers = lockTumblerColumnWidths(slots, openingStrips, scrollStrips);

    let scrollSt: ScrollTrigger | undefined;

    const attachScrollTrigger = () => {
      scrollSt?.kill();

      scrollStrips.forEach((strip, i) => {
        slots[i].textContent = strip[0]!;
      });
      if (sr) sr.textContent = INITIAL;

      scrollSt = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom 55%",
        scrub: 0.55,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const g = self.progress;
          scrollStrips.forEach((strip, i) => {
            const start = i * 0.075;
            const span = 0.58 + i * 0.035;
            const slotT = gsap.utils.clamp(0, 1, (g - start) / span);
            slots[i].textContent = strip[computeStripIndex(strip, slotT)]!;
          });
          if (sr) sr.textContent = g > 0.92 ? FINAL : INITIAL;
        },
      });

      ScrollTrigger.refresh();
    };

    const proxies = openingStrips.map(() => ({ p: 0 }));

    openingStrips.forEach((strip, i) => {
      slots[i].textContent = strip[computeStripIndex(strip, 0)]!;
    });
    if (sr) sr.textContent = INITIAL;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: attachScrollTrigger,
    });

    INTRO_PLAY_SLOT_INDEXES.forEach((slotIdx, ord) => {
      const proxy = proxies[slotIdx]!;
      tl.to(
        proxy,
        {
          p: 1,
          duration: INTRO_SCRAM_DURATION,
          ease: "power3.out",
          onUpdate: () => {
            slots[slotIdx].textContent =
              openingStrips[slotIdx]![computeStripIndex(openingStrips[slotIdx]!, proxy.p)]!;
          },
        },
        ord * INTRO_STAGGER,
      );
    });

    return () => {
      tl.kill();
      scrollSt?.kill();
      tumblers.forEach((t) => {
        t.style.minWidth = "";
      });
    };
  }, [openingStrips, scrollStrips]);

  return (
    <div className="relative w-full">
      <h1
        className="font-tolken relative z-[1] w-full perspective-[760px] text-center uppercase leading-none text-[#F4EEE4]"
        style={{
          fontSize: "clamp(2.5rem, 11vw, 11rem)",
        }}
      >
        <span ref={srRef} className="sr-only">
          {INITIAL}
        </span>
        <span
          ref={lineRef}
          className="hero-line-1 inline-flex flex-wrap items-center justify-center gap-[0.06em] [transform-style:preserve-3d]"
          aria-hidden
        >
          {initialLetters.map((ch, i) => (
            <span
              key={`brand-slot-${INITIAL}-${i}`}
              className="hero-char-tumbler inline-flex shrink-0 items-center justify-center overflow-visible leading-none [transform-style:preserve-3d]"
            >
              <span className="hero-char inline-block text-center leading-none">{ch}</span>
            </span>
          ))}
        </span>
      </h1>
    </div>
  );
}
