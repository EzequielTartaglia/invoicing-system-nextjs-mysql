'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TotalSalePrice({ saleId }) {
  const router = useRouter();

  const [saleTotal, setSaleTotal] = useState({
    sale_total: 0,
  });

  useEffect(() => {
    const fetchSale = async (id) => {
      try {
        const { data } = await axios.get('/api/sales/' + id);
        setSaleTotal(data[0].sale_total);
      } catch (error) {
        console.error(error);
      }
    };

    const intervalId = setInterval(() => {
      fetchSale(saleId);
    }, 1);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);

  }, [saleId, router]);

  return (
    <div className="">
      Total: {saleTotal !== 0 ? `$ ${saleTotal}` : 'Esperando...'}
    </div>
  );
}
