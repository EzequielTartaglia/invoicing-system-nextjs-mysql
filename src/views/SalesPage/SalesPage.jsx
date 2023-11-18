import axios from "axios";
import Link from "next/link"; 
import Button from "@/components/Button";
import { dateFormat } from "@/helpers/dateFormat";

async function loadProduct() {
    const { data } = await axios.get("http://localhost:3000/api/products");
    console.log(data);
    return data;
  }

  async function loadSales() {
    const { data } = await axios.get("http://localhost:3000/api/sales");
    console.log(data);
    return data;
  }
  
export default async function SalesPage() {
    const products = await loadProduct();
    const sales = await loadSales();
  
    
    // Filter valid `id` products 
    const validProducts = products.filter((product) => product.product_id !== undefined);
    const validSales = sales.filter((sale) => sale.sale_id !== undefined);
  
    if (validProducts.length === 0) return <h1>No se encuentran productos agregados en la base de datos.</h1>;
    
    if (validSales.length === 0) {
      return (
        <div className="h-5/6 grid place-items-center">
          <div className="overflow-x-auto mt-[70px]">
            <h1 className="mb-4 text-center">No se encuentran ventas agregadas en la base de datos.</h1>
          </div>
          <div className="items-center mt-[50px]">
            <Button href="/sales/new" text="Agregar" />
          </div>
        </div>
      );
    }
    
    return (<div>

      <div className="py-2 flex justify-end items-center">
      <Button href="/sales/new" text="Agregar" />
    </div>

  <div className="overflow-x-auto mt-[20px]">
    <table className="min-w-full border border-gray-300 ">
      <thead className="bg-blue-500 w-full text-white font-bold">
        <tr>
          <th className="py-3 px-6 border-b">Fecha</th>
          <th className="py-3 px-6 border-b">Usuario</th>
          <th className="py-3 px-6 border-b">Total</th>
          <th className="py-3 px-6 border-b">Estado</th>
          <th className="py-3 px-6 border-b">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {validSales.map((sale) => (
          
          <tr key={sale.sale_id}  className="hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <td className="py-3 px-6 border-b text-center">{dateFormat(sale.sale_date)}</td>
            <td className="py-3 px-6 border-b text-center">{sale.user_name}</td>
            <td className="py-3 px-6 border-b text-center">{sale.sale_total}</td>
            <td className="py-3 px-6 border-b text-center">{sale.sale_is_closed ? "Cerrado" : "Abierto"}</td>
            <td className="py-3 px-6 border-b text-center">
            <Link href={`/sales/${sale.sale_id}`} className="text-blue-500">
            Ver
          </Link>
          </td>          
          </tr>
        ))}
      </tbody>
    </table>
    
  </div>
  
      </div>);
  }
