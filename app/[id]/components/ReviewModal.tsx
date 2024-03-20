"use client";

import Button from "@/app/components/Button";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { TiDelete } from "react-icons/ti";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      review: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    reset({
      title: "",
      review: "",
    });
    onClose();
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
        <div
          className="pointer-events-none fixed inset-0 flex max-w-full
        justify-center items-center"
        >
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform transition ease-in-out duration-500"
            leaveTo="opacity-0"
          >
            <Dialog.Panel className="pointer-events-auto  flex justify-center items-center p-8 bg-white relative rounded-md">
              <div
                className="absolute top-minus12 right-minus12 cursor-pointer"
                onClick={onClose}
              >
                <TiDelete size={30} />
              </div>
              <form
                className="flex flex-col items-center gap-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <h3>Write Review</h3>
                <input
                  required
                  {...register("title")}
                  disabled={isLoading}
                  className="border-gray-100 border-2 px-2 py-1"
                  placeholder="Title"
                />
                <textarea
                  className="border-gray-100 border-2 px-2 py-1 max-h-28"
                  placeholder="Write your review"
                  required
                  {...register("review")}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ReviewModal;
