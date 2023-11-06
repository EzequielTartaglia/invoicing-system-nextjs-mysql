import axios from "axios";
import { ProductCard } from "@/components/ProductCard";
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

  if (validProducts.length === 0) return <h1>No Products</h1>;

  return (<div>
    <div className="py-2 flex justify-end items-center">
      <Button href="/products/new" text="Agregar" />
    </div>

   <div className="container mx-auto flex justify-between items-center">  
  </div>
    <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
      {validProducts.map((product) => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
    
    </div>);
}

export default ProductsPage;
