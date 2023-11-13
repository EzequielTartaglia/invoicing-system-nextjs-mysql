import axios from "axios";
import { SaleForm } from "@/components/SaleForm";

function AddSalesPage() {
  return (
    <div className="h-5/6 grid place-items-center">
      <SaleForm />
    </div>
  );
}
export default AddSalesPage;

export const getServerSideProps = async (context) => {
  const res = await axios.get("http://localhost:3000/api/sales");

  return {
    props: {
      products: res.data,
    },
  };
};