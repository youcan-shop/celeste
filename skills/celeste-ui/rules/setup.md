# Setting Celeste up in an app

## Install

```bash
pnpm add @youcan/celeste @youcan/celeste-tokens @youcan/celeste-icons
```

`@youcan/celeste-tokens` and `@youcan/celeste-icons` arrive as dependencies of
`@youcan/celeste` anyway, but you import from both directly, so declare them.
Under pnpm's strict layout an undeclared transitive dependency is not reliably
resolvable.

Vue 3.5 or later is required as a peer dependency.

## CSS — both imports are required

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
import '@youcan/celeste-tokens/tokens.css';
import '@youcan/celeste/assets/celeste.css';
```

Tokens first: they define the custom properties the component styles consume.

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

## UnoCSS, for icons beyond the built-in set

Only needed if you use icons other than the 134 Celeste ships rules for. Add the
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

If components render but look unstyled, the token CSS is missing. If a specific
icon is invisible while others work, it is outside the built-in 134 and UnoCSS
is either absent or not scanning that file — see [icons.md](icons.md).
