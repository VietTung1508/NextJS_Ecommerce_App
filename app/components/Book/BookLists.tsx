"use client";
import { Product } from "@prisma/client";
import BookItem from "./BookItem";
import clsx from "clsx";

interface BookListProps {
  books: Product[];
  sortMethod: string;
  search?: boolean;
}

const BookLists: React.FC<BookListProps> = ({ books, sortMethod, search }) => {
  if (sortMethod === "Ascending") {
    books.sort((a, b) => {
      return a.price - b.price;
    });
  } else if (sortMethod === "Descending") {
    books.sort((a, b) => {
      return b.price - a.price;
    });
  } else if (sortMethod === "A - Z") {
    books.sort((a, b) => {
      var nameA = a.name.toLowerCase(),
        nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  } else if (sortMethod === "Z - A") {
    books.sort((a, b) => {
      var nameA = a.name.toLowerCase(),
        nameB = b.name.toLowerCase();
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
      return 0;
    });
  }

  return (
    <>
      <div
        className={clsx(
          `flex lg:gap-8 sm:gap-10 md:gap-8 xl:gap-8 items-center flex-wrap lg:px-0 px-5 gap-10`
        )}
      >
        {books.map((book, i) => (
          <BookItem allBooks search={search} key={i} item={book} />
        ))}
      </div>
    </>
  );
};

export default BookLists;
