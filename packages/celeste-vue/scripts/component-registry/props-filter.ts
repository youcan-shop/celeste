import type { ComponentMeta } from 'vue-component-meta';

// Filter on where TypeScript says a prop was declared, not on the `global`
// flag: props inherited from an element type are reported as local, so `global`
// misses them and TextInput reports 221 props instead of 6. reka-ui
// declarations are real API (`as`, `modelValue`) and must survive.
const NOISE_DECLARATION_SOURCES = [
  '@vue/runtime-dom',
  '@vue/runtime-core',
];

// Declared on most components and merged through clsx, but Vue reports it as a
// built-in because it also exists on every element.
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

// Upstream JSDoc for these runs to several paragraphs and would repeat on the
// ~85 components extending PrimitiveProps.
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

  // No declarations means compiler-synthesised, e.g. defineModel.
  if (!declarations.length)
    return false;

  return declarations.every(declaration =>
    NOISE_DECLARATION_SOURCES.some(source => declaration.file.includes(`/node_modules/${source}/`)),
  );
}

/** Strips the `| undefined` that optional props carry; implied by `required`. */
export function cleanType(type: string): string {
  return type
    .split('|')
    .map(part => part.trim())
    .filter(part => part !== 'undefined')
    .join(' | ');
}

/** Returns undefined for anything that is not a pure string-literal union. */
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
