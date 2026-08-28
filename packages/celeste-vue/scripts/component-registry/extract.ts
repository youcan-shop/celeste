// vue-component-meta is also Storybook's docgen engine (.storybook/main.ts),
// so types here resolve identically to what Storybook shows.

import type { MetaCheckerOptions } from 'vue-component-meta';
import type { DiscoveredComponent } from './discovery.ts';
import type { ComponentEntry, EventEntry, PropEntry, SlotEntry } from './types.ts';
import { resolve } from 'node:path';
import { createChecker } from 'vue-component-meta';
import { cleanType, collapseWhitespace, extractLiteralValues, normalizeDescription, shouldIncludeProp } from './props-filter';

const IMPORT_SPECIFIER = '@youcan/celeste';

const CHECKER_OPTIONS: MetaCheckerOptions = {
  forceUseTs: true,
  printer: { newLine: 1 },
};

export function createComponentChecker(packageRoot: string) {
  return createChecker(resolve(packageRoot, 'tsconfig.app.json'), CHECKER_OPTIONS);
}

export function extractComponent(
  checker: ReturnType<typeof createComponentChecker>,
  component: DiscoveredComponent,
  siblings: string[],
): ComponentEntry {
  const meta = checker.getComponentMeta(component.path, 'default');

  const props: PropEntry[] = meta.props
    .filter(shouldIncludeProp)
    .map((prop) => {
      const type = cleanType(prop.type);
      const values = extractLiteralValues(type);
      const description = normalizeDescription(prop.name, prop.description);

      return {
        name: prop.name,
        type,
        ...(values ? { values } : {}),
        required: prop.required,
        ...(prop.default ? { default: prop.default } : {}),
        ...(description ? { description } : {}),
      };
    })
    .sort((a, b) => {
      // Required props first — they are what a caller must supply.
      if (a.required !== b.required)
        return a.required ? -1 : 1;

      return a.name.localeCompare(b.name);
    });

  const events: EventEntry[] = meta.events.map((event) => {
    const description = collapseWhitespace(event.description);

    return {
      name: event.name,
      type: event.type,
      ...(description ? { description } : {}),
    };
  });

  const slots: SlotEntry[] = meta.slots.map((slot) => {
    const description = collapseWhitespace(slot.description);

    return {
      name: slot.name,
      type: slot.type,
      ...(description ? { description } : {}),
    };
  });

  return {
    name: component.name,
    group: component.group,
    file: component.file,
    import: IMPORT_SPECIFIER,
    props,
    events,
    slots,
    siblings,
    ...(component.story ? { story: component.story } : {}),
    hasStory: Boolean(component.story),
  };
}
