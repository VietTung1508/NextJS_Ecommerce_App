"use client";
import { Menu, Transition } from "@headlessui/react";
import { BiUserCircle } from "react-icons/bi";
import { MdOutlineLocalShipping, MdDashboard } from "react-icons/md";
import { BsBoxArrowLeft } from "react-icons/bs";
import { Fragment } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";

interface UserMenuProps {
  user: User;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const menuItems = [
    {
      name: "Account Settings",
      icon: BiUserCircle,
      link: "/account",
    },

    {
      name: "Log Out",
      icon: BsBoxArrowLeft,
      link: "/",
      onClick: () => {
        signOut();
      },
    },
  ];

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 mt-4 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {menuItems.map((item, i) => (
          <div key={i} className="px-2 py-2 text-black">
            <Menu.Item>
              {({ active }) => (
                <Link href={item.link}>
                  <div
                    className={`${
                      active && "bg-gray-200"
                    } flex items-center justify-between p-2`}
                    onClick={item.onClick}
                  >
                    <h4 className="">{item.name}</h4>
                    <item.icon size={18} />
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

export default UserMenu;
