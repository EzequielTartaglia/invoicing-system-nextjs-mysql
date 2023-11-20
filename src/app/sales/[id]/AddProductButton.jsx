"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function AddProductButton({ saleId, productId, productIdPrice }) {
  
  //console.log(saleId,productId,productIdPrice)
  const router = useRouter();

  const [saleItem, setSaleItem] = useState({
    sale_id: saleId,
    product_id: productId,
    quantity: 1,
    sale_item_total: productIdPrice
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post(`http://localhost:3000/api/sale_items`, saleItem)
        console.log(saleItem)
        router.refresh();
  
        toast.success("Product added to sale", {
            position: "bottom-center",
          });
        } 
     catch (error) {
      toast.error(error.response.data.message);
    }
  };


  return (
    <div className="flex gap-x-2 justify-end mt-2">
      <button
        className="text-white bg-gray-500 hover:bg-gray-700 py-2 px-3 rounded"
        onClick={handleSubmit}
      >
        Agregar
      </button>
    </div>
  );
}

export default AddProductButton;

