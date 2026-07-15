import "./App.css";
import BookDisplay from "./components/BookDisplay/BookDisplay";
import Cover from "./components/Cover/Cover";
import Header from "./components/Header/Header";

function App() {
  return (
    <div>
      <Header></Header>
      <Cover></Cover>
      <BookDisplay></BookDisplay>
    </div>
  );
}

export default App;
