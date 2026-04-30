"use client";

import { useState, useRef } from "react";
import type { EstimateResult } from "@/app/api/estimate/route";

/* ─────────────────────────────────────────────────
   Step definitions
───────────────────────────────────────────────── */
const STEPS = [
  { id: 1, label: "Contact"   },
  { id: 2, label: "Project"   },
  { id: 3, label: "Structure" },
  { id: 4, label: "Design"    },
  { id: 5, label: "Assets"    },
  { id: 6, label: "Shop"      },
  { id: 7, label: "Content"   },
  { id: 8, label: "Timeline"  },
];

/* ─────────────────────────────────────────────────
   Progress bar
───────────────────────────────────────────────── */
function StepBar({ current, total, isShop }: { current: number; total: number; isShop: boolean }) {
  const visibleSteps = STEPS.filter((s) => isShop || s.id !== 6);
  // map real step id to display position
  const displayPos = (id: number) => visibleSteps.findIndex((s) => s.id === id) + 1;
  const currentPos = displayPos(current);
  return (
    <div className="mb-10">
      {/* Mobile: text only */}
      <div className="flex items-center justify-between mb-3 sm:hidden">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
          Step {currentPos} of {total}
        </span>
        <span className="font-mono text-[10px] text-cream-dim">
          {STEPS.find((s) => s.id === current)?.label}
        </span>
      </div>

      {/* Desktop: dot trail */}
      <div className="hidden sm:flex items-center gap-0">
        {visibleSteps.map((s, i) => {
          const pos    = i + 1;
          const done   = s.id < current;
          const active = s.id === current;
          return (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center font-mono text-[10px] font-bold transition-all duration-300 ${
                    done   ? "bg-gold/20 text-gold"
                    : active ? "bg-gold text-void shadow-lg shadow-gold/30"
                    : "bg-void-elevated border border-void-border text-cream-dim"
                  }`}
                >
                  {done ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : pos}
                </div>
                <span className={`font-mono text-[9px] uppercase tracking-[0.12em] whitespace-nowrap ${active ? "text-gold" : "text-cream-dim"}`}>
                  {s.label}
                </span>
              </div>
              {i < visibleSteps.length - 1 && (
                <div className={`flex-1 h-px mx-2 mb-5 transition-all duration-500 ${done ? "bg-gold/40" : "bg-void-border"}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-px bg-void-border rounded-full overflow-hidden">
        <div
          className="h-full bg-gold transition-all duration-500 ease-out"
          style={{ width: `${((currentPos - 1) / (total - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Pill checkbox group
───────────────────────────────────────────────── */
function PillGroup({
  label,
  hint,
  options,
  selected,
  onChange,
  max,
}: {
  label: string;
  hint?: string;
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
  max?: number;
}) {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      if (max && selected.length >= max) return;
      onChange([...selected, opt]);
    }
  };

  return (
    <div>
      <p className="mb-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-cream-dim">{label}</p>
      {hint && <p className="mb-3 font-sans text-[11px] text-cream-dim/70">{hint}</p>}
      {!hint && <div className="mb-3" />}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected.includes(opt);
          const disabled = !active && !!max && selected.length >= max;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              disabled={disabled}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-2 font-sans text-[12px] transition-all duration-200 ${
                active
                  ? "border-gold bg-gold text-void shadow-sm shadow-gold/20"
                  : disabled
                  ? "border-void-border text-cream-dim opacity-40 cursor-not-allowed"
                  : "border-void-border text-cream-muted hover:border-gold/50 hover:text-cream hover:bg-void-elevated"
              }`}
            >
              {active && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                  <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {opt}
            </button>
          );
        })}
      </div>
      {max && (
        <p className="mt-2 font-mono text-[9px] text-cream-dim">
          {selected.length}/{max} selected
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Drop-zone file upload
───────────────────────────────────────────────── */
function DropZone({
  label,
  hint,
  name,
  multiple,
  accept,
  files,
  onChange,
}: {
  label: string;
  hint: string;
  name: string;
  multiple?: boolean;
  accept: string;
  files: File[];
  onChange: (files: File[]) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = (incoming: File[]) =>
    onChange(multiple ? [...files, ...incoming] : incoming.slice(0, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(Array.from(e.target.files ?? []));
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const ext = (name: string) => name.split(".").pop()?.toUpperCase() ?? "FILE";

  return (
    <div>
      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cream-dim">{label}</p>
      <p className="mb-3 font-sans text-[11px] text-cream-dim/70">{hint}</p>

      <div
        onClick={() => ref.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed px-8 py-10 text-center transition-all duration-200 ${
          dragging
            ? "border-gold bg-gold/5"
            : "border-void-border hover:border-gold/40 hover:bg-void-elevated"
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${dragging ? "bg-gold/15" : "bg-void-elevated"}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 15V3m0 0L8 7m4-4 4 4" stroke={dragging ? "#E82400" : "#8C7970"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke={dragging ? "#E82400" : "#8C7970"} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="font-sans text-sm text-cream">
              Drop {multiple ? "files" : "a file"} here{" "}
              <span className="text-gold underline underline-offset-2">or click to browse</span>
            </p>
            <p className="mt-1 font-mono text-[10px] text-cream-dim">
              {accept.split(",").map((a) => a.trim().replace(".", "").toUpperCase()).join(" · ")}
            </p>
          </div>
        </div>
        <input ref={ref} type="file" name={name} multiple={multiple} accept={accept} className="sr-only" onChange={handleChange} />
      </div>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((f, i) => (
            <li key={i} className="flex items-center gap-3 rounded-xl border border-void-border bg-void-surface px-4 py-2.5">
              <span className="flex h-7 w-9 items-center justify-center rounded bg-gold/10 font-mono text-[8px] font-bold text-gold shrink-0">
                {ext(f.name)}
              </span>
              <span className="flex-1 truncate font-sans text-[12px] text-cream">{f.name}</span>
              <span className="font-mono text-[10px] text-cream-dim shrink-0">
                {f.size > 1024 * 1024
                  ? `${(f.size / 1024 / 1024).toFixed(1)} MB`
                  : `${(f.size / 1024).toFixed(0)} KB`}
              </span>
              <button
                type="button"
                onClick={() => onChange(files.filter((_, idx) => idx !== i))}
                className="ml-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-cream-dim hover:bg-gold/10 hover:text-gold transition-colors"
                aria-label="Remove"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Field helpers
───────────────────────────────────────────────── */
function Field({
  label, hint, children,
}: {
  label: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block mb-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-cream-dim">
        {label}
      </label>
      {hint && <p className="mb-2 font-sans text-[11px] text-cream-dim/70">{hint}</p>}
      {!hint && <div className="mb-2" />}
      {children}
    </div>
  );
}

function ColorField({
  label, value, onChange, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string;
}) {
  const isHex = /^#[0-9A-Fa-f]{6}$/.test(value);
  return (
    <div>
      <label className="block mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cream-dim">{label}</label>
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="color"
            value={isHex ? value : "#F4EEE4"}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 w-10 cursor-pointer rounded-lg border border-void-border bg-transparent p-0.5"
            style={{ appearance: "none" }}
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="form-input flex-1"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Step card wrapper
───────────────────────────────────────────────── */
function StepCard({
  icon, title, description, children,
}: {
  icon: React.ReactNode; title: string; description: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-void-border bg-void p-8 sm:p-10">
      <div className="flex items-start gap-4 mb-8 pb-8 border-b border-void-border">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10">
          {icon}
        </div>
        <div>
          <h3 className="font-display text-2xl font-light text-cream">{title}</h3>
          <p className="mt-1 font-sans text-sm text-cream-muted">{description}</p>
        </div>
      </div>
      <div className="space-y-8">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   SVG icons (inline, no emojis)
───────────────────────────────────────────────── */
const icons = {
  contact: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E82400" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  ),
  project: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E82400" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
    </svg>
  ),
  structure: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E82400" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  ),
  design: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E82400" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <circle cx="13" cy="6" r="3" /><circle cx="6" cy="14" r="3" /><circle cx="17" cy="16" r="3" />
      <path d="M10.5 7.5L8.5 11.5M15.5 7.5L14.5 13" />
    </svg>
  ),
  assets: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E82400" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <path d="M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /><path d="M8 20h8M12 16v4" /><path d="M8 9l2 2 4-4" />
    </svg>
  ),
  content: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E82400" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  ),
  timeline: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E82400" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
    </svg>
  ),
  shop: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E82400" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 01-8 0" />
    </svg>
  ),
};

/* ─────────────────────────────────────────────────
   Main form
───────────────────────────────────────────────── */
export function IntakeForm() {
  const [step, setStep] = useState(1);

  /* Step 1 — Contact */
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [phone,    setPhone]    = useState("");
  const [business, setBusiness] = useState("");

  /* Step 2 — Project */
  const [industry,    setIndustry]    = useState("");
  const [oneLiner,    setOneLiner]    = useState("");
  const [description, setDescription] = useState("");
  const [audience,    setAudience]    = useState("");
  const [goals,       setGoals]       = useState<string[]>([]);
  const [competitors, setCompetitors] = useState(["", "", ""]);

  /* Step 3 — Structure */
  const [pages,    setPages]    = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [domain,   setDomain]   = useState("");
  const [hasCms,   setHasCms]   = useState("");

  /* Step 4 — Design */
  const [styles,         setStyles]         = useState<string[]>([]);
  const [tone,           setTone]           = useState<string[]>([]);
  const [typography,     setTypography]     = useState("");
  const [primaryColor,   setPrimaryColor]   = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [accentColor,    setAccentColor]    = useState("");
  const [refs,           setRefs]           = useState(["", "", ""]);

  /* Step 5 — Assets */
  const [logoFiles,  setLogoFiles]  = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [brandFiles, setBrandFiles] = useState<File[]>([]);

  /* Step 6 — Shop (conditional: only when e-commerce selected) */
  const isShop = features.includes("E-commerce & payments");
  const [shopPlatform,  setShopPlatform]  = useState("");
  const [shopCurrency,  setShopCurrency]  = useState("");
  const [shopPayments,  setShopPayments]  = useState<string[]>([]);
  const [shopShipping,  setShopShipping]  = useState<string[]>([]);
  const [shopProductQty, setShopProductQty] = useState("");
  const [catalogFiles,  setCatalogFiles]  = useState<File[]>([]);

  /* Step 7 — Content */
  const [aboutCopy,    setAboutCopy]    = useState("");
  const [servicesCopy, setServicesCopy] = useState("");
  const [socials,      setSocials]      = useState({ instagram: "", facebook: "", linkedin: "", tiktok: "", other: "" });
  const [copyFiles,    setCopyFiles]    = useState<File[]>([]);

  /* Step 8 — Timeline */
  const [urgency, setUrgency] = useState("");
  const [budget,  setBudget]  = useState("");
  const [notes,   setNotes]   = useState("");

  /* AI estimate */
  const [estimate,   setEstimate]   = useState<EstimateResult | null>(null);
  const [estimating, setEstimating] = useState(false);
  const [estimateErr, setEstimateErr] = useState("");

  /* UI */
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const TOTAL = isShop ? STEPS.length : STEPS.length - 1;

  const next = () => {
    if (!isShop && step === 5) { setStep(7); return; }
    setStep((s) => Math.min(s + 1, STEPS.length));
  };
  const back = () => {
    if (!isShop && step === 7) { setStep(5); return; }
    setStep((s) => Math.max(s - 1, 1));
  };

  const getEstimate = async () => {
    setEstimating(true);
    setEstimateErr("");
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry, oneLiner, description, audience,
          goals:    goals.join(", "),
          pages:    pages.join(", "),
          features: features.join(", "),
          hasCms,
          styles:   styles.join(", "),
          tone:     tone.join(", "),
          typography,
          isShop,
          shopPlatform, shopCurrency,
          shopPayments:  shopPayments.join(", "),
          shopShipping:  shopShipping.join(", "),
          shopProductQty,
          hasLogo:       logoFiles.length > 0,
          hasImages:     imageFiles.length > 0,
          hasBrandGuide: brandFiles.length > 0,
          aboutCopy, servicesCopy,
          urgency, budget, notes,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? "Failed");
      }
      const data: EstimateResult = await res.json();
      setEstimate(data);
    } catch (err) {
      setEstimateErr(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setEstimating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const fd = new FormData();
      const budgetSummary = [
        budget ? `Client budget: ${budget}` : "",
        estimate ? `Price estimate: £${estimate.lowPrice.toLocaleString()} – £${estimate.highPrice.toLocaleString()} (${estimate.tier} tier, ~${estimate.estimatedWeeks} weeks)` : "",
      ].filter(Boolean).join(" · ") || "Not provided";
      const fields: Record<string, string> = {
        name, email, phone, business,
        industry, oneLiner, description, audience,
        goals:       goals.join(", "),
        competitors: competitors.filter(Boolean).join(", "),
        pages:       pages.join(", "),
        features:    features.join(", "),
        domain, hasCms,
        styles:        styles.join(", "),
        tone:          tone.join(", "),
        typography,
        primaryColor, secondaryColor, accentColor,
        references:  refs.filter(Boolean).join(", "),
        shopPlatform, shopCurrency,
        shopPayments:  shopPayments.join(", "),
        shopShipping:  shopShipping.join(", "),
        shopProductQty,
        aboutCopy, servicesCopy,
        instagram:   socials.instagram,
        facebook:    socials.facebook,
        linkedin:    socials.linkedin,
        tiktok:      socials.tiktok,
        socialOther: socials.other,
        urgency,
        budget: budgetSummary,
        notes: estimate
          ? `${notes}\n\n--- AI ESTIMATE BREAKDOWN ---\n${estimate.breakdown.map((b) => `${b.area}: £${b.price.toLocaleString()} (${b.hours}h) — ${b.reason}`).join("\n")}\n\nKey factors:\n${estimate.keyFactors.map((f) => `• ${f}`).join("\n")}`
          : notes,
      };
      Object.entries(fields).forEach(([k, v]) => fd.append(k, v));
      logoFiles.forEach((f)    => fd.append("logo",    f, f.name));
      imageFiles.forEach((f)   => fd.append("images",  f, f.name));
      brandFiles.forEach((f)   => fd.append("brand",   f, f.name));
      catalogFiles.forEach((f) => fd.append("catalog", f, f.name));
      copyFiles.forEach((f)    => fd.append("copy",    f, f.name));

      const res = await fetch("/api/intake", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  /* ── Success screen ──────────────────────────── */
  if (status === "done") {
    return (
      <div className="rounded-2xl border border-void-border bg-void py-24 text-center px-8">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 mb-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 13l4 4L19 7" stroke="#E82400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-4">Brief received</p>
        <h3 className="font-display text-4xl font-light text-cream mb-4">
          You&apos;re all set.
        </h3>
        <p className="font-sans text-base text-cream-muted max-w-md mx-auto leading-relaxed">
          I&apos;ll review your brief before the call and come fully prepared.
          Expect a confirmation email shortly.
        </p>
      </div>
    );
  }

  /* ── Navigation buttons ──────────────────────── */
  const NavButtons = ({ isLast = false }: { isLast?: boolean }) => (
    <div className="flex items-center justify-between pt-8 mt-8 border-t border-void-border">
      {step > 1 ? (
        <button
          type="button"
          onClick={back}
          className="inline-flex items-center gap-2 rounded-full border border-void-border px-6 py-3 font-sans text-[13px] text-cream-muted transition-all hover:border-gold/50 hover:text-cream"
        >
          ← Back
        </button>
      ) : <div />}

      {isLast ? (
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-3 rounded-full bg-gold px-10 py-3.5 font-sans text-[14px] font-semibold text-void shadow-lg shadow-gold/25 transition-all duration-300 hover:bg-gold-light hover:gap-4 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Sending…" : <>Send brief <span aria-hidden>→</span></>}
        </button>
      ) : (
        <button
          type="button"
          onClick={next}
          className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-3.5 font-sans text-[13px] font-semibold text-void shadow-lg shadow-gold/25 transition-all duration-300 hover:bg-gold-light hover:gap-4"
        >
          Continue <span aria-hidden>→</span>
        </button>
      )}
    </div>
  );

  /* ── Steps ───────────────────────────────────── */
  return (
    <form onSubmit={handleSubmit}>
      <StepBar current={step} total={TOTAL} isShop={isShop} />

      {/* ── Step 1: Contact ──────────────────── */}
      {step === 1 && (
        <StepCard icon={icons.contact} title="Contact information" description="Who should I address the proposal to?">
          <div className="grid gap-8 sm:grid-cols-2">
            <Field label="Full name *">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Jane Smith" className="form-input" />
            </Field>
            <Field label="Email address *">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="jane@company.com" className="form-input" />
            </Field>
            <Field label="Phone number">
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+44 7700 900 000" className="form-input" />
            </Field>
            <Field label="Business / brand name *">
              <input type="text" value={business} onChange={(e) => setBusiness(e.target.value)} required placeholder="Acme Studio" className="form-input" />
            </Field>
          </div>
          <NavButtons />
        </StepCard>
      )}

      {/* ── Step 2: Project ──────────────────── */}
      {step === 2 && (
        <StepCard icon={icons.project} title="Your project" description="Tell us about your business at its core.">
          <Field label="Industry *">
            <select value={industry} onChange={(e) => setIndustry(e.target.value)} required className="form-input">
              <option value="">Select industry</option>
              {["Hospitality & Hotels","Restaurant & Food","E-commerce & Retail","Professional Services","Real Estate","Healthcare & Wellness","Fashion & Beauty","Technology & SaaS","Arts & Creative","Education","Non-profit","Other"].map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>

          <Field label="One-line pitch *" hint="The essence of your business in one sentence — 60 characters max.">
            <input
              type="text"
              value={oneLiner}
              onChange={(e) => setOneLiner(e.target.value.slice(0, 60))}
              required maxLength={60}
              placeholder="Boutique eco-hotel for conscious travellers in Tulum"
              className="form-input"
            />
            <p className="mt-1 font-mono text-[10px] text-cream-dim text-right">{oneLiner.length}/60</p>
          </Field>

          <Field label="Full description *" hint="What you do, how you do it, and what makes you different.">
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} placeholder="We are a boutique hotel…" className="form-input resize-none" />
          </Field>

          <Field label="Target audience *" hint="Who is your ideal customer? Be specific — age, lifestyle, pain points, values.">
            <textarea value={audience} onChange={(e) => setAudience(e.target.value)} required rows={3} placeholder="Affluent travellers aged 30–55 who prioritise sustainability and design…" className="form-input resize-none" />
          </Field>

          <PillGroup
            label="Primary website goal *"
            hint="What should a visitor do or feel after visiting your site?"
            options={["Generate leads","Sell products","Book appointments","Showcase portfolio","Build brand awareness","Inform / educate","Drive foot traffic"]}
            selected={goals}
            onChange={setGoals}
          />

          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cream-dim">Competitor websites (optional)</p>
            <p className="mb-3 font-sans text-[11px] text-cream-dim/70">URLs of direct competitors — helps us position you distinctly.</p>
            <div className="space-y-3">
              {competitors.map((c, i) => (
                <input key={i} type="url" value={c} onChange={(e) => { const a = [...competitors]; a[i] = e.target.value; setCompetitors(a); }} placeholder={`https://competitor${i + 1}.com`} className="form-input" />
              ))}
            </div>
          </div>
          <NavButtons />
        </StepCard>
      )}

      {/* ── Step 3: Structure ────────────────── */}
      {step === 3 && (
        <StepCard icon={icons.structure} title="Website structure" description="What pages and features does the site need?">
          <PillGroup
            label="Pages needed *"
            hint="Select every page that should exist on the site."
            options={["Home","About","Services","Portfolio / Work","Pricing","Blog","Contact","Booking / Reservations","Shop / E-commerce","Team","FAQ","Careers","Press / Media","Events"]}
            selected={pages}
            onChange={setPages}
          />
          <PillGroup
            label="Special features"
            hint="Technical functionality required beyond standard pages."
            options={["Online booking / scheduling","E-commerce & payments","Blog / CMS","Multilingual","Live chat","Members-only area","Email newsletter","Advanced contact forms","Map & locations","Reviews / testimonials","Social media feed","Video background"]}
            selected={features}
            onChange={setFeatures}
          />
          <div className="grid gap-8 sm:grid-cols-2">
            <Field label="Domain name" hint="Your URL, e.g. yourbrand.com — or leave blank if you need one.">
              <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="yourbrand.com" className="form-input" />
            </Field>
            <Field label="Can you update content yourself?" hint="Do you need a CMS so you can edit text/images without a developer?">
              <select value={hasCms} onChange={(e) => setHasCms(e.target.value)} className="form-input">
                <option value="">Select</option>
                <option>Yes — I need to edit it myself</option>
                <option>No — developer-managed is fine</option>
                <option>Not sure</option>
              </select>
            </Field>
          </div>
          <NavButtons />
        </StepCard>
      )}

      {/* ── Step 4: Design ───────────────────── */}
      {step === 4 && (
        <StepCard icon={icons.design} title="Design direction" description="Visual and tonal identity — what the site should look and feel like.">
          <PillGroup
            label="Visual style (pick up to 5)"
            hint="Choose the words that best describe your desired aesthetic."
            options={["Minimal","Bold","Luxury","Playful","Editorial","Modern","Rustic","Corporate","Dark & moody","Light & airy","Maximalist","Brutalist","Organic","Futuristic"]}
            selected={styles}
            onChange={(v) => setStyles(v.slice(0, 5))}
            max={5}
          />
          <PillGroup
            label="Tone of voice (pick up to 3)"
            hint="How should the copy on the site read?"
            options={["Professional","Conversational","Playful & fun","Authoritative","Warm & personal","Luxurious","Bold & direct","Inspiring"]}
            selected={tone}
            onChange={(v) => setTone(v.slice(0, 3))}
            max={3}
          />
          <Field label="Typography preference">
            <select value={typography} onChange={(e) => setTypography(e.target.value)} className="form-input">
              <option value="">Select preference</option>
              <option>Serif — elegant, editorial (e.g. Cormorant, Playfair)</option>
              <option>Sans-serif — clean, modern (e.g. Inter, Neue Haas)</option>
              <option>Mixed — serif headings + sans body</option>
              <option>Display / expressive — bold statement fonts</option>
              <option>Let you decide</option>
            </select>
          </Field>
          <div className="grid gap-6 sm:grid-cols-3">
            <ColorField label="Primary colour" value={primaryColor} onChange={setPrimaryColor} placeholder="#1A2E3B or 'deep navy'" />
            <ColorField label="Secondary colour" value={secondaryColor} onChange={setSecondaryColor} placeholder="#C9A96E or 'warm gold'" />
            <ColorField label="Accent colour" value={accentColor} onChange={setAccentColor} placeholder="#E2F0E8 or 'pale mint'" />
          </div>
          <div>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cream-dim">Sites you love (URLs)</p>
            <p className="mb-3 font-sans text-[11px] text-cream-dim/70">Add a note about what you like — layout, colour, feel, etc.</p>
            <div className="space-y-3">
              {refs.map((r, i) => (
                <input key={i} type="url" value={r} onChange={(e) => { const a = [...refs]; a[i] = e.target.value; setRefs(a); }} placeholder={["https://example.com — love the minimal layout","https://example.com — great use of typography","https://example.com — the colour palette is perfect"][i]} className="form-input" />
              ))}
            </div>
          </div>
          <NavButtons />
        </StepCard>
      )}

      {/* ── Step 5: Assets ───────────────────── */}
      {step === 5 && (
        <StepCard icon={icons.assets} title="Brand assets" description="Upload everything we need to build and style your site.">
          <DropZone
            label="Logo file"
            hint="Original vector preferred (SVG, AI, EPS). PNG at 1000px+ is also fine."
            name="logo"
            accept=".png,.svg,.ai,.eps,.pdf"
            files={logoFiles}
            onChange={setLogoFiles}
          />
          <DropZone
            label="Photography & images"
            hint="Hero shots, product photos, team portraits — the more the better. JPG, PNG, WebP."
            name="images"
            multiple
            accept="image/*"
            files={imageFiles}
            onChange={setImageFiles}
          />
          <DropZone
            label="Brand guide / style guide"
            hint="Any document that defines your brand identity — fonts, colours, do/don'ts."
            name="brand"
            accept=".pdf,.doc,.docx,.ppt,.pptx,.key"
            files={brandFiles}
            onChange={setBrandFiles}
          />
          <NavButtons />
        </StepCard>
      )}

      {/* ── Step 6: Shop (conditional) ───────── */}
      {step === 6 && (
        <StepCard icon={icons.shop} title="Shop & inventory" description="E-commerce configuration and product catalog for your store.">
          <div className="grid gap-8 sm:grid-cols-2">
            <Field label="Preferred platform">
              <select value={shopPlatform} onChange={(e) => setShopPlatform(e.target.value)} className="form-input">
                <option value="">Select platform</option>
                <option>Shopify — hosted, easiest to manage</option>
                <option>WooCommerce — WordPress-based, flexible</option>
                <option>Custom Next.js — fully bespoke</option>
                <option>Not sure — recommend one for me</option>
              </select>
            </Field>
            <Field label="Primary currency">
              <select value={shopCurrency} onChange={(e) => setShopCurrency(e.target.value)} className="form-input">
                <option value="">Select currency</option>
                <option>GBP (£)</option>
                <option>EUR (€)</option>
                <option>USD ($)</option>
                <option>Multiple currencies</option>
              </select>
            </Field>
          </div>

          <Field label="Approximate number of products">
            <select value={shopProductQty} onChange={(e) => setShopProductQty(e.target.value)} className="form-input">
              <option value="">Select range</option>
              <option>1–20 products</option>
              <option>21–100 products</option>
              <option>101–500 products</option>
              <option>500+ products</option>
            </select>
          </Field>

          <PillGroup
            label="Accepted payment methods"
            options={["Credit / debit card","PayPal","Apple Pay","Google Pay","Klarna / Buy now pay later","Bank transfer","Crypto"]}
            selected={shopPayments}
            onChange={setShopPayments}
          />

          <PillGroup
            label="Shipping scope"
            options={["Local pickup only","Domestic only","Europe","Worldwide","Digital / downloads only"]}
            selected={shopShipping}
            onChange={setShopShipping}
          />

          <div>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cream-dim">Product catalog</p>
            <p className="mb-3 font-sans text-[11px] text-cream-dim/70">
              Upload your inventory as a CSV or Excel file. We'll structure all product pages, categories, and filters from it.
            </p>
            <div className="mb-4 flex items-center gap-3 rounded-xl border border-void-border bg-void-surface px-5 py-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5A200" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <p className="flex-1 font-sans text-[12px] text-cream-muted">
                Don&apos;t have a CSV yet?{" "}
                <a href="/product-catalog-template.csv" download className="text-gold underline underline-offset-2 hover:text-gold-light transition-colors">
                  Download our template
                </a>{" "}
                — fill it in and upload below.
              </p>
            </div>
            <DropZone
              label=""
              hint="CSV or Excel — one row per product. See template above for column format."
              name="catalog"
              multiple
              accept=".csv,.xlsx,.xls"
              files={catalogFiles}
              onChange={setCatalogFiles}
            />
          </div>

          <NavButtons />
        </StepCard>
      )}

      {/* ── Step 7: Content ──────────────────── */}
      {step === 7 && (
        <StepCard icon={icons.content} title="Content & presence" description="The words, links, and context we'll use to write and structure your site.">
          <Field label="About / origin story" hint="Paste existing copy or write a draft — we'll refine the tone and structure.">
            <textarea value={aboutCopy} onChange={(e) => setAboutCopy(e.target.value)} rows={5} placeholder="We started because…" className="form-input resize-none" />
          </Field>
          <Field label="Services or products" hint="List each offering with a short description. One per line works best.">
            <textarea value={servicesCopy} onChange={(e) => setServicesCopy(e.target.value)} rows={5} placeholder={"Web Design — custom websites from strategy to launch\nBranding — logo, identity, guidelines\n..."} className="form-input resize-none" />
          </Field>
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-cream-dim">Social media links</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {(["instagram","facebook","linkedin","tiktok","other"] as const).map((k) => (
                <Field key={k} label={k.charAt(0).toUpperCase() + k.slice(1)}>
                  <input type="url" value={socials[k]} onChange={(e) => setSocials({ ...socials, [k]: e.target.value })} placeholder={`https://${k === "other" ? "yourplatform.com/..." : `${k}.com/yourhandle`}`} className="form-input" />
                </Field>
              ))}
            </div>
          </div>
          <DropZone
            label="Existing copy / content documents"
            hint="Google Docs exports, Word files, PDFs — any written content you already have."
            name="copy"
            multiple
            accept=".pdf,.doc,.docx,.txt,.md"
            files={copyFiles}
            onChange={setCopyFiles}
          />
          <NavButtons />
        </StepCard>
      )}

      {/* ── Step 8: Timeline ─────────────────── */}
      {step === 8 && (
        <StepCard icon={icons.timeline} title="Timeline & investment" description="Tell us your deadline and budget — we'll put together a fair investment proposal.">

          {/* Urgency */}
          <Field label="How soon do you need this?">
            <select value={urgency} onChange={(e) => setUrgency(e.target.value)} className="form-input">
              <option value="">Select urgency</option>
              <option>ASAP — within 2 weeks</option>
              <option>Within a month</option>
              <option>1–3 months</option>
              <option>3–6 months</option>
              <option>No fixed deadline</option>
            </select>
          </Field>

          {/* Notes */}
          <Field label="Anything else I should know?" hint="Special requirements, concerns, inspiration, or context not covered above.">
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="Feel free to share anything else…" className="form-input resize-none" />
          </Field>

          {/* ── Estimate block ────────────────── */}
          <div className="rounded-2xl border border-void-border bg-void-elevated overflow-hidden">
            <div className="px-6 py-6 space-y-6">
              <div className="text-center space-y-1">
                <p className="font-sans text-[13px] text-cream-muted">
                  Based on your brief, we calculate a fair market price — no guessing required.
                </p>
                <p className="font-sans text-[13px] text-cream-muted">
                  Share your budget below and I&apos;ll explain exactly what I can deliver within it.
                </p>
              </div>

              {/* Budget input — centred */}
              <div className="flex flex-col items-center gap-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-dim">Your budget range</label>
                <select value={budget} onChange={(e) => setBudget(e.target.value)} className="form-input w-full max-w-xs text-center">
                  <option value="">Select range</option>
                  <option>Under £2,000</option>
                  <option>£2,000 – £5,000</option>
                  <option>£5,000 – £10,000</option>
                  <option>£10,000 – £25,000</option>
                  <option>£25,000+</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              {/* CTA button */}
              {!estimate && (
                <button
                  type="button"
                  onClick={getEstimate}
                  disabled={estimating}
                  className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-gold/40 bg-gold/8 px-6 py-4 font-sans text-[13px] font-medium text-gold transition-all duration-300 hover:bg-gold/15 hover:border-gold/70 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {estimating ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="40" strokeDashoffset="20" strokeLinecap="round" />
                      </svg>
                      Analysing your brief…
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
                        <path d="M12 2a10 10 0 110 20A10 10 0 0112 2z" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                      Get my price estimate
                    </>
                  )}
                </button>
              )}

              {estimateErr && (
                <p className="font-sans text-[12px] text-gold rounded-xl border border-gold/20 bg-gold/5 px-4 py-3">
                  {estimateErr === "OpenAI API key not configured."
                    ? "AI estimation requires an OpenAI API key — add it to .env.local to enable this feature."
                    : estimateErr}
                </p>
              )}

              {/* Result card */}
              {estimate && (
                <div className="space-y-6">
                  {/* Price + tier */}
                  <div className="rounded-xl border border-gold/25 bg-void p-6 text-center">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] mb-4 ${
                      estimate.tier === "Starter"    ? "bg-cream/10 text-cream-muted" :
                      estimate.tier === "Standard"   ? "bg-gold/10 text-gold" :
                      estimate.tier === "Premium"    ? "bg-orange-500/10 text-orange-400" :
                                                       "bg-red-500/10 text-red-400"
                    }`}>
                      {estimate.tier} project
                    </span>
                    <p className="font-display font-light text-cream" style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", lineHeight: 1 }}>
                      £{estimate.lowPrice.toLocaleString()}
                      <span className="text-cream-dim mx-3 font-sans text-2xl">–</span>
                      £{estimate.highPrice.toLocaleString()}
                    </p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-cream-dim">
                      Estimated investment · ~{estimate.estimatedWeeks} week{estimate.estimatedWeeks !== 1 ? "s" : ""} delivery
                    </p>
                    <div className="mt-4 pt-4 border-t border-void-border">
                      <p className="font-sans text-[13px] text-cream-muted leading-relaxed">{estimate.summary}</p>
                    </div>
                  </div>

                  {/* Breakdown table */}
                  <div>
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-cream-dim">Cost breakdown</p>
                    <div className="rounded-xl border border-void-border overflow-hidden">
                      {estimate.breakdown.map((item, i) => (
                        <div
                          key={i}
                          className={`flex items-start gap-4 px-5 py-4 ${i < estimate.breakdown.length - 1 ? "border-b border-void-border" : ""}`}
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-sans text-[13px] text-cream">{item.area}</p>
                            <p className="font-sans text-[11px] text-cream-dim mt-0.5 leading-relaxed">{item.reason}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-mono text-[13px] text-cream">£{item.price.toLocaleString()}</p>
                            <p className="font-mono text-[10px] text-cream-dim">{item.hours}h</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key factors */}
                  <div>
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-cream-dim">What&apos;s driving the price</p>
                    <ul className="space-y-2">
                      {estimate.keyFactors.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                          <span className="font-sans text-[13px] text-cream-muted leading-relaxed">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Re-estimate button */}
                  <button
                    type="button"
                    onClick={() => { setEstimate(null); setEstimateErr(""); }}
                    className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-dim hover:text-gold transition-colors"
                  >
                    ↺ Recalculate
                  </button>
                </div>
              )}
            </div>
          </div>

          {status === "error" && (
            <p className="font-sans text-sm text-gold rounded-xl border border-gold/20 bg-gold/5 px-4 py-3">
              Something went wrong — email me directly at{" "}
              <a href="mailto:marchiorelloalberto20@gmail.com" className="underline">
                marchiorelloalberto20@gmail.com
              </a>
            </p>
          )}
          <NavButtons isLast />
        </StepCard>
      )}
    </form>
  );
}
