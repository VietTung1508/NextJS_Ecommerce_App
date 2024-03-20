"use client";

import { MdDashboard } from "react-icons/md";
import { FaUserFriends, FaUserCircle } from "react-icons/fa";
import { IoShirtSharp, IoReceiptSharp, IoLogOut } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/adminSlice";
import Link from "next/link";

import "./adminSidebar.scss";
import { useRouter } from "next/navigation";

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className="admin_sidebar">
      <div className="top">
        <Link href="/admin">
          <img className="logo" src="/images/viz.png" alt="" />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <Link href="/admin">
            <li>
              <MdDashboard className="icon" />
              <span>DashBoard</span>
            </li>
          </Link>
          <p className="title">Lists</p>
          <Link href="/admin/customer">
            <li>
              <FaUserFriends className="icon" />
              <span>Customers</span>
            </li>
          </Link>
          <Link href="/admin/products">
            <li>
              <IoShirtSharp className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link href="/admin/categories">
            <li>
              <BiSolidCategory className="icon" />
              <span>Categories</span>
            </li>
          </Link>
          <Link href="/admin/orders">
            <li>
              <IoReceiptSharp className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <p className="title">Admin</p>
          <Link href="/admin/profile">
            <li>
              <FaUserCircle className="icon" />
              <span>Account</span>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <IoLogOut className="icon" />
            <span>Log Out</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
