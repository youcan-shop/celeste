export type GradientType = 'linear' | 'radial';

export interface GradientStop {
  color: string;
  position: number;
}

export interface Gradient {
  type: GradientType;
  angle: number;
  shape?: string;
  stops: GradientStop[];
}

const DIRECTIONS: Record<string, number> = {
  'to top': 0,
  'to top right': 45,
  'to right top': 45,
  'to right': 90,
  'to bottom right': 135,
  'to right bottom': 135,
  'to bottom': 180,
  'to bottom left': 225,
  'to left bottom': 225,
  'to left': 270,
  'to top left': 315,
  'to left top': 315,
};

const UNITS: Record<string, number> = { deg: 1, grad: 0.9, rad: 180 / Math.PI, turn: 360 };

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

  const unit = /^(-?(?:\d+(?:\.\d+)?|\.\d+))(deg|grad|rad|turn)$/.exec(head);

  const shape = /circle|ellipse|closest|farthest|^at /.test(head) ? parts[0] : undefined;

  if (unit || shape || head.startsWith('to ')) {
    parts.shift();
    angle = unit ? Math.round(((Number(unit[1]) * UNITS[unit[2]]) % 360 + 360) % 360) : DIRECTIONS[head] ?? angle;
  }

  const stops = parts.map((part, index) => {
    const position = /\s(-?\d+(?:\.\d+)?)%$/.exec(part)?.[1];

    return {
      color: (position === undefined ? part : part.slice(0, part.lastIndexOf(' '))).trim(),
      position: position === undefined ? Math.round((index / Math.max(parts.length - 1, 1)) * 100) : Number(position),
    };
  });

  const type = match[1].toLowerCase() as GradientType;

  return stops.length > 1 ? { type, angle, ...(type === 'radial' && shape && { shape }), stops } : null;
}

export function stringifyGradient({ type, angle, shape, stops }: Gradient): string {
  const list = [...stops].sort((a, b) => a.position - b.position).map(stop => `${stop.color} ${stop.position}%`).join(', ');

  return type === 'linear' ? `linear-gradient(${angle}deg, ${list})` : `radial-gradient(${shape ? `${shape}, ` : ''}${list})`;
}
