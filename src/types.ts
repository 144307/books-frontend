export interface IBookContext {
  title: string;
  coverURL: string;
  buyURL: string;
  sampleURL: string;
  featured: boolean; // only one can be present
}
