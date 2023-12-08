import { NextResponse } from "next/server";
import { pool } from "../../../../../../config/db";

export async function GET(request, { params }) {
  try {

    const { id } = params;

    const results = await pool.query("SELECT product.product_id, product_name, category_name, SUM(sale_item.quantity) AS product_sale_total_quantity, SUM(sale_item.sale_item_total) AS product_sale_total_price, sale_item.sale_id, sale_is_closed FROM sale_item INNER JOIN sale ON sale.sale_id = sale_item.sale_id INNER JOIN product ON product.product_id = sale_item.product_id INNER JOIN category ON category.category_id = product.category_id WHERE sale_item.sale_id = ? GROUP BY product.product_id, product_name, category_name, sale_item.sale_id, sale_is_closed;;", [
      id
    ]);

    //Suma total
    const total_sale_prices = results[0].reduce((total, result) => total + parseFloat(result.product_sale_total_price), 0);
    results[0].total_sale_prices = total_sale_prices;

    // Actualizar el campo 'sale_total' en la tabla 'sale'
    await pool.query("UPDATE sale SET sale_total = ? WHERE sale_id = ?", [total_sale_prices, id]);

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


export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await pool.query("DELETE FROM sale_item WHERE sale_id = ?", [id]);

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
