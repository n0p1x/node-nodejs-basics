import { createWriteStream } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  const filePath = join(__dirname, "files", "fileToWrite.txt");
  const writeStream = createWriteStream(filePath);

  process.stdin.pipe(writeStream);

  return new Promise((resolve, reject) => {
    process.stdin.on("end", resolve);
    writeStream.on("error", reject);
  });
};

await write();
