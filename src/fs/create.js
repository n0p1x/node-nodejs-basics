import { writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  const filePath = join(__dirname, "files", "fresh.txt");
  const content = "I am fresh and young";

  try {
    await writeFile(filePath, content, { flag: "wx" });
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await create();
