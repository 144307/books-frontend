import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import type { ClientBook } from "../../types";
import CardsSection from "./CardsSection";

const book: ClientBook = {
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

describe("CardsSection", () => {
  it("renders a custom title when provided", () => {
    render(
      <MemoryRouter>
        <CardsSection books={[book]} order={1} title="На столе писателя" />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "На столе писателя" }),
    ).toBeInTheDocument();
  });

  it("falls back to the default title", () => {
    render(
      <MemoryRouter>
        <CardsSection books={[book]} order={1} />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Книги" }),
    ).toBeInTheDocument();
  });
});
