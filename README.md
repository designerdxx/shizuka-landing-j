# Shizuka Luxury · Direction J: The hour

Landing page for Shizuka Luxury (private luxury resale, DIFC Dubai). Design direction J, inspired by nekohealth.com and built from the "J · Desktop / Mobile" boards on the design canvas.

- Next.js static export, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.
- Type: Castoro + Hanken Grotesk (self-hosted through `next/font`).
- Plain CSS in `app/globals.css`; layout switches at 760px with container queries.
- Motion follows the 12 principles: user-triggered motion stays at or under 300ms (ease-out in, ease-in out), staggers at or under 50ms, presses scale 0.94–0.99, linear easing only on progress indicators, and `prefers-reduced-motion` removes movement.

## Run

```bash
npm ci
npm run dev
```

Copy `env.example` to `.env.local` and set `NEXT_PUBLIC_WHATSAPP_NUMBER` to make every "Message us" link open WhatsApp with a pre-filled message. Without it, those links scroll to the contact section.

## Before launch

- Replace the sample reviews with approved client quotes.
- Fill in the street address, phone number, Instagram and LinkedIn URLs.
