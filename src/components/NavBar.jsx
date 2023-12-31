'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

function Navbar() {
  // Estado para almacenar el nombre del usuario
  const [userName, setUserName] = useState("");

  useEffect(() => {
  
  const fetchUserInfo = async () => {
    try {
      const { data } = await axios.get('/api/users/user_active');
      if (data && data.length > 0) {
        setUserName(data[0].user_name);
      }  
    } catch (error) {
      console.error(error);
    }
  };
    
  fetchUserInfo();
  }, []);
  
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
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;
