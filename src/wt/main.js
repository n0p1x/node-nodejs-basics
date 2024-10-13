import { Worker } from "node:worker_threads";
import { cpus } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
  const numCores = cpus().length;
  const workerPath = join(__dirname, "worker.js");
  const workers = [];
  const results = Array.from({ length: numCores });

  const workerPromises = Array.from({ length: numCores }, (_, i) => {
    return new Promise((resolve) => {
      const worker = new Worker(workerPath);
      workers.push(worker);

      worker.on("message", (result) => {
        results[i] = result;
        resolve();
      });

      worker.on("error", () => {
        results[i] = { status: "error", data: null };
        resolve();
      });

      worker.postMessage(10 + i);
    });
  });

  await Promise.all(workerPromises);
  console.log(results);
  workers.forEach((w) => w.terminate());
};

await performCalculations();
