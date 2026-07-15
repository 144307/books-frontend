import { useEffect, useState } from "react";
import type { IBookContext } from "../types";
import BookContext from "./BookContext";

const defaultBooks: Array<IBookContext> = [
  {
    title: "The Silent Library",
    coverURL: "https://placehold.co/200x300/1a1a2e/eee?text=Silent+Library",
    buyURL: "",
    sampleURL: "",
    featured: true,
  },
  {
    title: "Whispers of the Forgotten",
    coverURL: "https://placehold.co/200x300/4a2c2a/f5e6d3?text=Whispers",
    buyURL: "",
    sampleURL: "",
    featured: false,
  },
  {
    title: "Echoes from the Attic",
    coverURL: "https://placehold.co/200x300/1b3b36/cde8e0?text=Echoes",
    buyURL: "",
    sampleURL: "",
    featured: false,
  },
  {
    title: "The Midnight Archive",
    coverURL: "https://placehold.co/200x300/2d2d4e/e0d8f0?text=Midnight",
    buyURL: "",
    sampleURL: "",
    featured: false,
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
