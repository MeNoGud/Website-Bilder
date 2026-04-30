import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export interface EstimateResult {
  lowPrice: number;
  highPrice: number;
  tier: "Starter" | "Standard" | "Premium" | "Enterprise";
  estimatedWeeks: number;
  breakdown: { area: string; hours: number; price: number; reason: string }[];
  keyFactors: string[];
  summary: string;
}

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "sk-REPLACE_ME") {
    return NextResponse.json({ error: "OpenAI API key not configured." }, { status: 503 });
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const body = await req.json();

    const prompt = buildPrompt(body);

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: `You are a senior web design pricing consultant operating in the European market (UK, Western & Southern Europe) in 2026.
Your job is to analyse a client's project brief and return a fair, itemised price estimate in JSON.
Positioning note: this freelancer competes against European agencies and guarantees to beat any comparable agency quote — prices should be competitive but reflect premium independent quality.

Pricing guidelines (European freelance market, hourly rate £80–95):
- Simple brochure site (≤5 pages, no backend, basic design): £1,200–2,800
- Standard business site (5–10 pages, CMS, contact forms, clean design): £2,800–5,500
- Premium custom site (animations, complex UI, multiple integrations, editorial design): £5,000–10,000
- E-commerce: add £2,000–5,000 for Shopify/WooCommerce; add £4,000–9,000 for bespoke Next.js store
- CMS integration (Sanity, Contentful, etc.): add £800–1,800
- Multilingual support: add £1,000–2,500
- Members/gated area: add £2,500–5,000
- Online booking/scheduling system: add £1,500–3,500
- Email marketing integration: add £400–900
- Blog/content section: add £600–1,400
- Live chat integration: add £300–700
- Video backgrounds / advanced motion: add £600–1,500
- AI-powered features: add £2,000–6,000
- Each additional page beyond 5: add £150–400 per page
- Rush delivery (under 2 weeks): apply 30% surcharge
- Luxury/editorial design style: apply 20–40% premium

Return ONLY valid JSON matching this exact structure:
{
  "lowPrice": number,
  "highPrice": number,
  "tier": "Starter" | "Standard" | "Premium" | "Enterprise",
  "estimatedWeeks": number,
  "breakdown": [
    { "area": string, "hours": number, "price": number, "reason": string }
  ],
  "keyFactors": [string, string, string],
  "summary": string
}

Rules:
- lowPrice and highPrice must be rounded to the nearest £100
- estimatedWeeks should be realistic (not just rush)
- breakdown should have 3–6 line items
- keyFactors should be 3–5 concise bullet points (no bullet character, just the text)
- summary is 1–2 sentences in plain English`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const raw = response.choices[0]?.message?.content ?? "{}";
    const result: EstimateResult = JSON.parse(raw);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[estimate]", err);
    return NextResponse.json({ error: "Failed to generate estimate." }, { status: 500 });
  }
}

function buildPrompt(b: Record<string, unknown>): string {
  const lines: string[] = ["PROJECT BRIEF:"];

  const add = (label: string, value: unknown) => {
    if (value && String(value).trim()) lines.push(`${label}: ${value}`);
  };

  add("Industry", b.industry);
  add("Business one-liner", b.oneLiner);
  add("Description", b.description);
  add("Target audience", b.audience);
  add("Primary goals", b.goals);
  add("Pages required", b.pages);
  add("Special features", b.features);
  add("Needs CMS", b.hasCms);
  add("Visual style", b.styles);
  add("Tone of voice", b.tone);
  add("Typography preference", b.typography);
  add("Has e-commerce", b.isShop ? "Yes" : "No");
  add("Shop platform", b.shopPlatform);
  add("Product quantity", b.shopProductQty);
  add("Shipping scope", b.shopShipping);
  add("Payment methods", b.shopPayments);
  add("Has existing copy/content", b.aboutCopy || b.servicesCopy ? "Yes" : "No");
  add("Has logo assets", b.hasLogo ? "Yes" : "No");
  add("Has brand guide", b.hasBrandGuide ? "Yes" : "No");
  add("Has photography", b.hasImages ? "Yes" : "No");
  add("Urgency", b.urgency);
  add("Client stated budget", b.budget);
  add("Notes", b.notes);

  return lines.join("\n");
}
