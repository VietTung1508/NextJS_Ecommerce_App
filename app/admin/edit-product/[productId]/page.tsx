import getCategories from "@/app/actions/getCategories";
import { getDetailBook } from "@/app/actions/getDetailBook";
import EditForm from "./components/EditForm";
import { AiOutlineLeft } from "react-icons/ai";
import Link from "next/link";

const EditProduct = async ({ params }: { params: { productId: string } }) => {
  const categories = await getCategories();
  const product = await getDetailBook(params.productId);

  return (
    <div className="px-3">
      <h1 className="text-center my-5 text-3xl font-semibold">Edit Product</h1>
      <div className="w-full h-full flex justify-center items-center">
        {
          // @ts-ignore
          <EditForm product={product || null} categories={categories} />
        }
      </div>
    </div>
  );
};

export default EditProduct;
