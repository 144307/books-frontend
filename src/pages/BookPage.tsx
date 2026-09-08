import { useNavigate, useParams } from "react-router";
import Header from "../components/Header/Header";
import Gallery from "../components/Gallery/Gallery";
import CharactersSection from "../components/CharactersSection/CharactersSection";
import useBookContext from "../context/useBookContext";

function BookPage() {
  const navigate = useNavigate();
  const { bookID: rawBookID } = useParams();
  const bookID = Number.parseInt(rawBookID ?? "-1");
  const context = useBookContext();

  const book = context.books.find((b) => b.id === bookID);

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

  if (!book)
    return (
      <div className="min-h-screen bg-[#f4ecd8]">
        <Header />
        <div className="mx-auto max-w-2xl px-6 py-16 text-center text-amber-900">
          Book not found.
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f4ecd8]">
      <Header />
      <section className="bg-[#f7f4ee] pt-20 pb-12 font-book">
        <div className="page-width flex flex-wrap items-start justify-center gap-10 px-6">
          <img
            src={book.cover_url}
            alt={`Cover of ${book.book_name}`}
            className="w-[320px] self-start rounded-[4px] object-cover shadow-[0_2px_12px_rgba(31,36,48,0.12)]"
          />
          <div className="flex min-w-[16rem] flex-1 flex-col">
            <h1 className="mb-4 text-3xl text-[#1f2430]">{book.book_name}</h1>
            <p className="mb-6 flex-1 text-[0.95rem] leading-relaxed text-[#6b7280]">
              {book.annotation}
            </p>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => {}}
                className="cursor-pointer rounded-md border border-[#1f2430] bg-transparent px-4 py-2 text-[0.9rem] text-[#1f2430] transition-colors hover:bg-[#1f2430] hover:text-[#f7f4ee]"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => navigate(`/books/${book.id}/fragment`)}
                className="cursor-pointer rounded-md border border-[#1f2430] bg-transparent px-4 py-2 text-[0.9rem] text-[#1f2430] transition-colors hover:bg-[#1f2430] hover:text-[#f7f4ee]"
              >
                Sample
              </button>
              <button
                type="button"
                onClick={() => {}}
                className="cursor-pointer rounded-md border border-[#b3541e] bg-[#b3541e] px-4 py-2 text-[0.9rem] text-white transition-colors hover:border-[#8f3f12] hover:bg-[#8f3f12]"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </section>
      <Gallery order={2}></Gallery>
      {context.characters.length > 0 && (
        <CharactersSection
          characters={context.characters}
          order={3}
        ></CharactersSection>
      )}
    </div>
  );
}

export default BookPage;
