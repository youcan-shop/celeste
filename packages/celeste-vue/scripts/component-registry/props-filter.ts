/**
 * Prop filtering for registry generation.
 *
 * Components that extend a DOM element's attributes inherit hundreds of props
 * nobody ever sets. Unfiltered, `TextInput` reports 221 props — 61 of them
 * `aria-*` and `data-*` — and the eight that matter are unfindable.
 *
 * `vue-component-meta`'s `global` flag does not catch these: a prop is only
 * global if it exists on every component, whereas these come from the specific
 * element type the component extends, and are reported as local.
 *
 * What separates them reliably is where TypeScript says they were declared:
 *
 * - `@vue/runtime-dom` / `@vue/runtime-core` — DOM and Vue built-ins. Noise.
 * - `reka-ui` — the primitives Celeste composes on (`as`, `asChild`,
 *   `modelValue`, `disabled`). Genuine API, and often the whole reason a
 *   component is useful.
 * - the component's own `.vue` file — Celeste's own props.
 * - nothing at all — synthesised by the compiler, e.g. `modelValue` from
 *   `defineModel`. Always keep these.
 *
 * So the rule is: drop a prop when every declaration of it sits in Vue's own
 * runtime typings, and keep everything else.
 */

import type { ComponentMeta } from 'vue-component-meta';

/**
 * Packages whose declarations mark a prop as an inherited DOM/Vue built-in
 * rather than part of Celeste's API.
 */
const NOISE_DECLARATION_SOURCES = [
  '@vue/runtime-dom',
  '@vue/runtime-core',
];

/**
 * Global props that ARE part of the component API and must survive the filter.
 *
 * `class` is declared explicitly on most Celeste components
 * (`class?: HTMLAttributes['class']`) and merged through `clsx`, but Vue still
 * reports it as global because it also exists on every element.
 */
const KEEP_GLOBAL_PROPS = new Set([
  'class',
]);

/** Props that are never useful to an agent, global or not. */
const ALWAYS_SKIP_PROPS = new Set([
  'key',
  'ref',
  'ref_for',
  'ref_key',
  'style',
]);

/** Lifecycle hooks Vue injects onto every component. */
const SKIP_PROP_PREFIXES = [
  'onVue:',
];

/**
 * Concise replacements for props inherited from `reka-ui`'s `PrimitiveProps`.
 *
 * Their upstream JSDoc runs to several paragraphs and a docs link, and it would
 * otherwise repeat verbatim on the ~85 components that extend `PrimitiveProps`.
 * The behaviour is identical everywhere, so one short line serves better than
 * the same essay 85 times.
 */
const INHERITED_PROP_DESCRIPTIONS: Record<string, string> = {
  as: 'Element or component to render as.',
  asChild: 'Render the child element instead of this component\'s own, merging props onto it.',
};

/**
 * Descriptions come from JSDoc, which is free to wrap across lines and
 * paragraphs. Collapse to a single line so it cannot break the Markdown list it
 * gets rendered into.
 */
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

/**
 * True when every declaration of the prop lives in Vue's own runtime typings,
 * which makes it a DOM or Vue built-in rather than part of Celeste's API.
 *
 * Props with no declarations are compiler-synthesised (`defineModel`) and are
 * always kept.
 */
function isInheritedFromVue(prop: ComponentMeta['props'][number]): boolean {
  const declarations = prop.getDeclarations?.() ?? [];

  if (!declarations.length)
    return false;

  return declarations.every(declaration =>
    NOISE_DECLARATION_SOURCES.some(source => declaration.file.includes(`/node_modules/${source}/`)),
  );
}

/**
 * Strip the `| undefined` that optional props always carry — it is implied by
 * `required: false` and only adds noise to every single entry.
 */
export function cleanType(type: string): string {
  return type
    .split('|')
    .map(part => part.trim())
    .filter(part => part !== 'undefined')
    .join(' | ');
}

/**
 * Pull the members out of a string-literal union so consumers get a list of
 * allowed values rather than having to parse the type themselves. Returns
 * undefined for anything that is not a pure union of string literals.
 */
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
