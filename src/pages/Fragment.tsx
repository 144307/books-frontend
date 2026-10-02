import { useNavigate, useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import Button from "../components/Button/Button";
import Layout from "../components/Layout/Layout";
import PageMessage from "../components/PageMessage/PageMessage";
import useBookContext from "../context/useBookContext";
import usePageTitle from "../hooks/usePageTitle";
import { resolveFragment } from "../utils/fragment";

function Fragment() {
  const navigate = useNavigate();
  const { bookID: rawBookID, fragmentID: rawFragmentID } = useParams();
  const bookID = Number.parseInt(rawBookID ?? "-1");
  const fragmentID = Number.parseInt(rawFragmentID ?? "1");
  const { books, isLoading, error } = useBookContext();

  const book = books.find((b) => b.id === bookID);
  const { chapter, hasPrev, hasNext } = resolveFragment(
    book?.chapters ?? [],
    fragmentID,
  );
  usePageTitle(
    book && chapter !== null ? `${book.book_name} · глава ${fragmentID}` : undefined,
  );

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

  if (chapter === null)
    return (
      <Layout>
        <PageMessage kind="notice" text="Глава не найдена." />
      </Layout>
    );

  return (
    <Layout>
      <div className="page-width flex flex-col items-center gap-3 px-6 pt-10">
        <Button to={`/books/${bookID}`}>← К книге</Button>
        <span className="text-sm font-medium uppercase tracking-[0.3em] text-amber-800">
          Глава {fragmentID} из {book.chapters.length}
        </span>
      </div>
      <div className="page-width flex justify-center gap-3 px-6 pt-6">
        <Button
          size="lg"
          disabled={!hasPrev}
          onClick={() =>
            navigate(`/books/${bookID}/fragment/${fragmentID - 1}`)
          }
        >
          Назад
        </Button>
        <Button
          size="lg"
          variant="accent"
          disabled={!hasNext}
          onClick={() =>
            navigate(`/books/${bookID}/fragment/${fragmentID + 1}`)
          }
        >
          Вперёд
        </Button>
      </div>
      <article className="page-width px-6 py-10">
        <span className="block text-center text-sm font-medium uppercase tracking-[0.3em] text-amber-800">
          {book.book_name}
        </span>
        <div className="prose prose-stone prose-p:my-4 prose-p:text-justify mt-8 max-w-none font-book text-lg leading-normal">
          <ReactMarkdown>{chapter}</ReactMarkdown>
        </div>
      </article>
      <div className="page-width flex justify-center gap-3 px-6 pb-14">
        <Button
          size="lg"
          disabled={!hasPrev}
          onClick={() =>
            navigate(`/books/${bookID}/fragment/${fragmentID - 1}`)
          }
        >
          Назад
        </Button>
        <Button
          size="lg"
          variant="accent"
          disabled={!hasNext}
          onClick={() =>
            navigate(`/books/${bookID}/fragment/${fragmentID + 1}`)
          }
        >
          Вперёд
        </Button>
      </div>
    </Layout>
  );
}

export default Fragment;
