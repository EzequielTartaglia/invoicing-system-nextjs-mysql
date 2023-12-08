'use client'
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteAllProductIdButton({ saleId, productId }) {
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
        className="text-white bg-red-500 hover:bg-red-700 py-1 px-3 rounded"
        onClick={async () => {
            const res = await axios.delete(`http://localhost:3000/api/sales/${saleId}/sale_items/${productId}`);
              router.refresh();
        }}
      >
        vaciar
      </button>
  )
}
