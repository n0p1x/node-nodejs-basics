import { createReadStream, createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const inputFile = join(__dirname, "files", "fileToCompress.txt");
  const outputFile = join(__dirname, "files", "archive.gz");

  const readStream = createReadStream(inputFile);
  const writeStream = createWriteStream(outputFile);
  const gzip = createGzip();

  return new Promise((resolve, reject) => {
    readStream
      .pipe(gzip)
      .pipe(writeStream)
      .on("finish", resolve)
      .on("error", reject);
  });
};

await compress();
