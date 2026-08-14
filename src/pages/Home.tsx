import useBookContext from "../context/useBookContext";
import Cover from "../components/Cover/Cover";
import Header from "../components/Header/Header";

function Home() {
  const { books } = useBookContext();
  return (
    <>
      <Header></Header>
      {books.map((book) => (
        <Cover bookId={book.id} key={book.id}></Cover>
      ))}
    </>
  );
}

export default Home;
