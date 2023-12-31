import axios from "axios";
import CreateSaleButton from "../../app/sales/CreateSaleButton";
import SaleTableWithPaginator from "./SaleTableWithPaginator";
import ExportSalesButton from "./ExportSalesButton";

async function loadProduct() {
    const { data } = await axios.get("http://localhost:3000/api/products");
    //console.log(data);
    return data;
  }

  async function loadSales() {
    const { data } = await axios.get("http://localhost:3000/api/sales");
    //console.log(data);
    return data;
  }
  
export default async function SalesPage() {
    const products = await loadProduct();
    const sales = await loadSales();
  
    // Ordenar ventas por fecha (de la más actual a la más antigua)
    sales.sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date));


    const validProducts = products.filter((product) => product.product_id !== undefined);
    const validSales = sales.filter((sale) => sale.sale_id !== undefined);
  
    if (validProducts.length === 0) return <h1>No se encuentran productos agregados en la base de datos.</h1>;
    
    if (validSales.length === 0) {
      return (
        <div className="h-5/6 grid place-items-center">
          <div className="overflow-x-auto mt-[70px]">
            <h1 className="mb-0 text-center">No se encuentran ventas agregadas en la base de datos.</h1>
          </div>
          <div className="items-center mt-[50px]">
            <CreateSaleButton text={"Agregar"}/>
          </div>
        </div>
      );
    }
    


    return (
    <div>

      <div className="flex justify-between items-center mb-3">
      <ExportSalesButton validSales={validSales}/>

      <CreateSaleButton text={"Agregar"}/>
      </div>

      <SaleTableWithPaginator validSales={validSales}/>

    </div>);
  }
