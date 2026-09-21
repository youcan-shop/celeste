import { readFileSync } from 'node:fs';

const TEMPLATE_RE = /template:\s*`([\s\S]*?)`/;
const ARGS_BINDING_RE = /\s+v-bind="args"/g;
// Quoted attribute values may contain `>`, as in `@click="() => open = true"`.
const TAG_RE = /<(\/?)([\w-]+)((?:\s(?:[^>"'/]|\/(?!>)|"[^"]*"|'[^']*')*)?)(\/?)>/g;

interface Element {
  tag: string;
  start: number;
  end: number;
  children: Element[];
}

/**
 * Parses the template into elements by tag balance rather than indentation,
 * which hand-written stories do not keep consistent.
 */
function parse(template: string): Element[] {
  const root: Element = { tag: '', start: 0, end: template.length, children: [] };
  const stack = [root];

  for (const match of template.matchAll(TAG_RE)) {
    const [text, closing, tag, , selfClosing] = match;
    const start = match.index;
    const end = start + text.length;
    const parent = stack.at(-1)!;

    if (closing) {
      const open = stack.findLastIndex(element => element.tag === tag);

      if (open > 0) {
        stack[open].end = end;
        stack.length = open;
      }

      continue;
    }

    const element: Element = { tag, start, end, children: [] };
    parent.children.push(element);

    if (!selfClosing)
      stack.push(element);
  }

  return root.children;
}

function lineStart(text: string, offset: number): number {
  return text.lastIndexOf('\n', offset - 1) + 1;
}

/**
 * Stories wrap the component in layout markup for Storybook's canvas. A lone
 * lowercase root element is that wrapper, not usage.
 */
function unwrap(template: string): string {
  for (;;) {
    const roots = parse(template);
    const [root] = roots;

    if (roots.length !== 1 || root.tag !== root.tag.toLowerCase() || !root.children.length)
      return template;

    const inner = template.slice(root.start, root.end);
    const open = inner.match(TAG_RE)![0].length;
    const close = inner.lastIndexOf(`</${root.tag}`);

    if (close < open)
      return template;

    template = inner.slice(open, close);
  }
}

/**
 * A menu with six items teaches no more than one with a single item. Keeps
 * the first of each run of same-tag siblings and notes how many were dropped.
 */
function collapseRepeats(template: string): string {
  const cuts: { from: number; to: number; note: string }[] = [];

  function visit(siblings: Element[]): void {
    let index = 0;

    while (index < siblings.length) {
      const first = siblings[index];
      let last = index;

      while (last + 1 < siblings.length && siblings[last + 1].tag === first.tag)
        last++;

      visit(first.children);

      if (last > index) {
        const indent = template.slice(lineStart(template, first.start), first.start);
        cuts.push({
          from: first.end,
          to: siblings[last].end,
          note: `\n${indent}<!-- …${last - index} more <${first.tag}> -->`,
        });
      }

      index = last + 1;
    }
  }

  visit(parse(template));

  return cuts
    .sort((a, b) => b.from - a.from)
    .reduce((text, cut) => text.slice(0, cut.from) + cut.note + text.slice(cut.to), template);
}

function tidy(template: string): string {
  const lines = template.split('\n').filter(line => line.trim()).map(line => line.trimEnd());
  const base = Math.min(...lines.map(line => line.match(/^ */)![0].length));

  return lines.map(line => line.slice(base)).join('\n');
}

/**
 * The first story's template, trimmed to what shows how the group's parts
 * nest. Returns nothing when it shows no nesting — a lone `<Badge />` tells an
 * agent nothing the props do not.
 */
export function extractUsage(storyPath: string, group: string[]): string | undefined {
  const match = readFileSync(storyPath, 'utf8').match(TEMPLATE_RE);

  if (!match)
    return undefined;

  const template = unwrap(match[1].replace(ARGS_BINDING_RE, ''));
  const used = new Set([...template.matchAll(TAG_RE)].map(tag => tag[2]));

  if (group.filter(name => used.has(name)).length < 2)
    return undefined;

  return tidy(collapseRepeats(template));
}
