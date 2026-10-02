import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PageMessage from "./PageMessage";

describe("PageMessage", () => {
  it("renders the loading message", () => {
    render(<PageMessage kind="loading" />);
    expect(screen.getByText("Загрузка…")).toBeInTheDocument();
  });

  it("renders an error with detail", () => {
    render(<PageMessage kind="error" text="HTTP 500" />);
    expect(
      screen.getByText("Не удалось загрузить книги (HTTP 500)"),
    ).toBeInTheDocument();
  });

  it("renders a notice text", () => {
    render(<PageMessage kind="notice" text="Книга не найдена." />);
    expect(screen.getByText("Книга не найдена.")).toBeInTheDocument();
  });
});
