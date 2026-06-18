# Shrimal & Associates - Website

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

- **Logo:** `components/Logo.tsx` pairs the brand emblem (`public/images/emblem.png`, transparent) with the wordmark rendered as **text** (Playfair Display). It supports `layout="row"` (navbar/footer) and `layout="stack"` (emblem above text - used on the home hero). To change the emblem, replace `public/images/emblem.png`.
- **Favicon:** `app/icon.png` - the emblem composited onto a navy rounded tile (so the cream/gold mark stays visible on any browser tab). Regenerate it from a new emblem with `sharp` if needed.
- Animations respect `prefers-reduced-motion`.

## Editing content

**Almost all copy and contact details live in one file:** [`lib/site.ts`](lib/site.ts)

- `site.contact` - **address, Google Maps link, phone, email, hours** (all marked `[PLACEHOLDER]`)
- `nav` - navigation items
- `practiceAreas` - the five practice areas (titles, descriptions, bullet points)
- `matters` / `stats` / `values` - experience, stat counters, firm values

Page-specific placeholders to update:

- **Team profiles & photos:** `app/team/page.tsx`

### Photographs

All images render through `components/Photo.tsx` (`next/image`), showing a
branded placeholder until a real photo is supplied. To add photos: drop files
into `public/images/` and set the path in `lib/site.ts` (`images` and
`practiceAreas[].image`) or `app/team/page.tsx`. See
[`public/images/README.md`](public/images/README.md) for slots and dimensions.

### Practice-area pages

Each area has a dedicated, SEO-friendly page at `/practice-areas/<slug>` with an
overview, "what we handle" list, and FAQs (with `FAQPage` structured data). Add
or edit areas - including `overview`, `points`, `faqs`, and `image` - in
`practiceAreas` in [`lib/site.ts`](lib/site.ts). Pages are generated automatically.

### Insights (MDX)

Articles are Markdown/MDX files in `content/insights/`. To publish, add a
`<slug>.mdx` file with frontmatter:

```mdx
---
title: "Your headline"
excerpt: "One-sentence summary for the card and meta description."
category: "Criminal Law"
date: "2026-06-01"        # ISO date, used for sorting
author: "Shrimal & Associates"
draft: false               # set true to hide
---

Your article body in Markdown / MDX…
```

Reading time, the article page (`/insights/<slug>`), `Article` structured data,
a **related-articles** section, and the listing card are all generated
automatically.

**Author bios:** the `author` value is matched against the author registry in
[`lib/insights.ts`](lib/insights.ts) (`authors`), which supplies the bio, role,
initials, and optional photo shown in the byline card. Unknown authors fall back
to the firm. Add named advocates to that registry.

## SEO

- **`/sitemap.xml`** and **`/robots.txt`** are generated from `app/sitemap.ts`
  and `app/robots.ts` (include every static page plus practice-area and insight
  slugs). They derive URLs from `site.url` - set that to the live domain.
- **Structured data (JSON-LD):** `LegalService`/`Organization` on the homepage
  ([`components/OrganizationSchema.tsx`](components/OrganizationSchema.tsx)),
  `FAQPage` on each practice-area page, and `Article` on each insight.
- Per-page titles, descriptions, and Open Graph tags are set via Next.js
  `metadata` exports.

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

Validation: **Name (required)**, **Phone (required)**, Email (optional), **Message (required)** - enforced on both client and server. A honeypot field blocks basic bots. Until SMTP is configured the form fails gracefully and asks the visitor to call/email.

## Pages

- `/` Home · `/about` · `/team` · `/experience` · `/contact`
- `/practice-areas` overview → `/practice-areas/<slug>` per-area pages (5, SSG)
- `/insights` listing → `/insights/<slug>` MDX articles (SSG)

## Deployment

Deploy to **Vercel** (zero-config) or any Node host. Set the SMTP environment
variables in your host's dashboard. `next start` serves the production build.

## Compliance note

Per **Bar Council of India** rules, the site is informational only and is not an
advertisement or solicitation (disclaimer in the footer). Review all content
with the firm before going live.
