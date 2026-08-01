import useBookContext from "../../context/useBookContext";
import coverBackground from "../../assets/ChatGPT Image 12 июл. 2026 г., 17_38_13.png";
import DisplayCard from "../DisplayCard/DisplayCard";
import { useNavigate } from "react-router";

function Cover() {
  const testId = "1";
  const navigate = useNavigate();
  const featuredBook = useBookContext().find((e) => e.featured);
  if (!featuredBook) {
    return <div>No featured book</div>;
  }
  return (
    <section
      className="relative flex place-content-center place-items-center bg-contain bg-center bg-no-repeat bg-black h-screen text-white overflow-hidden"
      style={{ backgroundImage: `url(${coverBackground})` }}
    >
      <div className="flex gap-auto gap-1 place-content-between max-w-6xl w-full p-4">
        <div className="flex max-w-xl flex-col gap-6 place-content-center">
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-amber-400/90">
            Featured Book of the Month
          </span>
          <h2 className="text-xl italic font-light text-stone-300">
            A journey through the forgotten pages of history
          </h2>
          <h1 className="text-5xl font-bold leading-tight tracking-tight">
            The Silent Library
          </h1>
          <p className="text-lg leading-relaxed text-stone-300">
            In a world where books are forbidden, one librarian discovers a
            hidden archive that could change everything. A gripping tale of
            courage, knowledge, and the power of words to ignite a revolution.
          </p>
          <p className="text-base leading-relaxed text-stone-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco.
          </p>
        </div>
        <DisplayCard
          title={featuredBook.title}
          coverUrl={featuredBook.coverURL}
          onBuy={() => {}}
          onSample={() => navigate(`/books/${testId}`)}
        ></DisplayCard>
      </div>
      <svg
        className="pointer-events-none absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 160"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M0,80 C360,180 720,0 1080,80 C1260,120 1380,100 1440,80 L1440,160 L0,160 Z" />
      </svg>
    </section>
  );
}

export default Cover;
