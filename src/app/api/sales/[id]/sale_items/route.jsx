import { NextResponse } from "next/server";
import { pool } from "../../../../../../config/db";

export async function GET(request, { params }) {
  try {

    const { id } = params;

    const results = await pool.query("SELECT * FROM sale_item INNER JOIN sale ON sale.sale_id = sale_item.sale_id INNER JOIN product ON product.product_id = sale_item.product_id INNER JOIN category ON category.category_id = product.category_id WHERE sale_item.sale_id = ?;", [
      id
    ]);
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
