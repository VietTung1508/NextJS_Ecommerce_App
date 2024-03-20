"use client";

import { Order, Product } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "./AccountTable.scss";

type AccountTableProps = {
  orders: Order[];
};

type ProductItem = {
  products: Product[];
  quantity: number;
};

const AccountTable: React.FC<AccountTableProps> = ({ orders }) => {
  const [objDeleteModal, setObjDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const route = useRouter();

  const orderItems = [
    {
      title: "Order",
    },

    {
      title: "Address",
    },
    {
      title: "Total Price",
    },
    {
      title: "Action",
    },
  ];

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.post("/api/cancelOrder", { id: orderId });
      setIsLoading(false);
      route.push("/account");
      setObjDeleteModal(false);
    } catch (e) {
      setIsLoading(false);
      setObjDeleteModal(false);
    }
  };

  return (
    <>
      {objDeleteModal && (
        <div className="post-confirm-delete-wrapper">
          <div className="post-confirm-delete-modal">
            <h1>Are You Sure ?</h1>
            <p>You Cannot Redo This Action After Delete !</p>
            <div className="actions">
              <button
                className="btn-cancle"
                onClick={() => {
                  setObjDeleteModal(false);
                }}
              >
                Cancel
              </button>
              <button
                className={`${
                  isLoading ? "btn-delete-disabled" : "btn-delete"
                } `}
                type="button"
                onClick={handleDelete}
                disabled={isLoading}
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
      <table className="border-2 border-black w-3/4">
        <tbody>
          <tr className="border-b-2 border-black bg-auth-inp text-white h-14">
            {orderItems.map((item, i) => (
              <th key={i} className="w-1/12 ">
                {item.title}
              </th>
            ))}
          </tr>

          {orders.map((order, i) => (
            <tr className="text-center border-b-2 border-black h-20" key={i}>
              <td className="py-2">
                {(order?.products as Array<ProductItem>).map((product: any) => (
                  <div className="flex items-center gap-4 px-2 py-2">
                    <Image
                      src={product.product.image}
                      alt=""
                      width="100"
                      height="200"
                      className="object-cover"
                    />

                    <h3 className="1/3">Quantity {product.quantity}</h3>
                  </div>
                ))}
              </td>
              <td>{order.address}</td>
              <td>
                {order.total.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td>
                <button
                  onClick={() => {
                    setOrderId(order?.id);
                    setObjDeleteModal(true);
                  }}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AccountTable;
