<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

export interface ChartTable {
  head: string[];
  rows: (string | number)[][];
}

export interface ChartPlotProps {
  ariaLabel: string;
  state?: 'ready' | 'loading' | 'empty' | 'error';
  size?: 'default' | 'compact' | 'spark';
  table?: ChartTable;
  tableVisible?: boolean;
  title?: string;
  description?: string;
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<ChartPlotProps>(), {
  state: 'ready',
  size: 'default',
});
</script>

<template>
  <div :class="clsx('celeste-chart', props.class)">
    <div
      class="celeste-chart-plot"
      :data-size="size"
      :data-state="state"
      role="img"
      :aria-label="ariaLabel"
    >
      <slot v-if="state === 'ready'" />

      <div v-else-if="state === 'loading'" class="celeste-chart-skeleton" />

      <div v-else class="celeste-chart-message">
        <i
          :class="state === 'error' ? 'i-celeste-error-warning-fill' : 'i-celeste-bar-chart-2-line'"
          class="celeste-chart-message-icon"
        />
        <span v-if="title" class="celeste-chart-message-title">{{ title }}</span>
        <span v-if="description" class="celeste-chart-message-description">{{ description }}</span>
        <slot name="action" />
      </div>
    </div>

    <slot name="footer" />

    <table
      v-if="table"
      class="celeste-chart-table"
      :data-visible="tableVisible || undefined"
    >
      <caption>{{ ariaLabel }}</caption>
      <thead>
        <tr>
          <th
            v-for="head in table.head"
            :key="head"
            scope="col"
          >
            {{ head }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in table.rows" :key="i">
          <th scope="row">
            {{ row[0] }}
          </th>
          <td v-for="(cell, j) in row.slice(1)" :key="j">
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
/* Not scoped: unovis renders its plot, axes and tooltip outside the template. */
@mixin vis($name, $value) {
  --vis-#{$name}: #{$value};
  --vis-dark-#{$name}: #{$value};
}

.celeste-chart {
  --chart-1: var(--color-primary-base);
  --chart-2: var(--color-blue-500);
  --chart-3: var(--color-teal-500);
  --chart-4: var(--color-purple-500);
  --chart-5: var(--color-orange-500);
  --chart-6: var(--color-sky-500);
  --chart-7: var(--color-green-500);
  --chart-8: var(--color-yellow-500);
  --chart-muted: var(--color-neutral-200);
  --chart-zero: var(--color-stroke-soft-200);
  --chart-grid: var(--color-stroke-soft-200);
  --chart-axis-text: var(--color-text-sub-600);
  --chart-crosshair: var(--color-stroke-sub-300);
  --chart-track: var(--color-bg-weak-50);
  --chart-plot-h: 240px;

  display: flex;
  flex-direction: column;
  font-variant-numeric: tabular-nums;
  gap: var(--spacing-12);

  @include vis(color0, var(--chart-1));
  @include vis(color1, var(--chart-2));
  @include vis(color2, var(--chart-3));
  @include vis(color3, var(--chart-4));
  @include vis(color4, var(--chart-5));
  @include vis(color5, var(--chart-6));
  @include vis(color6, var(--chart-7));
  @include vis(color7, var(--chart-8));
  @include vis(axis-grid-color, var(--chart-grid));
  @include vis(axis-tick-color, var(--chart-grid));
  @include vis(axis-tick-label-color, var(--chart-axis-text));
  @include vis(axis-label-color, var(--chart-axis-text));
  @include vis(tooltip-background-color, var(--color-bg-white-0));
  @include vis(tooltip-border-color, var(--color-stroke-soft-200));
  @include vis(tooltip-text-color, var(--color-text-strong-950));

  --vis-font-family: var(--font-families-sans);
  --vis-axis-font-family: var(--font-families-display);
  --vis-axis-tick-label-font-size: 11px;
  --vis-axis-tick-label-weight: 400;
  --vis-crosshair-line-stroke-color: var(--chart-crosshair);
  --vis-tooltip-border-radius: var(--radius-12);
  --vis-tooltip-box-shadow: var(--shadow-regular-md);
  --vis-tooltip-padding: 10px 12px;
  --vis-tooltip-transition-duration: 100ms;
  --vis-stacked-bar-stroke-width: 1px;
  --vis-stacked-bar-stroke-color: none;
  --vis-dark-stacked-bar-stroke-color: var(--color-bg-white-0);
}

.celeste-chart-plot {
  position: relative;
  height: var(--chart-plot-h);

  > [data-vis-xy-container] {
    height: 100%;
  }

  &[data-size='compact'] {
    --chart-plot-h: 150px;
  }

  &[data-size='spark'] {
    --chart-plot-h: 44px;
  }
}

.celeste-chart-skeleton {
  width: 100%;
  height: 100%;
  animation: celeste-chart-shimmer 1.4s linear infinite;
  border-radius: var(--radius-10);
  background: linear-gradient(
    90deg,
    var(--color-bg-weak-50) 0%,
    var(--color-bg-soft-200) 40%,
    var(--color-bg-weak-50) 80%
  );
  background-size: 320px 100%;
}

@keyframes celeste-chart-shimmer {
  from {
    background-position: -320px 0;
  }

  to {
    background-position: 320px 0;
  }
}

.celeste-chart-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 var(--spacing-20);
  border-radius: var(--radius-10);
  background: var(--color-bg-weak-50);
  gap: var(--spacing-8);
  text-align: center;

  .celeste-chart-message-icon {
    width: 22px;
    height: 22px;
    color: var(--color-illustration-strong-400);
  }

  .celeste-chart-message-title {
    color: var(--color-text-strong-950);
    font: var(--label-sm);
  }

  .celeste-chart-message-description {
    color: var(--color-text-sub-600);
    font: var(--paragraph-xs);
  }
}

