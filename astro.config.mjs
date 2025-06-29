import auth from 'auth-astro';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
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