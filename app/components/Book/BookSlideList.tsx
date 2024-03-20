"use client";

import BookItem from "./BookItem";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Product } from "@prisma/client";

interface BookSlideListProps {
  books: Product[];
  title: String;
  oneLine?: boolean;
  link: String;
  book?: Product;
}

const BookSlideList: React.FC<BookSlideListProps> = ({
  title,
  oneLine,
  books,
  link,
  book,
}) => {
  return (
    <div className="flex flex-col mx-auto max-w-screen-lg my-10 px-5 lg:px-0 w-full">
      <div className="border-b-2 mb-5">
        <div className="inline-flex justify-center items-center font-semibold cursor-pointer text-white py-2 px-5 bg-auth-btn hover:text-black transition-all ">
          <Link href={`/${link}`}>{title}</Link>
        </div>
      </div>
      {oneLine ? (
        <div className="book-list">
          <Swiper grabCursor={true} spaceBetween={15} slidesPerView={"auto"}>
            {books.map((book, i) => (
              <SwiperSlide key={i}>
                <BookItem item={book} oneLine />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
          <SwiperSlide>
            <div className="flex items-center flex-wrap gap-7">
              {books.slice(0, 10).map((book, i) => (
                <BookItem item={book} key={i} />
              ))}
            </div>
          </SwiperSlide>
        </Swiper>
      )}
    </div>
  );
};

export default BookSlideList;
