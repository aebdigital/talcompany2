# Contact form (SMTP2GO + Netlify Functions)

The `/kontakt` form submits to `/.netlify/functions/contact`, which validates the payload and relays the message via the SMTP2GO HTTP API. The user's email address is placed in the `Reply-To` header so you can hit **Reply** in your inbox and the response goes straight to the sender — your verified `SMTP2GO_SENDER` stays the From.

## Files

| Path | What it does |
| --- | --- |
| `netlify/functions/contact.js` | Serverless handler; validates, calls SMTP2GO, returns JSON. |
| `src/components/ContactForm.tsx` | Client component on `/kontakt`: submits via `fetch`, shows loading / success / error states. |
| `src/app/kontakt/page.tsx` | Server-rendered contact page (metadata + static info), embeds `<ContactForm />`. |
| `netlify.toml` | Sets `functions = "netlify/functions"`, build command, security/cache headers, Next.js plugin. |
| `.env.example` | Template for the three required env vars. |

## Required environment variables

Set these in **Netlify → Site settings → Environment variables** (and in `.env.local` for local testing with `netlify dev`):

| Name | Example | Notes |
| --- | --- | --- |
| `CONTACT_FORM_RECIPIENT` | `tal@talcompany.sk` | Inbox that receives the form messages. |
| `SMTP2GO_API_KEY` | `api-XXXXXXXX…` | Create in SMTP2GO → Settings → Api Keys. Give it the **Email: Send** scope only. |
| `SMTP2GO_SENDER` | `no-reply@talcompany.sk` | Must be a verified sender on a domain you've validated in SMTP2GO. |

## Local testing

```bash
npm install -g netlify-cli   # one-time
netlify link                  # link to the Netlify site
netlify dev                   # runs Next + the function on the same port
```

Then submit the form on `http://localhost:8888/kontakt`.

For a quick standalone test of just the function:

```bash
curl -X POST http://localhost:8888/.netlify/functions/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Skúšobná správa, najmenej desať znakov."}'
```

## Validation

The function rejects with `400` when:
- `name` shorter than 2 chars
- `email` not a syntactically valid address
- `message` shorter than 10 chars
- any field longer than 5000 chars

It returns `500` if env vars are missing, `502` if SMTP2GO refuses the send. Successful sends return `{ ok: true }`.

## Custom headers

The function sends `custom_headers: [{ header: "Reply-To", value: "<name> <email>" }]` so when you read the message and press Reply in your mail client, it addresses the actual sender, not your no-reply mailbox.

Add more custom headers if you ever need (e.g. `X-Mailer`, `In-Reply-To`) — just push extra objects into that array.

## Troubleshooting

- **"Server nie je nakonfigurovaný."** → one of the env vars isn't set on Netlify. Trigger a fresh deploy after setting them.
- **`502` response** → SMTP2GO refused. Common causes: `SMTP2GO_SENDER` not verified on the domain, API key revoked, recipient on a suppression list. Open the function logs in Netlify (Site → Functions → contact → Logs).
- **CORS issues** → the function and the form share the same origin in production. If you're testing from a different origin, add an `Access-Control-Allow-Origin` header in `contact.js`.
