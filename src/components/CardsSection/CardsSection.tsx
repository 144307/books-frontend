import type { ClientBook } from "../../types";
import BookCard from "../BookCard/BookCard";

interface CardsSectionProps {
  books: ClientBook[];
  order: number;
}

function CardsSection({ books, order }: CardsSectionProps) {
  return (
    <section
      className={`px-6 pt-4 pb-8 font-book ${
        order % 2 === 1 ? "bg-[#f7f4ee]" : "bg-[#f4ecd8]"
      }`}
    >
      <h2 className="mt-12 mb-6 text-center text-[1.6rem] text-[#1f2430]">
        Featured Titles
      </h2>
      <div className="page-width flex flex-col items-stretch gap-12 px-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book}></BookCard>
        ))}
      </div>
    </section>
  );
}

export default CardsSection;
