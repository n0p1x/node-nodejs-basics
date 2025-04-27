import { spawn } from "node:child_process";
import { join } from "node:path";

const spawnChildProcess = async (args) => {
  const scriptPath = join(import.meta.dirname, "files", "script.js");

  const child = spawn("node", [scriptPath, ...args], {
    stdio: ["pipe", "pipe", "pipe"],
  });

  child.stdout.pipe(process.stdout);
  process.stdin.pipe(child.stdin);

  child.on("error", (error) => {
    console.error(`Child process error: ${error.message}`);
  });
  child.on("exit", (code) => {
    console.log(`Child process exited with code ${code}`);
  });

  return child;
};

spawnChildProcess(["arg1", "arg2", "arg3"]);
