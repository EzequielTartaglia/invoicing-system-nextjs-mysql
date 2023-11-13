import { pool } from "../../../../config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await pool.query("SELECT * FROM sale INNER JOIN user ON user.user_id = sale.user_id;");
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

export async function POST(request) {
  try {
    const { user_id, sale_date, sale_total, sale_is_closed } = await request.json();
    console.log(user_id, sale_date, sale_total, sale_is_closed);

    const result = await pool.query("INSERT INTO sale SET ?", {
        user_id,
        sale_date,
        sale_total,
        sale_is_closed
    });

    return NextResponse.json({ user_id, sale_date, sale_total, sale_is_closed, sale_id: result.insertId });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}