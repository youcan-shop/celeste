<script setup lang="ts">
import type { Tooltip } from '@unovis/ts';
import type { ChartLegendItem } from './chart-legend.vue';
import type { ChartTable } from './chart-plot.vue';
import type { ChartFormat } from '@/utils/chart';
import { GroupedBar, Position, StackedBar } from '@unovis/ts';
import { VisAxis, VisCrosshair, VisGroupedBar, VisStackedBar, VisTooltip, VisXYContainer } from '@unovis/vue';
import { useElementSize, useTextDirection } from '@vueuse/core';
import { computed, ref, useTemplateRef, watch } from 'vue';
import { useChartMotion } from '@/composables/use-chart-motion';
import { useLocale } from '@/composables/use-locale';
import { chartColor, formatCompact, formatNumber, niceTicks } from '@/utils/chart';
import ChartLegend from './chart-legend.vue';
import ChartPlot from './chart-plot.vue';
import { chartTooltip } from './chart-tooltip';

export type BarDatum = Record<string, any>;

export interface BarSeries {
  key: string;
  name: string;
  color?: string;
  muted?: boolean;
}

export interface BarChartProps {
  data: BarDatum[];
  series: BarSeries[];
  category: string;
  layout?: 'stacked' | 'grouped';
  dense?: boolean;
  size?: 'default' | 'compact';
  state?: 'ready' | 'loading' | 'empty' | 'error';
  title?: string;
  description?: string;
  format?: ChartFormat;
  tickFormat?: ChartFormat;
  ticks?: number;
  radius?: number;
  legend?: 'inline' | 'chip' | 'table' | 'none';
  total?: boolean;
  totalLabel?: string;
  ariaLabel?: string;
  tableVisible?: boolean;
}

const props = withDefaults(defineProps<BarChartProps>(), {
  layout: 'stacked',
  format: formatNumber,
  tickFormat: formatCompact,
  ticks: 4,
  radius: 5,
  total: true,
  totalLabel: 'Total',
});
const CATEGORY_PADDING = 0.4;
const DENSE_PADDING = 0.32;
const DENSE_TICKS = 3;
const DENSE_LABELS = 7;
const TOOLTIP_MAX_WIDTH = 280;
const TOOLTIP_GAP = 8;
const MARGIN = { top: 16 };
const EPSILON = 1e-6;

const hidden = ref<string[]>([]);
const hovered = ref<number>();
const band = ref({ left: 0, width: 0, height: 0 });
const bandEl = useTemplateRef<HTMLElement>('bandEl');
const tip = useTemplateRef<{ component: Tooltip }>('tip');
const duration = useChartMotion('bar');
const locale = useLocale();
const direction = useTextDirection({ observe: true });

const plotEl = computed(() => bandEl.value?.parentElement ?? null);
const { width: plotWidth } = useElementSize(plotEl);

const rtl = computed(() => direction.value === 'rtl');
const rows = computed(() => rtl.value ? [...props.data].reverse() : props.data);
const visible = computed(() => props.series.filter(s => !hidden.value.includes(s.key)));
const legendVariant = computed(() => props.legend
  ?? (props.series.length > 1 && !props.dense ? 'inline' : 'none'));
const stacked = computed(() => props.dense || props.layout === 'stacked');
const bars = computed(() => stacked.value ? StackedBar : GroupedBar);
const barSelector = computed(() => bars.value.selectors.bar);

const colors = computed(() => new Map(
  props.series.map((s, i) => [s.key, s.color ?? (s.muted ? 'var(--chart-muted)' : chartColor(i))]),
));

function x(_: BarDatum, i: number) {
  return i;
}

function label(d: BarDatum) {
  return String(d[props.category]);
}

function valueOf(d: BarDatum, key: string) {
  return Number(d[key]) || 0;
}

function totalOf(d: BarDatum) {
  return visible.value.reduce((sum, s) => sum + valueOf(d, s.key), 0);
}

function row(d: BarDatum) {
  return d.datum ?? d;
}

function isHidden(d: BarDatum, i: number) {
  return hidden.value.includes(props.series[d.stackIndex ?? i % props.series.length].key);
}

