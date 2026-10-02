import useBookContext from "../context/useBookContext";
import usePageTitle from "../hooks/usePageTitle";
import Banner from "../components/Banner/Banner";
import CardsSection from "../components/CardsSection/CardsSection";
import Gallery from "../components/Gallery/Gallery";
import Layout from "../components/Layout/Layout";
import PageMessage from "../components/PageMessage/PageMessage";

function Home() {
  const { books, isLoading, error } = useBookContext();
  usePageTitle();

  if (isLoading)
    return (
      <Layout>
        <PageMessage kind="loading" />
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <PageMessage kind="error" text={error} />
      </Layout>
    );

  return (
    <Layout>
      <Banner
        title="Лидия Стрелкова Кошечкина"
        subtitle="Путешествие по забытым страницам истории"
      />
      {books.some((b) => !b.in_works) && (
        <CardsSection
          books={books.filter((b) => !b.in_works)}
          order={1}
        />
      )}
      <Gallery order={2} />
    </Layout>
  );
}

export default Home;
