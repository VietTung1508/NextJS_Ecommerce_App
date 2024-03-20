import getCategories from "@/app/actions/getCategories";
import ProductForm from "./components/ProductForm";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

const newProduct = async () => {
  const categories = await getCategories();
  return (
    <div className="bg-gray-200">
      <div className="flex items-center gap-3 p-4 mb-5 bg-gray-100">
        <Link href="/admin/products" className="p-2 bg-white rounded-sm">
          <FaArrowLeftLong />
        </Link>
        <div>
          <h3 className="text-xs opacity-70">Back To List</h3>
          <h1 className="text-lg font-bold">New Product</h1>
        </div>
      </div>
      <div className="px-3 max-w-screen-xl">
        <div className="w-full h-screen flex justify-start items-start">
          <ProductForm categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default newProduct;
