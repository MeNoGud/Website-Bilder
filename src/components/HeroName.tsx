"use client";

const BRAND = "Marchio";

export function HeroName() {
  const letters = [...BRAND];

  return (
    <div className="relative w-full">
      <h1
        className="font-tolken relative z-[1] w-full perspective-[760px] text-center uppercase leading-none text-[#F4EEE4]"
        style={{
          fontSize: "clamp(2.5rem, 11vw, 11rem)",
          letterSpacing: "0.06em",
        }}
      >
        <span className="sr-only">{BRAND}</span>
        {/* hero-line-1: scoped for timelines / layout; chars animated individually */}
        <span
          className="hero-line-1 inline-flex flex-wrap justify-center [transform-style:preserve-3d]"
          aria-hidden
        >
          {letters.map((ch, i) => (
            <span
              key={`${BRAND}-${i}`}
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
