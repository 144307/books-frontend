import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import BookContextProvider from "./BookContextProvider";
import useBookContext from "./useBookContext";

function Probe() {
  const { books, characters, isLoading, error } = useBookContext();
  return (
    <div>
      <span>{`books:${books.length}`}</span>
      <span>{`characters:${characters.length}`}</span>
      <span>{`loading:${String(isLoading)}`}</span>
      <span>{`error:${error ?? "none"}`}</span>
      <span>{`first:${books[0]?.book_name ?? "-"}`}</span>
    </div>
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

function stubFetch(body: unknown, ok = true) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      ok,
      status: ok ? 200 : 500,
      json: async () => body,
    })),
  );
}

const validBook = {
  id: 1,
  book_name: "Тестовая книга",
  annotation: "Аннотация",
  cover_url: "/static/covers/cover-1.webp",
  purchase_url: null,
  in_works: false,
  chapters: ["Глава"],
  character_ids: [],
  gallery: [],
};

const validCharacter = {
  id: 1,
  name: "Клэр",
  description: "Описание",
  image_url: "/static/characters/claire.webp",
};

function renderProvider() {
  return render(
    <BookContextProvider>
      <Probe />
    </BookContextProvider>,
  );
}

describe("BookContextProvider", () => {
  it("loads books and characters", async () => {
    stubFetch({ books: [validBook], characters: [validCharacter] });
    renderProvider();

    await waitFor(() => {
      expect(screen.getByText("books:1")).toBeInTheDocument();
    });
    expect(screen.getByText("characters:1")).toBeInTheDocument();
    expect(screen.getByText("loading:false")).toBeInTheDocument();
    expect(screen.getByText("error:none")).toBeInTheDocument();
    expect(screen.getByText("first:Тестовая книга")).toBeInTheDocument();
  });

  it("filters out malformed books and characters", async () => {
    stubFetch({
      books: [validBook, { id: 2, book_name: 42 }],
      characters: [validCharacter, { id: 2, name: "Битый" }],
    });
    renderProvider();

    await waitFor(() => {
      expect(screen.getByText("books:1")).toBeInTheDocument();
    });
    expect(screen.getByText("characters:1")).toBeInTheDocument();
    expect(screen.getByText("error:none")).toBeInTheDocument();
  });

  it("reports a bad response shape", async () => {
    stubFetch({});
    renderProvider();

    await waitFor(() => {
      expect(screen.getByText("error:Bad response shape")).toBeInTheDocument();
    });
    expect(screen.getByText("loading:false")).toBeInTheDocument();
  });

  it("reports HTTP errors", async () => {
    stubFetch({ books: [] }, false);
    renderProvider();

    await waitFor(() => {
      expect(screen.getByText("error:HTTP 500")).toBeInTheDocument();
    });
  });
});
