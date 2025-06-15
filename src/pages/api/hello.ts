export async function GET(request: Request) {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams);
    
    return new Response(JSON.stringify(params), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(request: Request) {
    // Request-Body als JSON parsen
    const data = await request.json();
  
  
    // Antwort zurückgeben
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
  