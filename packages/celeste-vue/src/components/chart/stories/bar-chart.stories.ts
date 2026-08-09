import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { onUnmounted } from 'vue';
import { useLocale } from '@/composables/use-locale';
import BarChart from '../bar-chart.vue';
import ChartCard from '../chart-card.vue';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const channels = MONTHS.map((month, i) => ({
  month,
  online: [190, 210, 185, 240, 255, 281, 268, 309, 335, 318, 372, 426][i] * 1000,
  marketplace: [128, 132, 116, 148, 157, 174, 163, 189, 205, 194, 229, 262][i] * 1000,
  wholesale: [41, 38, 52, 44, 61, 58, 72, 66, 81, 77, 94, 102][i] * 1000,
}));

const periods = MONTHS.slice(0, 6).map((month, i) => ({
  month,
  current: [412, 468, 431, 522, 587, 640][i],
  previous: [366, 402, 418, 455, 498, 511][i],
}));

const DAY = 24 * 60 * 60 * 1000;
const START = new Date(2026, 3, 1).getTime();

const sessions = Array.from({ length: 90 }, (_, i) => {
  const day = new Date(START + i * DAY);
  const weekend = [0, 6].includes(day.getDay()) ? 1.24 : 1;
  const base = (210 + i * 1.35) * weekend;
  const wave = Math.abs(Math.sin(i * 1.7)) * 0.6 + 0.72;

  return {
    day: day.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    desktop: Math.round(base * wave),
    mobile: Math.round(base * (wave + 0.14)),
  };
});

