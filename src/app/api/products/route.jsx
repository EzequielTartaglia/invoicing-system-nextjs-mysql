import { pool } from "../../../../config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await pool.query("SELECT * FROM product INNER JOIN category ON product.category_id = category.category_id;");
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
    const { product_name, product_description, category_id, product_price, product_stock_quantity } = await request.json();
    console.log(product_name, product_description, category_id, product_price, product_stock_quantity);

    const result = await pool.query("INSERT INTO product SET ?", {
      product_name,
      product_description,
      category_id,
      product_price,
      product_stock_quantity
    });

    return NextResponse.json({ product_name, product_description, category_id, product_price, product_id: result.insertId });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}