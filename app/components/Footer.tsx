"use client";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  return (
    <div
      className={clsx(
        pathname === "/auth" || pathname === "/checkout"
          ? "hidden"
          : "flex flex-col ",
        pathname.startsWith("/admin") && "hidden"
      )}
    >
      <div
        className={clsx(
          ` items-center justify-between my-10 gap-8 px-10 mx-auto max-w-screen-xl`,
          pathname === "/auth" ? "hidden" : "flex",
          pathname === "/admin" ? "hidden" : "flex"
        )}
      >
        <div className="flex flex-col justify-center w-2/4 gap-4">
          <img src="/images/viz.png" className="w-full lg:w-1/2 xl:w-1/2" />
          <div className="flex flex-col gap-4 ">
            <p className="text-sm">
              An online foreign-language bookshop based in Hanoi, with a focus
              on English-language used books at affordable price. We offer
              nation-wide delivery.
            </p>
            <p className="font-medium">Email: Vizmedia@gmail.com</p>
            <p className="font-medium">Phone: 0986074833</p>
          </div>
        </div>
        <div className="flex flex-col justify-center w-1/4">
          <h1 className="text-2xl font-semibold text-auth-btn mb-3">Detail</h1>
          <p>About Us</p>
          <p>Policy</p>
          <p>FAQ</p>
          <p>Contact Us</p>
        </div>
        <div className="flex flex-col justify-center w-1/4">
          <h1 className="text-2xl font-semibold text-auth-btn mb-3">Detail</h1>
          <p>About Us</p>
          <p>Policy</p>
          <p>FAQ</p>
          <p>Contact Us</p>
        </div>
        <div className="flex flex-col w-1/4">
          <h1 className="text-2xl font-semibold text-auth-btn mb-3">
            Newsletter
          </h1>
          <form className="flex flex-col justify-center items-center gap-2">
            <input
              className="w-full text-black py-3 px-2 border-2 "
              type="text"
              placeholder="Enter email address"
              required
            />
            <button
              className="w-full bg-auth-btn text-white py-3 px-2"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="bg-footer-color py-4 flex justify-center items-center text-white font-semibold">
        Copyright belongs to{" "}
        <span className="text-auth-btn mx-2">Viz Media</span> | Provided by{" "}
        <span className="text-auth-btn mx-2">Viet Tung</span>
      </div>
    </div>
  );
};

export default Footer;
