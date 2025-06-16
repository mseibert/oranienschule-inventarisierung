export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const data = await request.json();
  const { name, email, message } = data;
  return new Response(
    JSON.stringify({ success: true, received: { data } }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
