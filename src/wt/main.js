import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';
import { join } from 'node:path';

const performCalculations = async () => {
    const numOfCores = cpus().length;
    const workerPath = join(import.meta.dirname, 'worker.js');

    const workerPromises = [];

    for (let i = 0; i < numOfCores; i++) {
        const workerData = 10 + i;

        const workerPromise = new Promise((resolve) => {
            const worker = new Worker(workerPath);

            worker.on('message', (result) => {
                worker.terminate();
                resolve(result);
            });

            worker.on('error', () => {
                worker.terminate();
                resolve({ status: 'error', data: null });
            });

            worker.postMessage(workerData);
        });

        workerPromises.push(workerPromise);
    }

    const results = await Promise.all(workerPromises);

    console.log(results);
};

await performCalculations();
