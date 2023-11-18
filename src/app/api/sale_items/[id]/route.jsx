import { pool } from "../../../../../config/db";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {

  try {
    const { id } = params;

    const result = await pool.query("SELECT * FROM sale_item INNER JOIN sale ON sale.sale_id = sale_item.sale_id INNER JOIN product ON product.product_id = sale_item.product_id WHERE sale_item_id = ?;", [
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

    await pool.query("DELETE FROM sale_item WHERE sale_item_id = ?", [id]);
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(request, { params }) {
  const data = await request.json();

  try {
    const { id } = params;

    await pool.query("UPDATE sale_item SET ? WHERE sale_item_id = ?", [data, id]);
    return NextResponse.json({
      ...data,
      id: params.id,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}