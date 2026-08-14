import useBookContext from "../../context/useBookContext";
import type { BookContextState } from "../../types";
import BookCard from "../BookCard/BookCard";

function BookDisplay() {
  const context: BookContextState = useBookContext();
  return (
    <section className="w-full flex place-content-center">
      <div className="max-w-6xl w-full flex place-content-center pt-10 pb-10">
        <div className="flex flex-wrap place-content-between gap-6 max-w-6xl w-full p-4">
          {context.books.map((book) => (
            <BookCard
              key={book.book_name}
              title={book.book_name}
              coverUrl={""}
              onBuy={() => {}}
              onSample={() => {}}
            ></BookCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BookDisplay;
