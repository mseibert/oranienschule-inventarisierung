import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
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