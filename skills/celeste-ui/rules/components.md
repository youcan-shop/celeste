# Choosing a component

The registry (`ai/component-registry.md`, shipped inside `@youcan/celeste`) is
generated from source and describes **what every component accepts** — props,
their types and defaults, events, slots, and what each component composes with.
Check it before writing any UI.

This file covers what the registry deliberately does not: **which component to
reach for** when several have near-identical signatures. That is a judgement
call, not a fact about the API, so it lives here.

## Never hand-roll a control that exists

Celeste exports 146 components. Before writing a styled `<div>`, a custom
`<button>`, or a bespoke dropdown, look it up. A hand-rolled control loses
keyboard handling, focus management, and dark mode.

## Compound components: read the story for nesting

Around twenty components are compound — `Table`, `Select`, `Modal`, `Sidebar`,
`DropdownMenu`, `Combobox`, `TabMenu`, `Pagination`, and others ship as a parent
plus a set of parts.

The registry lists those parts under **Composes with**, but that field is just
"everything else in this folder" — it carries **no nesting order**. It will not
tell you that `TableRow` goes inside `TableBody`, or `TableCell` inside
`TableRow`. Do not guess the shape from part names.

Instead read the worked example. Every compound component has one, and the
registry gives its path in the **Example** field:

```
**Example:** `src/components/table/stories/table.stories.ts`
```

That path resolves inside the installed package:

```bash
cat node_modules/@youcan/celeste/src/components/table/stories/table.stories.ts
```

A story is a few KB and shows real nesting, so it is cheaper and more reliable
than reading the component sources one by one.

## Some components carry state, others are markup only

Nothing in a type signature tells you which, and guessing wrong wastes a search
for props that do not exist.

| Component    | Behaviour                                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Table`      | **Presentational only.** No sorting, filtering, or selection. Every part takes `class` plus a slot. Bring your own table state — Celeste renders the markup. |
| `Pagination` | **Stateful.** Owns the current page via `v-model:page`, given `total` and `itemsPerPage`. Do not hand-roll page controls.                                    |

So a sortable, paginated table is Celeste's `Table` markup driven by your own
sorting logic, with `Pagination` handling page state, and `TableEmpty` for the
empty case.

## Buttons

Five components with overlapping props. The types cannot tell you which to use.

| Use             | When                                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `Button`        | Any standard action. The default — start here.                                                                            |
| `FancyButton`   | The single primary call to action on a page. Using more than one defeats the emphasis.                                    |
| `CompactButton` | Dense UI such as toolbars and table rows. Icon-only: takes a required `icon` class string as a **prop**, and has no slot. |
| `LinkButton`    | The action reads as a link but is not navigation. Inline text, no chrome.                                                 |
| `SocialButton`  | OAuth providers. Renders the provider mark from `brand` — do not pass an icon.                                            |

## Badges

| Use           | When                                                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `Badge`       | A static label for a category. Not interactive.                                                                                             |
| `StatusBadge` | The value represents a **state**. Also selects its icon automatically from `state`.                                                         |
| `Tag`         | The user can remove the value — set `dismissable` and handle `@dismiss`. Takes its content as a slot, where the badges take a `label` prop. |

## Prefer built-in props over `class`

Every component exposes `variant`, `intent`, and `size` props that resolve to
tokens. Reach for those before overriding anything through `class`. The `class`
prop is for layout — placement, width, margin — not for restyling a component's
colours or typography.
