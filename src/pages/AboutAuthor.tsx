import Layout from "../components/Layout/Layout";
import usePageTitle from "../hooks/usePageTitle";

function AboutAuthor() {
  usePageTitle("Об авторе");

  return (
    <Layout>
      <div className="page-width px-6 pt-16 pb-8">
        <span className="block text-sm font-medium uppercase tracking-[0.3em] text-amber-800">
          Об авторе
        </span>
        <h1 className="mt-4 font-book text-4xl font-bold text-[#1f2430]">
          Лидия Стрелкова Кошечкина
        </h1>
        <p className="mt-8 max-w-2xl text-[18px] leading-relaxed text-[#6b7280]">
          Короткая биография автора появится здесь.
        </p>
        <p className="mt-4 max-w-2xl text-[18px] leading-relaxed text-[#6b7280]">
          Здесь будет рассказ о книгах, темах творчества и наградах.
        </p>
      </div>
    </Layout>
  );
}

export default AboutAuthor;
