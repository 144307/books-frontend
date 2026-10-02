import type { ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4ecd8]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-20 focus:rounded-md focus:bg-[#1f2430] focus:px-4 focus:py-2 focus:text-sm focus:text-[#f7f4ee]"
      >
        Перейти к содержимому
      </a>
      <Header />
      <main id="main-content" className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
