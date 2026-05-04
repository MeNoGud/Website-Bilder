"use client";

const BRAND = "Marchio";

export function HeroName() {
  const letters = [...BRAND];

  return (
    <div className="relative w-full">
      <h1
        className="font-tolken relative z-[1] w-full text-center uppercase leading-none text-[#F4EEE4]"
        style={{
          fontSize: "clamp(2.5rem, 11vw, 11rem)",
          letterSpacing: "0.06em",
        }}
      >
        <span className="sr-only">{BRAND}</span>
        {/* hero-line-1: scoped for timelines / layout; chars animated individually */}
        <span className="hero-line-1 inline-flex flex-wrap justify-center" aria-hidden>
          {letters.map((ch, i) => (
            <span key={`${BRAND}-${i}`} className="hero-char inline-block will-change-transform">
              {ch}
            </span>
          ))}
        </span>
      </h1>
    </div>
  );
}
