export interface ChartTooltipRow {
  name: string;
  value: string;
  color?: string;
}

export interface ChartTooltipContent {
  title: string;
  rows: ChartTooltipRow[];
  total?: ChartTooltipRow;
}

function escape(value: string): string {
  return value.replace(/[&<>"]/g, c => `&#${c.charCodeAt(0)};`);
}

function row({ name, value, color }: ChartTooltipRow): string {
  return `
    <div class="celeste-chart-tooltip-row">
      ${color ? `<span class="celeste-chart-tooltip-swatch" style="background:${color}"></span>` : ''}
      <span class="celeste-chart-tooltip-name">${escape(name)}</span>
      <span class="celeste-chart-tooltip-value">${escape(value)}</span>
    </div>
  `;
}

export function chartTooltip({ title, rows, total }: ChartTooltipContent): string {
  return `
    <div class="celeste-chart-tooltip">
      <span class="celeste-chart-tooltip-title">${escape(title)}</span>
      ${rows.map(row).join('')}
      ${total ? `<div class="celeste-chart-tooltip-total">${row(total)}</div>` : ''}
    </div>
  `;
}
