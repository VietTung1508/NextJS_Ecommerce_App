"use client";

import BookLists from "@/app/components/Book/BookLists";
import { Product } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { useSearchParams } from "next/navigation";

interface BookSortProps {
  books: Product[];
  pages: number;
}

const sortItems = [
  { name: "Ascending" },
  { name: "Descending" },
  { name: "A - Z" },
  { name: "Z - A" },
];

const BookSort: React.FC<BookSortProps> = ({ books, pages }) => {
  const [sortMethod, setSortMethod] = useState("default");
  const search = useSearchParams();
  const currentPage = search.get("page");
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h3>Buying Legit Book At Ha Noi</h3>
        <div className="flex items-center gap-1 relative">
          <h5>Sort By :</h5>
          <div className="text-sm cursor-pointer group">
            <span>{sortMethod[0].toUpperCase() + sortMethod.slice(1)}</span>
            <div className="absolute top-5 right-0 bg-white hidden flex-col z-50  w-full items-center border-2 border-gray-200 group-hover:flex">
              {sortItems.map((item, i) => (
                <h3
                  key={i}
                  className="border-b-2 border-b-gray-200 w-full px-3 py-2"
                  onClick={() => {
                    setSortMethod(item.name);
                  }}
                >
                  {item.name}
                </h3>
              ))}
            </div>
          </div>
          <AiOutlineDown />
        </div>
      </div>
      <div className="flex flex-col">
        <BookLists books={books} sortMethod={sortMethod} />
        <div className="flex w-full justify-end gap-2 pr-6 mb-4">
          {[...Array(pages)].map((page, i) => {
            return (
              <Link href={`/books/?page=${i + 1}`} key={i}>
                <span
                  className={clsx(
                    `ml-2 cursor-pointer`,
                    Number(currentPage) === i + 1 &&
                      "text-auth-btn font-semibold"
                  )}
                >
                  {i + 1}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BookSort;
