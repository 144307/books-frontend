import { useNavigate } from "react-router";
import useBookContext from "../../context/useBookContext";
import DisplayCard from "../DisplayCard/DisplayCard";

interface CoverProps {
  bookId: number;
  hasTopWave?: boolean;
  hasNext?: boolean;
}

function Cover({ bookId, hasTopWave = false, hasNext = false }: CoverProps) {
  const navigate = useNavigate();
  const book = useBookContext().books.find((b) => b.id === bookId);

  if (!book) {
    return <div>No book</div>;
  }

  return (
    <section
      // do not touch, later remove bg-cover and put back bg-contain
      className={`relative flex place-content-center place-items-center bg-center bg-no-repeat bg-black text-white bg-cover${hasTopWave ? (hasNext ? " h-[112vh] wave-top mt-[-12vh]" : " h-screen wave-top mt-[-12vh]") : " h-screen"}`}
      // h-[calc(100vh+8vh)]
      //${hasNext && " pb-[32vh]"}
      style={{ backgroundImage: `url(${book.section_cover_url})` }}
    >
      <div className="flex gap-auto gap-1 place-content-between max-w-6xl w-full p-4">
        <div className="flex max-w-xl flex-col gap-6 place-content-center">
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-amber-400/90 bg-black">
            hasTopWave {String(hasTopWave)}, hasNext {String(hasNext)}
          </span>
          <h2 className="text-xl italic font-light text-stone-300">
            A journey through the forgotten pages of history
          </h2>
          <h1 className="text-5xl font-bold leading-tight tracking-tight">
            {book.book_name}
          </h1>
          <p className="text-lg leading-relaxed text-stone-300">
            {book.annotation}
          </p>
          <p className="text-base leading-relaxed text-stone-400">
            {book.short_annotation}
          </p>
        </div>
        <DisplayCard
          title={book.book_name}
          coverUrl={book.cover_url}
          onBuy={() => {}}
          onSample={() => navigate(`/books/${bookId}/fragment`)}
        ></DisplayCard>
      </div>
    </section>
  );
}

export default Cover;
