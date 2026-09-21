import { Link } from "react-router";

function Header() {
  return (
    <header className="absolute top-0 z-1 flex h-10 w-full items-center justify-between bg-white pl-4 pr-4">
      <Link to="/" className="text-black hover:text-stone-600">
        Лидия Стрелкова Кошечкина
      </Link>
      <nav className="flex gap-4">
        <Link to="/" className="text-black hover:text-stone-600">
          Книги
        </Link>
        <Link to="/now-in-works" className="text-black hover:text-stone-600">
          На столе писателя
        </Link>
        <Link to="/about-author" className="text-black hover:text-stone-600">
          Об авторе
        </Link>
      </nav>
    </header>
  );
}

export default Header;
