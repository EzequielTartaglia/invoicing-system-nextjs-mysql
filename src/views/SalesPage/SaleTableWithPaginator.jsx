"use client";
import Link from "next/link";
import { dateFormat } from "@/helpers/dateFormat";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

export default function SaleTableWithPaginator({ validSales }) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleSales = validSales.slice(startIndex, endIndex);

  const totalPages = Math.ceil(validSales.length / itemsPerPage);

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
    <div>
      <div className="overflow-x-auto mt-0">
        <table className="min-w-full border border-gray-300 ">
          <thead className="bg-blue-500 w-full text-white font-bold">
            <tr>
              <th className="py-3 px-6 border-b">Fecha</th>
              <th className="py-3 px-6 border-b">Usuario</th>
              <th className="py-3 px-6 border-b">Total</th>
              <th className="py-3 px-6 border-b">Estado</th>
              <th className="py-3 px-6 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visibleSales.map((sale) => (
              <tr
                key={sale.sale_id}
                className="hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <td className="py-3 px-6 border-b text-center">
                  {dateFormat(sale.sale_date)}
                </td>

                <td className="py-3 px-6 border-b text-center">
                  {sale.user_name}
                </td>
                <td className="py-3 px-6 border-b text-center">
                  {sale.sale_total}
                </td>
                <td className="py-3 px-6 border-b text-center">
                  {sale.sale_is_closed ? "Cerrado" : "Abierto"}
                </td>
                <td className="py-3 px-6 border-b text-center">
                  <Link
                    href={`/sales/${sale.sale_id}`}
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
    </div>
  );
}
