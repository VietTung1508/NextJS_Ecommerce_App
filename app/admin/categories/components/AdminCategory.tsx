"use client";

import React, { useEffect, useState } from "react";
import Datatable from "../../components/Datatable/Datatable";
import "./AdminCategory.scss";
import { TiPlus } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";

interface AdminCategoryProps {
  categories: Category[];
}

const AdminCategory: React.FC<AdminCategoryProps> = ({ categories }) => {
  const route = useRouter();
  const [update, setUpdate] = useState(false);

  console.log(categories);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Category Name", flex: 3 },
  ];

  return (
    <div className="categoryPage">
      <div className="action">
        <div className="header">
          <h2 className="title">Category</h2>
          <h3 className="desc">
            Received from database we have <span>{categories.length} </span>
            products
          </h3>
        </div>
        <button
          className="newCategoryBtn"
          onClick={() => {
            route.push("/admin/new-category");
          }}
        >
          New Category
          <span className="icon">
            <TiPlus />
          </span>
        </button>
      </div>
      <Datatable
        update={update}
        setUpdate={setUpdate}
        type="category"
        columns={columns}
        rows={categories}
      />
    </div>
  );
};

export default AdminCategory;
