// Ejemplo básico para /api/login

import { pool } from "../../../../config/db";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return NextResponse.forbidden();
  }

  try {
    const { user_email, user_password } = req.body;

    // Obtener el usuario desde la base de datos
    const results = await pool.query("SELECT * FROM users WHERE user_email = ?", [user_email]);

    // Verificar si el usuario existe
    if (results.length === 0) {
      return NextResponse.json({ success: false, message: "Usuario no encontrado" });
    }

    const user = results[0];

    // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
    const passwordMatch = await compare(user_password, user.user_password);

    if (!passwordMatch) {
      return NextResponse.json({ success: false, message: "Credenciales incorrectas" });
    }

    // Si las credenciales son correctas, puedes devolver la información del usuario
    return NextResponse.json({ success: true, user: { id: user.user_id, user_email: user.user_email } });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error en la autenticación" }, { status: 500 });
  }
}
