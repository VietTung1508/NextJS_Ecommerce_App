"use client";
import { usePathname } from "next/navigation";

const DetailPageBanner = () => {
  const path = usePathname();

  return (
    <div className="mt-36 mb-14 w-full h-48 bg-auth-btn relative">
      <img
        src="/images/booksBanner.jpg"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center">
          <h2 className="text-white text-2xl font-semibold">
            {path === "/books"
              ? "All Books"
              : path.slice(7).replaceAll("%20", " ").replaceAll("%C4%91", " ")}
            {path === "/cart" && "Cart"}
          </h2>
          <p className="text-white">
            HomePage/
            {path === "/books"
              ? "All Books"
              : path.slice(7).replaceAll("%20", " ").replaceAll("%C4%91", " ")}
            {path === "/cart" && "Cart"}
            {path === "/search" && "Search"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailPageBanner;
