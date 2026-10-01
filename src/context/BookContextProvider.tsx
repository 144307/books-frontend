import { useEffect, useState } from "react";
import type { BookContextState, Character, ClientBook } from "../types";
import BookContext from "./BookContext";

function BookContextProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BookContextState>({
    books: [],
    characters: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    fetch("/api/database.json")
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
        setState({
          books: (data as { books: ClientBook[] }).books.map((book) => ({
            ...book,
            in_works:
              (book as { in_works?: unknown }).in_works === true,
          })),
          characters: Array.isArray((data as { characters?: unknown }).characters)
            ? (data as { characters: Character[] }).characters
            : [],
          isLoading: false,
          error: null,
        });
      })
      .catch((e) => {
        console.error(e.message);
        setState({
          books: [],
          characters: [],
          isLoading: false,
          error: e.message,
        });
      });
  }, []);

  return <BookContext value={state}>{children}</BookContext>;
}

export default BookContextProvider;
