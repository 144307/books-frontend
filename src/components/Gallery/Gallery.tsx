import { useState } from "react";
import { withBase } from "../../utils/url";

const DEFAULT_IMAGES = [
  "/static/gallery/claire.webp",
  "/static/gallery/mechanics-of-love.webp",
  "/static/gallery/hack-realities.webp",
  "/static/gallery/heroine.webp",
  "/static/gallery/detective.webp",
].map(withBase);

interface GalleryProps {
  images?: string[];
  order?: number;
}

function Gallery({ images = DEFAULT_IMAGES, order = 1 }: GalleryProps) {
  const [focusIndex, setFocusIndex] = useState(() =>
    Math.min(Math.floor(images.length / 2), images.length - 1),
  );

  if (images.length === 0) return null;

  const prevImage = focusIndex > 0 ? images[focusIndex - 1] : null;
  const focusImage = images[focusIndex];
  const nextImage =
    focusIndex < images.length - 1 ? images[focusIndex + 1] : null;
  const hasPrev = focusIndex > 0;
  const hasNext = focusIndex < images.length - 1;

  const goToPrev = () => setFocusIndex((i) => Math.max(i - 1, 0));
  const goToNext = () => setFocusIndex((i) => Math.min(i + 1, images.length - 1));

  return (
    <section
      className={`w-full flex items-center justify-center overflow-hidden ${
        order % 2 === 1 ? "bg-[#f7f4ee]" : "bg-[#f4ecd8]"
      }`}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" && hasPrev) goToPrev();
        if (event.key === "ArrowRight" && hasNext) goToNext();
      }}
    >
      <div className="page-width grid grid-cols-2 items-center justify-items-center gap-4 px-6 pt-16 pb-8 lg:flex lg:flex-nowrap lg:items-center lg:justify-center lg:gap-8 lg:pt-24 lg:pb-16">
        <button
          type="button"
          onClick={goToPrev}
          disabled={!hasPrev}
          aria-label="Предыдущая иллюстрация"
          className="order-2 cursor-pointer justify-self-center rounded-lg border border-[#e6ac8e] bg-[#e6ac8e] px-5 pt-[0.8125rem] pb-3 text-xl text-[#1f2430] transition-colors enabled:hover:border-[#d18a63] enabled:hover:bg-[#d18a63] disabled:cursor-not-allowed disabled:opacity-40 lg:order-none"
        >
          ←
        </button>
        {prevImage ? (
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Показать предыдущую иллюстрацию"
            className="hidden aspect-[2/3] h-72 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-stone-300 shadow-lg transition-opacity hover:opacity-80 lg:block"
          >
            <img
              src={prevImage}
              alt={`Иллюстрация ${focusIndex}`}
              decoding="async"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </button>
        ) : (
          <div className="hidden h-72 w-48 shrink-0 lg:block" aria-hidden="true" />
        )}
        <div className="relative order-1 col-span-2 aspect-[2/3] h-[26rem] max-w-full shrink-0 overflow-hidden rounded-xl border border-stone-300 shadow-lg sm:h-[30rem] lg:order-none">
          <img
            src={focusImage}
            alt={`Иллюстрация ${focusIndex + 1}`}
            decoding="async"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        {nextImage ? (
          <button
            type="button"
            onClick={goToNext}
            aria-label="Показать следующую иллюстрацию"
            className="hidden aspect-[2/3] h-72 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-stone-300 shadow-lg transition-opacity hover:opacity-80 lg:block"
          >
            <img
              src={nextImage}
              alt={`Иллюстрация ${focusIndex + 2}`}
              decoding="async"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </button>
        ) : (
          <div className="hidden h-72 w-48 shrink-0 lg:block" aria-hidden="true" />
        )}
        <button
          type="button"
          onClick={goToNext}
          disabled={!hasNext}
          aria-label="Следующая иллюстрация"
          className="order-3 cursor-pointer justify-self-center rounded-lg border border-[#e6ac8e] bg-[#e6ac8e] px-5 pt-[0.8125rem] pb-3 text-xl text-[#1f2430] transition-colors enabled:hover:border-[#d18a63] enabled:hover:bg-[#d18a63] disabled:cursor-not-allowed disabled:opacity-40 lg:order-none"
        >
          →
        </button>
      </div>
    </section>
  );
}

export default Gallery;
