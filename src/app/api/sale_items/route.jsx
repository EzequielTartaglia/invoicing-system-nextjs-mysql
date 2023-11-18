import { pool } from "../../../../config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await pool.query("SELECT * FROM sale_item INNER JOIN sale ON sale.sale_id = sale_item.sale_id INNER JOIN product ON product.product_id = sale_item.product_id;");
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
    const { sale_id, product_id, quantity, sale_item_total } = await request.json();
    console.log(sale_id, product_id, quantity, sale_item_total);

    const result = await pool.query("INSERT INTO sale SET ?", {
        sale_id,
        product_id,
        quantity,
        sale_item_total
    });

    return NextResponse.json({ sale_id, product_id, quantity, sale_item_total, sale_item_id: result.insertId });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}