'use client'// Import necessary modules
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


// Define the component
export default function CreateSaleButton({ onClick, text, buttonColor }) {
    
    const buttonColorClass = buttonColor || 'bg-blue-500 hover:bg-blue-700';

    // Router for navigation
    const router = useRouter();

    // Function to create a new sale
    const createNewSale = async () => {
        try {
            // Make a request to create a new sale
            const response = await axios.post("/api/sales/", {
                user_id: 1,
                sale_date: new Date().toISOString().split('T')[0],
                sale_total: 0,
                sale_is_closed: 0,
            });

            const getNewSale = await axios.get("/api/sales/last");

            // Navigate to the new sale page
            router.push(`/sales/${getNewSale.data[0].sale_id}`);
            
            
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
