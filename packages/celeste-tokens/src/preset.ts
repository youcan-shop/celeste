import type { DeepPartial, Preset } from '@unocss/core';
import { mergeDeep } from '@unocss/core';

const EXCLUDE_PROPERTY = ['extensions', 'description'];

const TYPES_THEME = {
  'color': 'colors',
  'dimension': 'size',
  'custom-spacing': 'spacing',
  'custom-stroke': 'border',
  'radius': 'radius',
  'custom-transition': 'transition',
  'custom-opacity': 'opacity',
  'custom-gradient': 'gradient',
  'custom-grid': 'grid',
  'custom-fontStyle': 'font',
  'custom-shadow': 'shadow',
};

function isObjectEmpty(objectName: Record<string, any>): boolean {
  return Object.keys(objectName).length === 0;
}

function isObject(o: any): boolean {
  return o instanceof Object && o.constructor === Object;
}

export function definePreset({ divider, tokens }: PresetTokenOptions): DeepPartial<any> {
  if (!tokens) {
    console.warn('the tokens property is requried');
    return {};
  }

  if (isObjectEmpty(tokens))
    return {};

  function isTokenRef(token: string): boolean {
    if (!token)
      return false;
    if (typeof token !== 'string')
      return false;

    return token.startsWith('{') && token.endsWith('}');
  }

  function getDivider(): string {
    return divider && ['-', '_', '.'].includes(divider) ? divider : '-';
  }

  function processTokenRef(token: string, tokensType: Record<string, any>): string {
    const cleaning = token
      .slice(1, -1)
      .replaceAll(' ', getDivider())
      .replaceAll('.', getDivider());

    return tokensType[cleaning] || token;
  }

  function recursive(
    data: Record<string, any>,
    parentKey?: string,
    acc: Record<string, any> = {},
  ): Record<string, any> {
    const arr = Object.entries(data);

    for (const [key, property] of arr) {
      if (EXCLUDE_PROPERTY.includes(key))
        continue;
      if (!isObject(property))
        continue;

      let newKey = parentKey ? [parentKey, key].join(getDivider()) : key;
      newKey = newKey.replaceAll(' ', getDivider());

      if (Object.prototype.hasOwnProperty.call(property, 'value') && property.type) {
        const type = TYPES_THEME[property.type as keyof typeof TYPES_THEME] || null;

        if (type) {
          acc[type] ||= {};
          acc[type][newKey] = isTokenRef(property.value)
            ? processTokenRef(property.value, acc[type])
            : property.value;
        }

        continue;
      }

      if (property.description || property.extensions)
        continue;

      recursive(property, newKey, acc);
    }

    return acc;
  }

  const end = recursive(tokens);

  // FIXME: remove after all styles are handled
  // eslint-disable-next-line no-console
  console.log(end);

  return end;
}

export interface PresetTokenOptions {
  divider?: '-' | '_' | '.';
  tokens: Record<string, any>;
}

export function presetStyledict<T extends Record<string, any>>(options: PresetTokenOptions): Preset<T> {
  return {
    name: 'youcan/unocss-preset-styledict',
    extendTheme: (util) => {
      return mergeDeep(
        util,
        definePreset({
          divider: options.divider,
          tokens: options.tokens,
        }),
      );
    },
  };
}

export default presetStyledict;
