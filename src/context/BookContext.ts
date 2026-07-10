import { createContext } from "react";
import type { IBookContext } from "../types";

const BookContext = createContext<Array<IBookContext> | undefined>(undefined);

export default BookContext;
