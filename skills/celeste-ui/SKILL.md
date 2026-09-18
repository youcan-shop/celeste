---
name: celeste-ui
description: "Build UI with Celeste, YouCan's design system for Vue 3. Use when writing or reviewing components in an app that depends on @youcan/celeste — choosing a component, styling with design tokens, adding icons, or setting the library up. Keywords: Celeste, @youcan/celeste, celeste-tokens, celeste-icons, YouCan design system."
---

# Celeste UI

Celeste is YouCan's design system: 147 Vue 3 components, 352 design tokens, and
3,148 icons. This skill covers building product UI **with** Celeste. It does not
cover contributing to the Celeste repo itself.

## Look up the API before writing

The component API is generated from source and ships inside the package, so it
always matches the installed version. Do not guess props, and do not rely on
memory of other design systems — Celeste's `Button` is not shadcn's.

**TypeScript will not catch an invented prop.** Vue passes anything it does not
recognise through to the DOM as an attribute, so `<StatusBadge icon="…" />`
compiles cleanly, renders no icon, and reports nothing. Looking the component up is the only way to know a prop exists.

Four scripts answer every lookup. Each reads the JSON index inside the installed
package and prints only what was asked for.

```bash
# Which component should I use?
node scripts/search.mjs date

# What does it accept?
node scripts/component.mjs DatePicker
node scripts/component.mjs Table TableBody TableRow   # several at once

# Which token is the muted text colour?
node scripts/token.mjs text

# What is the icon called?
node scripts/icon.mjs arrow
```

Paths are relative to this skill's directory; prefix them when running from the
project root. The scripts locate `@youcan/celeste` by walking up from the cwd.

**Never grep the `ai/*.md` files instead.** They are written for a human, and put
a whole icon category on one line — a grep for one name returns hundreds.

`component.mjs` suggests the closest real name when given one that does not
exist, so a guessed name fails loudly instead of reaching the page. `--json` on
any script gives the raw entries.

If a script reports the index is missing, the app is on a Celeste version that
predates it. Fall back to the type definitions in `node_modules/@youcan/celeste/dist/`.

**Celeste ships its own source and stories too.** `component.mjs` prints the path
to a worked example:

```
example: src/components/table/stories/table.stories.ts
```

Read it at
`node_modules/@youcan/celeste/src/components/table/stories/table.stories.ts`.

Reach for the story whenever you need to see a component **used** rather than
described — above all for compound components, where the registry cannot express
nesting. See [rules/components.md](rules/components.md).

## Rules

Each rule links to a file with correct/incorrect pairs. Read the linked file
before working in that area.

### Tokens → [rules/tokens.md](rules/tokens.md)

- **Never hard-code a colour, space, radius, shadow, or font.** Use `var(--…)`.
- **Prefer semantic tokens over primitives.** `--color-text-sub-600`, not `--color-neutral-600`.
- **Never write a dark-mode override.** Semantic tokens already re-theme; hard-coded values are exactly what breaks dark mode.

### Components → [rules/components.md](rules/components.md)

- **Never hand-roll a control that exists.** Check the registry first.
- **Use built-in `variant` / `intent` / `size` props before `class`.**
- **`class` is for layout, not restyling.**

### Icons → [rules/icons.md](rules/icons.md)

- **Icons are classes, not components:** `<i class="i-celeste-arrow-down-line" />`.
- **Never build an icon name at runtime.** It works in dev and silently disappears in production.

### Setup → [rules/setup.md](rules/setup.md)

- **`celeste.css` alone is not enough** — it uses the tokens but does not define them. Import the token CSS too, or every component renders unstyled.
