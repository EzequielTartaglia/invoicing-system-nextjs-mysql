"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";

export function SaleForm() {
  
  const [sale, setSale] = useState({
    user_id: 1,
    sale_date: new Date().toISOString().split('T')[0],
    sale_total: 0,
    sale_is_closed: 0,
  });
  
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

  const handleChange = ({ target: { name, value } }) =>
  setSale({ ...sale, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (params?.id) {
        await axios.put("/api/sales/" + params.id, {
          sale_date: sale.sale_date,
          sale_total: sale.sale_total,
          sale_is_closed: sale.sale_is_closed,
        });

        toast.success("Task Updated", {
          position: "bottom-center",
        });
      } else {
        await axios.post("/api/sales", sale);

        toast.success("Task Saved", {
          position: "bottom-center",
        });
      }

      router.refresh();
      router.push("/sales");
    } catch (error) {
      toast.error(error.response.data.message);
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
            htmlFor="sale_date"
          >
            
            Fecha
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            type="date"
            placeholder="Ingrese un fecha"
            id="sale_date"
            name="sale_date"
            onChange={handleChange}
            value={sale.sale_date}
            autoComplete="off"
            autoFocus
          />
        </div>

        <div className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {params?.id ? "Actualizar venta" : "Agregar venta"}
        </button>
        </div>
      </form>
    </div>
  );
}