import axios from 'axios'

async function loadProduct(productID){
  const { data } = await axios.get("http://localhost:3000/api/products/"+ productID);
  return data
}


export default async function productID({ params }) {
  const product = await loadProduct(params.id);
  console.log(product)
  
  return (
    <div>
      {product ? (
        <>
          <div>Product ID: {product.id}</div>
          <div>Product Name: {product.name}</div>
          {/* Add more product details as needed */}
        </>
      ) : (
        <p>Loading product data...</p>
      )}
    </div>
  );
}