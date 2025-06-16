import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DfnhpySZ.mjs';
import { manifest } from './manifest_D-GcTkOH.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/api/hello.astro.mjs');
const _page3 = () => import('./pages/api/post.astro.mjs');
const _page4 = () => import('./pages/api/test.astro.mjs');
const _page5 = () => import('./pages/form.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');
const _page7 = () => import('./pages/_---slug_.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.9.2_@types+node@16.18.11_jiti@2.4.2_lightningcss@1.30.1_rollup@4.42.0_typescript@4.9.5_yaml@2.8.0/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/api/hello.ts", _page2],
    ["src/pages/api/post.ts", _page3],
    ["src/pages/api/test.ts", _page4],
    ["src/pages/form.astro", _page5],
    ["src/pages/index.astro", _page6],
    ["src/pages/[...slug].astro", _page7]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "25cb1cab-a105-434f-ae69-cb0654542859",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
