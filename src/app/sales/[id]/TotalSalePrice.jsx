'use client'
import axios from "axios";
import { useEffect, useState } from "react";

export default function TotalSalePrice({ saleId }) {
  
    const [totalPrice, setTotalPrice] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
        try {
            const { data } = await axios.get("/api/sales/" + saleId + "/sale_items");
            if (data.length > 0) {
            // Sumar todos los product_sale_total_price
            const totalPrices = data.reduce((total, product) => total + parseFloat(product.product_sale_total_price), 0);
            setTotalPrice(totalPrices);
            console.log(totalPrices);
            } else {
            console.warn("No data returned from the API.");
            }
        } catch (error) {
            console.error("Error fetching total price:", error);
        }
        };
    
        fetchData();
    }, [saleId]);

  
  return (
    <div>Total: {totalPrice !== 0 ? `$${totalPrice}` : 'Cargando...'}</div>
  );
}
