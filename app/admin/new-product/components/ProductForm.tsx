"use client";
import Button from "@/app/components/Button";
import { Category } from "@prisma/client";
import axios from "axios";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

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

interface ProductFormProps {
  categories: Category[];
}

const ProductForm: React.FC<ProductFormProps> = ({ categories }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookImg, setBookImg] = useState<string>("");
  const [bookImgFile, setBookImgFile] = useState<string>("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      price: 1,
      quantity: 1,
      author: "",
      publisher: "",
      pages: 1,
      isAdult: false,
      type: "paperback",
      salePrice: 0,
      sellNumber: 1,
      categoryIds: "",
    },
  });

  useEffect(() => {
    return () => {
      bookImg && URL.revokeObjectURL(bookImg);
    };
  }, [bookImg]);

  const handleImage = (e: any) => {
    const img = URL.createObjectURL(e.target.files[0]);
    setBookImgFile(e.target.files[0]);
    setBookImg(img);
  };

  const submitHandler: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    formData.append("file", bookImgFile);
    formData.append("upload_preset", "bookstore-upload");

    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dqiyre3pg/image/upload",
        formData
      );

      const imgUrl = res.data.secure_url;

      axios
        .post("/api/newProduct", {
          ...data,
          image: imgUrl,
          isAdult: false,
        })
        .then(() => {
          router.push("/admin/products");
          revalidatePath("/admin/products");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Fail to create new product");
        })
        .finally(() => {
          setIsLoading(false);
          reset({
            name: "",
            description: "",
            price: 1,
            quantity: 1,
            author: "",
            publisher: "",
            pages: 1,
            isAdult: false,
            type: "paperback",
            salePrice: 0,
            sellNumber: 1,
            categoryIds: "",
          });
          setBookImg("");
          setBookImgFile("");
        });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <form className=" flex gap-4 w-full" onSubmit={handleSubmit(submitHandler)}>
      <div className="w-2/6 bg-white flex flex-col rounded-lg">
        <h2 className="px-3 py-2 font-bold text-xl">Product Image</h2>
        <hr className="pb-3" />
        {!bookImg ? (
          <label
            htmlFor="inpFile"
            className="flex justify-center flex-col gap-4 items-center h-full bg-gray-100 mx-3 mb-3 rounded-md"
          >
            <input
              type="file"
              onInput={handleImage}
              id="inpFile"
              className="hidden"
              name="file"
              required
              disabled={isLoading}
            />
            <label
              htmlFor="inpFile"
              className="flex flex-col justify-center items-center"
            >
              <AiOutlineCloudUpload size={40} className="cursor-pointer" />
              <h3>Add Product Image</h3>
            </label>
          </label>
        ) : (
          <div className="flex flex-col gap-5 w-full h-full justify-center items-center ">
            <div className="h-94 w-11/12 relative">
              <Image
                src={bookImg}
                className="object-cover rounded-sm "
                alt="Book Img"
                fill
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <BsFillTrashFill
              onClick={() => setBookImg("")}
              className="text-right w-full"
              size={20}
            />
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center p-5 w-4/6 gap-4 bg-white rounded-lg">
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

        <Button type="submit" disabled={isLoading} fullWidth>
          Add Product
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
