<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import Badge from '../badge/badge.vue';

export interface ChartCardProps {
  title: string;
  value?: string;
  caption?: string;
  delta?: { value: string; direction: 'up' | 'down' };
  class?: HTMLAttributes['class'];
}

const props = defineProps<ChartCardProps>();
</script>

<template>
  <section :class="clsx('celeste-chart-card', props.class)">
    <header class="celeste-chart-card-header">
      <div class="celeste-chart-card-heading">
        <span class="celeste-chart-card-title">{{ title }}</span>
        <div v-if="value" class="celeste-chart-card-kpi">
          <span class="celeste-chart-card-value">{{ value }}</span>
          <Badge
            v-if="delta"
            type="leading-icon"
            variant="lighter"
            size="sm"
            :state="delta.direction === 'up' ? 'success' : 'error'"
            :icon="`i-celeste-arrow-${delta.direction}-line`"
            :label="delta.value"
          />
        </div>
        <span v-if="caption" class="celeste-chart-card-caption">{{ caption }}</span>
      </div>

      <div v-if="$slots.toolbar" class="celeste-chart-card-toolbar">
        <slot name="toolbar" />
      </div>
    </header>

    <slot />
  </section>
</template>

<style lang="scss" scoped>
.celeste-chart-card {
  display: flex;
  flex-direction: column;
  min-width: 320px;
  padding: var(--spacing-20);
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-16);
  background: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-xs);
  gap: var(--spacing-16);

  .celeste-chart-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--spacing-20);
  }

  .celeste-chart-card-heading {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-6);
  }

  .celeste-chart-card-title {
    color: var(--color-text-strong-950);
    font: var(--label-sm);
  }

  .celeste-chart-card-kpi {
    display: flex;
    align-items: baseline;
    gap: var(--spacing-10);
  }

  .celeste-chart-card-value {
    color: var(--color-text-strong-950);
    font: var(--title-h4-title);
    font-variant-numeric: tabular-nums;
  }

  .celeste-chart-card-caption {
    color: var(--color-text-soft-400);
    font: var(--paragraph-xs);
  }

  .celeste-chart-card-toolbar {
    display: flex;
    align-items: center;
    gap: var(--spacing-8);
  }
}
</style>
