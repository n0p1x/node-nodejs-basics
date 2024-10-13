import { Transform } from "node:stream";

const transform = async () => {
  const reverseStream = new Transform({
    transform(chunk, encoding, callback) {
      const reversed = chunk.toString().split("").reverse().join("");
      callback(null, reversed);
    },
  });

  process.stdin.pipe(reverseStream).pipe(process.stdout);

  return new Promise((resolve, reject) => {
    process.stdin.on("end", resolve);
    reverseStream.on("error", reject);
  });
};

await transform();
