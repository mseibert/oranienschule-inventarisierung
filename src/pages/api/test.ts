import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const params: Record<string, string> = {};
  
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  
  return new Response(JSON.stringify({
    message: "Test API endpoint is working",
    timestamp: new Date().toISOString(),
    method: 'GET',
    queryParams: params
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