# Icons

Celeste ships 3,148 icons as an Iconify collection with the prefix `celeste`.
Names are listed by category in `node_modules/@youcan/celeste/ai/icons.md`.

## Icons are classes, not components

There is no `<Icon>` component. Render an icon by putting its class on an
element — usually `<i>`, which many Celeste components size for you via
`:deep(i)`, so you rarely need sizing classes of your own.

**Correct:**

```vue
<Button>
  <i class="i-celeste-add-line" />
  Add product
</Button>
```

Most icons come in `-line` and `-fill` pairs. Prefer `-line` for actions and
`-fill` for status indicators, matching how Celeste's own components use them.

## Some components take the class as a prop

Nine components — including `CompactButton` (where `icon` is required), `Badge`,
`Tooltip`, `HintText`, and `ModalHeader` — accept an icon class string as a prop
and render the `<i>` themselves:

```vue
<CompactButton icon="i-celeste-close-line" />
```

The literal-string rule below still applies, and applies _here_, at the call
site: the value you pass must be a complete class string written in your source.
Check the registry for whether a given component takes `icon` as a prop or
expects an `<i>` in a slot — they are not interchangeable.

## Never build an icon name at runtime

Icon classes are resolved at build time by UnoCSS scanning source files for
literal class strings. A name assembled at runtime never appears in the source,
so UnoCSS never generates a rule for it. **The element renders with no icon and
no error** — nothing warns you, in dev or in production.

If you have seen this pattern work, it was probably inside Celeste's own repo:
its `uno.config.ts` safelists the entire collection when `NODE_ENV=dev`, so
Storybook resolves any name. Consumer apps have no such safelist, so the same
code that worked in Storybook renders nothing in your app.

**Incorrect:**

```vue
<script setup lang="ts">
const props = defineProps<{ status: 'success' | 'error' }>();
</script>

<template>
  <i :class="`i-celeste-${props.status === 'success' ? 'check' : 'close'}-line`" />
</template>
```

**Correct — map to whole class strings:**

```vue
<script setup lang="ts">
const props = defineProps<{ status: 'success' | 'error' }>();

const ICONS = {
  success: 'i-celeste-checkbox-circle-fill',
  error: 'i-celeste-error-warning-fill',
} as const;
</script>

<template>
  <i :class="ICONS[props.status]" />
</template>
```

The full class string now appears literally in the source, so UnoCSS finds it.
This is the same pattern Celeste uses internally — see `StatusBadge`'s
`ICON_MAP`.

If a dynamic name is genuinely unavoidable, add the possible names to `safelist`
in your `uno.config.ts`.

## Which icons work without UnoCSS

`@youcan/celeste/assets/celeste.css` ships pre-generated rules for the 134 icon
classes Celeste's own components use, including all 87 brand marks. Those work
with no build setup.

**Any other icon requires UnoCSS in your app**, configured with the Celeste
collection — see [setup.md](setup.md). Without it, the class is inert and
nothing renders.

## Finding an icon

```bash
# Search all names
grep -o '`[a-z0-9-]*arrow[a-z0-9-]*`' node_modules/@youcan/celeste/ai/icons.md | sort -u

# Browse a category — arrows, system, media, finance, logos…
grep -A 3 '^## system' node_modules/@youcan/celeste/ai/icons.md
```
