import { describe, expect, it } from "vitest";
import { resolveFragment } from "./fragment";

describe("resolveFragment", () => {
  const chapters = ["one", "two", "three"];

  it("resolves a valid chapter", () => {
    expect(resolveFragment(chapters, 1)).toEqual({
      chapter: "one",
      hasPrev: false,
      hasNext: true,
    });
    expect(resolveFragment(chapters, 2)).toEqual({
      chapter: "two",
      hasPrev: true,
      hasNext: true,
    });
    expect(resolveFragment(chapters, 3)).toEqual({
      chapter: "three",
      hasPrev: true,
      hasNext: false,
    });
  });

  it("returns null chapter for out-of-range ids", () => {
    expect(resolveFragment(chapters, 0).chapter).toBeNull();
    expect(resolveFragment(chapters, 4).chapter).toBeNull();
    expect(resolveFragment(chapters, -1).chapter).toBeNull();
  });

  it("returns null chapter for non-integer ids", () => {
    expect(resolveFragment(chapters, Number.NaN).chapter).toBeNull();
    expect(resolveFragment(chapters, 1.5).chapter).toBeNull();
  });

  it("handles an empty chapter list", () => {
    expect(resolveFragment([], 1)).toEqual({
      chapter: null,
      hasPrev: false,
      hasNext: false,
    });
  });
});
