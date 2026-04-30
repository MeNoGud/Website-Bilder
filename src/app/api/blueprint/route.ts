import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { Resend } from "resend";
import {
  generateBlueprint,
  buildAllFiles,
  buildBlueprintMd,
  type BlueprintJSON,
} from "@/lib/blueprint-generator";
import { createClientRepo } from "@/lib/github";

const resend = new Resend(process.env.RESEND_API_KEY);
const ALBERTO = "marchiorelloalberto20@gmail.com";

/* ── Helpers ─────────────────────────────────────────── */

function randomId(len = 6): string {
  return Math.random().toString(36).substring(2, 2 + len);
}

function buildAlbertoEmail(
  bp: BlueprintJSON,
  repoUrl: string,
  blueprintUrl: string
): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr>
          <td style="padding:6px 12px;font-size:11px;color:#8C7970;font-family:monospace;white-space:nowrap;text-transform:uppercase;letter-spacing:0.1em;">${label}</td>
          <td style="padding:6px 12px;font-size:13px;color:#1A110E;font-family:Georgia,serif;">${value}</td>
        </tr>`
      : "";

  const colorRow = (label: string, hex: string) =>
    `<tr>
      <td style="padding:6px 12px;font-size:11px;color:#8C7970;font-family:monospace;white-space:nowrap;text-transform:uppercase;">${label}</td>
      <td style="padding:6px 12px;">
        <span style="display:inline-block;width:16px;height:16px;background:${hex};border-radius:3px;vertical-align:middle;margin-right:8px;border:1px solid rgba(0,0,0,0.1)"></span>
        <span style="font-size:13px;color:#1A110E;font-family:monospace;">${hex}</span>
      </td>
    </tr>`;

  const pageList = bp.pages
    .map(
      (p) =>
        `<li style="margin-bottom:4px;font-size:13px;color:#1A110E;font-family:Georgia,serif;">
          <strong>${p.name}</strong> <span style="color:#8C7970;">(${p.route})</span> — ${p.sections.join(", ")}
        </li>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#F4EEE4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4EEE4;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #EDE7DC;">

        <tr>
          <td colspan="2" style="background:#1A110E;padding:28px 32px;">
            <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.5);font-family:monospace;text-transform:uppercase;letter-spacing:0.25em;">Blueprint ready</p>
            <h1 style="margin:8px 0 0;font-size:22px;color:#ffffff;font-family:Georgia,serif;font-weight:300;">${bp.businessName}</h1>
            <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.6);font-family:Georgia,serif;font-style:italic;">${bp.siteConfig.tagline}</p>
          </td>
        </tr>

        <tr><td colspan="2" style="padding:20px 32px 8px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${row("Site type", bp.siteType)}
            ${row("Client", `${bp.clientName} — ${bp.clientEmail}`)}
            ${row("Est. delivery", `${bp.estimatedWeeks} weeks`)}
            ${row("Stack", bp.technicalStack.join(", "))}
          </table>
        </td></tr>

        <tr><td colspan="2" style="padding:8px 32px;">
          <p style="font-size:10px;color:#E82400;font-family:monospace;text-transform:uppercase;letter-spacing:0.2em;border-top:1px solid #EDE7DC;padding-top:16px;">Action Required</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:8px 0;">
                ${repoUrl ? `
                <a href="${repoUrl}" style="display:inline-block;background:#1A110E;color:#fff;font-family:monospace;font-size:12px;text-decoration:none;padding:10px 20px;border-radius:6px;margin-right:10px;">
                  Open GitHub Repo →
                </a>
                <a href="cursor://open?url=${encodeURIComponent(repoUrl)}" style="display:inline-block;background:#E82400;color:#fff;font-family:monospace;font-size:12px;text-decoration:none;padding:10px 20px;border-radius:6px;margin-right:10px;">
                  Open in Cursor
                </a>` : ""}
                <a href="${blueprintUrl}" style="display:inline-block;background:transparent;color:#1A110E;font-family:monospace;font-size:12px;text-decoration:none;padding:10px 20px;border-radius:6px;border:1px solid #EDE7DC;">
                  View Blueprint
                </a>
              </td>
            </tr>
          </table>
        </td></tr>

        <tr><td colspan="2" style="padding:8px 32px;">
          <p style="font-size:10px;color:#E82400;font-family:monospace;text-transform:uppercase;letter-spacing:0.2em;border-top:1px solid #EDE7DC;padding-top:16px;">Pages</p>
          <ul style="margin:8px 0;padding-left:20px;">${pageList}</ul>
        </td></tr>

        <tr><td colspan="2" style="padding:8px 32px;">
          <p style="font-size:10px;color:#E82400;font-family:monospace;text-transform:uppercase;letter-spacing:0.2em;border-top:1px solid #EDE7DC;padding-top:16px;">Brand Colors</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${colorRow("Primary",    bp.brandColors.primary)}
            ${colorRow("Secondary",  bp.brandColors.secondary)}
            ${colorRow("Accent",     bp.brandColors.accent)}
            ${colorRow("Background", bp.brandColors.background)}
            ${colorRow("Text",       bp.brandColors.text)}
          </table>
        </td></tr>

        <tr><td colspan="2" style="padding:8px 32px 20px;">
          <p style="font-size:10px;color:#E82400;font-family:monospace;text-transform:uppercase;letter-spacing:0.2em;border-top:1px solid #EDE7DC;padding-top:16px;">Design Direction</p>
          <p style="font-size:13px;color:#4E3C36;font-family:Georgia,serif;line-height:1.6;">${bp.designNotes}</p>
        </td></tr>

        <tr>
          <td colspan="2" style="padding:16px 32px;background:#F4EEE4;border-top:1px solid #EDE7DC;">
            <p style="margin:0;font-size:10px;color:#8C7970;font-family:monospace;text-transform:uppercase;letter-spacing:0.15em;">
              Marchio Studio Blueprint System · Clone the repo and open in Cursor to start building
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildClientEmail(bp: BlueprintJSON): string {
  const pageCards = bp.pages
    .map(
      (p) =>
        `<td style="padding:0 8px 16px 0;vertical-align:top;width:50%;">
          <div style="background:#fff;border:1px solid #EDE7DC;border-radius:8px;padding:16px;">
            <p style="margin:0 0 4px;font-size:11px;color:#8C7970;font-family:monospace;text-transform:uppercase;">${p.route}</p>
            <p style="margin:0 0 8px;font-size:15px;color:#1A110E;font-family:Georgia,serif;font-weight:500;">${p.name}</p>
            <p style="margin:0;font-size:11px;color:#8C7970;font-family:sans-serif;">${p.sections.join(" · ")}</p>
          </div>
        </td>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#F4EEE4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4EEE4;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #EDE7DC;">

        <tr>
          <td style="background:#E82400;padding:32px 32px 24px;">
            <p style="margin:0 0 6px;font-size:10px;color:rgba(255,255,255,0.7);font-family:monospace;text-transform:uppercase;letter-spacing:0.3em;">Your blueprint is ready</p>
            <h1 style="margin:0;font-size:26px;color:#fff;font-family:Georgia,serif;font-weight:300;">Let's build something remarkable.</h1>
          </td>
        </tr>

        <tr>
          <td style="padding:28px 32px;">
            <p style="font-size:15px;color:#4E3C36;font-family:Georgia,serif;line-height:1.7;margin:0 0 20px;">
              Hi ${bp.clientName.split(" ")[0]}, we've reviewed your brief for <strong>${bp.businessName}</strong> and your initial website blueprint is ready.
              Here's a preview of what we'll build together.
            </p>

            <div style="background:#F4EEE4;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
              <p style="margin:0 0 4px;font-size:11px;color:#8C7970;font-family:monospace;text-transform:uppercase;">Your site</p>
              <p style="margin:0;font-size:17px;color:#1A110E;font-family:Georgia,serif;font-style:italic;">"${bp.siteConfig.tagline}"</p>
            </div>

            <p style="font-size:11px;color:#8C7970;font-family:monospace;text-transform:uppercase;letter-spacing:0.2em;margin:0 0 12px;">Pages included</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr style="display:flex;flex-wrap:wrap;">${pageCards}</tr>
            </table>

            <p style="margin-top:24px;font-size:13px;color:#8C7970;font-family:Georgia,serif;line-height:1.6;text-align:center;">
              I'll walk you through the full blueprint on our discovery call — come ready to discuss your goals and we'll get straight to work.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:16px 32px;background:#F4EEE4;border-top:1px solid #EDE7DC;">
            <p style="margin:0;font-size:10px;color:#8C7970;font-family:monospace;text-transform:uppercase;letter-spacing:0.15em;">
              Marchio Studio · marchio.design · studio@marchio.design
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
    const intake = await req.json() as Record<string, string>;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI not configured" }, { status: 503 });
    }

    // 1. Generate blueprint with GPT-4o
    const blueprint = await generateBlueprint(intake);

    // 2. Build unique ID and all file contents
    const blueprintId = `${blueprint.slug}-${randomId()}`;
    const repoName    = `client-${blueprint.slug}`;

    // 3. Create GitHub repo (if PAT is configured)
    let repoUrl = "";
    let cloneUrl = "";
    if (process.env.GITHUB_PAT) {
      try {
        const files = buildAllFiles(blueprint, repoName);
        const repo  = await createClientRepo(
          blueprint.slug,
          `${blueprint.businessName} — ${blueprint.siteConfig.role}`,
          files
        );
        repoUrl  = repo.repoUrl;
        cloneUrl = repo.cloneUrl;
      } catch (ghErr) {
        console.error("[blueprint] GitHub repo creation failed:", ghErr);
        // Non-fatal — continue without repo
      }
    }

    // 4. Store blueprint JSON in Vercel Blob
    const blueprintPayload = JSON.stringify({ ...blueprint, repoUrl, cloneUrl, blueprintId });
    let blobUrl = "";
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(
          `blueprints/${blueprintId}.json`,
          blueprintPayload,
          { access: "public", contentType: "application/json" }
        );
        blobUrl = blob.url;
      } catch (blobErr) {
        console.error("[blueprint] Blob storage failed:", blobErr);
      }
    }

    const secret = process.env.BLUEPRINT_SECRET ?? "";
    const previewUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? "https://marchio.design"}/blueprint/${blueprintId}?s=${encodeURIComponent(secret)}`;

    // 5. Email Alberto
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from:    "Marchio Blueprint <studio@marchio.design>",
        to:      ALBERTO,
        subject: `Blueprint ready — ${blueprint.businessName}`,
        html:    buildAlbertoEmail(blueprint, repoUrl || "(GitHub not configured)", previewUrl),
        attachments: [
          {
            filename: "BLUEPRINT.md",
            content:  Buffer.from(buildBlueprintMd(blueprint)).toString("base64"),
          },
        ],
      });

      // 6. Email client
      if (intake.email) {
        await resend.emails.send({
          from:    "Marchio Studio <studio@marchio.design>",
          to:      intake.email,
          subject: `Your website blueprint is ready — ${blueprint.businessName}`,
          html:    buildClientEmail(blueprint),
          replyTo: "studio@marchio.design",
        });
      }
    }

    return NextResponse.json({
      ok: true,
      blueprintId,
      repoUrl,
      previewUrl,
      blobUrl,
      siteType: blueprint.siteType,
      businessName: blueprint.businessName,
    });
  } catch (err) {
    console.error("[blueprint]", err);
    return NextResponse.json(
      { ok: false, error: "Blueprint generation failed" },
      { status: 500 }
    );
  }
}
