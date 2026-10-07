import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, it } from "vitest";
import BookContext from "../context/BookContext";
import type { BookContextState } from "../types";
import Fragment from "./Fragment";

const state: BookContextState = {
  books: [
    {
      id: 1,
      book_name: "Тестовая книга",
      annotation: "Аннотация",
      cover_url: "/static/covers/cover-1.webp",
      purchase_url: null,
      in_works: false,
      chapters: ["Глава один", "Глава два", "Глава три"],
      character_ids: [],
      gallery: [],
    },
  ],
  characters: [],
  isLoading: false,
  error: null,
};

function renderFragment(initialUrl: string) {
  return render(
    <MemoryRouter initialEntries={[initialUrl]}>
      <BookContext value={state}>
        <Routes>
          <Route
            path="/books/:bookID/fragment/:fragmentID?"
            element={<Fragment />}
          />
        </Routes>
      </BookContext>
    </MemoryRouter>,
  );
}

describe("Fragment", () => {
  it("renders the first chapter by default", () => {
    renderFragment("/books/1/fragment");
    expect(screen.getByText("1 из 3")).toBeInTheDocument();
    expect(screen.getByText("Глава один")).toBeInTheDocument();
  });

  it("links back to the book page", () => {
    renderFragment("/books/1/fragment/2");
    expect(screen.getByRole("link", { name: "К книге" })).toHaveAttribute(
      "href",
      "/books/1",
    );
  });

  it("navigates to the next chapter", () => {
    renderFragment("/books/1/fragment");
    fireEvent.click(screen.getAllByRole("button", { name: "Вперёд" })[0]);
    expect(screen.getByText("2 из 3")).toBeInTheDocument();
    expect(screen.getByText("Глава два")).toBeInTheDocument();
  });

  it("navigates to the previous chapter", () => {
    renderFragment("/books/1/fragment/3");
    fireEvent.click(screen.getAllByRole("button", { name: "Назад" })[0]);
    expect(screen.getByText("2 из 3")).toBeInTheDocument();
  });

  it("disables prev on the first chapter", () => {
    renderFragment("/books/1/fragment/1");
    for (const button of screen.getAllByRole("button", { name: "Назад" })) {
      expect(button).toBeDisabled();
    }
    for (const button of screen.getAllByRole("button", { name: "Вперёд" })) {
      expect(button).toBeEnabled();
    }
  });

  it("disables next on the last chapter", () => {
    renderFragment("/books/1/fragment/3");
    for (const button of screen.getAllByRole("button", { name: "Вперёд" })) {
      expect(button).toBeDisabled();
    }
  });

  it("shows a notice for a missing chapter", () => {
    renderFragment("/books/1/fragment/9");
    expect(screen.getByText("Глава не найдена.")).toBeInTheDocument();
  });

  it("shows a notice for a missing book", () => {
    renderFragment("/books/99/fragment/1");
    expect(screen.getByText("Книга не найдена.")).toBeInTheDocument();
  });
});
