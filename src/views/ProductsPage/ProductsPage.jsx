import axios from "axios";
import ProductTableWithPaginator from "./ProductTableWithPaginator";
import Button from "@/components/Button";
import ExportProductsButton from "@/exports/ExportProductsButton";

async function loadProduct() {
  const { data } = await axios.get("http://localhost:3000/api/products");
  //console.log(data);
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
    </div>

    <div className="flex justify-between items-center mb-3">
      <ExportProductsButton validProducts={validProducts}/>

      <Button href="/products/new" text="Agregar" />
      </div>

   <div className="container mx-auto flex justify-between items-center">  
  </div>

  <ProductTableWithPaginator validProducts={validProducts}/>
   
    </div>);
}

export default ProductsPage;
