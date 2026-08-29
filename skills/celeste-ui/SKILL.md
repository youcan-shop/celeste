---
name: celeste-ui
description: "Build UI with Celeste, YouCan's design system for Vue 3. Use when writing or reviewing components in an app that depends on @youcan/celeste — choosing a component, styling with design tokens, adding icons, or setting the library up. Keywords: Celeste, @youcan/celeste, celeste-tokens, celeste-icons, YouCan design system."
---

# Celeste UI

Celeste is YouCan's design system: 146 Vue 3 components, 347 design tokens, and
3,148 icons. This skill covers building product UI **with** Celeste. It does not
cover contributing to the Celeste repo itself.

## Look up the API before writing

The component API is generated from source and ships inside the package, so it
always matches the installed version. Do not guess props, and do not rely on
memory of other design systems — Celeste's `Button` is not shadcn's.

**TypeScript will not catch an invented prop.** Vue passes anything it does not
recognise through to the DOM as an attribute, so `<StatusBadge icon="…" />`
compiles cleanly, renders no icon, and reports nothing. Looking the component up is the only way to know a prop exists.

```
node_modules/@youcan/celeste/ai/component-registry.md   # props, events, slots
node_modules/@youcan/celeste/ai/tokens.md               # every CSS custom property
node_modules/@youcan/celeste/ai/icons.md                # every icon name
```

These are large. **Grep them, don't read them whole**:

```bash
# What props does Badge take?
grep -A 20 '^### Badge$' node_modules/@youcan/celeste/ai/component-registry.md

# What components exist for selecting a date?
grep -i 'date' node_modules/@youcan/celeste/ai/component-registry.md

# Which token is the muted text colour?
grep 'color-text' node_modules/@youcan/celeste/ai/tokens.md
```

If those files are missing, the app is on a Celeste version that predates them.
Fall back to the type definitions in `node_modules/@youcan/celeste/dist/`.

**Celeste ships its own source and stories too**, so every path the registry
prints is readable. When an entry ends with:

```
**Example:** `src/components/table/stories/table.stories.ts`
```

read it at
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
