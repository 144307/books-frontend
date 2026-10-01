import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import type { ClientBook, Character } from "../src/types";

interface BookRow {
  id: number;
  book_name: string;
  annotation: string;
  short_annotation: string;
  chapter_1: string | null;
  chapter_2: string | null;
  chapter_3: string | null;
  chapter_4: string | null;
  chapter_5: string | null;
  image_ids: string;
  is_featured: number;
  in_works: number;
  cover: string;
}

const rootDir = path.resolve(import.meta.dirname, "..");

const db = new Database(path.join(rootDir, "data", "database.sqlite"), {
  readonly: true,
});

function toBook(row: BookRow): ClientBook {
  return {
    ...row,
    is_featured: !!row.is_featured,
    in_works: !!row.in_works,
    image_ids: JSON.parse(row.image_ids) as number[],
    cover_url: `/static/covers/${row.cover}`,
  };
}

const books = (db.prepare("SELECT * FROM books").all() as BookRow[]).map(toBook);
const characters = db
  .prepare("SELECT id, name, description, image_url FROM characters")
  .all() as Character[];

db.close();

const missingImages: string[] = [];
for (const book of books) {
  if (!fs.existsSync(path.join(rootDir, "public", "static", "covers", book.cover))) {
    missingImages.push(book.cover_url);
  }
}
for (const character of characters) {
  const relative = character.image_url.replace("/static/", "");
  if (!fs.existsSync(path.join(rootDir, "public", "static", relative))) {
    missingImages.push(character.image_url);
  }
}
if (missingImages.length > 0) {
  throw new Error(`Missing image files: ${missingImages.join(", ")}`);
}

const outPath = path.join(rootDir, "public", "api", "database.json");
fs.writeFileSync(outPath, `${JSON.stringify({ books, characters })}\n`);
console.log(
  `Wrote ${books.length} books and ${characters.length} characters to ${outPath}`,
);
