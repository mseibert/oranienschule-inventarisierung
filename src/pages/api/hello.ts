export async function GET(request: Request) {
    return new Response('Hello from Vercel!');
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
  