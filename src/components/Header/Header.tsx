import { Link } from "react-router";

function Header() {
  return (
    <header className="absolute top-0 z-1 flex h-10 w-full items-center justify-between bg-white pl-4 pr-4">
      <div className="text-black">Имя автора</div>
      <nav className="flex gap-4">
        <Link to="/" className="text-black hover:text-stone-600">
          Books
        </Link>
        <Link to="/now-in-works" className="text-black hover:text-stone-600">
          Now in progress
        </Link>
      </nav>
    </header>
  );
}

export default Header;
