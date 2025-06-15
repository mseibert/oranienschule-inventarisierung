import { c as createComponent, d as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as renderScript } from '../chunks/astro/server_CRzYADk7.mjs';
import { $ as $$Layout } from '../chunks/Layout_DXZVWOQw.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Form = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Form;
  const errors = { email: "" };
  if (Astro2.request.method === "POST") {
    try {
      const data = await Astro2.request.formData();
      const email = data.get("email");
      if (typeof email !== "string" || email.length < 1) {
        errors.email += "Please enter an email. ";
      }
      const hasErrors = Object.values(errors).some((msg) => msg);
      if (!hasErrors) {
        const emailInput = document.querySelector("input[name=email]");
        console.log("Form submitted:", {
          email: emailInput?.value || ""
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg"> <h1 class="text-3xl font-bold mb-8 text-gray-800 text-center">Register</h1> <form method="POST" class="space-y-6"> <div class="space-y-2"> <label class="block text-lg font-medium text-gray-700">
Email:
<input type="email" name="email" required class="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg p-3"> </label> ${errors.email && renderTemplate`<p class="text-red-500 text-sm mt-1">${errors.email}</p>`} </div> <button type="submit" class="w-full bg-orange-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors mt-8" id="submitButton">
Register
</button> </form> </div> ${renderScript($$result2, "/Users/martinseibert/Documents/code/inventar/src/pages/form.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/martinseibert/Documents/code/inventar/src/pages/form.astro", void 0);

const $$file = "/Users/martinseibert/Documents/code/inventar/src/pages/form.astro";
const $$url = "/form";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Form,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
