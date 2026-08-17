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
- Firebase Hosting (deploy only — no Firebase SDK is used in the app)

No React, no i18n, no CMS/Firestore content fetching. Do not assume patterns from other Astro/Firebase projects (e.g. valecreative-site) apply here — this project intentionally does not have that machinery yet.

## Project Layout

```
src/
  layouts/
    BaseLayout.astro   — bare HTML shell (head, meta, global.css, <slot />)
  pages/
    index.astro        — homepage (placeholder)
  styles/
    global.css         — CSS reset only, no design tokens yet
public/
  robots.txt
```

## Status

Only the homepage route exists, with placeholder content. The real structure (sections, copy, design system, assets) will be provided later — this file and the layout/page files should be updated as that content lands.
