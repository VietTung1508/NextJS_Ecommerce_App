"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsArrowRight, BsCartX } from "react-icons/bs";
import Button from "../Button";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  decrement,
  increment,
  removeFromCart,
  totalPriceSelector,
} from "@/store/features/cartSlice";
import { TiDeleteOutline } from "react-icons/ti";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const totalPrice = useAppSelector(totalPriceSelector);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleCheckout = () => {
    if (cartItems.length < 1) {
      toast.error("Cannot Checkout Without Product");
    } else {
      router.push("/checkout");
      onClose();
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opcity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-hidden bg-white shadow-xl">
                <div className="w-full flex justify-between items-center px-5 bg-nav-bg h-14">
                  <h3 className="text-sm ">CART</h3>
                  <span className=" text-sm">{cartItems.length} ITEMS</span>
                </div>
                {cartItems && cartItems.length > 0 ? (
                  <div className="h-5/6 overflow-y-auto flex flex-col gap-3 ">
                    {cartItems.map((item: any, i: number) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-5 py-3 hover:bg-gray-200 relative"
                      >
                        <div className="flex items-start gap-3 cursor-pointer w-4/5">
                          <Link href={`/${item.product.id}`}>
                            <Image
                              src={item.product.image}
                              width="80"
                              height="80"
                              alt="image"
                              className="object-cover"
                            />
                          </Link>

                          <div className="flex flex-col w-3/4 gap-8">
                            <div className="flex flex-col justify-center gap-2">
                              <h2 className="text-xl font-bold">
                                {item.product.name.length < 20
                                  ? item.product.name
                                  : item.product.name.slice(0, 20) + "..."}
                              </h2>
                              <h3 className="text-sm text-gray-500">
                                <span className="font-bold">Author:</span>{" "}
                                {item.product.author}
                              </h3>
                              <h3 className="text-sm text-gray-500">
                                <span className="font-bold">Genre:</span>{" "}
                                {item.product.category.name}
                              </h3>
                              <h3 className="text-sm text-gray-500">
                                <span className="font-bold">Pages:</span>{" "}
                                {item.product.pages}
                              </h3>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-2 w-1/5">
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
                          <h2 className="text-lg font-semibold ">
                            {(
                              item.product.price * item.quantity
                            ).toLocaleString("it-IT", {
                              style: "currency",
                              currency: "vnd",
                            })}
                          </h2>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-5/6 w-full flex flex-col gap-3 justify-center items-center">
                    <BsCartX size={60} />
                    <h2 className="text-xl font-semibold">
                      Your cart is empty
                    </h2>
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
                <div className="border-t-2 flex flex-col gap-4 items-center h-2/5 py-3 pb-2">
                  <div className="flex justify-between px-5 w-full">
                    <h3 className="text-md text-slate-500">Order Value:</h3>
                    <span className="text-md text-slate-500 font-bold">
                      {totalPrice.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "vnd",
                      })}{" "}
                    </span>
                  </div>
                  <div className="flex justify-between px-5 w-full">
                    <h3 className="text-md text-slate-500">Shipping:</h3>
                    <span className="text-md text-slate-500 font-bold">
                      {cartItems.length > 0
                        ? Number(30000).toLocaleString("it-IT", {
                            style: "currency",
                            currency: "vnd",
                          })
                        : "0 VND"}
                    </span>
                  </div>

                  <div className="flex justify-between px-5 w-full  border-t-2 pt-3 font-bold">
                    <h3 className="text-md ">Total:</h3>
                    <span className="text-md ">
                      {(totalPrice + 30000).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "vnd",
                      })}{" "}
                    </span>
                  </div>
                  <div className="w-2/3">
                    <Button fullWidth onClick={handleCheckout}>
                      Process To Check Out
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Link href="/cart">
                      <span className="text-sm" onClick={onClose}>
                        View Cart
                      </span>
                    </Link>
                    <BsArrowRight />
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CartDrawer;
