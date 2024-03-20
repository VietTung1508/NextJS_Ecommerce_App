import Link from "next/link";
import { searchProducts } from "../actions/searchProducts";
import BookLists from "../components/Book/BookLists";
import DetailPageBanner from "../components/DetailPageBanner";
import clsx from "clsx";
import { searchProductsNumber } from "../actions/searchProductNumber";

const Search = async ({ searchParams }: any) => {
  const products = await searchProducts(searchParams.q, searchParams.page);
  const productsNumber = await searchProductsNumber(searchParams.q);
  const pages = Math.ceil(productsNumber / 20);
  const currentPage = searchParams.page;
  return (
    <div>
      <DetailPageBanner />
      <div className="max-w-screen-xl mx-auto px-10 mb-5">
        <h2 className="text-2xl font-semibold mb-3">Search Page</h2>
        <h3 className="mb-4 text-lg ">
          This is <span className="text-xl">{productsNumber}</span> products
          fullfill your search
        </h3>
        <BookLists search books={products} sortMethod="default" />
        <div className="w-full flex justify-end">
          {[...Array(pages)].map((page, i) => {
            return (
              <Link href={`/search?q=${searchParams.q}&page=${i + 1}`} key={i}>
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
    </div>
  );
};

export default Search;
