"use client";
import Image from "next/image";

import OrderDetail from "./OrderDetail";
import OrderForm from "./OrderForm";
import { User } from "@prisma/client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store/store";
import axios from "axios";
import { resetCart, totalPriceSelector } from "@/store/features/cartSlice";
import { useState } from "react";
import Modal from "@/app/components/Modal/Modal";
import { useRouter } from "next/navigation";
import { GiConfirmed } from "react-icons/gi";

interface CheckOutProps {
  currentUser: User;
}

const CheckOut: React.FC<CheckOutProps> = ({ currentUser }) => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector(totalPriceSelector);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: currentUser.email,
      name: currentUser.name,
      phoneNumber: currentUser.phoneNumber || "",
      address: currentUser.address || "",
      note: "",
      delivery: "slow",
      payment: "cod",
    },
  });

  const handleOrder: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios
        .post("/api/checkout", {
          products: cartItems,
          ...data,
          total: totalPrice,
        })
        .catch(() => {
          console.log("err");
        })
        .finally(() => {
          setIsLoading(false);
          setConfirmModal(true);
          dispatch(resetCart());
        });
    } catch (e) {
      console.log(e);
    }
  };

  const router = useRouter();

  return (
    <>
      <Modal
        isOpen={confirmModal}
        onClose={() => {
          setConfirmModal(false);
          router.push("/");
        }}
      >
        <div className="flex flex-col justify-center items-center gap-5">
          <GiConfirmed size="50" className="text-green-400" />
          <div className="flex flex-col justify-center items-center gap-1">
            <h2 className="text-2xl font-semibold">Your Order Is Complete</h2>
            <span>
              You will receiving a confirmation email with order details.
            </span>
          </div>
          <button
            className="rounded-full border-2 border-sky-400 hover:border-sky-600 transition-all hover:bg-gray-100 px-5 py-2"
            onClick={() => router.push("/")}
          >
            Back To Home Page
          </button>
        </div>
      </Modal>
      <form
        onSubmit={handleSubmit(handleOrder)}
        className="max-w-screen-2xl mx-auto flex justify-between h-full"
      >
        <div className="flex flex-col px-10 w-4/6 ">
          <Image
            src="/images/viz.png"
            alt="logo alt"
            width="350"
            height="400"
            className="my-10"
          />
          <OrderForm isLoading={isLoading} register={register} />
        </div>
        <OrderDetail />
      </form>
    </>
  );
};

export default CheckOut;
