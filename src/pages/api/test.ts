import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  // Try to use context.url, fallback to reconstructing the URL
  let url: URL;
  if ('url' in context && context.url) {
    url = context.url;
  } else {
    // Fallback: reconstruct using request.url and a dummy origin
    url = new URL(context.request.url, 'http://localhost');
  }

  const params: Record<string, string> = {};
  for (const [key, value] of url.searchParams.entries()) {
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