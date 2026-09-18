# Setting Celeste up in an app

## Install

```bash
pnpm add @youcan/celeste @youcan/celeste-tokens @youcan/celeste-icons @unocss/reset
```

`@youcan/celeste-tokens` and `@youcan/celeste-icons` arrive as dependencies of
`@youcan/celeste` anyway, but you import from both directly, so declare them.
Under pnpm's strict layout an undeclared transitive dependency is not reliably
resolvable.

Vue 3.5 or later is required as a peer dependency.

## CSS — all three imports are required

This is the setup mistake that costs the most time. **`celeste.css` uses the
design tokens but does not define them.** It contains no `:root` block and no
token declarations; every rule in it references `var(--color-…)` and friends.
Import it alone and every component renders with undefined custom properties —
no colours, no spacing, no shadows.

**Incorrect:**

```ts
import '@youcan/celeste/assets/celeste.css';
```

**Correct:**

```ts
import '@unocss/reset/tailwind.css';
import '@youcan/celeste-tokens/tokens.css';
import '@youcan/celeste/assets/celeste.css';
```

Order matters. Reset first, then tokens — they define the custom properties the
component styles consume — then the component styles.

## The reset is not optional

Celeste's components are authored against `@unocss/reset/tailwind.css`, the same
reset its Storybook loads (`.storybook/preview.ts`). They rely on what it
guarantees and do not re-declare it:

```css
*,
::before,
::after {
  border-width: 0;
}
button,
[type='button'] {
  background-color: transparent;
}
ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}
```

`celeste.css` contains component rules only — no reset. Without one, native
element defaults show through and the components look broken in ways that read
as missing styles: `SidebarMenu` renders a `<ul>` with bullets and a 40px
indent, `SidebarMenuButton` keeps the grey background and border of a native
`<button>`, and `border-radius` rounds that native border instead of removing
it. Nothing is wrong with the component — it is rendering against a baseline it
was never designed for.

This is a plain CSS file. It needs no UnoCSS build step, no config, and no
plugin, so an app that never adopts UnoCSS still imports it.

## Adding Celeste to an existing app

Most apps are not new. Before importing the reset globally, check what the app
already has:

- **Tailwind or UnoCSS preflight** — nothing to do, the guarantees are already there.
- **`normalize.css`** — not enough. It smooths browser differences and keeps
  element defaults on purpose: no `list-style`, no transparent button
  background, no zeroed border width. Use one of the options below.
- **A hand-written reset** — check it declares the three rules above.
- **Nothing** — use one of the options below.

`@unocss/reset/tailwind.css` is not a drop-in for an app that already has UI.
It sets `border-width: 0` on every element, removes every list marker and
strips every button's background. In a mature app that is a visual migration,
not an install step.

**Adopt it globally**, then re-check existing screens. Cleanest long term, and
the baseline Celeste is developed against.

**Or scope a supplement** to wherever Celeste renders, leaving the rest of the
app untouched:

```css
.celeste-scope :where(ul, ol, menu) {
  margin: 0;
  padding: 0;
  list-style: none;
}

.celeste-scope :where(button, [type='button'], [type='reset'], [type='submit']) {
  border-width: 0;
  background-color: transparent;
}
```

`:where()` holds the specificity at zero so component styles still win.

This covers the failures seen so far, which is a narrower guarantee than the
full preflight. A component may rely on something else it normalises — image
display, heading sizes, fieldset padding, table borders. If one looks wrong
under the scoped supplement, compare it against its story and widen the scope
rather than patching the component.

## Registering components

Either register everything globally:

```ts
import { Celeste } from '@youcan/celeste';
import { createApp } from 'vue';
import App from './app.vue';

createApp(App).use(Celeste).mount('#app');
```

…or import components where they are used, which is preferable in an app that
cares about bundle size:

```vue
<script setup lang="ts">
import { Badge, Button } from '@youcan/celeste';
</script>
```

## Dark mode

Set `data-theme` on an ancestor — usually `<html>`:

- `data-theme="dark"` — always dark
- `data-theme="system"` — follow the OS via `prefers-color-scheme`
- absent — light

Nothing else is needed. The semantic tokens re-theme themselves; see
[tokens.md](tokens.md).

## UnoCSS as a build step, for icons beyond the built-in set

Separate from the reset above, which is just a CSS import. The UnoCSS build is
only needed if you use icons other than the 134 Celeste ships rules for. Add the
Celeste collection to `presetIcons`:

```ts
// uno.config.ts
import icons from '@youcan/celeste-icons/icons.json';
import info from '@youcan/celeste-icons/info.json';
import { defineConfig, presetIcons } from 'unocss';

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        [info.prefix]: () => icons,
      },
      extraProperties: {
        width: '16px',
        height: '16px',
        display: 'inline-block',
      },
    }),
  ],
});
```

Then make sure your build runs the UnoCSS plugin and scans the files where you
write icon classes.

## Verifying the setup

If components render with no colours, spacing or shadows, the token CSS is
missing. If they are coloured but native element chrome shows through — list
bullets, a button's grey fill and border — the reset is missing. If a specific
icon is invisible while others work, it is outside the built-in 134 and UnoCSS
is either absent or not scanning that file — see [icons.md](icons.md).
