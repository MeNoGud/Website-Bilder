import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { put } from "@vercel/blob";

const resend = new Resend(process.env.RESEND_API_KEY);
const RECIPIENT = "marchiorelloalberto20@gmail.com";

/* ── Upload a File to Vercel Blob ─────────────────────────── */
async function uploadFile(file: File, prefix: string): Promise<string> {
  const blob = await put(`intake/${prefix}/${file.name}`, file, {
    access: "public",
  });
  return blob.url;
}

/* ── Build the HTML email ─────────────────────────────────── */
function buildEmail(
  fields: Record<string, string>,
  fileLinks: Record<string, string[]>
): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr>
          <td style="padding:8px 12px;font-size:11px;color:#8C7970;font-family:monospace;white-space:nowrap;vertical-align:top;text-transform:uppercase;letter-spacing:0.1em;">${label}</td>
          <td style="padding:8px 12px;font-size:13px;color:#1A110E;font-family:Georgia,serif;">${value}</td>
        </tr>`
      : "";

  const section = (title: string, rows: string) =>
    `<tr><td colspan="2" style="padding:20px 12px 4px;font-size:10px;color:#E82400;font-family:monospace;text-transform:uppercase;letter-spacing:0.2em;border-top:1px solid #EDE7DC;">${title}</td></tr>${rows}`;

  const fileSection = (label: string, urls: string[]) =>
    urls.length
      ? `<tr>
          <td style="padding:8px 12px;font-size:11px;color:#8C7970;font-family:monospace;white-space:nowrap;vertical-align:top;text-transform:uppercase;letter-spacing:0.1em;">${label}</td>
          <td style="padding:8px 12px;font-size:13px;color:#1A110E;font-family:Georgia,serif;">
            ${urls.map((u) => `<a href="${u}" style="color:#E82400;display:block;word-break:break-all;">${u}</a>`).join("")}
          </td>
        </tr>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#F4EEE4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4EEE4;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #EDE7DC;">

        <!-- Header -->
        <tr>
          <td colspan="2" style="background:#E82400;padding:28px 32px;">
            <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.7);font-family:monospace;text-transform:uppercase;letter-spacing:0.25em;">New submission</p>
            <h1 style="margin:8px 0 0;font-size:24px;color:#ffffff;font-family:Georgia,serif;font-weight:300;">Website Project Brief</h1>
          </td>
        </tr>

        <table width="100%" cellpadding="0" cellspacing="0" style="padding:0 20px 20px;">

          ${section("Contact",
            row("Name",     fields.name) +
            row("Email",    fields.email ? `<a href="mailto:${fields.email}" style="color:#E82400;">${fields.email}</a>` : "") +
            row("Phone",    fields.phone) +
            row("Business", fields.business)
          )}

          ${section("Project Overview",
            row("Industry",     fields.industry) +
            row("One-liner",    fields.oneLiner) +
            row("Description",  fields.description) +
            row("Audience",     fields.audience) +
            row("Goals",        fields.goals) +
            row("Competitors",  fields.competitors)
          )}

          ${section("Website Structure",
            row("Pages",    fields.pages) +
            row("Features", fields.features) +
            row("Domain",   fields.domain) +
            row("CMS",      fields.hasCms)
          )}

          ${fields.shopPlatform || fields.shopProductQty ? section("Shop & Inventory",
            row("Platform",      fields.shopPlatform) +
            row("Currency",      fields.shopCurrency) +
            row("Products",      fields.shopProductQty) +
            row("Payments",      fields.shopPayments) +
            row("Shipping",      fields.shopShipping) +
            fileSection("Product catalog CSV", fileLinks.catalog ?? [])
          ) : ""}

          ${section("Design Direction",
            row("Visual style",     fields.styles) +
            row("Tone of voice",    fields.tone) +
            row("Typography",       fields.typography) +
            row("Primary colour",   fields.primaryColor) +
            row("Secondary colour", fields.secondaryColor) +
            row("Accent colour",    fields.accentColor) +
            row("References",       fields.references ? fields.references.split(", ").map((u) => `<a href="${u}" style="color:#E82400;">${u}</a>`).join("<br>") : "")
          )}

          ${section("Brand Assets",
            fileSection("Logo",        fileLinks.logo   ?? []) +
            fileSection("Images",      fileLinks.images ?? []) +
            fileSection("Brand guide", fileLinks.brand  ?? [])
          )}

          ${section("Content & Presence",
            row("About / story",  fields.aboutCopy) +
            row("Services",       fields.servicesCopy) +
            row("SEO keywords",   fields.keywords) +
            row("Instagram",      fields.instagram ? `<a href="${fields.instagram}" style="color:#E82400;">${fields.instagram}</a>` : "") +
            row("Facebook",       fields.facebook  ? `<a href="${fields.facebook}"  style="color:#E82400;">${fields.facebook}</a>`  : "") +
            row("LinkedIn",       fields.linkedin  ? `<a href="${fields.linkedin}"  style="color:#E82400;">${fields.linkedin}</a>`  : "") +
            row("TikTok",         fields.tiktok    ? `<a href="${fields.tiktok}"    style="color:#E82400;">${fields.tiktok}</a>`    : "") +
            row("Other social",   fields.socialOther) +
            fileSection("Copy docs", fileLinks.copy ?? [])
          )}

          ${section("Timeline & Budget",
            row("Urgency", fields.urgency) +
            row("Budget",  fields.budget) +
            row("Notes",   fields.notes)
          )}

        </table>

        <!-- Footer -->
        <tr>
          <td colspan="2" style="padding:20px 32px;background:#F4EEE4;border-top:1px solid #EDE7DC;">
            <p style="margin:0;font-size:10px;color:#8C7970;font-family:monospace;text-transform:uppercase;letter-spacing:0.15em;">
              Sent from Alberto Marchiorello — Portfolio · Consultation booking
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ── Route handler ────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    /* Extract text fields */
    const text = (key: string) => (formData.get(key) as string | null) ?? "";
    const fields: Record<string, string> = {
      name:          text("name"),
      email:         text("email"),
      phone:         text("phone"),
      business:      text("business"),
      industry:      text("industry"),
      oneLiner:      text("oneLiner"),
      description:   text("description"),
      audience:      text("audience"),
      goals:         text("goals"),
      competitors:   text("competitors"),
      pages:         text("pages"),
      features:      text("features"),
      domain:        text("domain"),
      hasCms:        text("hasCms"),
      shopPlatform:  text("shopPlatform"),
      shopCurrency:  text("shopCurrency"),
      shopPayments:  text("shopPayments"),
      shopShipping:  text("shopShipping"),
      shopProductQty:text("shopProductQty"),
      styles:        text("styles"),
      tone:          text("tone"),
      typography:    text("typography"),
      primaryColor:  text("primaryColor"),
      secondaryColor:text("secondaryColor"),
      accentColor:   text("accentColor"),
      references:    text("references"),
      aboutCopy:     text("aboutCopy"),
      servicesCopy:  text("servicesCopy"),
      keywords:      text("keywords"),
      instagram:     text("instagram"),
      facebook:      text("facebook"),
      linkedin:      text("linkedin"),
      tiktok:        text("tiktok"),
      socialOther:   text("socialOther"),
      urgency:       text("urgency"),
      budget:        text("budget"),
      notes:         text("notes"),
    };

    /* Upload files to Vercel Blob */
    const fileLinks: Record<string, string[]> = {
      logo: [], images: [], brand: [], catalog: [], copy: [],
    };

    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    if (blobToken) {
      const uploadGroup = async (key: string, prefix: string) => {
        const entries = formData.getAll(key) as File[];
        for (const file of entries) {
          if (file && file.size > 0) {
            const url = await uploadFile(file, prefix);
            fileLinks[key].push(url);
          }
        }
      };
      await Promise.all([
        uploadGroup("logo",    "logo"),
        uploadGroup("images",  "images"),
        uploadGroup("brand",   "brand"),
        uploadGroup("catalog", "catalog"),
        uploadGroup("copy",    "copy"),
      ]);
    }

    /* Send email via Resend */
    await resend.emails.send({
      from:    "Portfolio <onboarding@resend.dev>",
      to:      RECIPIENT,
      subject: `New project brief — ${fields.business || fields.name}`,
      html:    buildEmail(fields, fileLinks),
      replyTo: fields.email || undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[intake]", err);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
