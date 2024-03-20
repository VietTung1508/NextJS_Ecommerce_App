"use client";

import { totalPriceSelector } from "@/store/features/cartSlice";
import { useAppSelector } from "@/store/store";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { BsCash } from "react-icons/bs";

interface OrderFormProps {
  register: UseFormRegister<FieldValues>;
  isLoading: boolean;
}

const inputItems = [
  {
    id: "email",
    name: "Email",
    placeholder: "Your Email",
  },
  {
    id: "name",
    name: "Full Name",
    placeholder: "Your Name",
  },
  {
    id: "phoneNumber",
    name: "Phone Number",
    placeholder: "Your Phone Number",
  },
  {
    id: "address",
    name: "Address",
    placeholder: "Your Address",
  },
];

const OrderForm: React.FC<OrderFormProps> = ({ register, isLoading }) => {
  const totalPrice = useAppSelector(totalPriceSelector);
  return (
    <div className="  flex justify-between gap-5 mb-5">
      <div className="w-1/2 flex flex-col gap-3">
        <h3 className="text-xl font-semibold">Delivery Info</h3>
        {inputItems.map((item) => (
          <div
            key={item.id}
            className="border-2 border-gray-200 flex flex-col py-1 px-3"
          >
            <label className="text-sm text-gray-400" htmlFor={item.id}>
              {item.name}
            </label>
            <input
              {...register(item.id)}
              className="bg-transparent outline-none placeholder-black"
              id={item.id}
              placeholder={item.placeholder}
              required
              disabled={isLoading}
            />
          </div>
        ))}
        <h3 className="text-sm text-sky-500">
          Note that we'll checking the address before shipping!
        </h3>
        <div className="border-2 border-gray-200 flex flex-col py-1 px-3">
          <label className="text-sm text-gray-400" htmlFor="note">
            Note Here
          </label>
          <textarea
            {...register("note")}
            className="bg-transparent outline-none max-h-36 placeholder-black "
            id="note"
            disabled={isLoading}
          />
        </div>
      </div>
      <div className="flex flex-col w-1/2">
        <h1 className="text-xl font-semibold">Shipping</h1>
        <div className="flex flex-col border-2 border-gray-200 mt-3 gap-3">
          {totalPrice >= 500000 ? (
            <div className="flex items-center gap-3 justify-between py-2 px-5 ">
              <div className="flex items-center gap-3 w-2/3">
                <input
                  type="radio"
                  id="free"
                  {...register("delivery")}
                  value="free"
                  required
                  disabled={isLoading}
                />
                <label htmlFor="free">
                  Free Delivery (Order Above 500.000 VND)
                </label>
              </div>
              <span className="w-1/3 flex justify-end">0 VND</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 justify-between border-b-2 border-gray-200 py-2 px-5">
              <div className="flex items-center gap-3 w-2/3">
                <input
                  type="radio"
                  id="slow"
                  {...register("delivery")}
                  value="slow"
                  required
                  disabled={isLoading}
                />
                <label htmlFor="slow">Slow Delivery</label>
              </div>
              <span className="w-1/3 flex justify-end">35.000 VND</span>
            </div>
          )}
        </div>
        <h1 className="text-xl font-semibold">Payment</h1>
        <div className="flex flex-col border border-gray-200 mt-3">
          <div className="flex items-center gap-3 justify-between py-4 px-5 ">
            <div className="flex items-center gap-3 w-2/3">
              <input
                type="radio"
                id="cod"
                {...register("payment")}
                value="cod"
                required
                disabled={isLoading}
              />
              <label htmlFor="cod">Cash On Delivery (COD)</label>
            </div>
            <span className="w-1/3 flex justify-end">
              <BsCash />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
