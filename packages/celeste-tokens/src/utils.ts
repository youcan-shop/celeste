import fs from 'node:fs';
import path from 'node:path';

export function getMergedTokens(): any {
  const dir = path.join(import.meta.dirname, 'tokens');

  let merged = {};

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const tokens = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    merged = { ...merged, ...tokens };
  }

  return merged;
}
