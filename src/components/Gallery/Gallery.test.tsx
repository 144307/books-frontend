import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Gallery from "./Gallery";

const images = [
  "/static/gallery/a.webp",
  "/static/gallery/b.webp",
  "/static/gallery/c.webp",
];

describe("Gallery", () => {
  it("renders the middle image in focus by default", () => {
    render(<Gallery images={images} />);
    expect(screen.getByAltText("Иллюстрация 2")).toHaveAttribute(
      "src",
      images[1],
    );
  });

  it("moves focus forward and back", () => {
    render(<Gallery images={images} />);
    fireEvent.click(
      screen.getByRole("button", { name: "Следующая иллюстрация" }),
    );
    expect(screen.getByAltText("Иллюстрация 3")).toHaveAttribute(
      "src",
      images[2],
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Предыдущая иллюстрация" }),
    );
    expect(screen.getByAltText("Иллюстрация 2")).toHaveAttribute(
      "src",
      images[1],
    );
  });

  it("disables arrows at the ends", () => {
    render(<Gallery images={images} />);
    fireEvent.click(
      screen.getByRole("button", { name: "Следующая иллюстрация" }),
    );
    expect(
      screen.getByRole("button", { name: "Следующая иллюстрация" }),
    ).toBeDisabled();
    fireEvent.click(
      screen.getByRole("button", { name: "Предыдущая иллюстрация" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Предыдущая иллюстрация" }),
    );
    expect(
      screen.getByRole("button", { name: "Предыдущая иллюстрация" }),
    ).toBeDisabled();
  });

  it("renders nothing without images", () => {
    const { container } = render(<Gallery images={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