const formatValue = computed(() => (v: number) => props.format(v, locale.value));
const formatTick = computed(() => (v: number) => props.tickFormat(v, locale.value));

const y = computed(() => props.dense
  ? [(d: BarDatum) => totalOf(d) || EPSILON]
  : props.series.map(s => hidden.value.includes(s.key)
      ? () => EPSILON
      : (d: BarDatum) => valueOf(d, s.key) || EPSILON));

const color = computed(() => {
  const map = colors.value;

  if (props.dense)
    return () => chartColor(0);

  return (d: BarDatum, i: number) => {
    const { key } = props.series[i];

    return d[key] ? map.get(key)! : 'var(--chart-zero)';
  };
});

const barWidth = computed(() => plotWidth.value / Math.max(rows.value.length, 1) * (1 - DENSE_PADDING));
const radius = computed(() => {
  if (!props.dense)
    return props.radius;

  if (barWidth.value < 4)
    return 0;

  return barWidth.value < 6 ? 1 : Math.min(2, props.radius);
});

const categoryTicks = computed(() => {
  const stride = props.dense ? Math.ceil(rows.value.length / DENSE_LABELS) : 1;

  return rows.value.map((_, i) => i).filter(i => i % stride === 0);
});

const peak = computed(() => Math.max(0, ...rows.value.map(d => props.layout === 'stacked'
  ? totalOf(d)
  : Math.max(...visible.value.map(s => valueOf(d, s.key))))));

const tickValues = computed(() => niceTicks(peak.value, props.dense ? DENSE_TICKS : props.ticks));
const valueDomain = computed<[number, number]>(() => [0, tickValues.value[tickValues.value.length - 1]]);

const legendItems = computed<ChartLegendItem[]>(() => props.series.map(s => ({
  key: s.key,
  name: s.name,
  color: colors.value.get(s.key)!,
  value: legendVariant.value === 'table'
    ? formatValue.value(props.data.reduce((sum, d) => sum + valueOf(d, s.key), 0))
    : undefined,
})));

const table = computed<ChartTable>(() => ({
  head: [props.category, ...props.series.map(s => s.name)],
  rows: props.data.map(d => [label(d), ...props.series.map(s => formatValue.value(valueOf(d, s.key)))]),
}));

const ariaLabel = computed(() => props.ariaLabel ?? [
  `${props.layout} bar chart of`,
  props.series.map(s => s.name).join(', '),
  `by ${props.category}, ${props.data.length} bars,`,
  `from ${label(props.data[0])} to ${label(props.data[props.data.length - 1])}`,
].join(' '));

function tooltipFor(d: BarDatum) {
  return chartTooltip({
    title: label(row(d)),
    rows: visible.value.map(s => ({
      name: s.name,
      value: formatValue.value(valueOf(row(d), s.key)),
      color: colors.value.get(s.key),
    })),
    total: props.total && visible.value.length > 1
      ? { name: props.totalLabel, value: formatValue.value(totalOf(row(d))) }
      : undefined,
  });
}

const triggers = computed(() => props.dense ? {} : { [barSelector.value]: tooltipFor });

function onEnter(d: BarDatum & { index?: number }, event: MouseEvent) {
  hovered.value = d.index ?? rows.value.indexOf(d);

  const bar = event.target as Element;
  const group = bar.parentElement!.getBoundingClientRect();
  const host = bandEl.value!.parentElement!.getBoundingClientRect();
  const pad = group.width * CATEGORY_PADDING / (1 - CATEGORY_PADDING) / 2;

  band.value = {
    left: group.left - host.left - pad,
    width: group.width + pad * 2,
    height: group.bottom - host.top,
  };

  const tooltip = tip.value?.component;
  const width = tooltip?.element.offsetWidth || TOOLTIP_MAX_WIDTH;
  const fits = host.right - bar.getBoundingClientRect().right > width + TOOLTIP_GAP;

  tooltip?.overrideHorizontalPlacement(fits ? Position.Right : Position.Left);
}

const events = computed(() => props.dense
  ? {}
  : {
      [barSelector.value]: {
        mouseover: onEnter,
        mouseleave: () => hovered.value = undefined,
      },
    });

