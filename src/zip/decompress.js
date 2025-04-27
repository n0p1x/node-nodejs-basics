import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { join } from 'node:path';

const decompress = async () => {
  try {
    const sourceFilePath = join(import.meta.dirname, 'files', 'archive.gz');
    const destinationFilePath = join(import.meta.dirname, 'files', 'fileToCompress.txt');

    const source = createReadStream(sourceFilePath);
    const target = createWriteStream(destinationFilePath);
    const gunzip = createGunzip();

    await pipeline(source, gunzip, target);
  } catch (error) {
    throw new Error('Operation failed');
  }
};

await decompress();
