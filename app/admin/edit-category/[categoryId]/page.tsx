import getCategories from "@/app/actions/getCategories";
import EditForm from "./components/EditForm";
import { getDetailCategory } from "@/app/actions/getDetailCategory";
import React from "react";

const Page = async ({ params }: { params: { categoryId: string } }) => {
  const category = await getDetailCategory(params.categoryId);
  console.log(params.categoryId);
  console.log(category);
  return (
    <div className="px-3">
      <h1 className="text-center my-5 text-3xl font-semibold">Edit Category</h1>
      <div className="w-full h-full flex justify-center items-center">
        {
          //@ts-ignore
          <EditForm category={category || null} />
        }
      </div>
    </div>
  );
};

export default Page;
