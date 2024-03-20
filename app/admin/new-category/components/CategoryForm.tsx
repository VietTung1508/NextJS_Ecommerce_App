"use client";
import Button from "@/app/components/Button";
import axios from "axios";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CategoryForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
    },
  });

  const router = useRouter();

  const addCategory: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/newCategory", { data: data.name, isSub: false })
      .then(() => {
        router.push("/admin/categories");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Fail to create new category");
      })
      .finally(() => {
        setIsLoading(false);
        reset({
          name: "",
          children: {
            id: "",
            name: "",
          },
        });
      });
  };

  return (
    <form
      className="w-2/5 bg-white p-8 flex flex-col gap-4 mb-6"
      onSubmit={handleSubmit(addCategory)}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="categoryName">Category Name</label>
        <input
          className="py-1 px-2 border-gray-300 border-2"
          {...register("name")}
          placeholder="Category Name"
          id="categoryName"
          required
          disabled={isLoading}
        />
      </div>
      <Button disabled={isLoading} type="submit" fullWidth>
        Add Category
      </Button>
    </form>
  );
};
export default CategoryForm;
