import useBookContext from "../context/useBookContext";
import Banner from "../components/Banner/Banner";
import CardsSection from "../components/CardsSection/CardsSection";
import Footer from "../components/Footer/Footer";
import Gallery from "../components/Gallery/Gallery";
import Header from "../components/Header/Header";

function Home() {
  const { books, isLoading, error } = useBookContext();

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#f4ecd8]">
        <Header />
        <div className="mx-auto max-w-2xl px-6 py-16 text-center text-stone-600">
          Загрузка…
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
    <div className="flex min-h-screen flex-col bg-[#f4ecd8]">
      <Header></Header>
      <Banner
        title="Имя автора"
        subtitle="A journey through the forgotten pages of history"
      ></Banner>
      {books.some((b) => !b.in_works) && (
        <CardsSection
          books={books.filter((b) => !b.in_works)}
          order={1}
        ></CardsSection>
      )}
      <Gallery order={2}></Gallery>
      <Footer />
    </div>
  );
}

export default Home;
