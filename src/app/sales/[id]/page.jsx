import axios from 'axios'
import Link from "next/link"; 
import toast from "react-hot-toast";
import Buttons from './Buttons';
import { dateFormat } from "@/helpers/dateFormat";


async function loadProducts() {
    const { data } = await axios.get("http://localhost:3000/api/products");
    console.log(data);
    return data;
  }

async function loadSale(saleId) {
    const { data } = await axios.get("http://localhost:3000/api/sales/" + saleId);
    console.log(data);
    // Verifica si hay datos antes de acceder a la posición 0 del array
    return data.length > 0 ? data[0] : null;
  }
  
export default async function SalesPage({ params }) {
    const products = await loadProducts();
    const sale = await loadSale(params.id);
    console.log(sale)
  
    
    // Filter valid `id` products 
    const validProducts = products.filter((product) => product.product_id !== undefined);
  
    if (validProducts.length === 0) return <h1>No se encuentran productos agregados en la base de datos.</h1>;

    return (<div>
        <div className="overflow-x-auto mb-[70px]">
        <table className="min-w-full border border-gray-300 ">
          <thead className="bg-blue-500 w-full text-white font-bold">
            <tr>
              <th className="py-3 px-6 border-b">Fecha</th>
              <th className="py-3 px-6 border-b">Usuario</th>
              <th className="py-3 px-6 border-b">Estado</th>
            </tr>
          </thead>
          <tbody>   
              <tr key={sale.product_id}  className="hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <td className="py-3 px-6 border-b text-center">{dateFormat(sale.sale_date)}</td>
                <td className="py-3 px-6 border-b text-center">{sale.user_name}</td>
                <td className="py-3 px-6 border-b text-center">{sale.sale_is_closed ? "Cerrado" : "Abierto"}</td>
              </tr>
          </tbody>
        </table>
        
      </div>

      {/* Renderiza el stock si el estado esta abierto */}
      {sale.sale_is_closed == 0 && <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 ">
        <thead className="bg-blue-500 w-full text-white font-bold">
          <tr>
            <th className="py-3 px-6 border-b">Nombre</th>
            <th className="py-3 px-6 border-b">Categoria</th>
            <th className="py-3 px-6 border-b">Precio</th>
            <th className="py-3 px-6 border-b">Unidades en stock</th>
            <th className="py-3 px-6 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {validProducts.map((product) => (
            
            <tr key={product.product_id}  className="hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <td className="py-3 px-6 border-b text-center">{product.product_name}</td>
              <td className="py-3 px-6 border-b text-center">{product.category_name}</td>
              <td className="py-3 px-6 border-b text-center">{product.product_price}</td>
              <td className="py-3 px-6 border-b text-center">{product.product_stock_quantity}</td>
              <td className="py-3 px-6 border-b text-center">
              <Link href={``} className="text-blue-500">
                Agregar
              </Link>
            </td>          
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-[50px]">
      <Buttons saleId={sale.sale_id} saleState={sale.sale_is_closed} />
        </div>

      </div>
      }


      </div>);
  }