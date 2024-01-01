"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EzTechLogo from '../../public/ez-tech_logo.webp';

export function LoginForm() {
  
  const crypto = require('crypto');
  
  const [user, setUser] = useState({
    user_email: "",
    user_password: "",
    user_is_active: 0
  });

  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('/api/users');
        setUser(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Obtener la lista de usuarios
        const { data: users } = await axios.get('/api/users');
    
        // Buscar el usuario con el nombre proporcionado
        const foundUser = users.find((u) => (u.user_email === user.user_email) && (u.user_password === user.user_password) );
    
        if (foundUser) {

          const randomToken = crypto.randomBytes(32).toString('hex');

          // Encontrado: actualiza la propiedad user_is_active a 1
          await axios.put(`/api/users/${foundUser.user_id}`, {
            user_email: user.user_email,
            user_password: user.user_password,
            user_is_active: 1,
            user_token: randomToken
          });
    
          toast.success("Inicio de sesión exitoso", {
            position: "bottom-center",
          });
    
          router.push("/");
          setTimeout(() => {
            window.location.reload();
          }, 500);
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
    <div className="md:min-w-[400px] lg:min-w-[600px]">


      <form
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-600 shadow-md"
        onSubmit={handleSubmit}
      >

      <div className="mb-4 text-xl font-bold text-center text-gray-800 dark:text-white">
        <div className="flex items-center justify-center mb-4">
          <Image src={EzTechLogo} alt="" className="w-[150px] h-[150px] rounded-full" />
        </div>
        Sistema de gestion
      </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
            htmlFor="email"
          >
            Correo electronico
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            type="text"
            placeholder="Ingrese un email"
            id="email"
            name="user_email"
            onChange={handleChange}
            value={user.user_email}
            autoComplete="off"
            autoFocus
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            type="password"
            placeholder="Ingrese una contraseña"
            id="password"
            name="user_password"
            onChange={handleChange}
            value={user.user_password}
            autoComplete="off"
          />
        </div>

        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
}
