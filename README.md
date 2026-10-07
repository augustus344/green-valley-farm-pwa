# Green Valley Farm PWA

Cute illustrated farm-management dashboard — production-ready Progressive Web App.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- framer-motion
- vite-plugin-pwa (Workbox) for offline support

## Local development

```bash
npm install
npm run dev
```

Build: `npm run build` → `dist/`

## Assets

All game art is **CC0** (public domain), embedded as data URIs in `src/assets.ts` so the PWA works fully offline.

| Asset | Source | License |
|-------|--------|---------|
| Tiny Farm tiles (barn, crops, trees, soil, farmers, sheep) | [Kenney Tiny Farm](https://kenney.nl/assets/tiny-farm) / [OpenGameArt](https://opengameart.org/content/tiny-farm) | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Animal Pack Redux (cow, chicken, goat, pig) | [Kenney Animal Pack Redux](https://kenney.nl/assets/animal-pack-redux) | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |

Attribution (optional): **Kenney.nl**

## Design tokens

| Token | Value |
|-------|-------|
| Background | `#F6F1E7` |
| Cards | `#FFFDF8` |
| Primary | `#2E5B34` |
| Max width | 430px |
