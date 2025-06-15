import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_C2XdWG4x.mjs';
import { manifest } from './manifest_CUkFCmOl.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/api/feedback.astro.mjs');
const _page3 = () => import('./pages/api/register.astro.mjs');
const _page4 = () => import('./pages/form.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');
const _page6 = () => import('./pages/_---slug_.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.9.2_@types+node@22.15.30_jiti@2.4.2_lightningcss@1.30.1_rollup@4.42.0_typescript@5.8.3_yaml@2.8.0/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/api/feedback.ts", _page2],
    ["src/pages/api/register.ts", _page3],
    ["src/pages/form.astro", _page4],
    ["src/pages/index.astro", _page5],
    ["src/pages/[...slug].astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "2f38dcba-95f9-4937-932c-430ba1731f5d",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
