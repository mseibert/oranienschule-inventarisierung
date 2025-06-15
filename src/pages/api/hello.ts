export async function GET(request: Request) {
    const url = new URL(request.url);
    console.log('Full URL:', request.url);
    
    // Alternative Methode zur Extraktion der Parameter
    const searchParams = new URLSearchParams(url.search);
    const params: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) {
        params[key] = value;
    }
    
    console.log('Extracted params:', params);
    
    return new Response(JSON.stringify(params), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    });
}
