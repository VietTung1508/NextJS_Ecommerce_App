import { revalidatePath } from "next/cache";
import AdminProduct from "./components/AdminProduct";
import getAllProducts from "@/app/actions/getAllProducts";

const Products = async () => {
  const allProducts = await getAllProducts();
  
  return (
    <div>
      <AdminProduct products={allProducts} />
    </div>
  );
};

export default Products;
