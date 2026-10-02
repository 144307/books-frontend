export interface ClientBook {
  id: number;
  book_name: string;
  annotation: string;
  cover_url: string;
  purchase_url: string | null;
  in_works: boolean;
  chapters: string[];
  character_ids: number[];
  gallery: string[];
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
