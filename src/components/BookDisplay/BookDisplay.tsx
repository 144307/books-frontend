import useBookContext from "../../context/useBookContext";
import type { IBookContext } from "../../types";
import BookCard from "../BookCard/BookCard";

function BookDisplay() {
  const books: Array<IBookContext> = useBookContext();
  return (
    <section className="w-full flex place-content-center">
      <div className="max-w-6xl w-full flex place-content-center pt-10 pb-10">
        <div className="flex flex-wrap place-content-between gap-6 max-w-6xl w-full p-4">
          {books.map((book) => (
            <BookCard
              key={book.title}
              title={book.title}
              coverUrl={book.coverURL}
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
