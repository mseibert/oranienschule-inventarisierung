// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';
import vercelServerless from "@astrojs/vercel/serverless";
import vercelStatic from "@astrojs/vercel/static";

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',

  image: {
      domains: ["cloud.seatable.io"],
  },

  adapter: vercelServerless({
    webAnalytics: {
      enabled: true,
    },
  }),

  vite: {
    plugins: [tailwindcss()]
  }
});