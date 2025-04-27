import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { join } from "node:path";
import { pipeline } from "node:stream/promises";

const calculateHash = async () => {
  try {
    const filePath = join(import.meta.dirname, "files", "fileToCalculateHashFor.txt");
    const readStream = createReadStream(filePath);
    const hash = createHash("sha256");

    await pipeline(readStream, hash);

    console.log(hash.digest("hex"));
  } catch {
    throw new Error("FS operation failed");
  }
};

await calculateHash();
