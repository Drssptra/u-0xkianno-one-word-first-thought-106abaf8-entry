// One Word, First Thought — v2 resubmission.
// The single word below is the whole entry. Nothing else is written.
import * as fs from "node:fs";
import * as path from "node:path";

const FIRST_THOUGHT = "sonder";
const PREVIOUS_WORD = "vellichor";

const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target: string = path.join(outDir, "entry.txt");

const points: string[] = Array.from(FIRST_THOUGHT);
const checks: [boolean, string][] = [
  [FIRST_THOUGHT !== PREVIOUS_WORD, "word must be different from the v1 word"],
  [points.length >= 1 && points.length <= 24, `word must be 1-24 characters, got ${points.length}`],
  [FIRST_THOUGHT.trim().length > 0, "word must not be only whitespace"],
  [!/\s/u.test(FIRST_THOUGHT), "word must be exactly one word"],
  [points.every((ch) => ch === ch.toLowerCase()), "word must be lowercase"],
];

for (const [ok, why] of checks) {
  if (!ok) {
    throw new Error(`invalid entry: ${why}`);
  }
}

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const bytes: Buffer = Buffer.from(FIRST_THOUGHT, "utf8");
fs.writeFileSync(target, bytes);
// Re-read and confirm the file on disk is byte-exactly the word.
const written: Buffer = fs.readFileSync(target);
if (!written.equals(bytes)) {
  throw new Error("entry.txt on disk does not match the entry word");
}
process.stdout.write(`${FIRST_THOUGHT}\n`);
