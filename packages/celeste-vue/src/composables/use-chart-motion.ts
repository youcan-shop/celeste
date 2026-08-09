import type { ComputedRef } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { computed } from 'vue';

export const CHART_DURATION = {
  bar: 400,
  update: 300,
  hover: 200,
} as const;

export function useChartMotion(
  duration: keyof typeof CHART_DURATION | number = 'update',
): ComputedRef<number> {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const ms = typeof duration === 'number' ? duration : CHART_DURATION[duration];

  return computed(() => reduced.value ? 0 : ms);
}
