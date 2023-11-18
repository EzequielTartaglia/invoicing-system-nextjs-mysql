"use client";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Buttons({ saleId, saleState }) {
  const router = useRouter();
  const params = useParams();

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
    <div className="flex gap-x-2 justify-end mt-2">
      <button
        className="text-white bg-red-500 hover:bg-red-700 py-2 px-3 rounded"
        onClick={async () => {
          if (confirm("¿Estas seguro que quieres eliminar esta venta?")) {
            const res = await axios.delete("/api/sales/" + saleId);
            //if (res.status === 204) {
              router.push("/sales");
              router.refresh();
            //}
          }
        }}
      >
        Eliminar
      </button>
      <button
        className="text-white bg-gray-500 hover:bg-gray-700 py-2 px-3 rounded"
        onClick={handleSubmit}
      >
        Finalizar y cerrar Venta
      </button>
    </div>
  );
}

export default Buttons;