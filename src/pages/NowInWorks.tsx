import CardsSection from "../components/CardsSection/CardsSection";
import Layout from "../components/Layout/Layout";
import PageMessage from "../components/PageMessage/PageMessage";
import useBookContext from "../context/useBookContext";
import usePageTitle from "../hooks/usePageTitle";

function NowInWorks() {
  const { books, isLoading, error } = useBookContext();
  usePageTitle("На столе писателя");

  return (
    <Layout>
      {isLoading && <PageMessage kind="loading" />}
      {error && <PageMessage kind="error" text={error} />}
      {!isLoading && !error && (
        <>
          {books.some((b) => b.in_works) ? (
            <CardsSection
              books={books.filter((b) => b.in_works)}
              order={1}
              title="На столе писателя"
            />
          ) : (
            <PageMessage kind="notice" text="Пока нет книг в работе." />
          )}
        </>
      )}
    </Layout>
  );
}

export default NowInWorks;
