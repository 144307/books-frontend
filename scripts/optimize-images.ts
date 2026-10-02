import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const rootDir = path.resolve(import.meta.dirname, "..");

const TARGETS: { dir: string; maxWidth: number }[] = [
  { dir: path.join(rootDir, "public", "static", "covers"), maxWidth: 800 },
  { dir: path.join(rootDir, "public", "static", "characters"), maxWidth: 1000 },
  { dir: path.join(rootDir, "public", "static", "gallery"), maxWidth: 1200 },
  { dir: path.join(rootDir, "src", "assets"), maxWidth: 1920 },
];

interface Renamed {
  oldBase: string;
  newBase: string;
}

const renamed: Renamed[] = [];

for (const { dir, maxWidth } of TARGETS) {
  if (!fs.existsSync(dir)) continue;
  for (const entry of fs.readdirSync(dir)) {
    const ext = path.extname(entry).toLowerCase();
    if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;
    const from = path.join(dir, entry);
    const to = path.join(dir, `${path.basename(entry, ext)}.webp`);
    const image = sharp(from);
    const meta = await image.metadata();
    const pipeline =
      meta.width && meta.width > maxWidth
        ? image.resize({ width: maxWidth })
        : image;
    await pipeline.webp({ quality: 82 }).toFile(to);
    fs.unlinkSync(from);
    renamed.push({ oldBase: path.basename(from), newBase: path.basename(to) });
    console.log(`${entry} -> ${path.basename(to)}`);
  }
}

if (renamed.length === 0) {
  console.log("Nothing to optimize");
} else {
  const renameMap = new Map(renamed.map((r) => [r.oldBase, r.newBase]));

  const replaceBase = (url: string): string => {
    const base = path.basename(url);
    const newBase = renameMap.get(base);
    return newBase ? url.slice(0, url.length - base.length) + newBase : url;
  };

  interface Data {
    books: { cover_url: string; gallery: string[] }[];
    characters: { image_url: string }[];
  }

  const outPath = path.join(rootDir, "public", "api", "database.json");
  const data = JSON.parse(fs.readFileSync(outPath, "utf8")) as Data;
  for (const book of data.books) {
    book.cover_url = replaceBase(book.cover_url);
    book.gallery = book.gallery.map(replaceBase);
  }
  for (const character of data.characters) {
    character.image_url = replaceBase(character.image_url);
  }
  fs.writeFileSync(outPath, `${JSON.stringify(data)}\n`);
  console.log(`Optimized ${renamed.length} images and updated ${outPath}`);
}
