import { pool } from "../../../../config/db";

export async function GET(req, res) {
  try {

    //POST
    if (req.method === 'POST') {
      const [response] = await pool.query('DESCRIBE product')
      return Response.json(response, { status: 200 });
    }

    //GET
    else {
      const [response] = await pool.query('DESCRIBE product')
      return Response.json(response, { status: 200 });
    }

  } catch (error) {
    console.error(error);
    return new Response("Error: Something went wrong", { status: 500 });
  }
}
