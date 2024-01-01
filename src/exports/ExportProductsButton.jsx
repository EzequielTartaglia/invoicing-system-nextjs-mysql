'use client'

import * as XLSX from 'xlsx';
import { dateFormat } from '@/helpers/dateFormat';

export default function ExportProductsButton({ validProducts }) {
    
    const exportProductsToExcel = () => {

      const today = dateFormat(new Date().toISOString(), 'yyyy-MM-dd');

        const filteredProducts = validProducts
        .map(product => ({
            'ID Producto': product.product_id,
            'Nombre': product.product_name,
            'Descripcion': product.product_description,
            'Categoria': product.category_name,
            'Precio': product.product_price,
            'Cantidad en stock': product.product_stock_quantity
        }));

    const ws = XLSX.utils.json_to_sheet(filteredProducts, { header: ['ID Producto', 'Nombre', 'Descripcion', 'Categoria', 'Precio', 'Cantidad en stock']});

    // Settear el ancho de las columnas
    ws['!cols'] = [
        { wch: 12 }, // ID Producto
        { wch: 12 }, // Nombre
        { wch: 12 }, // Descripcion
        { wch: 15 }, // Categoria
        { wch: 20 }, // Precio
        { wch: 20 }, // Cantidad en stock
    ];

    const wb = XLSX.utils.book_new();
    
    XLSX.utils.book_append_sheet(wb, ws, "Productos");

    XLSX.writeFile(wb, `Productos_${today}.xlsx`);
};
      
  return (
    <button
    className="text-white bg-gray-500 hover:bg-gray-700 py-2 px-5 rounded font-bold"
    onClick={exportProductsToExcel}>
    Exportar stock
  </button>
  )
}
