"use client";
import clsx from "clsx";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { User } from "@prisma/client";

const formInputItems = [
  { label: "Address", id: "address", placeholder: "Your Address" },
  { label: "City", id: "city", placeholder: "Your City" },
  {
    label: "Phone Number",
    id: "phoneNumber",
    placeholder: "Your Phone Number",
  },
];

interface AccountFormProps {
  currentUser: User;
}

const AccountForm: React.FC<AccountFormProps> = ({ currentUser }) => {
  const [openForm, setOpenForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      address: currentUser.address || "",
      city: "",
      phoneNumber: currentUser.phoneNumber || "",
    },
  });

  const handleAddress: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios
        .post("/api/addAddress", {
          ...data,
          ...session?.user,
        })
        .then(() => {
          toast.success("Add Address Success");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Add Address Failed");
        })
        .finally(() => {
          setIsLoading(false);
          reset({
            address: "",
            city: "",
            phoneNumber: "",
          });
        });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  return (
    <>
      <button
        className="py-3 px-5 rounded-md mt-5 bg-auth-btn flex items-center gap-2"
        onClick={() => setOpenForm(!openForm)}
      >
        <AiOutlinePlus />
        <span>Edit Address</span>
      </button>
      <form
        onSubmit={handleSubmit(handleAddress)}
        className={clsx(`mt-4`, openForm ? "flex flex-col gap-5" : "hidden")}
      >
        {formInputItems.map((item) => (
          <div className="flex flex-col gap-2" key={item.label}>
            <label htmlFor={item.label}>{item.label}</label>
            <input
              {...register(item.id)}
              className="w-full py-2 px-4 border border-gray-300"
              placeholder={item.placeholder}
              type="text"
              id={item.label}
              required
              disabled={isLoading}
            />
          </div>
        ))}
        <div className="flex items-center gap-2 text-white">
          <button type="submit" className="py-3 px-5 rounded-md bg-auth-btn ">
            Add Address
          </button>
          <button
            type="button"
            onClick={() => setOpenForm(false)}
            className="py-3 px-5 rounded-md bg-black"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default AccountForm;
