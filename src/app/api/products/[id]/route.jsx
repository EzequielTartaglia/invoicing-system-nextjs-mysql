export async function GET(req, res) {
    try {
        const response = {
            message: 'Getting one product'
          };
    
        return Response.json({ response })

    } catch (error) {
      console.error(error);
      return new Response('Error: Something went wrong', { status: 500 });
    }
  }
  