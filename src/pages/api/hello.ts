export async function GET(request: Request) {
    return new Response('Hello from Vercel!');
}

export async function POST(request: Request) {
    const body = await request.json();
    console.log(body);
    return new Response('Hello from Vercel!' + body);
}