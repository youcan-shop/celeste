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

// DOM
// TODO: Return type
export function getPageXYFromEvent(e: MouseEvent | TouchEvent): any {
  // including scroll offset
  const res: { x: number; y: number } = { x: 0, y: 0 };
  if (e instanceof MouseEvent) {
    res.x = e.pageX;
    res.y = e.pageY;
  }
  if (typeof TouchEvent !== 'undefined' && e instanceof TouchEvent) {
    res.x = (e.touches ? e.touches[0].pageX : e.changedTouches ? e.changedTouches[0].pageX : 0);
    res.y = (e.touches ? e.touches[0].pageY : e.changedTouches ? e.changedTouches[0].pageY : 0);
  }
  return res;
}

// TODO: Return type
export function getScrollXY(): any {
  const x = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft || 0;
  const y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  return { x, y };
}

/** get the position of the container relative to the document’s edge, regardless of any scrolling that has occurred */
// TODO: Return type
export function getAbsolutePosition(container: HTMLElement): any {
  const { x: scrollX, y: scrollY } = getScrollXY();

  const rect = container.getBoundingClientRect();
  return {
    x: rect.left + scrollX,
    y: rect.top + scrollY,
  };
}

export function resolveArrowDirection(e: KeyboardEvent): string | null {
  if (e.code === 'ArrowUp' || e.keyCode === 38) {
    return 'up';
  }
  if (e.code === 'ArrowDown' || e.keyCode === 40) {
    return 'down';
  }
  if (e.code === 'ArrowLeft' || e.keyCode === 37) {
    return 'left';
  }
  if (e.code === 'ArrowRight' || e.keyCode === 39) {
    return 'right';
  }
  return null;
}
