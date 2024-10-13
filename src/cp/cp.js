import { spawn } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
  const scriptPath = join(__dirname, "files", "script.js");
  const child = spawn("node", [scriptPath, ...args], {
    stdio: ["pipe", "pipe", "pipe", "ipc"],
  });

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  child.on("exit", (code) => {
    console.log(`Child process exited with code ${code}`);
  });

  return new Promise((resolve) => {
    child.on("close", resolve);
  });
};

// Put your arguments in function call to test this functionality
// spawnChildProcess(/* [someArgument1, someArgument2, ...] */);
spawnChildProcess(["arg1", "arg2", "arg3"]);
