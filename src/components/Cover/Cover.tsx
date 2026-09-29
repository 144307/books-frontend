import { useNavigate } from "react-router";
import type { ClientBook } from "../../types";
import DisplayCard from "../DisplayCard/DisplayCard";
import sectionBg from "../../assets/section-bg.png";

interface CoverProps {
  book: ClientBook;
  hasTopWave?: boolean;
  hasNext?: boolean;
}

function Cover({ book, hasTopWave = false, hasNext = false }: CoverProps) {
  const navigate = useNavigate();

  return (
    <section
      className={`relative flex place-content-center place-items-center bg-center bg-no-repeat bg-black text-white bg-cover${hasTopWave ? (hasNext ? " h-[112vh] wave-top mt-[-12vh]" : " h-screen wave-top mt-[-12vh]") : " h-screen"}`}
      style={{ backgroundImage: `url(${sectionBg})` }}
    >
      <div className="flex gap-1 place-content-between max-w-6xl w-full p-4">
        <div className="flex max-w-xl flex-col gap-6 place-content-center">
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
          onSample={() => navigate(`/books/${book.id}/fragment`)}
        ></DisplayCard>
      </div>
    </section>
  );
}

export default Cover;
