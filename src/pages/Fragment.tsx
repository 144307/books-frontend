import { useNavigate, useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import Header from "../components/Header/Header";
import useBookContext from "../context/useBookContext";
import type { ClientBook } from "../types";

function getChapter(book: ClientBook | undefined, n: number): string | null {
  if (!book) return null;
  switch (n) {
    case 1:
      return book.chapter_1;
    case 2:
      return book.chapter_2;
    case 3:
      return book.chapter_3;
    case 4:
      return book.chapter_4;
    case 5:
      return book.chapter_5;
    default:
      return null;
  }
}

function Fragment() {
  const navigate = useNavigate();
  const { bookID: rawBookID, fragmentID: rawFragmentID } = useParams();
  const bookID = Number.parseInt(rawBookID ?? "-1");
  const fragmentID = Number.parseInt(rawFragmentID ?? "1");
  const context = useBookContext();

  const book = context.books.find((b) => b.id === bookID);
  const chapter = getChapter(book, fragmentID);
  const hasPrev = fragmentID > 1;
  const hasNext = getChapter(book, fragmentID + 1) !== null;

  if (context.isLoading)
    return (
      <div className="min-h-screen bg-[#f4ecd8]">
        <Header />
        <div className="mx-auto max-w-2xl px-6 py-16 text-center text-stone-600">
          Loading…
        </div>
      </div>
    );

  if (context.error)
    return (
      <div className="min-h-screen bg-[#f4ecd8]">
        <Header />
        <div className="mx-auto max-w-2xl px-6 py-16 text-center text-amber-900">
          Failed to load books. ({context.error})
        </div>
      </div>
    );

  if (!book || chapter === null)
    return (
      <div className="min-h-screen bg-[#f4ecd8]">
        <Header />
        <div className="mx-auto max-w-2xl px-6 py-16 text-center text-amber-900">
          Book not found.
        </div>
      </div>
    );

  return (
    <div className="pt-10 min-h-screen bg-[#f4ecd8]">
      <Header />
      <div className="mx-auto flex w-[54rem] max-w-full justify-center gap-3 px-6 pt-8">
        <button
          type="button"
          disabled={!hasPrev}
          onClick={() =>
            navigate(`/books/${bookID}/fragment/${fragmentID - 1}`)
          }
          className="cursor-pointer rounded-lg border border-stone-400 bg-stone-700 px-5 py-3 text-sm font-medium uppercase tracking-widest text-stone-100 enabled:hover:bg-stone-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous Fragment
        </button>
        <button
          type="button"
          disabled={!hasNext}
          onClick={() =>
            navigate(`/books/${bookID}/fragment/${fragmentID + 1}`)
          }
          className="cursor-pointer rounded-lg border border-stone-400 bg-stone-700 px-5 py-3 text-sm font-medium uppercase tracking-widest text-stone-100 enabled:hover:bg-stone-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next Fragment
        </button>
      </div>
      <article className="mx-auto w-[54rem] max-w-full px-6 py-16">
        <span className="block text-sm font-medium uppercase tracking-[0.3em] text-amber-800">
          Book Fragment
        </span>
        <div className="prose prose-stone prose-p:my-4 prose-p:text-justify mt-8 max-w-none font-book text-lg leading-normal">
          <ReactMarkdown>{chapter}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}

export default Fragment;
