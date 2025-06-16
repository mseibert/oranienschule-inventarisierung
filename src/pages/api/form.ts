export const prerender = false;

// src/pages/api/form-submit.ts
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const data: Record<string, string> = {};
  
  for (const [key, value] of formData.entries()) {
    data[key] = value.toString();
  }

  console.log(data);
  const response = await fetch('https://n8n.apps.seibert-media.net/webhook/4a63a36e-ce50-46c5-a543-743f52e30159', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      message: data.message
    })
  });

  const result = await response.json();

  return new Response(
    JSON.stringify({ success: true, received: { data }, result: result }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};
