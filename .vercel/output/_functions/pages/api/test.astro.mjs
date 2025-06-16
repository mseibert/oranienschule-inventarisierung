export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const formData = await request.formData();
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value.toString();
  }
  console.log(data);
  const response = await fetch("https://n8n.apps.seibert-media.net/webhook/4a63a36e-ce50-46c5-a543-743f52e30159", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: data.email,
      message: data.message
    })
  });
  const result = await response.json();
  console.log(result);
  return new Response(
    JSON.stringify({ success: true, received: { data }, result }),
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
