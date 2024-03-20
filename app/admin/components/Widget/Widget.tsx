"use client";

import "./Widget.scss";
import { IoIosArrowUp } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { IoShirt, IoReceipt } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import Link from "next/link";
import { Order, User } from "@prisma/client";

interface WidgetProps {
  type: String;
  orders?: Order[];
  products?: Number;
  users?: User[];
}

const Widget: React.FC<WidgetProps> = ({ type, orders, products, users }) => {
  let data;

  switch (type) {
    case "user":
      data = {
        title: "Account",
        isMoney: false,
        link: "View All Account",
        route: "/admin/users",
        icon: (
          <FaUserFriends
            className="icon"
            style={{
              backgroundColor: "rgba(255, 0,0,0.2)",
              color: "crimson",
            }}
          />
        ),
      };
      break;
    case "product":
      data = {
        title: "Product",
        isMoney: false,
        link: "View All Product",
        route: "/admin/products",
        icon: (
          <IoShirt
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0,128,0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;

    case "order":
      data = {
        title: "Order",
        isMoney: false,
        link: "View All Order",
        route: "/admin/orders",
        icon: (
          <IoReceipt
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165,32,0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;

    case "profit":
      data = {
        title: "Revenue",
        isMoney: true,
        link: "View Revenue",
        route: "/admin/profit",
        icon: (
          <GiReceiveMoney
            className="icon"
            style={{
              backgroundColor: "rgba(0, 128,0,0.2)",
              color: "green",
            }}
          />
        ),
      };
      break;
  }

  const revenue = orders?.reduce((acc, curr) => (acc += curr.total), 0);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data?.title}</span>
        <span className="counter">
          {orders && orders
            ? orders.length
            : users && users
            ? users.length
            : type === "profit" && revenue
            ? revenue?.toLocaleString("it-IT", {
                style: "currency",
                currency: "vnd",
              })
            : products?.toString()}
          {data?.isMoney ? "$" : ""}
        </span>
        <Link href={data ? data.route : "/admin"}>
          <span className="link">{data?.link}</span>
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          <IoIosArrowUp className="icon" />
          34 %
        </div>
        {data?.icon}
      </div>
    </div>
  );
};

export default Widget;
