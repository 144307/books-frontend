import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Fragment from "./pages/Fragment";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/books/:bookID/fragment/:fragmentID?"
        element={<Fragment />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
