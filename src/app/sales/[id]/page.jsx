import axios from 'axios'
import Link from "next/link"; 

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
  
    return (<div>
  
      <div className="overflow-x-auto">
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
  </div>

  <div className="overflow-x-auto mt-[70px]">
    <table className="min-w-full border border-gray-300 ">
      <thead className="bg-blue-500 w-full text-white font-bold">
        <tr>
          <th className="py-3 px-6 border-b">Nombre</th>
          <th className="py-3 px-6 border-b">Categoria</th>
          <th className="py-3 px-6 border-b">Cantidad</th>
          <th className="py-3 px-6 border-b">Precio</th>
          <th className="py-3 px-6 border-b">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {validSales.map((productInCart) => (
          
          <tr key={productInCart.product_id}  className="hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <td className="py-3 px-6 border-b text-center">{productInCart.product_name}</td>
            <td className="py-3 px-6 border-b text-center">{productInCart.product_price}</td>
            <td className="py-3 px-6 border-b text-center">1</td>
            <td className="py-3 px-6 border-b text-center">{productInCart.purchase_total}</td>
            <td className="py-3 px-6 border-b text-center">
            <Link href={``} className="text-blue-500">
              Eliminar
            </Link>
          </td>          
          </tr>
        ))}
      </tbody>
      <tfoot className="min-w-full py-3 flex justify-center text-end">
        TOTAL: 0
      </tfoot>
    </table>
    
  </div>
  
      </div>);
  }
