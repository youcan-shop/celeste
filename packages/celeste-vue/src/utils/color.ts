// TYPES
export interface Coordinates {
  x: number;
  y: number;
}

export type ArrowDirection = 'up' | 'down' | 'left' | 'right';

// VALUES
export const DEFAULT_SWATCH = [
  '#717784ff',
  '#335cffff',
  '#ff8547ff',
  '#fb3747ff',
  '#1fc16bff',
  '#f6b51eff',
  '#7e52f4ff',
  '#47c2ffff',
];

// MATH
export function getFractionDigit(data: number | string): number {
  const str = data.toString();

  if (str.includes('.')) {
    return str.split('.')[1].length;
  }

  return 0;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function truncColorValue(value: string): number {
  return Math.trunc(Number(value.replace(/[%°]/g, '').trim()));
}

// DOM
export function getPageXYFromEvent(e: MouseEvent | TouchEvent): Coordinates {
  const coordinates: Coordinates = { x: 0, y: 0 };
  if (e instanceof MouseEvent) {
    coordinates.x = e.pageX;
    coordinates.y = e.pageY;
  }

  if (typeof TouchEvent !== 'undefined' && e instanceof TouchEvent) {
    coordinates.x = (e.touches ? e.touches[0].pageX : e.changedTouches ? e.changedTouches[0].pageX : 0);
    coordinates.y = (e.touches ? e.touches[0].pageY : e.changedTouches ? e.changedTouches[0].pageY : 0);
  }

  return coordinates;
}

export function getScrollXY(): Coordinates {
  const x = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft || 0;
  const y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;

  return { x, y };
}

/** get the position of the container relative to the document’s edge, regardless of any scrolling that has occurred */
export function getAbsolutePosition(container: HTMLElement): Coordinates {
  const { x: scrollX, y: scrollY } = getScrollXY();

  const rect = container.getBoundingClientRect();

  return {
    x: rect.left + scrollX,
    y: rect.top + scrollY,
  };
}

export function resolveArrowDirection(e: KeyboardEvent): ArrowDirection | null {
  const arrowMap: Record<string, ArrowDirection> = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
  };

  return arrowMap[e.code] || null;
}
