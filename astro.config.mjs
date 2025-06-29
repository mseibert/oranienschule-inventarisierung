// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';

import auth from 'auth-astro';

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

  integrations: [auth()],
});