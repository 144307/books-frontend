import { useEffect, useState } from "react";
import type { IBookContext } from "../types";
import BookContext from "./BookContext";

const defaultBooks: Array<IBookContext> = [
  {
    title: "test",
    coverURL: "https://placehold.co/400x600/1a1a2e/eee?text=Gatsby",
    buyURL: "",
    sampleURL: "",
  },
];

function fetchBasicData() {}

function BookContextProvider({ children }: { children: React.ReactNode }) {
  const [bookData, setBookData] = useState(defaultBooks);

  useEffect(() => {
    fetchBasicData();
  }, []);

  return <BookContext value={bookData}>{children}</BookContext>;
}

export default BookContextProvider;
