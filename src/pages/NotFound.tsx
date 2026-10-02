import Button from "../components/Button/Button";
import Layout from "../components/Layout/Layout";
import usePageTitle from "../hooks/usePageTitle";

function NotFound() {
  usePageTitle("Страница не найдена");

  return (
    <Layout>
      <div className="page-width flex flex-col items-center gap-6 px-6 py-24 text-center">
        <span className="text-sm font-medium uppercase tracking-[0.3em] text-amber-800">
          404
        </span>
        <h1 className="font-book text-3xl text-[#1f2430]">
          Страница не найдена.
        </h1>
        <Button to="/">К книгам</Button>
      </div>
    </Layout>
  );
}

export default NotFound;
