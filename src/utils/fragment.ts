export interface ResolvedFragment {
  chapter: string | null;
  hasPrev: boolean;
  hasNext: boolean;
}

export function resolveFragment(
  chapters: string[],
  fragmentID: number,
): ResolvedFragment {
  const isValid =
    Number.isInteger(fragmentID) &&
    fragmentID >= 1 &&
    fragmentID <= chapters.length;
  return {
    chapter: isValid ? chapters[fragmentID - 1] : null,
    hasPrev: isValid && fragmentID > 1,
    hasNext: isValid && fragmentID < chapters.length,
  };
}
