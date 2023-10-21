import axios from "axios";
import { ProductCard } from "../../src/components/ProductCard";

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

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
      {validProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsPage;
