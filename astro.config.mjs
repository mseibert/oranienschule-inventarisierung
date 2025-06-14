// @ts-check
import { defineConfig } from 'astro/config';
import redirects from "./redirects.json";

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
    output: 'static',
    image: {
        domains: ["cloud.seatable.io"],
    },
    redirects: {
        ...redirects,
        "/teil855": "/POj_68efRG2gpt2R6dmDGA"
    },
    adapter: vercel()
});