import { getBanners } from "@/app/actions/getBanners";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const bannerItems = [
  {
    title: "Title",
  },
  {
    title: "Background Image",
  },

  {
    title: "Poster",
  },
  {
    title: "Actions",
  },
];

const Shop = async () => {
  const banners = await getBanners(false);

  return (
    <div className="flex flex-col justify-center items-center px-3">
      <h1 className="mb-4 font-semibold text-2xl">Banners</h1>
      <div className="w-full flex justify-between mb-3">
        <h2 className="text-lg font-semibold">All Banners</h2>

        <Link href="/admin/shop/new-banner">
          <p className="p-1 px-2 bg-auth-btn rounded-md">Create New Banner</p>
        </Link>
      </div>
      <table className="border-2 border-black">
        <tbody>
          <tr className="border-b-2 border-black bg-auth-inp text-white h-14">
            {bannerItems.map((banner, i) => (
              <th key={i} className="w-1/12 ">
                {banner.title}
              </th>
            ))}
          </tr>

          {banners.map((banner, i) => (
            <tr className="text-center border-b-2 border-black h-20" key={i}>
              <td>{banner.title}</td>

              <td>
                <img
                  className="p-2 object-cover"
                  src={banner.backgroundImage}
                  alt="product image"
                />
              </td>

              <td>
                <img
                  className="p-2 object-cover"
                  src={banner.poster}
                  alt="product image"
                />
              </td>

              <td>
                <button>
                  <AiFillEdit size={20} />
                </button>
                <button>
                  <MdDelete size={20} className="ml-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Shop;
