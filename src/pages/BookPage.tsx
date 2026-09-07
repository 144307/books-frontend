import { useParams } from "react-router";

function BookPage() {
  const { bookID: bookID } = useParams();
  return <div>{bookID}</div>;
}

export default BookPage;
