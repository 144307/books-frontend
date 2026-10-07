import { useNavigate, useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import ArrowIcon from "../components/ArrowIcon/ArrowIcon";
import BackIcon from "../components/BackIcon/BackIcon";
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
    book && chapter !== null
      ? `${book.book_name} · глава ${fragmentID}`
      : undefined,
  );

  const goToPrev = () =>
    navigate(`/books/${bookID}/fragment/${fragmentID - 1}`);
  const goToNext = () =>
    navigate(`/books/${bookID}/fragment/${fragmentID + 1}`);

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
      <div className="relative mt-4 flex w-full items-center bg-[#efe4d1] pr-4 sm:mt-10">
        <Button to={`/books/${bookID}`} size="md" aria-label="К книге">
          <span className="flex items-center gap-2">
            <BackIcon />
            <span className="hidden sm:inline">К книге</span>
          </span>
        </Button>
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
          <Button size="md" disabled={!hasPrev} onClick={goToPrev}>
            <span className="sm:hidden">
              <ArrowIcon direction="left" />
            </span>
            <span className="hidden sm:inline">Назад</span>
          </Button>
          <span className="text-xs font-medium uppercase tracking-wide text-amber-800 sm:text-sm">
            {fragmentID} из {book.chapters.length}
          </span>
          <Button
            size="md"
            variant="accent"
            disabled={!hasNext}
            onClick={goToNext}
          >
            <span className="sm:hidden">
              <ArrowIcon direction="right" />
            </span>
            <span className="hidden sm:inline">Вперёд</span>
          </Button>
        </div>
      </div>
      <article className="page-width px-6 pt-6 pb-10 sm:pt-10">
        <span className="block text-center text-sm font-medium uppercase tracking-[0.3em] text-amber-800">
          {book.book_name}
        </span>
        <div className="prose prose-stone prose-p:my-4 prose-p:text-justify mt-8 max-w-none font-book text-lg leading-normal">
          <ReactMarkdown>{chapter}</ReactMarkdown>
        </div>
      </article>
      <div className="page-width flex justify-center gap-3 px-6 pb-14">
        <Button size="md" disabled={!hasPrev} onClick={goToPrev}>
          <span className="sm:hidden">
            <ArrowIcon direction="left" />
          </span>
          <span className="hidden sm:inline">Назад</span>
        </Button>
        <Button
          size="md"
          variant="accent"
          disabled={!hasNext}
          onClick={goToNext}
        >
          <span className="sm:hidden">
            <ArrowIcon direction="right" />
          </span>
          <span className="hidden sm:inline">Вперёд</span>
        </Button>
      </div>
    </Layout>
  );
}

export default Fragment;
