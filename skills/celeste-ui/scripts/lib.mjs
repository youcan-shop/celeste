import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import process from 'node:process';

const PACKAGE = '@youcan/celeste';

export function fail(message) {
  console.error(`✗ ${message}`);
  process.exit(1);
}

function aiDir() {
  if (process.env.CELESTE_AI_DIR)
    return resolve(process.env.CELESTE_AI_DIR);

  let dir = process.cwd();

  for (;;) {
    const candidates = [
      join(dir, 'node_modules', PACKAGE, 'ai'),
      join(dir, 'packages/celeste-vue/ai'),
    ];

    for (const candidate of candidates) {
      if (existsSync(candidate))
        return candidate;
    }

    const parent = dirname(dir);

    if (parent === dir)
      break;

    dir = parent;
  }

  return fail(
    `Could not find ${PACKAGE}/ai.\n`
    + `  Install ${PACKAGE}, or point CELESTE_AI_DIR at a built ai/ directory.`,
  );
}

export function load(file) {
  const path = join(aiDir(), file);

  if (!existsSync(path)) {
    fail(
      `Missing ${path}\n`
      + `  The installed ${PACKAGE} predates the JSON index.\n`
      + `  Upgrade it, or rebuild: pnpm --filter ${PACKAGE} codegen:registry`,
    );
  }

  return JSON.parse(readFileSync(path, 'utf8'));
}

export function args() {
  return process.argv.slice(2).filter(arg => !arg.startsWith('--'));
}

export function wantsJson() {
  return process.argv.includes('--json');
}

export function cap(items, limit, hint) {
  if (items.length <= limit)
    return { shown: items, note: null };

  return {
    shown: items.slice(0, limit),
    note: `… ${items.length - limit} more of ${items.length}. ${hint}`,
  };
}

function distance(a, b) {
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);

  for (let i = 0; i < a.length; i++) {
    const current = [i + 1];

    for (let j = 0; j < b.length; j++) {
      current.push(Math.min(
        previous[j + 1] + 1,
        current[j] + 1,
        previous[j] + (a[i] === b[j] ? 0 : 1),
      ));
    }

    previous = current;
  }

  return previous[b.length];
}

export function closest(name, candidates, limit = 5) {
  const needle = name.toLowerCase();

  const scored = candidates
    .map((candidate) => {
      const key = candidate.toLowerCase();

      if (key === needle)
        return { candidate, rank: 0 };
      if (key.includes(needle) || needle.includes(key))
        return { candidate, rank: 1 };

      let shared = 0;
      while (shared < key.length && shared < needle.length && key[shared] === needle[shared])
        shared++;

      if (shared >= 4)
        return { candidate, rank: 2 };

      const gap = distance(needle, key);

      return { candidate, rank: gap <= Math.max(2, Math.floor(key.length / 3)) ? 2 + gap : Infinity };
    })
    .filter(entry => entry.rank !== Infinity)
    .sort((a, b) => a.rank - b.rank || a.candidate.localeCompare(b.candidate));

  return scored.slice(0, limit).map(entry => entry.candidate);
}
