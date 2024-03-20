import getCategories from "@/app/actions/getCategories";
import CategoryForm from "./components/CategoryForm";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

const NewCategory = async () => {
  return (
    <div className="bg-gray-200">
      <div className="flex items-center gap-3 p-4 mb-4 bg-gray-100">
        <Link href="/admin/categories" className="p-2 bg-white rounded-sm">
          <FaArrowLeftLong />
        </Link>
        <div>
          <h3 className="text-xs opacity-70">Back To List</h3>
          <h1 className="text-lg font-bold">New Category</h1>
        </div>
      </div>
      <div className=" px-3 max-w-screen-xl">
        <div className="w-full h-screen flex justify-start items-start">
          <CategoryForm />
        </div>
      </div>
    </div>
  );
};

export default NewCategory;
