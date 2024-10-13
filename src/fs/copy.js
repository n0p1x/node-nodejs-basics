import { cp } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  const sourcePath = join(__dirname, "files");
  const destPath = join(__dirname, "files_copy");

  try {
    await cp(sourcePath, destPath, {
      recursive: true,
      errorOnExist: true,
      force: false,
    });
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await copy();
