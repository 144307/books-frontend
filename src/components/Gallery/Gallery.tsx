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
  order?: number;
}

function Gallery({ images = DEFAULT_IMAGES, initialFocus, order = 1 }: GalleryProps) {
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
    <section
      className={`w-full flex items-center justify-center overflow-hidden ${
        order % 2 === 1 ? "bg-[#f7f4ee]" : "bg-[#f4ecd8]"
      }`}
    >
      <div className="page-width flex min-w-0 items-center justify-center gap-4 px-6 pt-16 pb-8 lg:gap-8 lg:pt-24 lg:pb-16">
        <button
          type="button"
          onClick={() => setFocusIndex((i) => i - 1)}
          disabled={focusIndex === 0}
          className="cursor-pointer shrink-0 rounded-lg border border-[#e6ac8e] bg-[#e6ac8e] px-5 pt-[0.8125rem] pb-3 text-xl text-[#1f2430] transition-colors enabled:hover:border-[#d18a63] enabled:hover:bg-[#d18a63] disabled:cursor-not-allowed disabled:opacity-40"
        >
          ←
        </button>
        {prevImage ? (
          <div
            key={`prev-${focusIndex}`}
            onClick={() => setFocusIndex((i) => i - 1)}
            className="relative hidden h-72 aspect-[2/3] shrink-0 cursor-pointer rounded-xl border border-stone-300 shadow-lg lg:block"
          >
            <img
              src={prevImage}
              alt=""
              decoding="async"
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <div className="hidden h-72 w-48 shrink-0 lg:block" aria-hidden />
        )}
        <div className="relative h-[30rem] max-w-full aspect-[2/3] rounded-xl border border-stone-300 shadow-lg">
          <img
            src={focusImage}
            alt=""
            decoding="async"
            className="h-full w-full object-contain"
          />
        </div>
        {nextImage ? (
          <div
            key={`next-${focusIndex}`}
            onClick={() => setFocusIndex((i) => i + 1)}
            className="relative hidden h-72 aspect-[2/3] shrink-0 cursor-pointer rounded-xl border border-stone-300 shadow-lg lg:block"
          >
            <img
              src={nextImage}
              alt=""
              decoding="async"
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <div className="hidden h-72 w-48 shrink-0 lg:block" aria-hidden />
        )}
        <button
          type="button"
          onClick={() => setFocusIndex((i) => i + 1)}
          disabled={focusIndex === images.length - 1}
          className="cursor-pointer shrink-0 rounded-lg border border-[#e6ac8e] bg-[#e6ac8e] px-5 pt-[0.8125rem] pb-3 text-xl text-[#1f2430] transition-colors enabled:hover:border-[#d18a63] enabled:hover:bg-[#d18a63] disabled:cursor-not-allowed disabled:opacity-40"
        >
          →
        </button>
      </div>
    </section>
  );
}

export default Gallery;
