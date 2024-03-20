import BookSlideList from "../components/Book/BookSlideList";
import { getDetailBook } from "../actions/getDetailBook";
import DetailBook from "./components/DetailBook";
import { getProductsByCategory } from "../actions/getProductsByCategory";

const BookDetail = async ({ params }: { params: { id: string } }) => {
  const book: any = await getDetailBook(params.id);
  const similar = await getProductsByCategory(book.category.name);

  return (
    <div className="mt-36 flex flex-col gap-10 mx-auto max-w-screen-lg w-full mb-10">
      <DetailBook book={book || null} />
      <BookSlideList
        link={`/NewArrival${book.name}`}
        oneLine
        title="You May Also Like"
        books={similar}
      />
    </div>
  );
};

export default BookDetail;
