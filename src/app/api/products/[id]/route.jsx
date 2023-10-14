import { pool } from "../../../../../config/db";

export async function GET(req, { params }) {
    try {
        const { id } = params;

      //POST
      if (req.method === 'POST') {
        const response = await pool.query(``)
        return Response.json(response[0], { status: 200 });
      }

      //GET
      else {
        const response = await pool.query(`SELECT * FROM product WHERE id = ${id}`)
        return Response.json(response[0], { status: 200 });
      }

    } catch (error) {
      console.error(error);
      return new Response('Error: Something went wrong', { status: 500 });
    }
  }
  