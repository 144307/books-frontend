import bannerImage from "../../assets/banner-author.png";

interface BannerProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
}

function Banner({ title, subtitle, imageUrl = bannerImage }: BannerProps) {
  return (
    <section className="relative w-full bg-[#f4ecd8] font-serif">
      <img src={imageUrl} alt="" className="block h-auto w-full" />
      {title && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="page-width absolute inset-0 flex flex-col justify-center px-6">
            <h1 className="text-2xl font-bold tracking-tight text-stone-100 sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-base leading-relaxed text-stone-200 sm:mt-4 sm:text-2xl lg:text-3xl">
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
