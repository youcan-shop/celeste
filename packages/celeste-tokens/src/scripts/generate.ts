import fs from 'node:fs';
import path from 'node:path';
import { getMergedTokens } from '@/utils';

const output = path.join(import.meta.dirname, '..', '..', 'dist');

fs.existsSync(output) || fs.mkdirSync(output);

fs.writeFileSync(
  path.join(output, 'tokens.js'),
  `const tokens = ${JSON.stringify(getMergedTokens(), null, 2)};\n\nexport default tokens;\n`,
);
