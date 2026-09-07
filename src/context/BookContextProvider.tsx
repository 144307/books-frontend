import { useEffect, useState } from "react";
import type { BookContextState, ClientBook } from "../types";
import BookContext from "./BookContext";

function BookContextProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BookContextState>({
    books: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const API = import.meta.env.VITE_API_BASE_URL ?? "";
    fetch(`${API}/api/database`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: unknown) => {
        if (
          typeof data !== "object" ||
          data === null ||
          !Array.isArray((data as { books?: unknown }).books)
        ) {
          throw new Error("Bad response shape");
        }
        console.log("data", data);
        setState({
          books: (data as { books: ClientBook[] }).books,
          isLoading: false,
          error: null,
        });
      })
      .catch((e) => {
        console.error(e.message);
        setState({ books: [], isLoading: false, error: e.message });
      });
  }, []);

  return <BookContext value={state}>{children}</BookContext>;
}

export default BookContextProvider;
