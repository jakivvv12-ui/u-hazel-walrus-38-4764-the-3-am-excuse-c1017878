// The 3 AM Excuse — make.fun bounty u-hazel-walrus-38-4764-the-3-am-excuse-c1017878
// A hardware wallet refuses to sign a transaction at 3 AM.
const fs = require("fs");
const path = require("path");

// Entry: 134 characters, 136 bytes UTF-8, single line.
// The wallet speaks as itself: it guards the fortune, it was woken at
// 3 AM, and it refuses — the hour itself is the joke.
const ENTRY =
  "It's 3 AM. I hold your entire fortune and you woke me up for a transaction you'll regret by sunrise — go to bed, I'm not signing this.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error("entry must be 1-200 characters, got " + ENTRY.length);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "entry.txt");
fs.writeFileSync(outPath, ENTRY, "utf8");

const roundTrip = fs.readFileSync(outPath, "utf8");
if (roundTrip !== ENTRY) {
  throw new Error("round-trip verification failed");
}
