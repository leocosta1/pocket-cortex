import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { VitePWA } from 'vite-plugin-pwa';

const BASE_URL = '/pocket-cortex/';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Pocket Cortex',
        short_name: 'Pocket Cortex',
        start_url: BASE_URL,
        scope: BASE_URL,
        display: 'standalone',
        background_color: '#1E1F22',
        theme_color: '#3e63dd',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  base: BASE_URL,
  server: {
    host: '0.0.0.0',
    allowedHosts: ['localhost', 'rhiannon-nonpossible-margot.ngrok-free.dev'],
  },
});
