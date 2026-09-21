interface DisplayCardProps {
  title: string;
  coverUrl: string;
  onSample?: () => void;
}

function DisplayCard({ title, coverUrl, onSample }: DisplayCardProps) {
  return (
    <div className="flex w-80 flex-col overflow-hidden rounded-xl border border-stone-300 bg-[#faf8f5] shadow-lg scale-90">
      {coverUrl ? (
        <img src={coverUrl} alt={`Cover of ${title}`} />
      ) : (
        <div>error</div>
      )}

      <div className="flex flex-1 flex-col gap-6 p-8">
        <h3 className="line-clamp-3 font-book text-2xl font-normal leading-relaxed tracking-wide text-stone-800">
          {title}
        </h3>

        <div className="mt-auto flex gap-3">
          <a
            href="#"
            className="flex-1 cursor-pointer rounded-lg bg-[#e6ac8e] px-5 py-3 text-center text-sm font-medium uppercase tracking-widest text-[#1f2430] hover:bg-[#d18a63]"
          >
            Купить
          </a>
          <button
            type="button"
            onClick={onSample}
            className="flex-1 cursor-pointer rounded-lg border border-[#1f2430] px-5 pt-[0.8125rem] pb-3 text-sm font-medium uppercase tracking-widest text-[#1f2430] transition-colors hover:bg-[#1f2430] hover:text-[#f7f4ee]"
          >
            Отрывок
          </button>
        </div>
      </div>
    </div>
  );
}

export default DisplayCard;
