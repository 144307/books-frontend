import { useNavigate } from "react-router";
import type { ClientBook } from "../../types";

interface BookInfoCardProps {
  book: ClientBook;
}

function BookInfoCard({ book }: BookInfoCardProps) {
  const navigate = useNavigate();

  //   const openBook = () => navigate(`/books/${book.id}/fragment`);

  return (
    <article
      //   onClick={openBook}
      className="flex cursor-pointer flex-[0_1_460px] gap-5"
    >
      <img
        src={book.cover_url}
        alt={`Cover of ${book.book_name}`}
        className="h-auto w-65 self-start rounded-sm object-cover shadow-[0_2px_12px_rgba(31,36,48,0.12)]"
      />
      <div className="flex flex-1 flex-col font-book">
        <h3
          className="mb-2 text-xl text-[#1f2430]"
          onClick={() => {
            navigate(`/books/${book.id}`);
          }}
        >
          {book.book_name}
        </h3>
        <p className="mb-4 flex-1 text-[0.95rem] leading-relaxed text-[#6b7280]">
          {book.annotation}
        </p>
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={(event) => event.stopPropagation()}
            className="cursor-pointer rounded-md border border-[#1f2430] bg-transparent px-4 py-2 text-[0.9rem] text-[#1f2430] transition-colors hover:bg-[#1f2430] hover:text-[#f7f4ee]"
          >
            About
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/books/${book.id}/fragment`);
            }}
            className="cursor-pointer rounded-md border border-[#1f2430] bg-transparent px-4 py-2 text-[0.9rem] text-[#1f2430] transition-colors hover:bg-[#1f2430] hover:text-[#f7f4ee]"
          >
            Sample
          </button>
          <button
            type="button"
            onClick={(event) => event.stopPropagation()}
            className="cursor-pointer rounded-md border border-[#b3541e] bg-[#b3541e] px-4 py-2 text-[0.9rem] text-white transition-colors hover:border-[#8f3f12] hover:bg-[#8f3f12]"
          >
            Buy
          </button>
        </div>
      </div>
    </article>
  );
}

export default BookInfoCard;
