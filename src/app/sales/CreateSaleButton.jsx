'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


// Define the component
export default function CreateSaleButton({ onClick, text, buttonColor }) {

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

    const buttonColorClass = buttonColor || 'bg-blue-500 hover:bg-blue-700';

    // Router for navigation
    const router = useRouter();

    // Function to create a new sale
    const createNewSale = async () => {
        try {
           // Obtener la lista de usuarios
            const { data: users } = await axios.get('/api/users');
        
            // Buscar el usuario con el nombre proporcionado
            const foundUser = users.find((u) => (u.user_name === userName) && (u.user_email === userEmail) && (u.user_password === userPassword) && (u.user_token === localStorage.getItem('user_access_token')) );

            if (foundUser) {       

            // Iniciar nueva venta
            const response = await axios.post("/api/sales/", {
                user_id: foundUser.user_id,
                sale_date: new Date().toISOString().split('T')[0],
                sale_total: 0,
                sale_is_closed: 0,
            });

            const getNewSale = await axios.get("/api/sales/last");

            // Navegar hasta la nueva venta
            router.push(`/sales/${getNewSale.data[0].sale_id}`);
          }    
            
        } catch (error) {
            console.error("Error creating a new sale:", error);
        }
    };
    const handleButtonClick = async () => {
        try {
          // Call the provided onClick function (if provided)
          if (onClick) {
            await onClick();
          }
    
          // Call the createNewSale function
          await createNewSale();
        } catch (error) {
          console.error("Error in handleButtonClick:", error);
        }
      };
    return (
        <div>
            {/* Use button for navigation */}
            <button type="button" className={`${buttonColorClass} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            onClick={handleButtonClick}>
            { text }</button>
        </div>
    );
}
