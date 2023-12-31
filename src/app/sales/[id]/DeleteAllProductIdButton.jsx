'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteAllProductIdButton({ saleId, productId}) {
    const router = useRouter();

    const [productStock, setProductStock] = useState(0);

    useEffect(() => {
    
        const fetchProduct = async (id) => {
          try {
            const { data } = await axios.get('/api/products/' + id);
            setProductStock(data[0].product_stock_quantity);
          } catch (error) {
            console.error(error);
          }
        };
      
      // Obtener la cantidad de stock del producto al cargar el componente
      fetchProduct(productId);
  
      }, [productId, saleId]);
    
      const handleDeleteAllItems = async () => {
        const { data } = await axios.get(`http://localhost:3000/api/sales/${saleId}/sale_items/${productId}`);
        const response = parseInt(data[0].product_sale_total_quantity)

        const res = await axios.delete(`http://localhost:3000/api/sales/${saleId}/sale_items/${productId}`);
          router.refresh();

        // Actualizar la cantidad de stock del producto
        const updatedQuantity = productStock + response;
        await axios.put(`http://localhost:3000/api/products/${productId}`, {
          product_stock_quantity: updatedQuantity,
      });

        // Actualizar localmente la cantidad de stock del producto
        setProductStock(0);

        // Actualizar la interfaz de usuario (router.refresh() puede no ser necesario)
        router.refresh();
      }

  return (
    <button
        className="text-white bg-red-500 hover:bg-red-700 py-1 px-3 rounded"
        onClick={handleDeleteAllItems}>
        Eliminar producto
      </button>
  )
}
