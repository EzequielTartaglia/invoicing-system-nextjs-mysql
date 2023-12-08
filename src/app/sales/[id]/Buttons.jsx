"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ClearCart from "./ClearCart";

function Buttons({ saleId }) {
  const router = useRouter();

  const [sale, setSale] = useState({
    sale_is_closed: 0,
  });

useEffect(() => {
    const fetchSale = async (id) => {
        try {
          const { data } = await axios.get('/api/sales/' + id);
          setSale(data[0]);
        } catch (error) {
          console.error(error);
        }
      };

    if (saleId) {
        fetchSale(saleId);
    }

  }, [saleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (saleId) {
        await axios.put("/api/sales/" + saleId, {
            sale_is_closed: 1,
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
    <div className="flex justify-between items-center gap-x-2 mt-2">
  
      <ClearCart saleId={saleId} />
  
      <button
        className="text-white bg-red-500 hover:bg-red-700 py-2 px-3 rounded"
        onClick={async () => {
          if (confirm("¿Estás seguro que quieres eliminar esta venta?")) {
            const res = await axios.delete("/api/sales/" + saleId);
            //if (res.status === 204) {
            router.push("/sales");
            router.refresh();
            //}
          }
        }}
      >
        Eliminar venta
      </button>
  
      <button
        className="text-white bg-gray-500 hover:bg-gray-700 py-2 px-5 rounded"
        onClick={handleSubmit}
      >
        Cerrar venta
      </button>

      <button
        className="text-white bg-gray-500 hover:bg-gray-700 py-2 px-5 rounded"
        onClick={handleSubmit}
      >
        Finalizar e iniciar nueva venta
      </button>
    </div>
  );
  
}

export default Buttons;