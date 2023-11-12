import { pool } from "../../../../config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await pool.query("SELECT * FROM purchase INNER JOIN user ON user.user_id = purchase.user_id INNER JOIN product ON purchase.product_id = product.product_id INNER JOIN category ON category.category_id = product.category_id;");
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
    const { user_id, product_id, purchase_date, purchase_total } = await request.json();
    console.log(user_id, product_id, purchase_date, purchase_total);

    const result = await pool.query("INSERT INTO purchase SET ?", {
        user_id,
        product_id,
        purchase_date,
        purchase_total,
    });

    return NextResponse.json({ user_id, product_id, purchase_date, purchase_total, purchase_id: result.insertId });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}