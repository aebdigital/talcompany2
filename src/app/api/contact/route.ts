import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SMTP2GO_ENDPOINT = "https://api.smtp2go.com/v3/email/send";
const MAX_FIELD_LENGTH = 5000;

const JSON_HEADERS = {
  "Cache-Control": "no-store",
};

function jsonResponse(status: number, payload: Record<string, unknown>) {
  return NextResponse.json(payload, { status, headers: JSON_HEADERS });
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validate({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const errors: string[] = [];
  if (!name || name.trim().length < 2) errors.push("Meno je povinné.");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push("Neplatná e-mailová adresa.");
  if (!message || message.trim().length < 10)
    errors.push("Správa je príliš krátka.");
  for (const [k, v] of Object.entries({ name, email, message })) {
    if (typeof v === "string" && v.length > MAX_FIELD_LENGTH) {
      errors.push(`Pole ${k} je príliš dlhé.`);
    }
  }
  return errors;
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: JSON_HEADERS });
}

export async function POST(request: Request) {
  const { CONTACT_FORM_RECIPIENT, SMTP2GO_API_KEY, SMTP2GO_SENDER } =
    process.env;
  if (!CONTACT_FORM_RECIPIENT || !SMTP2GO_API_KEY || !SMTP2GO_SENDER) {
    console.error("contact route: missing required env vars");
    return jsonResponse(500, { error: "Server nie je nakonfigurovaný." });
  }

  let payload: Record<string, string>;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse(400, { error: "Neplatný formát požiadavky." });
  }

  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim();
  const phone = (payload.phone || "").trim();
  const message = (payload.message || "").trim();

  const errors = validate({ name, email, message });
  if (errors.length > 0) {
    return jsonResponse(400, { error: errors.join(" ") });
  }

  const subject = `Nový dopyt z webu od ${name}`;
  const textBody = [
    `Meno: ${name}`,
    `Email: ${email}`,
    phone ? `Telefón: ${phone}` : null,
    "",
    "Správa:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const htmlBody = `
    <div style="font-family:Montserrat,Arial,sans-serif;color:#1f2937;line-height:1.55;">
      <h2 style="margin:0 0 16px;color:#1d4ed8;">Nový dopyt z webu</h2>
      <p><strong>Meno:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Telefón:</strong> ${escapeHtml(phone)}</p>` : ""}
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
      <p><strong>Správa:</strong></p>
      <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const smtpRes = await fetch(SMTP2GO_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Smtp2go-Api-Key": SMTP2GO_API_KEY,
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: SMTP2GO_SENDER,
        to: [CONTACT_FORM_RECIPIENT],
        subject,
        text_body: textBody,
        html_body: htmlBody,
        custom_headers: [{ header: "Reply-To", value: `${name} <${email}>` }],
      }),
    });

    const data = await smtpRes.json().catch(() => ({}));

    if (
      !smtpRes.ok ||
      (data?.data?.error_code && data.data.error_code !== 0)
    ) {
      console.error("SMTP2GO error", smtpRes.status, data);
      return jsonResponse(502, {
        error: "E-mailovú správu sa nepodarilo odoslať.",
      });
    }

    return jsonResponse(200, { ok: true });
  } catch (err) {
    console.error("contact route exception", err);
    return jsonResponse(500, { error: "Nastala neočakávaná chyba." });
  }
}
