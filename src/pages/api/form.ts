export const prerender = false;

// src/pages/api/form-submit.ts
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const data: Record<string, string> = {};
  let attachmentData: { name: string; type: string; size: number; data: string } | null = null;
  
  for (const [key, value] of formData.entries()) {
    if (key === 'attachment' && value instanceof File) {
      // Konvertiere Datei zu Base64 mit Buffer
      const arrayBuffer = await value.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString('base64');
      
      attachmentData = {
        name: value.name,
        type: value.type,
        size: value.size,
        data: base64
      };
    } else {
      data[key] = value.toString();
    }
  }

  console.log(data);
  
  const payload: any = {
    email: data.email,
    message: data.message,
    referrer: data.referrer,
    currentPage: data.currentPage
  };

  // Füge Datei hinzu, falls vorhanden
  if (attachmentData) {
    payload.attachment = attachmentData;
  }

  const response = await fetch('https://n8n.apps.seibert-media.net/webhook/4a63a36e-ce50-46c5-a543-743f52e30159', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
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
