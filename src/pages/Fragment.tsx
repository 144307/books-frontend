import { useNavigate, useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import Header from "../components/Header/Header";
import useBookContext from "../context/useBookContext";
import { useEffect } from "react";

function Fragment() {
  const navigate = useNavigate();
  const rawBookID = useParams()["bookID"];
  const bookID = Number.parseInt(!rawBookID ? "-1" : rawBookID);
  const rawFragmentID = useParams()["fragmentID"];
  const fragmentID = Number.parseInt(!rawFragmentID ? "1" : rawFragmentID);
  const context = useBookContext();

  useEffect(() => {
    console.log(context.books);
    if (context.books) {
      switch (fragmentID) {
        case 1:
          console.log("TEST", context.books[bookID].chapter_1);
          break;
      }
    }
  }, [context.books, context.isLoading]);

  function hasNext(fragmentID: number): boolean {
    if (fragmentID < context.books.length) {
      if (context.books[fragmentID + 1] !== null) {
        return true;
      }
    }
    return false;
  }

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
          Book not found. ({context.error})
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f4ecd8]">
      <Header />
      {context.isLoading === false && (
        <div className="mx-auto flex w-[54rem] max-w-full justify-center gap-3 px-6 pt-8">
          <button
            type="button"
            disabled={hasNext(fragmentID)} // TODO replace with hasPrev
            onClick={() =>
              navigate(`/books/${bookID}/fragment/${fragmentID - 1}`)
            }
            className="cursor-pointer rounded-lg border border-stone-400 bg-stone-700 px-5 py-3 text-sm font-medium uppercase tracking-widest text-stone-100 enabled:hover:bg-stone-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous Fragment
          </button>
          <button
            type="button"
            disabled={hasNext(fragmentID)}
            onClick={() =>
              navigate(`/books/${bookID}/fragment/${fragmentID + 1}`)
            }
            className="cursor-pointer rounded-lg border border-stone-400 bg-stone-700 px-5 py-3 text-sm font-medium uppercase tracking-widest text-stone-100 enabled:hover:bg-stone-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next Fragment
          </button>
        </div>
      )}
      <article className="mx-auto w-[54rem] max-w-full px-6 py-16">
        <span className="block text-sm font-medium uppercase tracking-[0.3em] text-amber-800">
          Book Fragment
        </span>
        <div className="prose prose-stone prose-p:my-4 prose-p:text-justify mt-8 max-w-none font-['Libre_Baskerville'] text-lg leading-normal">
          <ReactMarkdown>Test Fragment</ReactMarkdown>
        </div>
      </article>

      {/* {state.type === "success" && (
        <div className="mx-auto flex w-[54rem] max-w-full justify-center gap-3 px-6 pt-8">
          <button
            type="button"
            disabled={hasNext(fragmentID)} // TODO replace with hasPrev
            onClick={() =>
              navigate(`/books/${bookID}/fragment/${fragmentID - 1}`)
            }
            className="cursor-pointer rounded-lg border border-stone-400 bg-stone-700 px-5 py-3 text-sm font-medium uppercase tracking-widest text-stone-100 enabled:hover:bg-stone-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous Fragment
          </button>
          <button
            type="button"
            disabled={hasNext(fragmentID)}
            onClick={() =>
              navigate(`/books/${bookID}/fragment/${fragmentID + 1}`)
            }
            className="cursor-pointer rounded-lg border border-stone-400 bg-stone-700 px-5 py-3 text-sm font-medium uppercase tracking-widest text-stone-100 enabled:hover:bg-stone-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next Fragment
          </button>
        </div>
      )} */}
    </div>
  );
}

export default Fragment;
