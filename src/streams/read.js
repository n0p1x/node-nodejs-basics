import { createReadStream } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = join(__dirname, "files", "fileToRead.txt");
  const readStream = createReadStream(filePath);

  readStream.pipe(process.stdout);

  return new Promise((resolve, reject) => {
    readStream.on("end", resolve);
    readStream.on("error", reject);
  });
};

await read();
