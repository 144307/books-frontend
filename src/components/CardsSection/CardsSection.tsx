import type { ClientBook } from "../../types";
import BookCard from "../BookCard/BookCard";

interface CardsSectionProps {
  books: ClientBook[];
  order: number;
  title?: string;
  variant?: "full" | "sample";
}

function CardsSection({
  books,
  order,
  title = "Books",
  variant,
}: CardsSectionProps) {
  return (
    <section
      className={`px-6 pt-4 pb-8 font-book ${
        order % 2 === 1 ? "bg-[#f7f4ee]" : "bg-[#f4ecd8]"
      }`}
    >
      <h2 className="mt-12 mb-6 text-center text-[1.6rem] text-[#1f2430]">
        {title}
      </h2>
      <div className="page-width flex flex-col items-stretch gap-12 px-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} variant={variant}></BookCard>
        ))}
      </div>
    </section>
  );
}

export default CardsSection;
