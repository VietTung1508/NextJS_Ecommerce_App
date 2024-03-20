import getProducts from "../actions/getProducts";
import { getProductsNumber } from "../actions/getProductsNumber";
import BookSort from "./component/BookSort";

const Books = async ({ searchParams }: any) => {
  const books = await getProducts(searchParams.page);
  const productNumber = await getProductsNumber();
  const pages = Math.ceil(productNumber / 20);
  return (
    <div className="w-full px-5 flex flex-col lg:w-3/4 lg:px-0">
      <BookSort books={books} pages={pages} />
    </div>
  );
};

export default Books;
