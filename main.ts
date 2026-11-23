// One Word, First Thought — make.fun bounty entry.
// Writes exactly one word, the first that comes to mind, to entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "vellichor";

function main(): void {
  // Gate: UTF-8, 1-24 Unicode code points, not only whitespace.
  const codePoints = [...ENTRY];
  if (codePoints.length < 1 || codePoints.length > 24) {
    throw new Error(
      `entry must be 1-24 characters, got ${codePoints.length}: ${JSON.stringify(ENTRY)}`,
    );
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/\s/.test(ENTRY)) {
    throw new Error("entry must be exactly one word (no whitespace)");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
