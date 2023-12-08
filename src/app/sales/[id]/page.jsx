import axios from 'axios'
import Buttons from './Buttons';
import AddProductButton from './AddProductButton';
import { dateFormat } from "@/helpers/dateFormat";
import DeleteAllProductIdButton from './DeleteAllProductIdButton';
import TotalSalePrice from './TotalSalePrice';

async function loadProducts() {
    const { data } = await axios.get("http://localhost:3000/api/products");
    console.log(data);
    return data.length > 0 ? data : [];
  }

async function loadSale(saleId) {
    const { data } = await axios.get(`http://localhost:3000/api/sales/${saleId}`);
    console.log(data);
    // Verifica si hay datos antes de acceder a la posición 0 del array
    return data.length > 0 ? data[0] : [];
  }

async function loadSaleItems(saleId) {
    const { data } = await axios.get(`http://localhost:3000/api/sales/${saleId}/sale_items`);
    console.log(data);
    // Verifica si hay datos antes de acceder a la posición 0 del array
    return data.length > 0 ? data : [];
  }

export default async function SalesPage({ params }) {
    const products = await loadProducts();
    const sale = await loadSale(params.id);
    const saleItems = await loadSaleItems(params.id);
    
    console.log(sale)
    console.log(saleItems)
    
    // Filter valid `id` products 
    const validProducts = products.filter((product) => product.product_id !== undefined);
    const validSaleItems = saleItems.filter((sale_item) => sale_item.product_id !== undefined);
  
    if (validProducts.length === 0) return <h1>No se encuentran productos agregados en la base de datos.</h1>;

    return (<div>
        <div className="overflow-x-auto mb-[70px]">
        <table className="min-w-full border border-gray-300 ">
          <thead className="bg-blue-500 w-2 text-white font-bold">
            <tr>
              <th className="py-1 px-6 border-b">Fecha</th>
              <th className="py-1 px-6 border-b">Usuario</th>
            </tr>
          </thead>
          <tbody>   
              <tr key={sale.product_id}  className="hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <td className="py-1 px-6 border-b text-center">{dateFormat(sale.sale_date)}</td>
                <td className="py-1 px-6 border-b text-center">{sale.user_name}</td>
              </tr>
          </tbody>
        </table>
        
      </div>

      {/* Renderiza el stock si el estado esta abierto */}
      {sale.sale_is_closed == 0 && <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 ">
        <thead className="bg-blue-500 w-full text-white font-bold">
          <tr>
            <th className="py-1 px-6 border-b">Nombre</th>
            <th className="py-1 px-6 border-b">Categoria</th>
            <th className="py-1 px-6 border-b">Precio</th>
            <th className="py-1 px-6 border-b">Unidades en stock</th>
            <th className="py-1 px-6 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {validProducts.map((product) => (
            
            <tr key={product.product_id}  className="hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <td className="py-1 px-6 border-b text-center">{product.product_name}</td>
              <td className="py-1 px-6 border-b text-center">{product.category_name}</td>
              <td className="py-1 px-6 border-b text-center">{product.product_price}</td>
              <td className="py-1 px-6 border-b text-center">{product.product_stock_quantity}</td>
              <td className="py-1 px-6 border-b text-center">
              <AddProductButton saleId={sale.sale_id} productId={product.product_id} productIdPrice={product.product_price} />
            </td>          
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      }

      <table className="min-w-full border border-gray-300 mt-[40px]">
        <thead className="bg-blue-500 w-full text-white font-bold">
          <tr>
            <th className="py-1 px-6 border-b">Nombre</th>
            <th className="py-1 px-6 border-b">Categoria</th>
            <th className="py-1 px-6 border-b">Cantidad</th>
            <th className="py-1 px-6 border-b">Precio</th>
            <th className="py-1 px-6 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            (validSaleItems.length === 0) 
            ? <tr> <td className="py-1 px-6 border-b text-center"> No se han agregados items a la venta.</td> </tr>
            : validSaleItems.map((sale_item) => (
            <tr key={sale_item.product_id}  className="hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
              <td className="py-1 px-6 border-b text-center">{sale_item.product_name}</td>
              <td className="py-1 px-6 border-b text-center">{sale_item.category_name}</td>
              <td className="py-1 px-6 border-b text-center">{sale_item.product_sale_total_quantity}</td>
              <td className="py-1 px-6 border-b text-center">{sale_item.product_sale_total_price}</td>
              <td className="py-1 px-6 border-b text-center">
              <DeleteAllProductIdButton saleId={sale_item.sale_id} productId={sale_item.product_id}/>
              </td>          
            </tr>
          ))
          }
          <td className="py-1 px-6 border-b text-end"> <TotalSalePrice saleId={sale.sale_id} /> </td>
        </tbody>
      </table>

      {sale.sale_is_closed == 0 &&        
        <div className="flex justify-center mt-[50px]">
          <Buttons saleId={sale.sale_id} />
        </div>
      }
      
      </div>);
  }
