"use client";
import { Menu, Transition } from "@headlessui/react";
import { AiOutlineRight } from "react-icons/ai";
import Link from "next/link";
import clsx from "clsx";
import { Category } from "@prisma/client";

interface CategoryMenuProps {
  categories: Category[];
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ categories }) => {
  return (
    <Transition
      as="div"
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute w-full divide-y   bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {categories.map((category, i) => (
          <div key={i} className="px-2 py-3 text-black">
            <Menu.Item>
              {({ active }) => (
                <Link href={`${`/books/${category.name}`}`}>
                  <div
                    className={clsx(
                      `flex items-center gap-2 cursor-pointer`,
                      active && "bg-gray-100"
                    )}
                  >
                    <AiOutlineRight className="text-auth-btn" />
                    <h2 className="font-medium">{category.name}</h2>
                  </div>
                </Link>
              )}
            </Menu.Item>
          </div>
        ))}
      </Menu.Items>
    </Transition>
  );
};

export default CategoryMenu;
