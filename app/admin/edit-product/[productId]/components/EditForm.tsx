"use client";

import Button from "@/app/components/Button";
import { Category, Product } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { revalidatePath } from "next/cache";

const inputItems = [
  {
    name: "name",
    type: "text",
    placeholder: "Product Name",
  },

  {
    name: "quantity",
    type: "number",
    placeholder: "Product Quantity",
  },
  {
    name: "price",
    type: "number",
    placeholder: "Product Price",
  },
  {
    name: "author",
    type: "text",
    placeholder: "Product Author",
  },
  {
    name: "publisher",
    type: "text",
    placeholder: "Product Publisher",
  },
  {
    name: "pages",
    type: "number",
    placeholder: "Product Pages",
  },

  {
    name: "salePrice",
    type: "text",
    placeholder: "Sale Price",
  },
];

interface EditFormProps {
  product: Product;
  categories: Category[];
}

const EditForm: React.FC<EditFormProps> = ({ product, categories }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: product?.name,
      description: product?.description,
      price: product?.price,
      quantity: product?.quantity,
      author: product?.author,
      publisher: product?.publisher,
      pages: product?.pages,
      isAdult: product?.isAdult,
      type: product?.type,
      salePrice: product?.salePrice,
      sellNumber: product?.sellNumber,
      categoryIds: product?.categoryIds,
    },
  });

  const handleEdit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      await axios
        .post("/api/updateProduct", {
          id: product?.id,
          ...data,
        })
        .then(() => {
          toast.success("Save Successfully");
          revalidatePath("/admin/products");
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setIsLoading(false);
          router.push("/admin/products");
        });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  return (
    <form
      className="bg-white rounded-md flex gap-6 w-5/6"
      onSubmit={handleSubmit(handleEdit)}
    >
      <div className="flex flex-wrap items-center  p-5 w-4/6 gap-4">
        {inputItems.map((inp, i) => (
          <div key={i} className="flex flex-col w-[calc(50%-0.5rem)] gap-1">
            <label htmlFor={inp.name}>{inp.placeholder}</label>
            <input
              placeholder={inp.placeholder}
              type={inp.type}
              id={inp.name}
              required={inp.name === "salePrice" ? false : true}
              disabled={isLoading}
              {...register(`${inp.name}`)}
              className="w-full py-2 px-1 rounded-sm border-2 border-gray-400 bg-transparent"
            />
          </div>
        ))}
        <div className="flex flex-col w-[calc(50%-0.5rem)] gap-1">
          <label htmlFor="category">Category</label>
          <select
            className="w-full py-2 px-1 rounded-sm border-2 border-gray-400 bg-transparent"
            id="category"
            required
            disabled={isLoading}
            {...register("categoryIds")}
          >
            {categories.map((category, i) => (
              <option defaultChecked={i === 0} value={category.id} key={i}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-full gap-1">
          <label htmlFor="desc">Description</label>
          <textarea
            placeholder="Description"
            id="desc"
            {...register(`description`)}
            className="w-full py-2 px-1 rounded-sm border-2 border-gray-400 h-40 resize-none"
            required
            disabled={isLoading}
          />
        </div>

        <Button type="submit" fullWidth disabled={isLoading}>
          Save Product
        </Button>
      </div>
      <div className="w-2/6 flex flex-col gap-3 p-5">
        <Image
          src={product?.image || ""}
          className="object-fit rounded-sm"
          alt="Book Img"
          width="250"
          height="400"
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span>Sorry but you cannot change image</span>
      </div>
    </form>
  );
};

export default EditForm;
