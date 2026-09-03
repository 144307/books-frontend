import useBookContext from "../context/useBookContext";
import Cover from "../components/Cover/Cover";
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
      {books.map((book, index) => (
        <Cover
          book={book}
          hasTopWave={index > 0}
          hasNext={index < books.length - 1}
          key={book.id}
        ></Cover>
      ))}
    </>
  );
}

export default Home;
