import { createReadStream, createWriteStream } from "node:fs";
import { createGunzip } from "node:zlib";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const inputFile = join(__dirname, "files", "archive.gz");
  const outputFile = join(__dirname, "files", "fileToCompress.txt");

  const readStream = createReadStream(inputFile);
  const writeStream = createWriteStream(outputFile);
  const gunzip = createGunzip();

  return new Promise((resolve, reject) => {
    readStream
      .pipe(gunzip)
      .pipe(writeStream)
      .on("finish", resolve)
      .on("error", reject);
  });
};

await decompress();
