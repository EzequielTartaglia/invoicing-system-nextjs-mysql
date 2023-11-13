import axios from "axios";
import Link from "next/link"; 
import Button from "@/components/Button";

async function loadProduct() {
  const { data } = await axios.get("http://localhost:3000/api/products");
  console.log(data);
  return data;
}

async function ProductsPage() {
  const products = await loadProduct();

  // Filter valid `id` products 
  const validProducts = products.filter((product) => product.product_id !== undefined);

  if (validProducts.length === 0) {
    return (
      <div className="h-5/6 grid place-items-center">
        <div className="overflow-x-auto mt-[70px]">
          <h1 className="mb-4 text-center">No se encuentran productos agregadas en la base de datos.</h1>
        </div>
        <div className="items-center mt-[50px]">
          <Button href="/products/new" text="Agregar" />
        </div>
      </div>
    );
  }

  return (<div>
    <div className="py-2 flex justify-end items-center">
      <Button href="/products/new" text="Agregar" />
    </div>

   <div className="container mx-auto flex justify-between items-center">  
  </div>

    <div className="overflow-x-auto">
  <table className="min-w-full border border-gray-300 ">
    <thead className="bg-blue-500 w-full text-white font-bold">
      <tr>
        <th className="py-3 px-6 border-b">Nombre</th>
        <th className="py-3 px-6 border-b">Descripción</th>
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
          <td className="py-3 px-6 border-b text-center">{product.product_description}</td>
          <td className="py-3 px-6 border-b text-center">{product.category_name}</td>
          <td className="py-3 px-6 border-b text-center">{product.product_price}</td>
          <td className="py-3 px-6 border-b text-center">{product.product_stock_quantity}</td>
          <td className="py-3 px-6 border-b text-center">
          <Link href={`/products/${product.product_id}`} className="text-blue-500">
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

export default ProductsPage;
