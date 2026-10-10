import { useState } from "react";
import { Link, NavLink } from "react-router";

const NAV_ITEMS = [
  { to: "/", label: "Книги", end: true },
  { to: "/now-in-works", label: "На столе писателя", end: false },
  { to: "/about-author", label: "Об авторе", end: false },
];

function linkClassName({ isActive }: { isActive: boolean }) {
  return `text-sm transition-colors ${
    isActive
      ? "font-semibold text-[#1f2430] underline decoration-[#e6ac8e] decoration-2 underline-offset-8"
      : "text-stone-600 hover:text-[#1f2430]"
  }`;
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 w-full border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="page-width flex h-14 items-center justify-between px-6">
        <Link
          to="/"
          className="font-book text-[0.95rem] font-semibold text-[#1f2430] transition-colors hover:text-[#d18a63]"
        >
          Лидия Стрелкова Кошечкина
        </Link>
        <nav
          className="hidden items-center gap-6 sm:flex"
          aria-label="Основная навигация"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={linkClassName}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          className="cursor-pointer rounded-md border border-stone-300 px-3 py-1.5 text-sm text-[#1f2430] transition-colors hover:border-[#d18a63] sm:hidden"
        >
          Меню
        </button>
      </div>
      {isMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Мобильная навигация"
          className="border-t border-stone-200 bg-white px-6 py-3 sm:hidden"
        >
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={linkClassName}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
