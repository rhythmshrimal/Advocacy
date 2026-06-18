# Shrimal & Associates — Website

A litigation-firm marketing website built with **Next.js (App Router) + TypeScript + Tailwind CSS**, with **Framer Motion** reveals, **GSAP ScrollTrigger** parallax, and a **Nodemailer SMTP** contact form.

> **Tagline:** _“Counsel You Can Trust, Advocacy That Delivers”_ (hero) · _“Advocacy. Integrity. Results.”_ (recurring brand line)

---

## Tech stack

| Concern        | Choice                                  |
| -------------- | --------------------------------------- |
| Framework      | Next.js 15 (App Router), React 19, TS   |
| Styling        | Tailwind CSS 3 (custom brand theme)     |
| Component anim | Framer Motion (scroll reveals, menu)    |
| Scroll/parallax| GSAP + ScrollTrigger (`@gsap/react`)    |
| Contact form   | API route + Nodemailer (SMTP)           |
| Fonts          | Playfair Display (serif) + Inter (sans) |

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in real SMTP values
npm run dev                  # http://localhost:3000
```

Production:

```bash
npm run build && npm run start
```

## Brand system

Defined in `tailwind.config.ts` and `app/globals.css`:

| Role       | Token              | Hex       |
| ---------- | ------------------ | --------- |
| Primary    | `navy`             | `#0E2A47` |
| Secondary  | `charcoal`         | `#1A1A1A` |
| Accent     | `gold`             | `#B08D45` |
| Background | `offwhite`         | `#F8F6F2` |
| Support    | `slate`            | `#5C6470` |

- **Logo:** `components/Logo.tsx` (scales-of-justice emblem + wordmark). Favicon: `app/icon.svg`.
- Animations respect `prefers-reduced-motion`.

## Editing content

**Almost all copy and contact details live in one file:** [`lib/site.ts`](lib/site.ts)

- `site.contact` — **address, Google Maps link, phone, email, hours** (all marked `[PLACEHOLDER]`)
- `nav` — navigation items
- `practiceAreas` — the five practice areas (titles, descriptions, bullet points)
- `matters` / `stats` / `values` — experience, stat counters, firm values

Page-specific placeholders to update:

- **Team profiles & photos:** `app/team/page.tsx`
- **Insights articles:** `app/insights/page.tsx`

## Contact form / SMTP

The form posts to `app/api/contact/route.ts`, which sends mail via Nodemailer.
Configure these in `.env.local` (see `.env.example`):

```
SMTP_HOST=        # e.g. smtp.zoho.in, smtp.gmail.com
SMTP_PORT=465     # 465 (SSL) or 587 (STARTTLS)
SMTP_SECURE=true  # true for 465, false for 587
SMTP_USER=        # SMTP login (usually full email)
SMTP_PASS=        # password / app-specific password
SMTP_FROM=        # "Name <from@domain>"
CONTACT_TO=       # where enquiries are delivered
```

Validation: **Name (required)**, **Phone (required)**, Email (optional), **Message (required)** — enforced on both client and server. A honeypot field blocks basic bots. Until SMTP is configured the form fails gracefully and asks the visitor to call/email.

## Pages

`/` Home · `/about` · `/practice-areas` (anchored sections) · `/team` · `/experience` · `/insights` · `/contact`

## Deployment

Deploy to **Vercel** (zero-config) or any Node host. Set the SMTP environment
variables in your host's dashboard. `next start` serves the production build.

## Compliance note

Per **Bar Council of India** rules, the site is informational only and is not an
advertisement or solicitation (disclaimer in the footer). Review all content
with the firm before going live.
