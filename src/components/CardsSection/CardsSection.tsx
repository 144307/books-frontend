import type { ClientBook } from "../../types";
import BookInfoCard from "./BookInfoCard";

interface CardsSectionProps {
  books: ClientBook[];
}

function CardsSection({ books }: CardsSectionProps) {
  return (
    <section className="bg-[#f7f4ee] px-6 pt-4 pb-8 font-book">
      <h2 className="mt-12 mb-6 text-center text-[1.6rem] text-[#1f2430]">
        Featured Titles
      </h2>
      <div className="flex flex-wrap items-start justify-evenly gap-12">
        {books.map((book) => (
          <BookInfoCard key={book.id} book={book}></BookInfoCard>
        ))}
      </div>
    </section>
  );
}

export default CardsSection;
