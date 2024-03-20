"use client";
import Datatable from "../../components/Datatable/Datatable";
import { TiPlus } from "react-icons/ti";
import "./AdminProduct.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";

interface AdminProductProps {
  products: Product[];
}

const AdminProduct: React.FC<AdminProductProps> = ({ products }) => {
  const [update, setUpdate] = useState(false);
  const router = useRouter();

  const columns = [
    { field: "id", headerName: "Product Name", flex: 1 },

    { field: "name", headerName: "Product Name", flex: 1 },
    {
      field: "image",
      headerName: "Product Image",
      flex: 2,
      renderCell: (params: any) => {
        return (
          <img
            style={{
              width: "80%",
              height: "96%",
              objectFit: "cover",
            }}
            src={params.row.image}
            alt=""
          />
        );
      },
    },

    {
      field: "category",
      headerName: "Category",
      flex: 1,
      renderCell: (params: any) => {
        return <p>{params.row.category.name}</p>;
      },
    },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "salePrice", headerName: "Sale Price", flex: 1 },

    { field: "quantity", headerName: "Quantity", flex: 1 },
  ];

  return (
    <div className="productPage">
      <div className="action">
        <div className="header">
          <h2 className="title">Products</h2>
          <h3 className="desc">
            Received from database we have <span>{products.length} </span>
            products
          </h3>
        </div>
        <button
          className="newProductBtn"
          onClick={() => {
            router.push("/admin/new-product");
          }}
        >
          New Product
          <span className="icon">
            <TiPlus />
          </span>
        </button>
      </div>
      <Datatable
        type="product"
        update={update}
        setUpdate={setUpdate}
        hasImage={true}
        columns={columns}
        rows={products && products}
      />
    </div>
  );
};

export default AdminProduct;
