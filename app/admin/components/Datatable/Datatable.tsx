"use client";

import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import "./Datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { getDetailBook } from "@/app/actions/getDetailBook";
import { getDetailCategory } from "@/app/actions/getDetailCategory";
import axios from "axios";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

// import axiosClient from "../../../../api/axiosClient";
// import EditProductModal from "../EditProductModal/EditProductModal";
// import EditCategoryModal from "../EditCategoryModal/EditCategoryModal";
// import EditCouponModal from "../EditCouponModal/EditCouponModal";

interface DatatableProps {
  columns: any[];
  rows: any[];
  hasImage?: Boolean;
  type?: String;
  update: Boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  noAction?: Boolean;
}

const Datatable: React.FC<DatatableProps> = ({
  columns,
  rows,
  hasImage = false,
  type = "",
  update,
  setUpdate,
  noAction = false,
}) => {
  const [objID, setObjId] = useState(null);
  const [objDeleteModal, setObjDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const route = useRouter();

  const handleEdit = () => {
    if (objID && type == "product") {
      route.push(`/admin/edit-product/${objID}`);
    }

    if (objID && type == "category") {
      route.push(`/admin/edit-category/${objID}`);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      if (type == "product") {
        await axios.post("/api/deleteProduct", { id: objID });
        route.push("/admin/products");
        revalidatePath("/admin/products");
      }

      if (type == "category") {
        await axios.post("/api/deleteCategory", { id: objID });
        route.push("/admin/categories");
        revalidatePath("/admin/categories");
      }

      setUpdate(!update);
      setIsLoading(false);
      setObjDeleteModal(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params: any) => {
        return (
          <div className="cellAction">
            <button
              className="editBtn"
              onClick={() => {
                setObjId(params.id);
                handleEdit();
              }}
            >
              Edit
            </button>
            <button
              className="deleteBtn"
              onClick={() => {
                setObjId(params.id);
                setObjDeleteModal(true);
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <DataGrid
        getRowId={(row) => row.id}
        rows={rows}
        rowHeight={hasImage ? 340 : 60}
        // sx={}
        columns={noAction ? columns : columns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

export default Datatable;
