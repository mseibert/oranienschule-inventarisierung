import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  return new Response(JSON.stringify({
    message: "Test API endpoint is working",
    timestamp: new Date().toISOString(),
    method: 'GET'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const POST: APIRoute = async ({ request }) => {
  return new Response(JSON.stringify({
    message: "Test API endpoint is working",
    timestamp: new Date().toISOString(),
    method: 'POST'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};