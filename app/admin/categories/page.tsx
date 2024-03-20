import getCategories from "@/app/actions/getCategories";
import AdminCategory from "./components/AdminCategory";
import { revalidatePath } from "next/cache";
// import CategoryTable from "./components/CategoryTable";

const Categories = async () => {
  const categories = await getCategories();
  return (
    <div>
      <AdminCategory categories={categories} />
    </div>
  );
};

export default Categories;
