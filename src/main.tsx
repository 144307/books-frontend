import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/libre-baskerville/400.css";
import "@fontsource/libre-baskerville/400-italic.css";
import "@fontsource/libre-baskerville/700.css";
import "./index.css";
import App from "./App.tsx";
import BookContextProvider from "./context/BookContextProvider.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <BookContextProvider>
        <App />
      </BookContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
