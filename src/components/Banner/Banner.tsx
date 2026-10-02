import bannerImage from "../../assets/banner-author.webp";

interface BannerProps {
  title?: string;
  subtitle?: string;
}

function Banner({ title, subtitle }: BannerProps) {
  return (
    <section className="relative w-full bg-[#f4ecd8] font-serif">
      <img
        src={bannerImage}
        alt={title ?? ""}
        fetchPriority="high"
        decoding="async"
        className="block h-[38vh] max-h-[30rem] min-h-64 w-full object-cover"
      />
      {title && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="page-width absolute inset-0 flex flex-col justify-center px-6">
            <h1 className="text-2xl font-bold tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-base leading-relaxed text-stone-200 sm:mt-4 sm:text-xl lg:text-2xl">
                {subtitle}
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default Banner;
