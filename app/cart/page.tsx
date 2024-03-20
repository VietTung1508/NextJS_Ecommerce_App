"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
import DetailPageBanner from "../components/DetailPageBanner";
import {
  decrement,
  increment,
  totalPriceSelector,
  removeFromCart,
} from "@/store/features/cartSlice";
import Button from "../components/Button";
import { BsCartX, BsFillTrashFill } from "react-icons/bs";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const totalPrice = useAppSelector(totalPriceSelector);

  const currentUser = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleCheckout = () => {
    if (cartItems.length < 1) {
      toast.error("Cannot Checkout Without Product");
    } else if (!currentUser) {
      toast.error("Cannot Checkout Without Login");
    } else {
      router.push("/checkout");
    }
  };

  return (
    <div className="w-full">
      <DetailPageBanner />
      <div className="flex w-full justify-between px-5 max-w-screen-xl m-auto gap-20 mb-5">
        <div className="w-2/3 flex flex-col gap-5">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item, i) => (
              <div
                key={i}
                className="flex gap-3 border-t-2 border-t-gray-300 py-2"
              >
                <img src={item.product.image} className="w-3/12" />
                <div className="flex flex-col gap-5 w-5/12 pl-4">
                  <h2 className="text-2xl font-semibold">
                    {item.product.name.length < 18
                      ? item.product.name
                      : item.product.name.slice(0, 18) + "..."}
                  </h2>
                  <h4>
                    <span className="font-semibold">Author:</span>
                    {item.product.author.length < 15
                      ? item.product.author
                      : item.product.author.slice(0, 15) + "..."}
                  </h4>
                  <h4>
                    <span className="font-semibold">Publisher:</span>

                    {item.product.publisher.length < 12
                      ? item.product.publisher
                      : item.product.publisher.slice(0, 12) + "..."}
                  </h4>
                  <h4>
                    {" "}
                    <span className="font-semibold">Pages:</span>{" "}
                    {item.product.pages}
                  </h4>{" "}
                  <h4>
                    {" "}
                    <span className="font-semibold">Type:</span>{" "}
                    {item.product.type}
                  </h4>
                </div>

                <div className="flex flex-col w-2/12 gap-3">
                  <h2 className=" text-lg font-semibold">Quantity</h2>
                  <div className="flex items-center gap-3">
                    <button
                      className="px-2 bg-gray-300 rounded-sm z-10"
                      onClick={() => dispatch(decrement(item.product))}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <h3>{item.quantity}</h3>
                    <button
                      className="px-2 bg-gray-300 rounded-sm z-10"
                      onClick={() => dispatch(increment(item.product))}
                      disabled={item.quantity >= item.product.quantity}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col justify-between w-2/12 gap-3 items-center">
                  <div className="flex flex-col gap-3">
                    <h2 className="font-semibold text-lg ">Total</h2>
                    <span className="font-semibold">
                      {(item.product.price * item.quantity).toLocaleString(
                        "it-IT",
                        {
                          style: "currency",
                          currency: "vnd",
                        }
                      )}
                    </span>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      dispatch(removeFromCart(item.product.id));
                    }}
                  >
                    <BsFillTrashFill size="20" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex flex-col gap-3 justify-center items-center py-5">
              <BsCartX size={80} />
              <h2 className="text-2xl font-semibold">Your cart is empty</h2>
              <Link href="/books">
                <span
                  className="text-md text-gray-500 
                    cursor-pointer hover:underline decoration-1 transition-all hover:text-auth-btn"
                >
                  Shopping now!
                </span>
              </Link>
            </div>
          )}
          <div className="border-t-2 border-t-gray-300 py-2 flex justify-between px-10">
            <h2 className="font-semibold">{cartItems.length} Items</h2>
            <span className="font-semibold">
              {totalPrice.toLocaleString("it-IT", {
                style: "currency",
                currency: "vnd",
              })}
            </span>
          </div>
        </div>
        <div className="w-1/3 flex flex-col gap-5 bg-gray-100 px-2 py-5 rounded-lg h-full">
          <div className="flex justify-between items-center">
            <h3>Shipping Method</h3>
            <h3>COD</h3>
          </div>
          <div className="flex justify-between items-center">
            <h3>Discount</h3>
            <h3>-0 VND</h3>
          </div>
          <div className="flex justify-between items-center">
            <h3>Tax</h3>
            <h3>10.000 VND</h3>
          </div>
          <div className="flex justify-between items-center text-lg font-semibold border-t-2 pt-5">
            <h1>Estimated Total</h1>
            <span>
              {totalPrice.toLocaleString("it-IT", {
                style: "currency",
                currency: "vnd",
              })}
            </span>
          </div>
          <Button onClick={handleCheckout}>Check Out</Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
