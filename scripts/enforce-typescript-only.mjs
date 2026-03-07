import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "src");
const offenders = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (full.endsWith(".js") || full.endsWith(".jsx")) {
      offenders.push(path.relative(process.cwd(), full));
    }
  }
}

if (!fs.existsSync(root)) {
  console.error("Missing src directory.");
  process.exit(1);
}

walk(root);

if (offenders.length > 0) {
  console.error("TypeScript-only check failed. JS files found in src:");
  for (const file of offenders) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log("TypeScript-only check passed.");
