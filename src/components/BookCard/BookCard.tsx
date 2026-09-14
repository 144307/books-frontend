import { useNavigate } from "react-router";
import type { ClientBook } from "../../types";

interface BookCardProps {
  book: ClientBook;
  variant?: "full" | "sample";
}

function BookCard({ book, variant = "full" }: BookCardProps) {
  const navigate = useNavigate();

  return (
    <article className="flex h-100 w-full cursor-pointer items-stretch gap-5">
      <img
        src={book.cover_url}
        alt={`Cover of ${book.book_name}`}
        className="h-full w-65 shrink-0 rounded-sm object-cover shadow-[0_2px_12px_rgba(31,36,48,0.12)]"
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col font-book">
        <h3
          className="pb-6 shrink-0 text-4xl font-bold font-sans text-[#1f2430]"
          onClick={() => navigate(`/books/${book.id}`)}
        >
          {book.book_name}
        </h3>

        <div className="min-h-0 flex-1 overflow-hidden">
          <p className="h-full wrap-break-word text-[18px] leading-relaxed text-[#6b7280] overflow-hidden line-clamp-2 text-ellipsis">
            {book.annotation}
          </p>
        </div>

        <div className="ml-auto pt-6 flex shrink-0 flex-wrap gap-2.5">
          {variant === "full" && (
            <button
              type="button"
              onClick={(event) => event.stopPropagation()}
              className="cursor-pointer rounded-md border border-[#1f2430] bg-transparent px-4 py-2 text-[0.9rem] text-[#1f2430] transition-colors hover:bg-[#1f2430] hover:text-[#f7f4ee]"
            >
              About
            </button>
          )}
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
          {variant === "full" && (
            <button
              type="button"
              onClick={(event) => event.stopPropagation()}
              className="cursor-pointer rounded-md border border-[#b3541e] bg-[#b3541e] px-4 py-2 text-[0.9rem] text-white transition-colors hover:border-[#8f3f12] hover:bg-[#8f3f12]"
            >
              Buy
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default BookCard;
