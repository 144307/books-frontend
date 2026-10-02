import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/libre-baskerville/400.css";
import "@fontsource/libre-baskerville/400-italic.css";
import "@fontsource/libre-baskerville/700.css";
import "./index.css";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import BookContextProvider from "./context/BookContextProvider.tsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <BookContextProvider>
        <ScrollToTop />
        <App />
      </BookContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
