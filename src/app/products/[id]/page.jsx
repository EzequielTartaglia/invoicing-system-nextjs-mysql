import axios from 'axios'
import Buttons from "./Buttons";


async function loadProduct(productID){
  const { data } = await axios.get("http://localhost:3000/api/products/"+ productID);
  return data[0]
}

async function ProductPage({ params }) {
  const product = await loadProduct(params.id);
  console.log(product)
  return (
    <div className="md:min-w-[400px] lg:min-w-[600px]">
      <div className="p-6 bg-gray-800 text-white rounded-lg">
        <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
        <h4 className="text-4xl font-bold">${product.price}</h4>
        <p className="text-gray-300">{product.description}</p>
        <Buttons productId={product.id} />
      </div>
    </div>
  );
}

export default ProductPage;

