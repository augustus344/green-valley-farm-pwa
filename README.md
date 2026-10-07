# Green Valley Farm PWA

Cute illustrated farm-management dashboard — a production-ready Progressive Web App.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- vite-plugin-pwa (Workbox) for offline support
- All graphics are inline SVG / CSS / emoji (fully offline)

## Features

- **Home** — hero banner, farm health ring, weather, quick stats with count-up
- **Farm** — interactive top-down map with tappable zones, zoom/pan, detail cards, idle animal animations
- **Livestock** — herd overview, progress rings, feeding timeline, category filters, animal cards
- **Analytics / Harvest / Profile** — polished mock screens with SVG charts
- Installable PWA with service worker precaching

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

Output is in `dist/`.

## Deploy (Vercel)

Framework: Vite · Build: `npm run build` · Output: `dist`

Or connect the GitHub repo — Vercel auto-detects Vite.

## Design tokens

| Token | Value |
|-------|-------|
| Background | `#F6F1E7` |
| Cards | `#FFFDF8` |
| Primary | `#2E5B34` |
| Max width | 430px (mobile-first) |

## Data

All mock data lives in `src/data/farm.ts` (typed models: Zone, Animal, AnimalKind, FeedingSlot) so a real API can replace it later.
