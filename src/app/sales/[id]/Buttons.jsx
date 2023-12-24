"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ClearCart from "./ClearCart";
import CreateSaleButton from "../CreateSaleButton";

function Buttons({ saleId, saleItems}) {
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

  const printSaleTicket = () => {
    const printContent = `
      <html>
        <head>
          <title>Ticket</title>
        </head>
        <body style="font-family: 'Arial', sans-serif;background-color: #fff;margin: 10mm;font-size: 14px;">
          <h1 style="text-align: center;font-size: 24px;margin-bottom: 10px;">Sistema de gestion</h1>
          <hr style="border: 1px solid #000;margin: 10px 0;">
          <div style="text-align: center;">
            <h2 style="font-size: 18px;margin-bottom: 10px;">TICKET N°${saleId}</h2>
            <ul style="list-style-type: none;padding: 0;">
              ${saleItems
                .map(
                  (item) =>
                    `<li style="margin-bottom: 5px;">${item.product_name} - ${item.product_sale_total_quantity} unidades</li>`
                )
                .join("")}
            </ul>
          </div>
          <hr style="border: 1px solid #000;margin: 10px 0;">
        </body>
      </html>
    `;
  
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    iframe.contentDocument.write(printContent);
    iframe.contentDocument.close();

    iframe.contentWindow.print();

    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000); 

  };
  
  

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
  
        <CreateSaleButton buttonColor={'bg-red-500 hover:bg-red-700'} onClick={async() => {  
          if (confirm("¿Estás seguro que quieres eliminar esta venta?")) {
            const res = await axios.delete("/api/sales/" + saleId);
            //if (res.status === 204) {
            router.push("/sales");
            router.refresh();
            //}
          };
      }} text={"Eliminar venta"}/>
      
      <button
        className="text-white bg-gray-500 hover:bg-gray-700 py-2 px-5 rounded"
        onClick={handleSubmit}
      >
        Cerrar venta
      </button>

      <CreateSaleButton  onClick={async() => {  
      await axios.put("/api/sales/" + saleId, {
        sale_is_closed: 1,
      });
      await router.refresh();
      //Print ticket
      await printSaleTicket();
      }} 
      text={"Finalizar e iniciar nueva venta"}/>
    </div>
  );
  
}

export default Buttons;