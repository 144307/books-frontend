import { useEffect, useState } from "react";
import type { BookContextState, Character, ClientBook } from "../types";
import { withBase } from "../utils/url";
import BookContext from "./BookContext";

function isClientBook(value: unknown): value is ClientBook {
  if (typeof value !== "object" || value === null) return false;
  const book = value as Record<string, unknown>;
  return (
    typeof book.id === "number" &&
    typeof book.book_name === "string" &&
    typeof book.annotation === "string" &&
    typeof book.cover_url === "string" &&
    Array.isArray(book.chapters) &&
    Array.isArray(book.character_ids) &&
    Array.isArray(book.gallery) &&
    typeof book.in_works === "boolean"
  );
}

function isCharacter(value: unknown): value is Character {
  if (typeof value !== "object" || value === null) return false;
  const character = value as Record<string, unknown>;
  return (
    typeof character.id === "number" &&
    typeof character.name === "string" &&
    typeof character.description === "string" &&
    typeof character.image_url === "string"
  );
}

function BookContextProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BookContextState>({
    books: [],
    characters: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    fetch(withBase("/api/database.json"))
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
        const books = (data as { books: unknown[] }).books
          .filter(isClientBook)
          .map((book) => ({
            ...book,
            cover_url: withBase(book.cover_url),
            gallery: book.gallery.map(withBase),
          }));
        const rawCharacters = (data as { characters?: unknown }).characters;
        const characters = Array.isArray(rawCharacters)
          ? rawCharacters
              .filter(isCharacter)
              .map((character) => ({
                ...character,
                image_url: withBase(character.image_url),
              }))
          : [];
        setState({
          books,
          characters,
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
