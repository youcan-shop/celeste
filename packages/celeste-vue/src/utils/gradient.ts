export type GradientType = 'linear' | 'radial';

export interface GradientStop {
  color: string;
  position: number;
}

export interface Gradient {
  type: GradientType;
  angle: number;
  stops: GradientStop[];
}

const DIRECTIONS: Record<string, number> = { 'to top': 0, 'to right': 90, 'to bottom': 180, 'to left': 270 };

function splitTopLevel(value: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';

  for (const char of value) {
    depth += char === '(' ? 1 : char === ')' ? -1 : 0;

    if (char === ',' && depth === 0) {
      parts.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  return [...parts, current.trim()].filter(Boolean);
}

export function parseGradient(value?: string | null): Gradient | null {
  const match = /^\s*(linear|radial)-gradient\(([\s\S]*)\)\s*$/i.exec(value ?? '');

  if (!match) {
    return null;
  }

  const parts = splitTopLevel(match[2]);
  const head = parts[0]?.toLowerCase() ?? '';
  let angle = 180;

  if (/deg$|^to |circle|ellipse|closest|farthest|^at /.test(head)) {
    parts.shift();
    angle = DIRECTIONS[head] ?? Number(/(-?\d+(?:\.\d+)?)deg/.exec(head)?.[1] ?? angle);
  }

  const stops = parts.map((part, index) => {
    const position = /\s(-?\d+(?:\.\d+)?)%$/.exec(part)?.[1];

    return {
      color: (position === undefined ? part : part.slice(0, part.lastIndexOf(' '))).trim(),
      position: position === undefined ? Math.round((index / Math.max(parts.length - 1, 1)) * 100) : Number(position),
    };
  });

  return stops.length > 1 ? { type: match[1].toLowerCase() as GradientType, angle, stops } : null;
}

export function stringifyGradient({ type, angle, stops }: Gradient): string {
  const list = [...stops].sort((a, b) => a.position - b.position).map(stop => `${stop.color} ${stop.position}%`).join(', ');

  return type === 'linear' ? `linear-gradient(${angle}deg, ${list})` : `radial-gradient(${list})`;
}
