import bannerImage from "../../assets/banner-author.png";

interface BannerProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
}

function Banner({ title, subtitle, imageUrl = bannerImage }: BannerProps) {
  return (
    <section
      className="relative flex h-[70vh] w-full items-center bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {title && (
        <div className="page-width px-6 font-serif">
          <h1 className="text-6xl font-bold tracking-tight text-stone-800">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-3xl leading-relaxed text-stone-600">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default Banner;
