export interface ClientBook {
  id: number;
  book_name: string;
  annotation: string;
  short_annotation: string;
  is_featured: boolean;
  cover_url: string;
  section_cover_url: string;
  chapter_1: string | null;
  chapter_2: string | null;
  chapter_3: string | null;
  chapter_4: string | null;
  chapter_5: string | null;
}

export interface BookContextState {
  books: ClientBook[];
  isLoading: boolean;
  error: string | null;
}
