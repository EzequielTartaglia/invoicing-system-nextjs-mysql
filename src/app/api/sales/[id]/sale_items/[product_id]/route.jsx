import { NextResponse } from "next/server";
import { pool } from "../../../../../../../config/db";

export async function GET(request, { params }) {
  try {
    const { id, product_id } = params;

    const results = await pool.query(
      "SELECT product.product_id, product_name, category_name, SUM(sale_item.quantity) AS product_sale_total_quantity, SUM(sale_item.sale_item_total) AS product_sale_total_price, sale_item.sale_id, sale_is_closed FROM sale_item INNER JOIN sale ON sale.sale_id = sale_item.sale_id INNER JOIN product ON product.product_id = sale_item.product_id INNER JOIN category ON category.category_id = product.category_id WHERE sale_item.sale_id = ? AND sale_item.product_id = ? GROUP BY sale_item.sale_item_total;",
      [id, product_id]
    );

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

export async function PUT(request, { params }) {
    const data = await request.json();
  
    try {
        const { id, product_id } = params;
  
      await pool.query("UPDATE sale_item SET ? WHERE sale_id = ? AND product_id", [data, id, product_id]);
      return NextResponse.json({
        ...data,
        id: params.id,
      });
    } catch (error) {
      return NextResponse.json({ message: error.message });
    }
  }

  export async function DELETE(request, { params }) {
    try {
      const { id, product_id } = params;
  
      await pool.query("DELETE FROM sale_item WHERE sale_id = ? AND product_id = ?", [id, product_id]);
  
      return NextResponse.json({}, { status: 204 });
    } catch (error) {
      return NextResponse.json({ message: error.message });
    }
  }
  