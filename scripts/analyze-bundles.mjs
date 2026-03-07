import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const projectRoot = process.cwd();
const chunksDir = path.join(projectRoot, ".next", "static", "chunks");
const shouldCheck = process.argv.includes("--check");

const maxChunkKb = Number.parseFloat(process.env.MAX_CHUNK_KB || "260");
const maxTotalJsKb = Number.parseFloat(process.env.MAX_TOTAL_JS_KB || "5200");
const maxTotalGzipKb = Number.parseFloat(process.env.MAX_TOTAL_GZIP_KB || "1600");

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

if (!fs.existsSync(chunksDir)) {
  console.error(`Missing chunks directory: ${chunksDir}`);
  console.error("Run `npm run build` before bundle analysis.");
  process.exit(1);
}

const files = walk(chunksDir).filter((f) => f.endsWith(".js"));
if (files.length === 0) {
  console.error("No JS chunks found in .next/static/chunks.");
  process.exit(1);
}

const rows = files.map((file) => {
  const raw = fs.readFileSync(file);
  const gzip = zlib.gzipSync(raw, { level: 9 });
  return {
    file: path.relative(projectRoot, file),
    rawBytes: raw.length,
    gzipBytes: gzip.length,
  };
});

rows.sort((a, b) => b.rawBytes - a.rawBytes);

const totals = rows.reduce(
  (acc, row) => {
    acc.rawBytes += row.rawBytes;
    acc.gzipBytes += row.gzipBytes;
    return acc;
  },
  { rawBytes: 0, gzipBytes: 0 }
);

const toKb = (bytes) => (bytes / 1024).toFixed(1);

console.log("Top JS chunks by raw size:");
for (const row of rows.slice(0, 20)) {
  console.log(`${toKb(row.rawBytes).padStart(8)} KB raw | ${toKb(row.gzipBytes).padStart(8)} KB gzip | ${row.file}`);
}

console.log("\nTotals:");
console.log(`Raw JS total:  ${toKb(totals.rawBytes)} KB`);
console.log(`Gzip JS total: ${toKb(totals.gzipBytes)} KB`);

if (shouldCheck) {
  const biggest = rows[0];
  const biggestKb = biggest.rawBytes / 1024;
  const totalRawKb = totals.rawBytes / 1024;
  const totalGzipKb = totals.gzipBytes / 1024;

  const failures = [];
  if (biggestKb > maxChunkKb) {
    failures.push(
      `Largest chunk ${biggest.file} is ${biggestKb.toFixed(1)} KB, above MAX_CHUNK_KB=${maxChunkKb}`
    );
  }
  if (totalRawKb > maxTotalJsKb) {
    failures.push(
      `Total raw JS is ${totalRawKb.toFixed(1)} KB, above MAX_TOTAL_JS_KB=${maxTotalJsKb}`
    );
  }
  if (totalGzipKb > maxTotalGzipKb) {
    failures.push(
      `Total gzip JS is ${totalGzipKb.toFixed(1)} KB, above MAX_TOTAL_GZIP_KB=${maxTotalGzipKb}`
    );
  }

  if (failures.length > 0) {
    console.error("\nBundle budget check failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log("\nBundle budget check passed.");
}
