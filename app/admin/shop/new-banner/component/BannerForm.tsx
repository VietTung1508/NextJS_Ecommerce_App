"use client";
import Button from "@/app/components/Button";
import { Product } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { BsFillCloudUploadFill, BsFillTrashFill } from "react-icons/bs";

interface BannerFormProps {
  books: Product[];
}

const BannerForm: React.FC<BannerFormProps> = ({ books }) => {
  const [backgroundImage, setBackgroundImage] = useState({
    temp: "",
    file: "",
  });

  const [posterImage, setPosterImage] = useState({
    temp: "",
    file: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      productId: "",
    },
  });

  useEffect(() => {
    return () => {
      backgroundImage.temp && URL.revokeObjectURL(backgroundImage.temp);
    };
  }, [backgroundImage.temp]);

  useEffect(() => {
    return () => {
      posterImage.temp && URL.revokeObjectURL(posterImage.temp);
    };
  }, [posterImage.temp]);

  const handleBackgroundImage = (e: any) => {
    const img = URL.createObjectURL(e.target.files[0]);
    console.log(img);
    setBackgroundImage({ file: e.target.files[0], temp: img });
  };

  const handlePosterImage = (e: any) => {
    const img = URL.createObjectURL(e.target.files[0]);
    setPosterImage({ file: e.target.files[0], temp: img });
  };

  const handleUploadBanner: SubmitHandler<FieldValues> = async (data) => {
    let resBackgroundImage;
    let resPosterImage;

    for (let i = 0; i < 2; i++) {
      const formData = new FormData();
      formData.append(
        "file",
        i === 0 ? backgroundImage.file : posterImage.file
      );
      formData.append("upload_preset", "bookstore-upload");
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dqiyre3pg/image/upload",
          formData
        );
        i === 0
          ? (resBackgroundImage = res.data.secure_url)
          : (resPosterImage = res.data.secure_url);
      } catch (e) {
        console.log(e);
      }
    }

    try {
      axios
        .post("/api/newBanner", {
          ...data,
          poster: resPosterImage,
          background: resBackgroundImage,
        })
        .then(() => {
          // toast success create new product
        })
        .catch((err) => {
          console.log(err);
          // toast faild create new product
        })
        .finally(() => {
          reset({
            title: "",
            description: "",
            productId: "",
          });
          setBackgroundImage({ temp: "", file: "" });
          setPosterImage({ temp: "", file: "" });
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className="flex bg-white w-4/6 gap-5 p-5 rounded-md"
      onSubmit={handleSubmit(handleUploadBanner)}
    >
      <div className="flex flex-col gap-4 w-4/6">
        <div className="flex flex-col w-full gap-2">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            className="border-2 border-gray-400 px-2 py-1"
            {...register("title")}
          />
        </div>
        <div className="flex flex-col w-full gap-2 ">
          <label>Description</label>
          <textarea
            placeholder="Description"
            className="w-full py-2 px-1 rounded-sm border-2 border-gray-400 h-40 resize-none"
            {...register("description")}
          />
        </div>
        <div className="flex flex-col w-full gap-2 mb-2">
          <label>Choose Link Product</label>
          <select
            className="border-2 border-gray-400 px-2 py-1"
            {...register("productId")}
          >
            {books.map((book, i) => (
              <option defaultChecked={i === 0} key={book.name} value={book.id}>
                {book.name}
              </option>
            ))}
          </select>
        </div>

        {!backgroundImage.temp ? (
          <div className="flex justify-center flex-col gap-4 items-center  w-full h-32 bg-gray-100 p-5">
            <label
              className="flex flex-col justify-center items-center"
              htmlFor="bgImage"
            >
              <BsFillCloudUploadFill size={20} />
              <h2>Upload Background Banner</h2>
            </label>
            <input
              className="hidden"
              id="bgImage"
              type="file"
              onInput={handleBackgroundImage}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <img
              src={backgroundImage.temp}
              className="object-fit rounded-sm"
              alt="Book Img"
              // width="250"
              // height="400"
              // priority={true}
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <BsFillTrashFill
              onClick={() =>
                setBackgroundImage({ ...backgroundImage, temp: "" })
              }
              className="text-right w-full"
              size={20}
            />
          </div>
        )}
        <Button type="submit">Add New Banner</Button>
      </div>
      <div className="w-2/6">
        {!posterImage.temp ? (
          <div className="flex justify-center flex-col gap-4 items-center  w-full  h-64  bg-gray-100 p-3 mb-5">
            <label
              className="flex flex-col justify-center items-center"
              htmlFor="poster"
            >
              <BsFillCloudUploadFill size={20} />
              <h2>Upload Poster Banner</h2>
            </label>
            <input
              className="hidden"
              id="poster"
              type="file"
              onInput={handlePosterImage}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <img
              src={posterImage.temp}
              className="object-fit rounded-sm"
              alt="Book Img"
              // width="250"
              // height="400"
              // priority={true}
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <BsFillTrashFill
              onClick={() => setPosterImage({ ...posterImage, temp: "" })}
              className="text-right w-full"
              size={20}
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default BannerForm;
