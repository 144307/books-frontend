import useBookContext from "../../context/useBookContext";
import type { IBookContext } from "../../types";
import BookCard from "../BookCard/BookCard";

function BookDisplay() {
  const books: Array<IBookContext> = useBookContext();
  return (
    <div className="flex flex-wrap items-start gap-6 p-10">
      {books.map((book) => (
        <BookCard
          title={book.title}
          coverUrl={book.coverURL}
          onBuy={() => {}}
          onSample={() => {}}
        ></BookCard>
      ))}
    </div>
  );
}

export default BookDisplay;
