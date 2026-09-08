export interface ClientBook {
  id: number;
  book_name: string;
  annotation: string;
  short_annotation: string;
  image_ids: number[];
  is_featured: boolean;
  cover: string;
  section_cover: string;
  cover_url: string;
  section_cover_url: string;
  chapter_1: string | null;
  chapter_2: string | null;
  chapter_3: string | null;
  chapter_4: string | null;
  chapter_5: string | null;
}

export interface Character {
  id: number;
  image_url: string;
  name: string;
  description: string;
}

export interface BookContextState {
  books: ClientBook[];
  characters: Character[];
  isLoading: boolean;
  error: string | null;
}
