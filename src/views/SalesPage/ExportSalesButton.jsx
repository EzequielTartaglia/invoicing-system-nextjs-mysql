'use client'
import React from 'react'
import { dateFormat } from '@/helpers/dateFormat';
import * as XLSX from 'xlsx'; // Import the XLSX object

export default function ExportSalesButton({ validSales }) {
    
    const exportSalesToExcel = () => {
        const today = dateFormat(new Date().toISOString().split('T')[0]);

        const filteredSales = validSales
        .filter((sale) => dateFormat(sale.sale_date.split('T')[0]) === today)
        .map(sale => ({
            'ID Venta': sale.sale_id,
            'Fecha Venta': dateFormat(sale.sale_date.split('T')[0]),
            'Total Venta': sale.sale_total,
            'Venta Cerrada': sale.sale_is_closed === 1 ? 'Cerrado' : 'Abierto',
            'Nombre Usuario': sale.user_name,
            'Apellido Usuario': sale.user_last_name
        }));

    const ws = XLSX.utils.json_to_sheet(filteredSales, { header: ['ID Venta', 'Fecha Venta', 'Hora Venta', 'Total Venta', 'Venta Cerrada', 'Nombre Usuario', 'Apellido Usuario'] });
    
    // Settear el ancho de las columnas
    ws['!cols'] = [
        { wch: 12 }, // ID Venta
        { wch: 12 }, // Fecha Venta
        { wch: 12 }, // Total Venta
        { wch: 15 }, // Venta Cerrada
        { wch: 20 }, // Nombre Usuario
        { wch: 20 }, // Apellido Usuario
    ];


    const wb = XLSX.utils.book_new();
    
    XLSX.utils.book_append_sheet(wb, ws, "Ventas");

    XLSX.writeFile(wb, `Ventas_${today}.xlsx`);
};
      
  return (
    <button
    className="text-white bg-gray-500 hover:bg-gray-700 py-2 px-5 rounded"
    onClick={exportSalesToExcel}>
    Exportar ventas del hoy
  </button>
  )
}
