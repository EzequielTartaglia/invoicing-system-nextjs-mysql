export async function GET(req, res) {
    try {
        const response = {
            message: 'Getting products'
          };
    
        return Response.json({ response })

    } catch (error) {
      console.error(error);
      return new Response('Error: Something went wrong', { status: 500 });
    }
  }
  