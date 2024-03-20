import getCategories from "@/app/actions/getCategories";
import SidebarBox from "./SidebarBox";
import { getAuthors } from "@/app/actions/getAuthors";
import { Category } from "@prisma/client";

const priceRange = [
  { name: "Under 100.000đ" },
  { name: "100.000đ - 200.000đ" },
  { name: "200.000đ - 300.000đ" },
  { name: "300.000đ - 500.000đ" },
  { name: "500.000đ - 900.000đ" },
  { name: "Above 900.000đ" },
];

const format = [{ name: "Paperback" }, { name: "Hardback" }];

interface SidebarProps {
  categories: Category[];
  authorsDecoded: { name: string }[];
}

const Sidebar:React.FC<SidebarProps> = async ({categories, authorsDecoded}) => {
  return (
    <div className="hidden flex-col w-1/4 lg:flex">
      <SidebarBox title="ALL CATEGORIES" items={categories} />
      <SidebarBox title="AUTHOR" items={authorsDecoded} />
      <SidebarBox title="PRICE RANGE" items={priceRange} />
      <SidebarBox title="FORMAT" items={format} />
    </div>
  );
};

export default Sidebar;
