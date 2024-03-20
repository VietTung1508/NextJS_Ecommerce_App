"use client";
import CategoryDrawer from "@/app/components/Modal/CategoryDrawer";
import { Category } from "@prisma/client";
import { useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";

interface SidebarModalProps {
  categories: Category[];
  authorsDecoded: { name: string }[];
}

const SidebarModal: React.FC<SidebarModalProps> = ({
  categories,
  authorsDecoded,
}) => {
  const [openCategory, setOpenCategory] = useState(false);
  return (
    <>
      <CategoryDrawer
        isOpen={openCategory}
        onClose={() => setOpenCategory(false)}
        categories={categories}
        authors={authorsDecoded}
      />
      <div className="fixed top-52 right-0 z-50 lg:hidden">
        <div
          className="p-3 bg-auth-btn cursor-pointer rounded-l-lg"
          onClick={() => setOpenCategory(true)}
        >
          <BiCategoryAlt size={20} />
        </div>
      </div>
    </>
  );
};

export default SidebarModal;
