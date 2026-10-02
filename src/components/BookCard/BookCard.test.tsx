import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import type { ClientBook } from "../../types";
import BookCard from "./BookCard";

const book: ClientBook = {
  id: 1,
  book_name: "Тестовая книга",
  annotation: "Короткая аннотация.",
  cover_url: "/static/covers/cover-1.webp",
  purchase_url: null,
  in_works: false,
  chapters: ["Глава"],
  character_ids: [],
  gallery: [],
};

function renderCard(testBook: ClientBook = book) {
  return render(
    <MemoryRouter>
      <BookCard book={testBook} />
    </MemoryRouter>,
  );
}

describe("BookCard", () => {
  it("renders the title link and action buttons", () => {
    renderCard();
    expect(
      screen.getByRole("heading", { level: 3, name: "Тестовая книга" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "О книге" })).toHaveAttribute(
      "href",
      "/books/1",
    );
    expect(screen.getByRole("link", { name: "Отрывок" })).toHaveAttribute(
      "href",
      "/books/1/fragment",
    );
  });

  it("renders an active buy link with placeholder href when purchase_url is not set", () => {
    renderCard();
    const buy = screen.getByRole("link", { name: "Купить" });
    expect(buy).toHaveAttribute("href", "#");
  });

  it("renders a buy link when purchase_url is set", () => {
    renderCard({ ...book, purchase_url: "https://example.com/buy" });
    const buy = screen.getByRole("link", { name: "Купить" });
    expect(buy).toHaveAttribute("href", "https://example.com/buy");
    expect(buy).toHaveAttribute("target", "_blank");
  });

  it("does not apply the fade gradient when text fits", () => {
    renderCard();
    const paragraph = screen.getByText("Короткая аннотация.");
    expect(paragraph.parentElement?.className).not.toContain("fade-mask");
  });
});
