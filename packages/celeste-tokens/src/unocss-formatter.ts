export function unocssFormat({ dictionary, animations }: { dictionary: any; animations: string }): string {
  const keyframes: Record<string, string> = {};
  const keyframesRegex = /@keyframes\s+([\w-]+)\s*\{([\s\S]*?)(?=@keyframes|$)/g;

  for (const match of animations.matchAll(keyframesRegex)) {
    const name = match[1];

    const fullContent = match[2].trim();

    const innerContent = fullContent.replace(/\}\s*$/, '').trim();

    const minified = innerContent
      .replace(/\s+/g, ' ')
      .replace(/\s*\{\s*/g, '{')
      .replace(/\s*\}\s*/g, '}')
      .replace(/\s*;\s*/g, ';')
      .replace(/\s*,\s*/g, ',');

    keyframes[name] = `{${minified}}`;
  }

  const preset: Record<string, any> = {
    name: 'presetCeleste',
    theme: {
      colors: {},
      font: {},
      fontSize: {},
      fontWeight: {},
      lineHeight: {},
      letterSpacing: {},
      radius: {},
      shadow: {},
      // spacing: {},
      duration: {},
      animation: {
        keyframes,
      },
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
    fontFamilies: 'font',
    fontSizes: 'fontSize',
    fontWeights: 'fontWeight',
    lineHeights: 'lineHeight',
    letterSpacing: 'letterSpacing',
    // spacing: 'spacing',
    radius: 'radius',
    shadow: 'shadow',
    boxShadow: 'shadow',
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
      themeKey = 'radius';
    }

    if (themeKey) {
      let finalValue = val;

      if (themeKey === 'shadow') {
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

        const flatKey = subPath.join('-');
        preset.theme.shadow[flatKey] = finalValue;

        return;
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
