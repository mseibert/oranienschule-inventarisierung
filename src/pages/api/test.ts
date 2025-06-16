export const prerender = false;

// src/pages/api/form-submit.ts
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const data: Record<string, string> = {};
  
  for (const [key, value] of formData.entries()) {
    data[key] = value.toString();
  }

  // Hier könntest du die Daten weiterverarbeiten (z.B. speichern, E-Mail senden, etc.)

  return new Response(
    JSON.stringify({ success: true, received: { data } }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};
