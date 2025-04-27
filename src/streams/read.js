import { createReadStream } from "node:fs";
import { join } from "node:path";
import { pipeline } from "node:stream/promises";

const read = async () => {
  try {
    const filePath = join(import.meta.dirname, "files", "fileToRead.txt");
    const readStream = createReadStream(filePath);

    await pipeline(readStream, process.stdout);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await read();