const meta: Meta<typeof BarChart> = {
  title: 'Components/Chart/Bar Chart',
  component: BarChart,
  parameters: {
    docs: {
      description: {
        component: `
Bar chart built on \`unovis\`. Two layouts: \`grouped\` compares two periods side by side,
\`stacked\` shows how one total splits up.

\`\`\`vue
<script setup lang="ts">
import { BarChart, formatNumber } from '@youcan/celeste';

const data = [{ month: 'Jan', online: 190000, marketplace: 128000 }];
const series = [
  { key: 'online', name: 'Online store' },
  { key: 'marketplace', name: 'Marketplace' },
];
<\/script>

<template>
  <BarChart :data="data" :series="series" category="month" layout="stacked" />
</template>
\`\`\`

### Props

| Prop | Default | What it does |
| --- | --- | --- |
| \`data\` | required | One row per bar. |
| \`series\` | required | \`{ key, name, color?, muted? }\`. The order is the stack order: the first series sits at the bottom. |
| \`category\` | required | Key that holds the bar label. |
| \`layout\` | \`stacked\` | \`stacked\` or \`grouped\`. |
| \`dense\` | \`false\` | Preset for more than about 40 bars. See the dense story. |
| \`size\` | \`default\` | Plot height: 240px, or 150px for \`compact\`. |
| \`state\` | \`ready\` | \`loading\`, \`empty\` and \`error\` replace the plot and keep the height. |
| \`format\` | \`formatNumber\` | Tooltip and data table values. |
| \`tickFormat\` | \`formatCompact\` | Value axis ticks. |
| \`ticks\` | \`4\` | Gridline count. |
| \`radius\` | \`5\` | Corner radius of the outer bar end. |
| \`legend\` | \`inline\` above one series | \`inline\`, \`chip\`, \`table\` or \`none\`. |
| \`total\` | \`true\` | Total row in the tooltip. |
| \`ariaLabel\` | generated | Overrides the generated description. |
| \`tableVisible\` | \`false\` | Shows the data table that screen readers always get. |

### Prerequisites

Every chart family needs these. They ship with this component:

- **Token layer.** \`chart-plot.vue\` maps \`--chart-1\` … \`--chart-8\` onto existing Celeste
  colors, then bridges them to \`--vis-color0\` … \`--vis-color7\`. Series take a color by index,
  never by meaning: index 1 is brand magenta. Set \`muted: true\` on a series to get
  \`--chart-muted\` instead, which is what a previous period uses.
- **Dark theme.** Flip \`data-theme\`. Nothing in a chart hard-codes a color, so the series step
  one shade lighter and the grid, tooltip and axis text follow the tokens.
- **Number format.** \`formatNumber\` and \`formatCompact\` run through \`Intl.NumberFormat\`.
  The tag comes from \`useLocale()\`, one writable ref for all of Celeste, \`en-US\` by default:
  \`useLocale().value = 'fr-MA'\`. Charts re-render when it changes. Every numeral in a chart is
  InterDisplay with \`tabular-nums\`, so columns of digits line up and still sound like the rest
  of the UI.
- **Axes.** Horizontal gridlines only, no axis spines, no tick marks. Bar charts always start
  the value axis at zero.
- **Tooltip.** \`chartTooltip()\` builds the markup, so a single tooltip and a crosshair tooltip
  can never drift apart. The surface reads the \`--vis-tooltip-*\` bridge.
- **Legend.** Below the plot, behind a hairline, and only when there is more than one series.
  Clicking an item filters that series out and the value axis rescales.
- **Motion.** \`useChartMotion()\` returns 0 milliseconds while the reader asks for reduced
  motion, so the data appears at its final state.
- **Accessibility.** The plot carries \`role="img"\` and a generated \`aria-label\`. A table with
  the same numbers is always in the DOM, hidden until \`tableVisible\`.

        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BarChart>;

export const Stacked: Story = {
  name: 'Stacked',
  parameters: {
    docs: { description: { story: 'One total, split by channel. Segments touch and only the top corners round, so a column reads as one bar.' } },
  },
  args: {
    data: channels,
    category: 'month',
    layout: 'stacked',
    series: [
      { key: 'online', name: 'Online store' },
      { key: 'marketplace', name: 'Marketplace' },
      { key: 'wholesale', name: 'Wholesale' },
    ],
  },
};

export const Grouped: Story = {
  name: 'Grouped',
  parameters: {
    docs: { description: { story: 'Two periods side by side. The previous period is muted, never a second brand color.' } },
  },
  args: {
    data: periods,
    category: 'month',
    layout: 'grouped',
    series: [
      { key: 'current', name: 'This year' },
      { key: 'previous', name: 'Last year', muted: true },
    ],
  },
};

export const SingleSeries: Story = {
  name: 'Single series',
  parameters: {
    docs: { description: { story: 'One series takes brand magenta and drops the legend. In the grouped layout a zero value keeps a 2px stub, so a zero reads differently from missing data.' } },
  },
  args: {
    data: [
      { day: 'Mon', orders: 128 },
      { day: 'Tue', orders: 96 },
      { day: 'Wed', orders: 0 },
      { day: 'Thu', orders: 143 },
      { day: 'Fri', orders: 187 },
      { day: 'Sat', orders: 212 },
      { day: 'Sun', orders: 164 },
    ],
    category: 'day',
    layout: 'grouped',
    series: [{ key: 'orders', name: 'Orders' }],
  },
};

export const Dense: Story = {
  name: 'Dense',
  parameters: {
    docs: { description: { story: 'One bar per day over 90 days. The preset draws a single bar of the total, thins the bars and the labels, and swaps per-bar hover for a crosshair that scans the plot. The tooltip still lists every series.' } },
  },
  args: {
    data: sessions,
    category: 'day',
    dense: true,
    series: [
      { key: 'desktop', name: 'Desktop' },
      { key: 'mobile', name: 'Mobile' },
    ],
  },
};

export const InACard: Story = {
  name: 'In a chart card',
  parameters: {
    docs: { description: { story: 'The framed container. The card owns the title, the KPI, the delta and the toolbar; the chart draws the plot and the legend.' } },
  },
  render: () => ({
    components: { BarChart, ChartCard },
    setup() {
      return {
        data: channels,
        series: [
          { key: 'online', name: 'Online store' },
          { key: 'marketplace', name: 'Marketplace' },
          { key: 'wholesale', name: 'Wholesale' },
        ],
      };
    },
    template: `
      <ChartCard
        title="Revenue"
        value="688,240 MAD"
        caption="vs. previous 12 months"
        :delta="{ value: '14.5%', direction: 'up' }"
      >
        <BarChart :data="data" :series="series" category="month" />
      </ChartCard>
    `,
  }),
};

export const LegendVariants: Story = {
  name: 'Legend variants',
  render: () => ({
    components: { BarChart },
    setup() {
      const series = [
        { key: 'online', name: 'Online store' },
        { key: 'marketplace', name: 'Marketplace' },
        { key: 'wholesale', name: 'Wholesale' },
      ];

      return { data: channels, series, variants: ['inline', 'chip', 'table'] as const };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div v-for="variant in variants" :key="variant">
          <p style="margin-bottom: 12px; font: var(--label-sm);">{{ variant }}</p>
          <BarChart :data="data" :series="series" category="month" :legend="variant" />
        </div>
      </div>
    `,
  }),
};

export const Locale: Story = {
  name: 'Locale',
  parameters: {
    docs: { description: { story: 'Every numeral goes through `Intl.NumberFormat`. Set `useLocale().value` once and all of Celeste follows.' } },
  },
  render: () => ({
    components: { BarChart },
    setup() {
      const locale = useLocale();
      const previous = locale.value;

      locale.value = 'fr-MA';
      onUnmounted(() => locale.value = previous);

      return {
        data: channels,
        series: [
          { key: 'online', name: 'Boutique en ligne' },
          { key: 'marketplace', name: 'Place de marché' },
        ],
      };
    },
    template: `<BarChart :data="data" :series="series" category="month" />`,
  }),
};

export const States: Story = {
  name: 'Loading, empty and error',
  parameters: {
    docs: { description: { story: 'The plot keeps its height in every state, so a dashboard never reflows.' } },
  },
  render: () => ({
    components: { BarChart },
    setup() {
      return {
        data: channels,
        series: [{ key: 'online', name: 'Online store' }],
        states: [
          { state: 'loading' },
          { state: 'empty', title: 'No orders yet', description: 'Your first sale will show up here.' },
          { state: 'error', title: 'Could not load revenue', description: 'Try again in a moment.' },
        ] as const,
      };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
        <BarChart
          v-for="s in states"
          :key="s.state"
          v-bind="s"
          size="compact"
          :data="data"
          :series="series"
          category="month"
        />
      </div>
    `,
  }),
};

export const DataTable: Story = {
  name: 'Data table fallback',
  parameters: {
    docs: { description: { story: 'The same table a screen reader reads, made visible. Wire it to a "View as table" control in the card toolbar.' } },
  },
  args: {
    data: periods,
    category: 'month',
    layout: 'grouped',
    tableVisible: true,
    series: [
      { key: 'current', name: 'This year' },
      { key: 'previous', name: 'Last year', muted: true },
    ],
  },
};
