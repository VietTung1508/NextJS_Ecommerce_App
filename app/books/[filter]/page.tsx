import BookSort from "../component/BookSort";
import { getProductsByParam } from "@/app/actions/getProductsByParam";

const Page = async ({ params }: { params: { filter: string } }) => {
  let books;

  const priceRange = params.filter
    .replaceAll("%20", " ")
    .replaceAll("%C4%91", " ")
    .split(" ");

  const priceFilter = priceRange.filter(Number);

  let min;
  let max;

  if (priceFilter.length > 0) {
    if (
      Number(priceFilter[0].split(".").join("")) === 100000 &&
      priceFilter.length === 1
    ) {
      min = 0;
      max = Number(priceFilter[0].split(".").join(""));
    } else if (Number(priceFilter[0].split(".").join("")) === 900000) {
      min = Number(priceFilter[0].split(".").join(""));
    } else {
      min = Number(priceFilter[0].split(".").join(""));
      max = Number(priceFilter[1].split(".").join(""));
    }
  }

  books = await getProductsByParam(
    params.filter.replaceAll("%20", " "),
    min,
    max
  );

  return (
    <div className="w-full lg:w-3/4 flex flex-col">
      <BookSort books={books} pages={Math.ceil(books.length / 20)} />
    </div>
  );
};

export default Page;
