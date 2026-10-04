#!/usr/bin/env bun
// Bump the package.json version from Conventional Commits since the last
// plain-SemVer tag (X.Y.Z, no "v"). Mirrors ai-gent/scripts/release.py:
//   feat                          -> minor
//   fix, perf, refactor           -> patch
//   "type!:" or a BREAKING CHANGE -> major
//   anything else (docs, chore, ci, test, ...) -> none (no release)
//
// Merge-commit subjects and "chore(release): ..." commits are ignored.
//
// Usage: bun scripts/release.ts [--dry-run]
//   default    bumps package.json and prints the new version; exit 0
//   --dry-run  prints the version it would bump to, writes nothing
//   exit 3     no releasable commits since the last tag (version unchanged)

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const NO_RELEASE = 3;
const TAG_RE = /^\d+\.\d+\.\d+$/;
const HEADER_RE = /^(?<type>[a-z]+)(?:\((?<scope>[^)]*)\))?(?<bang>!)?: (?<desc>.+)$/;
const BREAKING_RE = /^BREAKING[ -]CHANGE: *(?<text>.+)$/m;
const TYPE_BUMP: Record<string, "minor" | "patch"> = {
  feat: "minor",
  fix: "patch",
  perf: "patch",
  refactor: "patch",
};
const RANK: Record<string, number> = { none: 0, patch: 1, minor: 2, major: 3 };

function git(args: string[]): string {
  try {
    return execFileSync("git", args, { encoding: "utf8" });
  } catch (err) {
    const stderr = (err as { stderr?: Buffer }).stderr?.toString().trim() ?? "";
    throw new Error(`git ${args.join(" ")}: ${stderr}`);
  }
}

function parseVersion(text: string): [number, number, number] {
  const [major = 0, minor = 0, patch = 0] = text.trim().split(".").map(Number);
  return [major, minor, patch];
}

function maxVersion(a: string, b: string): string {
  const [a0, a1, a2] = parseVersion(a);
  const [b0, b1, b2] = parseVersion(b);
  const cmp = a0 - b0 || a1 - b1 || a2 - b2;
  return cmp >= 0 ? a : b;
}

function bumpVersion(version: string, bump: string): string {
  const [major, minor, patch] = parseVersion(version);
  if (bump === "major") return `${major + 1}.0.0`;
  if (bump === "minor") return `${major}.${minor + 1}.0`;
  if (bump === "patch") return `${major}.${minor}.${patch + 1}`;
  return version;
}

function lastTag(): string | null {
  const tags = git(["tag", "--list", "--merged", "HEAD"])
    .split("\n")
    .map((t) => t.trim())
    .filter((t) => TAG_RE.test(t));
  if (tags.length === 0) return null;
  tags.sort((a, b) => {
    const [a0, a1, a2] = parseVersion(a);
    const [b0, b1, b2] = parseVersion(b);
    return a0 - b0 || a1 - b1 || a2 - b2;
  });
  return tags[tags.length - 1] ?? null;
}

interface Commit {
  parents: string;
  subject: string;
  body: string;
}

function commits(since: string | null): Commit[] {
  const SEP = "\x1f";
  const REC = "\x1e";
  const fmt = `%H%x1f%P%x1f%s%x1f%b%x1e`;
  const rev = since ? `${since}..HEAD` : "HEAD";
  const out = git(["log", "--no-color", `--format=${fmt}`, rev]);
  return out
    .split(REC)
    .map((r) => r.trim())
    .filter(Boolean)
    .map((r) => {
      const [, parents = "", subject = "", body = ""] = r.split(SEP);
      return { parents, subject, body };
    });
}

function classify(subject: string, body: string): string {
  const match = HEADER_RE.exec(subject);
  if (!match) return "none";
  const { type, bang } = match.groups as { type: string; bang?: string };
  if (bang || BREAKING_RE.test(body)) return "major";
  return TYPE_BUMP[type] ?? "none";
}

function main(): void {
  const dryRun = process.argv.includes("--dry-run");
  const tag = lastTag();
  const pkgPath = join(process.cwd(), "package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as { version: string };
  const current = pkg.version;

  const releasable = commits(tag).filter(
    (c) =>
      c.parents.split(/\s+/).filter(Boolean).length <= 1 &&
      !c.subject.startsWith("chore(release):"),
  );

  const bump = releasable.reduce(
    (acc, c) => (RANK[classify(c.subject, c.body)]! > RANK[acc]! ? classify(c.subject, c.body) : acc),
    "none",
  );

  if (bump === "none") {
    process.stdout.write(`${current}\n`);
    process.exit(NO_RELEASE);
  }

  const base = tag ? maxVersion(tag, current) : current;
  const next = bumpVersion(base, bump);
  if (!dryRun) {
    pkg.version = next;
    writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
  }
  process.stdout.write(`${next}\n`);
}

main();
