"use client";

import Button from "@/app/components/Button";
import { totalPriceSelector } from "@/store/features/cartSlice";
import { useAppSelector } from "@/store/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AiOutlineLeft } from "react-icons/ai";

const OrderDetail = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated" || cartItems.length === 0) {
      router.push("/");
    }
  }, [session.status, router]);

  const totalPrice = useAppSelector(totalPriceSelector);
  return (
    <div className="w-2/6 h-screen bg-gray-100 border-l flex flex-col border-gray-400">
      <div className="py-3 px-6 border-b border-gray-400 flex justify-between items-center">
        <Link href="/cart">
          <div className="cursor-pointer flex items-center font-semibold gap-2 text-xl">
            <AiOutlineLeft />
            <h3>Back To Cart</h3>
          </div>
        </Link>
        <h3 className=" text-xl font-semibold">
          Orders ({cartItems.length} products)
        </h3>
      </div>

      <div className="max-h-52 overflow-auto flex flex-col gap-3 py-2 mx-5 border-b border-b-gray-400">
        {cartItems.map((item, i) => (
          <div className="flex gap-2" key={i}>
            <div className="w-1/6 h-28 relative">
              <Image
                fill
                src={item.product.image}
                alt="product image"
                sizes=""
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 w-3/6">
              <div className="font-semibold text-lg">{item.product.name}</div>
              <div className="text-sm">
                Quantity: <span className="font-semibold">{item.quantity}</span>
              </div>
              <div className="text-sm">
                Author:{" "}
                <span className="font-semibold">{item.product.author}</span>
              </div>
            </div>
            <span className="w-2/6 flex h-full items-start justify-end font-semibold text-xl">
              {(item.product.price * item.quantity).toLocaleString("it-IT", {
                style: "currency",
                currency: "vnd",
              })}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col border-b border-gray-400 gap-2 mx-6 py-3">
        <div className="flex justify-between ">
          <h3>Estimate</h3>
          <span className=" font-semibold">
            {totalPrice.toLocaleString("it-IT", {
              style: "currency",
              currency: "vnd",
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <h3>Shipping Cost</h3>
          <span className="font-semibold">
            {totalPrice >= 500000 ? "0 VND" : "35.000 VND"}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 mx-6">
        <div className="flex justify-between mt-3 text-xl">
          <h3>Total</h3>
          <span className="text-sky-500 font-semibold">
            {totalPrice >= 500000
              ? totalPrice.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "vnd",
                })
              : (totalPrice + 35000).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "vnd",
                })}
          </span>
        </div>
        <div className="flex mt-2">
          <Button type="submit" fullWidth>
            Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
