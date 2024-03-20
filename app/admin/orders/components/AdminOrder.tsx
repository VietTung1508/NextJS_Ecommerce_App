"use client";
import "./AdminOrder.scss";
import { Order } from "@prisma/client";
import Datatable from "../../components/Datatable/Datatable";
import { useState } from "react";
import axios from "axios";

interface AdminOrderProps {
  orders: Order[];
}

const AdminOrder: React.FC<AdminOrderProps> = ({ orders }) => {
  const [update, setUpdate] = useState(false);

  const handleApprove = async (id: String) => {
    try {
      axios.post("/api/approveOrder", { id: id }).then((res) => {
        setUpdate(!update);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "products",
      headerName: "Product",
      flex: 3,
      renderCell: (params: any) => {
        return (
          <div>
            {params.row.products.map((product: any) => (
              <div className="row-product">
                <h3>
                  {product.product.name} - {product.quantity} Book
                </h3>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      field: "user",
      headerName: "Customer Account",
      flex: 1,
      renderCell: (params: any) => {
        return <div>{params.row.user.name}</div>;
      },
    },
    { field: "address", headerName: "Address", flex: 2 },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      renderCell: (params: any) => {
        return (
          <span>
            {params.row.total.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params: any) => {
        return (
          <button
            className={`${params.row.approved ? "disableBtn" : "editBtn"}`}
            disabled={params.row.approved}
            onClick={() => {
              handleApprove(params.id);
            }}
          >
            Approve
          </button>
        );
      },
    },
  ];

  return (
    <div className="orderPage">
      <div className="action">
        <div className="header">
          <h2 className="title">Orders</h2>
          <h3 className="desc">
            Received from database we have <span>{orders.length} </span>
            orders
          </h3>
        </div>
      </div>
      <Datatable
        update={update}
        setUpdate={setUpdate}
        noAction
        columns={columns}
        rows={orders}
      />
    </div>
  );
};

export default AdminOrder;
