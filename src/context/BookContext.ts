import { createContext } from "react";
import type { BookContextState } from "../types";

const BookContext = createContext<BookContextState | undefined>(undefined);

export default BookContext;