watch(hovered, (i) => {
  if (!props.dense)
    return;

  plotEl.value?.querySelectorAll('[data-bar]')
    .forEach((el, k) => el.toggleAttribute('data-dim', i !== undefined && k !== i));
});

const attributes = computed(() => ({
  [barSelector.value]: {
    'data-bar': true,
    ...(!stacked.value && { 'data-hidden': isHidden }),
  },
  ...(stacked.value && { [StackedBar.selectors.barGroup]: { 'data-bar-group': true } }),
}));
</script>

<template>
  <ChartPlot
    class="celeste-bar-chart"
    v-bind="{ ariaLabel }"
    :size="size"
    :state="state"
    :title="title"
    :description="description"
    :table="table"
    :table-visible="tableVisible"
    :data-hovering="(!dense && hovered !== undefined) || undefined"
    :style="{ '--chart-bar-radius': `${radius}px` }"
  >
    <div
      ref="bandEl"
      class="celeste-bar-chart-band"
      :style="{ left: `${band.left}px`, width: `${band.width}px`, height: `${band.height}px` }"
    />

    <VisXYContainer
      :data="rows"
      :duration="duration"
      :y-domain="valueDomain"
      :margin="MARGIN"
      height="100%"
    >
      <VisStackedBar
        v-if="stacked"
        :x="x"
        :y="y"
        :color="color"
        :rounded-corners="dense ? radius : false"
        :bar-padding="dense ? DENSE_PADDING : CATEGORY_PADDING"
        :events="events"
        :attributes="attributes"
      />
      <VisGroupedBar
        v-else
        :x="x"
        :y="y"
        :color="color"
        :rounded-corners="radius"
        :group-padding="CATEGORY_PADDING"
        :bar-padding="0.1"
        :bar-min-height="2"
        :events="events"
        :attributes="attributes"
      />

      <VisAxis
        type="x"
        :grid-line="false"
        :tick-line="false"
        :domain-line="false"
        :tick-values="categoryTicks"
        :tick-format="(i: number) => label(rows[i])"
        :tick-text-hide-overlapping="true"
      />
      <VisAxis
        type="y"
        :position="rtl ? Position.Right : Position.Left"
        :tick-line="false"
        :domain-line="false"
        :tick-values="tickValues"
        :tick-format="formatTick"
      />

      <!-- eslint-disable vue/attribute-hyphenation VisCrosshair declares no props, so kebab keys never reach its config -->
      <VisCrosshair
        v-if="dense"
        :x="x"
        :y="y"
        :template="tooltipFor"
        :getCircles="() => []"
        :onCrosshairMove="(_: unknown, __: unknown, i?: number) => hovered = i"
      />

      <VisTooltip
        ref="tip"
        :triggers="triggers"
        :follow-cursor="false"
        :vertical-placement="dense ? Position.Top : Position.Center"
        :horizontal-shift="TOOLTIP_GAP"
        :class-name="dense ? 'celeste-bar-chart-tip-dense' : undefined"
      />
    </VisXYContainer>

    <template #footer>
      <ChartLegend
        v-if="legendVariant !== 'none'"
        v-model="hidden"
        :items="legendItems"
        :variant="legendVariant"
      />
    </template>
  </ChartPlot>
</template>

<style lang="scss">
.celeste-bar-chart {
  .celeste-bar-chart-band {
    position: absolute;
    top: 0;
    opacity: 0;
    background: var(--chart-track);
  }

  &[data-hovering] .celeste-bar-chart-band {
    opacity: 1;
  }

  .celeste-bar-chart-tip-dense .celeste-chart-tooltip {
    width: 168px;
    min-width: 0;
  }

  [data-bar][data-dim] {
    transition: opacity var(--animation-fast) ease-out;
    opacity: 0.4;
  }

  [data-bar-group] {
    clip-path: inset(0 round var(--chart-bar-radius) var(--chart-bar-radius) 0 0);
  }

  &[data-hovering] [data-bar] {
    transition: opacity var(--animation-fast) ease-out;
    opacity: 0.4;
  }

  &[data-hovering] g:hover > [data-bar] {
    opacity: 1;
  }

  [data-bar][data-hidden='true'] {
    transition: opacity var(--animation-fast) ease-out;
    opacity: 0;
  }
}
</style>
