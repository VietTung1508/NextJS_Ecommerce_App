"use client";

import { AiFillStar } from "react-icons/ai";
import { FaBoxOpen, FaTruckFast } from "react-icons/fa6";
import { Tb24Hours } from "react-icons/tb";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const policies = [
  {
    icon: FaTruckFast,
    title: "FREE DELIVERY",
    desc: "Orders over 20$",
  },
  {
    icon: Tb24Hours,
    title: "24H OPEN",
    desc: "Take order from request",
  },
  {
    icon: FaBoxOpen,
    title: "COLLECT COUPON",
    desc: "Take many coupon",
  },
  {
    icon: AiFillStar,
    title: "5 STAR SERVICE",
    desc: "150+ rating from Facebook",
  },
];

const Policy = () => {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        `w-full bg-auth-btn  items-center py-9 justify-around px-10`,
        pathname === "/auth" || pathname === "/checkout" ? "hidden" : "flex",
        pathname.startsWith("/admin") && "hidden"
      )}
    >
      {policies.map((policy, i) => (
        <div className="flex items-center gap-3" key={i}>
          <policy.icon
            size={50}
            className={clsx(
              `text-white hover:opacity-70`,
              policy.title === "24H OPEN" && `hover:animate-spin`
            )}
          />
          <div className="flex flex-col justify-center items-start text-white">
            <h2 className="font-semibold text-lg">{policy.title}</h2>
            <p className="text-sm font-semibold">{policy.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Policy;
