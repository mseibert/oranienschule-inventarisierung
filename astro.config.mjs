// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  image: {
      domains: ["cloud.seatable.io"],
  },
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  vite: {
    plugins: [tailwindcss()]
  },
  security: {
    checkOrigin: false,
  },
});