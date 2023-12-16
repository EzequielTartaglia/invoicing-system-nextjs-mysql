"use client";

import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

export default function ProductTableWithPaginator({ validProducts }) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts = validProducts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(validProducts.length / itemsPerPage);

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 ">
          <thead className="bg-blue-500 w-full text-white font-bold">
            <tr>
              <th className="py-3 px-6 border-b">Nombre</th>
              <th className="py-3 px-6 border-b">Categoria</th>
              <th className="py-3 px-6 border-b">Precio</th>
              <th className="py-3 px-6 border-b">Cantidad</th>
              <th className="py-3 px-6 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visibleProducts.map((product) => (
              <tr
                key={product.product_id}
                className="hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <td className="py-3 px-6 border-b text-center">
                  {product.product_name}
                </td>

                <td className="py-3 px-6 border-b text-center">
                  {product.category_name}
                </td>
                <td className="py-3 px-6 border-b text-center">
                  {product.product_price}
                </td>
                <td className="py-3 px-6 border-b text-center">
                  {product.product_stock_quantity}
                </td>
                <td className="py-3 px-6 border-b text-center">
                  <Link
                    href={`/products/${product.product_id}`}
                    className="text-blue-500"
                  >
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <button
            onClick={goToFirstPage}
            className={`mx-2 ${
              currentPage === 1
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700 text-white font-bold"
            } py-1 px-2 rounded focus:outline-none focus:shadow-outline`}
          >
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </button>

          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`mx-2 ${
              currentPage === 1
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700 text-white font-bold"
            } py-1 px-2 rounded focus:outline-none focus:shadow-outline`}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
        </div>

        <span>
          {currentPage}/{totalPages}
        </span>

        <div>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`mx-2 ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700 text-white font-bold"
            } py-1 px-2 rounded focus:outline-none focus:shadow-outline`}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>

          <button
            onClick={goToLastPage}
            className={`mx-2 ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700 text-white font-bold"
            } py-1 px-2 rounded focus:outline-none focus:shadow-outline`}
          >
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </button>
        </div>
      </div>
    </>
  );
}
