import { pool } from "../../../../../config/db";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {

  try {
    const { id } = params;

    const result = await pool.query("SELECT * FROM sale INNER JOIN user ON user.user_id = sale.user_id WHERE sale_id = ?;", [
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

    await pool.query("DELETE FROM sale WHERE sale_id = ?", [id]);
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(request, { params }) {
  const data = await request.json();

  try {
    const { id } = params;

    await pool.query("UPDATE sale SET ? WHERE sale_id = ?", [data, id]);
    return NextResponse.json({
      ...data,
      id: params.id,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}