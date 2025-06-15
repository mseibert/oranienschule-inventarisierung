export const prerender = false;

export async function POST({ request }: { request: Request }) {
    const body = await request.json();

    try {
        const articlesResponse = await fetch("https://n8n.apps.seibert-media.net/webhook/4a63a36e-ce50-46c5-a543-743f52e30159", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        // Check if the response is JSON
        const contentType = articlesResponse.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const articles = await articlesResponse.json();
            return Response.json(articles);
        } else {
            // If not JSON, return an error response
            return Response.json({ 
                error: 'Invalid response from server' 
            }, { status: 500 });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return Response.json({ 
            error: 'Failed to process request' 
        }, { status: 500 });
    }
} 