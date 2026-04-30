#!/usr/bin/env node

/**
 * beforeSubmitPrompt hook — logs every user message to conversations/YYYY-MM-DD.md
 *
 * Debug mode: if conversations/.debug-raw exists, also writes the raw stdin
 * payload so you can inspect the exact shape Cursor sends.
 */

const fs   = require("fs");
const path = require("path");

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (raw += chunk));

process.stdin.on("end", () => {
  try {
    const logDir = path.resolve(__dirname, "../../conversations");
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

    // Always write raw payload to a debug file so we can inspect the shape
    fs.writeFileSync(
      path.join(logDir, ".last-hook-payload.json"),
      raw.replace(/^\uFEFF/, "") || "(empty)",
      "utf8"
    );

    // Strip UTF-8 BOM that Cursor prepends to the payload
    const cleaned = raw.replace(/^\uFEFF/, "");
    const data = JSON.parse(cleaned || "{}");

    // Try every known field path Cursor might use
    const text =
      data?.userMessage ??
      data?.message ??
      data?.prompt ??
      data?.text ??
      (() => {
        const msgs = data?.messages ?? data?.conversation ?? [];
        const last = [...msgs].reverse().find((m) => m.role === "user");
        return last?.content ?? null;
      })();

    if (text && typeof text === "string" && text.trim()) {
      const now     = new Date();
      const dateStr = now.toISOString().slice(0, 10);
      const timeStr = now.toTimeString().slice(0, 8);

      const logFile   = path.join(logDir, `${dateStr}.md`);
      const isNew     = !fs.existsSync(logFile);
      const header    = isNew ? `# Conversations — ${dateStr}\n\n` : "";
      const entry     = `${header}**[${timeStr}]** ${text.trim()}\n\n---\n\n`;

      fs.appendFileSync(logFile, entry, "utf8");
    }
  } catch (err) {
    // Never block the prompt — write error to debug file
    try {
      const logDir = path.resolve(__dirname, "../../conversations");
      if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
      fs.writeFileSync(
        path.join(logDir, ".last-hook-error.txt"),
        String(err),
        "utf8"
      );
    } catch (_) { /* silent */ }
  }

  process.stdout.write(JSON.stringify({ permission: "allow" }));
});
