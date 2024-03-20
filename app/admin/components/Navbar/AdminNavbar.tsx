"use client";

import Link from "next/link";
import { BsSearch } from "react-icons/bs";
import { FaRegMoon, FaRegBell } from "react-icons/fa";
import "./adminNavbar.scss";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { Order } from "@prisma/client";

const AdminNavbar = () => {
  const router = useRouter();
  const [orders, setOrder] = useState<Order[]>();

  const admin = useAppSelector((state) => state.admin.admin);

  useEffect(() => {
    if (!admin) {
      router.push("/adminAuth");
    }

    const getOrder = async () => {
      const res = await axios.get("/api/getOrders");
      setOrder(res.data);
    };

    getOrder();
  }, []);

  const orderNotApproved = orders?.filter((order) => {
    order.approved === false;
  });

  return (
    <div className="admin_navbar bg-gray-100">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Tìm Kiếm..." />
          <span className="icon">
            <BsSearch />
          </span>
        </div>
        <div className="items">
          <div className="item">
            <FaRegBell className="icon" />
            <div
              className={
                orderNotApproved && orderNotApproved?.length === 0
                  ? ""
                  : "counter"
              }
            >
              {orderNotApproved?.length === 0 ? "" : orderNotApproved?.length}
            </div>
          </div>

          <Link href="/admin/profile">
            <div className="item">
              <img
                src={
                  admin
                    ? // @ts-ignore
                      admin.image
                    : "https://www.superherodb.com/pictures2/portraits/10/050/34393.jpg?v=1647451180"
                }
                alt=""
                className="avatar"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
