<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';

export interface ChartLegendItem {
  key: string;
  name: string;
  color: string;
  value?: string;
  delta?: { value: string; direction: 'up' | 'down' };
}

export interface ChartLegendProps {
  items: ChartLegendItem[];
  variant?: 'inline' | 'chip' | 'table';
  toggle?: boolean;
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<ChartLegendProps>(), {
  variant: 'inline',
  toggle: true,
});

const hidden = defineModel<string[]>({ default: () => [] });

function isHidden(key: string) {
  return hidden.value.includes(key);
}

function onToggle(key: string) {
  hidden.value = isHidden(key)
    ? hidden.value.filter(k => k !== key)
    : [...hidden.value, key];
}
</script>

<template>
  <div :class="clsx('celeste-chart-legend', props.class)" :data-variant="variant">
    <component
      :is="toggle ? 'button' : 'span'"
      v-for="item in items"
      :key="item.key"
      class="celeste-chart-legend-item"
      :type="toggle ? 'button' : undefined"
      :data-hidden="isHidden(item.key) || undefined"
      :aria-pressed="toggle ? !isHidden(item.key) : undefined"
      @click="toggle && onToggle(item.key)"
    >
      <span
        class="celeste-chart-legend-swatch"
        :style="isHidden(item.key) ? undefined : { background: item.color }"
      />
      <span class="celeste-chart-legend-name">{{ item.name }}</span>
      <span v-if="item.value" class="celeste-chart-legend-value">{{ item.value }}</span>
      <span
        v-if="item.delta"
        class="celeste-chart-legend-delta"
        :data-direction="item.delta.direction"
      >{{ item.delta.value }}</span>
    </component>
  </div>
</template>

<style lang="scss" scoped>
.celeste-chart-legend {
  display: flex;
  padding-top: var(--spacing-14);
  border-top: 1px solid var(--color-stroke-soft-200);
  gap: var(--spacing-16);

  .celeste-chart-legend-item {
    display: inline-flex;
    align-items: center;
    padding: 0;
    transition: color var(--animation-fast) ease-out;
    border: none;
    background: none;
    color: var(--color-text-sub-600);
    font: var(--label-xs);
    text-align: start;
    gap: 7px;

    &[data-hidden] {
      color: var(--color-text-disabled-300);
    }
  }

  button.celeste-chart-legend-item {
    cursor: pointer;

    &:hover {
      color: var(--color-text-strong-950);
    }

    &:focus-visible {
      border-radius: var(--radius-4);
      outline: 2px solid var(--color-primary-alpha-24);
      outline-offset: 2px;
    }
  }

  .celeste-chart-legend-swatch {
    flex: none;
    width: 8px;
    height: 8px;
    transition: background var(--animation-fast) ease-out;
    border-radius: 3px;
    background: var(--color-neutral-300);
  }

  .celeste-chart-legend-value,
  .celeste-chart-legend-delta {
    font: var(--label-xs);
    font-family: var(--font-families-display);
    font-variant-numeric: tabular-nums;
  }

  .celeste-chart-legend-value {
    color: var(--color-text-strong-950);
  }

  .celeste-chart-legend-delta {
    width: 56px;
    text-align: end;

    &[data-direction='up'] {
      color: var(--color-state-success-base);
    }

    &[data-direction='down'] {
      color: var(--color-state-error-base);
    }
  }

  &[data-variant='chip'] {
    flex-wrap: wrap;
    gap: var(--spacing-8);

    .celeste-chart-legend-item {
      padding: 5px 11px;
      border: 1px solid var(--color-stroke-soft-200);
      border-radius: var(--radius-full);
      color: var(--color-text-strong-950);

      &[data-hidden] {
        background: var(--color-bg-weak-50);
        color: var(--color-text-disabled-300);
      }
    }
  }

  &[data-variant='table'] {
    flex-direction: column;
    gap: var(--spacing-8);

    .celeste-chart-legend-name {
      flex: 1;
      color: var(--color-text-sub-600);
      font: var(--paragraph-xs);
    }
  }
}
</style>
