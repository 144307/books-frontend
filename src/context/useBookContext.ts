import { useContext } from "react";
import BookContext from "./BookContext";

function useBookContext() {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error("No BookContext provided");
  }

  return context;
}

export default useBookContext;
