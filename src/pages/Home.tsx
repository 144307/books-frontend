import useBookContext from "../context/useBookContext";
import Banner from "../components/Banner/Banner";
import CardsSection from "../components/CardsSection/CardsSection";
import Gallery from "../components/Gallery/Gallery";
import Header from "../components/Header/Header";

function Home() {
  const { books, isLoading, error } = useBookContext();

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#f4ecd8]">
        <Header />
        <div className="mx-auto max-w-2xl px-6 py-16 text-center text-stone-600">
          Loading…
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#f4ecd8]">
        <Header />
        <div className="mx-auto max-w-2xl px-6 py-16 text-center text-amber-900">
          Failed to load books. ({error})
        </div>
      </div>
    );

  return (
    <>
      <Header></Header>
      <Banner
        title="Имя автора"
        subtitle="A journey through the forgotten pages of history"
      ></Banner>
      {books.length > 0 && (
        <>
          <CardsSection books={books} order={1}></CardsSection>
        </>
      )}
      <Gallery order={2}></Gallery>
    </>
  );
}

export default Home;
