"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";

export function SaleForm() {
  const [sale, setSale] = useState({
    user_id: 1,
    sale_date: Date.now(),
    sale_total: null,
    sale_is_closed: false,
  });
  
  const router = useRouter();
  const params = useParams();

  const [categories, setCategories] = useState([]); // Nuevo estado para las categorías

useEffect(() => {

    const fetchSale = async (id) => {
      try {
        const { data } = await axios.get('/api/sales/' + id);
        setSale(data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    
    const fetchProduct = async (id) => {
      try {
        const { data } = await axios.get('/api/products/' + id);
        setProduct(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/categories'); 
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (params?.id) {
      fetchSale(params.id);
    }

    fetchCategories(); 
  }, [params.id]);

  const handleChange = ({ target: { name, value } }) =>
    setProduct({ ...sale, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (params?.id) {
        await axios.put("/api/sale/" + params.id, {
          sale_date: sale.sale_date,
          sale_total: sale.sale_total,
          sale_is_closed: sale.sale_is_closed,
        });

        toast.success("Task Updated", {
          position: "bottom-center",
        });
      } else {
        await axios.post("/api/sale", product);

        toast.success("Task Saved", {
          position: "bottom-center",
        });
      }

      router.refresh();
      router.push("/products");
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
            type="text"
            placeholder="Ingrese un fecha"
            id="sale_date"
            name="sale_date"
            onChange={handleChange}
            value={sale.sale_date}
            autoComplete="off"
            autoFocus
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="sale_total"
            className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
          >
            Total de venta
          </label>
          <input
            name="sale_total"
            type="number"
            id="sale_total"
            rows="3"
            placeholder="Ingrese el total"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            onChange={handleChange}
            value={sale.sale_total}
          ></input>
        </div>

        <div className="mb-4">
          <label
            htmlFor="sale_is_closed"
            className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
          >
            Finalizada:
          </label>
          <select
          type="select"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
          id="sale_is_closed"
          name="sale_is_closed"
          placeholder="¿La venta ha sido ejecutada?"
          onChange={handleChange}
          value={sale.sale_is_closed}
        >
          <option value="" disabled selected>
            Selecciona una condición
          </option>
          <option value={true}>Cerrada</option>
          <option value={false}>No finalizada</option>
        </select>

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