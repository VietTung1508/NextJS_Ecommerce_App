"use client";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import { Category, Product } from "@prisma/client";
import Button from "@/app/components/Button";
import { AiOutlineHeart } from "react-icons/ai";
import clsx from "clsx";
import ReactImageMagnify from "react-image-magnify";
import Image from "next/image";
import { useAppDispatch } from "@/store/store";
import { addToCart } from "@/store/features/cartSlice";
import Link from "next/link";
import toast from "react-hot-toast";
import ImageMagnifier from "./ImageMagnifier/ImageMagnifier";

interface DetailBookProps {
  book:
    | (Product & {
        category: Category;
      })
    | null;
}

const varients = [
  {
    name: "DESCRIPTION",
    varient: "Desc",
  },
  {
    name: "INFORMATION",
    varient: "Info",
  },
  {
    name: "REVIEWS",
    varient: "Review",
  },
];

const DetailBook: React.FC<DetailBookProps> = ({ book }) => {
  const [varient, setVarient] = useState("Desc");
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const imgSrc = book?.image!;

  const dispatch = useAppDispatch();

  return (
    <>
      <ReviewModal
        isOpen={openReviewModal}
        onClose={() => setOpenReviewModal(false)}
      />
      <div>Homepage / Tiktok made me buy it! / It Starts with Us</div>
      <div className="flex h-full items-start justify-between gap-5">
        <div className="w-1/4 flex flex-col gap-5 h-96">
          <div className="w-full h-full relative">
            <ImageMagnifier imageUrl={imgSrc} alt="" />
          </div>
        </div>
        <div className=" w-3/4 h-full flex bg-gray-100">
          <div className=" w-1/2 flex flex-col h-full p-5 gap-5">
            <h1 className="text-4xl font-semibold">{book?.name}</h1>
            <div className="flex items-center gap-5">
              <h5>
                <span className="font-semibold">Author: </span>
                <Link href={`/books/${book?.author}`}>
                  <span className="hover:text-auth-btn transition-all">
                    {book?.author}
                  </span>
                </Link>
              </h5>
              <h5>
                <span className="font-semibold">Genre: </span>
                <Link href={`/books/${book?.category.name}`}>
                  <span className="hover:text-auth-btn transition-all">
                    {book?.category.name}
                  </span>
                </Link>
              </h5>
            </div>

            <div className="inline-flex font-semibold cursor-pointer py-1 text-xl gap-2">
              <span className="text-4xl">
                {book?.price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
            <ul className="flex flex-col gap-2">
              <li>
                <span className="font-semibold ">Publisher:</span>{" "}
                {book?.publisher}
              </li>
              <li>
                <span className="font-semibold ">Language:</span> English
              </li>
              <li>
                <span className="font-semibold ">Pages:</span> {book?.pages}
              </li>
              <li>
                <span className="font-semibold ">Ages:</span>{" "}
                {book?.isAdult ? "18+" : "14+"}
              </li>
              <li>
                <span className="font-semibold ">Item Weight:</span> 300g
              </li>
            </ul>
          </div>
          <div className="w-1/2 flex flex-col p-5 gap-5">
            <div className="flex items-center gap-8">
              <h2>Quantity</h2>
              <div className="flex items-center gap-2">
                <button
                  className={clsx(
                    `px-3 py-1 cursor-pointer `,
                    quantity === 1 && "bg-white opacity-90 cursor-default",
                    quantity > 1 && "bg-white"
                  )}
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <span className="px-5 py-1  bg-white">{quantity}</span>
                <button
                  className="px-3 py-1 cursor-pointer bg-white"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity === book?.quantity}
                >
                  +
                </button>
              </div>
              <h5 className="text-sm">{book?.quantity} in stock</h5>
            </div>
            <Button
              main
              fullWidth
              onClick={() => {
                dispatch(addToCart({ product: book!, quantity: quantity }));
                toast.success("Add To Cart Successfully");
              }}
            >
              Add To Cart
            </Button>
            <div className="flex items-center gap-2 cursor-pointer">
              <AiOutlineHeart size={20} />
              <h3>Add To Wishlist</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-10 w-full border-b-2 border-gray-100 py-3">
        {varients.map((vari, i) => (
          <h1
            key={i}
            className={clsx(
              `cursor-pointer text-lg`,
              varient === vari.varient && "text-auth-btn ",
              varient !== vari.varient && " text-gray-400 font-semibold"
            )}
            onClick={() => setVarient(vari.varient)}
          >
            {vari.name}
          </h1>
        ))}
      </div>

      {varient === "Desc" && (
        <div className="flex flex-col">
          <div className="flex w-full">
            <h2 className="border-2 border-gray-100 border-b-white inline-flex justify-center items-center px-3 py-1">
              Description
            </h2>
          </div>
          <div className="border-2 border-gray-100 px-3 leading-7">
            {book?.description}
          </div>
        </div>
      )}
      {varient === "Info" && (
        <div className="leading-8">
          We based our evaluation of book condition on the following criteria:{" "}
          <br />
          <span className="font-semibold">* New:</span> Just like it sounds. A
          brand-new, unused, unread copy in perfect condition. <br />
          <span className="font-semibold">* Like New:</span> An apparently
          unread copy in perfect condition. Dust cover is intact; pages are
          clean and are not marred by notes or folds of any kind. <br />
          <span className="font-semibold">* Very Good:</span> A copy that has
          been read, but remains in excellent condition. Pages are intact and
          are not marred by notes or highlighting, but may contain a neat
          previous owner name. The spine remains undamaged.
          <br />
          <span className="font-semibold">* Good:</span> A copy that has been
          read, but remains in clean condition. All pages are intact, and the
          cover is intact. The spine may show signs of wear. Pages can include
          limited notes and highlighting, and the copy can include "From the
          library of" labels or previous owner inscriptions.
          <br />
          <span className="font-semibold"> * Acceptable:</span> A readable copy.
          All pages are intact, and the cover is intact (the dust cover may be
          missing). Pages can include considerable notes--in pen or
          highlighter--but the notes cannot obscure the text.
        </div>
      )}
      {varient === "Review" && (
        <div className="flex flex-col gap-3">
          <div className="border-b-gray-100 border-2 border-t-white border-l-white border-r-white">
            <h3>Write a review for this product</h3>
          </div>
          <div className="flex w-full justify-end">
            <Button onClick={() => setOpenReviewModal(true)}>
              Write Review
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailBook;
