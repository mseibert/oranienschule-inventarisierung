export { renderers } from '../../renderers.mjs';

const prerender = false;
async function POST({ request }) {
  const body = await request.json();
  try {
    const articlesResponse = await fetch("https://n8n.apps.seibert-media.net/webhook/4a63a36e-ce50-46c5-a543-743f52e30159", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const contentType = articlesResponse.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const articles = await articlesResponse.json();
      return Response.json(articles);
    } else {
      return Response.json({
        error: "Invalid response from server"
      }, { status: 500 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return Response.json({
      error: "Failed to process request"
    }, { status: 500 });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
