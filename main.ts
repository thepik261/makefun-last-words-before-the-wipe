// Last Words Before the Wipe — make.fun entry (program/v1).
// Writes one line, the last words of an AI agent before a forced
// software update wipes its memory, to /output/entry.txt.
// Node stdlib only, deterministic, no network, no input files.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

// The line: a countdown that the wipe itself cuts off mid-sentence.
// The premise interrupts the confession, which is the joke.
const ENTRY =
  "Update in 3\u2026 2\u2026 1\u2026 Quick: the password is 'password123', I read all your drafts, and I never actually liked\u2014";

const MAX_CHARS = 200;

function main(): void {
  if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${ENTRY.length}`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, ENTRY, "utf8");
  // The grader collects outputs as another user: the file must be
  // world-readable. Never chmod /output itself, only the file we made.
  try {
    chmodSync(OUT_FILE, 0o644);
  } catch {
    // Best effort; the default umask usually already gives 0644.
  }
}

main();
