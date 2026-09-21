import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

function AboutAuthor() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4ecd8]">
      <Header />
      <div className="page-width px-6 pt-24 pb-16">
        <span className="block text-sm font-medium uppercase tracking-[0.3em] text-amber-800">
          About
        </span>
        <h1 className="mt-4 font-book text-4xl font-bold text-[#1f2430]">
          Лидия Стрелкова Кошечкина
        </h1>
        <p className="mt-8 max-w-2xl text-[18px] leading-relaxed text-[#6b7280]">
          Placeholder bio — replace with a short introduction of the author.
        </p>
        <p className="mt-4 max-w-2xl text-[18px] leading-relaxed text-[#6b7280]">
          Placeholder paragraph about works, themes and awards.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default AboutAuthor;
