export function unocssFormat({ dictionary }: { dictionary: any }): string {
  const preset: Record<string, any> = {
    name: 'presetCeleste',
    theme: {
      colors: {},
      fontFamily: {},
      fontSize: {},
      fontWeight: {},
      lineHeight: {},
      letterSpacing: {},
      borderRadius: {},
      boxShadow: {},
      spacing: {},
      duration: {},
    },
    shortcuts: {},
  };

  const set = (obj: any, path: string[], value: any): void => {
    let current = obj;
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      if (!current[key])
        current[key] = {};
      current = current[key];
    }
    current[path[path.length - 1]] = value;
  };

  const propertyMap: Record<string, string> = {
    color: 'colors',
    fontFamilies: 'fontFamily',
    fontSizes: 'fontSize',
    fontWeights: 'fontWeight',
    lineHeights: 'lineHeight',
    letterSpacing: 'letterSpacing',
    spacing: 'spacing',
    radius: 'borderRadius',
    shadow: 'boxShadow',
    boxShadow: 'boxShadow',
    animation: 'duration',
    duration: 'duration',
  };

  dictionary.allTokens.forEach((token: any) => {
    const { path, value, type, $type, name } = token;
    const val = value ?? token.$value;
    const root = path[0];
    const subPath = path.slice(1);

    if (subPath.length === 0)
      return;

    if ($type === 'typography' || type === 'typography' || root === 'typography') {
      const shortcutName = name;
      if (shortcutName) {
        preset.shortcuts[shortcutName] = `[font:var(--${shortcutName})]`;
      }
      return;
    }

    let themeKey = propertyMap[root] ?? propertyMap[$type] ?? propertyMap[type];

    if (!themeKey && path.includes('radius')) {
      themeKey = 'borderRadius';
    }

    if (themeKey) {
      let finalValue = val;

      if (themeKey === 'boxShadow') {
        if (typeof val === 'object' && val !== null) {
          const shadows = Array.isArray(val) ? val : [val];
          finalValue = shadows.map((s: any) => {
            if (typeof s === 'string')
              return s;
            const { x, y, blur, spread, color, type: shadowType } = s;
            const inset = shadowType === 'innerShadow' ? 'inset ' : '';
            return `${inset}${x}px ${y}px ${blur}px ${spread}px ${color}`;
          }).join(', ');
        }
      }

      set(preset.theme[themeKey], subPath, finalValue);
    }
  });

  return `import { definePreset, type Preset } from 'unocss';

export interface CelestePresetOptions {
  // placeholder
}

export const presetCeleste = definePreset((options: CelestePresetOptions = {}): Preset => {
  return ${JSON.stringify(preset, null, 2)};
});
`;
}
