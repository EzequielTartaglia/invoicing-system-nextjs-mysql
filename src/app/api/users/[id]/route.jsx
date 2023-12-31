import { pool } from "../../../../../config/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {

  try {
    const { id } = params;

    const result = await pool.query("SELECT * FROM user WHERE user_id = ?;", [
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

    await pool.query("DELETE FROM user WHERE user_id = ?", [id]);

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(request, { params }) {
  const data = await request.json();

  try {
    const { id } = params;

    await pool.query("UPDATE user SET ? WHERE user_id = ?", [data, id]);
    return NextResponse.json({
      ...data,
      user_id: id, // Cambiado de 'id' a 'user_id' para que coincida con la respuesta
    });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}