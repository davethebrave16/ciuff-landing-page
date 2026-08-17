# CLAUDE.md

## Commands

- `npm run dev` — start the Astro dev server
- `npm run build` — build the static site to `dist/`
- `npm run preview` — preview the production build locally
- `./setup.sh` — install deps, bootstrap `.firebaserc`
- `./rundev.sh` — bootstrap check + `npm run dev`
- `./deploy.sh` — build + manual deploy to Firebase Hosting

## CI/CD

None. Deploys are manual only, via `./deploy.sh`.

## Tech Stack

- [Astro](https://astro.build) (static output, no framework integrations)
- Vanilla JS for interactivity (`src/scripts/interactions.js`) — **not** React. This is a deliberate choice: the page's interactive state (a 3-way pricing selector, a form-to-confirmation swap) doesn't need a framework, so don't introduce one for it.
- Firebase Hosting (deploy only — no Firebase SDK is used in the app)

No i18n, no CMS/Firestore content fetching. Do not assume patterns from other Astro/Firebase projects (e.g. valecreative-site) apply here.

## Project Layout

```
src/
  layouts/
    BaseLayout.astro        — HTML shell: meta, Google Fonts (Bebas Neue, Space Grotesk), global.css, <slot />
  components/
    SiteHeader.astro        — logo + "Iscriviti" button
    Hero.astro               — dark hero section + ripple/droplet decorative SVG
    ProblemSection.astro    — "IL PROBLEMA" section + decorative SVG
    BenefitsSection.astro   — 4-card benefits grid
    PricingSection.astro    — 3 pricing tier buttons (data-tier="prova|gruppo|festa")
    EmailSignup.astro       — signup form + confirmation card, section id="iscriviti"
    SiteFooter.astro
    icons/
      Drop.astro             — reusable droplet SVG (props: size, dropColor, splashColor?)
  scripts/
    interactions.js         — vanilla JS: pricing tier selection, email form submit/confirmation swap
  pages/
    index.astro              — assembles all sections + loads interactions.js
  styles/
    global.css               — design tokens (colors), font-family base, .disp utility, tier-card/signup-form states
public/
  robots.txt
```

## Design tokens

Colors (CSS custom properties in `global.css`): `--petrol: #0E3B43`, `--teal: #145C63`, `--lime: #C4E538`, `--coral: #FF6B4A`, `--water: #EAF2EF`.

Fonts: Bebas Neue (`.disp` class) for headings/display, Space Grotesk for body text.

Copy is Italian and final/verbatim (sourced from the original design handoff) — don't translate or rewrite it when editing nearby code.

## Interactivity model

`src/scripts/interactions.js` holds a plain `selectedTier` variable (default `'gruppo'`) and:
- Toggles `.is-selected` on `[data-tier]` buttons in `PricingSection.astro` on click, and updates the "Set selezionato" label in `EmailSignup.astro` (`#selected-tier-label`)
- On `#signup-form` submit: `preventDefault()`, hides the form (`hidden` attribute), shows `#signup-confirmation` with the same tier label filled into `#confirmation-tier-label`

There's no build step tying the tier metadata together — `PricingSection.astro`'s tier data and `interactions.js`'s `TIER_LABELS` map are two small, independently-maintained sources of the same three tiers. Keep them in sync if pricing changes.
