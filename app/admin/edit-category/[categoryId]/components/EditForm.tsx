"use client";

import Button from "@/app/components/Button";
import { Category, Product } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface EditFormProps {
  category: Category;
}

const EditForm: React.FC<EditFormProps> = ({ category }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: category?.name,
    },
  });

  console.log(category);

  const handleEdit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      await axios
        .post("/api/updateCategory", {
          id: category?.id,
          ...data,
        })
        .then(() => {
          toast.success("Save Successfully");
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setIsLoading(false);
          router.push("/admin/categories");
        });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex justify-center items-center rounded-md gap-6 w-full "
      onSubmit={handleSubmit(handleEdit)}
    >
      <div className="flex flex-col bg-white p-5 w-2/6 gap-2">
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="name">Category</label>
          <input
            className="w-full py-2 px-1 rounded-sm border-2 border-gray-400 bg-transparent"
            id="name"
            placeholder={category.name}
            required
            disabled={isLoading}
            {...register("name")}
          />
        </div>
        <Button type="submit" fullWidth disabled={isLoading}>
          Save Category
        </Button>
      </div>
    </form>
  );
};

export default EditForm;
