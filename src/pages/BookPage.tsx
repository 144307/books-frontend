import { useParams } from "react-router";
import Button from "../components/Button/Button";
import CharactersSection from "../components/CharactersSection/CharactersSection";
import Gallery from "../components/Gallery/Gallery";
import Layout from "../components/Layout/Layout";
import PageMessage from "../components/PageMessage/PageMessage";
import useBookContext from "../context/useBookContext";
import usePageTitle from "../hooks/usePageTitle";

function BookPage() {
  const { bookID: rawBookID } = useParams();
  const bookID = Number.parseInt(rawBookID ?? "-1");
  const { books, characters, isLoading, error } = useBookContext();

  const book = books.find((b) => b.id === bookID);
  usePageTitle(book?.book_name);

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

  if (!book)
    return (
      <Layout>
        <PageMessage kind="notice" text="Книга не найдена." />
      </Layout>
    );

  const bookCharacters = characters.filter((c) =>
    book.character_ids.includes(c.id),
  );

  return (
    <Layout>
      <section className="bg-[#f7f4ee] pt-6 pb-12 font-book">
        <div className="page-width px-6">
          <Button to="/">← Назад к книгам</Button>
        </div>
        <div className="page-width mt-8 flex flex-wrap items-start justify-center gap-10 px-6">
          <img
            src={book.cover_url}
            alt={`Обложка книги «${book.book_name}»`}
            className="aspect-[2/3] w-[320px] self-start rounded-[4px] object-cover shadow-[0_2px_12px_rgba(31,36,48,0.12)]"
          />
          <div className="flex min-w-[16rem] flex-1 flex-col">
            <h1 className="mb-4 font-book text-3xl font-bold text-[#1f2430]">
              {book.book_name}
            </h1>
            <p className="mb-6 flex-1 text-[18px] leading-relaxed text-[#6b7280]">
              {book.annotation}
            </p>
            <div className="ml-auto flex flex-wrap gap-2.5">
              <Button to={`/books/${book.id}/fragment`}>Отрывок</Button>
              <Button variant="accent" href={book.purchase_url ?? "#"}>
                Купить
              </Button>
            </div>
          </div>
        </div>
      </section>
      {bookCharacters.length > 0 && (
        <CharactersSection characters={bookCharacters} order={3} />
      )}
      <Gallery images={book.gallery} order={2} />
    </Layout>
  );
}

export default BookPage;
