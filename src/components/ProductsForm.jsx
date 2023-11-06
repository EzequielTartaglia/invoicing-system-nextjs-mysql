"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";

export function ProductForm() {
  const [product, setProduct] = useState({
    product_name: "",
    product_description: "",
    category_id: 0,
    product_price: 0,
    product_stock_quantity: 0
  });
  
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async (id) => {
      try {
        const { data } = await axios.get("/api/products/" + id);
        setProduct(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    if (params?.id) {
      fetchProduct(params.id);
    }
  }, [params.id]);

  const handleChange = ({ target: { name, value } }) =>
    setProduct({ ...product, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (params?.id) {
        await axios.put("/api/products/" + params.id, {
          product_name: product.product_name,
          product_description: product.product_description,
          product_price: product.product_price,
          category_id: product.category_id,
          product_stock_quantity: product.product_stock_quantity
        });

        toast.success("Task Updated", {
          position: "bottom-center",
        });
      } else {
        await axios.post("/api/products", product);

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
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            type="text"
            placeholder="Ingrese un nombre"
            id="name"
            name="product_name"
            onChange={handleChange}
            value={product.product_name}
            autoComplete="off"
            autoFocus
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="description"
            className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
          >
            Descripcion
          </label>
          <textarea
            name="product_description"
            id="description"
            rows="3"
            placeholder="Ingrese una descripcion"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            onChange={handleChange}
            value={product.product_description}
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="category_id"
            className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
          >
            Categoria:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            name="category_id"
            placeholder="Categoria"
            onChange={handleChange}
            value={product.category_id}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="product_price"
            className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
          >
            Precio por unidad:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            name="product_price"
            placeholder="10.00"
            onChange={handleChange}
            value={product.product_price}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="product_stock_quantity"
            className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
          >
            Cantidad en stock:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            name="product_stock_quantity"
            placeholder="Cantidad en stock"
            onChange={handleChange}
            value={product.product_stock_quantity}
          />
        </div>

        <div className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {params?.id ? "Actualizar producto" : "Agregar producto"}
        </button>
        </div>
      </form>
    </div>
  );
}