---
name: celeste-ui
description: "Build UI with Celeste, YouCan's design system for Vue 3. Use when writing or reviewing components in an app that depends on @youcan/celeste — choosing a component, styling with design tokens, adding icons, or setting the library up. Keywords: Celeste, @youcan/celeste, celeste-tokens, celeste-icons, YouCan design system."
---

# Celeste UI

Celeste is YouCan's design system: 147 Vue 3 components, 352 design tokens, and
3,148 icons. This skill covers building product UI **with** Celeste, not
contributing to the Celeste repo.

## This app

!`node ${CLAUDE_SKILL_DIR}/scripts/context.mjs`

✓ lines are already in place — do not redo them. If you see a command above
instead of results, run `node scripts/context.mjs` yourself.

## Look up the API before writing

Do not guess props, and do not rely on memory of other design systems. **An
invented prop compiles cleanly and does nothing** — Vue passes unknown props
through to the DOM as attributes, so TypeScript never complains.

```bash
node scripts/search.mjs date                        # which component?
node scripts/component.mjs Table TableRow Select    # what it accepts, and how its parts nest
node scripts/component.mjs toast useSidebar         # exported helpers work the same way
node scripts/token.mjs color-text                   # a token not listed below?
node scripts/icon.mjs arrow                         # which icon name?
```

Paths are relative to this skill's directory. Ask `component.mjs` for every
component you plan to use **in one call**.

For compound components, `component.mjs` prints a **usage** example showing how
the parts nest. That is the nesting reference: read a full story only when you
need a variant the usage does not show, and read component source only to
answer one specific question. Never read or grep the JSON in
`@youcan/celeste/ai/` or the `dist/` types — the scripts return the same facts,
smaller.

## Rules

These are enforced. The linked files hold longer examples for edge cases; you
do not need to read them to follow the rules below.

**Tokens** — [rules/tokens.md](rules/tokens.md)

- Never hard-code a colour, spacing, radius, shadow or font. Use `var(--…)`. Border widths have no token; `1px` is fine.
- Prefer semantic tokens (`--color-bg-*`, `--color-text-*`, `--color-icon-*`, `--color-stroke-*`, `--color-state-*`) over primitives like `--color-neutral-600`. Only semantic tokens re-theme.
- Typography tokens are font shorthands: `font: var(--label-sm)`, never `font-size`.
- Never write a dark-mode override. `data-theme="dark"` or `"system"` on `<html>` is all dark mode needs.
- Media queries are the one exception: CSS cannot read a custom property there, so write `@media (width >= 768px)`.

**Components** — [rules/components.md](rules/components.md)

- Never hand-roll a control Celeste has. See the table below.
- Use `variant`, `intent`, `size` and `state` props before `class`. `class` is for layout, not restyling.
- `Table` is markup only: sorting, filtering and selection are your code. `Pagination` owns page state via `v-model:page`.

**Icons** — [rules/icons.md](rules/icons.md)

- Icons are classes, not components: `<i class="i-celeste-add-line" />`. Find names with `icon.mjs`.
- Components that show `icon: string` in `component.mjs` (`CompactButton`, `Badge`, `ModalHeader`, `HintText`, `Tooltip`…) take the class as a prop instead.
- Never build an icon name at runtime (`` `i-celeste-${name}` ``). It renders nothing, with no error. Map values to whole class strings.
- Icons beyond the 134 Celeste's own components use need UnoCSS with the Celeste collection. "This app" above says whether it is set up.

**Setup** — every ✗ line in "This app" above comes with its exact fix. Apply
those; [rules/setup.md](rules/setup.md) explains why each step is needed.

## Key patterns

