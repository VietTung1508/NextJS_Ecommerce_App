"use client";

import { BsCart, BsHeart, BsFillTelephoneFill, BsSearch } from "react-icons/bs";
import Button from "./Button";
import Link from "next/link";
import Image from "next/image";
import { Category, User } from "@prisma/client";
import Avatar from "./Avatar";
import CartDrawer from "./Modal/CartDrawer";
import { useState } from "react";
import UserMenu from "./Modal/UserMenu";
import { Menu } from "@headlessui/react";
import clsx from "clsx";
import SearchInput from "./Home/SearchInput";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import CategoryMenu from "./Modal/CategoryMenu";
import { RootState, useAppSelector } from "@/store/store";
import { AiOutlineMenu } from "react-icons/ai";

interface NavbarProps {
  currentUser: User;
  categories: Category[];
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, categories }) => {
  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const pathname = usePathname();

  const iconLists = [
    { icon: BsHeart, name: "Heart", num: 0 },
    {
      icon: BsCart,
      name: "Cart",
      num: 0,
      onClick: () => setOpenCartDrawer(true),
    },
  ];

  const pageLists = [
    {
      name: "ALL BOOKS",
      link: "/books",
    },
    {
      name: "NEW ARRIVALS",
      link: "/books/New Arrival",
    },
    {
      name: "FAQ",
      link: "/faq",
    },
    {
      name: "CONTACT US",
      link: "/contact-us",
    },
  ];

  const cartItemsTotal = useAppSelector((state) => state.cart.cartItems.length);

  return (
    <div
      className={clsx(
        `flex flex-col justify-center py-4 z-50 gap-5 max-w-screen-xl absolute mx-auto top-0 left-0 right-0`,
        pathname === "/auth" || pathname === "/checkout"
          ? "hidden"
          : pathname.startsWith("/admin") && "hidden"
      )}
    >
      <CartDrawer
        isOpen={openCartDrawer}
        onClose={() => setOpenCartDrawer(false)}
      />
      <div className={clsx(`px-3 lg:px-12 flex items-center`)}>
        <div className="flex w-1/2 items-center gap-8">
          <Link href="/">
            <Image
              src="/images/viz.png"
              width="150"
              height="130"
              alt="logo image"
            />
          </Link>
          <SearchInput />
        </div>
        <div className="w-1/2">
          <div
            className={clsx(
              `flex w-full items-center justify-end gap-6 `,
              pathname !== "/" ? "text-black" : "text-white"
            )}
          >
            {iconLists.map((icon, i) => (
              <div
                key={i}
                className="relative cursor-pointer"
                onClick={icon.onClick}
              >
                <icon.icon size="20" />
                {icon.name === "Cart" && cartItemsTotal > 0 && (
                  <h3 className="absolute bottom-3 left-3 bg-auth-btn px-2 rounded-full flex justify-center items-center">
                    <span>{cartItemsTotal}</span>
                  </h3>
                )}
              </div>
            ))}
            {currentUser?.email ? (
              <Menu as="div" className="relative inline-block ">
                <Menu.Button>
                  <Avatar user={currentUser} />
                </Menu.Button>
                <UserMenu user={currentUser} />
              </Menu>
            ) : (
              <Link href="/auth">
                <Button type="button" danger>
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="w-full  flex lg:hidden justify-between items-center px-5">
        <AiOutlineMenu className="text-white cursor-pointer" size={20} />
        <BsSearch className="text-white cursor-pointer" size={20} />
      </div>
      <div
        className={clsx(
          `px-3 lg:px-12 lg:flex justify-between items-center hidden`,
          pathname !== "/" ? "text-black" : "text-white"
        )}
      >
        <div className="flex items-center gap-5">
          <Menu as="div" className="relative  inline-block">
            <Menu.Button>
              <div className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">
                <RxHamburgerMenu className="inline mb-1 mr-2" />
                ALL CATEGORIES
              </div>
            </Menu.Button>
            <CategoryMenu categories={categories.slice(0, 4)} />
          </Menu>

          <div className="flex items-center gap-5">
            {pageLists.map((page, i) => (
              <Link key={i} href={page.link}>
                <h5 className="cursor-pointer text-sm">{page.name}</h5>
              </Link>
            ))}
          </div>
        </div>
        <a
          href="tel:0986074833"
          className="flex items-center gap-2 text-xl  font-semibold"
        >
          <BsFillTelephoneFill />
          0986074833
        </a>
      </div>
    </div>
  );
};

export default Navbar;
