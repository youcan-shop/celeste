import { useLocale } from '@/composables/use-locale';

export const CHART_SERIES_COLORS = 8;

export type ChartFormat = (value: number, locale?: string) => string;

const formatters = new Map<string, Intl.NumberFormat>();

function formatter(locale: string | undefined, options: Intl.NumberFormatOptions): Intl.NumberFormat {
  const tag = locale ?? useLocale().value;
  const key = tag + JSON.stringify(options);

  if (!formatters.has(key))
    formatters.set(key, new Intl.NumberFormat(tag, options));

  return formatters.get(key)!;
}

export function chartColor(index: number): string {
  return `var(--vis-color${index % CHART_SERIES_COLORS})`;
}

export function formatNumber(value: number, locale?: string): string {
  return formatter(locale, { maximumFractionDigits: 2 }).format(value);
}

export function formatCompact(value: number, locale?: string): string {
  return formatter(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

export function niceTicks(max: number, count = 4): number[] {
  if (!(max > 0))
    return [0, 1];

  const raw = max / count;
  const base = 10 ** Math.floor(Math.log10(raw));
  const norm = raw / base;
  const step = base * (norm >= 7.07 ? 10 : norm >= 3.16 ? 5 : norm >= 1.41 ? 2 : 1);
  const steps = Math.ceil(max / step);

  return Array.from({ length: steps + 1 }, (_, i) => i * step);
}