```vue
<script setup lang="ts">
import { Button, CompactButton, StatusBadge, toast } from '@youcan/celeste';

const props = defineProps<{ status: 'paid' | 'failed' }>();

// Whole class strings, so UnoCSS finds them in the source.
const STATUS_ICON = {
  paid: 'i-celeste-checkbox-circle-fill',
  failed: 'i-celeste-error-warning-fill',
} as const;

function save() {
  toast.success('Changes saved', { description: 'Your store is up to date.' });
}
</script>

<template>
  <section class="panel">
    <i :class="STATUS_ICON[props.status]" />
    <StatusBadge state="success" label="Paid" />
    <CompactButton icon="i-celeste-more-2-line" variant="ghost" />
    <Button intent="primary" @click="save">
      <i class="i-celeste-save-line" />
      Save
    </Button>
  </section>
</template>

<style scoped>
.panel {
  display: flex;
  gap: var(--spacing-12);
  padding: var(--spacing-16);
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-12);
  background: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-xs);
  color: var(--color-text-sub-600);
  font: var(--paragraph-sm);
}
</style>
```

## Tokens you will need

Semantic colours re-theme in dark mode; use these before reaching for
`token.mjs`.

<!-- generated:tokens -->

- **Text:** `--color-text-{strong-950, sub-600, soft-400, disabled-300, white-0}`
- **Background:** `--color-bg-{strong-950, surface-800, sub-300, soft-200, weak-50, white-0}`
- **Border:** `--color-stroke-{strong-950, sub-300, soft-200, white-0}`
- **Icon:** `--color-icon-{strong-950, sub-600, soft-400, disabled-300, white-0}`
- **State:** `--color-state-<state>-<shade>` — away, error, highlighted, stable, success, verified, warning: base, dark, light, lighter · faded, feature, information: dark, light, lighter
- **Spacing:** `--spacing-{0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48}`
- **Radius:** `--radius-{4, 6, 8, 10, 12, 16, 20, 24, full}`
- **Shadow:** `--shadow-{regular-md, regular-xs}`
- **Type,** with `font:` — `--title-{h1-title, h2-title, h3-title, h4-title, h5-title, h6-title}` · `--label-{lg, md, sm, xl, xs}` · `--paragraph-{lg, md, sm, xl, xs}` · `--subheading-{md, sm, xs, xxs}`

<!-- /generated:tokens -->

## Choosing a component

- **Action:** `Button` by default · `FancyButton` for the page's one main CTA · `CompactButton` icon-only · `LinkButton` inline
- **Text input:** `TextInput` (+ `TextInputAffix` for prefixes/suffixes) · `Textarea` · `CounterInput` · `DigitInput`
- **Choice:** `Select` · `Combobox` (searchable) · `RadioGroup` / `RadioGroupCard` · `Checkbox` / `CheckboxCard` · `Switch` · `SegmentedControl` (2–5 options)
- **Date:** `DatePicker` · `RangePicker` · `Calendar` · `RangeCalendar` — values are `@internationalized/date` types
- **Other input:** `ColorPicker` · `Slider` · `FileUploadArea` · `RichEditor`
- **Form field:** `Label` (text goes in its slot) · `HintText` for help and error text · `hasError` on the input
- **Status:** `StatusBadge` for a state — it draws its own icon from `state` and has no `information` state · `Badge` for a category; its `icon` shows only with `type="leading-icon"` or `"trailing-icon"` · `Tag` when removable · `Alert` for a callout · `ProgressBar` / `ProgressCircle`
- **Overlay:** `Modal` (dialog) · `Sheet` (side drawer) · `Popover` · `Tooltip` · `DropdownMenu`
- **Navigation, layout:** `Sidebar` · `TabMenu` · `Pagination` · `Collapsible` · `ScrollArea` · `ContentDivider`
- **Data:** `Table` · `BarChart` in a `ChartCard`
- **Feedback:** `toast()` with `<Sonner />` mounted

**Not in Celeste:** Avatar, Card, Breadcrumb, Skeleton, Spinner, empty state.
Build these from plain elements styled with tokens. Do not import them from
`@youcan/celeste` — the import fails.
