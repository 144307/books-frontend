interface DisplayCardProps {
  title: string;
  coverUrl: string;
  onBuy?: () => void;
  onSample?: () => void;
}

export default function DisplayCard({
  title,
  coverUrl,
  onBuy,
  onSample,
}: DisplayCardProps) {
  return (
    <div className="flex w-80 flex-col overflow-hidden rounded-xl border border-stone-300 bg-[#faf8f5] shadow-lg scale-90">
      {coverUrl ? (
        <img src={coverUrl} alt={`missing image for ${title}`} />
      ) : (
        <div>error</div>
      )}

      <div className="flex flex-1 flex-col gap-6 p-8">
        <h3 className="line-clamp-3 font-book text-2xl font-normal leading-relaxed tracking-wide text-stone-800">
          {title}
        </h3>

        <div className="mt-auto flex gap-3">
          <button
            type="button"
            onClick={onBuy}
            className="flex-1 cursor-pointer rounded-lg bg-amber-800 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white hover:bg-amber-700"
          >
            Buy
          </button>
          <button
            type="button"
            onClick={onSample}
            className="flex-1 cursor-pointer rounded-lg border border-stone-300 px-5 py-3 text-sm font-medium uppercase tracking-widest text-stone-600 hover:bg-stone-100"
          >
            Sample
          </button>
        </div>
      </div>
    </div>
  );
}
