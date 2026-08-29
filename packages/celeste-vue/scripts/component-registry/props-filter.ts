import type { ComponentMeta } from 'vue-component-meta';

const NOISE_DECLARATION_SOURCES = [
  '@vue/runtime-dom',
  '@vue/runtime-core',
];

const KEEP_GLOBAL_PROPS = new Set([
  'class',
]);

const ALWAYS_SKIP_PROPS = new Set([
  'key',
  'ref',
  'ref_for',
  'ref_key',
  'style',
]);

const SKIP_PROP_PREFIXES = [
  'onVue:',
];

const INHERITED_PROP_DESCRIPTIONS: Record<string, string> = {
  as: 'Element or component to render as.',
  asChild: 'Render the child element instead of this component\'s own, merging props onto it.',
};

export function collapseWhitespace(description: string | undefined): string | undefined {
  const collapsed = description?.replace(/\s+/g, ' ').trim();

  return collapsed || undefined;
}

export function normalizeDescription(
  propName: string,
  description: string | undefined,
): string | undefined {
  return INHERITED_PROP_DESCRIPTIONS[propName] ?? collapseWhitespace(description);
}

export function shouldIncludeProp(prop: ComponentMeta['props'][number]): boolean {
  if (KEEP_GLOBAL_PROPS.has(prop.name))
    return true;

  if (ALWAYS_SKIP_PROPS.has(prop.name))
    return false;

  if (SKIP_PROP_PREFIXES.some(prefix => prop.name.startsWith(prefix)))
    return false;

  return !isInheritedFromVue(prop);
}

function isInheritedFromVue(prop: ComponentMeta['props'][number]): boolean {
  const declarations = prop.getDeclarations?.() ?? [];

  if (!declarations.length)
    return false;

  return declarations.every(declaration =>
    NOISE_DECLARATION_SOURCES.some(source => declaration.file.includes(`/node_modules/${source}/`)),
  );
}

export function cleanType(type: string): string {
  return type
    .split('|')
    .map(part => part.trim())
    .filter(part => part !== 'undefined')
    .join(' | ');
}

export function extractLiteralValues(type: string): string[] | undefined {
  const parts = type.split('|').map(part => part.trim()).filter(Boolean);

  if (parts.length < 2)
    return undefined;

  const values: string[] = [];

  for (const part of parts) {
    const match = part.match(/^"(.*)"$/);

    if (!match)
      return undefined;

    values.push(match[1]);
  }

  return values;
}
