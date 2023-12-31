"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";

export function LoginForm() {
  const [user, setUser] = useState({
    user_name: "",
    user_password: "",
    user_is_active: 0
  });

  const router = useRouter();
  const params = useParams();

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
      // Aquí debes hacer la solicitud al servidor para actualizar el estado a activo
      await axios.put("/api/users/" + user.id, {
        user_name: user.user_name,
        user_password: user.user_password,
        user_is_active: 1  // Actualiza el estado a activo
      });

      toast.success("Usuario activado exitosamente", {
        position: "bottom-center",
      });

      // Puedes redirigir o realizar otras acciones después de activar el usuario
      router.push("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al activar usuario");
    }
  };

  return (
    <div className="md:min-w-[400px] lg:min-w-[600px]">
      <form
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-600 shadow-md"
        onSubmit={handleSubmit}
      >

        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
            htmlFor="name"
          >
            Usuario
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            type="text"
            placeholder="Ingrese un nombre"
            id="name"
            name="user_name"
            onChange={handleChange}
            value={user.user_name}
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
            type="text"
            placeholder="Ingrese una contraseña"
            id="password"
            name="user_password"
            onChange={handleChange}
            value={user.user_password}
            autoComplete="off"
            autoFocus
          />
        </div>

        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
}
