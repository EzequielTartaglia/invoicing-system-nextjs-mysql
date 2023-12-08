import { pool } from "../../../../../config/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const results = await pool.query("SELECT * FROM sale INNER JOIN user ON user.user_id = sale.user_id ORDER BY sale_id DESC LIMIT 1;");
      console.log(results[0])
  
      return NextResponse.json(results[0]);
    } catch (error) {
      return NextResponse.json(
        { message: error.message },
        {
          status: 500,
        }
      );
    }
  }