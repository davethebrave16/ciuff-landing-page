# Ciuff — Landing Page

One-page market-validation landing site for **CIUFF**, a summer accessories brand for bottles (a splash-proof pool cap). Built with [Astro](https://astro.build) and deployed to Firebase Hosting. The page collects interest emails and lets visitors pick a preferred pricing tier before the physical product exists.

## Prerequisites

- Node.js 20+
- [Firebase CLI](https://firebase.google.com/docs/cli) (`npm install -g firebase-tools`), logged in with `firebase login`

## Setup

```sh
./setup.sh
```

This installs dependencies and creates `.firebaserc` from `.firebaserc.example`. Update `.firebaserc` with your real Firebase project ID before deploying.

## Development

```sh
./rundev.sh
```

Starts the Astro dev server (`npm run dev` under the hood).

## Deploy

### Manual

```sh
./deploy.sh
```

Builds the site and deploys it to Firebase Hosting, after a confirmation prompt. There is no automated CI/CD deploy for this project — every deploy is manual.

## Routes

- `/` — homepage: header, hero, problem, benefits, pricing, email signup, footer (see [CLAUDE.md](CLAUDE.md) for the component breakdown)
- `/privacy-policy`, `/cookie-policy` — legal pages, linked from the footer and the cookie banner

## Design

- Colors: `#0E3B43` petrol, `#145C63` teal, `#C4E538` lime, `#FF6B4A` coral, `#EAF2EF` water-white — defined as CSS custom properties in `src/styles/global.css`
- Type: **Bebas Neue** for display/headings (`.disp` class), **Space Grotesk** for body text, both loaded via Google Fonts in `src/layouts/BaseLayout.astro`
- No photography — all graphics are inline SVG built from a single droplet path + circles (`src/components/icons/Drop.astro`)
- Copy is in Italian and is final/verbatim — do not translate or rewrite it

## Interactivity

Pricing tier selection and the email signup form are plain vanilla JS (`src/scripts/interactions.js`) — no framework, no backend. Submitting the email form swaps the form for a confirmation message client-side only; nothing is sent anywhere yet.

## Cookie consent

A bottom banner (`src/components/CookieBanner.astro`) offers **Accetta**/**Rifiuta**. Google Analytics (GA4, `G-VF5LV1J8DF`) is only loaded after the visitor accepts — never before, and never at all if they reject. The choice is stored in a `ciuff_cookie_consent` cookie for 180 days. **Some legal-page text is still placeholder** (dates, contact email, GA data-retention period) — look for the highlighted `[...]` text on `/privacy-policy` and `/cookie-policy` and fill it in before launch.

## SEO & social sharing

- Production domain: `https://ciuff.it` (set as `site` in `astro.config.mjs`) — used to build the canonical URL and absolute Open Graph/Twitter image URLs.
- Favicons (`public/favicon.svg`, `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-*.png`, `site.webmanifest`) were generated from `public/ciuff-icona-trasparente.png` (the source logo mark).
- `public/og-image.jpg` (1200×630) is the Open Graph / Twitter Card preview image shown when the link is shared — see `BaseLayout.astro` for the meta tags.
- `@astrojs/sitemap` generates `sitemap-index.xml` at build time; `robots.txt` points to it, for Google indexing.

## Architecture

See [CLAUDE.md](CLAUDE.md) for the full project layout and tech stack notes.
