export interface IBookContext {
  title: string;
  coverURL: string;
  buyURL: string;
  sampleURL: string;
  featured: boolean; // only one can be present
}

export interface IBookRow {
  id: number;
  book_name: string;
  annotation: string;
  short_annotation: string;
  fragment: string;
}
