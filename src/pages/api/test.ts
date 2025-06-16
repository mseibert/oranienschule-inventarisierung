export const prerender = false;

// src/pages/api/form-submit.ts
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  // Formulardaten als JSON empfangen
  const data = await request.json();

  // Beispiel: Zugriff auf Felder
  const { name, email, message } = data;

  // Hier könntest du die Daten weiterverarbeiten (z.B. speichern, E-Mail senden, etc.)

  return new Response(
    JSON.stringify({ success: true, received: { data } }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};
