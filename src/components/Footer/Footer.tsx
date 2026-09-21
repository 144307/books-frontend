function Footer() {
  return (
    <footer className="mt-auto w-full bg-stone-800 px-6 py-8">
      <div className="page-width flex flex-col items-center gap-2 text-center font-book">
        <span className="text-lg text-stone-100">Имя автора</span>
        <span className="text-sm text-stone-400">
          © {new Date().getFullYear()} · Placeholder footer text
        </span>
      </div>
    </footer>
  );
}

export default Footer;
