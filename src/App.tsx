import "./App.css";
import BookCard from "./components/BookCard/BookCard";
import BookDisplay from "./components/BookDisplay/BookDisplay";

function App() {
  return (
    <div>
      <BookDisplay></BookDisplay>
      <div className="flex flex-wrap items-start gap-6 p-10">
        <BookCard
          title="The Great Gatsby"
          coverUrl="https://placehold.co/400x600/1a1a2e/eee?text=Gatsby"
          onBuy={() => console.log("buy")}
          onSample={() => console.log("sample")}
        />
        <BookCard
          title="To Kill a Mockingbird"
          coverUrl="https://placehold.co/400x600/1a1a2e/eee?text=Mockingbird"
          onBuy={() => console.log("buy")}
          onSample={() => console.log("sample")}
        />
      </div>
    </div>
  );
}

export default App;
