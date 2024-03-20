"use client";

import SidebarBox from "@/app/books/component/SidebarBox";
import { Dialog, Transition } from "@headlessui/react";
import { Category } from "@prisma/client";
import { Fragment } from "react";

const priceRange = [
  { name: "Under 100.000đ" },
  { name: "100.000đ - 200.000đ" },
  { name: "200.000đ - 300.000đ" },
  { name: "300.000đ - 500.000đ" },
  { name: "500.000đ - 900.000đ" },
  { name: "Above 900.000đ" },
];

const format = [{ name: "Paperback" }, { name: "Hardback" }];

interface CategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  authors: { name: string }[];
}

const CategoryDrawer: React.FC<CategoryDrawerProps> = ({
  isOpen,
  onClose,
  categories,
  authors,
}) => {
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
            <Dialog.Panel className="pointer-events-auto w-screen max-w-sm">
              <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                <div className="flex-col w-full px-7 my-5 flex">
                  <SidebarBox title="ALL CATEGORIES" items={categories} />
                  <SidebarBox title="AUTHOR" items={authors} />
                  <SidebarBox title="PRICE RANGE" items={priceRange} />
                  <SidebarBox title="FORMAT" items={format} />
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CategoryDrawer;
