import { pool } from "../../../../config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await pool.query("SELECT * FROM user");
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
    const { user_name, user_last_name, user_email, user_account, user_password, user_token } = await request.json();
    console.log(user_name, user_last_name, user_email, user_account, user_password, user_token);

    const result = await pool.query("INSERT INTO user SET ?", {
      user_name, 
      user_last_name, 
      user_email, 
      user_account, 
      user_password,
      user_token
    });

    return NextResponse.json({ user_name, user_last_name, user_email, user_account, user_password, user_token, user_id: result.insertId });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}