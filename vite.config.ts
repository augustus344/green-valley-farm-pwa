import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

const KENNEY =
  'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/master/kenney_animalpackredux/PNG/Round'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'pwa-192.svg', 'pwa-512.svg'],
      manifest: {
        name: 'Green Valley Farm',
        short_name: 'GreenValley',
        description: 'Cute illustrated farm-management dashboard',
        theme_color: '#2E5B34',
        background_color: '#F6F1E7',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: 'pwa-192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any' },
          { src: 'pwa-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,ico,png,woff2}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.href.startsWith(
                'https://raw.githubusercontent.com/ETdoFresh/kenney.nl/'
              ),
            handler: 'CacheFirst',
            options: {
              cacheName: 'kenney-cc0-assets',
              expiration: { maxEntries: 32, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
})
