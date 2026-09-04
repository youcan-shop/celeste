# Design tokens

Every visual value in Celeste comes from a token exposed as a CSS custom
property. There are 352 of them, listed in
`node_modules/@youcan/celeste/ai/tokens.md`.

Styling with tokens is not a style preference. Dark mode is implemented _only_
through them: 70 of the 352 are redefined under `[data-theme="dark"]`. A
hard-coded colour is invisible to that mechanism, so it stays light while
everything around it flips.

## Never hard-code a value

**Incorrect:**

```vue
<style scoped>
.card {
  padding: 16px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgb(0 0 0 / 6%);
  color: #5c5c5c;
  font-size: 14px;
}
</style>
```

**Correct:**

```vue
<style scoped>
.card {
  padding: var(--spacing-16);
  border-radius: var(--radius-10);
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-xs);
  color: var(--color-text-sub-600);
  font: var(--label-sm);
}
</style>
```

Note `font:` — typography tokens are font _shorthands_ (`--label-sm`,
`--paragraph-md`, `--subheading-xs`, `--title-h1-title`), not font sizes.
Setting `font-size` from one will not work.

## Prefer semantic over primitive

Colour tokens come in two kinds, and only one of them re-themes.

**Semantic** — carries meaning, changes in dark mode. Seven families:

| Family                   | For                                     |
| ------------------------ | --------------------------------------- |
| `--color-bg-*`           | surfaces                                |
| `--color-text-*`         | text                                    |
| `--color-icon-*`         | icons                                   |
| `--color-stroke-*`       | borders and dividers                    |
| `--color-state-*`        | success, warning, error, away, feature… |
| `--color-illustration-*` | illustrations                           |
| `--color-social-*`       | provider brand colours                  |

**Primitive** — a fixed value on a ramp (`--color-neutral-600`,
`--color-blue-500`, `--color-brand-700`). These never change in dark mode.

**Incorrect:**

```css
color: var(--color-neutral-600);
background-color: var(--color-neutral-0);
border-color: var(--color-neutral-200);
```

**Correct:**

```css
color: var(--color-text-sub-600);
background-color: var(--color-bg-white-0);
border-color: var(--color-stroke-soft-200);
```

Both render identically in light mode. Only the second survives dark mode.

Reach for a primitive only when the colour genuinely must not change — a brand
mark, a fixed illustration fill.

## Never write a dark-mode override

Dark mode is applied by setting `data-theme` on an ancestor: `"dark"` to force
it, `"system"` to follow the OS. The tokens do the rest.

**Incorrect:**

```vue
<style scoped>
.panel {
  background-color: var(--color-bg-white-0);
}

[data-theme='dark'] .panel {
  background-color: #1c1c1c;
}
</style>
```

**Correct:**

```vue
<style scoped>
.panel {
  background-color: var(--color-bg-white-0);
}
</style>
```

`--color-bg-white-0` is already `#ffffff` in light and the dark surface in dark.
Writing the override is both redundant and a second value to keep in sync.

If a semantic token does not exist for what you need, that is a gap in the
design system — raise it rather than hard-coding around it.

## Breakpoints are the one exception

`--breakpoint-sm` through `--breakpoint-2xl` are custom properties like the rest,
but CSS does not read a custom property inside a media condition. Inside a
component, write the literal:

```vue
<style scoped>
@media (width >= 768px) {
  .card {
    padding: var(--spacing-24);
  }
}
</style>
```

`var(--breakpoint-md)` still works anywhere a length is expected, for example
`max-width`. Consumers on SCSS get `$breakpoint-md` from `tokens.scss`, which
sass does resolve in a media condition, and consumers on UnoCSS get the
`md:` / `lt-lg:` / `at-sm:` variants from `presetCeleste`.

## Finding the right token

```bash
# All text colours
grep 'color-text' node_modules/@youcan/celeste/ai/tokens.md

# What's available for spacing
grep -A 30 '^## spacing$' node_modules/@youcan/celeste/ai/tokens.md
```

Semantic tokens are listed under a "Semantic — prefer these" heading in each
category, with their dark-mode value shown alongside.
