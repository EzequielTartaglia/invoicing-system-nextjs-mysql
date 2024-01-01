'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

function Navbar() {
  // Estado para almacenar informacion del usuario
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
  
  const fetchUserInfo = async () => {
    try {
      const { data } = await axios.get('/api/users/user_active');
      if (data && data.length > 0) {
        setUserName(data[0].user_name);
        setUserEmail(data[0].user_email);
        setUserPassword(data[0].user_password);
        setUserToken(data[0].user_token);
      }  
    } catch (error) {
      console.error(error);
    }
  };
    
  fetchUserInfo();
  }, []);
  
  const handleLogOut = async () => {
    try {
      // Obtener la lista de usuarios
      const { data: users } = await axios.get('/api/users');
  
      // Buscar el usuario con el nombre proporcionado
      const foundUser = users.find((u) => (u.user_name === userName) && (u.user_email === userEmail) && (u.user_password === userPassword) && (u.user_token === localStorage.getItem('user_access_token')) );
  
      if (foundUser) {
        // Encontrado: actualiza la propiedad user_is_active a 1
        await axios.put(`/api/users/${foundUser.user_id}`, {
          user_is_active: 0,
          user_token: ""
        });
  
        localStorage.removeItem('user_access_token')

        toast.success("Sesion cerrada con exito", {
          position: "bottom-center",
        });
  
        window.location.reload();

      } else {
        // No encontrado: maneja el caso en que el usuario no existe
        toast.error("Usuario no encontrado");
  
        // Limpia ambos campos del formulario
        setUser({
          user_email: "",
          user_password: ""
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error en el inicio de sesión");
    }
  };
 
  return (
    <nav className="bg-zinc-900 text-white py-3 mb-2">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link href="/">
          <h3 className="text-3xl">Sistema de gestión</h3>
        </Link>
        
        <div>
          {/* Muestra un saludo personalizado con el nombre del usuario */}
          {userName && <p> ¡Bienvenido, {userName}!</p>}
        </div>

        <ul className="flex space-x-4">
          {/* Enlace para salir si está autenticado */}
          {userName && (<>
          <li className="pr-4">
            <Link href="/products" className="text-sky-500 hover:text-sky-400">
              Control de stock
            </Link>
          </li>
          <li>
            <Link href="/sales" className="text-sky-500 hover:text-sky-400">
              Sistema de compras
            </Link>
          </li>

            <li>
              <button onClick={handleLogOut} className="text-sky-500 hover:text-sky-400 cursor-pointer">
                Salir
              </button>
            </li>
            </>)}

          {/* Enlace para iniciar sesión si no está autenticado */}
          {!userName && (
            <li>
              <Link href="/login" className="text-sky-500 hover:text-sky-400">
                Iniciar sesión
              </Link>
            </li>
          )}
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;
