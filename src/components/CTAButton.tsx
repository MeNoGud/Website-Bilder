"use client";

import { useRouter } from "next/navigation";

export function CTAButton() {
  const router = useRouter();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    // Fire the shine wave on "remarkable?"
    window.dispatchEvent(new CustomEvent("remarkable-wave"));

    // Navigate once the animation dispatches done (or after 1100ms fallback)
    const onDone = () => {
      cleanup();
      router.push("/consultation");
    };

    const fallback = setTimeout(onDone, 1100);

    const cleanup = () => {
      clearTimeout(fallback);
      window.removeEventListener("remarkable-done", onDone);
    };

    window.addEventListener("remarkable-done", onDone, { once: true });
  }

  return (
    <a
      href="/consultation"
      onClick={handleClick}
      className="inline-flex items-center gap-3 rounded-full bg-gold px-10 py-4 font-sans text-[14px] font-semibold text-void shadow-xl shadow-gold/30 transition-all duration-300 hover:bg-gold-light hover:shadow-gold/50 hover:gap-4"
    >
      Book your free consultation
      <span aria-hidden>→</span>
    </a>
  );
}
