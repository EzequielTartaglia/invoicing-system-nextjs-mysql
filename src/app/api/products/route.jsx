import { pool } from "../../../../config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await pool.query("SELECT * FROM product");
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
    const { name, description, category_id, price, stock_quantity } = await request.json();
    console.log(name, description, category_id, price, stock_quantity);

    const result = await pool.query("INSERT INTO product SET ?", {
      name,
      description,
      category_id,
      price,
      stock_quantity
    });

    return NextResponse.json({ name, description, category_id, price, id: result.insertId });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}