import type { ClientBook } from "../../types";
import BookCard from "../BookCard/BookCard";

const CARD_BG = ["bg-[#faf7f0]", "bg-[#efe4d1]"];

interface CardsSectionProps {
  books: ClientBook[];
  order: number;
  title?: string;
  variant?: "full" | "sample";
}

function CardsSection({ books, order, variant }: CardsSectionProps) {
  return (
    <section
      className={`font-book ${
        order % 2 === 1 ? "bg-[#f7f4ee]" : "bg-[#f4ecd8]"
      }`}
    >
      <h2 className="mt-16 mb-6 text-center text-[1.6rem] text-[#1f2430]">
        Книги
      </h2>
      <div className="flex flex-col items-stretch">
        {books.map((book, index) => (
          <BookCard
            key={book.id}
            book={book}
            variant={variant}
            bg={CARD_BG[index % CARD_BG.length]}
          ></BookCard>
        ))}
      </div>
    </section>
  );
}

export default CardsSection;
