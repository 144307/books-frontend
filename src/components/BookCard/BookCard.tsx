import { Link } from "react-router";
import { useLayoutEffect, useRef, useState } from "react";
import type { ClientBook } from "../../types";
import Button from "../Button/Button";

interface BookCardProps {
  book: ClientBook;
  bg?: string;
}

function getHidden(el: HTMLElement) {
  const content = el.firstElementChild as HTMLElement | null;
  return (content ? content.scrollHeight : el.scrollHeight) - el.clientHeight;
}

function BookCard({ book, bg = "bg-[#faf7f0]" }: BookCardProps) {
  const [isClipped, setIsClipped] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const measure = () => {
      const hidden = getHidden(el);
      setIsClipped(hidden > 32);
      setIsAtBottom(hidden - el.scrollTop <= 32);
    };
    measure();
    document.fonts?.ready.then(measure);
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    const content = el.firstElementChild;
    if (content) observer.observe(content);
    return () => observer.disconnect();
  }, []);

  const showFade = isClipped && !isAtBottom;

  return (
    <article className={`w-full py-6 ${bg}`}>
      <div className="page-width px-6">
        <div className="flex h-auto w-full flex-col items-stretch gap-10 sm:h-100 sm:flex-row">
          <img
            src={book.cover_url}
            alt={`Обложка книги «${book.book_name}»`}
            loading="lazy"
            className="h-auto w-full rounded-sm object-cover shadow-[0_2px_12px_rgba(31,36,48,0.12)] sm:h-full sm:w-65 sm:shrink-0"
          />

          <div className="flex min-h-0 min-w-0 flex-1 flex-col font-book">
            <h3 className="shrink-0 pb-6 font-book text-4xl font-bold text-[#1f2430]">
              <Link
                to={`/books/${book.id}`}
                className="transition-colors hover:text-[#d18a63]"
              >
                {book.book_name}
              </Link>
            </h3>

            <div
              ref={textRef}
              onScroll={(event) => {
                const el = event.currentTarget;
                setIsAtBottom(getHidden(el) - el.scrollTop <= 32);
              }}
              className={`max-h-40 min-h-0 flex-1 overflow-auto sm:max-h-none${
                showFade ? " fade-mask" : ""
              }`}
            >
              <p className="wrap-break-word text-[18px] leading-relaxed text-[#6b7280]">
                {book.annotation}
              </p>
            </div>
          </div>
          <div className="flex w-full shrink-0 flex-row justify-center gap-2 sm:ml-auto sm:w-auto sm:flex-col sm:justify-evenly sm:gap-2.5 sm:pt-6">
            <Button to={`/books/${book.id}`} className="flex-1 sm:flex-none">
              О книге
            </Button>
            <Button
              to={`/books/${book.id}/fragment`}
              className="flex-1 sm:flex-none"
            >
              Отрывок
            </Button>
            <Button
              variant="accent"
              href={book.purchase_url ?? "#"}
              className="flex-1 sm:flex-none"
            >
              Купить
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BookCard;
