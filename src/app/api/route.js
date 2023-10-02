export async function GET(request) {
    try {
      return new Response('API interfase');
    } catch (error) {
      console.error(error);
      return new Response('Error: Something went wrong', { status: 500 });
    }
  }
  