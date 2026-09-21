import { Link } from "react-router";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4ecd8]">
      <Header />
      <div className="page-width flex flex-col items-center gap-6 px-6 py-24 text-center">
        <span className="text-sm font-medium uppercase tracking-[0.3em] text-amber-800">
          404
        </span>
        <h1 className="font-book text-3xl text-[#1f2430]">Page not found.</h1>
        <Link
          to="/"
          className="cursor-pointer rounded-md border border-[#1f2430] bg-transparent px-4 pt-[0.5625rem] pb-2 text-[0.9rem] font-medium uppercase tracking-widest text-[#1f2430] transition-colors hover:bg-[#1f2430] hover:text-[#f7f4ee]"
        >
          К книгам
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;
