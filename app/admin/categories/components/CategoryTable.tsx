// "use client";
// import Button from "@/app/components/Button";
// import Modal from "@/app/components/Modal/Modal";
// import ModalDelete from "@/app/components/Modal/ModalDelete";
// import { Category } from "@prisma/client";
// import axios from "axios";
// import { useState } from "react";
// import {
//   FieldValue,
//   FieldValues,
//   SubmitHandler,
//   useForm,
// } from "react-hook-form";
// import { AiFillEdit } from "react-icons/ai";
// import { MdDelete } from "react-icons/md";

// const categoryItems = [
//   { title: "Id" },
//   { title: "Name" },
//   { title: "Sub Categories" },
//   { title: "Actions" },
// ];

// interface CategoryTableProps {
//   categories: Category[];
// }

// const CategoryTable: React.FC<CategoryTableProps> = ({ categories }) => {
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);

//   const [isLoading, setIsLoading] = useState(false);
//   const [categoryId, setCategoryId] = useState("");
//   const [categoryName, setCategoryName] = useState("");

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<FieldValues>({
//     defaultValues: {
//       name: "",
//       children: {
//         id: "",
//         name: "",
//       },
//     },
//   });

//   const handleDelete = async () => {
//     try {
//       setIsLoading(true);
//       await axios
//         .post("/api/deleteCategory", { categoryId: categoryId })
//         .then
//         // Toast Succes
//         ()
//         .catch
//         // Toast Failure
//         ()
//         .finally(() => {
//           setDeleteModalOpen(false);
//           setIsLoading(false);
//         });
//     } catch (err) {
//       console.log(err);
//       setIsLoading(false);
//     }
//   };

//   const handleEdit: SubmitHandler<FieldValues> = (data) => {};

//   return (
//     <>
//       <ModalDelete
//         isOpen={deleteModalOpen}
//         onClose={() => setDeleteModalOpen(false)}
//         handleDelete={handleDelete}
//         disabled={isLoading}
//         varient="Category"
//       />

//       <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
//         <form
//           className="w-full flex flex-col gap-4 "
//           onSubmit={handleSubmit(handleEdit)}
//         >
//           <div className="flex flex-col gap-2">
//             <label htmlFor="categoryName">Category</label>
//             <input
//               className="py-1 px-2 border-gray-300 border-2"
//               {...register("name")}
//               value={categoryName}
//               placeholder="Category Name"
//               id="categoryName"
//               required
//               disabled={isLoading}
//             />
//           </div>
//           <Button disabled={isLoading} type="submit" fullWidth>
//             Save Category
//           </Button>
//         </form>
//       </Modal>

//       <table className="border-2 border-black">
//         <tbody>
//           <tr className="border-b-2 border-black bg-auth-inp text-white h-14">
//             {categoryItems.map((item, i) => (
//               <th key={i} className="w-1/12 ">
//                 {item.title}
//               </th>
//             ))}
//           </tr>

//           {categories.map((category, i) => (
//             <tr className="text-center border-b-2 border-black h-20" key={i}>
//               <td>{category.id}</td>
//               <td>{category.name}</td>
//               <td className="flex flex-col">
//                 {category.subCategory.map((cate) => (
//                   <h3>{cate}</h3>
//                 ))}
//               </td>
//               <td>
//                 <button
//                   onClick={() => {
//                     setEditModalOpen(true);
//                     setCategoryId(category.id);
//                     setCategoryName(category.name);
//                   }}
//                 >
//                   <AiFillEdit size={20} />
//                 </button>
//                 <button>
//                   <MdDelete
//                     size={20}
//                     className="ml-4"
//                     onClick={() => {
//                       setDeleteModalOpen(true);
//                       setCategoryId(category.id);
//                     }}
//                   />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default CategoryTable;

// "use client";
// import ModalDelete from "@/app/components/Modal/ModalDelete";
// import { Product } from "@prisma/client";
// import axios from "axios";
// import clsx from "clsx";
// import Link from "next/link";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { AiFillEdit } from "react-icons/ai";
// import { MdDelete } from "react-icons/md";

// const productItems = [
//   {
//     title: "Image",
//   },
//   {
//     title: "Name",
//   },
//   {
//     title: "Price",
//   },
//   {
//     title: "Author",
//   },
//   {
//     title: "Publisher",
//   },
//   {
//     title: "Actions",
//   },
// ];

// interface ProductTableProps {
//   products: Product[];
//   pages: number;
//   currentPage: number;
// }

// const ProductTable: React.FC<ProductTableProps> = ({
//   products,
//   pages,
//   currentPage,
// }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [ProductId, setProductId] = useState("");

//   const handleDelete = async () => {
//     try {
//       setIsLoading(true);
//       await axios
//         .post("/api/deleteProduct", { productId: ProductId })
//         .then(() => {
//           toast.success("Delete Successfully");
//         })
//         .catch(() => {
//           toast.error("Delete Failed");
//         })
//         .finally(() => {
//           setDeleteModalOpen(false);
//           setIsLoading(false);
//         });
//     } catch (err) {
//       console.log(err);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="w-full">
//       <ModalDelete
//         isOpen={deleteModalOpen}
//         onClose={() => setDeleteModalOpen(false)}
//         handleDelete={handleDelete}
//         disabled={isLoading}
//         varient="Product"
//       />
//       <table className="border-2 border-black">
//         <tbody>
//           <tr className="border-b-2 border-black bg-auth-inp text-white h-14">
//             {productItems.map((item, i) => (
//               <th key={i} className="w-1/12 ">
//                 {item.title}
//               </th>
//             ))}
//           </tr>

//           {products.map((product, i) => (
//             <tr className="text-center border-b-2 border-black h-20" key={i}>
//               <td>
//                 <img
//                   className="p-2 object-cover"
//                   src={product.image}
//                   alt="product image"
//                 />
//               </td>
//               <td>{product.name} </td>
//               <td>
//                 {product?.price &&
//                   product.price.toString().slice(0, 3).concat(".") +
//                     product.price.toString().slice(3)}
//                 <span className="ml-2">VND</span>
//               </td>
//               <td>{product.author}</td>
//               <td>{product.publisher}</td>
//               <td>
//                 <Link href={`/admin/edit-product/${product.id}`}>
//                   <button>
//                     <AiFillEdit size={20} />
//                   </button>
//                 </Link>
//                 <button
//                   onClick={() => {
//                     setDeleteModalOpen(true);
//                     setProductId(product.id);
//                   }}
//                 >
//                   <MdDelete size={20} className="ml-4" />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="w-full flex items-center justify-end mt-3">
//         {[...Array(pages)].map((page, i) => {
//           return (
//             <Link href={`/admin/products/?page=${i + 1}`} key={i}>
//               <span className={clsx(`ml-2 cursor-pointer`)}>{i + 1}</span>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ProductTable;