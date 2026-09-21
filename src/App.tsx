import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Fragment from "./pages/Fragment";
import NotFound from "./pages/NotFound";
import BookPage from "./pages/BookPage";
import NowInWorks from "./pages/NowInWorks";
import AboutAuthor from "./pages/AboutAuthor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/now-in-works" element={<NowInWorks />} />
      <Route path="/about-author" element={<AboutAuthor />} />
      <Route
        path="/books/:bookID/fragment/:fragmentID?"
        element={<Fragment />}
      />
      <Route path="/books/:bookID" element={<BookPage />}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
