import { Link, useNavigate } from "react-router";
import type { ClientBook } from "../../types";

interface BookCardProps {
  book: ClientBook;
  variant?: "full" | "sample";
  bg?: string;
}

function BookCard({
  book,
  variant = "full",
  bg = "bg-[#faf7f0]",
}: BookCardProps) {
  const navigate = useNavigate();

  return (
    <article className={`w-full py-6 ${bg}`}>
      <div className="page-width px-6">
        <div className="flex h-auto w-full flex-col items-stretch gap-10 sm:h-100 sm:flex-row">
          <img
            src={book.cover_url}
            alt={`Cover of ${book.book_name}`}
            className="h-auto w-full rounded-sm object-cover shadow-[0_2px_12px_rgba(31,36,48,0.12)] sm:h-full sm:w-65 sm:shrink-0"
          />

          <div className="flex flex-col min-h-0 min-w-0 flex-1 font-book">
            <h3 className="pb-6 shrink-0 text-4xl font-bold font-book text-[#1f2430]">
              <Link
                to={`/books/${book.id}`}
                className="transition-colors hover:text-[#d18a63]"
              >
                {book.book_name}
              </Link>
            </h3>

            {/* <div className="max-h-40 min-h-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_calc(100%_-_3rem),transparent)] sm:max-h-none sm:flex-1"> */}
            <div className="max-h-40 min-h-0 overflow-auto sm:max-h-none sm:flex-1">
              <p className="wrap-break-word text-[18px] leading-relaxed text-[#6b7280]">
                {book.annotation}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-evenly ml-auto shrink-0 flex-wrap gap-2.5 pt-6">
            {variant === "full" && (
              <button
                type="button"
                onClick={() => navigate(`/books/${book.id}`)}
                className="flex justify-center cursor-pointer rounded-md border border-[#1f2430] bg-transparent px-4 pt-[0.5625rem] pb-2 text-[0.9rem] font-medium uppercase tracking-widest text-[#1f2430] transition-colors hover:bg-[#1f2430] hover:text-[#f7f4ee]"
              >
                О книге
              </button>
            )}
            <button
              type="button"
              onClick={() => navigate(`/books/${book.id}/fragment`)}
              className="flex justify-center cursor-pointer rounded-md border border-[#1f2430] bg-transparent px-4 pt-[0.5625rem] pb-2 text-[0.9rem] font-medium uppercase tracking-widest text-[#1f2430] transition-colors hover:bg-[#1f2430] hover:text-[#f7f4ee]"
            >
              Отрывок
            </button>
            {variant === "full" && (
              <a
                href="#"
                className="flex justify-center cursor-pointer rounded-md border border-[#e6ac8e] bg-[#e6ac8e] px-4 pt-[0.5625rem] pb-2 text-[0.9rem] font-medium uppercase tracking-widest text-[#1f2430] transition-colors hover:border-[#d18a63] hover:bg-[#d18a63]"
              >
                Купить
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default BookCard;
