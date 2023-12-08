'use client'
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClearCart({ saleId }) {
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        const fetchSale = async (id) => {
            try {
              const { data } = await axios.get('/api/sales/' + id);
              setSale(data[0]);
            } catch (error) {
              console.error(error);
            }
          };
    
        if (params?.id) {
            fetchSale(params.id);
        }
    
      }, [params.id]);
    
  return (
    <button
    className="text-white bg-red-500 hover:bg-red-700 py-2 px-3 rounded"
    onClick={async () => {
        const res = await axios.delete("/api/sales/" + saleId + "/sale_items");
          router.refresh();
    }}
  >
    Vaciar carrito
  </button>
  )
}
