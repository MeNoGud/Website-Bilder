"use client";

export function HeroName() {
  return (
    <div className="relative w-full">
      <h1
        className="font-tolken relative z-[1] w-full text-center uppercase leading-none tracking-[0.06em] text-[#F4EEE4]"
        style={{ fontSize: "clamp(2.5rem, 11vw, 11rem)" }}
      >
        <span className="hero-line-1 block">Marchio</span>
      </h1>
    </div>
  );
}
