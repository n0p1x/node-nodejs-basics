import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

const transform = async () => {
  try {
    const reverseTransform = new Transform({
      transform(chunk, encoding, callback) {
        const input = chunk.toString();
        const reversed = input.split("").reverse().join("");
        callback(null, reversed);
      },
    });

    await pipeline(process.stdin, reverseTransform, process.stdout);
  } catch (error) {
    throw new Error("Stream operation failed");
  }
};

await transform();
