import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { join } from 'node:path';

const compress = async () => {
  try {
    const sourceFilePath = join(import.meta.dirname, 'files', 'fileToCompress.txt');
    const destinationFilePath = join(import.meta.dirname, 'files', 'archive.gz');

    const source = createReadStream(sourceFilePath);
    const target = createWriteStream(destinationFilePath);
    const gzip = createGzip();

    await pipeline(source, gzip, target);
  } catch (error) {
    throw new Error('Operation failed');
  }
};

await compress();
