import axios from "axios";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";

async function loadProduct() {
  const { data } = await axios.get("http://localhost:3000/api/products");
  console.log(data);
  return data;
}

async function ProductsPage() {
  const products = await loadProduct();

  // Filter valid `id` products 
  const validProducts = products.filter((product) => product.id !== undefined);

  if (validProducts.length === 0) return <h1>No Products</h1>;

  return (<div>
   <div className="container mx-auto flex justify-between items-center">
    <ul className="">
    <li>
      <Link href="/products/new" className="text-sky-500 hover:text-sky-400">
        Agregar
      </Link>
    </li>
  </ul>
  </div>
    <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
      {validProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    </div>);
}

export default ProductsPage;
