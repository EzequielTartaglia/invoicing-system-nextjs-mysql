import Link from "next/link";

export function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.product_id}`}
      className="md:min-w-[400px] lg:min-w-[600px] h-[150px] block p-6 bg-white rounded-lg border border-gray-600 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 mb-3"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {product.product_name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-200">
        {product.category_name}
      </p>
      <p className="font-bold text-gray-800 dark:text-gray-100 text-2xl">
        {product.product_price} $
      </p>

    </Link>
  );
}