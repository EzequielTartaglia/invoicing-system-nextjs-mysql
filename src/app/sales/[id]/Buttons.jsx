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

  const [saleTotal, setSaleTotal] = useState({
    sale_total: 0,
  });

  useEffect(() => {
    const fetchSale = async (id) => {
      try {
        const { data } = await axios.get('/api/sales/' + id);
        setSale(data[0]);
        setSaleTotal(data[0].sale_total);
      } catch (error) {
        console.error(error);
      }
    };

    const intervalId = setInterval(() => {
      fetchSale(saleId);
    }, 100);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);

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
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px;">
            <thead>
              <tr>
              <th style="text-align:left; border-top: 2px solid #000; border-bottom: 1px solid #000; padding: 8px;">Concepto</th>
              <th style="text-align:center; border-top: 2px solid #000; border-bottom: 1px solid #000; padding: 8px;">Cant.</th>
              <th style="text-align:center; border-top: 2px solid #000; border-bottom: 1px solid #000; padding: 8px;">Neto</th>            </tr>
            </thead>
            <tbody>
              ${saleItems
                .map(
                  (item) => `
                    <tr>
                      <td style="text-align:left; padding: 8px;">${item.product_name}</td>
                      <td style="text-align:center; padding: 8px;">${item.product_sale_total_quantity}</td>
                      <td style="text-align:center; padding: 8px;">${item.product_sale_total_price}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
          </div>
          <hr style="border: 1px solid #000;margin: 10px 0;">

          <div style="text-align: center;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px;">
          <thead>
            <tr>
            <th style="text-align:left; padding-left: 160px;"></th>
            <th style="text-align:center; padding: 8px;">Total</th>
            <th style="text-align:right; padding-right: 80px;"> ${sale.sale_total}</th>
            </tr>
            </thead>
        </table>
          </div>
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