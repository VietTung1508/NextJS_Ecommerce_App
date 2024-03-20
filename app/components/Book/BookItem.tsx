"use client";
import { addToCart } from "@/store/features/cartSlice";
import { useAppDispatch } from "@/store/store";
import { Product } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { BsCart, BsHeart } from "react-icons/bs";
import { toast } from "react-hot-toast";

interface BookItemProps {
  item: Product;
  oneLine?: boolean;
  allBooks?: boolean;
  search?: boolean;
}

const BookItem: React.FC<BookItemProps> = ({
  item,
  oneLine,
  allBooks,
  search,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={clsx(
        `flex flex-col items-center justify-center gap-1`,
        oneLine && "w-full",
        allBooks &&
          !search &&
          "xl:w-[calc(25%-1.5rem)] lg:w-[calc(33.3333%-1.5rem)] md:w-[calc(33.3333%%-1.9rem)] w-[calc(50%-1.5rem)]",
        allBooks &&
          search &&
          "xl:w-[calc(20%-1.9rem)] lg:w-[calc(25%-1.9rem)] md:w-[calc(33.3333%%-1.9rem)] w-[calc(50%-1.9rem)]",
        !oneLine &&
          !allBooks &&
          "xl:w-[calc(20%-1.5rem)] lg:w-[calc(25%-1.5rem)] md:w-[calc(33.333%-1.5rem)] w-[calc(50%-1.5rem)]"
      )}
    >
      <div
        className={clsx(
          `relative group mb-2 w-full`,
          allBooks && !search && "lg:h-60 h-72",
          !allBooks && "lg:h-72 h-80",
          allBooks && search && "lg:h-80 h-80"
        )}
      >
        <Link href={`/${item.id}`}>
          <Image
            className="object-cover group-hover:opacity-70 cursor-pointer"
            src={item.image}
            alt="product"
            fill
            sizes=""
          />
        </Link>
        <div className="hidden absolute bottom-0 w-full h-1  group-hover:flex justify-center items-end pb-10 bg-transparent">
          <div className="flex item-center gap-2">
            <button className="bg-white rounded-lg cursor-pointer z-10 p-4 hover:bg-auth-btn">
              <BsHeart />
            </button>
            <button
              className="bg-white rounded-lg cursor-pointer z-10 p-4 hover:bg-auth-btn"
              onClick={() => {
                toast.success("Add To Cart Successfully");
                dispatch(addToCart({ product: item, quantity: 1 }));
              }}
            >
              <BsCart />
            </button>
          </div>
        </div>
      </div>
      <h5 className="text-md font-medium">
        {item.name.length < 13 ? item.name : item.name.slice(0, 13) + "..."}
      </h5>

      <span className="text-auth-btn font-semibold">
        {item.price.toString().slice(0, 3).concat(".") +
          item.price.toString().slice(3)}{" "}
        VND
      </span>
      <p
        className={clsx(
          `font-medium`,
          item.quantity > 0 ? "text-stock-color" : "text-red-500"
        )}
      >
        {item.quantity > 0 ? "In stock" : "Out of stock"}
      </p>
    </div>
  );
};

export default BookItem;
