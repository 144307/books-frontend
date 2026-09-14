import useBookContext from "../context/useBookContext";
import Header from "../components/Header/Header";
import CardsSection from "../components/CardsSection/CardsSection";

function NowInWorks() {
  const { books, isLoading, error } = useBookContext();

  return (
    <div className="min-h-screen bg-[#f4ecd8]">
      <Header />
      {isLoading && (
        <div className="page-width px-6 py-16 text-center text-stone-600">
          Loading…
        </div>
      )}
      {error && (
        <div className="page-width px-6 py-16 text-center text-amber-900">
          Failed to load books. ({error})
        </div>
      )}
      {!isLoading && !error && (
        <>
          {books.some((b) => b.in_works) ? (
            <CardsSection
              books={books.filter((b) => b.in_works)}
              order={1}
              title="Now in Works"
              variant="sample"
            ></CardsSection>
          ) : (
            <div className="page-width px-6 py-16 text-center font-book text-[1.2rem] text-[#6b7280]">
              Nothing in progress yet
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default NowInWorks;
