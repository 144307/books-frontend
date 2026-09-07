import { useState } from "react";
import defaultImageClaire from "../../assets/gallery-claire.png";
import defaultImageMechanicsOfLove from "../../assets/gallery-mechanics-of-love.jpg";
import defaultImageHackRealities from "../../assets/gallery-hack-realities.png";
import defaultImageHeroine from "../../assets/gallery-heroine.png";
import defaultImageDetective from "../../assets/gallery-detective.png";

const DEFAULT_IMAGES = [
  defaultImageClaire,
  defaultImageMechanicsOfLove,
  defaultImageHackRealities,
  defaultImageHeroine,
  defaultImageDetective,
];

interface GalleryProps {
  images?: string[];
  initialFocus?: number;
}

function Gallery({ images = DEFAULT_IMAGES, initialFocus }: GalleryProps) {
  const [focusIndex, setFocusIndex] = useState(() =>
    Math.min(
      Math.max(initialFocus ?? Math.floor(images.length / 2), 0),
      images.length - 1,
    ),
  );

  if (images.length === 0) return null;

  const prevImage = focusIndex > 0 ? images[focusIndex - 1] : null;
  const focusImage = images[focusIndex];
  const nextImage =
    focusIndex < images.length - 1 ? images[focusIndex + 1] : null;

  return (
    <section className="w-full flex items-center justify-around">
      <div className="w-content gap-4 flex align-middle items-center">
        <button
          type="button"
          onClick={() => setFocusIndex((i) => i - 1)}
          disabled={focusIndex === 0}
          className="cursor-pointer rounded-lg border border-stone-400 bg-stone-700 px-5 py-3 text-xl text-white enabled:hover:bg-stone-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          L
        </button>
        <div className="mx-auto flex w-[54rem] max-w-full items-center justify-center gap-8 py-16">
          {prevImage ? (
            <img
              key={`prev-${focusIndex}`}
              src={prevImage}
              alt=""
              onClick={() => setFocusIndex((i) => i - 1)}
              className="h-72 w-auto shrink-0 cursor-pointer rounded-xl border border-stone-300 shadow-lg"
            />
          ) : (
            <div className="h-72 w-48 shrink-0" aria-hidden />
          )}
          <img
            src={focusImage}
            alt=""
            className="h-120 w-auto shrink-0 rounded-xl border border-stone-300 shadow-lg"
          />
          {nextImage ? (
            <img
              key={`next-${focusIndex}`}
              src={nextImage}
              alt=""
              onClick={() => setFocusIndex((i) => i + 1)}
              className="h-72 w-auto shrink-0 cursor-pointer rounded-xl border border-stone-300 shadow-lg"
            />
          ) : (
            <div className="h-72 w-48 shrink-0" aria-hidden />
          )}
        </div>
        <button
          type="button"
          onClick={() => setFocusIndex((i) => i + 1)}
          disabled={focusIndex === images.length - 1}
          className="cursor-pointer rounded-lg border border-stone-400 bg-stone-700 px-5 py-3 text-xl text-white enabled:hover:bg-stone-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          R
        </button>
      </div>
    </section>
  );
}

export default Gallery;
