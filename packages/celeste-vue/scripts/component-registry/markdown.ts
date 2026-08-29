import type { ComponentEntry, ComponentRegistry } from './types.ts';

export function renderRegistryMarkdown(registry: ComponentRegistry): string {
  const groups = new Map<string, ComponentEntry[]>();

  for (const component of Object.values(registry.components)) {
    const existing = groups.get(component.group) ?? [];
    existing.push(component);
    groups.set(component.group, existing);
  }

  const lines: string[] = [
    '# Celeste Component Registry',
    '',
    `> Generated from source for \`@youcan/celeste@${registry.version}\`. Do not edit.`,
    '> Regenerate with `pnpm --filter @youcan/celeste codegen:registry`.',
    '',
    `Every component below is imported from \`${'@youcan/celeste'}\`:`,
    '',
    '```ts',
    'import { Badge, Button } from \'@youcan/celeste\';',
    '```',
    '',
    `**${Object.keys(registry.components).length} components** in ${groups.size} groups.`,
    '',
    'This file describes what each component _accepts_. For which component to',
    'reach for when several look similar, see the `celeste-ui` skill.',
    '',
  ];

  for (const group of [...groups.keys()].sort()) {
    const components = groups.get(group)!.sort((a, b) => a.name.localeCompare(b.name));

    lines.push('---', '', `## ${group}`, '');

    const groupStory = components.find(component => component.story)?.story;

    for (const component of components)
      lines.push(...renderComponent(component, groupStory));
  }

  return `${lines.join('\n').trimEnd()}\n`;
}

function renderComponent(component: ComponentEntry, groupStory: string | undefined): string[] {
  const lines: string[] = [`### ${component.name}`, ''];

  if (component.props.length) {
    lines.push('**Props**', '');

    for (const prop of component.props) {
      const type = prop.values ? prop.values.map(value => `\`${value}\``).join(' | ') : `\`${prop.type}\``;
      const required = prop.required ? ' **(required)**' : '';
      const fallback = prop.default ? ` — default \`${prop.default}\`` : '';
      const note = prop.description ? ` — ${prop.description}` : '';

      lines.push(`- \`${prop.name}\`: ${type}${required}${fallback}${note}`);
    }

    lines.push('');
  }

  if (component.events.length) {
    lines.push('**Events**', '');

    for (const event of component.events)
      lines.push(`- \`${event.name}\`: \`${event.type}\``);

    lines.push('');
  }

  if (component.slots.length) {
    lines.push('**Slots**', '');

    for (const slot of component.slots) {
      const scoped = slot.type && slot.type !== '{}' ? ` — scope \`${slot.type}\`` : '';
      lines.push(`- \`${slot.name}\`${scoped}`);
    }

    lines.push('');
  }

  if (!component.props.length && !component.events.length && !component.slots.length)
    lines.push('_Takes no props, events, or slots._', '');

  if (component.siblings.length)
    lines.push(`**Composes with:** ${component.siblings.map(name => `\`${name}\``).join(', ')}`, '');

  lines.push(`**Source:** \`${component.file}\``, '');

  if (component.story)
    lines.push(`**Example:** \`${component.story}\``, '');
  else if (groupStory)
    lines.push(`**Example:** no story of its own — see \`${groupStory}\` for the group.`, '');
  else
    lines.push('**Example:** none. Read the source above.', '');

  return lines;
}
