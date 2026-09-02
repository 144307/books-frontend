import useBookContext from "../context/useBookContext";
import Cover from "../components/Cover/Cover";
import Header from "../components/Header/Header";

function Home() {
  const { books } = useBookContext();
  return (
    <>
      <Header></Header>
      {books.map((book, index) => (
        <Cover
          bookId={book.id}
          hasTopWave={index > 0}
          hasNext={index < books.length - 1}
          key={book.id}
        ></Cover>
      ))}
    </>
  );
}

export default Home;
