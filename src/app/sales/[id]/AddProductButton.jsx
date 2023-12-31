"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function AddProductButton({ saleId, productId, productIdPrice }) {
  const router = useRouter();

  const [saleItem, setSaleItem] = useState({
    sale_id: saleId,
    product_id: productId,
    quantity: 1,
    sale_item_total: productIdPrice
  });

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

  }, [productId]);

  const handleAddProduct = async () => {
    try {
      // Agregar el producto a la venta
      await axios.post(`http://localhost:3000/api/sale_items`, saleItem);

      // Actualizar la cantidad de stock del producto
      const { data } = await axios.get('/api/products/' + productId);
      const productStock = data[0].product_stock_quantity - 1;
      
      await axios.put(`http://localhost:3000/api/products/${productId}`, {
        product_stock_quantity: productStock,
      });

      // Actualizar localmente la cantidad de stock del producto
      setProductStock(0);

      // Actualizar la interfaz de usuario (router.refresh() puede no ser necesario)
      router.refresh();

      toast.success("Product added to sale", {
        position: "bottom-center",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding product to sale");
    }
  };

  return (
    <div className="flex gap-x-2 justify-end">
      <button
        className="text-white bg-gray-500 hover:bg-gray-600 py-1 px-3 rounded"
        onClick={handleAddProduct}
      >
        +
      </button>
    </div>
  );
}

export default AddProductButton;
