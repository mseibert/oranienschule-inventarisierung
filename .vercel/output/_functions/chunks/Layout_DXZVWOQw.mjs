import { c as createComponent, m as maybeRenderHead, r as renderComponent, a as renderTemplate, d as createAstro, b as addAttribute, f as renderHead, g as renderSlot } from './astro/server_CRzYADk7.mjs';
import './index_CCxZAn8N.mjs';
import { $ as $$Image } from './_astro_assets_D9CBTI-g.mjs';
/* empty css                          */

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="bg-white py-4 px-8 shadow-md"> <div class="flex items-center gap-4"> <a href="/"> ${renderComponent($$result, "Image", $$Image, { "src": import('./logo_D5TssK6v.mjs'), "alt": "Oranienschule Logo", "class": "h-[50px] w-auto" })} </a> <h1 class="m-0 font-sans text-2xl text-gray-700">Inventar der Oranienschule</h1> <a href="/form" class="text-orange-500 hover:text-orange-600 font-medium transition-colors underline">Registrieren</a> </div> </header>`;
}, "/Users/martinseibert/Documents/code/inventar/src/components/Header.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${Astro2.props.title || "Inventar der Oranienschule, Wiesbaden"}</title>${renderHead()}</head> <body class="min-h-screen bg-white" data-astro-cid-sckkx6r4> <div class="container mx-auto px-4" data-astro-cid-sckkx6r4> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-sckkx6r4": true })} <main class="py-8" data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </main> </div> </body></html>`;
}, "/Users/martinseibert/Documents/code/inventar/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
