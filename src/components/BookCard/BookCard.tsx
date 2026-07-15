interface BookCardProps {
  title: string;
  coverUrl: string;
  onBuy?: () => void;
  onSample?: () => void;
}

export default function BookCard({
  title,
  coverUrl,
  onBuy,
  onSample,
}: BookCardProps) {
  return (
    <div className="flex w-56 flex-col overflow-hidden rounded-lg border border-stone-300 bg-[#faf8f5]">
      <img src={coverUrl} alt={title} />

      <div className="flex flex-1 flex-col gap-4 p-5">
        <h3 className="line-clamp-2 font-['Libre_Baskerville'] text-[15px] font-normal leading-relaxed tracking-wide text-stone-800">
          {title}
        </h3>

        <div className="mt-auto flex gap-2">
          <button
            type="button"
            onClick={onBuy}
            className="flex-1 cursor-pointer rounded-md bg-amber-800 px-3 py-2 text-[11px] font-medium uppercase tracking-widest text-white hover:bg-amber-700"
          >
            Buy
          </button>
          <button
            type="button"
            onClick={onSample}
            className="flex-1 cursor-pointer rounded-md border border-stone-300 px-3 py-2 text-[11px] font-medium uppercase tracking-widest text-stone-600 hover:bg-stone-100"
          >
            Sample
          </button>
        </div>
      </div>
    </div>
  );
}
