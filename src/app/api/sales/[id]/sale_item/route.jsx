import { pool } from "../../../../../config/db";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {

  try {
    const { id } = params;

    const result = await pool.query("SELECT * FROM product INNER JOIN category ON product.category_id = category.category_id WHERE product_id = ?;", [
      id
    ]);
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await pool.query("DELETE FROM product WHERE product_id = ?", [id]);
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(request, { params }) {
  const data = await request.json();

  try {
    const { id } = params;

    await pool.query("UPDATE product SET ? WHERE product_id = ?", [data, id]);
    return NextResponse.json({
      ...data,
      id: params.id,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}