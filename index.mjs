import {readFileSync} from "node:fs";
import {pathToFileURL} from "node:url";

export function run(input) {
  const {steps, events} = input;
  const progress = new Map();
  const counts = steps.map(() => 0);
  for (const [user, event] of [...events].sort((a, b) => a[2] - b[2])) {
    const index = progress.get(user) ?? 0;
    if (index >= steps.length || steps[index] !== event) continue;
    counts[index]++;
    progress.set(user, index + 1);
  }
  return steps.map((step, index) => ({step, users: counts[index]}));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    if (process.argv.length !== 3) throw new Error("Usage: node index.mjs INPUT.json");
    const input = JSON.parse(readFileSync(process.argv[2], "utf8"));
    console.log(JSON.stringify(run(input), null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
