import { rename } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
  const oldPath = join(__dirname, "files", "wrongFilename.txt");
  const newPath = join(__dirname, "files", "properFilename.md");

  try {
    await rename(oldPath, newPath);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await rename();
