
export async function GET(request, { params }) {
    try {
        const { id } = params;
        
        const response = {
            message: 'Getting one product:' + id
          };
    
        return Response.json({ response})

    } catch (error) {
      console.error(error);
      return new Response('Error: Something went wrong', { status: 500 });
    }
  }
  