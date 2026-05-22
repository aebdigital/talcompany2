// Netlify Function: /.netlify/functions/contact
// Receives a JSON POST from the kontakt form and relays it via SMTP2GO.
// Env vars required:
//   CONTACT_FORM_RECIPIENT — where the email should land (e.g. tal@talcompany.sk)
//   SMTP2GO_API_KEY        — SMTP2GO API key (api-XXXX...)
//   SMTP2GO_SENDER         — verified "from" address on SMTP2GO (e.g. no-reply@talcompany.sk)

const SMTP2GO_ENDPOINT = "https://api.smtp2go.com/v3/email/send";
const MAX_FIELD_LENGTH = 5000;

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

function jsonResponse(statusCode, payload) {
  return { statusCode, headers: JSON_HEADERS, body: JSON.stringify(payload) };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validate({ name, email, message }) {
  const errors = [];
  if (!name || name.trim().length < 2) errors.push("Meno je povinné.");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Neplatná e-mailová adresa.");
  if (!message || message.trim().length < 10) errors.push("Správa je príliš krátka.");
  for (const [k, v] of Object.entries({ name, email, message })) {
    if (typeof v === "string" && v.length > MAX_FIELD_LENGTH) {
      errors.push(`Pole ${k} je príliš dlhé.`);
    }
  }
  return errors;
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: JSON_HEADERS, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  const { CONTACT_FORM_RECIPIENT, SMTP2GO_API_KEY, SMTP2GO_SENDER } = process.env;
  if (!CONTACT_FORM_RECIPIENT || !SMTP2GO_API_KEY || !SMTP2GO_SENDER) {
    console.error("contact.js: missing required env vars");
    return jsonResponse(500, { error: "Server nie je nakonfigurovaný." });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
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
        // custom_headers — set Reply-To so you can reply straight to the sender
        custom_headers: [
          { header: "Reply-To", value: `${name} <${email}>` },
        ],
      }),
    });

    const data = await smtpRes.json().catch(() => ({}));

    if (!smtpRes.ok || (data?.data?.error_code && data.data.error_code !== 0)) {
      console.error("SMTP2GO error", smtpRes.status, data);
      return jsonResponse(502, { error: "E-mailovú správu sa nepodarilo odoslať." });
    }

    return jsonResponse(200, { ok: true });
  } catch (err) {
    console.error("contact.js exception", err);
    return jsonResponse(500, { error: "Nastala neočakávaná chyba." });
  }
};