.celeste-chart-plot[data-state='error'] .celeste-chart-message {
  background: var(--color-state-error-lighter);

  .celeste-chart-message-icon {
    color: var(--color-state-error-base);
  }
}

.celeste-chart-table {
  width: 100%;
  border-collapse: collapse;
  font: var(--paragraph-xs);

  &:not([data-visible]) {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    white-space: nowrap;
    clip-path: inset(50%);
  }

  caption {
    margin-bottom: var(--spacing-8);
    color: var(--color-text-sub-600);
    font: var(--paragraph-xs);
    text-align: start;
  }

  th,
  td {
    padding: var(--spacing-6) var(--spacing-8);
    border-bottom: 1px solid var(--color-stroke-soft-200);
    text-align: start;
  }

  thead th {
    color: var(--color-text-soft-400);
    font: var(--subheading-xxs);
    text-transform: uppercase;
  }

  tbody th {
    color: var(--color-text-sub-600);
    font: var(--paragraph-xs);
    font-weight: 400;
  }

  td {
    color: var(--color-text-strong-950);
    font: var(--label-xs);
    font-family: var(--font-families-display);
    font-variant-numeric: tabular-nums;
    text-align: end;
  }
}

.celeste-chart-tooltip {
  display: flex;
  flex-direction: column;
  min-width: 150px;
  max-width: 280px;
  gap: var(--spacing-8);

  .celeste-chart-tooltip-title {
    color: var(--color-text-soft-400);
    font: var(--subheading-xxs);
    letter-spacing: 0.22px;
    text-transform: uppercase;
  }

  .celeste-chart-tooltip-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-8);
  }

  .celeste-chart-tooltip-swatch {
    flex: none;
    width: 8px;
    height: 8px;
    border-radius: 3px;
  }

  .celeste-chart-tooltip-name {
    flex: 1;
    overflow: hidden;
    color: var(--color-text-sub-600);
    font: var(--paragraph-xs);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .celeste-chart-tooltip-value {
    color: var(--color-text-strong-950);
    font: var(--label-xs);
    font-family: var(--font-families-display);
    font-variant-numeric: tabular-nums;
  }

  .celeste-chart-tooltip-total {
    padding-top: 7px;
    border-top: 1px solid var(--color-stroke-soft-200);
  }
}

@mixin dark-series {
  --chart-1: var(--color-brand-400);
  --chart-2: var(--color-blue-400);
  --chart-3: var(--color-teal-400);
  --chart-4: var(--color-purple-400);
  --chart-5: var(--color-orange-400);
  --chart-6: var(--color-sky-400);
  --chart-7: var(--color-green-400);
  --chart-8: var(--color-yellow-400);
  --chart-muted: var(--color-neutral-600);

  /* unovis maps its own dark vars onto `html`, not onto the chart, so set this one here. */
  --vis-stacked-bar-stroke-color: var(--color-bg-white-0);
}

[data-theme='dark'] .celeste-chart {
  @include dark-series;
}

@media (prefers-color-scheme: dark) {
  [data-theme='system'] .celeste-chart {
    @include dark-series;
  }
}

@media (prefers-reduced-motion: reduce) {
  .celeste-chart-skeleton {
    animation: none;
  }
}
</style>
