export async function POST() {
    return new Response(JSON.stringify({ message: "Hello from Astro Serverless!" }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  