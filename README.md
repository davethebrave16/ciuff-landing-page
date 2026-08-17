# Ciuff — Landing Page

Static landing page for Ciuff, built with [Astro](https://astro.build) and deployed to Firebase Hosting.

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

- `/` — homepage (placeholder for now)

## Architecture

This is an intentionally minimal scaffold: a single placeholder homepage, no design system, no CMS, no i18n. The real page structure and content will be added in a follow-up once the design/content is ready. See [CLAUDE.md](CLAUDE.md) for the current project layout.
