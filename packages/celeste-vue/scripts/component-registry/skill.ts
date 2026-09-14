import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export interface SkillCounts {
  components: number;
  tokens: number;
  themed: number;
  icons: number;
}

type CountKey = keyof SkillCounts;

const SENTENCES: { file: string; template: string }[] = [
  { file: 'SKILL.md', template: 'design system: {components} Vue 3 components, {tokens} design tokens, and {icons} icons' },
  { file: 'rules/components.md', template: 'Celeste exports {components} components' },
  { file: 'rules/icons.md', template: 'Celeste ships {icons} icons' },
  { file: 'rules/tokens.md', template: 'There are {tokens} of them' },
  { file: 'rules/tokens.md', template: 'through them: {themed} of the {tokens} are redefined' },
];

const PLACEHOLDER_RE = /\{(\w+)\}/g;
const NUMBER = String.raw`(\d[\d,]*)`;

function escape(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, String.raw`\s+`);
}

function compile(template: string): { pattern: RegExp; keys: CountKey[] } {
  const literals = template.split(PLACEHOLDER_RE).filter((_, index) => index % 2 === 0);
  const keys = [...template.matchAll(PLACEHOLDER_RE)].map(match => match[1] as CountKey);
  const source = literals.map(literal => `(${escape(literal)})`).join(NUMBER);

  return { pattern: new RegExp(source), keys };
}

export function syncSkillCounts(skillRoot: string, counts: SkillCounts): string[] {
  const contents = new Map<string, string>();
  const missing: string[] = [];

  for (const { file, template } of SENTENCES) {
    const path = join(skillRoot, file);

    if (!existsSync(path)) {
      missing.push(`${file}: file not found`);
      continue;
    }

    const source = contents.get(file) ?? readFileSync(path, 'utf8');
    const { pattern, keys } = compile(template);

    if (!pattern.test(source)) {
      missing.push(`${file}: "${template}"`);
      continue;
    }

    contents.set(file, source.replace(pattern, (...groups: string[]) => {
      const parts = groups.slice(1, keys.length * 2 + 2);

      return parts
        .map((part, index) => index % 2 === 0 ? part : counts[keys[(index - 1) / 2]].toLocaleString('en-US'))
        .join('');
    }));
  }

  if (missing.length) {
    throw new Error(
      `Could not find these count sentences in the skill:\n    ${missing.join('\n    ')}\n`
      + '  If the wording changed, update SENTENCES in scripts/component-registry/skill.ts.',
    );
  }

  const changed: string[] = [];

  for (const [file, content] of contents) {
    const path = join(skillRoot, file);

    if (readFileSync(path, 'utf8') !== content) {
      writeFileSync(path, content);
      changed.push(file);
    }
  }

  return changed;
}
